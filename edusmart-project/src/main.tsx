// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store.ts';
import App from './App.tsx';
import './assets/index.css';

// ▼▼▼ 1. IMPORT THƯ VIỆN GOOGLE ▼▼▼
import { GoogleOAuthProvider } from '@react-oauth/google';

// 2. Lấy Client ID từ file .env
// (Dòng này sẽ tự động đọc từ file .env bạn vừa tạo)
const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

// 3. Kiểm tra xem Client ID có tồn tại không
if (!googleClientId) {
  console.error("Thiếu VITE_GOOGLE_CLIENT_ID trong file .env");
  // Dừng ứng dụng nếu không có ID
  throw new Error("Missing VITE_GOOGLE_CLIENT_ID in .env file. Please check your .env file.");
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* ▼▼▼ 4. BỌC ỨNG DỤNG BẰNG PROVIDER CỦA GOOGLE ▼▼▼ */}
    {/* (Nó phải nằm bên ngoài Redux Provider) */}
    <GoogleOAuthProvider clientId={googleClientId}>
      <Provider store={store}>
        <App />
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>,
);