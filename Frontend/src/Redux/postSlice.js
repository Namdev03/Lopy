import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllPostApi } from "../Services/postApiCollection";

const initialState = {
    allPost: null,
    isLoading: false,
    error: null,
};

export const allPostAsync = createAsyncThunk(
    "post/getAllPost",
    async (_, { rejectWithValue }) => {
        try {
            const response = await getAllPostApi();
            // console.log(response);
            
            return response;

        } catch (error) {
            return rejectWithValue(
                error.response || "Something went wrong"
            );
        }
    }
);
const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(allPostAsync.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(allPostAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.allPost = action.payload;
            })
            .addCase(allPostAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export default postSlice.reducer;