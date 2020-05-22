import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Login } from '../../Redux/Google_login/google_actions'
import { GoogleLogin } from 'react-google-login'
import { get_config } from '../Config'
import { Link } from 'react-router-dom'
import { getUserData } from '../../Redux/User_data/user_data_actions'

function Googlelogin() {
  const isLogin = useSelector((state) => state.google_json.isLogin)
  const google_json = useSelector((state) => state.google_json.data)
  const user_name = isLogin ? google_json.profileObj.givenName : null
  const img = isLogin ? google_json.profileObj.imageUrl : null
  const dispatch = useDispatch()
  const signIn = (response) => {
    dispatch(Login(response))
    dispatch(getUserData({ user_id: response.profileObj.email }))
  }
  const error = (response) => {
    console.log(response)
  }
  return (
    <>
      {isLogin ? (
        <Link className='google-user nav-link text-light' to='/myaccount'>
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
    </>
  )
}

export default Googlelogin
