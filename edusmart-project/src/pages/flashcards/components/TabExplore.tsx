// // src/pages/flashcards/components/TabExplore.tsx
// import { useMemo, useState, useEffect } from 'react';
// import { getFlashcardSets } from '../../../services/flashcardService';
// import type { FlashcardDetail } from '../../../types/flashcard';
// import { useAppSelector, useAppDispatch } from '../../../app/hooks';
// import { setFlashcardPage } from '../../../app/slices/flashcardFilterSlice';
// import { FlashcardSetCard } from './FlashcardSetCard';
// import { Pagination } from '../../../components/ui/Pagination';
// import { FlashcardToolbarExplore } from './FlashcardToolbarExplore';
// import { FilterSync } from './FilterSync';
// import { Spinner } from '../../../components/ui/Spinner';

// const CARDS_PER_PAGE = 9;

// // ▼▼▼ 1. NHẬN PROP 'isLoggedIn' ▼▼▼
// export const TabExplore = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
//   const dispatch = useAppDispatch();
//   const filters = useAppSelector(state => state.flashcardFilter);
  
//   const [allSets, setAllSets] = useState<FlashcardDetail[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadSets = async () => {
//       try {
//         setLoading(true);
//         const data = await getFlashcardSets();
//         setAllSets(data);
//       } catch (error) {
//         console.error("Lỗi tải bộ thẻ:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadSets();
//   }, []);

//   // (Tất cả logic Lọc, Sắp xếp, Phân trang... giữ nguyên)
//   const filteredSets = useMemo(() => {
//     let sets = [...allSets];
//     if (filters.searchTerm) {
//       const searchTerm = filters.searchTerm.toLowerCase();
//       sets = sets.filter(c => c.title.toLowerCase().includes(searchTerm) || c.description.toLowerCase().includes(searchTerm));
//     }
//     if (filters.subjects.length > 0) {
//       sets = sets.filter(c => filters.subjects.includes(c.subject));
//     }
//     if (filters.levels.length > 0) {
//       sets = sets.filter(c => filters.levels.includes(c.level));
//     }
//     switch (filters.sortBy) {
//       case 'popular': sets.sort((a, b) => b.views - a.views); break;
//       case 'words-desc': sets.sort((a, b) => b.number_of_word - a.number_of_word); break;
//       case 'words-asc': sets.sort((a, b) => a.number_of_word - b.number_of_word); break;
//       case 'newest': default: sets.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); break;
//     }
//     return sets;
//   }, [filters, allSets]);

//   const totalPages = Math.ceil(filteredSets.length / CARDS_PER_PAGE);
//   const paginatedSets = useMemo(() => {
//     const start = (filters.page - 1) * CARDS_PER_PAGE;
//     return filteredSets.slice(start, start + CARDS_PER_PAGE);
//   }, [filteredSets, filters.page]);

//   const handlePageChange = (page: number) => {
//     dispatch(setFlashcardPage(page));
//     window.scrollTo(0, 0);
//   };

//   return (
//     <div>
//       <FilterSync /> 
//       <FlashcardToolbarExplore />
      
//       {loading ? (
//         <div className="flex justify-center p-12"><Spinner /></div>
//       ) : (
//         <>
//           <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
//             Hiển thị <strong>{paginatedSets.length}</strong> / <strong>{filteredSets.length}</strong> kết quả
//           </div>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
//             {paginatedSets.map(set => (
//               // ▼▼▼ 2. TRUYỀN 'isLoggedIn' XUỐNG THẺ (CARD) ▼▼▼
//               <FlashcardSetCard 
//                 key={set.id} 
//                 set={set} 
//                 type="public" 
//                 isLoggedIn={isLoggedIn} 
//               />
//             ))}
//           </div>
          
//           {totalPages > 1 && (
//             <Pagination
//               currentPage={filters.page}
//               totalPages={totalPages}
//               onPageChange={handlePageChange}
//             />
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// src/pages/flashcards/components/TabExplore.tsx
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FlashcardSetCard } from './FlashcardSetCard';
import { FlashcardToolbarExplore } from './FlashcardToolbarExplore';
import { searchFlashCards } from '../../../services/product/flashcardService';
import type { FlashCard } from '../../../types/flashcard';
import { Spinner } from '../../../components/ui/Spinner';
import { ArchiveBoxXMarkIcon } from '@heroicons/react/24/outline';

// ▼▼▼ XÓA INTERFACE VÀ PROP THỪA ▼▼▼
// (Không cần interface TabExploreProps nữa nếu không nhận prop nào)

export const TabExplore = () => { // Xóa ({ isLoggedIn }: TabExploreProps)
  const [searchParams] = useSearchParams();
  const [sets, setSets] = useState<FlashCard[]>([]);
  const [loading, setLoading] = useState(false);
  
  const keyword = searchParams.get('keyword') || '';

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await searchFlashCards(keyword);
        setSets(data);
      } catch (error) {
        console.error("Lỗi tải danh sách:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [keyword]);

  return (
    <div>
      <div className="mb-6">
        <FlashcardToolbarExplore />
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Spinner size="lg" />
        </div>
      ) : sets.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sets.map((set) => (
            <FlashcardSetCard key={set.id} set={set} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
          <ArchiveBoxXMarkIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Không tìm thấy kết quả</h3>
          <p className="text-gray-500">Thử tìm kiếm với từ khóa khác.</p>
        </div>
      )}
    </div>
  );
};