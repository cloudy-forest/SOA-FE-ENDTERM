// // src/pages/courses/CourseProgramPage.tsx
// import { useState, useMemo, useEffect } from 'react';
// import { useSearchParams, Link } from 'react-router-dom';
// import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
// import { useDebounced } from '../../hooks/useDebounced';
// import { allCourses, categoryFilters, levelFilters, ratingFilters, sortOptions } from '../../data/mockCourses';
// import type { 
//     CourseFilterState,
//     CourseCategory,
//     CourseLevel, 
//     CoursePrice, 
//     CourseRating, 
//     CourseSort 
// } from '../../types/course';
// import { useAppSelector, useAppDispatch } from '../../app/hooks';
// import {
//   setFiltersFromUrl,
//   setSearchTerm,
//   setSortBy,
//   setPage,
//   toggleCategory,
//   toggleLevel,
//   toggleRating,
// } from '../../app/slices/courseFilterSlice';

// // Import các component
// import { CourseCard } from './components/CourseCard';
// import { CourseFilters } from './components/CourseFilters';
// import { FilterChip } from '../../components/ui/FilterChip';
// import { Pagination } from '../../components/ui/Pagination';

// const COURSES_PER_PAGE = 9;

// // Helper lấy tên hiển thị
// const getFilterLabel = (key: string, value: string): string => {
//   const lists: Record<string, { id: string; name: string }[]> = {
//     category: categoryFilters,
//     level: levelFilters,
//     rating: ratingFilters,
//   };
//   return lists[key]?.find(item => item.id === value)?.name || value;
// };

// // Component helper để sync Redux và URL
// const FilterSync = () => {
//   const [, setSearchParams] = useSearchParams();
//   const dispatch = useAppDispatch();
//   const filters = useAppSelector(state => state.courseFilter);
//   const [isInitialLoad, setIsInitialLoad] = useState(true);

//   // 1. Đọc URL -> Cập nhật Redux (Chỉ chạy 1 lần)
// //   useEffect(() => {
// //     const params = new URLSearchParams(window.location.search);
// //     const initialState: Partial<CourseFilterState> = {
// //       searchTerm: params.get('search') || undefined,
// //       categories: params.getAll('category') as CourseCategory[],
// //       levels: params.getAll('level') as CourseLevel[],
// //       price: (params.get('price') || 'all') as CoursePrice,
// //       ratings: params.getAll('rating') as CourseRating[],
// //       sortBy: (params.get('sort') || 'newest') as CourseSort,
// //       page: Number(params.get('page')) || 1,
// //     };

//     useEffect(() => {
//         const params = new URLSearchParams(window.location.search);
//         const pageParam = params.get('page'); // Lấy page riêng

//         const initialState: Partial<CourseFilterState> = {
//         searchTerm: params.get('search') || undefined,
//         categories: params.getAll('category') as CourseCategory[],
//         levels: params.getAll('level') as CourseLevel[],
//         ratings: params.getAll('rating') as CourseRating[],
        
//         // ▼▼▼ SỬA LẠI ĐỂ DÙNG "undefined" KHI KHÔNG CÓ ▼▼▼
//         price: (params.get('price') || undefined) as CoursePrice,
//         sortBy: (params.get('sort') || undefined) as CourseSort,
//         page: pageParam ? Number(pageParam) : undefined,
//         };
    
//     // Lọc ra giá trị undefined trước khi dispatch
//     const cleanedInitialState = Object.fromEntries(
//         Object.entries(initialState).filter(([, v]) => v !== undefined)
//     );

//     dispatch(setFiltersFromUrl(cleanedInitialState));
//     setIsInitialLoad(false); // Đánh dấu đã tải xong
//   }, [dispatch]);

//   // 2. Đọc Redux -> Cập nhật URL (Chạy mỗi khi Redux thay đổi)
//   useEffect(() => {
//     if (isInitialLoad) return; // Bỏ qua lần chạy đầu

//     const newParams = new URLSearchParams();
    
