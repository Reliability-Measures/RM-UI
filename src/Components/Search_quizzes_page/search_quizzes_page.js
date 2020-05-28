import React from 'react'
import IndividualQuizSearch from './individual_quiz_search'
import { Row, Col, ListGroup } from 'react-bootstrap'
import KeywordQuizSearch from './keyword_quiz_search'
import QuizTable from './quiz_table'
import { useSelector } from 'react-redux'
import Loader from 'react-loader-spinner'

function SearchQuizzesPage() {
  const loaded = useSelector((state) => state.quiz_question.quiz_get_received)
  const is_loading = useSelector((state) => state.quiz_question.quiz_get_loading)
  return (
    <>
      <h1>Search For Existing Quizzes</h1>
      <br />
      <Row className='justifty-content-center'>
        <Col md='2' />
        <Col md='3'>
          <h2>Search For An Individual Quiz</h2>
          <ListGroup.Item>
            <IndividualQuizSearch />
          </ListGroup.Item>
        </Col>
        <Col md='2'>
          <h1>Or</h1>
        </Col>
        <Col md='3'>
          <h2>Search All Quizzes</h2>
          <ListGroup.Item>
            <KeywordQuizSearch />
          </ListGroup.Item>
        </Col>
        <Col md='2' />
      </Row>
      <Row>
        <Col md='2' />
        <Col md='8'>
          {is_loading && <Loader />}
          {loaded && !is_loading && (
            <ListGroup.Item>
              <QuizTable />
            </ListGroup.Item>
          )}
        </Col>
        <Col md='2' />
      </Row>
    </>
  )
}

export default SearchQuizzesPage
