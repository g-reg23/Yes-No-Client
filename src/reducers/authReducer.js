import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  UPDATE_PROFILE,
  FACEBOOK_LOGIN,
  GOOGLE_LOGIN,
  RETURN_USER,
  VERIFIED_EMAIL,
} from '../actions/types';

const authInitialState = {
  isAuthenticated: false,
  _id: null,
  username: '',
  email: '',
  facebook: false,
  google: false,
  pic: '',
  private: {},
}


export default function(state=authInitialState, action) {
  switch(action.type) {
    case REGISTER_SUCCESS:
      return Object.assign({}, state, {
        isAuthenticated: true,
        _id: action.payload.user._id,
        username: action.payload.user.username,
        email: action.payload.user.email,
        private: action.payload.user.private
      })
    case REGISTER_FAIL:
      return state;
    case LOGIN_SUCCESS:
      console.log(action.payload.user)
      return Object.assign({}, state, {
        isAuthenticated: true,
        _id: action.payload.user._id,
        username: action.payload.user.username,
        email: action.payload.user.email,
        private: action.payload.user.private
      })
    case RETURN_USER:
    console.log('ko')
      return Object.assign({}, state, {
        isAuthenticated: true,
        _id: action.payload._id,
        username: action.payload.username,
        email: action.payload.email,
        private: action.payload.private
      })
    case FACEBOOK_LOGIN:
      console.log(action.payload);
      return Object.assign({}, state, {
        isAuthenticated: true,
        _id: action.payload.id,
        username: action.payload.name,
        email: action.payload.email,
        facebook: true,
        pic: action.payload.picture.data
      })
      case VERIFIED_EMAIL:
        return state;
      case GOOGLE_LOGIN:
        console.log(action.payload);
        return Object.assign({}, state, {
          isAuthenticated: true,
          _id: action.payload.id,
          username: action.payload.name,
          email: action.payload.email,
          google: true,
          pic: action.payload.imageUrl
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
