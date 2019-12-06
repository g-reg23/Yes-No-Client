
import { GET_MESSAGES, CLEAR_MESSAGES  } from '../actions/types';

// SEND MESSAGE TO MESSAGE REDUCER, 4 ARGUMENTS.
// (msg, status, type, id)
// msg, text to display for user. ex. {'msg': 'That user does not exist.'}
// status, the return status from server, Used on client side as an individual identifier for public votes.
// type, reactstrap color attribute, ie. 'success', 'danger', 'info', 'secondary' etc.
// id, identifier for message, ie. loginSuccess, regSuccess, helps for placement of alerts.
export const getMessages = (msg, status, type='danger', id=null) => {
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
