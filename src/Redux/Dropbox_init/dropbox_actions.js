import { config_file_success, config_file_failure, subject_file_success, subject_file_failure } from './dropbox_types'

export const ConfigFileSuccess = () => {
  return {
    type: config_file_success
  }
}
export const ConfigFileFailure = (error) => {
  return {
    type: config_file_failure,
    payload: error
  }
}

export const SubjectFileSuccess = () => {
  return {
    type: subject_file_success
  }
}
export const SubjectFileFailure = (error) => {
  return {
    type: subject_file_failure,
    payload: error
  }
}
