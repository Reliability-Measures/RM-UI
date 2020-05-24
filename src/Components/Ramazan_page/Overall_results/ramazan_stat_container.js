import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import RamazanStat4 from './ramazan_stat_4'
import RamazanStat5 from './ramazan_stat_5'
import { Col, Accordion, Card, Row } from 'react-bootstrap'
import Loader from 'react-loader-spinner'
import '../Accordion.css'

function RamazanStatContainer() {
  const [expanded, setexpanded] = useState(false)
  const data_loading_4 = useSelector((state) => state.ramadan_agg_results.loading_4)
  return (
    <>
      <Accordion>
        <Card className='card'>
          <Accordion.Toggle
            className='panel-heading'
            eventKey='0'
            onClick={() => setexpanded((prevExpanded) => (prevExpanded = !prevExpanded))}>
            <Row as={(Card.Header, 'h2')}>
              <Col />
              <Col>Overall Results</Col>
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
              {data_loading_4 ? <Loader type='Puff' color='#00BFFF' height={50} width={60} /> : null}
              <Row>
                <Col md='2'>
                  <RamazanStat4 />
                </Col>
                <Col md='8'>
                  <RamazanStat5 />
                </Col>
              </Row>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </>
  )
}

export default RamazanStatContainer
