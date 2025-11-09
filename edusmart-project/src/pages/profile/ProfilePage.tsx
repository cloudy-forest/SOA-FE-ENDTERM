// src/pages/profile/ProfilePage.tsx
import { Fragment } from 'react';
import { useAppSelector } from '../../app/hooks';
import { Navigate } from 'react-router-dom';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import clsx from 'clsx';
import { PencilSquareIcon } from '@heroicons/react/24/outline';

// Import 3 component tab
import { ProfileTabCourses } from './components/ProfileTabCourses';
import { ProfileTabExams } from './components/ProfileTabExams';
import { ProfileTabTransactions } from './components/ProfileTabTransactions';

const TABS = [
  { id: 'courses', name: 'Khóa học của tôi' },
  { id: 'results', name: 'Kết quả luyện thi' },
  { id: 'billing', name: 'Lịch sử giao dịch' },
];

export const ProfilePage = () => {
  // Lấy user từ Redux (đã được ProtectedRoute đảm bảo là có)
  const user = useAppSelector(state => state.auth.user);

  // An toàn: Nếu bị lỗi (hiếm), quay về trang chủ
  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* 1. Profile Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center space-x-5">
            <img 
              className="h-20 w-20 rounded-full object-cover" 
              src={user.avatarUrl} 
              alt={user.name} 
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{user.name}</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
            </div>
            <button className="ml-auto flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600">
              <PencilSquareIcon className="w-4 h-4" />
              Sửa hồ sơ
            </button>
          </div>
        </div>
      </div>
      
      {/* 2. Thanh Tabs */}
      <div className="sticky top-16 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <TabGroup>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <TabList className="flex -mb-px space-x-8">
              {TABS.map(tab => (
                <Tab as={Fragment} key={tab.id}>
                  {({ selected }) => (
                    <button
                      className={clsx(
                        'px-1 py-4 text-sm font-medium leading-5 transition-colors',
                        'focus:outline-none',
                        selected
                          ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-400'
                          : 'border-b-2 border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                      )}
                    >
                      {tab.name}
                    </button>
                  )}
                </Tab>
              ))}
            </TabList>
          </div>
          
          {/* 3. Nội dung Tabs */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <TabPanels>
              <TabPanel className="focus:outline-none">
                <ProfileTabCourses />
              </TabPanel>
              <TabPanel className="focus:outline-none">
                <ProfileTabExams />
              </TabPanel>
              <TabPanel className="focus:outline-none">
                <ProfileTabTransactions />
              </TabPanel>
            </TabPanels>
          </div>
        </TabGroup>
      </div>
    </div>
  );
};