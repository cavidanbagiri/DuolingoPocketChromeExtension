
import { configureStore } from '@reduxjs/toolkit'
import messageBoxSlice from './message-store.js'
import authSlice from './auth-store.js'
import translateSlice from './translate-store.js'

export const store = configureStore({
  reducer: {
    messageBoxSlice: messageBoxSlice,
    authSlice: authSlice,
    translateSlice: translateSlice,
  },
})