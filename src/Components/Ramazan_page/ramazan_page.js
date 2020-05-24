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
    <div>
      {data_loaded_4 && data_loaded_5 && data_loaded_6 ? (
        <Container fluid='md'>
          <Row
            className='justify-content-center text-white'
            style={{ backgroundImage: 'url(Ramadan-2020.jpg)', backgroundSize: 'stretch' }}>
            <h1>Ramadan Mubarak !</h1>
          </Row>
          <Row className='justify-content-center'>
            <Col md='2' className='side-nav'>
              <RamdanStat6 />
              <br></br>
            </Col>
            <Col md='10' className='overall-row'>
              <RamazanStatContainer />
              <br></br>
              <RamazanForm />
            </Col>
          </Row>
        </Container>
      ) : (
        <Loader type='Puff' color='#00BFFF' height={200} width={200} />
      )}
    </div>
  )
}

export default RamazanPage
