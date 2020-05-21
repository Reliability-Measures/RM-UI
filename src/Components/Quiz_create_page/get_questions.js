import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm, FormContext } from 'react-hook-form'
import { Button, Row, Col, Form } from 'react-bootstrap'
import { question_details } from '../Quiz_question_page/question_details'
import MyInput from '../Quiz_question_page/Reuse_components/my_input'
import { getItem } from '../../Redux/Quiz_question/quiz_question_actions'
import DropdownTree from '../Quiz_question_page/dropdown_tree'
import * as yup from 'yup'

const get_questions_valid = yup.object().shape({
  subject: yup.string().required()
})

function QuizCreateForm() {
  const dispatch = useDispatch()
  const google_json = useSelector((state) => state.google_json.data)
  const is_login = useSelector((state) => state.google_json.isLogin)
  const topic_state = useSelector((state) => state.quiz_question.topic_path)
  let subjects = question_details.subject_list.map((val) => val.label)

  const get_questions = useForm({
    defaultValues: {
      show: { subject: true, topics: false },
      subject: ''
    },
    validationSchema: get_questions_valid
  })
  const { handleSubmit, watch, reset, errors } = get_questions
  const onSubmit = (form_data) => {
    let data = { subject: form_data.subject }
    let topic = topic_state.label
    let user_profile = is_login ? google_json.profileObj : {}
    Object.assign(data, { user_profile })
    Object.assign(data, { topic })
    dispatch(getItem(data))
    reset()
  }
  return (
    <>
      <FormContext {...get_questions}>
        <Row>
          <Col md='2'>
            <MyInput label='Topics' label_size='h5' input_type='checkbox' value='1' name='show.topics' />
          </Col>
          <Col>
            <MyInput
              label='Subject'
              label_size='h5'
              name='subject'
              input_type='select'
              options={subjects}
              id='subject'
            />
            {errors.subject && <p className='text-danger'>Subject Is Required</p>}
            {watch('show.topics') !== false && (
              <>
                <h3>Topics</h3>
                <DropdownTree />
              </>
            )}
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Button type='submit'>Search</Button>
            </Form>
          </Col>
        </Row>
      </FormContext>
    </>
  )
}

export default QuizCreateForm
