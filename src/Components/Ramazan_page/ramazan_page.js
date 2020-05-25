import React from 'react'
import { useSelector } from 'react-redux'
import RamazanForm from './Individual_results/ramazan_form'
import { Row, Col, Container } from 'react-bootstrap'
import RamdanStat6 from './ramdan_stat_6'
import RamazanStatContainer from './Overall_results/ramazan_stat_container'
import Loader from 'react-loader-spinner'
import '../Components.css'

function RamazanPage() {
  const data_loaded_4 = useSelector((state) => state.ramadan_agg_results.loaded_4)
  const data_loaded_5 = useSelector((state) => state.ramadan_agg_results.loaded_5)
  const data_loaded_6 = useSelector((state) => state.ramadan_agg_results.loaded_6)
  return (
        <Container fluid='md'>
          <Row
            className='justify-content-center text-white'
            style={{ backgroundImage: 'url(Ramadan-2020.jpg)', backgroundSize: 'stretch' }}>
            <h1>Eid Mubarak !</h1>
          </Row>
          <Row className='justify-content-center'>
            <Col md='2' className='side-nav'>
              <RamdanStat6 />
              <br></br>
            </Col>
            <Col md='10' className='overall-row'>
                <p className={"text-justify h4"} Style={"padding: 20px"}>
                  We are very grateful for your overwhelming response, support and
                    feedback to our daily Ramadan quizzes. Ramadan is over but our striving
                    to gain knowledge should continue.
                    We are introducing a feature to allow you to
                    contribute your own questions and create your own quizzes.
                   See the Create Items and Create Quiz sections above.
                </p>
                <p className={"text-justify h4"} Style={"padding: 20px"}>
                    Below are Ramadan 2020 Quiz overall results. In the individual results section,
                    you can enter your name and age to see total score, rank and percentile.
                    The rank and percentile is only available to quiz takers who
                    have participated in at least 15 quizzes
                    (out of 25 and no more than 5 duplicate entries).
                    There are about 15 people who have 90% or above correct answers.
                    However, we are all winners as purpose was to seek beneficial knowledge.
                    We have created a <a target="_blank" href="https://chat.whatsapp.com/IFEHh2Ot3NYAIHrtI3Cik7">WhatsApp group</a>,
                    which you can join if you are interested in Islamic quizzes. Please forward and share it with other groups.
                </p>
              {data_loaded_4 && data_loaded_5 && data_loaded_6 ? (
                  <div>
                  <RamazanStatContainer/>
                  <RamazanForm />
                  </div>
              ) : (
                  <Loader type='Puff' color='#00BFFF' height={200} width={200} />
              )}
            </Col>
          </Row>
        </Container>

  )
}

export default RamazanPage
