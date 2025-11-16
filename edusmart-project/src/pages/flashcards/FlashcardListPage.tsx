// src/pages/flashcards/FlashcardListPage.tsx
import { Fragment } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { TabMySets } from './components/TabMySets';
import { TabStudying } from './components/TabStudying';
import { TabExplore } from './components/TabExplore';
import clsx from 'clsx';
import { useAppSelector } from '../../app/hooks';

const ALL_TABS = [
  { id: 'my-sets', name: 'Bộ thẻ của tôi' },
  { id: 'studying', name: 'Đang học' },
  { id: 'explore', name: 'Khám phá' },
];

export const FlashcardListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Kiểm tra trạng thái đăng nhập
  const user = useAppSelector(state => state.auth.user);
  const isLoggedIn = !!user;

  // Lọc tab dựa trên đăng nhập
  // Nếu đã đăng nhập, hiện cả 3. Nếu chưa, chỉ hiện "Khám phá"
  const TABS = isLoggedIn ? ALL_TABS : [ALL_TABS[2]];

  // Logic chọn tab 
  // Đọc tab từ URL, mặc định là "my-sets" (nếu đã đăng nhập) hoặc 'explore' (nếu chưa)
  const activeTab = searchParams.get('tab') || (isLoggedIn ? 'my-sets' : 'explore');

  let selectedIndex = TABS.findIndex(t => t.id === activeTab);
  // Nếu user chưa đăng nhập nhưng URL là ?tab=my-sets, tự động chuyển về tab 0
  if (selectedIndex === -1) {
    selectedIndex = 0;
  }

  // Khi bấm chuyển tab -> Cập nhật URL
  const onTabChange = (index: number) => {
    const newTab = TABS[index].id;
    // Khi chuyển tab, xóa các filter của tab "Khám phá"
    setSearchParams({ tab: newTab }); 
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Header (Breadcrumb) */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="text-sm">
            <Link to="/" className="text-blue-600 dark:text-blue-400 hover:underline">Trang chủ</Link>
            <span className="mx-2 text-gray-400 dark:text-gray-500">/</span>
            <span className="text-gray-700 dark:text-gray-300">Flashcards</span>
          </nav>
        </div>
      </div>
      
      {/* Main Content (với Tabs) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <TabGroup selectedIndex={selectedIndex} onChange={onTabChange}>
          {/* 6. Thanh Tabs (Tự động ẩn/hiện) */}
          <TabList className="flex space-x-1 border-b border-gray-200 dark:border-gray-700 mb-6">
            {TABS.map(tab => ( // 'TABS' giờ đã được lọc
              <Tab as={Fragment} key={tab.id}>
                {({ selected }) => (
                  <button
                    className={clsx(
                      'px-5 py-3 text-sm font-medium leading-5 transition-colors',
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
          
          {/* 2. Nội dung các Tab (Render có điều kiện) */}
          <TabPanels>
            {isLoggedIn ? (
              <>
                {/* Đã đăng nhập: Hiện cả 3 */}
                <TabPanel className="focus:outline-none"><TabMySets /></TabPanel>
                <TabPanel className="focus:outline-none"><TabStudying /></TabPanel>
                <TabPanel className="focus:outline-none"><TabExplore isLoggedIn={isLoggedIn} /></TabPanel>
              </>
            ) : (
              // Chưa đăng nhập: Chỉ hiện 1
              <TabPanel className="focus:outline-none"><TabExplore isLoggedIn={isLoggedIn} /></TabPanel>
            )}
          </TabPanels>
        </TabGroup>
      </div>
    </div>
  );
};