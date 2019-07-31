
import { GET_MESSAGES, CLEAR_MESSAGES  } from '../actions/types';

// SEND MESSAGE TO MESSAGE REDUCER, INCLUDES THE MESSAGE (msg), STATUS (status) either a server error or vote _id
// TYPE ('error' or 'success') AND ID (id) TO DIFFERENTIATE DIFFERENT MESSAGES (ie. 'modal')
export const getMessages = (msg, status, type='error', id=null) => {
  return {
    type: GET_MESSAGES,
    payload: {msg, status, type, id}
  };
};

// CLEAR MESSAGES OUT OF STORE, TO CLEAR INTERFACE
export const clearMessages = () => {
  return {
    type: CLEAR_MESSAGES
  };
};
