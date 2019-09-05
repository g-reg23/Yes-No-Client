import { GET_PRIVATE_VOTES, ADD_PRIVATE_VOTES, POST_VOTE, PRIVATE_VOTE_INFO, RESET_PRIVATE_INFO, FETCH_PAST_PRIVATE } from '../actions/types';

const infoInitialState = {
  name: '',
  desc: '',
  voteLength: '',
  creator: '',
  saved: false
}

const initialState = {
  active: false,
  info: infoInitialState,
  vote: {},
  past: [],
  loaded: false
}


export default function(state=initialState, action) {
  switch(action.type) {
    case GET_PRIVATE_VOTES:
      return Object.assign({}, state, {
        active: true,
        info: infoInitialState,
        vote: action.payload,
        loaded: true,
      })
    case PRIVATE_VOTE_INFO:
      return Object.assign({}, state, {
        info: action.payload,
      })
    case ADD_PRIVATE_VOTES:
      return Object.assign({}, state, {
        vote: action.payload
      })
    case FETCH_PAST_PRIVATE:
      return Object.assign({}, state, {
        past: action.payload
      })
    case POST_VOTE:
      return Object.assign({}, state, {
        info: infoInitialState
      })
    case RESET_PRIVATE_INFO:
      return Object.assign({}, state, {
        info: infoInitialState
      })
    default:
      return state
  }
}
