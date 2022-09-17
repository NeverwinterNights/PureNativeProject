import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiRequests, LoginData, LoginType } from "../api/api";
import { ThunkError } from "./store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { isLoadingAC } from "./appReducer";


export type ErrorType = {
  username?: string[]
  email?: string[]
  error?: string
  last_name?: string[]
  first_name?: string[]
  password?: string[]
  detail?: string
}

type initialStateType = {
  isLogging: boolean
  data: LoginType | null
  error: null | ErrorType
};

const initialState: initialStateType = {
  isLogging: false,
  data: null as null | LoginType,
  error: null,
};

export const loginAC = createAction<{ value: boolean }>("auth/loginAC");
export const clearAuthStateAC = createAction("auth/clearAuthStateAC");
export const logOutAC = createAction("auth/logOutAC");
export const clearErrorInAuthAC = createAction("auth/clearErrorInAuthAC");

export const authTh = createAsyncThunk<any, LoginType, ThunkError>("auth/authTh", async (data, {
    dispatch,
    rejectWithValue,
  }) => {
    dispatch(isLoadingAC({ value: true }));
    try {
      await apiRequests.register(data);
      dispatch(isLoadingAC({ value: false }));
      return data;
    } catch (err: any) {
      // Alert.alert("Some error with registration");
      dispatch(isLoadingAC({ value: false }));
      return rejectWithValue(err.response.data ? err.response.data : { error: "Some error with registration" });
    }
  },
);

export const loginTh = createAsyncThunk<any, LoginData, ThunkError>("auth/loginTh", async (data, {
    dispatch,
    rejectWithValue,
  }) => {
    dispatch(isLoadingAC({ value: true }));
    try {
      const result = await apiRequests.login(data);
      await AsyncStorage.setItem("token", result.data.token);
      await AsyncStorage.setItem("user", JSON.stringify(result.data.user));
      dispatch(isLoadingAC({ value: false }));
      return result.data.user;
    } catch (err: any) {
      dispatch(isLoadingAC({ value: false }));
      return rejectWithValue(err.response.data ? err.response.data : { error: "Some error with login" });
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
          state.data = action.payload;
        })
        .addCase(authTh.rejected, (state, action) => {
          if (action.payload) {
            state.error = action.payload;
          }
        })
        .addCase(clearAuthStateAC, (state, action) => {
          state.data = null;
          state.error = null;
        })
        .addCase(loginTh.fulfilled, (state, action) => {
          state.isLogging = true;
          state.data = action.payload;
        })
        .addCase(loginTh.rejected, (state, action) => {
          if (action.payload) {
            state.error = { ...action.payload };
          }
        })
        .addCase(logOutAC, (state, action) => {
          AsyncStorage.removeItem("token");
          AsyncStorage.removeItem("user");
          state.data = null;
          state.isLogging = false;
        })
        .addCase(clearErrorInAuthAC, (state, action) => {
          state.error=null
        });
    },
  },
);

export const authReducer = slice.reducer;
