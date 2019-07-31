import { combineReducers } from 'redux';
import voteReducer from './voteReducer';
import messageReducer from './messageReducer';
import authReducer from './authReducer';
import privateReducer from './privateReducer';

export default combineReducers({
  voteObject: voteReducer,
  messageObject: messageReducer,
  authObject: authReducer,
  privateObject: privateReducer
});
