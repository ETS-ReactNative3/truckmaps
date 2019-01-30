import {
    FETCH_ALL_PEOPLE
  } from '../../constants/actions';
  
import peopleData from '../../data/people.json';

  export function fetchAllPeople() {

    return (dispatch, getState) => {
      dispatch({
        type: FETCH_ALL_PEOPLE,
        payload: peopleData
      })
    }
  }