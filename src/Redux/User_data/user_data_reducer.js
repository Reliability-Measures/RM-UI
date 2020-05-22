import { user_data_get_request, user_data_get_success, user_data_get_failure } from './user_data_types'

const user_data_state = {
  data: [],
  isloading: false,
  loaded: false,
  error: ''
}

const user_data_reducer = (state = user_data_state, action) => {
  switch (action.type) {
    case user_data_get_request:
      return {
        ...state,
        isloading: true
      }
    case user_data_get_success:
      return {
        ...state,
        loaded: true,
        isloading: false,
        data: action.payload,
        error: ''
      }
    case user_data_get_failure:
      return {
        ...state,
        data: [],
        error: action.payload
      }
    default:
      return state
  }
}

export default user_data_reducer
