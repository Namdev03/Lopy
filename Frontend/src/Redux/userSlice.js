import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginApi } from "../Services/userApiCollection";

const initialState = {
  isLoggedIn: false,
  isLoading: false,
  userDetails: null,
  userId: null,
};

export const loginUserAsync = createAsyncThunk(
  "user/login",
  async (payload) => {
    const response = await loginApi(payload);
    return response;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(loginUserAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.userDetails = action.payload;
        state.userId = action.payload?.id;
      })
      .addCase(loginUserAsync.rejected, (state) => {
        state.isLoading = false;
        state.isLoggedIn = false;
      });
  },
});

export default userSlice.reducer;