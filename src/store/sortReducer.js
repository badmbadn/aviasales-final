import { createSlice } from '@reduxjs/toolkit';

const initialState = { sortItem: 'cheapest' };
const sortReducer = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    sortChange(state, action) {
      return { ...state, sortItem: action.payload };
    },
  },
});

export const { sortChange } = sortReducer.actions;
export default sortReducer.reducer;
