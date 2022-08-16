import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiRequests, LoginData, LoginType } from "../api/api";
import { ThunkError } from "./store";
import AsyncStorage from "@react-native-async-storage/async-storage";


export type ErrorType = {
  username?: string[]
  email?: string[]
  error?: string
  last_name?: string[]
  first_name?: string[]
  password?: string[]
  detail?: {"detail": string}
}

type initialStateType = {
  isLogging: boolean
  data: LoginType | null
  error: null | ErrorType
  loading: boolean
};

const initialState: initialStateType = {
  isLogging: false,
  data: null as null | LoginType,
  error: null,
  loading: false,
};

export const loginAC = createAction<{ value: boolean }>("app/loginAC");
export const isLoadingAC = createAction<{ value: boolean }>("app/isLoadingAC");
export const clearAuthStateAC = createAction("app/clearAuthStateAC");

export const authTh = createAsyncThunk<any, LoginType, ThunkError>("auth/authTh", async (data, {
    dispatch,
    rejectWithValue,
  }) => {
    dispatch(isLoadingAC({ value: true }));
    try {
      await apiRequests.register(data);
      return data;
    } catch (err: any) {
      // Alert.alert("Some error with registration");
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
      await AsyncStorage.setItem("token", result.data.token)
      await AsyncStorage.setItem("user", JSON.stringify(result.data.user))
      return result.data.user;
    } catch (err: any) {
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
          state.isLogging = true;
          state.data = action.payload;
          state.loading = false;
        })
        .addCase(authTh.rejected, (state, action) => {
          if (action.payload) {
            state.error = action.payload;
          }
          state.loading = false;
        })
        .addCase(isLoadingAC, (state, action) => {
          state.loading = action.payload.value;
        })
        .addCase(clearAuthStateAC, (state, action) => {
          state.data = null;
          state.loading = false;
          state.error = null;
        })
        .addCase(loginTh.fulfilled, (state, action) => {
           state.isLogging = true;
           state.data = action.payload;
           state.loading = false;
        })
        .addCase(loginTh.rejected, (state, action) => {
          if (action.payload) {
            state.error = action.payload;
          }
          state.loading = false;
        });
    },
  },
);

export const authReducer = slice.reducer;
