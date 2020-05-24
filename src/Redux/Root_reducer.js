import { combineReducers } from 'redux'
import quiz_question_reducer from './Quiz_question/quiz_question_reducer'
import google_reducer from './Google_login/google_reducer'
import dropbox_reducer from './Dropbox_init/dropbox_reducer'
import user_data_reducer from './User_data/user_data_reducer'
// import sample_reducer from './Sample_test/sample_reducer'
// import input_redcuer from './Get_input/input_reducer'
// import send_input_reducer from './Send_input/send_input_reducer'
// import rm_course_reducer from './RM-courses_init/rm_courses_init_reducer'
import ramadan_indivisual_results_reducer from './Ramadan_quiz_results/indivisual_reducer'
import ramadan_aggregated_results_reducer from './Ramadan_quiz_results/aggregated_reducer'

const root_reducer = combineReducers({
  google_json: google_reducer,
  dropbox: dropbox_reducer,
  quiz_question: quiz_question_reducer,
  user_data: user_data_reducer,
  // sample_json: sample_reducer,
  // input_json: input_redcuer,
  // results_json: send_input_reducer,

  // rm_courses_json: rm_course_reducer,

  ramadan_ind_results: ramadan_indivisual_results_reducer,
  ramadan_agg_results: ramadan_aggregated_results_reducer
})

export default root_reducer
