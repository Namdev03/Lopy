import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllPostApi, userOnePostApi } from "../Services/postApiCollection";

const initialState = {
    allPost: null,
    isLoading: false,
    error: null,
    userOnePostLoading: true,
    userOnePost: null,
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
export const userOnePostAsync = createAsyncThunk("/user/onePost", async (id, { rejectWithValue }) => {
    try {
        const response = await userOnePostApi(id)
        return response;
    } catch (error) {
        return rejectWithValue(error.response);
    }
})
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
            }).addCase(userOnePostAsync.pending, (state) => {
                state.userOnePostLoading = true;
            }).addCase(userOnePostAsync.fulfilled, (state, action) => {
                state.userOnePostLoading = false;
                state.userOnePost= action.payload.post;
            }).addCase(userOnePostAsync.rejected, (state, action) => {
                state.userOnePostLoading = true;
            })
    },
});
export default postSlice.reducer;