//     if (filters.searchTerm) newParams.set('search', filters.searchTerm);
//     if (filters.sortBy !== 'newest') newParams.set('sort', filters.sortBy);
//     if (filters.page !== 1) newParams.set('page', filters.page.toString());
//     if (filters.price !== 'all') newParams.set('price', filters.price);
    
//     filters.categories.forEach(c => newParams.append('category', c));
//     filters.levels.forEach(l => newParams.append('level', l));
//     filters.ratings.forEach(r => newParams.append('rating', r));

//     setSearchParams(newParams);
//   }, [filters, setSearchParams, isInitialLoad]);

//   return null; // Component này không render gì cả
// };


// export const CourseProgramPage = () => {
//   const dispatch = useAppDispatch();
  
//   // 1. ĐỌC state bộ lọc từ Redux
//   const filters = useAppSelector(state => state.courseFilter);
  
//   // 2. DÙNG useState cục bộ cho ô search (để debounce)
//   const [localSearch, setLocalSearch] = useState(filters.searchTerm);
//   const debouncedSearch = useDebounced(localSearch, 350);

//   // Sync state từ Redux về localSearch (khi Redux bị clear,...)
//   useEffect(() => {
//     setLocalSearch(filters.searchTerm);
//   }, [filters.searchTerm]);

//   // Sync state (debounced) từ localSearch về Redux
//   useEffect(() => {
//     if (debouncedSearch !== filters.searchTerm) {
//       dispatch(setSearchTerm(debouncedSearch));
//     }
//   }, [debouncedSearch, filters.searchTerm, dispatch]);
  
//   // 3. Lọc và Sắp xếp (dùng useMemo)
//   const filteredCourses = useMemo(() => {
//     let courses = [...allCourses]; // Tạo bản sao để sort

//     if (filters.searchTerm) {
//       const searchTerm = filters.searchTerm.toLowerCase();
//       courses = courses.filter(c => c.title.toLowerCase().includes(searchTerm));
//     }
//     if (filters.categories.length > 0) {
//       courses = courses.filter(c => filters.categories.includes(c.category));
//     }
//     if (filters.levels.length > 0) {
//       courses = courses.filter(c => filters.levels.includes(c.level));
//     }
//     if (filters.price === 'free') courses = courses.filter(c => c.price === 0);
//     if (filters.price === 'paid') courses = courses.filter(c => c.price > 0);
//     if (filters.ratings.length > 0) {
//       courses = courses.filter(c => 
//         filters.ratings.some(r => (r === '5' && c.rating === 5) || (r === '4+' && c.rating >= 4))
//       );
//     }

//     // Sắp xếp
//     switch (filters.sortBy) {
//       case 'popular': courses.sort((a, b) => b.students - a.students); break;
//       case 'price-low': courses.sort((a, b) => a.price - b.price); break;
//       case 'price-high': courses.sort((a, b) => b.price - a.price); break;
//       case 'newest': default: courses.sort((a, b) => b.id - a.id); break;
//     }
//     return courses;
//   }, [filters]);

//   // 4. Phân trang
//   const totalPages = Math.ceil(filteredCourses.length / COURSES_PER_PAGE);
//   const paginatedCourses = useMemo(() => {
//     const start = (filters.page - 1) * COURSES_PER_PAGE;
//     return filteredCourses.slice(start, start + COURSES_PER_PAGE);
//   }, [filteredCourses, filters.page]);

//   // 5. Active Chips
//   const activeChips = useMemo(() => {
//     const chips: { key: string; value: string; label: string }[] = [];
//     filters.categories.forEach(v => chips.push({ key: 'category', value: v, label: getFilterLabel('category', v) }));
//     filters.levels.forEach(v => chips.push({ key: 'level', value: v, label: getFilterLabel('level', v) }));
//     filters.ratings.forEach(v => chips.push({ key: 'rating', value: v, label: getFilterLabel('rating', v) }));
//     return chips;
//   }, [filters]);

//   // 6. Handlers
//   const handlePageChange = (page: number) => {
//     dispatch(setPage(page));
//     window.scrollTo(0, 0);
//   };
  
