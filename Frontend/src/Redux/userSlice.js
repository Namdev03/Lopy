import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginApi, meApi, suggesteUserApi, usersProfileApi } from "../Services/userApiCollection";

const initialState = {
  isLoggedIn: false,
  isLoading: true,
  userId: null,
  profile: null,
  userDetails: null,
  suggestedUsers: null,
  suggestionLoading:false,
  usersProfileLoading :true,
  usersProfile :null,
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
        error.response || error.message
      );
    }
  }
);
export const suggestedUserAsync = createAsyncThunk("/user/suggest", async (_, { rejectWithValue }) => {
  try {
    const response = await suggesteUserApi();
    // console.log(response);
    return response;
  } catch (error) {
    return rejectWithValue(error.response);
  }
});
export const usersProfileAsync = createAsyncThunk("/users/profile",async (id,{rejectWithValue}) => {
  try {
    const response = await usersProfileApi(id);
    console.log(response);
    return response;
  } catch (error) {
    return error.response;
  }
}) 
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
        state.userId = action.payload?.toSend._id; // or action.payload.id
      })
      .addCase(loginUserAsync.rejected, (state) => {
        state.isLoading = false;
        state.isLoggedIn = false;
      }).addCase(meAsync.pending, (state) => {
        state.isLoading = true;
      }).addCase(meAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.userId = action.payload.user._id;
      }).addCase(userprofileAsync.pending, (state) => {
        // state.isLoading = false;
      })
      .addCase(userprofileAsync.fulfilled, (state, action) => {
        // state.isLoading = false;
        state.profile = action.payload.user;
      })
      .addCase(userprofileAsync.rejected, (state, action) => {
        // state.isLoading = false;
        state.error = action.payload;
      }).addCase(suggestedUserAsync.pending, (state) => {
        state.suggestionLoading = true;
      })
      .addCase(suggestedUserAsync.fulfilled, (state, action) => {
        state.suggestionLoading = false;
        state.suggestedUsers = action.payload;
      })
      .addCase(suggestedUserAsync.rejected, (state, action) => {
        state.suggestionLoading = true;
        state.error = action.payload;
      }).addCase(usersProfileAsync.pending,(state) => {
        state.usersProfileLoading = true;
      }).addCase(usersProfileAsync.fulfilled,(state,action) => {
        state.usersProfileLoading = false;
        state.usersProfile = action.payload.user;
      }).addCase(usersProfileAsync.rejected,(state) => {
        state.usersProfileLoading = true;
      })
  },
});

export default userSlice.reducer;