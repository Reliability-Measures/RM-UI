import React from 'react'
import { Link } from 'react-router-dom'
import { Jumbotron, Container, Row, Col } from 'react-bootstrap'
//import ListItem from './Quiz_question_page/Reuse_components/list_item'
import {get_config} from "./Config";

const Home = () => {
  return (
    <>
      <Container fluid>
        <Jumbotron fluid>
          <Container>
            <h1 className='display-3'>Welcome to Reliability Measures!</h1>
            <p className='lead'>
              We provide custom solutions to improve test/exam reliability.<br></br>
{/*
              Use our platform to create quizzes and exams using questions/items you create or use our Database of
              questions on different subjects and topics. <br></br>
              Automatically generate and publish your quizzes using Google forms. Follow the links above.
*/}
            </p>
          </Container>
        </Jumbotron>
        <Row>
          <Col>
              <div className="card">
                <div className="card-header bg-info text-white text-center">
                    <h3 className="display-4">Exam Reliability</h3>
                </div>
                <div><h2 className="text-center">
                    Do you wonder if your..</h2>
                    <ul className="text-left font-weight-bold">
                        <li>Teacher-Made tests data can be digitized for garnering understandings that will help improve your course outcomes?</li>
                        <li>Current assessment technologies are accurately measuring student responses and performance?</li>
                        <li>Vast assortment of test data can be assimilated to provide you with performance trends and insights?</li>
                    </ul>
                    <a href="http://exam.reliabilitymeasures.com/" target="_blank"
                       className="btn btn-outline-info text-center" role="button">
                        See Sample here..
                    </a>
                    <br></br>
                    <br></br>
                  <br></br>
                </div>
            </div>
          </Col>
          <Col>
            <div className="card">
                <div className="card-header bg-success text-white text-center">
                    <h3 className="display-4">Create Quiz</h3>
                </div>
              <div><h2 className="text-center">
                    A simple and innovative way to..</h2>
                  <ul className="text-left font-weight-bold">
                      <li>Use our platform to create quizzes and exams using questions/items you create OR, </li>
                      <li>Use our Database of questions on different subjects and topics.</li>
                      <li>Automatically generate, publish and share your quizzes using Google forms.</li>
                      <li>Manage your items, quizzes and analyze user responses from one simple interface.</li>
                  </ul>
                    <Link to="/createquestion"
                       className="btn btn-outline-success text-center" role="button">
                        Create Item
                    </Link>
                  <span>    </span>
                    <Link to="/createquiz"
                       className="btn btn-outline-success text-center" role="button">
                        Create Quizzes
                    </Link>
                  <br></br>
                  <br></br>
                  <br></br>
              </div>
            </div>
          </Col>
          <Col>
            <div className="card">
                <div className="card-header bg-primary text-white text-center">
                    <h3 className="display-4">Classroom Integration</h3>
                </div>
              <div><h2 className="text-center">
                    Manage your classes with fewer clicks...</h2>
                  <ul className="text-left font-weight-bold">
                      <li>Start a new Google class or connect your existing classrooms.</li>
                      <li>Use our platform to create quizzes and exams using questions/items you create or use our Database of questions on different subjects and topics.</li>
                      <li>Automatically generate and publish your exams/tests/quizzes in Google classroom.</li>
                      <li>Analyze your tests/exams/quizzes using our pioneering exam reliability module.</li>
                  </ul>
                    <button
                       className="btn btn-outline-primary text-center" role="button">
                        Coming Soon!
                    </button>
                  <br></br>
                  <br></br>
              </div>
            </div>
          </Col>
        </Row>
          <small className='text-enter'> © 2020 Reliability Measures (V {get_config('application_version')}),  Contact us: info@reliabilitymeasures.com<br></br>
          While using this site, you agree to have read and accepted our
              <Link to="/copyright"> terms of use, cookie and privacy policy. </Link>
              </small>
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
