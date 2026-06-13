import {configureStore} from '@reduxjs/toolkit'
import user from './userSlice.js'
const store = configureStore({
    reducer:{
        user:user,
    }
})
export default store;