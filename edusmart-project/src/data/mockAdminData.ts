// src/data/mockAdminData.ts
import type { AdminUser } from '../types/admin';

export const mockUsers: AdminUser[] = [
  {
    id: 'admin-001',
    name: 'Admin EduSmart',
    email: 'admin@edusmart.com',
    avatarUrl: 'https://i.pravatar.cc/150?img=1',
    role: 'admin',
    status: 'active',
    createdAt: '2025-01-01T10:00:00Z',
  },
  {
    id: 'user-002',
    name: 'Văn An',
    email: 'user@edusmart.com',
    avatarUrl: 'https://i.pravatar.cc/150?img=5',
    role: 'user',
    status: 'active',
    createdAt: '2025-05-15T14:30:00Z',
  },
  {
    id: 'user-003',
    name: 'Trần Thị B',
    email: 'tran.b@gmail.com',
    avatarUrl: 'https://i.pravatar.cc/150?img=2',
    role: 'user',
    status: 'active',
    createdAt: '2025-06-20T09:00:00Z',
  },
  {
    id: 'user-004',
    name: 'Lê Văn C',
    email: 'levanc@yahoo.com',
    avatarUrl: 'https://i.pravatar.cc/150?img=3',
    role: 'user',
    status: 'disabled', // Một user đã bị khóa
    createdAt: '2025-07-01T11:00:00Z',
  },
  {
    id: 'user-005',
    name: 'Phạm Thị D',
    email: 'pham.d@hotmail.com',
    avatarUrl: 'https://i.pravatar.cc/150?img=4',
    role: 'user',
    status: 'active',
    createdAt: '2025-08-10T16:45:00Z',
  },
];