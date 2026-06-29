import {configureStore} from '@reduxjs/toolkit'
import user from './userSlice.js'
import post from './postSlice.js'
import message from './messageSlice.js'
const store = configureStore({
    reducer:{
        user:user,
        post:post,
        message:message
    }
})
export default store;