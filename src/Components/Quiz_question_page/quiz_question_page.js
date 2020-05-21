import React, { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import HookForm from './hook_form'
import QuestionModal from './question_modal'
import { Row, Col, Button, Form } from 'react-bootstrap'
//import TagForm from './tag_form'

export const quiz_question_form_values = {
  show: { grade_level: false, subject: true },
  tags: {
    id: '',
    item_type: '',
    grade_min: 1,
    grade_max: 12,
    item_text: '',
    subject: '',
    privacy: 1
  },
  item_choices: [{ choice: '', correct: false }]
}

function QuizQuestionPage() {
  const [modalShow, setModalShow] = useState(false)
  const { handleSubmit, watch } = useFormContext()
  const onSubmit = () => {
    setModalShow(true)
  }
  return (
    <>
      <Row>
        <Col md='2' />

        <Col md='8'>
          <h2>Create Item</h2>
          <br></br>
          {/* <TagForm /> */}
          <HookForm />

          <br></br>
        </Col>
        <Col md='2' />
      </Row>
      <QuestionModal show={modalShow} onHide={() => setModalShow(false)} />
      <Form onSubmit={handleSubmit(onSubmit)}>
        {watch('quiz_question.item_choices[0].choice') !== '' ? <Button type='submit'>See Item Preview</Button> : null}
      </Form>
    </>
  )
}

export default QuizQuestionPage
