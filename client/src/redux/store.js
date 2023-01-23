import { configureStore } from '@reduxjs/toolkit'
import imagesSlice from "./imagesSlice";

export const store = configureStore({
    reducer: { galleryActions: imagesSlice },
})