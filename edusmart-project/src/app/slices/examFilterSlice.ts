// src/app/slices/examFilterSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { 
    ExamFilterState, 
    ExamSubject, 
    ExamLevel, 
    ExamType, 
    ExamSort 
} from '../../types/exam';

const initialState: ExamFilterState = {
  searchTerm: '',
  subjects: [],
  levels: [],
  types: [],
  sortBy: 'newest',
  page: 1,
};

const resetPage = (state: ExamFilterState) => { state.page = 1; };

const examFilterSlice = createSlice({
  name: 'examFilter',
  initialState,
  reducers: {
    // Action để khởi tạo state từ URL
    setExamFiltersFromUrl(state, action: PayloadAction<Partial<ExamFilterState>>) {
      Object.assign(state, action.payload);
    },

    setExamSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
      resetPage(state);
    },
    toggleExamSubject(state, action: PayloadAction<ExamSubject>) {
      const subject = action.payload;
      const index = state.subjects.indexOf(subject);
      if (index > -1) state.subjects.splice(index, 1);
      else state.subjects.push(subject);
      resetPage(state);
    },
    toggleExamLevel(state, action: PayloadAction<ExamLevel>) {
      const level = action.payload;
      const index = state.levels.indexOf(level);
      if (index > -1) state.levels.splice(index, 1);
      else state.levels.push(level);
      resetPage(state);
    },
    toggleExamType(state, action: PayloadAction<ExamType>) {
      const type = action.payload;
      const index = state.types.indexOf(type);
      if (index > -1) state.types.splice(index, 1);
      else state.types.push(type);
      resetPage(state);
    },
    setExamSortBy(state, action: PayloadAction<ExamSort>) {
      state.sortBy = action.payload;
      resetPage(state);
    },
    clearExamFilters(state) {
      state.subjects = [];
      state.levels = [];
      state.types = [];
      resetPage(state);
    },
    setExamPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
  },
});

export const {
  setExamFiltersFromUrl,
  setExamSearchTerm,
  toggleExamSubject,
  toggleExamLevel,
  toggleExamType,
  setExamSortBy,
  clearExamFilters,
  setExamPage,
} = examFilterSlice.actions;

export default examFilterSlice.reducer;