// // src/api/axiosClient.ts
// import axios from 'axios';

// const axiosClient = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8090', // Trỏ vào Gateway
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Interceptor Request: Gắn Token và Header X-User
// axiosClient.interceptors.request.use(async (config) => {
//   // 1. Lấy Token (như cũ)
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   // 2. ▼▼▼ QUAN TRỌNG: Lấy User ID & Role để gắn Header ▼▼▼
//   // Backend yêu cầu bắt buộc 2 header này
//   const userStr = localStorage.getItem('user'); // Giả sử bạn lưu user object vào localStorage khi login
//   if (userStr) {
//     const user = JSON.parse(userStr);
//     if (user.id) config.headers['X-User-Id'] = user.id;
//     if (user.role) config.headers['X-User-Role'] = user.role;
//   }

//   return config;
// });

// // Interceptor Response: Bóc tách ApiResponse
// axiosClient.interceptors.response.use(
//   (response) => {
//     // Backend trả về: { code: 200, success: true, data: ... }
//     if (response.data && response.data.data !== undefined) {
//       return response.data.data; // Chỉ lấy phần 'data'
//     }
//     return response.data;
//   },
//   (error) => {
//     // Xử lý lỗi chung (401, 403...)
//     if (error.response?.status === 401) {
//       // Auto logout hoặc refresh token
//     }
//     throw error;
//   }
// );

// export default axiosClient;

// src/api/axiosClient.ts
import axios from 'axios';
import type { AxiosError, AxiosRequestHeaders, AxiosResponse } from 'axios';

// Dạng response chuẩn của backend
export interface ApiResponse<T> {
  code: number;
  success: boolean;
  message: string;
  data: T;
}

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8090',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use((config) => {
  const headers = (config.headers ?? {}) as AxiosRequestHeaders;
  config.headers = headers;

  const token = localStorage.getItem('token');
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const userStr = localStorage.getItem('user');
  if (userStr) {
    try {
      const user = JSON.parse(userStr) as { id?: string | number; role?: string };
      if (user.id != null) headers['X-User-Id'] = String(user.id);
      if (user.role) headers['X-User-Role'] = user.role;
    } catch {
      // ignore parse error
    }
  }

  return config;
});

axiosClient.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => response,
  (error: AxiosError<ApiResponse<unknown>>) => {
    if (error.response?.status === 401) {
      // TODO: xử lý 401 nếu cần
    }

    const apiError = error.response?.data;
    if (apiError && typeof apiError === 'object' && 'message' in apiError) {
      return Promise.reject(new Error(apiError.message));
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
