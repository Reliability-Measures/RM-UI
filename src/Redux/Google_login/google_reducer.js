import { logout, send_login_request, send_login_success, send_login_failure, login } from './google_types'

const google_state = {
  data: [],
  isLogin: false,
  error: ''
}

const google_reducer = (state = google_state, action) => {
  switch (action.type) {
    case login:
      return {
        ...state,
        isLogin: true,
        data: action.payload
      }
    case logout:
      return {
        ...state,
        isLogin: false
      }
    case send_login_request:
      return {
        ...state
      }
    case send_login_success:
      return {
        ...state,
        isLogin: true,
        data: action.payload,
        error: ''
      }
    case send_login_failure:
      return {
        ...state,
        data: [],
        error: action.payload
      }
    default:
      return state
  }
}

export default google_reducer
