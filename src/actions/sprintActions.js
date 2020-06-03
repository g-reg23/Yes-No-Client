import axios from 'axios';
import { GET_SPRINTS, ADD_SPRINT_DATA } from '../actions/types';
import { getMessages } from '../actions/messageActions';
const config = { headers: {'Content-Type': 'application/json'}};


export const getSprints = () => dispatch => {
  axios
    .get('/api/sprint')
    .then(res => {
      dispatch({
        type: GET_SPRINTS,
        payload: res.data
      })
      dispatch(getMessages({'msg': 'Successfully retrieved the sprint!'}, 200, 'success', ''));
    })
    .catch(error => {
      dispatch(getMessages({'msg': 'Sorry, we couldnt get the sprint data. Please check internet connection and refresh page.'}, 401, 'danger', ''));
    })
}

export const postSprintData = (info) => dispatch => {
  const body = JSON.stringify(info)
  axios
    .post('/api/sprint/addSprintData', body, config)
    .then(res => {
      let ids = info.completed;
      ids.push(info._id);
      localStorage.setItem('complete', ids.toString());
      dispatch({
        type:ADD_SPRINT_DATA,
        payload:res.data,
      })
      dispatch(getMessages({'msg': 'You successfully finished the Sprint. View the data below.'},200, 'success', ''))
    })
    .catch(error => {
      console.log(error);
      dispatch(getMessages({'msg':'Unable to hit endpoint.'}, '400', 'danger', ''))
    })
}
