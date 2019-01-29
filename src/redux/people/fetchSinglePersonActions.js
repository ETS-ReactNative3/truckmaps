import {
    FETCH_SINGLE_PERSON
  } from '../../constants/actions';
import peopleData from '../../data/people.json';

  export function fetchPerson(person) {
    // console.log(peopleData)
    // console.log('works')
    return (dispatch, getState) => {
      dispatch({
        type: FETCH_SINGLE_PERSON,
        payload: person
      })
    }
  }