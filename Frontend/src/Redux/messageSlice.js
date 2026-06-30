import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { getMessagesApi } from "../Services/messageApiCollection";
const initialState = {
    isLoading :true,
    messages:null
}
export const getMessageAsync = createAsyncThunk("/get/message",async (id,{rejectWithValue}) => {
    try {
        const response = await getMessagesApi(id);
        console.log(response);
        return response
    } catch (error) {
        return rejectWithValue( error.response);
    }
})
const messageSlice = createSlice({
    name:"message",
    initialState,
    reducers: {},
    extraReducers:(builder)=>{
        builder.addCase(getMessageAsync.pending,(state)=>{
            state.isLoading = true;
        }).addCase(getMessageAsync.fulfilled,(state,action)=>{
            state.isLoading =false;
            state.messages = action.payload
        }).addCase(getMessageAsync.rejected,(state)=>{
            state.isLoading = true
        })
    }
})
export default messageSlice.reducer