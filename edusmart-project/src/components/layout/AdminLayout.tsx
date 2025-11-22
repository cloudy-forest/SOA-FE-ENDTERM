// src/components/layout/AdminLayout.tsx
import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { logout } from '../../app/slices/authSlice';
import clsx from 'clsx';
import {
  HomeIcon,
  UsersIcon,
  BookOpenIcon,
  TagIcon,
  DocumentTextIcon,
  CreditCardIcon,
  BellIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
  NewspaperIcon
} from '@heroicons/react/24/outline';

// Menu (đã cập nhật icon)
const navigation = [
  { name: 'Bảng điều khiển', to: '/admin', icon: HomeIcon },
  { name: 'Quản lý User', to: 'users', icon: UsersIcon },
  { name: 'Quản lý Khóa học', to: 'courses', icon: BookOpenIcon },
  { name: 'Quản lý Chủ đề', to: 'subjects', icon: TagIcon },
  { name: 'Quản lý Đề thi', to: 'exams', icon: DocumentTextIcon },
  { name: 'Quản lý Blog', to: 'blogs', icon: NewspaperIcon },
  { name: 'Quản lý Giao dịch', to: 'payments', icon: CreditCardIcon },
  { name: 'Gửi Thông báo', to: 'notifications', icon: BellIcon },
];

export const AdminLayout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(state => state.auth.user);
  
  // State cho mobile sidebar
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  // Class cho NavLink, tự động thêm "active"
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    clsx(
      'sidebar-item flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700',
      isActive && 'active'
    );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* 1. Sidebar (Menu bên trái) - Theo thiết kế của bạn */}
      <aside 
        id="sidebar" 
        className={clsx(
          'sidebar w-64 bg-white border-r border-gray-200 fixed h-full z-30',
          isMobileOpen && 'mobile-open' // Class cho React state
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <BookOpenIcon className="w-6 h-6 text-white" />
              </div>
              <span className="text-lg font-bold text-gray-900">EduSmart</span>
            </div>
            <button 
              id="closeSidebar" 
              className="md:hidden text-gray-500 hover:text-gray-700"
              onClick={() => setIsMobileOpen(false)} // Logic React
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
          
          {/* Navigation (Dùng NavLink) */}
          <nav className="flex-1 px-4 py-6 overflow-y-auto">
            <ul className="space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <NavLink 
                    to={item.to} 
                    className={navLinkClass} 
                    end // 'end' để Bảng điều khiển không bị active khi vào /admin/users
                    onClick={() => setIsMobileOpen(false)} // Tự đóng khi chọn
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* User Profile (Lấy từ Redux) */}
          <div className="px-4 py-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-50"
            >
              <img 
                className="w-10 h-10 rounded-full object-cover" 
                src={user?.avatarUrl} 
                alt={user?.name} 
              />
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              </div>
              <ArrowRightOnRectangleIcon className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>
      </aside>

      {/* 2. Vùng Nội dung (Bên phải) */}
      <main className="flex-1 md:ml-64">
        {/* Top Bar (Header của Admin) - Theo thiết kế của bạn */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <button 
                id="openSidebar" 
                className="md:hidden text-gray-500 hover:text-gray-700"
                onClick={() => setIsMobileOpen(true)} // Logic React
              >
                <Bars3Icon className="w-6 h-6" />
              </button>
              {/* Tiêu đề sẽ do trang con quyết định */}
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input type="text" placeholder="Tìm kiếm..." className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
              <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
                <BellIcon className="w-6 h-6" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </div>
        </header>
        
        {/* ▼▼▼ ĐÂY LÀ PHẦN QUAN TRỌNG NHẤT ▼▼▼ */}
        {/* Tất cả các "div" nội dung (dashboardContent, usersContent...) đã bị xóa.
          React Router sẽ tự động render trang con (AdminDashboardPage, UserManagementPage...) 
          vào đúng vị trí của <Outlet /> này.
        */}
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};