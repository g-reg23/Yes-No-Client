import axios from 'axios';
import { GET_PRIVATE_VOTES, ADD_PRIVATE_VOTES, PRIVATE_VOTE_INFO, RESET_PRIVATE_INFO, FETCH_PAST_PRIVATE } from '../actions/types';
import { getMessages } from '../actions/messageActions';
import { returnUser } from '../actions/authActions';

// FETCH DATA FROM DATABASE. DISPATCH TO Private VOTE REDUCER. RETURN ERROR IF UNSUCCESSFUL
export const getPrivateVotes = data => dispatch => {
  const newConfig = {
    headers: {
     'Content-Type': 'application/json',
    }
  }
  axios
    .get(`/api/privateVotes/${data.id}`, newConfig)
    .then(res => {
      if (res.data.voters !== undefined) {
        dispatch({
          type: GET_PRIVATE_VOTES,
          payload: res.data
        })
        dispatch(getMessages({'msg': 'Private vote loaded!!'}, 200, 'success', 'privVoteLoad'));
      } else {
        dispatch(returnUser(res.data))
        dispatch(getMessages({'msg': 'Your latest private vote has expired. Please make a new vote, or to view older votes, click Archive under the Private tab.'}), 200, 'danger', 'PrivVoteNoLoad')
      }
    })
    .catch(error => {
      dispatch(getMessages(error.response.data, error.response.status))
    })
}
export const getPrivateView = id => dispatch => {
  axios
    .get(`/api/privateVotes/view/${id}`)
    .then(res => {
      dispatch({
        type: GET_PRIVATE_VOTES,
        payload: res.data
      })
      dispatch(getMessages({'msg': 'Private vote loaded!!'}), 200, 'success');
    })
    .catch(error => {
      dispatch(getMessages(error.response.data, error.response.status), 'warning', 'PrivVoteNoLoad')
    })
}

export const privInfo = vote =>  {
  return {
    type: PRIVATE_VOTE_INFO,
    payload: vote
  }
}
export const fetchPastPrivateVotes = id => dispatch => {
  axios
    .get(`api/privateVotes/archive/${id}`)
    .then(res => {
      dispatch({
        type: FETCH_PAST_PRIVATE,
        payload: res.data
      })
      dispatch(getMessages({'msg': 'Your past private votes were loaded!!'}, null, 'success', ''))
    })
    .catch(error => {
      dispatch(getMessages(error.response.data, error.response.status, 'warning', 'pastVotesNoLoad'));
    })

}

export const addPrivateVote = vote => dispatch => {
  const newConfig = {
    headers: {
     'Content-Type': 'application/json',
    }
  }
  axios
    .put(`/api/privateVotes/${vote._id}`, vote, newConfig)
    .then(res => {
      dispatch({
        type: ADD_PRIVATE_VOTES,
        payload: res.data,
      })
      dispatch(getMessages({'msg': 'Vote was successfully added!'}, null, 'success', 'addPrivVote'))
    })
    .catch(error => {
      dispatch(getMessages(error.response.data, error.response.status, 'secondary', 'addPrivVote'))
    })

}

export const postPrivateVote = (newVote) => dispatch => {
  const newConfig = {
    headers: {
     'Content-Type': 'application/json',
    }
  }
  const body = JSON.stringify(newVote);
  axios
    .post('/api/privateVotes', body, newConfig)
      .then(res => {
        dispatch(returnUser(res.data))
        dispatch(getMessages({'msg': 'Your private vote was stored and messages were sent to all members of the vote.'}, 200, 'success', null))
      })
      .catch(error => {
        dispatch(getMessages(error.response.data, null, 'secondary', 'constructPrivateServer'))
      })
}

export const resetPrivateInfo = () => {
  return {
    type: RESET_PRIVATE_INFO
  }
}
