import {
  topic_path,
  item_post_request,
  item_post_success,
  item_post_failure,
  item_get_failure,
  item_get_success,
  item_get_request,
  items_post_request,
  items_post_success,
  items_post_failure,
  item_selected_id,
  item_selected_text,
  reset_sent
} from './quiz_question_types'
import { get_config } from '../../Components/Config'
import axios from 'axios'

export const TopicPath = (data) => {
  return {
    type: topic_path,
    payload: data
  }
}
export const ItemPostRequest = () => {
  return {
    type: item_post_request
  }
}
export const ItemPostSuccess = (data) => {
  return {
    type: item_post_success,
    payload: data
  }
}
export const ItemPostFailure = (error) => {
  return {
    type: item_post_failure,
    payload: error
  }
}

export const ItemGetRequest = (data) => {
  return {
    type: item_get_request,
    payload: data
  }
}
export const ItemGetSuccess = (data) => {
  return {
    type: item_get_success,
    payload: data
  }
}
export const ItemGetFailure = (error) => {
  return {
    type: item_get_failure,
    payload: error
  }
}

export const ItemsPostRequest = () => {
  return {
    type: items_post_request
  }
}
export const ItemsPostSuccess = (data) => {
  return {
    type: items_post_success,
    payload: data
  }
}
export const ItemsPostFailure = (error) => {
  return {
    type: items_post_failure,
    payload: error
  }
}

export const ItemSelectedId = (data) => {
  return {
    type: item_selected_id,
    payload: data
  }
}

export const ItemSelectedText = (data) => {
  return {
    type: item_selected_text,
    payload: data
  }
}

export const ResetSent = () => {
  return {
    type: reset_sent
  }
}

export const postItem = (data) => {
  let url = get_config('service2_url') + get_config('create_item')
  console.log(url)
  const options = {
    method: 'POST',
    url: url,
    params: { input: JSON.stringify(data) }
  }
  return (dispatch) => {
    console.log(data)
    dispatch(ItemPostRequest())
    axios(options)
      .then((response) => {
        const data = response.data
        dispatch(ItemPostSuccess(data))
      })
      .catch((error) => {
        dispatch(ItemPostFailure(error.message))
      })
  }
}

export const getItem = (data) => {
  let url = get_config('service2_url') + get_config('get_items')
  console.log(url)
  const options = {
    method: 'POST',
    url: url,
    params: { input: data }
  }
  return (dispatch) => {
    console.log(data)
    dispatch(ItemGetRequest())
    axios(options)
      .then((response) => {
        const data = response.data
        dispatch(ItemGetSuccess(data))
      })
      .catch((error) => {
        dispatch(ItemGetFailure(error.message))
      })
  }
}

export const postItems = (data) => {
  let url = get_config('service2_url') + get_config('create_form')
  console.log(url)
  const options = {
    method: 'POST',
    url: url,
    params: { input: data }
  }
  return (dispatch) => {
    console.log(data)
    dispatch(ItemsPostRequest())
    axios(options)
      .then((response) => {
        const data = response.data
        dispatch(ItemsPostSuccess(data))
      })
      .catch((error) => {
        dispatch(ItemsPostFailure(error.message))
      })
  }
}
