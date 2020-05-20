import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Card, Row, Col, Accordion } from 'react-bootstrap'

function IndividualQuizzesCards() {
  const [expanded, setexpanded] = useState(false)
  const data_loaded = useSelector((state) => state.ramadan_ind_results.loaded)
  const quizzes = useSelector((state) => state.ramadan_ind_results.ind_quizzes.quizzes)
  const total_scores = useSelector((state) => state.ramadan_ind_results.ind_quizzes.total_scores)
  return (
    <div>
      {data_loaded && total_scores['No. of Quizzes'] >= 1 ? (
        <Accordion>
          <Card>
            <Accordion.Toggle
              className='panel-heading'
              eventKey='0'
              onClick={() => setexpanded((prevExpanded) => (prevExpanded = !prevExpanded))}>
              <Row as={(Card.Header, 'h2')}>
                <Col />
                <Col>Individual Quizzes</Col>
                <Col>
                  {!expanded ? (
                    <i className='fas fa-chevron-down'></i>
                  ) : expanded ? (
                    <i className='fas fa-chevron-up'></i>
                  ) : null}
                </Col>
              </Row>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey='0'>
              <Card.Body>
                {quizzes.map((val, index) => (
                  <div key={index}>
                    <Accordion>
                      <Card>
                        <Accordion.Toggle eventKey='0'>
                          <Row as={(Card.Header, 'h5')}>
                            <Col className='small'>{val.created_at.substring(0, 10)}</Col>
                            <Col className='small'>{val.description} </Col>
                            <Col className='small'>{val.marks}</Col>
                          </Row>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey='0'>
                          <Card.Body>
                            {val.responses.map((va, index) => (
                              <div key={index} className='ramadan-card-text'>
                                <div>
                                  {<div style={{ fontWeight: 'bold' }}>{va.question}</div>}
                                  {
                                    <div style={{ color: 'green' }}>
                                      <i className='fas fa-check'></i>
                                      {va.correct}
                                    </div>
                                  }
                                  {va.point === 0 ? (
                                    <div style={{ color: 'red' }}>
                                      <i className='fas fa-times'></i>
                                      Your answer: {va.your_answer}
                                    </div>
                                  ) : null}
                                </div>
                                <br></br>
                              </div>
                            ))}
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                    </Accordion>
                    <br></br>
                  </div>
                ))}
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      ) : null}
    </div>
  )
}

export default IndividualQuizzesCards
