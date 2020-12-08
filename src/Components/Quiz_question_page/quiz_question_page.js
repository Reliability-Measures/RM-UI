import React, { useState } from 'react'
import { useForm, FormContext } from 'react-hook-form'
import HookForm from './hook_form'
import QuestionModal from './question_modal'
import { Row, Col, Button, Form, Container } from 'react-bootstrap'
//import TagForm from './tag_form'
import * as yup from 'yup'

const quiz_question_valid = yup.object().shape({
  tags: yup.object().shape({
    item_text: yup.string().required(),
    item_type: yup.string().required(),
    subject: yup.string().required()
  }),
  item_choices: yup.array().of(yup.object().shape({ choice: yup.string().required() }))
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
      <Container fluid>
        <FormContext {...quiz_question}>
          <Row>
            <Col md='2' />
            <Col md='8'>
              <h1>Create an Item</h1>
              <p className={'text-justify h5'} style={{ padding: 20 }}>
                Create your own items (questions, you want to include in a quiz) on the subject and topic of your
                interest. Provide item text, subject, topic and multiple choices and the correct answer(s). If you sign
                in with Google account then you will be able to also manage your items. You can also decide to make your
                items private so only you can use those items in your quizzes (otherwise you can leave it public so
                other quiz creators can use those items in their quizzes also).
              </p>
              <br></br>
              {/* <TagForm /> */}
              <HookForm />
              <br></br>
            </Col>
            <Col md='2' />
          </Row>
          <QuestionModal show={modalShow} onHide={() => setModalShow(false)} />
          <Row style={{ padding: 20 }}>
            <Col md='6' />
            <Col md='2' className='text-right'>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Button variant='outline-dark' type='submit'>
                  Item Preview
                </Button>
              </Form>
            </Col>
            <Col md='2' className='text-right'>
              <Button
                variant='outline-dark'
                onClick={() => {
                  reset()
                }}>
                Reset All Fields
              </Button>
            </Col>
            <Col md='2' />
          </Row>
        </FormContext>
      </Container>
    </>
  )
}

export default QuizQuestionPage
