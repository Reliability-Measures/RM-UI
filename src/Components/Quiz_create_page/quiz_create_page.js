import React from 'react'
import QuizCreateForm from './get_questions'
import SelectQuestions from './select_questions'
import { Row, Col, ListGroup } from 'react-bootstrap'
import SubmitForm from './submit_form'

function QuizCreatePage() {
  return (
    <>
      <h1>Create a Quiz</h1>
          <p className={"text-justify h5"} Style={"padding: 20px"}>
              Create your own quizzes using Google forms.
              You get the items (questions, including items which you have created)
              from our database on the subject and topic of your interest.
              Then select items you want to include in the quiz and finally name and
              create the quiz with some options.
              If you sign in with Google account
              then you also will be able to edit the Google form and can modify as you please before
              publishing it for people to take the quiz.
            You can monitor the progress of your quizzes from your account section.
          </p>
      <ListGroup horizontal>
        <Row>

          <Col md='3'>
            <span className='fa-stack fa-2x'>
              <i className='fa fa-circle-o fa-stack-2x'></i>
              <strong className='fa-stack-2x'>1</strong>
            </span>
            <ListGroup.Item>
              <Row>
                {/* <Col className='text-left' md='2'>
                  <h2>Filters</h2>
                </Col> */}
                <Col>
                  <h2>Get Items</h2>
                </Col>
              </Row>
              <QuizCreateForm />
            </ListGroup.Item>
          </Col>
          <Col md='6'>
            <span className='fa-stack fa-2x'>
              <i className='fa fa-circle-o fa-stack-2x'></i>
              <strong className='fa-stack-2x'>2</strong>
            </span>
            <ListGroup.Item>
              <h2>Select Items</h2>
              <br></br>
              <SelectQuestions />
            </ListGroup.Item>
          </Col>
          <Col md='3'>
            <span className='fa-stack fa-2x'>
              <i className='fa fa-circle-o fa-stack-2x'></i>
              <strong className='fa-stack-2x'>3</strong>
            </span>
            <ListGroup.Item>
              <h2>Name and Create Quiz</h2>
              <SubmitForm />
            </ListGroup.Item>
          </Col>
        </Row>
      </ListGroup>
    </>
  )
}

export default QuizCreatePage
