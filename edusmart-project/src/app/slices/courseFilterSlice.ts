// src/app/slices/courseFilterSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { 
    CourseFilterState, 
    CourseCategory, 
    CourseLevel, 
    CoursePrice, 
    CourseRating, 
    CourseSort 
} from '../../types/course';
// import { useSearchParams } from 'react-router-dom';

// State ban đầu cho bộ lọc
const initialState: CourseFilterState = {
  searchTerm: '',
  categories: [],
  levels: [],
  price: 'all',
  ratings: [],
  sortBy: 'newest',
  page: 1,
};

// Hàm helper để reset page
const resetPage = (state: CourseFilterState) => {
  state.page = 1;
};

const courseFilterSlice = createSlice({
  name: 'courseFilter',
  initialState,
  reducers: {
    // Action để khởi tạo state từ URL
    setFiltersFromUrl(state, action: PayloadAction<Partial<CourseFilterState>>) {
      // Ghi đè state ban đầu bằng state từ URL
      Object.assign(state, action.payload);
    },
    
    // Action khi gõ vào ô tìm kiếm
    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
      resetPage(state); // Reset page khi tìm kiếm
    },

    // Action khi check/uncheck một category
    toggleCategory(state, action: PayloadAction<CourseCategory>) {
      const category = action.payload;
      const index = state.categories.indexOf(category);
      if (index > -1) {
        state.categories.splice(index, 1); // Đã có -> Xóa
      } else {
        state.categories.push(category); // Chưa có -> Thêm
      }
      resetPage(state); // Reset page
    },

    // Action khi check/uncheck một level
    toggleLevel(state, action: PayloadAction<CourseLevel>) {
      const level = action.payload;
      const index = state.levels.indexOf(level);
      if (index > -1) {
        state.levels.splice(index, 1);
      } else {
        state.levels.push(level);
      }
      resetPage(state);
    },

    // Action khi chọn giá (radio button)
    setPrice(state, action: PayloadAction<CoursePrice>) {
      state.price = action.payload;
      resetPage(state);
    },

    // Action khi check/uncheck rating
    toggleRating(state, action: PayloadAction<CourseRating>) {
        const rating = action.payload;
        const index = state.ratings.indexOf(rating);
        if (index > -1) {
            state.ratings.splice(index, 1);
        } else {
            state.ratings.push(rating);
        }
        resetPage(state);
    },
    
    // Action khi chọn Sắp xếp (dropdown)
    setSortBy(state, action: PayloadAction<CourseSort>) {
      state.sortBy = action.payload;
      resetPage(state);
    },

    // Action khi bấm nút "Xóa tất cả bộ lọc"
    clearFilters(state) {
      state.categories = [];
      state.levels = [];
      state.price = 'all';
      state.ratings = [];
      resetPage(state);
      // (Giữ lại searchTerm và sortBy)
    },
    
    // Action cho phân trang
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload
      // const p = Number(action.payload);
      // state.page = Number.isFinite(p) && p > 0 ? Math.floor(p) : 1;
      // Không reset page
    }
  },
});

export const {
  setFiltersFromUrl,
  setSearchTerm,
  toggleCategory,
  toggleLevel,
  setPrice,
  toggleRating,
  setSortBy,
  clearFilters,
  setPage,
} = courseFilterSlice.actions;

export default courseFilterSlice.reducer;