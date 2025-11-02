// src/pages/courses/components/CourseStickyNav.tsx
// (onSelect là hàm để scroll)
export const CourseStickyNav = ({ onSelect }: { onSelect: (id: string) => void }) => {
  const tabs = [
    { id: 'outcomes', name: 'Mục tiêu' },
    { id: 'info', name: 'Thông tin' },
    { id: 'curriculum', name: 'Chương trình học' },
    { id: 'reviews', name: 'Đánh giá' },
  ];
  
  return (
    <nav className="sticky top-16 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex -mb-px space-x-8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => onSelect(tab.id)}
              className="px-1 py-4 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 border-b-2 border-transparent hover:border-blue-600"
            >
              {tab.name}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};