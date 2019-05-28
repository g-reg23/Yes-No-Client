import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  UPDATE_PROFILE
} from '../actions/types';

const authInitialState = {
  isAuthenticated: false,
  _id: null,
  username: '',
  email: '',
  token: null
}


export default function(state=authInitialState, action) {
  switch(action.type) {
    case REGISTER_SUCCESS:
      console.log(action.payload.token);
      localStorage.setItem('token', action.payload.token);
      return Object.assign({}, state, {
        isAuthenticated: true,
        _id: action.payload.user._id,
        username: action.payload.user.username,
        email: action.payload.user.email,
        token: action.payload.token
      })
    case REGISTER_FAIL:
      return state;
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return Object.assign({}, state, {
        isAuthenticated: true,
        _id: action.payload.user._id,
        username: action.payload.user.username,
        email: action.payload.user.email,
        token: action.payload.token
      })
    case UPDATE_PROFILE:
      console.log(action.payload);
      return Object.assign({}, state, {
        ...state,
        username: action.payload.body.username,
        email: action.payload.body.email,
      });
    case LOGOUT:
      return Object.assign({}, state, authInitialState)
    default:
      return state;
  }
}
