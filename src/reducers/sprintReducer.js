import { GET_SPRINTS, ADD_SPRINT_DATA } from '../actions/types';

const initialState = {
  completed:[],
  sprints:[],
  fetched: false,
}

export default function(state=initialState, action) {
  switch (action.type) {
    case GET_SPRINTS:
      let arr = localStorage.getItem('complete');
      let comArr;
      if (arr === null) {
        comArr = [];
      } else {
        comArr = arr.split(',');
      }
      return Object.assign({}, state, {
        completed: comArr,
        sprints:action.payload,
        fetched:true,
      });
    case ADD_SPRINT_DATA:
      let a = localStorage.getItem('complete');
      let comA;
      if (a === null) {
        comA = [];
      } else {
        comA = a.split(',');
      }
      let array = state.sprints.map((vote, index) => {
        if (vote._id !== action.payload.sprint._id) {
          return vote;
        }
        return action.payload.sprint;
      })
      console.log(action.payload);
      console.log(array)
      return Object.assign({}, state, {
        sprints: array,
        fetched:true,
        completed: comA,
      });
    default:
      return state;
  }
}
