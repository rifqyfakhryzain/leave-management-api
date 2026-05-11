/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
import { controllers } from '#generated/controllers'

router.get('/', async () => {
  return {
    name: 'Rifqy Fakhry Zain',
  }
})

// Auth
const AuthController = () => import('#controllers/auth/auth_controller')
router.post('/register', [AuthController, 'register'])
router.post('/login', [AuthController, 'login'])
router.get('/me', [AuthController, 'me']).use(middleware.auth())

// OAuth
router.get('/oauth/google', [AuthController, 'googleRedirect'])
router.get('/oauth/google/callback', [AuthController, 'googleCallback'])

// Leave Request
const LeaveRequestsController = () =>
  import('#controllers/leave_requests/leave_requests_controller')
router
  .group(() => {
    router.get('/leave-requests', [LeaveRequestsController, 'index'])

    router.post('/leave-requests', [LeaveRequestsController, 'store'])

    router.patch('/leave-requests/:id/approve', [LeaveRequestsController, 'approve'])

    router.patch('/leave-requests/:id/reject', [LeaveRequestsController, 'reject'])
  })
  .use(middleware.auth())

//
router
  .group(() => {
    router
      .group(() => {
        router.post('signup', [controllers.NewAccount, 'store'])
        router.post('login', [controllers.AccessTokens, 'store'])
      })
      .prefix('auth')
      .as('auth')

    router
      .group(() => {
        router.get('profile', [controllers.Profile, 'show'])
        router.post('logout', [controllers.AccessTokens, 'destroy'])
      })
      .prefix('account')
      .as('profile')
      .use(middleware.auth())
  })
  .prefix('/api/v1')
