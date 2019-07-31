import axios from 'axios';
import { GET_VOTES, VOTE_INFO, RESET_INFO, VOTE_LOADING, POST_VOTE, ADD_VOTE , POST_PRIVATE_VOTE } from '../actions/types';
import { getMessages } from '../actions/messageActions';


// FETCH DATA FROM DATABASE. DISPATCH TO VOTE REDUCER. RETURN ERROR IF UNSUCCESSFUL
export const getVotes = () => dispatch => {
  dispatch(setVotesLoading());
  axios
    .get('/api/votes')
    .then(res =>
      dispatch({
        type: GET_VOTES,
        payload: res.data
      })
    )
    .catch(error => {
      dispatch(getMessages(error.response.data, error.response.status))
    })
}

// POST A NEW VOTE. ADD CONTENT TYPE AND JWT TOKEN TO HEADER FOR AUTHENTICATION.
// IF SUCCESSFUL ADD VOTE TO REDUX IN VOTE REDUCER. ERROR IF UNSUCCESSFUL.
export const postVote = (newVote) => dispatch => {
  console.log('actions');
  const newConfig = {
    headers: {
     'Content-Type': 'application/json',
    }
  }
  axios
    .post('/api/votes', newVote, newConfig)
    .then(res => {
      dispatch({
        type: POST_VOTE,
        payload: res.data
      })
      dispatch(getMessages({'msg': 'Your vote was successfully stored!'}, null, 'success', 'votePosted'))
    })
    .catch(error => {
      dispatch(getMessages(error.response.data, 400, 'error'))
    })
}

// VOTE INFORMATION SUBMITTED FOR USER REVIEW.
export const voteInfo = voteObject =>  {
  return {
    type: VOTE_INFO,
    payload: voteObject
  }
}
// VOTE INFORMATION RESET FOR EDITING.
export const resetInfo = () => {
  return {
    type: RESET_INFO
  }
}
// FUNCTION TO DELETE A VOTE, CURRENTLY DISABLED.
// export const deleteVote = id => dispatch => {
//   axios
//     .delete(`/api/votes/${id}`)
//     .then(res =>
//       dispatch({
//         type: DELETE_VOTE,
//         payload: id
//       })
//   )
// }

// TO KNOW WHILE VOTES ARE LOADING, SET SPINNER ETC.
export const setVotesLoading = () => {
  return {
    type: VOTE_LOADING
  }
}

// ADD YES OR NO VOTE AND VOTER TO VOTER ARRAY TO DATABASE AND ON SUCCESS ADD RESULTS TO REDUX STORE. SEND JWT FOR AUTHENTICATION.
// ERROR MESSAGE IF UNSUCCESSFUL.
export const addVote = vote => dispatch => {
  const newConfig = {
    headers: {
     'Content-Type': 'application/json',
    }
  }
  const body = JSON.stringify(vote);
  axios
   .put('/api/votes', body, newConfig)
   .then(res => {
     console.log(res.data);
     dispatch({
       type: ADD_VOTE,
       payload: res.data
     })
     dispatch(getMessages({'msg': 'Your vote was added!!'}, vote._id, 'success', 'yesno'))
   })
   .catch(err => {
     dispatch(getMessages(err.response.data, vote._id, 'error', 'yesno'))
   })

}
