import {
  indivisual_results_request,
  indivisual_results_success,
  indivisual_results_failure,
  data_loaded_off
} from './indivisual_types'

const indivisual_results_state = {
  loading: false,
  loaded: false,
  ind_quizzes: [],
  error_q: '',
  error: false
}

const ramadan_indivisual_results_reducer = (state = indivisual_results_state, action) => {
  switch (action.type) {
    case indivisual_results_request:
      return {
        ...state,
        loading: true,
        loaded: false
      }
    case indivisual_results_success:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: false,
        ind_quizzes: action.payload,
        error_q: ''
      }
    case indivisual_results_failure:
      return {
        ...state,
        loading: false,
        error: true,
        ind_quizzes: [],
        error_q: action.payload
      }
    case data_loaded_off:
      return {
        ...state,
        loaded: false
      }
    default:
      return state
  }
}

export default ramadan_indivisual_results_reducer
