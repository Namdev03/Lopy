import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginApi, meApi } from "../Services/userApiCollection";

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
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response || "Something went wrong"
      );
    }
  }
);
export const meAsync = createAsyncThunk(
  "user/me",
  async (_, { rejectWithValue }) => {
    try {
      const response = await meApi();
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response || { message: error.message }
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
        state.userId = action.payload?.toSend._id; // or action.payload.id
      })

      .addCase(loginUserAsync.rejected, (state) => {
        state.isLoading = false;
        state.isLoggedIn = false;
      }).addCase(meAsync.pending,(state)=>{
        state.isLoading = true;
      }).addCase(meAsync.fulfilled,(state,action)=>{
        state.isLoading = false;
        state.isLoggedIn = true;
        state.userDetails = action.payload;
         state.userId = action.payload?.user._id;
      })
  },
});

// export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;