//   const removeChip = (key: string, value: string) => {
//     if (key === 'category') dispatch(toggleCategory(value as CourseCategory));
//     if (key === 'level') dispatch(toggleLevel(value as CourseLevel));
//     if (key === 'rating') dispatch(toggleRating(value as CourseRating));
//   };

//   // 7. Render
//   return (
//     <div className="bg-gray-50 dark:bg-gray-900">
//       <FilterSync /> {/* Component ẩn để sync URL */}
      
//       {/* Header (Breadcrumb) */}
//       <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//           <nav className="text-sm">
//             <Link to="/" className="text-blue-600 dark:text-blue-400 hover:underline">Trang chủ</Link>
//             <span className="mx-2 text-gray-400 dark:text-gray-500">/</span>
//             <span className="text-gray-700 dark:text-gray-300">Chương trình học</span>
//           </nav>
//         </div>
//       </div>
      
//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="flex flex-col lg:flex-row gap-8">
          
//           {/* Sidebar Filters */}
//           <aside className="w-full lg:w-1/4 lg:flex-shrink-0">
//             <CourseFilters /> {/* Component này giờ đã "smart" */}
//           </aside>
          
//           {/* Main Content */}
//           <main className="w-full lg:w-3/4">
//             {/* Toolbar (Search và Sort) */}
//             <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 sm:p-6 mb-6">
//               <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
//                 {/* Search */}
//                 <div className="w-full md:w-1/2 lg:w-2/5">
//                   <div className="relative">
//                     <input
//                       type="search"
//                       placeholder="Tìm kiếm khóa học..."
//                       value={localSearch} // Dùng state cục bộ
//                       onChange={(e) => setLocalSearch(e.target.value)} // Cập nhật state cục bộ
//                       className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-700 border-0 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-gray-900 text-sm"
//                     />
//                     <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//                   </div>
//                 </div>
//                 {/* Sort */}
//                 <div className="w-full md:w-auto">
//                   <select
//                     value={filters.sortBy} // Đọc từ Redux
//                     onChange={(e) => dispatch(setSortBy(e.target.value as CourseSort))} // Dispatch action
//                     className="px-4 py-2.5 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
//                   >
//                     {sortOptions.map(opt => (
//                       <option key={opt.id} value={opt.id}>{opt.name}</option>
//                     ))}
//                   </select>
//                 </div>
//               </div>
              
//               {/* Active Chips */}
//               {activeChips.length > 0 && (
//                 <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
//                   <div className="flex flex-wrap gap-2 items-center">
//                     <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">Đang lọc:</span>
//                     {activeChips.map(chip => (
//                       <FilterChip
//                         key={`${chip.key}-${chip.value}`}
//                         label={chip.label}
//                         onRemove={() => removeChip(chip.key, chip.value)}
//                       />
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Results */}
//             <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
//               Hiển thị <strong>{paginatedCourses.length}</strong> trong tổng số <strong>{filteredCourses.length}</strong> kết quả
//             </div>
            
//             {/* Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
//               {paginatedCourses.map(course => (
//                 <CourseCard key={course.id} course={course} />
//               ))}
//             </div>
            
//             {/* Pagination */}
//             <Pagination
//               currentPage={filters.page}
//               totalPages={totalPages}
//               onPageChange={handlePageChange}
//             />
//           </main>
//         </div>
//       </div>
//     </div>
//   );
// };

// src/pages/courses/CourseProgramPage.tsx
import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

import { useDebounced } from '../../hooks/useDebounced';
import { getCourses } from '../../services/product/courseService';

import {
  categoryFilters,
  levelFilters,
  ratingFilters,
  sortOptions,
} from '../../data/mockCourses';

import type {
  Course,
  CourseListResponse,
  UICourseListItem,
  CourseFilterState,
  CourseCategory,
  CourseLevel,
  CoursePrice,
  CourseRating,
  CourseSort,
} from '../../types/course';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  setFiltersFromUrl,
  setSearchTerm,
  setSortBy,
  setPage,
  toggleCategory,
  toggleLevel,
  toggleRating,
} from '../../app/slices/courseFilterSlice';

