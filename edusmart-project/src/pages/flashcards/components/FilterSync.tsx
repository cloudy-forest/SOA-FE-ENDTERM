// src/pages/flashcards/components/FilterSync.tsx
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import type { FlashcardFilterState, FlashcardSubject, FlashcardLevel, FlashcardSort } from '../../../types/flashcard';
import { setFlashcardFiltersFromUrl } from '../../../app/slices/flashcardFilterSlice';

export const FilterSync = () => {
  const [searchParams, setSearchParams] = useSearchParams(); // <-- Lấy cả 2 giá trị
  const dispatch = useAppDispatch();
  const filters = useAppSelector(state => state.flashcardFilter);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // 1. Đọc URL -> Cập nhật Redux (Chỉ chạy 1 lần)
  useEffect(() => {
    // Đọc các tham số từ URL
    const pageParam = searchParams.get('page');
    const initialState: Partial<FlashcardFilterState> = {
      searchTerm: searchParams.get('search') || undefined,
      subjects: searchParams.getAll('subject') as FlashcardSubject[],
      levels: searchParams.getAll('level') as FlashcardLevel[],
      sortBy: (searchParams.get('sort') || undefined) as FlashcardSort,
      page: pageParam ? Number(pageParam) : undefined,
    };
    
    const cleanedInitialState = Object.fromEntries(
        Object.entries(initialState).filter(([, v]) => v !== undefined)
    );
    dispatch(setFlashcardFiltersFromUrl(cleanedInitialState));
    setIsInitialLoad(false); 
  }, [dispatch]); // Chỉ chạy 1 lần

  // 2. Đọc Redux -> Cập nhật URL (Đây là nơi sửa lỗi)
  useEffect(() => {
    // Đọc tab HIỆN TẠI từ URL
    const currentTab = searchParams.get('tab') || 'my-sets';

    // CHỈ CHẠY KHI:
    // 1. Không phải lần tải đầu tiên
    // 2. Tab hiện tại PHẢI LÀ "explore"
    if (isInitialLoad || currentTab !== 'explore') {
      return; // Không làm gì cả
    }

    // Nếu điều kiện qua, chúng ta đang ở tab "explore" và filter đã thay đổi
    const newParams = new URLSearchParams();
    
    // ▼▼▼ FIX QUAN TRỌNG: LUÔN GIỮ 'tab=explore' ▼▼▼
    newParams.set('tab', 'explore'); 

    // Thêm các bộ lọc khác từ Redux
    if (filters.searchTerm) newParams.set('search', filters.searchTerm);
    if (filters.sortBy !== 'newest') newParams.set('sort', filters.sortBy);
    if (filters.page !== 1) newParams.set('page', filters.page.toString());
    filters.subjects.forEach(c => newParams.append('subject', c));
    filters.levels.forEach(l => newParams.append('level', l));

    // Cập nhật URL (dùng 'replace' để không tạo lịch sử trình duyệt)
    setSearchParams(newParams, { replace: true });

  }, [filters, setSearchParams, isInitialLoad, searchParams]); // Thêm searchParams vào dependencies

  return null;
};