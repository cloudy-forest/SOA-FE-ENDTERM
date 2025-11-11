// src/services/authService.ts
import type { UserProfile } from '../types/auth';

const FAKE_DELAY = 1000;

// --- CƠ SỞ DỮ LIỆU "GIẢ" ---
const adminUser: UserProfile = {
  id: 'admin-001',
  name: 'Admin EduSmart', // Tên đầy đủ
  email: 'admin@edusmart.com',
  avatarUrl: 'https://i.pravatar.cc/150?img=1',
  role: 'admin',
};
const normalUser: UserProfile = {
  id: 'user-002',
  name: 'Văn An', // Tên đầy đủ
  email: 'user@edusmart.com',
  avatarUrl: 'https://i.pravatar.cc/150?img=5',
  role: 'user',
};

// --- CÁC HÀM "GIẢ LẬP" API ---

/**
 * Giả lập API POST /api/auth/login
 * (Vẫn giữ nguyên: username, password)
 */
export const loginWithUsername = (username: string, password: string): Promise<UserProfile> => {
  console.log(`(Giả lập API) Đang thử đăng nhập với: ${username} / ${password}`);
  
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === 'admin' && password === 'admin') {
        console.log("(Giả lập API) Đăng nhập Admin thành công!");
        resolve(adminUser);
        return;
      }
      if (username === 'user' && password === 'user') {
        console.log("(Giả lập API) Đăng nhập User thành công!");
        resolve(normalUser);
        return;
      }
      console.error("(Giả lập API) Sai tên đăng nhập hoặc mật khẩu.");
      reject(new Error('Sai tên đăng nhập hoặc mật khẩu. Vui lòng thử lại.'));
    }, FAKE_DELAY);
  });
};

/**
 * Giả lập API POST /api/auth/register
 * (Đã sửa: chỉ cần username, password)
 */
export const registerWithUsername = (username: string, password: string): Promise<UserProfile> => {
  // ▼▼▼ SỬA Ở ĐÂY ▼▼▼
  console.log(`(Giả lập API) Đang thử đăng ký với: ${username} / ${password.substring(0, 2)}...`);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === 'admin' || username === 'user') {
        console.error("(Giả lập API) Tên đăng nhập đã tồn tại.");
        reject(new Error('Tên đăng nhập này đã được sử dụng.'));
        return;
      }

      const newUserId = `user-${Math.floor(Math.random() * 1000)}`;
      const newUser: UserProfile = {
        id: newUserId,
        name: username, // <<< Tên hiển thị sẽ mặc định là username
        email: `${username}@fake.com`, 
        avatarUrl: 'https://i.pravatar.cc/150?img=10',
        role: 'user',
      };
      console.log("(Giả lập API) Đăng ký thành công!");
      resolve(newUser);
    }, FAKE_DELAY);
  });
};