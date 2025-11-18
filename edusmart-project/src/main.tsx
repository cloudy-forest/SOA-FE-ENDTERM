// // src/main.tsx
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { Provider } from 'react-redux';
// import { store, persistor } from './app/store.ts';
// import App from './App.tsx';
// import './assets/index.css';
// import 'quill/dist/quill.snow.css';

// // ▼▼▼ 1. IMPORT THƯ VIỆN GOOGLE ▼▼▼
// import { GoogleOAuthProvider } from '@react-oauth/google';

// // import PERSISTOR 
// import { PersistGate } from 'redux-persist/integration/react';
// // 2. Lấy Client ID từ file .env
// // (Dòng này sẽ tự động đọc từ file .env bạn vừa tạo)
// const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

// // 3. Kiểm tra xem Client ID có tồn tại không
// if (!googleClientId) {
//   console.error("Thiếu VITE_GOOGLE_CLIENT_ID trong file .env");
//   // Dừng ứng dụng nếu không có ID
//   throw new Error("Missing VITE_GOOGLE_CLIENT_ID in .env file. Please check your .env file.");
// }

// ReactDOM.createRoot(document.getElementById('root')!).render(

//   <GoogleOAuthProvider clientId={googleClientId}>
//     <Provider store={store}>
//       {/* Bọc <App> bằng PersistGate để đồng bộ Redux-Persist */}
//       <PersistGate loading={null} persistor={persistor}>
//         <App />
//       </PersistGate>
//     </Provider>
//   </GoogleOAuthProvider>
// );

// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client'; // (Dùng /client)
import { Provider } from 'react-redux';
import { store, persistor } from './app/store.ts';
import App from './App.tsx';
import './assets/index.css';

// ▼▼▼ SỬA LỖI: Đổi đường dẫn CSS ▼▼▼
import 'quill/dist/quill.snow.css'; 

import { GoogleOAuthProvider } from '@react-oauth/google';
import { PersistGate } from 'redux-persist/integration/react';

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

if (!googleClientId) {
  console.error("Thiếu VITE_GOOGLE_CLIENT_ID trong file .env");
  throw new Error("Missing VITE_GOOGLE_CLIENT_ID in .env file. Please check your .env file.");
}

// Dùng lại "createRoot" (Cách của React 18)
const root = ReactDOM.createRoot(
  document.getElementById('root')!
);

// Dùng "root.render()" VÀ KHÔNG DÙNG <React.StrictMode>
root.render(
  <GoogleOAuthProvider clientId={googleClientId}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </GoogleOAuthProvider>
);