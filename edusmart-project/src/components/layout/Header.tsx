// src/components/layout/Header.tsx
import { Link, NavLink, useNavigate } from 'react-router-dom'; // Thêm useNavigate
import { AcademicCapIcon } from '@heroicons/react/24/outline';

// 1. IMPORT CÁC HOOKS VÀ ACTIONS TỪ REDUX 
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { logout } from '../../app/slices/authSlice';

// 2. IMPORT CÁC COMPONENT GIAO DIỆN CHO DROPDOWN 
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';
import { Fragment } from 'react'; // (Đảm bảo React 17+ hoặc thêm import này)

export const Header = () => {
  // 3. LẤY STATE USER VÀ DISPATCH TỪ REDUX 
  const user = useAppSelector(state => state.auth.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive
        ? 'bg-blue-600 text-white'
        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
    }`;

  //  4. TẠO HÀM ĐĂNG XUẤT
  const handleLogout = () => {
    dispatch(logout());
    navigate('/'); // Chuyển về trang chủ sau khi đăng xuất
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center space-x-2">
              <AcademicCapIcon className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900 dark:text-white">EduSmart</span>
          </Link>
          
          {/* Nav Links (Desktop) */}
          <div className="hidden sm:flex sm:space-x-4">
              <NavLink to="/" className={navLinkClass} end>Trang chủ</NavLink>
              <NavLink to="/courses" className={navLinkClass}>Chương trình học</NavLink>
              <NavLink to="/exams" className={navLinkClass}>Đề thi</NavLink>
              <NavLink to="/flashcards" className={navLinkClass}>Flashcards</NavLink>
              <NavLink to="/blog" className={navLinkClass}>Blog</NavLink>
          </div>

          {/*5. LOGIC HIỂN THỊ NÚT BẤM (QUAN TRỌNG)  */}
          <div className="flex items-center space-x-2">
            {user ? (
              // --- A. NẾU ĐÃ ĐĂNG NHẬP: HIỂN THỊ AVATAR VÀ MENU ---
              <Menu as="div" className="relative">
                <MenuButton className="flex items-center space-x-2 rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <img
                    className="w-8 h-8 rounded-full object-cover" // Thêm object-cover
                    src={user.avatarUrl} // Lấy avatar từ Redux
                    alt={user.name}
                  />
                  <span className="hidden md:block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {user.name} {/* Lấy tên từ Redux */}
                  </span>
                </MenuButton>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <MenuItem>
                      <Link
                        to="/profile" // (Trang cá nhân, sẽ tạo sau)
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 data-[hover]:bg-gray-100 dark:data-[hover]:bg-gray-700"
                      >
                        Trang cá nhân
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 data-[hover]:bg-gray-100 dark:data-[hover]:bg-gray-700"
                      >
                        Đăng xuất
                      </button>
                    </MenuItem>
                  </MenuItems>
                </Transition>
              </Menu>
            ) : (
              // --- B. NẾU CHƯA ĐĂNG NHẬP: HIỂN THỊ NÚT CŨ ---
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                >
                  Đăng nhập
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                >
                  Đăng ký
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};