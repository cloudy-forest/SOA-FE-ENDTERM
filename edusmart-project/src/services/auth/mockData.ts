import type { UserProfile } from '../../types/auth';
import type { Schedule } from '../../types/schedule';
import { DEFAULT_BANNER } from './constants';

// Database ảo tập trung
export const mockDB = {
  adminUser: {
    id: 'admin-001',
    name: 'Admin EduSmart',
    email: 'admin@edusmart.com',
    avatarUrl: 'https://i.pravatar.cc/150?img=1',
    role: 'admin',
    phone: '0123456789',
    address: '123 Đường ABC, Quận 1, TP.HCM',
    bannerUrl: DEFAULT_BANNER,
  } as UserProfile,

  normalUser: {
    id: 'user-002',
    name: 'Văn An',
    email: 'user@edusmart.com',
    avatarUrl: 'https://i.pravatar.cc/150?img=5',
    role: 'user',
    phone: '0987654321',
    address: '456 Đường XYZ, Quận 3, Hà Nội',
    bannerUrl: DEFAULT_BANNER,
  } as UserProfile,

  schedules: [
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
  ] as Schedule[]
};