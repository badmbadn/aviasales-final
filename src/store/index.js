import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import filterReduser from './filterReduser';
import asyncReduser from './asyncReduser';
import sortReducer from './sortReducer';

const store = configureStore({
  reducer: {
    filter: filterReduser,
    data: asyncReduser,
    sort: sortReducer,
  },
  middleware: [thunk],
});

export default store;
