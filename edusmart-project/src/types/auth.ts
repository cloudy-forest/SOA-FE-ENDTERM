// src/types/auth.ts
export type AuthStatus = 'idle' | 'loading' | 'success' | 'failed';
export interface UserProfile {
  id: string;
  name: string; // fullname trong APIDocs
  email: string;
  avatarUrl: string; // Link ảnh avatar
  role?: 'user' | 'admin';
  phone?: string;
  address?: string;
  bannerUrl?: string; // Ảnh bìa
  balance?: number; // Số dư tài khoản

}

// export interface AuthState {
//   user: UserProfile | null;
//   token: string | null; // (Sau này Google sẽ trả về)
//   status: 'idle' | 'loading' | 'success' | 'failed';
// }

// 3. Định nghĩa State tổng cho slice
export interface AuthState {
  user: UserProfile | null;
  token: string | null; // Giữ lại token của bạn
  status: AuthStatus;
  error: string | null; // Thêm trường lưu lỗi
}
