import React from 'react'
import { useSelector } from 'react-redux'
import { ListGroup } from 'react-bootstrap'

function RamazanStat4() {
  const data_loaded_4 = useSelector((state) => state.ramadan_agg_results.loaded_4)
  const stat_4 = useSelector((state) => state.ramadan_agg_results.stat_4)
  return (
    <>
      {data_loaded_4 ? (
        <ListGroup>
          <ListGroup.Item>Total Quizzes: {stat_4[0].quizzes}</ListGroup.Item>
          <ListGroup.Item>Total Quizzes Attempted: {stat_4[0].count}</ListGroup.Item>

          <ListGroup.Item>Unique Names: {stat_4[0].names}</ListGroup.Item>
          <ListGroup.Item>Unique States: {stat_4[0].states}</ListGroup.Item>
          <ListGroup.Item>Unique Cities: {stat_4[0].cities}</ListGroup.Item>
          <ListGroup.Item>Unique Schools: {stat_4[0].schools}</ListGroup.Item>

          <ListGroup.Item>Average Age: {stat_4[0].avg_age}</ListGroup.Item>
          <ListGroup.Item>Eldest Age: {stat_4[0].max_age}</ListGroup.Item>
          <ListGroup.Item>Youngest Age: {stat_4[0].min_age}</ListGroup.Item>
        </ListGroup>
      ) : null}
    </>
  )
}

export default RamazanStat4
