import React, { useState } from 'react'
import { useForm, FormContext } from 'react-hook-form'
import HookForm from './hook_form'
import QuestionModal from './question_modal'
import { Row, Col, Button, Form } from 'react-bootstrap'
//import TagForm from './tag_form'
import * as yup from 'yup'

const quiz_question_valid = yup.object().shape({
  tags: yup.object().shape({ item_text: yup.string().required(), item_type: yup.string().required() })
})

function QuizQuestionPage() {
  const [modalShow, setModalShow] = useState(false)
  const quiz_question = useForm({
    defaultValues: {
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
    },
    validationSchema: quiz_question_valid
  })
  const { handleSubmit, reset } = quiz_question
  const onSubmit = () => {
    setModalShow(true)
  }
  return (
    <>
      <FormContext {...quiz_question}>
        <Row>
          <Col md='2' />
          <Col md='8'>
            <h1>Create Item</h1>
            <br></br>
            {/* <TagForm /> */}
            <HookForm />
            <br></br>
          </Col>
          <Col md='2' />
        </Row>
        <QuestionModal show={modalShow} onHide={() => setModalShow(false)} />
        <Row>
          <Col md='2' />
          <Col md='8'>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Button type='submit'>Item Preview</Button>
            </Form>
          </Col>
          <Col md='1' style={{ textAlign: 'right' }}>
            <Button
              onClick={() => {
                reset()
              }}>
              Rest All Fields
            </Button>
          </Col>
          <Col md='1' />
        </Row>
      </FormContext>
    </>
  )
}

export default QuizQuestionPage
