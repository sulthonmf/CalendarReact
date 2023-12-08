import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface DateState {
  start: {
    date: string;
    time: string;
  };
  end: {
    date: string;
    time: string;
  };
}

const initialState: DateState = {
  start: {
    date: '',
    time: '',
  },
  end: {
    date: '',
    time: '',
  },
};

const dateSlice = createSlice({
  name: 'dates',
  initialState,
  reducers: {
    setStart: (state, action: PayloadAction<{ date: string; time: string }>) => {
      state.start = action.payload;
    },
    setEnd: (state, action: PayloadAction<{ date: string; time: string }>) => {
      state.end = action.payload;
    },
  },
});

export const { setStart, setEnd } = dateSlice.actions;
export default dateSlice.reducer;