import { VOTE_INFO, RESET_INFO, VOTE_LOADING, GET_VOTES, POST_VOTE, ADD_VOTE, NO_LOAD } from '../actions/types';

const infoInitialState = {
  name: '',
  desc: '',
  creator: '',
  saved: false
}

const initialState = {
  info: infoInitialState,
  votes: [],
  loading: false,
  fetched: false
}
export default function(state=initialState, action) {
  switch(action.type) {
    case GET_VOTES:
      console.log(action.payload);
      return Object.assign({}, state, {
        votes: action.payload,
        loading: false,
        fetched: true
      })
    case VOTE_INFO:
      console.log(action.payload)
      return Object.assign({}, state, {
        info: action.payload,
        loading: false
      })
    case POST_VOTE:
      return Object.assign({}, state, {
        info: infoInitialState
      })
    case RESET_INFO:
      return Object.assign({}, state, {
        info: infoInitialState
      })
    // case DELETE_VOTE:
    //   let newArray = state.votes.filter(vote => vote._id !== action.payload);
    //   return Object.assign({}, state, {
    //     votes: newArray
    //   })
    case VOTE_LOADING:
      return Object.assign({}, state, {
        loading: true
      })
    case ADD_VOTE:
      let array = state.votes.map((vote, index) => {
        if (vote._id !== action.payload._id) {
          return vote;
        }
        return action.payload;
      })
      return Object.assign({}, state, {
        votes: array
      });
      // return Object.assign
    case NO_LOAD:
      console.log('There was an error fething the data: ' + action.payload);
      return state;
    default:
      return state
  }
}
