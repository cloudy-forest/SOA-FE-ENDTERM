// src/pages/exam/ExamListPage.tsx
import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { useDebounced } from '../../hooks/useDebounced';
import { allExams, subjectFilters, levelFilters, typeFilters, examSortOptions } from '../../data/mockExams';
import type { ExamFilterState, ExamSubject, ExamLevel, ExamType, ExamSort } from '../../types/exam';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  setExamFiltersFromUrl,
  setExamSearchTerm,
  setExamSortBy,
  setExamPage,
  toggleExamSubject,
  toggleExamLevel,
  toggleExamType,
} from '../../app/slices/examFilterSlice';

// Import các component
import { ExamCard } from './components/ExamCard';
import { ExamFilters } from './components/ExamFilters';
import { FilterChip } from '../../components/ui/FilterChip';
import { Pagination } from '../../components/ui/Pagination';

const EXAMS_PER_PAGE = 8; // Hiển thị 8 đề 1 trang

// Helper lấy tên hiển thị
const getFilterLabel = (key: string, value: string): string => {
  const lists: Record<string, { id: string; name: string }[]> = {
    subject: subjectFilters,
    level: levelFilters,
    type: typeFilters,
  };
  return lists[key]?.find(item => item.id === value)?.name || value;
};

// Component helper để sync Redux và URL
const FilterSync = () => {
  const [, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const filters = useAppSelector(state => state.examFilter);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // 1. Đọc URL -> Cập nhật Redux (Chỉ chạy 1 lần)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const pageParam = params.get('page');
    const initialState: Partial<ExamFilterState> = {
      searchTerm: params.get('search') || undefined,
      subjects: params.getAll('subject') as ExamSubject[],
      levels: params.getAll('level') as ExamLevel[],
      types: params.getAll('type') as ExamType[],
      sortBy: (params.get('sort') || undefined) as ExamSort,
      page: pageParam ? Number(pageParam) : undefined,
    };
    
    const cleanedInitialState = Object.fromEntries(
        Object.entries(initialState).filter(([, v]) => v !== undefined)
    );
    dispatch(setExamFiltersFromUrl(cleanedInitialState));
    setIsInitialLoad(false); 
  }, [dispatch]);

  // 2. Đọc Redux -> Cập nhật URL
  useEffect(() => {
    if (isInitialLoad) return;
    const newParams = new URLSearchParams();
    
    if (filters.searchTerm) newParams.set('search', filters.searchTerm);
    if (filters.sortBy !== 'newest') newParams.set('sort', filters.sortBy);
    if (filters.page !== 1) newParams.set('page', filters.page.toString());
    
    filters.subjects.forEach(c => newParams.append('subject', c));
    filters.levels.forEach(l => newParams.append('level', l));
    filters.types.forEach(r => newParams.append('type', r));

    setSearchParams(newParams);
  }, [filters, setSearchParams, isInitialLoad]);

  return null;
};


