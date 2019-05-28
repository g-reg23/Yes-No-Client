import { GET_MESSAGES, CLEAR_MESSAGES  } from '../actions/types';

const messageInitialState = {
  msg: '',
  status: null,
  type: '',
  id: null
}


export default function(state=messageInitialState, action) {
  switch(action.type) {
    case GET_MESSAGES:
      return {
        msg: action.payload.msg.msg,
        status: action.payload.status,
        type: action.payload.type,
        id: action.payload.id
      };
    case CLEAR_MESSAGES:
      return messageInitialState;
    default:
      return state;
  }
}
