import { user_data_get_request, user_data_get_success, user_data_get_failure } from './user_data_types'
import { get_config } from '../../Components/Config'
import axios from 'axios'

export const UserDataGetRequest = () => {
  return {
    type: user_data_get_request
  }
}
export const UserDataGetSuccess = (data) => {
  return {
    type: user_data_get_success,
    payload: data
  }
}
export const UserDataGetFailure = (error) => {
  return {
    type: user_data_get_failure,
    payload: error
  }
}

export const getUserData = (data) => {
  let url = get_config('service2_url') + get_config('quiz_account')
  console.log(url)
  const options = {
    method: 'POST',
    url: url,
    params: { input: JSON.stringify(data) }
  }
  return (dispatch) => {
    console.log(data)
    dispatch(UserDataGetRequest())
    axios(options)
      .then((response) => {
        const data = response.data
        dispatch(UserDataGetSuccess(data))
      })
      .catch((error) => {
        dispatch(UserDataGetFailure(error.message))
      })
  }
}
