import React from 'react'
import { useSelector } from 'react-redux'
import { Card, Row, Col } from 'react-bootstrap'

function IndividualResultsCard() {
  const data_loaded = useSelector((state) => state.ramadan_ind_results.loaded)
  const quizzes = useSelector(
    (state) => state.ramadan_ind_results.ind_quizzes.quizzes
  )
  const total_scores = useSelector(
    (state) => state.ramadan_ind_results.ind_quizzes.total_scores
  )

  return (
    <div>
      {data_loaded ? (
        <Card>
          <Card.Header as='h3'>Your Results</Card.Header>
          <Card.Body>
            <Card.Title>{quizzes[0].name}</Card.Title>
            <Row>
              <Col style={{ textAlign: 'left' }} xs='6' as={'h5'}>
                Age: {quizzes[0].age}
                <br></br>
                City: {quizzes[0].city}
                <br></br>
                State: {quizzes[0].state}
                <br></br>
                School: {quizzes[0].school}
              </Col>
              <Col style={{ textAlign: 'right' }} className='' xs='6' as={'h5'}>
                Quizzes: {total_scores['No. of Quizzes']}
                <br></br>
                Combined Scores: {total_scores['Combined score']}/
                {total_scores['Total items']}
                ({total_scores['Combined score Percentage']}%)
                  <br></br>
                    Rank: {total_scores['rank']}
                    <br></br>
                    Percentile: {total_scores['percentile']}

              </Col>
            </Row>
          </Card.Body>
        </Card>
      ) : null}
    </div>
  )
}

export default IndividualResultsCard
