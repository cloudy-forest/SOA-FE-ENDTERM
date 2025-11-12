// src/services/authService.ts
import type { UserProfile } from '../types/auth';
import type { Schedule, ScheduleListResponse, ScheduleStatus } from '../types/schedule';

const FAKE_DELAY = 1000;
const DEFAULT_BANNER = 'https://images.unsplash.com/photo-1504805572947-34fad45aed93?q=80&w=2070&auto=format&fit=crop';

// --- CƠ SỞ DỮ LIỆU "GIẢ" ---
let adminUser: UserProfile = {
  id: 'admin-001',
  name: 'Admin EduSmart', // Tên đầy đủ
  email: 'admin@edusmart.com',
  avatarUrl: 'https://i.pravatar.cc/150?img=1',
  role: 'admin',
  phone: '0123456789',
  address: '123 Đường ABC, Quận 1, TP.HCM',
  bannerUrl: DEFAULT_BANNER,
};
let normalUser: UserProfile = {
  id: 'user-002',
  name: 'Văn An', // Tên đầy đủ
  email: 'user@edusmart.com',
  avatarUrl: 'https://i.pravatar.cc/150?img=5',
  role: 'user',
  phone: '0987654321',
  address: '456 Đường XYZ, Quận 3, Hà Nội',
  bannerUrl: DEFAULT_BANNER,
};

let schedulesDB: Schedule[]= [
  {
    id: 101,
    title: 'Kế hoạch ôn thi TOEIC 900+',
    description: 'Tập trung luyện đề và từ vựng mỗi ngày.',
    status: 'in_progress',
    created_date: '2025-11-01T10:00:00Z',
  },
  {
    id: 102,
    title: 'Lộ trình học React/TypeScript',
    description: 'Hoàn thành dự án EduSmart.',
    status: 'in_progress',
    created_date: '2025-10-15T10:00:00Z',
  },
  {
    id: 103,
    title: 'Học tiếng Nhật N3',
    description: 'Chưa bắt đầu.',
    status: 'planning',
    created_date: '2025-11-10T10:00:00Z',
  }
]

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

// Giả lập API POST /users/me
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
      // Tìm user trong "database" giả của chúng ta
      let userToUpdate: UserProfile | null = null;
      if (adminUser.id === userId) userToUpdate = adminUser;
      if (normalUser.id === userId) userToUpdate = normalUser;
      
      if (!userToUpdate) {
        return reject(new Error("Không tìm thấy người dùng để cập nhật."));
      }

      // Cập nhật "database"
      const updatedUser: UserProfile = { ...userToUpdate, ...data };
      
      if (adminUser.id === userId) adminUser = updatedUser;
      if (normalUser.id === userId) normalUser = updatedUser;

      console.log("(Giả lập API) Cập nhật thành công:", updatedUser);
      resolve(updatedUser); // Trả về user đã cập nhật

    }, FAKE_DELAY);
  });
};

/**
 * Giả lập API: GET /users/me/schedule
 */
export const getSchedules = (): Promise<ScheduleListResponse> => {
  console.log("(Giả lập API) Đang tải danh sách Lịch học...");
  return new Promise((resolve) => {
    setTimeout(() => {
      const response: ScheduleListResponse = {
        total_schedule: schedulesDB.length,
        list_schedule: [...schedulesDB], // Trả về bản sao
      };
      resolve(response);
    }, FAKE_DELAY / 2);
  });
};

/**
 * Giả lập API: POST /users/me/schedule (Tạo mới)
 */
export const createSchedule = (data: { 
  title: string, 
  description: string, 
  status: ScheduleStatus 
}): Promise<Schedule> => {
  console.log("(Giả lập API) Đang tạo Lịch học mới:", data.title);
  return new Promise((resolve) => {
    setTimeout(() => {
      const newSchedule: Schedule = {
        id: Math.floor(Math.random() * 1000) + 200, // ID ngẫu nhiên
        title: data.title,
        description: data.description,
        status: data.status,
        created_date: new Date().toISOString(),
      };
      schedulesDB.push(newSchedule); // Thêm vào DB "giả"
      resolve(newSchedule);
    }, FAKE_DELAY);
  });
};

/**
 * Giả lập API: DELETE /users/me/schedule/{id}
 */
export const deleteSchedule = (scheduleId: number): Promise<{ id: number }> => {
  console.log(`(Giả lập API) Đang xóa Lịch học ID: ${scheduleId}`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = schedulesDB.findIndex(s => s.id === scheduleId);
      if (index === -1) {
        return reject(new Error("Không tìm thấy lịch học để xóa."));
      }
      
      schedulesDB = schedulesDB.filter(s => s.id !== scheduleId);
      resolve({ id: scheduleId });
    }, FAKE_DELAY);
  });
};