import { CourseCard } from './components/CourseCard';
import { CourseFilters } from './components/CourseFilters';
import { FilterChip } from '../../components/ui/FilterChip';
import { Pagination } from '../../components/ui/Pagination';
import { Spinner } from '../../components/ui/Spinner';

const COURSES_PER_PAGE = 9;

// Map Course (API) -> UICourseListItem (UI)
const mapCourseToUI = (c: Course): UICourseListItem => ({
  id: c.id,
  title: c.course_name,
  description: c.course_desc,
  price: c.final_price,
  originalPrice: c.initial_price,
  thumbnail: c.thumbnail,
  rating: 4.8, // BE chưa có rating -> mock tạm
  students: c.registered_student,
  author: c.teacher_desc || 'Giảng viên',
  level: 'Tất cả trình độ',
  category: c.subject_name as CourseCategory,
});

const getFilterLabel = (key: string, value: string): string => {
  const lists: Record<string, { id: string; name: string }[]> = {
    category: categoryFilters,
    level: levelFilters,
    rating: ratingFilters,
  };
  return lists[key]?.find((item) => item.id === value)?.name || value;
};

// Sync URL <-> Redux
const FilterSync = () => {
  const [, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.courseFilter);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const pageParam = params.get('page');

    const initialState: Partial<CourseFilterState> = {
      searchTerm: params.get('search') || undefined,
      categories: params.getAll('category') as CourseCategory[],
      levels: params.getAll('level') as CourseLevel[],
      ratings: params.getAll('rating') as CourseRating[],
      price: (params.get('price') || undefined) as CoursePrice,
      sortBy: (params.get('sort') || undefined) as CourseSort,
      page: pageParam ? Number(pageParam) : undefined,
    };

    const cleanedInitialState = Object.fromEntries(
      Object.entries(initialState).filter(([, v]) => v !== undefined),
    );

    dispatch(setFiltersFromUrl(cleanedInitialState));
    setIsInitialLoad(false);
  }, [dispatch]);

  useEffect(() => {
    if (isInitialLoad) return;

    const newParams = new URLSearchParams();

    if (filters.searchTerm) newParams.set('search', filters.searchTerm);
    if (filters.sortBy !== 'newest') newParams.set('sort', filters.sortBy);
    if (filters.page !== 1) newParams.set('page', filters.page.toString());
    if (filters.price !== 'all') newParams.set('price', filters.price);

    filters.categories.forEach((c) => newParams.append('category', c));
    filters.levels.forEach((l) => newParams.append('level', l));
    filters.ratings.forEach((r) => newParams.append('rating', r));

    setSearchParams(newParams);
  }, [filters, setSearchParams, isInitialLoad]);

  return null;
};

