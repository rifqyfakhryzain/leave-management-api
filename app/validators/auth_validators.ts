import vine from '@vinejs/vine'

export const registerValidator = vine.compile(
  vine.object({
    fullName: vine.string().trim().minLength(3),

    email: vine
      .string()
      .trim()
      .email()
      .unique(async (db, value) => {
        const user = await db.from('users').where('email', value).first()

        return !user
      }),

    password: vine.string().minLength(8),

    role: vine.string(),
  })
)

registerValidator.messagesProvider = {
  getMessage(message, rule, field) {
    const messages: Record<string, string> = {
      'fullName.required': 'Nama lengkap wajib diisi',
      'fullName.minLength': 'Nama lengkap minimal 3 karakter',

      'email.required': 'Email wajib diisi',
      'email.email': 'Format email tidak valid',

      'role.required': 'Role wajib diisi',
    }

    if (rule === 'database.unique') {
      return 'Email sudah digunakan'
    }

    if (rule === 'minLength') {
      if (field.name === 'password') {
        return 'Password minimal 8 karakter'
      }

      if (field.name === 'fullName') {
        return 'Nama lengkap minimal 3 karakter'
      }
    }

    return messages[`${field.name}.${rule}`] || message
  },
}

export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().trim().email(),

    password: vine.string().minLength(8),
  })
)

loginValidator.messagesProvider = {
  getMessage(message, rule, field) {
    const messages: Record<string, string> = {
      'email.required': 'Email wajib diisi',
      'email.email': 'Format email tidak valid',

      'password.required': 'Password wajib diisi',
      'password.minLength': 'Password minimal 8 karakter',
    }

    return messages[`${field.name}.${rule}`] || message
  },
}
