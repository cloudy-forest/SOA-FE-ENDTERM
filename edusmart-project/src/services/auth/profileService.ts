import type { UserProfile } from '../../types/auth';
import { FAKE_DELAY } from './constants';
import { mockDB } from './mockData';

type UpdateProfileData = {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  bannerUrl?: string;
}

export const updateUserProfile = (userId: string, data: UpdateProfileData): Promise<UserProfile> => {
  console.log(`(Giả lập API) Đang cập nhật profile cho user ID: ${userId}`);
  
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Tìm user trong "database" giả
      let userKey: 'adminUser' | 'normalUser' | null = null;
      
      if (mockDB.adminUser.id === userId) userKey = 'adminUser';
      else if (mockDB.normalUser.id === userId) userKey = 'normalUser';
      
      if (!userKey) {
        return reject(new Error("Không tìm thấy người dùng để cập nhật."));
      }

      // Cập nhật "database"
      const updatedUser: UserProfile = { ...mockDB[userKey], ...data };
      mockDB[userKey] = updatedUser;

      console.log("(Giả lập API) Cập nhật thành công:", updatedUser);
      resolve(updatedUser);

    }, FAKE_DELAY);
  });
};