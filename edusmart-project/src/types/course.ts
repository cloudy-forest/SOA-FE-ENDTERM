
// // src/types/course.ts

// // 1. Cấu trúc dữ liệu khi NHẬN VỀ (GET)
// // Khớp với: product-service/.../responses/courses/CourseResponse.java
// export interface Course {
//   id: number;
  
//   // @JsonProperty("course_name")
//   course_name: string; 
  
//   // @JsonProperty("course_desc")
//   course_desc: string; 
  
//   // @JsonProperty("initial_price")
//   initial_price: number; 
  
//   // @JsonProperty("final_price")
//   final_price: number; 
  
//   // @JsonProperty("thumbnail")
//   thumbnail: string; 
  
//   // @JsonProperty("teacher_desc")
//   teacher_desc: string; 
  
//   // @JsonProperty("introduction_video")
//   introduction_video: string; 
  
//   assignment: number; 
  
//   // @JsonProperty("registered_student")
//   registered_student: number; 
  
//   // @JsonProperty("expire_time")
//   expire_time: string; // Backend trả về String (ví dụ: "6 month" hoặc date string)
  
//   // @JsonProperty("study_time")
//   study_time: number; 
  
//   // @JsonProperty("subject_name")
//   subject_name: string; 
// }

// // 2. Cấu trúc dữ liệu khi GỬI LÊN (POST/PUT)
// // Khớp với: product-service/.../dtos/request/course/CourseDTO.java
// export interface CourseInput {
//   id?: number; // Có thể null nếu là tạo mới
  
//   // Lưu ý: DTO Java không có @JsonProperty("course_name") nên key là "name"
//   name: string; 
  
//   // DTO Java không có @JsonProperty nên key là "description"
//   description: string; 
  
//   initial_price: number;
//   final_price: number;
//   thumbnail: string;
//   teacher_desc: string;
//   introduction_video: string;
//   assignment: number;
//   registered_student: number;
//   expire_time: string;
  
//   // DTO yêu cầu subject_id (Long), không phải name
//   subject_id: number; 
  
//   study_time: number;
// }

// // 3. Cấu trúc Bài học (Lesson)
// // Khớp với: product-service/.../responses/lessons/LessonResponse.java
// export interface Lesson {
//   id: number;
//   title: string;
//   description: string;
// }

// // Response trả về danh sách (Pagination)
// export interface CourseListResponse {
//   content: Course[]; // Backend thường trả về list trong field 'content' hoặc root data
//   totalPages?: number;
//   totalElements?: number;
// }

// // Interface cho Phân trang (Spring Boot Page)
// export interface PageResponse<T> {
//   content: T[];          // Dữ liệu chính nằm trong mảng này
//   totalPages: number;    // Tổng số trang
//   totalElements: number; // Tổng số bản ghi
//   size: number;          // Kích thước trang
//   number: number;        // Trang hiện tại (index từ 0)
//   last: boolean;
//   first: boolean;
//   empty: boolean;
// }

// // --- 2. FRONTEND UI TYPES (THÊM MỚI ĐỂ CHẠY FILTER) ---

// export type CourseCategory = string;
// export type CourseLevel = string;
// export type CoursePrice = 'all' | 'free' | 'paid';
// export type CourseRating = '4+' | '5';
// export type CourseSort = 'newest' | 'popular' | 'price-low' | 'price-high';

// export interface CourseFilterState {
//   searchTerm?: string;
//   categories: CourseCategory[];
//   levels: CourseLevel[];
//   price?: CoursePrice;
//   ratings: CourseRating[];
//   sortBy?: CourseSort;
//   page: number;
// }

// src/types/course.ts

// ==========================
// 1. TYPES CHO API BACKEND
// ==========================
//
// Mapping trực tiếp với:
// - CourseResponse.java
// - CourseDTO.java
// - CourseDetailResponse.java
// - CourseListResponse.java
// - ListLessonResponse.java
// - SubjectResponse.java
// =====================================

// 1.1. Course (RESPONSE từ backend)
// CourseResponse.java
export interface Course {
  id: number;

  // @JsonProperty("course_name")
  course_name: string;

  // @JsonProperty("course_desc")
  course_desc: string;

  // @JsonProperty("initial_price")
  initial_price: number;

  // @JsonProperty("final_price")
  final_price: number;

  // @JsonProperty("thumbnail")
  thumbnail: string;

  // @JsonProperty("teacher_desc")
  teacher_desc: string;

  // @JsonProperty("introduction_video")
  introduction_video: string;

  assignment: number;

  // @JsonProperty("registered_student")
  registered_student: number;

  // @JsonProperty("expire_time")
  expire_time: string; // ví dụ: "6 month"

