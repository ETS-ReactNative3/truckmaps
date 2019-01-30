import {
    FETCH_INTERESTS
  } from '../../constants/actions';
  
  const initial = {
    interests: []
  }

  export default function fetchInterestReducer(state = initial, action) {
    switch (action.type) {
      case FETCH_INTERESTS:
        return {
            ...state,
            interests: action.payload
        }
    }
    
    return state;
  }