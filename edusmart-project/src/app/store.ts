// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import examAttemptReducer from './slices/examAttemptSlice'
import courseFilterReducer from './slices/courseFilterSlice';
import examFilterReducer from './slices/examFilterSlice';
import flashcardFilterReducer from './slices/flashcardFilterSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    // Các slice sẽ được thêm vào đây sau
    examAttempt: examAttemptReducer,
    courseFilter: courseFilterReducer,
    examFilter: examFilterReducer,
    flashcardFilter: flashcardFilterReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;