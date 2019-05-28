import axios from 'axios';
import { REGISTER_SUCCESS, LOGIN_SUCCESS, LOGOUT, UPDATE_PROFILE } from '../actions/types';
import { getMessages } from '../actions/messageActions';
const config = { headers: {'Content-Type': 'application/json'}};

// SEND REGISTRATION TO SERVER TO BE VERIFIED AND STORED. RETURN ERROR MESSAGE IF SERVER UNSUCCESSFUL,
// AUTH REDUCER TO LOG IN AND SUCCESS MESSAGE IF SUCCESSFUL
export const register = (info) => dispatch => {
  const body = JSON.stringify(info);
  axios.post('/api/users', body, config)
    .then(res => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      })
      dispatch(getMessages({'msg': 'Registration Success!! You are now logged in!!'}, null, 'success', 'regSuccess'))
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
      dispatch(getMessages({'msg': 'Successfully Logged You in!'}, null, 'success', 'loginSuccess'))
    })

    .catch(error => {
      dispatch(getMessages(error.response.data, error.response.status, 'error', 'modal'))
    })
}

// DISPATCH LOGOUT TO REDUCER AND LOGOUT MESSAGE TO MESSAGE REDUCER.
 export const logout = () => dispatch => {
   dispatch({
     type: LOGOUT
   })
   dispatch(getMessages({'msg': 'You are now logged out!'}, null, 'success', 'logout'))
 }

 export const updateProfile = (profile) => dispatch => {
   const newConfig = {
     headers: {
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('token')
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
