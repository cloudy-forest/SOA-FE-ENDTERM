// src/app/store.ts
import { configureStore, combineReducers } from '@reduxjs/toolkit';

// ▼▼▼ 1. IMPORT CÁC THƯ VIỆN PERSIST ▼▼▼
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Mặc định là localStorage

// Import tất cả các reducers của bạn
import examAttemptReducer from './slices/examAttemptSlice';
import courseFilterReducer from './slices/courseFilterSlice';
import examFilterReducer from './slices/examFilterSlice';
import flashcardFilterReducer from './slices/flashcardFilterSlice';
import authReducer from './slices/authSlice';

// ▼▼▼ 2. CẤU HÌNH PERSIST ▼▼▼
const persistConfig = {
  key: 'root', // Key cho localStorage
  storage, // Nơi lưu trữ (localStorage)
  
  // Quan trọng: Chúng ta CHỈ muốn lưu state của bài thi
  // KHÔNG lưu auth (vì nó được quản lý bằng token)
  // KHÔNG lưu các bộ lọc (vì chúng nên reset mỗi lần vào)
  whitelist: ['examAttempt'], 
};

// ▼▼▼ 3. KẾT HỢP CÁC REDUCERS LẠI ▼▼▼
const rootReducer = combineReducers({
  examAttempt: examAttemptReducer,
  courseFilter: courseFilterReducer,
  examFilter: examFilterReducer,
  flashcardFilter: flashcardFilterReducer,
  auth: authReducer,
});

// ▼▼▼ 4. TẠO "PERSISTED REDUCER" ▼▼▼
// Bọc rootReducer bằng persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// ▼▼▼ 5. CẤU HÌNH STORE (ĐÃ SỬA ĐỔI) ▼▼▼
export const store = configureStore({
  reducer: persistedReducer, // Sử dụng persistedReducer thay vì rootReducer
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Bỏ qua các action type của redux-persist
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// ▼▼▼ 6. EXPORT "PERSISTOR" ▼▼▼
export const persistor = persistStore(store);

// (Các export type RootState và AppDispatch giữ nguyên)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;