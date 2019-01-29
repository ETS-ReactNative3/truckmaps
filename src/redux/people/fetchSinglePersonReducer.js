import {
    FETCH_SINGLE_PERSON
  } from '../../constants/actions';
  
  const initial = {
    person: []
  }
  
  export default function fetchPeopleReducer(state = initial, action) {
    switch (action.type) {
      case FETCH_SINGLE_PERSON:
        return {
            ...state,
            person: action.payload
        }
    }
    
    return state;
  }