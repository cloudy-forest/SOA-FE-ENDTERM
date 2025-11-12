// src/pages/flashcards/components/TabExplore.tsx
import { useMemo } from 'react';
import { mockFlashcardDetails } from '../../../data/mockFlashcardData';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { setFlashcardPage } from '../../../app/slices/flashcardFilterSlice';
import { FlashcardSetCard } from './FlashcardSetCard';
import { Pagination } from '../../../components/ui/Pagination';
import { FlashcardToolbarExplore } from './FlashcardToolbarExplore';
import { FilterSync } from './FilterSync';

const CARDS_PER_PAGE = 9;
const allFlashcardSets = mockFlashcardDetails;

export const TabExplore = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(state => state.flashcardFilter);

  // Lọc, Sắp xếp (ĐÃ SỬA)
  const filteredSets = useMemo(() => {
    let sets = [...allFlashcardSets];
    
    // Lọc (Giờ đã hoạt động)
    if (filters.searchTerm) {
      const searchTerm = filters.searchTerm.toLowerCase();
      sets = sets.filter(c => c.title.toLowerCase().includes(searchTerm) || c.description.toLowerCase().includes(searchTerm));
    }
    if (filters.subjects.length > 0) {
      sets = sets.filter(c => filters.subjects.includes(c.subject));
    }
    if (filters.levels.length > 0) {
      sets = sets.filter(c => filters.levels.includes(c.level));
    }

    // Sắp xếp (ĐÃ SỬA)
    switch (filters.sortBy) {
      case 'popular': 
        sets.sort((a, b) => b.views - a.views); 
        break;
      // ▼▼▼ SỬA LỖI TYPO 'termCount' VÀ LOGIC SORT ▼▼▼
      case 'words-desc': 
        sets.sort((a, b) => b.number_of_word - a.number_of_word); 
        break;
      case 'words-asc': 
        sets.sort((a, b) => a.number_of_word - b.number_of_word); 
        break;
      case 'newest': 
      default: 
        sets.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); 
        break;
    }
    return sets;
  }, [filters]); // Dependency `filters` là đúng

  // Phân trang (Giữ nguyên)
  const totalPages = Math.ceil(filteredSets.length / CARDS_PER_PAGE);
  const paginatedSets = useMemo(() => {
    const start = (filters.page - 1) * CARDS_PER_PAGE;
    return filteredSets.slice(start, start + CARDS_PER_PAGE);
  }, [filteredSets, filters.page]);

  const handlePageChange = (page: number) => {
    dispatch(setFlashcardPage(page));
    window.scrollTo(0, 0);
  };

  return (
    <div>
      <FilterSync /> {/* Component ẩn sync URL */}
      <FlashcardToolbarExplore /> {/* Toolbar mới */}
      
      {/* Results */}
      <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
        Hiển thị <strong>{paginatedSets.length}</strong> / <strong>{filteredSets.length}</strong> kết quả
      </div>
      
      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
        {paginatedSets.map(set => (
          <FlashcardSetCard key={set.id} set={set} type="public" />
        ))}
      </div>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={filters.page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};