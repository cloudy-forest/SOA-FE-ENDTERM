import { mockUsers } from '../../data/mockAdminData';
import type { AdminUser } from '../../types/admin';
import { FAKE_DELAY } from './constants';

// Cơ sở dữ liệu "ảo" trong bộ nhớ
const usersDB: AdminUser[] = [...mockUsers];
/**
 * Giả lập API: GET /api/admin/users
 * (Lấy tất cả user)
 */
export const fetchAllUsers = (): Promise<AdminUser[]> => {
  console.log("(Giả lập API) Đang tải danh sách user...");
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...usersDB]); // Trả về một bản sao
    }, FAKE_DELAY);
  });
};

/**
 * Giả lập API: POST /api/admin/users/:userId/disable
 * (Vô hiệu hóa user)
 */
export const disableUser = (userId: string): Promise<{ success: true; user: AdminUser }> => {
  console.log(`(Giả lập API) Đang vô hiệu hóa user ID: ${userId}`);
  
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const userIndex = usersDB.findIndex(u => u.id === userId);
      if (userIndex === -1) {
        return reject(new Error('Không tìm thấy user.'));
      }
      
      const user = usersDB[userIndex];
      // Admin không thể tự khóa mình
      if (user.role === 'admin') {
        return reject(new Error('Không thể vô hiệu hóa tài khoản Admin.'));
      }
      
      // Cập nhật "database" ảo
      user.status = 'disabled';
      usersDB[userIndex] = user;
      
      console.log("(Giả lập API) Đã vô hiệu hóa:", user);
      resolve({ success: true, user: { ...user } }); // Trả về bản sao

    }, FAKE_DELAY);
  });
};

/**
 * Giả lập API: POST /api/admin/users/:userId/enable
 * (Kích hoạt lại user)
 */
export const enableUser = (userId: string): Promise<{ success: true; user: AdminUser }> => {
    console.log(`(Giả lập API) Đang kích hoạt user ID: ${userId}`);
    
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const userIndex = usersDB.findIndex(u => u.id === userId);
        if (userIndex === -1) {
          return reject(new Error('Không tìm thấy user.'));
        }
        
        const user = usersDB[userIndex];
        user.status = 'active';
        usersDB[userIndex] = user;
        
        console.log("(Giả lập API) Đã kích hoạt:", user);
        resolve({ success: true, user: { ...user } });
  
      }, FAKE_DELAY);
    });
};
