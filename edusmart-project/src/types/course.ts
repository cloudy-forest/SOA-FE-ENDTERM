// src/types/course.ts

export type CourseCategory = 'math' | 'english' | 'physics' | 'chemistry' | 'ielts' | 'toeic';
export type CourseLevel = 'grade10' | 'grade11' | 'grade12' | 'university' | 'basic' | 'advanced';
export type CoursePrice = 'all' | 'free' | 'paid';
export type CourseRating = '4+' | '5';
export type CourseSort = 'newest' | 'popular' | 'price-low' | 'price-high';

// Một bài học con
export interface Lesson {
  id: number;
  title: string;
  durationMinutes: number;
  isFreePreview: boolean; // Có cho xem thử không?
}

// Một chương (section) trong chương trình học
export interface CurriculumSection {
  id: number;
  title: string; // Ví dụ: "Chương 1: Từ vựng IELTS band 5.0"
  lessons: Lesson[];
}

// Một mục tiêu ("Bạn sẽ học được gì")
export interface Outcome {
  id: number;
  text: string;
}

// Một đánh giá (review) của học viên
export interface CourseReview {
  id: number;
  user: string;
  avatarInitials: string;
  rating: number; // 1-5
  comment: string;
  timestamp: string;
}

// Một câu trích dẫn (testimonial)
export interface Testimonial {
  id: number;
  quote: string;
  user: string;
  title: string;
}

// Hình ảnh feedback
export interface FeedbackImage {
  id: number;
  url: string;
  alt: string;
}

// Dữ liệu của một khoá học
export interface Course {
  id: number;
  title: string;
  instructor: string;
  image: string;
  category: CourseCategory;
  level: CourseLevel;
  price: number; // 0 = free
  originalPrice?: number; // Giá gốc (nếu đang giảm giá)
  rating: number; // 1 -> 5
  students: number;
  description: string;
  heroImage?: string; // Ảnh nền to
  promoText?: string; // "Dành cho các bạn..."
  outcomes?: Outcome[]; // "Bạn sẽ đạt được gì"
  totalLessons?: number;
  totalPractice?: number;
  totalDurationHours?: number;
  validityMonths?: number; // "12 tháng"
  curriculum?: CurriculumSection[]; // Chương trình học
  reviews?: CourseReview[];
  testimonials?: Testimonial[];
  feedbackImages?: FeedbackImage[];
  relatedCourseIds?: number[]; // (Để lấy khóa học tương tự)
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