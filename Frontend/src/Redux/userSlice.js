import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginApi } from "../Services/userApiCollection";

const initialState = {
  isLoggedIn: false,
  isLoading: false,
  userDetails: null,
  userId: null,
};

// ===== Login User =====
export const loginUserAsync = createAsyncThunk(
  "user/login",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await loginApi(payload);

      // If using axios and API data is in response.data
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response || "Something went wrong"
      );
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: { },

  extraReducers: (builder) => {
    builder
      .addCase(loginUserAsync.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.userDetails = action.payload;
        state.userId = action.payload?._id; // or action.payload.id
      })

      .addCase(loginUserAsync.rejected, (state) => {
        state.isLoading = false;
        state.isLoggedIn = false;
      });
  },
});

// export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;