export const ExamListPage = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(state => state.examFilter);
  
  // State cục bộ cho ô search (để debounce)
  const [localSearch, setLocalSearch] = useState(filters.searchTerm);
  const debouncedSearch = useDebounced(localSearch, 350);

  useEffect(() => { setLocalSearch(filters.searchTerm); }, [filters.searchTerm]);
  useEffect(() => {
    if (debouncedSearch !== filters.searchTerm) {
      dispatch(setExamSearchTerm(debouncedSearch));
    }
  }, [debouncedSearch, filters.searchTerm, dispatch]);
  
  // Lọc và Sắp xếp
  const filteredExams = useMemo(() => {
    let exams = [...allExams];

    if (filters.searchTerm) {
      const searchTerm = filters.searchTerm.toLowerCase();
      exams = exams.filter(c => c.title.toLowerCase().includes(searchTerm));
    }
    if (filters.subjects.length > 0) {
      exams = exams.filter(c => filters.subjects.includes(c.subject as ExamSubject));
    }
    if (filters.levels.length > 0) {
      exams = exams.filter(c => filters.levels.includes(c.level as ExamLevel));
    }
    if (filters.types.length > 0) {
      exams = exams.filter(c => filters.types.includes(c.type as ExamType));
    }
    
    // Sắp xếp
    switch (filters.sortBy) {
      case 'popular': exams.sort((a, b) => b.attempts - a.attempts); break;
      case 'attempts-low': exams.sort((a, b) => a.attempts - b.attempts); break;
      case 'attempts-high': exams.sort((a, b) => b.attempts - a.attempts); break;
      case 'newest': default: exams.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); break;
    }
    return exams;
  }, [filters]);

  // Phân trang
  const totalPages = Math.ceil(filteredExams.length / EXAMS_PER_PAGE);
  const paginatedExams = useMemo(() => {
    const start = (filters.page - 1) * EXAMS_PER_PAGE;
    return filteredExams.slice(start, start + EXAMS_PER_PAGE);
  }, [filteredExams, filters.page]);

  // Active Chips
  const activeChips = useMemo(() => {
    const chips: { key: string; value: string; label: string }[] = [];
    filters.subjects.forEach(v => chips.push({ key: 'subject', value: v, label: getFilterLabel('subject', v) }));
    filters.levels.forEach(v => chips.push({ key: 'level', value: v, label: getFilterLabel('level', v) }));
    filters.types.forEach(v => chips.push({ key: 'type', value: v, label: getFilterLabel('type', v) }));
    return chips;
  }, [filters]);

  // Handlers
  const handlePageChange = (page: number) => {
    dispatch(setExamPage(page));
    window.scrollTo(0, 0);
  };
  
  const removeChip = (key: string, value: string) => {
    if (key === 'subject') dispatch(toggleExamSubject(value as ExamSubject));
    if (key === 'level') dispatch(toggleExamLevel(value as ExamLevel));
    if (key === 'type') dispatch(toggleExamType(value as ExamType));
  };

  // Render
  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <FilterSync /> {/* Component ẩn để sync URL */}
      
      {/* Header (Breadcrumb) */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="text-sm">
            <Link to="/" className="text-blue-600 dark:text-blue-400 hover:underline">Trang chủ</Link>
            <span className="mx-2 text-gray-400 dark:text-gray-500">/</span>
            <span className="text-gray-700 dark:text-gray-300">Ngân hàng đề thi</span>
          </nav>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-1/4 lg:flex-shrink-0">
            <ExamFilters /> {/* Component filter của Exam */}
          </aside>
          
          {/* Main Content */}
          <main className="w-full lg:w-3/4">
            {/* Toolbar (Search và Sort) */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 sm:p-6 mb-6">
              <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                {/* Search */}
                <div className="w-full md:w-1/2 lg:w-2/5">
                  <div className="relative">
                    <input
                      type="search"
                      placeholder="Tìm kiếm đề thi..."
                      value={localSearch}
                      onChange={(e) => setLocalSearch(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-700 border-0 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>
                {/* Sort */}
                <div className="w-full md:w-auto">
                  <select
                    value={filters.sortBy}
                    onChange={(e) => dispatch(setExamSortBy(e.target.value as ExamSort))}
                    className="px-4 py-2.5 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                  >
                    {examSortOptions.map(opt => (
                      <option key={opt.id} value={opt.id}>{opt.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              {/* Active Chips */}
              {activeChips.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <div className="flex flex-wrap gap-2 items-center">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">Đang lọc:</span>
                    {activeChips.map(chip => (
                      <FilterChip
                        key={`${chip.key}-${chip.value}`}
                        label={chip.label}
                        onRemove={() => removeChip(chip.key, chip.value)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Results */}
            <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
              Hiển thị <strong>{paginatedExams.length}</strong> trong tổng số <strong>{filteredExams.length}</strong> kết quả
            </div>
            
            {/* Grid (dùng 2 cột) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {paginatedExams.map(exam => (
                <ExamCard key={exam.id} exam={exam} />
              ))}
            </div>
            
            {/* Pagination */}
            <Pagination
              currentPage={filters.page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </main>
        </div>
      </div>
    </div>
  );
};