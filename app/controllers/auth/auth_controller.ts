// import type { HttpContext } from '@adonisjs/core/http'
// import { messages } from '@vinejs/vine/defaults'

import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  async register({ request }: HttpContext) {
    const data = request.only(['fullName', 'email', 'password', 'role'])
    const user = await User.create(data)

    return {
      message: 'Register Berhasil',
      data: user,
    }
  }

  async login({ request }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])
    const user = await User.verifyCredentials(email, password)

    const token = await User.accessTokens.create(user)

    return {
      message: 'Login Berhasil',
      token: token.value!.release(),
      user,
    }
  }

  async me({ auth }: HttpContext) {
    return auth.user
  }
}
