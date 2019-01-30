'use strict';

// Actions

import * as globalActions from './global/globalActions';
import * as searchActions from './search/searchActions';
import * as userActions from './user/userActions';
import * as fetchPeopleActions from './people/fetchPeopleActions';
import * as fetchLocation from './location/locationActions';
import * as fetchSinglePersonActions from './people/fetchSinglePersonActions';
import * as fetchInterests from './people/fetchInterestsActions';

export const actions = [
  globalActions,
  searchActions,
  userActions,
  fetchPeopleActions,
  fetchLocation,
  fetchSinglePersonActions,
  fetchInterests
];

// Reducers

import global from './global/globalReducer';
import search from './search/searchReducer';
import user from './user/userReducer';
import people from './people/fetchPeopleReducer';
import location from './location/locationReducer';
import singlePerson from './people/fetchSinglePersonReducer';
import interests from './people/fetchInterestsReducer';

import { combineReducers } from 'redux';

export const rootReducer = combineReducers({
  global,
  search,
  user,
  people,
  location,
  singlePerson,
  interests
});
