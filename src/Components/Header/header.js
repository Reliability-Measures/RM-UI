import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import GoogleLogin from './google_login'
//import { rmCoursesShow, rmCoursesHide } from '../../Redux/RM-courses_init/rm_courses_init_actions'
import { Nav, Navbar, Col } from 'react-bootstrap'
//import { dataLoadedOff } from '../../Redux/Ramadan_quiz_results/indivisual_actions'

function Header() {
  const [expanded, setexpanded] = useState(false)
  return (
    <div>
      <Navbar expanded={expanded} style={{ backgroundColor: 'green' }} expand='lg' variant='dark'>
        <Col md='2' />
        <Navbar.Brand target='_blank' href='https://reliabilitymeasures.com/'>
          Reliability Measures
        </Navbar.Brand>
        <Navbar.Toggle
          onClick={() => setexpanded((prevExpanded) => (prevExpanded = !prevExpanded))}
          aria-controls='basic-navbar-nav'
        />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='mr-auto' onClick={() => setexpanded(false)}>
            <Link className='text-light nav-link' to='/'>
              Home
            </Link>
            {/* <Link className='text-light nav-link' to='/analyze'>
              Analyze Test
            </Link> */}
            <Link className='text-light nav-link' to='/createquestion'>
              Create Items
            </Link>
            <Link className='text-light nav-link' to='/createquiz'>
              Create Quiz
            </Link>
            {/* <Link
              className='text-light nav-link'
              to='/ramazan'
              onClick={() => {
                dispatch(dataLoadedOff())
              }}>
              Ramadan Quiz Results
            </Link> */}

            {/* <NavDropdown title={<span className='text-light my-auto'>Courses</span>} id='basic-nav-dropdown'>
              <NavDropdown.Item
                as={Link}
                to='/courses'
                onClick={() => {
                  dispatch(rmCoursesShow())
                }}>
                Google Classroom Courses
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                to='/courses'
                onClick={() => {
                  dispatch(rmCoursesHide())
                }}>
                R-M Courses (samples)
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
        </Navbar.Collapse>
        <GoogleLogin />
      </Navbar>
    </div>
  )
}

export default Header
