import {
  topic_path,
  item_post_request,
  item_post_success,
  item_post_failure,
  item_get_request,
  item_get_failure,
  item_get_success,
  items_post_request,
  items_post_success,
  items_post_failure,
  item_selected_id,
  item_selected_text,
  reset_sent
} from './quiz_question_types'
const quiz_question_state = {
  topic_path: [],
  item_post_loading: false,
  item_post_sent: false,
  item_post_response: [],
  item_post_error: '',

  item_get_loading: false,
  item_get_received: false,
  item_get_response: [],
  item_get_error: '',

  items_post_loading: false,
  items_post_sent: false,
  items_post_response: [],
  items_post_error: '',

  items_selected_id: [],
  items_selected_text: []
}

const quiz_question_reducer = (state = quiz_question_state, action) => {
  switch (action.type) {
    case topic_path:
      return {
        ...state,
        topic_path: action.payload
      }
    // sending: created item && received : null
    case item_post_request:
      return {
        ...state,
        item_post_loading: true
      }
    case item_post_success:
      return {
        ...state,
        item_post_loading: false,
        item_post_sent: true,
        item_post_response: action.payload
      }
    case item_post_failure:
      return {
        ...state,
        item_post_error: action.payload
      }
    // receiving  items from db
    case item_get_request:
      return {
        ...state,
        item_get_loading: true,
        item_get_received: false
      }
    case item_get_success:
      return {
        ...state,
        item_get_loading: false,
        item_get_received: true,
        item_get_response: action.payload
      }
    case item_get_failure:
      return {
        ...state,
        item_get_error: action.payload
      }
    // sending  items to create from
    case items_post_request:
      return {
        ...state,
        items_post_loading: true
      }
    case items_post_success:
      return {
        ...state,
        items_post_loading: false,
        items_post_sent: true,
        items_post_response: action.payload
      }
    case items_post_failure:
      return {
        ...state,
        items_post_error: action.payload
      }

    case item_selected_id:
      return {
        ...state,
        items_selected_id: action.payload
      }
    case item_selected_text:
      return {
        ...state,
        items_selected_text: action.payload
      }

    case reset_sent:
      return {
        ...state,
        items_post_sent: false
      }

    default:
      return state
  }
}

export default quiz_question_reducer
