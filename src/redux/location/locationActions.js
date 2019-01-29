import {
    FETCH_LOCATION,
    FETCH_LOCATION_SUCCESS,
    FETCH_LOCATION_FAIL
  } from '../../constants/actions';

  export function fetchLocation({latitude, longitude}) {
    const url = `https://services.gisgraphy.com/reversegeocoding/search?format=json&lat=${latitude}&lng=${longitude}`;
    return (dispatch, getState) => {
        dispatch({ type: FETCH_LOCATION })
        return fetch(url).then(response => response.json())
        .then(data => {
            console.log(data, 'data')
            dispatch({ type: FETCH_LOCATION_SUCCESS, payload: data })
        })
        .catch(error => {
            dispatch({ type: FETCH_LOCATION_FAIL, payload: error })
        })
    }
  }