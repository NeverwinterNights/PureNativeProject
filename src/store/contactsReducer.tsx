import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiRequests } from "../api/api";
import { isLoadingAC } from "./appReducer";

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
  error: null | string
  loading: boolean
};

const initialState: initialStateType = {
  data: [{
    country_code: "+375",
    id: 232343434,
    first_name: "Pavel",
    last_name: "AAA",
    phone_number: "4564567567768",
    contact_picture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDL0a-T9B_IgKwBYPDVOosAXPLGiufwxcFuyXTQQVA&s",
    is_favorite: true,
  },
    {
      country_code: "Minsk",
      id: 4545,
      first_name: "Pacavaca",
      last_name: "",
      phone_number: "344",
      contact_picture: "",
      is_favorite: true,
    },
  ],
  error: null,
  loading: false,
};


export const getContactsTh = createAsyncThunk("contacts/getContactsTh", async (param, {
    dispatch,
    rejectWithValue,
  }) => {
    dispatch(isLoadingAC({ value: true }));

    try {
      const res = await apiRequests.getContacts();
      dispatch(isLoadingAC({ value: false }));
    } catch (error) {
      console.log("error", error);
      dispatch(isLoadingAC({ value: false }));
    }
  },
);

const slice = createSlice({
  name: "contacts",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder;
    // .addCase(loginAC, (state, action) => {

    //     });
  },
});

export const contactsReducer = slice.reducer;
