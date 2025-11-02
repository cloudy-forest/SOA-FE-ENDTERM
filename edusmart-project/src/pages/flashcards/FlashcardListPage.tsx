// src/pages/flashcards/FlashcardListPage.tsx
import { Fragment } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { TabMySets } from './components/TabMySets';
import { TabStudying } from './components/TabStudying';
import { TabExplore } from './components/TabExplore';
import clsx from 'clsx';

const TABS = [
  { id: 'my-sets', name: 'Bộ thẻ của tôi' },
  { id: 'studying', name: 'Đang học' },
  { id: 'explore', name: 'Khám phá' },
];

export const FlashcardListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Đọc tab từ URL, mặc định là "my-sets"
  const activeTab = searchParams.get('tab') || 'my-sets';
  const selectedIndex = TABS.findIndex(t => t.id === activeTab);

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
          {/* 1. Thanh Tabs (UI tối giản, không viền) */}
          <TabList className="flex space-x-1 border-b border-gray-200 dark:border-gray-700 mb-6">
            {TABS.map(tab => (
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
          
          {/* 2. Nội dung các Tab */}
          <TabPanels>
            <TabPanel className="focus:outline-none">
              <TabMySets />
            </TabPanel>
            <TabPanel className="focus:outline-none">
              <TabStudying />
            </TabPanel>
            <TabPanel className="focus:outline-none">
              <TabExplore />
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </div>
  );
};