import vine from '@vinejs/vine'

export const createLeaveRequestValidator = vine.compile(
  vine.object({
    startDate: vine.date(),

    endDate: vine.date().afterField('startDate'),

    reason: vine.string().trim().minLength(5),
  })
)

export const createLeaveRequestMessages = {
  'required': '{{ field }} wajib diisi',

  'startDate.required': 'Tanggal mulai wajib diisi',

  'endDate.required': 'Tanggal selesai wajib diisi',

  'reason.required': 'Alasan cuti wajib diisi',

  'reason.minLength': 'Alasan cuti minimal 5 karakter',

  'endDate.afterField': 'Tanggal selesai harus lebih besar atau sama dengan tanggal mulai',
}
