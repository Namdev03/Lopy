import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginApi, meApi, userProfileApi } from "../Services/userApiCollection";

const initialState = {
  isLoggedIn: false,
  isLoading: true,
  userId: null,
  profile:null,
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
      // console.log("response",response);
      
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response || { message: error.message }
      );
    }
  }
);
export const userprofileAsync = createAsyncThunk(
  "user/profile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await userProfileApi();
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message
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
        state.userId = action.payload.user._id;
        state.profile = action.payload.user;
      }). addCase(userprofileAsync.pending, (state) => {
      state.loading = false;
    })
    .addCase(userprofileAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.profile = action.payload;
    })
    .addCase(userprofileAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default userSlice.reducer;