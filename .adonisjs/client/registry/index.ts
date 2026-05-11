/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'auth.register': {
    methods: ["POST"],
    pattern: '/register',
    tokens: [{"old":"/register","type":0,"val":"register","end":""}],
    types: placeholder as Registry['auth.register']['types'],
  },
  'auth.login': {
    methods: ["POST"],
    pattern: '/login',
    tokens: [{"old":"/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['auth.login']['types'],
  },
  'auth.me': {
    methods: ["GET","HEAD"],
    pattern: '/me',
    tokens: [{"old":"/me","type":0,"val":"me","end":""}],
    types: placeholder as Registry['auth.me']['types'],
  },
  'auth.google_redirect': {
    methods: ["GET","HEAD"],
    pattern: '/oauth/google',
    tokens: [{"old":"/oauth/google","type":0,"val":"oauth","end":""},{"old":"/oauth/google","type":0,"val":"google","end":""}],
    types: placeholder as Registry['auth.google_redirect']['types'],
  },
  'auth.google_callback': {
    methods: ["GET","HEAD"],
    pattern: '/oauth/google/callback',
    tokens: [{"old":"/oauth/google/callback","type":0,"val":"oauth","end":""},{"old":"/oauth/google/callback","type":0,"val":"google","end":""},{"old":"/oauth/google/callback","type":0,"val":"callback","end":""}],
    types: placeholder as Registry['auth.google_callback']['types'],
  },
  'leave_requests.index': {
    methods: ["GET","HEAD"],
    pattern: '/leave-requests',
    tokens: [{"old":"/leave-requests","type":0,"val":"leave-requests","end":""}],
    types: placeholder as Registry['leave_requests.index']['types'],
  },
  'leave_requests.store': {
    methods: ["POST"],
    pattern: '/leave-requests',
    tokens: [{"old":"/leave-requests","type":0,"val":"leave-requests","end":""}],
    types: placeholder as Registry['leave_requests.store']['types'],
  },
  'leave_requests.approve': {
    methods: ["PATCH"],
    pattern: '/leave-requests/:id/approve',
    tokens: [{"old":"/leave-requests/:id/approve","type":0,"val":"leave-requests","end":""},{"old":"/leave-requests/:id/approve","type":1,"val":"id","end":""},{"old":"/leave-requests/:id/approve","type":0,"val":"approve","end":""}],
    types: placeholder as Registry['leave_requests.approve']['types'],
  },
  'leave_requests.reject': {
    methods: ["PATCH"],
    pattern: '/leave-requests/:id/reject',
    tokens: [{"old":"/leave-requests/:id/reject","type":0,"val":"leave-requests","end":""},{"old":"/leave-requests/:id/reject","type":1,"val":"id","end":""},{"old":"/leave-requests/:id/reject","type":0,"val":"reject","end":""}],
    types: placeholder as Registry['leave_requests.reject']['types'],
  },
  'auth.new_account.store': {
    methods: ["POST"],
    pattern: '/api/v1/auth/signup',
    tokens: [{"old":"/api/v1/auth/signup","type":0,"val":"api","end":""},{"old":"/api/v1/auth/signup","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/signup","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/signup","type":0,"val":"signup","end":""}],
    types: placeholder as Registry['auth.new_account.store']['types'],
  },
  'auth.access_tokens.store': {
    methods: ["POST"],
    pattern: '/api/v1/auth/login',
    tokens: [{"old":"/api/v1/auth/login","type":0,"val":"api","end":""},{"old":"/api/v1/auth/login","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/login","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['auth.access_tokens.store']['types'],
  },
  'profile.profile.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/account/profile',
    tokens: [{"old":"/api/v1/account/profile","type":0,"val":"api","end":""},{"old":"/api/v1/account/profile","type":0,"val":"v1","end":""},{"old":"/api/v1/account/profile","type":0,"val":"account","end":""},{"old":"/api/v1/account/profile","type":0,"val":"profile","end":""}],
    types: placeholder as Registry['profile.profile.show']['types'],
  },
  'profile.access_tokens.destroy': {
    methods: ["POST"],
    pattern: '/api/v1/account/logout',
    tokens: [{"old":"/api/v1/account/logout","type":0,"val":"api","end":""},{"old":"/api/v1/account/logout","type":0,"val":"v1","end":""},{"old":"/api/v1/account/logout","type":0,"val":"account","end":""},{"old":"/api/v1/account/logout","type":0,"val":"logout","end":""}],
    types: placeholder as Registry['profile.access_tokens.destroy']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
