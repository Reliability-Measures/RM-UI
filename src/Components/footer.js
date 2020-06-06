import React from 'react'
import { Navbar } from 'react-bootstrap'
import { get_config } from './Config'

function Footer() {
  return (
    <>
      <Navbar style={{ backgroundColor: 'green', position: 'fixed', bottom: 0, left: 0, width: '100%' }} variant='dark'>
        <Navbar.Brand target='_blank' href='https://reliabilitymeasures.com/'>
          Reliability Measures (<small>V {get_config('application_version')}</small>)
        </Navbar.Brand>
      </Navbar>
    </>
  )
}

export default Footer