export const CourseProgramPage = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.courseFilter);

  const [localSearch, setLocalSearch] = useState(filters.searchTerm);
  const debouncedSearch = useDebounced(localSearch, 350);

  const [rawCourses, setRawCourses] = useState<Course[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLocalSearch(filters.searchTerm);
  }, [filters.searchTerm]);

  useEffect(() => {
    if (debouncedSearch !== filters.searchTerm) {
      dispatch(setSearchTerm(debouncedSearch));
      dispatch(setPage(1));
    }
  }, [debouncedSearch, filters.searchTerm, dispatch]);

  // Gọi API thật
  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const data: CourseListResponse = await getCourses(
          filters.page,
          COURSES_PER_PAGE,
          filters.searchTerm || '',
        );
        setRawCourses(data.courses || []);
        setTotalPages(data.totalPages || 1);
      } catch (error) {
        console.error('Lỗi tải khóa học:', error);
        setRawCourses([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [filters.page, filters.searchTerm]);

  const uiCourses = useMemo<UICourseListItem[]>(
    () => rawCourses.map(mapCourseToUI),
    [rawCourses],
  );

  // Lọc + sort client-side (vì BE chưa support các filter này)
  const filteredCourses = useMemo(() => {
    let list = [...uiCourses];

    if (filters.categories.length > 0) {
      list = list.filter((c) =>
        filters.categories.includes(c.category as CourseCategory),
      );
    }

    if (filters.levels.length > 0) {
      list = list.filter((c) =>
        filters.levels.includes(c.level as CourseLevel),
      );
    }

    if (filters.price === 'free') {
      list = list.filter((c) => c.price === 0);
    } else if (filters.price === 'paid') {
      list = list.filter((c) => c.price > 0);
    }

    if (filters.ratings.length > 0) {
      list = list.filter((c) =>
        filters.ratings.some(
          (r) =>
            (r === '5' && c.rating === 5) ||
            (r === '4+' && c.rating >= 4),
        ),
      );
    }

    switch (filters.sortBy) {
      case 'popular':
        list.sort((a, b) => b.students - a.students);
        break;
      case 'price-low':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
      default:
        list.sort((a, b) => b.id - a.id);
        break;
    }

    return list;
  }, [uiCourses, filters]);

  const activeChips = useMemo(() => {
    const chips: { key: string; value: string; label: string }[] = [];
    filters.categories.forEach((v) =>
      chips.push({ key: 'category', value: v, label: getFilterLabel('category', v) }),
    );
    filters.levels.forEach((v) =>
      chips.push({ key: 'level', value: v, label: getFilterLabel('level', v) }),
    );
    filters.ratings.forEach((v) =>
      chips.push({ key: 'rating', value: v, label: getFilterLabel('rating', v) }),
    );
    return chips;
  }, [filters.categories, filters.levels, filters.ratings]);

  const handlePageChange = (page: number) => {
    dispatch(setPage(page));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const removeChip = (key: string, value: string) => {
    if (key === 'category') dispatch(toggleCategory(value as CourseCategory));
    if (key === 'level') dispatch(toggleLevel(value as CourseLevel));
    if (key === 'rating') dispatch(toggleRating(value as CourseRating));
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <FilterSync />

      {/* Breadcrumb */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="text-sm">
            <Link
              to="/"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Trang chủ
            </Link>
            <span className="mx-2 text-gray-400 dark:text-gray-500">/</span>
            <span className="text-gray-700 dark:text-gray-300">
              Chương trình học
            </span>
          </nav>
        </div>
      </div>

      {/* Nội dung chính */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-1/4 lg:flex-shrink-0">
            <CourseFilters />
          </aside>

          <main className="w-full lg:w-3/4">
            {/* Toolbar */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 sm:p-6 mb-6">
              <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                <div className="w-full md:w-1/2 lg:w-2/5">
                  <div className="relative">
                    <input
                      type="search"
                      placeholder="Tìm kiếm khóa học..."
                      value={localSearch || ''}
                      onChange={(e) => setLocalSearch(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-700 border-0 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-gray-900 text-sm"
                    />
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>

                <div className="w-full md:w-auto">
                  <select
                    value={filters.sortBy}
                    onChange={(e) =>
                      dispatch(setSortBy(e.target.value as CourseSort))
                    }
                    className="px-4 py-2.5 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                  >
                    {sortOptions.map((opt) => (
                      <option key={opt.id} value={opt.id}>
                        {opt.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {activeChips.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <div className="flex flex-wrap gap-2 items-center">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">
                      Đang lọc:
                    </span>
                    {activeChips.map((chip) => (
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

            {/* Kết quả */}
            {loading ? (
              <div className="flex justify-center py-20">
                <Spinner />
              </div>
            ) : (
              <>
                <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                  Hiển thị <strong>{filteredCourses.length}</strong> khóa học
                  (trang {filters.page}/{totalPages})
                </div>

                {filteredCourses.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                    {filteredCourses.map((course) => (
                      <CourseCard key={course.id} course={course} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                    Không tìm thấy khóa học nào.
                  </div>
                )}

                <Pagination
                  currentPage={filters.page}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
