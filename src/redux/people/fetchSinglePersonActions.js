import {
    FETCH_SINGLE_PERSON
  } from '../../constants/actions';

  export function fetchPerson(person) {

    return (dispatch, getState) => {
      dispatch({
        type: FETCH_SINGLE_PERSON,
        payload: person
      })
    }
  }