  // @JsonProperty("study_time")
  study_time: number;

  // @JsonProperty("subject_name")
  subject_name: string;
}

// 1.2. CourseInput (REQUEST lên backend)
// Mapping với CourseDTO.java
export interface CourseInput {
  id?: number;

  // name, description: không có @JsonProperty ở DTO, gửi đúng key camelCase
  name: string;
  description: string;

  initial_price: number;
  final_price: number;
  thumbnail: string;
  teacher_desc: string;
  introduction_video: string;
  assignment: number;
  registered_student: number;
  expire_time: string;

  // @JsonProperty("subject_id")
  subject_id: number;

  study_time: number;
}

// 1.3. Lesson (tối thiểu theo LessonResponse)
export interface Lesson {
  id: number;
  title: string;
  description: string;
}

// ListLessonResponse.java (giả định field "lessons")
export interface ListLessonResponse {
  lessons: Lesson[];
}

// 1.4. SubjectResponse (tối thiểu, dùng cho CourseDetailResponse)
export interface SubjectResponse {
  id: number;
  name: string;
  description?: string;

  // Cho phép backend trả thêm field khác mà FE chưa biết hết
  [key: string]: unknown;
}

// 1.5. CourseDetailResponse.java
export interface CourseDetailResponse {
  course: Course;
  subject: SubjectResponse;
  lessons: ListLessonResponse;
}

// 1.6. CourseListResponse.java
export interface CourseListResponse {
  totalPages: number;
  currentPage: number;
  pageSize: number;
  courses: Course[];
}

// 1.7. PageResponse GENERIC (nếu cần dùng cho endpoint khác kiểu Spring Page)
export interface PageResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  last: boolean;
  first: boolean;
  empty: boolean;
}

// (Tuỳ bạn: nếu muốn có ApiResponse chung giống backend/gateway)
// export interface ApiResponse<T> {
//   code: number;
//   success: boolean;
//   message: string;
//   data: T;
// }

// ==========================
// 2. TYPES CHO UI / FRONTEND
// ==========================
//
// Các type này chỉ dùng nội bộ FE để render UI,
// không liên quan trực tiếp đến schema backend.
// =====================================

// 2.1. Filter-related types (mapping với mock filters)
export type CourseCategory =
  | 'math'
  | 'english'
  | 'physics'
  | 'chemistry'
  | 'ielts'
  | 'toeic'
  | string; // cho phép backend trả thêm category khác

export type CourseLevel =
  | 'grade10'
  | 'grade11'
  | 'grade12'
  | 'university'
  | 'basic'
  | 'advanced'
  | string;

export type CoursePrice = 'all' | 'free' | 'paid';

export type CourseRating = '5' | '4+';

export type CourseSort = 'newest' | 'popular' | 'price-low' | 'price-high';

// 2.2. State bộ lọc trong Redux
export interface CourseFilterState {
  searchTerm: string;
  categories: CourseCategory[];
  levels: CourseLevel[];
  price: CoursePrice;
  ratings: CourseRating[];
  sortBy: CourseSort;
  page: number;
}

// 2.3. Outcomes (mục tiêu khóa học)
export interface Outcome {
  id: number;
  text: string;
}

// 2.4. Curriculum (chương trình học)
export interface CurriculumLesson {
  id: number;
  title: string;
  durationMinutes: number;
  isFreePreview?: boolean;
}

export interface CurriculumSection {
  id: number;
  title: string;
  lessons: CurriculumLesson[];
}

// 2.5. Reviews / Feedback
export interface CourseReview {
  id: number;
  user: string;
  avatarInitials: string;
  rating: number; // 1–5
  comment: string;
  timestamp: string;
}

export interface Testimonial {
  id: number;
  user: string;
  title: string; // Ví dụ: "Học viên 7.5 IELTS"
  quote: string;
}

export interface FeedbackImage {
  id: number;
  url: string;
  alt: string;
}

// 2.6. UI Course cho LIST (dùng cho CourseCard, CourseProgramPage)
export interface UICourseListItem {
  id: number;
  title: string;
  description: string;

  price: number;
  originalPrice: number;
  thumbnail: string;

  rating: number;
  students: number;

  author: string;
  level: string;
  category: CourseCategory;
}

// 2.7. UI Course cho DETAIL (dùng cho CourseHero, Sidebar, DetailPage)
export interface UICourseDetail extends UICourseListItem {
  outcomes: Outcome[];
  curriculum: CurriculumSection[];
  reviews: CourseReview[];
  testimonials: Testimonial[];
  feedbackImages: FeedbackImage[];

  totalLessons?: number;
  totalPractice?: number;
  validityText?: string; // ví dụ: "6 tháng", "Trọn đời"
}
