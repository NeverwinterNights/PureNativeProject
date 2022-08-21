import { createAction, createSlice } from "@reduxjs/toolkit";

type initialStateType = {
  loading: boolean
};

const initialState: initialStateType = {
  loading: false
};


export const isLoadingAC = createAction<{ value: boolean }>("app/isLoadingAC");


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
      .addCase(isLoadingAC, (state, action) => {
      state.loading = action.payload.value
      });
  },
});

export const appReducer = slice.reducer;
