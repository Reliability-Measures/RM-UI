import React from 'react'
import { Jumbotron, Container, Row, Col } from 'react-bootstrap'
import ListItem from './Quiz_question_page/Reuse_components/list_item'

const Home = () => {
  return (
    <>
      <Container fluid>
        <Jumbotron fluid>
          <Container>
            <h1 className='display-4'>Welcome to Reliability Measures!</h1>
            <p className='lead'>
              We provide custom solutions to improve test/exam reliability.<br></br>
              Use our platform to create quizzes and exams using questions/items you create or use our Database of
              questions on different subjects and topics. <br></br>
              Automatically generate and publish your quizzes using Google forms. Follow the links above.
            </p>
          </Container>
        </Jumbotron>
        <Row>
          <Col>
            <ListItem text='Box 1' />
          </Col>
          <Col>
            <ListItem text='Box 2' />
          </Col>
          <Col>
            <ListItem text='Box 3' />
          </Col>
        </Row>
      </Container>

      {/*         <h2>Do you wonder if your..</h2>
          <ul>
          <li>Teacher-Made tests data can be digitized for garnering understandings that will help
improve your course outcomes?</li>
<li>Current assessment technologies are accurately measuring student responses and performance?</li>
<li>Vast assortment of test data can be assimilated to provide you with
    performance trends and insights?</li>
      </ul>*/}
    </>
  )
}

export default Home
