import type { HttpContext } from '@adonisjs/core/http'

import app from '@adonisjs/core/services/app'
import { createId } from '@paralleldrive/cuid2'
import LeaveRequest from '#models/leave_request'

import { createLeaveRequestValidator } from '#validators/leave_request_validator'

export default class LeaveRequestsController {
  async index({ auth, response }: HttpContext) {
    const user = auth.user!

    let leaveRequests

    if (user.role === 'admin') {
      leaveRequests = await LeaveRequest.query().preload('user').orderBy('created_at', 'desc')
    } else {
      leaveRequests = await LeaveRequest.query()
        .where('user_id', user.id)
        .preload('user')
        .orderBy('created_at', 'desc')
    }

    return response.ok({
      message: 'Data leave request berhasil diambil',
      data: leaveRequests,
    })
  }

  async store({ request, auth, response }: HttpContext) {
    const payload = await request.validateUsing(createLeaveRequestValidator)

    const user = auth.user!

    const diffTime = payload.endDate.toJSDate().getTime() - payload.startDate.toJSDate().getTime()

    const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1

    if (totalDays > user.leaveBalance) {
      return response.badRequest({
        message: 'Sisa cuti tidak mencukupi',
      })
    }

    const attachment = request.file('attachment', {
      size: '5mb',
      extnames: ['pdf', 'jpg', 'jpeg', 'png'],
    })
    if (!attachment) {
      return response.badRequest({
        message: 'Lampiran wajib diupload',
      })
    }

    const fileName = `${createId()}.${attachment.extname}`

    await attachment.move(app.makePath('storage/uploads'), {
      name: fileName,
    })

    const leaveRequest = await LeaveRequest.create({
      userId: user.id,
      startDate: payload.startDate,
      endDate: payload.endDate,
      totalDays,
      reason: payload.reason,
      attachment: `storage/uploads/${fileName}`,
      status: 'pending',
    })

    return response.created({
      message: 'Pengajuan cuti berhasil dibuat',
      data: leaveRequest,
    })
  }
  async approve({ auth, params, response }: HttpContext) {
    const user = auth.user!

    if (user.role !== 'admin') {
      return response.forbidden({
        message: 'Hanya admin yang dapat approve leave request',
      })
    }

    const leaveRequest = await LeaveRequest.find(params.id)

    if (!leaveRequest) {
      return response.notFound({
        message: 'Leave request tidak ditemukan',
      })
    }

    if (leaveRequest.status !== 'pending') {
      return response.badRequest({
        message: 'Leave request sudah diproses',
      })
    }

    const employee = await leaveRequest.related('user').query().first()

    if (!employee) {
      return response.notFound({
        message: 'User tidak ditemukan',
      })
    }

    employee.leaveBalance -= leaveRequest.totalDays

    await employee.save()

    leaveRequest.status = 'approved'

    leaveRequest.approvedBy = user.id

    await leaveRequest.save()

    return response.ok({
      message: 'Leave request berhasil diapprove',
      data: leaveRequest,
    })
  }
  async reject({ auth, params, response }: HttpContext) {
    const user = auth.user!

    if (user.role !== 'admin') {
      return response.forbidden({
        message: 'Hanya admin yang dapat reject leave request',
      })
    }

    const leaveRequest = await LeaveRequest.find(params.id)

    if (!leaveRequest) {
      return response.notFound({
        message: 'Leave request tidak ditemukan',
      })
    }

    if (leaveRequest.status !== 'pending') {
      return response.badRequest({
        message: 'Leave request sudah diproses',
      })
    }

    leaveRequest.status = 'rejected'

    leaveRequest.approvedBy = user.id

    await leaveRequest.save()

    return response.ok({
      message: 'Leave request berhasil ditolak',
      data: leaveRequest,
    })
  }
}
