import {
    FETCH_LOCATION,
    FETCH_LOCATION_SUCCESS,
    FETCH_LOCATION_FAIL
  } from '../../constants/actions';
  
  const initial = {
    isFetching: null,
    data: [],
    hasError: false,
    errorMessage: null,
  }
  
  export default function locationReducer(state = initial, action) {
    switch (action.type) {
      case FETCH_LOCATION:
        return {
            ...state,
            isFetching: true
        }
        case FETCH_LOCATION_SUCCESS:
        return {
            ...state,
            isFetching: false,
            data: action.payload,
        }
        case FETCH_LOCATION_FAIL:
        return {
            ...state,
            isFetching: false,
            data: action.payload,
            hasError: true,
            errorMessage: action.error
        }
        default:
        return state;
    }
    
    // return state;
  }