/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  auth: {
    register: typeof routes['auth.register']
    login: typeof routes['auth.login']
    me: typeof routes['auth.me']
    googleRedirect: typeof routes['auth.google_redirect']
    googleCallback: typeof routes['auth.google_callback']
    newAccount: {
      store: typeof routes['auth.new_account.store']
    }
    accessTokens: {
      store: typeof routes['auth.access_tokens.store']
    }
  }
  leaveRequests: {
    index: typeof routes['leave_requests.index']
    store: typeof routes['leave_requests.store']
    approve: typeof routes['leave_requests.approve']
    reject: typeof routes['leave_requests.reject']
  }
  profile: {
    profile: {
      show: typeof routes['profile.profile.show']
    }
    accessTokens: {
      destroy: typeof routes['profile.access_tokens.destroy']
    }
  }
}
