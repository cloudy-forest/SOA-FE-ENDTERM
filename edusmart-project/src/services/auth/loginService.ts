import type { UserProfile } from '../../types/auth';
import { FAKE_DELAY, DEFAULT_BANNER } from './constants';
import { mockDB } from './mockData';

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
        resolve(mockDB.adminUser);
        return;
      }
      if (username === 'user' && password === 'user') {
        console.log("(Giả lập API) Đăng nhập User thành công!");
        resolve(mockDB.normalUser);
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
  console.log(`(Giả lập API) Đang thử đăng ký với: ${username} / ${password.substring(0, 2)}...`);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === 'admin' || username === 'user') {
        console.error("(Giả lập API) Tên đăng nhập đã tồn tại.");
        reject(new Error('Tên đăng nhập này đã được sử dụng.'));
        return;
      }

      const defaultAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=0D8ABC&color=fff&bold=true`;
      const newUserId = `user-${Math.floor(Math.random() * 1000)}`;
      const newUser: UserProfile = {
        id: newUserId,
        name: username, // <<< Tên hiển thị sẽ mặc định là username
        email: `${username}@fake.com`, 
        avatarUrl: defaultAvatar,
        role: 'user',
        phone: '',
        address: '',
        bannerUrl: DEFAULT_BANNER, 
      };
      console.log("(Giả lập API) Đăng ký thành công!");
      resolve(newUser);
    }, FAKE_DELAY);
  });
};