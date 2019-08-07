import axios from 'axios';
import { REGISTER_SUCCESS, LOGIN_SUCCESS, LOGOUT, UPDATE_PROFILE, FACEBOOK_LOGIN, GOOGLE_LOGIN, RETURN_USER, VERIFIED_EMAIL } from '../actions/types';
import { getMessages } from '../actions/messageActions';
const config = { headers: {'Content-Type': 'application/json'}};

// SEND REGISTRATION TO SERVER TO BE VERIFIED AND STORED. RETURN ERROR MESSAGE IF SERVER UNSUCCESSFUL,
// AUTH REDUCER TO LOG IN AND SUCCESS MESSAGE IF SUCCESSFUL
export const register = (info) => dispatch => {
  const body = JSON.stringify(info);
  axios.post('/api/users', body, config)
    .then(res => {
      // dispatch({
      //   type: REGISTER_SUCCESS,
      //   payload: res.data
      // })
      dispatch(getMessages({'msg': 'Registration Success!! Please verify your email to login.'}, null, 'success', 'regSuccess'))
    })
    .catch(error => {
      dispatch(getMessages(error.response.data, error.response.status, 'error', 'modal'));
    })
};

// LOGIN. DISPATCH AUTH REDUCER AND SUCCESS MESSAGE ON SUCCESS. ERROR MESSAGE IF UNSUCCESSFUL
export const login = (info) => dispatch => {
  const body = JSON.stringify(info);
  axios.post('api/auth', body, config)
    .then(res => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      })
      dispatch(getMessages({'msg': 'Successfully Logged You int!'}, null, 'success', 'loginSuccess'))
    })

    .catch(error => {
      dispatch(getMessages(error.response.data, error.response.status, 'error', 'modal'))
    })
}

export const verifyEmail = (name, hash, id) => dispatch => {
  let info = {
    name: name,
    hash: hash
  }
  const body = JSON.stringify(info);
  axios.put(`/api/auth/verify/${id}`, body, config)
    .then(res => {
      dispatch({
        type: VERIFIED_EMAIL,
        payload: res.data
      })
      dispatch(getMessages({'msg': 'Successfully verified your Email. You may now log in!!'}, null, 'success', 'loginSuccess'))
    })

    .catch(error => {
      dispatch(getMessages(error.response.data, error.response.status, 'error', null))
    })
}

// DISPATCH LOGOUT TO REDUCER AND LOGOUT MESSAGE TO MESSAGE REDUCER.
export const logout = (social) => dispatch => {
  if (social === false) {
    axios.post('api/auth/logout')
      .then(res => {
        dispatch({
          type: LOGOUT
        })
        dispatch(getMessages(res.data, null, 'success', 'logout'))
      })
  } else {
    dispatch({
      type: LOGOUT
    })
    dispatch(getMessages({'msg': 'You were successully logged out'}, null, 'success', 'logout'))
  }

 }

export const updateProfile = (profile) => dispatch => {
   const newConfig = {
     headers: {
      'Content-Type': 'application/json',
     }
   }
   const body = JSON.stringify(profile);
   axios.put('api/users', body, newConfig)
    .then(res => {
      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data
      });
      dispatch(getMessages(res.data, null, 'success', null))
    })
    .catch(error => {

      dispatch(getMessages(error.response.data, error.response.status, 'error', 'modal' ))
    })
 }

 export const deleteAccount = (user, pass) => dispatch => {
   axios.delete(
     `api/users/${user}`,
     {headers: {
       'Content-Type': 'application/json',
     }, data: {
       id: user,
       password: pass
     }})
    .then(res => {
      dispatch({
        type: LOGOUT
      })
      dispatch(getMessages({'msg': 'You have successfully deleted your account, you are now logged out. Come back anytime, we good :)'}))
    })
    .catch(error => {
      dispatch(getMessages(error.response.data, error.response.status, 'error', 'modal'))
    })
 }

 export const googleLogin = info => dispatch => {
   dispatch({
     type: GOOGLE_LOGIN,
     payload: info
   })
 }

export const facebookLogin = info => dispatch => {
  dispatch({
    type: FACEBOOK_LOGIN,
    payload: info
  })
}
export const returnUser = user => dispatch => {
  dispatch({
    type: RETURN_USER,
    payload: user
  })
}

 export const checkToke = () => dispatch => {
   const newConfig = {
     headers: {
      'Content-Type': 'application/json',
     }
   }
   axios.get('api/auth/user', newConfig)
     .then(res => {
       dispatch({
         type: LOGIN_SUCCESS,
         payload: res.data
       })
       dispatch(getMessages({'msg': 'You were successfully logged in.'}, 200, 'success', null))
     })
     .catch(error => {
       dispatch({type: LOGOUT});
       dispatch(getMessages(error.response.data, error.response.status, 'error', null))
     })
 }
