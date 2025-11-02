// src/app/slices/flashcardFilterSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { 
    FlashcardFilterState, 
    FlashcardSubject, 
    FlashcardLevel, 
    FlashcardSort 
} from '../../types/flashcard';

const initialState: FlashcardFilterState = {
  searchTerm: '',
  subjects: [],
  levels: [],
  sortBy: 'newest',
  page: 1,
};

// Hàm helper
const resetPage = (state: FlashcardFilterState) => { state.page = 1; };

const flashcardFilterSlice = createSlice({
  name: 'flashcardFilter',
  initialState,
  reducers: {
    // Dùng để đồng bộ state từ URL khi tải trang
    setFlashcardFiltersFromUrl(state, action: PayloadAction<Partial<FlashcardFilterState>>) {
      Object.assign(state, action.payload);
    },
    // Dùng cho ô tìm kiếm
    setFlashcardSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
      resetPage(state);
    },
    // Dùng cho dropdown lọc Môn học
    toggleFlashcardSubject(state, action: PayloadAction<FlashcardSubject>) {
      const subject = action.payload;
      const index = state.subjects.indexOf(subject);
      if (index > -1) state.subjects.splice(index, 1);
      else state.subjects.push(subject);
      resetPage(state);
    },
    // Dùng cho dropdown lọc Trình độ
    toggleFlashcardLevel(state, action: PayloadAction<FlashcardLevel>) {
      const level = action.payload;
      const index = state.levels.indexOf(level);
      if (index > -1) state.levels.splice(index, 1);
      else state.levels.push(level);
      resetPage(state);
    },
    // Dùng cho dropdown Sắp xếp
    setFlashcardSortBy(state, action: PayloadAction<FlashcardSort>) {
      state.sortBy = action.payload;
      resetPage(state);
    },
    // Dùng cho nút "Xóa lọc"
    clearFlashcardFilters(state) {
      state.subjects = [];
      state.levels = [];
      resetPage(state);
    },
    // Dùng cho Phân trang
    setFlashcardPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
  },
});

// Export các actions
export const {
  setFlashcardFiltersFromUrl,
  setFlashcardSearchTerm,
  toggleFlashcardSubject,
  toggleFlashcardLevel,
  setFlashcardSortBy,
  clearFlashcardFilters,
  setFlashcardPage,
} = flashcardFilterSlice.actions;

// Export reducer
export default flashcardFilterSlice.reducer;