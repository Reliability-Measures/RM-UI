import { config_file_success, config_file_failure, subject_file_success, subject_file_failure } from './dropbox_types'

const dropbox_state = {
  config_init: false,
  config_error: '',
    subjects_init: false,
    subjects_error:''

}

const dropbox_reducer = (state = dropbox_state, action) => {
  switch (action.type) {
    case config_file_success:
      return {
        ...state,
        config_init: true
      }
    case config_file_failure:
      return {
        ...state,
        config_error: action.payload
      }
      case subject_file_success:
      return {
        ...state,
        subjects_init: true
      }
    case subject_file_failure:
      return {
        ...state,
        subjects_error: action.payload
      }
    default:
      return state
  }
}

export default dropbox_reducer
