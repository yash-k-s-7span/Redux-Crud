import { configureStore } from '@reduxjs/toolkit';
import userDetailsSlice from '../features/user-details-slice';
export const store = configureStore({
    reducer: {
        app:userDetailsSlice
    },
})