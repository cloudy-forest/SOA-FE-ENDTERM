// src/types/course.ts

export type CourseCategory = 'math' | 'english' | 'physics' | 'chemistry' | 'ielts' | 'toeic';
export type CourseLevel = 'grade10' | 'grade11' | 'grade12' | 'university' | 'basic' | 'advanced';
export type CoursePrice = 'all' | 'free' | 'paid';
export type CourseRating = '4+' | '5';
export type CourseSort = 'newest' | 'popular' | 'price-low' | 'price-high';

// Dữ liệu của một khoá học
export interface Course {
  id: number;
  title: string;
  instructor: string;
  image: string;
  category: CourseCategory;
  level: CourseLevel;
  price: number; // 0 = free
  rating: number; // 1 -> 5
  students: number;
  description: string;
}

// Trạng thái (state) của bộ lọc khoá học
export interface CourseFilterState {
  searchTerm: string;
  categories: CourseCategory[]; // Mảng các category đang chọn
  levels: CourseLevel[]; // Mảng các level đang chọn
  price: CoursePrice;
  ratings: CourseRating[]; // Mảng các rating đang chọn
  sortBy: CourseSort;
  page: number;
}