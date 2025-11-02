// src/data/mockCourses.ts
import type { Course, CourseCategory, CourseLevel } from '../types/course';
import type { CoursePrice, CourseRating, CourseSort } from '../types/course';
// Helper tạo data nhanh
const createCourse = (id: number, partial: Partial<Course>): Course => ({
  id,
  title: `Khóa học mẫu ${id}`,
  instructor: 'Giảng viên EduSmart',
  image: `https://picsum.photos/seed/${id}/400/300`, // Ảnh mẫu
  category: 'math',
  level: 'university',
  price: Math.random() > 0.7 ? 0 : Math.floor(Math.random() * 500000) + 100000,
  rating: Math.random() * 1.5 + 3.5, // 3.5 -> 5.0
  students: Math.floor(Math.random() * 2000) + 100,
  description: 'Đây là mô tả mẫu cho khóa học.',
  ...partial,
});

// Tạo 50 khoá học mẫu
export const allCourses: Course[] = Array.from({ length: 50 }, (_, i) => {
  const id = i + 1;
  return createCourse(id, {
    title: `Khóa học ${['Toán', 'Lý', 'Hóa', 'Anh', 'IELTS'][i % 5]} - Mã ${100 + id}`,
    category: ['math', 'physics', 'chemistry', 'english', 'ielts'][i % 5] as CourseCategory,
    level: ['grade10', 'grade11', 'grade12', 'university', 'basic'][i % 5] as CourseLevel,
  });
});

// Dùng cho UI (component lọc)
export const categoryFilters: { id: CourseCategory; name: string }[] = [
  { id: 'math', name: 'Toán học' },
  { id: 'english', name: 'Tiếng Anh' },
  { id: 'physics', name: 'Vật lý' },
  { id: 'chemistry', name: 'Hóa học' },
  { id: 'ielts', name: 'IELTS' },
  { id: 'toeic', name: 'TOEIC' },
];

export const levelFilters: { id: CourseLevel; name: string }[] = [
  { id: 'grade10', name: 'Lớp 10' },
  { id: 'grade11', name: 'Lớp 11' },
  { id: 'grade12', name: 'Lớp 12' },
  { id: 'university', name: 'Luyện thi ĐH' },
  { id: 'basic', name: 'Cơ bản' },
  { id: 'advanced', name: 'Nâng cao' },
];

export const priceFilters: { id: CoursePrice; name: string }[] = [
  { id: 'all', name: 'Tất cả' },
  { id: 'free', name: 'Miễn phí' },
  { id: 'paid', name: 'Có phí' },
];

export const ratingFilters: { id: CourseRating; name: string }[] = [
  { id: '5', name: '5 sao' },
  { id: '4+', name: 'Từ 4 sao' },
];

export const sortOptions: { id: CourseSort; name: string }[] = [
  { id: 'newest', name: 'Mới nhất' },
  { id: 'popular', name: 'Phổ biến nhất' },
  { id: 'price-low', name: 'Giá thấp đến cao' },
  { id: 'price-high', name: 'Giá cao đến thấp' },
];

