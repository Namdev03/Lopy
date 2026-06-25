import {configureStore} from '@reduxjs/toolkit'
import user from './userSlice.js'
import post from './postSlice.js'
const store = configureStore({
    reducer:{
        user:user,
        post:post
    }
})
export default store;