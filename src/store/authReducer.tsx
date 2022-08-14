import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiRequests, LoginType } from "../api/api";
import { ThunkError } from "./store";
import { Alert } from "react-native";

type initialStateType = {
  isLogging: boolean
  data: LoginType | null
  error: null | string
  loading: boolean
};

const initialState: initialStateType = {
  isLogging: false,
  data: null as null | LoginType,
  error: null,
  loading: false,
};

export const loginAC = createAction<{ value: boolean }>("app/loginAC");

export const authTh = createAsyncThunk<any, LoginType, ThunkError>("auth/authTh", async (data, {
    dispatch,
    rejectWithValue,
  }) => {
    try {
      const result = await apiRequests.login(data);
      return data;
    } catch (err) {
      Alert.alert("Some error with registration" )
      return rejectWithValue({ error: "Some error with registration" });
    }
  },
);

const slice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: builder => {
      builder
        .addCase(authTh.fulfilled, (state, action) => {
          state.isLogging = true;
          state.data = action.payload;
        })
        .addCase(authTh.rejected, (state, action) => {
          if (action.payload) {
            state.error = action.payload.error;
          }
        });
    },
  },
);

export const authReducer = slice.reducer;
