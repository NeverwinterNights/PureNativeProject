import { createAction, createSlice } from "@reduxjs/toolkit";

type initialStateType = {
  num: number;
};

const initialState: initialStateType = {
  num: 1,
};

export const addElAC = createAction<number>("app/setRegisterErrorAC");

// export const sendPushTokenTh = createAsyncThunk('app/sendTushTokenTh', async (token: string, {
//   dispatch,
//   rejectWithValue,
// }) => {
//
//   },
// );

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(addElAC, (state, action) => {
        state.num = action.payload;
      });
  },
});

export const appReducer = slice.reducer;
