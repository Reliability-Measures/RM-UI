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
  item_selected_reset,
  quiz_get_request,
  quiz_get_success,
  quiz_get_failure,
  responses_get_request,
  responses_get_success,
  responses_get_failure,
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

  quiz_get_loading: false,
  quiz_get_received: false,
  quiz_get_response: [],
  quiz_get_error: '',

  responses_get_loading: false,
  responses_get_received: false,
  responses_get_response: [],
  responses_get_error: '',

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
        items_selected_id: [...state.items_selected_id, action.payload]
      }
    case item_selected_text:
      return {
        ...state,
        items_selected_text: [...state.items_selected_text, action.payload]
      }
    case item_selected_reset:
      return {
        ...state,
        items_selected_id: action.payload,
        items_selected_text: action.payload1
      }
    case reset_sent:
      return {
        ...state,
        items_post_sent: false
      }

    case quiz_get_request:
      return {
        ...state,
        quiz_get_loading: true
      }
    case quiz_get_success:
      return {
        ...state,
        quiz_get_loading: false,
        quiz_get_received: true,
        quiz_get_response: action.payload
      }
    case quiz_get_failure:
      return {
        ...state,
        quiz_get_error: action.payload
      }

    case responses_get_request:
      return {
        ...state,
        responses_get_loading: true
      }
    case responses_get_success:
      return {
        ...state,
        responses_get_loading: false,
        responses_get_received: true,
        responses_get_response: action.payload
      }
    case responses_get_failure:
      return {
        ...state,
        responses_get_error: action.payload
      }
    default:
      return state
  }
}

export default quiz_question_reducer
