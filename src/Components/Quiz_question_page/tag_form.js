import React from 'react'
import MyInput from './Reuse_components/my_input'
import { Col, Row, ListGroup } from 'react-bootstrap'

function TagForm() {
  return (
    <>
      <Row>
        <Col>
          <ListGroup>
            <ListGroup.Item>Requied Fileds</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col>
          <ListGroup>
            <ListGroup.Item>Recomended Fileds</ListGroup.Item>
          </ListGroup>
          <MyInput label='Subject' input_type='checkbox' value='1' name='quiz_question.show.subject' />
        </Col>
        <Col>
          <ListGroup>
            <ListGroup.Item>Optional Fileds</ListGroup.Item>
          </ListGroup>
          <MyInput label='Grade-Level' input_type='checkbox' value='1' name='quiz_question.show.grade_level' />
        </Col>
      </Row>
    </>
  )
}

export default TagForm
