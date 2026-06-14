import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginApi, registerApi } from "../Services/userApiCollection";

const initialState = {
  isLoggedIn: false,
  isLoading: false,
  userDetails: null,
  userId: null,
};
// =====Register User=====
// export const registerUserAsync = createAsyncThunk("user/registe",async(payload)=>{
// try {
//    const response = await registerApi(payload);
//    return response;
// } catch (error) {
//   return error.response;
// }
// })
// =====Login User=====
export const loginUserAsync = createAsyncThunk(
  "user/login",
  async (payload) => {
    try{
    const response = await loginApi(payload);
    return response;
  }
  catch(error){
  return error.response;
  }}
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