// src/pages/flashcards/components/FlashcardSetCard.tsx
import { Link } from 'react-router-dom';
import type { FlashcardSet } from '../../../types/flashcard';
import { 
    ClipboardDocumentListIcon, EyeIcon, 
    PlusIcon, PencilIcon, BookOpenIcon 
} from '@heroicons/react/24/outline';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/24/solid';

type CardType = 'personal' | 'studying' | 'public';

interface FlashcardSetCardProps {
  set: FlashcardSet;
  type: CardType; // 'personal', 'studying', hoặc 'public'
}

// ---- Ba loại Nút bấm cho 3 Tab ----

// 1. Cho Tab "Bộ thẻ của tôi"
const PersonalCardActions = ({ setId }: { setId: number }) => (
  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
    <Link
      to={`/flashcards/learn/${setId}`} // (Sẽ tạo trang HỌC sau)
      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
    >
      <BookOpenIcon className="w-4 h-4" />
      Học ngay
    </Link>
    {/* Nút 3 chấm (Sửa/Xóa) */}
    <Menu as="div" className="relative">
      <MenuButton className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700">
        <EllipsisVerticalIcon className="w-5 h-5" />
      </MenuButton>
      <MenuItems
        anchor="bottom end"
        className="z-10 w-40 origin-top-right rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <div className="py-1">
          <MenuItem>
            <Link
              to={`/flashcards/edit/${setId}`} // (Sẽ tạo trang SỬA sau)
              className="group flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 data-[hover]:bg-gray-100 dark:data-[hover]:bg-gray-700"
            >
              <PencilIcon className="w-4 h-4" /> Sửa
            </Link>
          </MenuItem>
          {/* (Thêm nút Xóa ở đây sau) */}
        </div>
      </MenuItems>
    </Menu>
  </div>
);

// 2. Cho Tab "Khám phá"
const PublicCardActions = ({ setId }: { setId: number }) => (
  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
    <Link
      to={`/flashcards/detail/${setId}`} // (Link đến trang Chi tiết bộ thẻ)
      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
    >
      Chi tiết
    </Link>
    <button 
      onClick={(e) => { 
        e.preventDefault(); // Ngăn link card chạy
        alert('Đã thêm!'); // (Logic thật sẽ ở đây)
      }}
      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
    >
      <PlusIcon className="w-4 h-4" />
      Thêm vào bộ
    </button>
  </div>
);

// 3. Cho Tab "Đang học"
const StudyingCardActions = ({ setId }: { setId: number }) => (
  <>
    {/* Thanh tiến độ (Nâng cao) */}
    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-2">
      <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '45%' }}></div>
    </div>
    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
      <p className="text-xs text-gray-500">Học lần cuối: 2 giờ trước</p>
      <Link
        to={`/flashcards/learn/${setId}`}
        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
      >
        <BookOpenIcon className="w-4 h-4" />
        Học tiếp
      </Link>
    </div>
  </>
);


// ---- Component Card Chính ----
export const FlashcardSetCard = ({ set, type }: FlashcardSetCardProps) => {
  return (
    // Bỏ thẻ Link ở ngoài để các nút bên trong bấm được
    <div className="group block bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-5 transition-all duration-300 hover:shadow-lg">
      <Link to={`/flashcards/detail/${set.id}`}>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400">
          {set.title}
        </h3>
      </Link>
      
      {/* Stats */}
      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
        <span className="flex items-center" title="Số lượng thẻ">
          <ClipboardDocumentListIcon className="w-4 h-4 mr-1.5" />
          {set.termCount} thẻ
        </span>
        <span className="flex items-center" title="Lượt xem">
          <EyeIcon className="w-4 h-4 mr-1.5" />
          {set.views}
        </span>
      </div>
      
      {/* Author (chỉ hiển thị ở tab Public/Studying) */}
      {type !== 'personal' && (
         <div className="flex items-center space-x-2 mb-2">
            <img 
              className="w-6 h-6 rounded-full object-cover" 
              src={set.authorImage || 'https://i.pravatar.cc/150?img=1'} 
              alt={set.author} 
            />
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{set.author}</span>
        </div>
      )}

      {/* Nút bấm (dựa theo type) */}
      {type === 'personal' && <PersonalCardActions setId={set.id} />}
      {type === 'studying' && <StudyingCardActions setId={set.id} />}
      {type === 'public' && <PublicCardActions setId={set.id} />}
    </div>
  );
};