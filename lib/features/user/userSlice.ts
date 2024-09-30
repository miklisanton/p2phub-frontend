import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {type User, type ErrorResponse, type BaseResponse, fetchUser, LoginRequest} from '../../../types'

export const fetchUserThunk = createAsyncThunk(
  "user/fetchUser",
  async () => {
    const response = await fetchUser();
    return response;
  }
);

const initialState = {
  loading: false,
  user: null as User | null,
  error: null as ErrorResponse | null,
  success: null as boolean | null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = null;
    });
    builder.addCase(fetchUserThunk.fulfilled, (state, action) => {
      state.loading = false;
      if ("user" in action.payload) {
        state.user = action.payload;
      } else {
        state.error = action.payload;
      }
    });
  }
});

export default userSlice.reducer; 
