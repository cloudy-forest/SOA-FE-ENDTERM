// src/data/mockCourses.ts
import type { CoursePrice, CourseRating, CourseSort } from '../types/course';
import type { 
  Course, CourseCategory, CourseLevel, CurriculumSection, 
  Outcome, CourseReview, Testimonial, FeedbackImage 
} from '../types/course';
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

const mockOutcomes: Outcome[] = [
  { id: 1, text: 'Nắm vững toàn bộ từ vựng và ngữ pháp cho band 6.5+ IELTS.' },
  { id: 2, text: 'Chiến thuật làm bài Reading và Listening tối ưu hóa điểm số.' },
  { id: 3, text: 'Kỹ năng Paraphrasing và phát triển ý tưởng cho Speaking Task 2.' },
  { id: 4, text: 'Viết thành thạo 7 dạng bài trong Writing Task 1.' },
  { id: 5, text: 'Cấu trúc bài luận Writing Task 2 đạt điểm cao.' },
];

const mockCurriculum: CurriculumSection[] = [
  { id: 1, title: 'Phần 1: Nền tảng Từ vựng (Vocabulary)', lessons: [
    { id: 101, title: 'Bài 1: Chủ đề Education & Work', durationMinutes: 25, isFreePreview: true },
    { id: 102, title: 'Bài 2: Chủ đề Environment & Energy', durationMinutes: 30, isFreePreview: false },
    { id: 103, title: 'Bài 3: Chủ đề Health & Lifestyle', durationMinutes: 28, isFreePreview: false },
  ]},
  { id: 2, title: 'Phần 2: Kỹ năng Nghe (Listening)', lessons: [
    { id: 201, title: 'Bài 1: Dạng bài Multiple Choice', durationMinutes: 40, isFreePreview: true },
    { id: 202, title: 'Bài 2: Dạng bài Map/Diagram Labeling', durationMinutes: 35, isFreePreview: false },
  ]},
  { id: 3, title: 'Phần 3: Kỹ năng Đọc (Reading)', lessons: [
    { id: 301, title: 'Bài 1: Skimming và Scanning', durationMinutes: 20, isFreePreview: false },
    { id: 302, title: 'Bài 2: Dạng bài T/F/NG', durationMinutes: 45, isFreePreview: false },
  ]},
];

const mockReviews: CourseReview[] = [
  { id: 1, user: 'Minh Anh', avatarInitials: 'MA', rating: 5, comment: 'Khóa học rất chi tiết, giáo viên dạy dễ hiểu. Mình đã tăng 1.0 band sau 3 tháng!', timestamp: '2 ngày trước' },
  { id: 2, user: 'Trần Hùng', avatarInitials: 'TH', rating: 4, comment: 'Nội dung tốt, bài tập nhiều. Tuy nhiên phần Speaking nên có thêm bài luyện tập 1-1.', timestamp: '1 tuần trước' },
];

const mockTestimonials: Testimonial[] = [
  { id: 1, quote: 'Đây là khóa học IELTS tốt nhất mình từng tham gia. Lộ trình rõ ràng, giáo viên tận tâm.', user: 'Nguyễn An', title: 'Học viên 7.5 IELTS' },
  { id: 2, quote: 'Kỹ năng Writing của mình đã cải thiện rõ rệt chỉ sau 1 tháng. Cảm ơn EduSmart!', user: 'Lê Bảo', title: 'Học viên 7.0 IELTS' },
  { id: 3, quote: 'Phần từ vựng và bài tập thực hành rất đa dạng, không bị nhàm chán.', user: 'Phạm Chi', title: 'Học viên 6.5 IELTS' },
];

const mockFeedbackImages: FeedbackImage[] = [
  { id: 1, url: 'https://via.placeholder.com/300x400.png?text=Feedback+1', alt: 'Feedback 1' },
  { id: 2, url: 'https://via.placeholder.com/300x400.png?text=Feedback+2', alt: 'Feedback 2' },
  { id: 3, url: 'https://via.placeholder.com/300x400.png?text=Certificate+1', alt: 'Certificate 1' },
];

// Hàm fetch chi tiết
export const fetchMockCourseById = (courseId: string): Promise<Course> => {
  console.log(`(Mock API) Đang tải dữ liệu chi tiết cho khóa học ID: ${courseId}`);
  
  return new Promise((resolve) => { // thêm reject khi không còn luôn thành công khi mock dữ liệu
      setTimeout(() => {
          const baseCourse = allCourses.find(c => c.id.toString() === courseId) || allCourses[0];
          
          const detailedCourse: Course = {
            ...baseCourse,
            heroImage: `https://picsum.photos/seed/${baseCourse.id}/1400/500`,
            originalPrice: baseCourse.price * 1.5,
            promoText: 'Dành cho các bạn mất gốc, mục tiêu 5.0-6.5 IELTS. Tặng kèm bộ 50 đề thi thật!',
            outcomes: mockOutcomes,
            totalLessons: 242,
            totalPractice: 664,
            totalDurationHours: 48,
            validityMonths: 12,
            curriculum: mockCurriculum,
            reviews: mockReviews,
            testimonials: mockTestimonials,
            feedbackImages: mockFeedbackImages,
            relatedCourseIds: [2, 3, 4], // ID của các khóa học liên quan
          };
          resolve(detailedCourse);
      }, 500); // Giả lập 0.5 giây loading
  });
};
