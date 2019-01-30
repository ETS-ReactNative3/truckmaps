import {
    FETCH_INTERESTS,
  } from '../../constants/actions';

import interestData from '../../data/interests.json';

  export function fetchInterests(interest_ids) {
    
    let filteredData = interestData.filter((interestObj) => {
        return interest_ids.includes(interestObj.id)
      });
      console.log(filteredData, 'filterda')

    return (dispatch, getState) => {
      dispatch({ 
        type: FETCH_INTERESTS,
        payload: filteredData
      })
    }
  }