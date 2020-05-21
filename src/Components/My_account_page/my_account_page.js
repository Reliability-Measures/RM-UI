import React from 'react'
import { useSelector } from 'react-redux'
import UserData from './user_data'
import { Row, Col } from 'react-bootstrap'

function MyAccountPage() {
  const isLogin = useSelector((state) => state.google_json.isLogin)
  return (
    <>
      {isLogin && (
        <>
          <h1>MyAccountPage</h1>
          <Row>
            <Col md='4'>
              <UserData />
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default MyAccountPage
