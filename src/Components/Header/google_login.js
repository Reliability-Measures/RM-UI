import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logOut, Login } from '../../Redux/Google_login/google_actions'
import { GoogleLogin, GoogleLogout } from 'react-google-login'
import { get_config } from '../Config'
import { Link } from 'react-router-dom'

function Googlelogin() {
  const isLogin = useSelector((state) => state.google_json.isLogin)
  const google_json = useSelector((state) => state.google_json.data)
  const user_name = isLogin ? google_json.profileObj.givenName : null
  const img = isLogin ? google_json.profileObj.imageUrl : null
  const dispatch = useDispatch()
  const signIn = (response) => {
    dispatch(Login(response))
  }
  const error = (response) => {
    console.log(response)
  }
  const logout = (response) => {
    console.log(response)
    dispatch(logOut())
  }
  return (
    <>
      {isLogin ? (
        <Link className='google-user nav-link text-light' >
          {user_name} <img src={img} alt='Profile Pic' height={50} style={{ borderRadius: 50 }}></img>
        </Link>
      ) : null}
      {!isLogin ? (
        <GoogleLogin
          clientId={get_config('application_client_id')}
          buttonText='Sign in with Google'
          onSuccess={signIn}
          onFailure={error}
          isSignedIn={true}
          //scope='https://www.googleapis.com/auth/spreadsheets.readonly https://www.googleapis.com/auth/classroom.courses'
          cookiePolicy={'single_host_origin'}
        />
      ) : null}
      {isLogin ? (
        <GoogleLogout clientId={get_config('application_client_id')} buttonText='Logout' onLogoutSuccess={logout} />
      ) : null}
    </>
  )
}

export default Googlelogin
