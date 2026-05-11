import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'auth.register': { paramsTuple?: []; params?: {} }
    'auth.login': { paramsTuple?: []; params?: {} }
    'auth.me': { paramsTuple?: []; params?: {} }
    'auth.google_redirect': { paramsTuple?: []; params?: {} }
    'auth.google_callback': { paramsTuple?: []; params?: {} }
    'leave_requests.index': { paramsTuple?: []; params?: {} }
    'leave_requests.store': { paramsTuple?: []; params?: {} }
    'leave_requests.approve': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'leave_requests.reject': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'auth.new_account.store': { paramsTuple?: []; params?: {} }
    'auth.access_tokens.store': { paramsTuple?: []; params?: {} }
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'profile.access_tokens.destroy': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'auth.me': { paramsTuple?: []; params?: {} }
    'auth.google_redirect': { paramsTuple?: []; params?: {} }
    'auth.google_callback': { paramsTuple?: []; params?: {} }
    'leave_requests.index': { paramsTuple?: []; params?: {} }
    'profile.profile.show': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'auth.me': { paramsTuple?: []; params?: {} }
    'auth.google_redirect': { paramsTuple?: []; params?: {} }
    'auth.google_callback': { paramsTuple?: []; params?: {} }
    'leave_requests.index': { paramsTuple?: []; params?: {} }
    'profile.profile.show': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'auth.register': { paramsTuple?: []; params?: {} }
    'auth.login': { paramsTuple?: []; params?: {} }
    'leave_requests.store': { paramsTuple?: []; params?: {} }
    'auth.new_account.store': { paramsTuple?: []; params?: {} }
    'auth.access_tokens.store': { paramsTuple?: []; params?: {} }
    'profile.access_tokens.destroy': { paramsTuple?: []; params?: {} }
  }
  PATCH: {
    'leave_requests.approve': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'leave_requests.reject': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}