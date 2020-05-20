import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFormContext } from 'react-hook-form'
import { Button, Row, Col, Form } from 'react-bootstrap'
import { question_details } from '../Quiz_question_page/question_details'
import MyInput from '../Quiz_question_page/Reuse_components/my_input'
import { getItem } from '../../Redux/Quiz_question/quiz_question_actions'
import DropdownTree from '../Quiz_question_page/dropdown_tree'

export const quiz_create_form_values = {
  show: { subject: true, topics: false },
  subject: '',
  quiz_name: '',
  quiz_description: '',
  question_list: []
}
function QuizCreateForm() {
  const dispatch = useDispatch()
  const { handleSubmit, watch, reset } = useFormContext()
  const items = useSelector((state) => state.quiz_question.item_get_response.items)
  const items_recived = useSelector((state) => state.quiz_question.item_get_received)
  const google_json = useSelector((state) => state.google_json.data)
  let subjects = question_details.subject_list.map((val) => val.label)
  if (items_recived) {
    items.forEach((val) => quiz_create_form_values.question_list.push({ question_id: '' }))
  }
  const onSubmit = (form_data) => {
    let data = { subject: form_data.quiz_create.subject }
    let user_profile = google_json.profileObj
    Object.assign(data, { user_profile })
    // let topic = form_data.quiz_create.topic
    // Object.assign(data, {topic})
    dispatch(getItem(data))
    reset()
  }
  return (
    <>
      <Row>
        {/* <Col md='2>
          <MyInput
            label='Subject'
            label_size='h5'
            input_type='checkbox'
            disabled={true}
            checked={true}
            name='get_questions.subject'
          />
          <MyInput label='Topics' label_size='h5' input_type='checkbox' value='1' name='quiz_create.show.topics' />
        </Col> */}
        <Col>
          <MyInput
            label='Subject'
            label_size='h5'
            name='quiz_create.subject'
            input_type='select'
            options={subjects}
            id='subject'
          />
          {watch('quiz_create.show.topics') !== false && (
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
    </>
  )
}

export default QuizCreateForm
