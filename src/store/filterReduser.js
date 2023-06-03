import { createSlice } from '@reduxjs/toolkit';

const checkedAll = (list) =>
  Object.keys(list).reduce((acc, key) => {
    acc[key] = !list.all;
    return acc;
  }, {});

const checkboxFilters = (filter, filterList) => {
  let newList = {};
  if (filter === 'all') {
    newList = checkedAll(filterList);
  } else {
    newList = { ...filterList, [filter]: !filterList[filter], all: false };
  }
  if (Object.values(newList).filter((value) => value).length === 4) {
    newList = { ...newList, all: true };
  }
  return newList;
};

const filterReducer = createSlice({
  name: 'filter',
  initialState: {
    checked: {
      all: true,
      0: true,
      1: true,
      2: true,
      3: true,
    },
  },
  reducers: {
    actionFilter(state, action) {
      state.checked = checkboxFilters(action.payload, state.checked);
    },
  },
});

export default filterReducer.reducer;
export const { actionFilter } = filterReducer.actions;
