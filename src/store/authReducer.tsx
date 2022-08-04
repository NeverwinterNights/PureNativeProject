import { createAction, createSlice } from "@reduxjs/toolkit";

type initialStateType = {
  isLogging: boolean
  data: {}
  error: null | string
  loading: boolean
};

const initialState: initialStateType = {
  isLogging: false,
  data: {},
  error: null,
  loading: false,
};

export const loginAC = createAction<{ value: boolean }>("app/loginAC");

// export const sendPushTokenTh = createAsyncThunk('app/sendTushTokenTh', async (token: string, {
//   dispatch,
//   rejectWithValue,
// }) => {
//
//   },
// );

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loginAC, (state, action) => {
        state.isLogging = true;
      });
  },
});

export const authReducer = slice.reducer;
