import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllPostApi } from "../Services/postApiCollection";

const initialState = {
    post: [],
    postId: null,
    loading: false,
    error: null,
};

export const allPostAsync = createAsyncThunk(
    "post/getAllPost",
    async (_, { rejectWithValue }) => {
        try {
            const response = await getAllPostApi();
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
                state.loading = true;
                state.error = null;
            })
            .addCase(allPostAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.post = action.payload.posts;
                state.postId =
                    action.payload.posts.length > 0
                        ? action.payload._id
                        : null;
            })
            .addCase(allPostAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default postSlice.reducer;