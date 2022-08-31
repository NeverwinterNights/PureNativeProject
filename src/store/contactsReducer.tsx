import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiRequests, LoginData } from "../api/api";
import { isLoadingAC } from "./appReducer";
import { ThunkError } from "./store";
import { ErrorType } from "./authReducer";

export type ContactData = {
  country_code: string
  id: number
  first_name: string
  last_name: string
  phone_number: string
  contact_picture: string
  is_favorite: boolean
}


type initialStateType = {
  data: ContactData[]
  error: null | ErrorType
  loading: boolean
};

const initialState: initialStateType = {
  data: [],
  error: null,
  loading: false,
};


export const clearErrorsAC = createAction("auth/clearErrorsAC");


export const getContactsTh = createAsyncThunk("contacts/getContactsTh", async (param, {
    dispatch,
    rejectWithValue,
  }) => {
    dispatch(isLoadingAC({ value: true }));

    try {
      const res = await apiRequests.getContacts();
      dispatch(isLoadingAC({ value: false }));
      return res.data;
    } catch (error) {
      dispatch(isLoadingAC({ value: false }));
    }
  },
);


export const createContactsTh = createAsyncThunk<any, any, ThunkError>("contacts/createContactsTh", async (param: { country_code: string, first_name: string, last_name: string, phone_number: string, contact_picture: string, is_favorite: boolean }, {
    dispatch,
    rejectWithValue,
  }) => {
    dispatch(isLoadingAC({ value: true }));
    try {
      const res = await apiRequests.createContacts({
        country_code: param.country_code,
        first_name: param.first_name,
        last_name: param.last_name,
        phone_number: param.phone_number,
        contact_picture: param.contact_picture,
        is_favorite: param.is_favorite || false,
      });
      // param.callback()
      dispatch(isLoadingAC({ value: false }));
      return res.data;
    } catch (error: any) {
      console.log("error.response.data", error.response.data);
      dispatch(isLoadingAC({ value: false }));
      return rejectWithValue(error.response.data ? error.response.data : { error: "Some error with create contact" });
    }
  },
);


export const deleteContactsTh = createAsyncThunk("contacts/deleteContactsTh", async (param: { id: number }, {
    dispatch,
    rejectWithValue,
  }) => {
    dispatch(isLoadingAC({ value: true }));

    try {
      const res = await apiRequests.deleteContacts(param.id);
      dispatch(isLoadingAC({ value: false }));
      return param.id
      // return res.data;
    } catch (error) {
      dispatch(isLoadingAC({ value: false }));
    }
  },
);


export const updateContactsTh = createAsyncThunk("contacts/updateContactsTh", async (param: {id:number, country_code: string, first_name: string, last_name: string, phone_number: string, contact_picture: string, is_favorite: boolean }, {
    dispatch,
    rejectWithValue,
  }) => {
    dispatch(isLoadingAC({ value: true }));

    try {
      const res = await apiRequests.updateContacts
        ({
          id: param.id,
          country_code: param.country_code,
          first_name: param.first_name,
          last_name: param.last_name,
          phone_number: param.phone_number,
          contact_picture: param.contact_picture,
          is_favorite: param.is_favorite || false,
        });
      return res.data
    } catch (error) {
    }
    finally {
      dispatch(isLoadingAC({ value: false }));
    }
  },
);


const slice = createSlice({
  name: "contacts",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getContactsTh.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(createContactsTh.fulfilled, (state, action) => {
        state.data = [...state.data, action.payload];
      })
      .addCase(createContactsTh.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload;
        }
      })
      .addCase(clearErrorsAC, (state, action) => {
        state.error = null;
      })
      .addCase(deleteContactsTh.fulfilled, (state, action) => {
          const index = state.data.findIndex((contact) => contact.id === action.payload)
        if (index >= 0) {
          state.data.splice(index, 1)
        }
      })
      .addCase(updateContactsTh.fulfilled, (state, action) => {
        const index:number = state.data.findIndex((contact) => contact.id === action.payload.id)
        state.data[index] = action.payload
      })
  },
});

export const contactsReducer = slice.reducer;
