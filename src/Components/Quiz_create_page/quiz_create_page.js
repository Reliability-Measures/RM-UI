import React from 'react'
import QuizCreateForm from './get_questions'
import SelectQuestions from './select_questions'
import { Row, Col, ListGroup } from 'react-bootstrap'
import SubmitForm from './submit_form'

function QuizCreatePage() {
  return (
    <>
      <h1>Create Quiz</h1>
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
                  <h2>Get Questions</h2>
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
              <h2>Select Questions</h2>
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
