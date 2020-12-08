import React from 'react'
import {get_config} from "./Config";

function Footer() {
  return (
    <>
      <Navbar className={'text-enter'}
              style={{ backgroundColor: 'green', position: 'sticky', bottom: 0, left: 0, width: '100%' }}
              variant='dark'
      >
        <Navbar.Brand target='_blank' href='https://reliabilitymeasures.com/'>
         <small className='text-enter'> © 2020 Reliability Measures (V {get_config('application_version')})</small>
        </Navbar.Brand>
      </Navbar>
    </>
  )
}

export default Footer

