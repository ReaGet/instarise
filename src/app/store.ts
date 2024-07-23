 
import { configureStore } from '@reduxjs/toolkit'
import { api } from './services/api'
import userSlice from '@/app/features/user/userSlice'

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    userSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch