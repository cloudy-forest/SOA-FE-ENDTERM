// src/pages/flashcards/components/FlashcardSetCard.tsx
import { Link } from 'react-router-dom';
import type { FlashcardDetail } from '../../../types/flashcard';
import { 
    ClipboardDocumentListIcon, EyeIcon, 
    PlusIcon, PencilIcon, BookOpenIcon 
} from '@heroicons/react/24/outline';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/24/solid';

type CardType = 'personal' | 'studying' | 'public';

interface FlashcardSetCardProps {
  set: FlashcardDetail;
  type: CardType;
  isLoggedIn?: boolean; // <<< 1. THÊM PROP (optional)
}

// (PersonalCardActions giữ nguyên)
const PersonalCardActions = ({ setId }: { setId: number }) => (
  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
    <Link
      to={`/flashcards/${setId}`} // Link này an toàn (vì chỉ user đã login mới thấy)
      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
    >
      <BookOpenIcon className="w-4 h-4" />
      Học ngay
    </Link>
    {/* (Menu giữ nguyên) */}
    <Menu as="div" className="relative"> 
      <MenuButton className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700">
        <EllipsisVerticalIcon className="w-5 h-5" />
      </MenuButton>
      <MenuItems anchor="bottom end" className="z-10 w-40 origin-top-right rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="py-1">
          <MenuItem>
            <Link to={`/flashcards/edit/${setId}`} className="group flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 data-[hover]:bg-gray-100 dark:data-[hover]:bg-gray-700">
              <PencilIcon className="w-4 h-4" /> Sửa
            </Link>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  </div>
);

// ▼▼▼ 2. SỬA PublicCardActions ĐỂ NHẬN 'isLoggedIn' ▼▼▼
const PublicCardActions = ({ setId, isLoggedIn }: { setId: number, isLoggedIn: boolean }) => (
  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
    <Link
      // 3. LOGIC LINK (RẤT QUAN TRỌNG)
      to={isLoggedIn ? `/flashcards/${setId}` : '/login'}
      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
    >
      Chi tiết
    </Link>
    <Link 
      // Nút "Thêm" cũng yêu cầu đăng nhập
      to={isLoggedIn ? '#' : '/login'}
      onClick={(e) => { 
        if (isLoggedIn) {
          e.preventDefault(); 
          alert('Đã thêm!'); // Chỉ alert khi đã đăng nhập
        }
        // Nếu chưa đăng nhập, nó sẽ hoạt động như Link to="/login"
      }}
      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
    >
      <PlusIcon className="w-4 h-4" />
      Thêm vào bộ
    </Link>
  </div>
);

// (StudyingCardActions giữ nguyên)
const StudyingCardActions = ({ setId }: { setId: number }) => (
  <>
    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-2">
      <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '45%' }}></div>
    </div>
    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
      <p className="text-xs text-gray-500">Học lần cuối: 2 giờ trước</p>
      <Link
        to={`/flashcards/${setId}`} // Link này an toàn
        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
      >
        <BookOpenIcon className="w-4 h-4" />
        Học tiếp
      </Link>
    </div>
  </>
);


// ---- Component Card Chính ----
// ▼▼▼ 4. SET 'isLoggedIn = true' LÀM MẶC ĐỊNH (CHO CÁC TAB CŨ) ▼▼▼
export const FlashcardSetCard = ({ set, type, isLoggedIn = true }: FlashcardSetCardProps) => {
  return (
    <div className="group block bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-5 transition-all duration-300 hover:shadow-lg">
      <Link 
        // 5. LOGIC LINK CHO TIÊU ĐỀ
        to={isLoggedIn ? `/flashcards/${set.id}` : '/login'}
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400">
          {set.title}
        </h3>
      </Link>
      
      {/* Stats (Giữ nguyên) */}
      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
        <span className="flex items-center" title="Số lượng thẻ">
          <ClipboardDocumentListIcon className="w-4 h-4 mr-1.5" />
          {set.number_of_word} thẻ
        </span>
        <span className="flex items-center" title="Lượt xem">
          <EyeIcon className="w-4 h-4 mr-1.5" />
          {set.views}
        </span>
      </div>
      
      {/* Author (Giữ nguyên) */}
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

      {/* ▼▼▼ 6. TRUYỀN 'isLoggedIn' XUỐNG TAB PUBLIC ▼▼▼ */}
      {type === 'personal' && <PersonalCardActions setId={set.id} />}
      {type === 'studying' && <StudyingCardActions setId={set.id} />}
      {type === 'public' && <PublicCardActions setId={set.id} isLoggedIn={isLoggedIn} />}
    </div>
  );
};