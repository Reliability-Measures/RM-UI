import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Loader from 'react-loader-spinner'
import { Accordion, Row, Col, ListGroup, Card } from 'react-bootstrap'
import './Accordion.css'

function RamdanStat6() {
  const [expanded, setexpanded] = useState(false)
  const data_loading_6 = useSelector((state) => state.ramadan_agg_results.loading_6)
  const data_loaded_6 = useSelector((state) => state.ramadan_agg_results.loaded_6)
  const stat_6 = useSelector((state) => state.ramadan_agg_results.stat_6)
  return (
    <>
      {data_loading_6 ? <Loader type='Puff' color='#00BFFF' height={100} width={100} /> : null}
      {data_loaded_6 ? (
        <Accordion>
          <Card className='card'>
            <Accordion.Toggle
              className='panel-heading'
              eventKey='0'
              onClick={() => setexpanded((prevExpanded) => (prevExpanded = !prevExpanded))}>
              <Row as={(Card.Header, 'h2')} data-toggle='tooltip' data-placement='bottom' title='Click to open quiz'>
                <Col />
                <Col>All Quizzes</Col>
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
              <ListGroup>
                {stat_6.map((val, index) => (
                  <ListGroup.Item key={index} style={{ backgroundColor: 'green' }}>
                    <a target='blank' style={{ color: 'yellow' }} href={val.external_link}>
                      {val.name}
                    </a>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      ) : null}
    </>
  )
}

export default RamdanStat6
