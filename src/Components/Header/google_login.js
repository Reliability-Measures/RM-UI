import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logOut, Login } from '../../Redux/Google_login/google_actions'
import { GoogleLogin, GoogleLogout } from 'react-google-login'
import { get_config } from '../Config'

function Googlelogin() {
  const isLogin = useSelector((state) => state.google_json.isLogin)
  const google_json = useSelector((state) => state.google_json.data)
  const user_name = isLogin ? google_json.profileObj.givenName : null
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
      {isLogin ? <h5 className='google-user'>Welcome {user_name}</h5> : null}
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
