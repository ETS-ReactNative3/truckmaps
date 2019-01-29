'use strict'

import keymirror from 'keymirror';

const actions = keymirror({
  GLOBAL_INIT: null,
  SEARCH_AUTOCOMPLETE: null,
  USER_SELECT: null,
  FETCH_ALL_PEOPLE: null,
  FETCH_LOCATION: null,
  FETCH_LOCATION_SUCCESS: null,
  FETCH_LOCATION_FAIL: null,
  FETCH_SINGLE_PERSON: null,

  //...
})

module.exports = actions;