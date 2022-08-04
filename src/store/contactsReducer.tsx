import { createAction, createSlice } from "@reduxjs/toolkit";

type initialStateType = {
  data: {}
  error: null | string
  loading: boolean
};

const initialState: initialStateType = {
  data: {},
  error: null,
  loading: false,
};



// export const sendPushTokenTh = createAsyncThunk('app/sendTushTokenTh', async (token: string, {
//   dispatch,
//   rejectWithValue,
// }) => {
//
//   },
// );

const slice = createSlice({
  name: "contacts",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // .addCase(loginAC, (state, action) => {

  //     });
 },
});

export const contactsReducer = slice.reducer;
