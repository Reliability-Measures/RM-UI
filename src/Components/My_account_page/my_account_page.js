import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
//import UserData from './user_data'
import { Row, Col, Tabs, Tab, Container } from 'react-bootstrap'
import { get_config } from '../Config'
import { GoogleLogout } from 'react-google-login'
import { logOut } from '../../Redux/Google_login/google_actions'
import Quizzes from './quizzes'
import Items from './items'

function MyAccountPage() {
  const dispatch = useDispatch()
  const data = useSelector((state) => state.user_data.data)
  const isLogin = useSelector((state) => state.google_json.isLogin)
  const google_json = useSelector((state) => state.google_json.data)
  const user_name = isLogin ? google_json.profileObj.givenName : null
  const img = isLogin ? google_json.profileObj.imageUrl : null
  const loaded = useSelector((state) => state.user_data.loaded)
  let exams_count = loaded ? data.exams_count : ''
  let items_count = loaded ? data.items_count : ''

  const logout = () => {
    dispatch(logOut())
  }
  return (
    <>
      {!isLogin && <h1>Please Login</h1>}
      {isLogin && (
        <>
          <Container fluid>
            <Row>
              <Col md='1' />
              <Col md='10'>
                <h1>Welcome {user_name}</h1>
                <img src={img} alt='Profile Pic' style={{ borderRadius: 50 }}></img>
                <div className='text-right'>
                  {isLogin ? (
                    <GoogleLogout
                      clientId={get_config('application_client_id')}
                      buttonText='Logout'
                      onLogoutSuccess={logout}
                    />
                  ) : null}
                </div>
              </Col>
              <Col md='1'></Col>
            </Row>
            <Row>
              <Col md='2' />
              <Col md='8'>
                <Tabs defaultActiveKey='Quizzes' transition={false} id='user-page'>
{/*                  <Tab eventKey='Info' title='Info'>
                    <UserData />
                  </Tab>*/}
                  <Tab eventKey='Items' title={'Items (' + items_count + ')'}>
                    <Container fluid='sm'>
                      <Items />
                    </Container>
                  </Tab>
                  <Tab eventKey='Quizzes' title={'Quizzes (' + exams_count + ')'}>
                    <Container fluid='sm'>
                      <Quizzes />
                    </Container>
                  </Tab>
                </Tabs>
              </Col>
              <Col md='1'></Col>
              <Col md='1' />
            </Row>
          </Container>
        </>
      )}
    </>
  )
}

export default MyAccountPage
