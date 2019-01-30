import {
    FETCH_ALL_PEOPLE,
  } from '../../constants/actions';
  
  const initial = {
    people: []
  }
  
  export default function fetchPeopleReducer(state = initial, action) {
    switch (action.type) {
      case FETCH_ALL_PEOPLE:
        return {
            ...state, 
            people: action.payload
        }
    }
    
    return state;
  }