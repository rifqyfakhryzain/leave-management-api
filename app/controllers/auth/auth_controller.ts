import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

import crypto from 'node:crypto'
import { registerValidator, loginValidator } from '#validators/auth_validators'
// import ally from '@adonisjs/ally/services/main'

export default class AuthController {
  async register({ request, response }: HttpContext) {
    const payload = await request.validateUsing(registerValidator)

    const user = await User.create(payload)

    return response.status(201).json({
      success: true,
      message: 'Register berhasil',
      data: user,
    })
  }

  async login({ request, response }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)

    try {
      const user = await User.verifyCredentials(email, password)

      const token = await User.accessTokens.create(user)

      return response.status(200).json({
        success: true,
        message: 'Login berhasil',
        token: token.value!.release(),
        user,
      })
    } catch {
      return response.status(401).json({
        success: false,
        message: 'Email atau password salah',
      })
    }
  }

  async me({ auth, response }: HttpContext) {
    return response.status(200).json({
      success: true,
      data: auth.user,
    })
  }

  async googleRedirect({ ally }: HttpContext) {
    return ally.use('google').redirect()
  }

  async googleCallback({ ally }: HttpContext) {
    const google = ally.use('google')

    // User batal login
    if (google.accessDenied()) {
      return {
        success: false,
        message: 'Akses ditolak',
      }
    }

    // State invalid
    if (google.stateMisMatch()) {
      return {
        success: false,
        message: 'State mismatch',
      }
    }

    // Error dari Google
    if (google.hasError()) {
      return google.getError()
    }

    // Ambil data user Google
    const googleUser = await google.user()

    // Cek user berdasarkan email
    let user = await User.findBy('email', googleUser.email)

    // Kalau user belum ada
    if (!user) {
      user = await User.create({
        fullName: googleUser.name,
        email: googleUser.email,

        // password random
        password: crypto.randomUUID(),
      })
    }

    // Generate token login aplikasi
    const token = await User.accessTokens.create(user)

    return {
      success: true,
      message: 'Login Google berhasil',
      token: token.value!.release(),
      user,
    }
  }
}
