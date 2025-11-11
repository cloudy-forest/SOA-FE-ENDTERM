// src/pages/admin/UserManagementPage.tsx
import { useState, useEffect } from 'react';
import type { AdminUser, UserStatus } from '../../types/admin';
import { fetchAllUsers, disableUser, enableUser } from '../../services/adminService';
import { Spinner } from '../../components/ui/Spinner';
import { 
  UserPlusIcon, 
  PencilIcon, 
  LockClosedIcon, 
  LockOpenIcon 
} from '@heroicons/react/24/outline';
import clsx from 'clsx';

// Component con cho từng hàng trong bảng
const UserRow = ({ user, onToggleStatus }: { 
  user: AdminUser; 
  onToggleStatus: (userId: string, currentStatus: UserStatus) => void;
}) => {
  // Admin không thể tự khóa/mở khóa chính mình
  const isMe = user.role === 'admin'; 

  return (
    <tr className="table-row">
      {/* Thông tin User */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <img className="h-10 w-10 rounded-full object-cover" src={user.avatarUrl} alt={user.name} />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{user.name}</div>
            <div className="text-sm text-gray-500">{user.email}</div>
          </div>
        </div>
      </td>
      {/* Vai trò */}
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={clsx('badge', 
          user.role === 'admin' ? 'badge-info' : 'badge-success'
        )}>
          {user.role === 'admin' ? 'Quản trị viên' : 'Học viên'}
        </span>
      </td>
      {/* Trạng thái */}
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={clsx('badge', 
          user.status === 'active' ? 'badge-success' : 'badge-danger'
        )}>
          {user.status === 'active' ? 'Đang hoạt động' : 'Đã khóa'}
        </span>
      </td>
      {/* Ngày tham gia */}
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {new Date(user.createdAt).toLocaleDateString('vi-VN')}
      </td>
      {/* Hành động */}
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button className="text-indigo-600 hover:text-indigo-900 mr-3" title="Sửa (chưa làm)">
          <PencilIcon className="w-5 h-5" />
        </button>
        <button 
          onClick={() => onToggleStatus(user.id, user.status)}
          disabled={isMe}
          title={user.status === 'active' ? 'Khóa tài khoản' : 'Kích hoạt tài khoản'}
          className={clsx(
            'disabled:opacity-30 disabled:cursor-not-allowed',
            user.status === 'active' ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'
          )}
        >
          {user.status === 'active' ? (
            <LockClosedIcon className="w-5 h-5" />
          ) : (
            <LockOpenIcon className="w-5 h-5" />
          )}
        </button>
      </td>
    </tr>
  );
};

// Component trang chính
export const UserManagementPage = () => {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Hàm tải dữ liệu
  const loadUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchAllUsers();
      setUsers(data);
    } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Lỗi không xác định khi tải danh sách người dùng.');
        }
    } finally {
      setLoading(false);
    }
  };

  // Tải data khi component mount lần đầu
  useEffect(() => {
    loadUsers();
  }, []);

  // Hàm xử lý Khóa / Mở khóa
  const handleToggleUserStatus = async (userId: string, currentStatus: UserStatus) => {
    const actionText = currentStatus === 'active' ? 'khóa' : 'kích hoạt';
    
    // Yêu cầu xác nhận
    if (!window.confirm(`Bạn có chắc muốn ${actionText} người dùng này?`)) {
      return;
    }
    
    try {
      // Gọi API "giả"
      const apiCall = currentStatus === 'active' ? disableUser : enableUser;
      const { user: updatedUser } = await apiCall(userId);
      
      // Cập nhật state local (không cần gọi lại API)
      setUsers(prevUsers => 
        prevUsers.map(u => u.id === userId ? updatedUser : u)
      );

    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(`Lỗi: ${err.message}`);
      } else {
        alert(`Lỗi không xác định khi ${actionText} người dùng.`);
      }
    }
  };

  // Render
  if (loading) {
    return (
      <div className="flex justify-center p-12">
        <Spinner />
      </div>
    );
  }
  
  if (error) {
    return <div className="text-red-500 p-6">{error}</div>;
  }

  return (
    // Dùng UI từ thiết kế của bạn
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Header của bảng */}
      <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Danh sách người dùng ({users.length})</h2>
        <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
          <UserPlusIcon className="w-4 h-4 mr-2" />
          Thêm người dùng
        </button>
      </div>
      
      {/* Bảng dữ liệu */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Học viên</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vai trò</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày tham gia</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Hành động</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map(user => (
              <UserRow key={user.id} user={user} onToggleStatus={handleToggleUserStatus} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};