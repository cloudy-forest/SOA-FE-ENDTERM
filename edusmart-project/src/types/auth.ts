// src/types/auth.ts
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl: string; // Link ảnh avatar
}

export interface AuthState {
  user: UserProfile | null;
  token: string | null; // (Sau này Google sẽ trả về)
  status: 'idle' | 'loading' | 'success' | 'failed';
}