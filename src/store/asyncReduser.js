import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';

import Service from '../service/service';
const service = new Service();
const initialState = {
  isLoading: true,
  searchId: '',
  tickets: [],
  error: false,
};

const addTicketsArr = createAction('tickets/addTicketsArr');
export const getTickets = createAsyncThunk(
  'tickets/fetchTickets',

  async (params, { dispatch, rejectWithValue }) => {
    let stop = false;
    let count = 0;
    while (!stop) {
      try {
        const data = await service.getTickets(params);
        dispatch(addTicketsArr(data.tickets));
        stop = data.stop;
        count = 0;
        return data;
      } catch (e) {
        count++;
        if (count > 3) {
          return rejectWithValue(e.message);
        }
      }
    }
  }
);

const asyncReducer = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setSearchId(state, action) {
      return { ...state, searchId: action.payload };
    },
    addTicketsArr(state, action) {
      state.tickets = [...state.tickets, ...action.payload.tickets];
    },
  },
  extraReducers: {
    [getTickets.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getTickets.fulfilled.type]: (state, action) => {
      state.tickets = [...state.tickets, ...action.payload.tickets];
      state.isLoading = !action.payload.stop;
    },
    [getTickets.rejected.type]: (state) => {
      state.isLoading = false;
      state.error = true;
    },
  },
});

export const { setSearchId } = asyncReducer.actions;
export default asyncReducer.reducer;
