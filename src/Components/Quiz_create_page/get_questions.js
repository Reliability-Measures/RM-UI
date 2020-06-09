import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm, FormContext } from 'react-hook-form'
import { Button, Row, Col, Form } from 'react-bootstrap'
import { subjects } from '../Config'
import MyInput from '../Quiz_question_page/Reuse_components/my_input'
import { getItem } from '../../Redux/Quiz_question/quiz_question_actions'
//import DropdownTree from '../Quiz_question_page/dropdown_tree'
import * as yup from 'yup'

const get_questions_valid = yup.object().shape({ subject: yup.string().required() })

function QuizCreateForm() {
  const dispatch = useDispatch()
  const google_json = useSelector((state) => state.google_json.data)
  const is_login = useSelector((state) => state.google_json.isLogin)
  const subjects_init = useSelector((state) => state.dropbox.subjects_init)
  //const topic_state = useSelector((state) => state.quiz_question.topic_path)
  let subject = subjects_init ? subjects.subject_list.map((val) => val.label) : []

  const get_questions = useForm({
    defaultValues: {
      show: { topics: false, keyword: false, limit: false },
      subject: '',
      user: 0,
      keyword: '',
      limit: 100
    },
    validationSchema: get_questions_valid
  })
  const { handleSubmit, watch, errors } = get_questions
  const onSubmit = (form_data) => {
    let data = { subject: form_data.subject }
    let user_id =
      form_data.user === false || form_data.user === undefined
        ? (form_data.user = '')
        : (form_data.user = google_json.profileObj.email)
    let keyword = form_data.keyword
    let limit = form_data.limit ? Number(form_data.limit) : 100
    // let topic = topic_state.label
    let user_profile = is_login ? google_json.profileObj : {}
    Object.assign(data, { user_profile })
    Object.assign(data, { user_id })
    Object.assign(data, { keyword })
    Object.assign(data, { limit })
    // Object.assign(data, { topic })
    dispatch(getItem(data))
  }
  return (
    <>
      <FormContext {...get_questions}>
        <Row>
          {/* <MyInput label='Topics' label_size='h5' input_type='checkbox' value='1' name='show.topics' /> */}
          <Col>
            {is_login && (
              <>
                <Row>
                  <Col xs='8'>
                    <h5>My Items Only</h5>
                  </Col>
                  <Col xs='4'>
                    <MyInput input_type='checkbox' value='1' name='user' />
                  </Col>
                </Row>
              </>
            )}
            <h5>
              <i className='fas fa-star-of-life text-danger fa-xs'></i> Subject
            </h5>
            <MyInput name='subject' input_type='select' options={subject} id='subject' />
            {errors.subject && <p className='text-danger'>Subject Is Required</p>}
            {/*<MyInput label='Keyword' label_size='h5' name='keyword' input_type='textarea' />*/}
            <h5>No. of Items ({watch('limit')})</h5>
            <MyInput name='limit' input_type='range' max_range={100} />
            {/* {watch('show.topics') !== false && (
              <>
                <h3>Topics</h3>
                <DropdownTree />
              </>
            )} */}
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Button variant='outline-dark' type='submit'>
                Search
              </Button>
            </Form>
          </Col>
        </Row>
      </FormContext>
    </>
  )
}

export default QuizCreateForm
