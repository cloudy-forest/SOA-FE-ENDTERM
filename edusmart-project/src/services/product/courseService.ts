// // src/services/product/courseService.ts
// import axiosClient from '../api';
// import type { Course, CourseInput, Lesson, PageResponse } from '../../types/course';

// // --- COURSES ---

// /**
//  * Tìm kiếm khóa học
//  * GET /products/courses/search?page=1&limit=10&keyword=...
//  */
// export const getCourses = async (
//   page: number = 1, 
//   limit: number = 10, 
//   keyword: string = ''
// ): Promise<Course[]> => {
//   const res = await axiosClient.get<unknown>('/products/courses/search', {
//     params: { page, limit, keyword }
//   });

//   // 1. Kiểm tra nếu là Mảng -> Trả về luôn
//   if (Array.isArray(res)) {
//     return res as Course[];
//   }

//   // 2. Kiểm tra nếu là Page Object (có .content)
//   if (res && typeof res === 'object' && 'content' in res) {
//     // ▼▼▼ FIX LỖI: Dùng "as unknown as" để ép kiểu mạnh ▼▼▼
//     return (res as unknown as PageResponse<Course>).content;
//   }

//   return [];
// };

// /**
//  * Lấy chi tiết khóa học
//  * GET /products/courses/{id}
//  */
// export const getCourseById = async (id: number | string): Promise<Course> => {
//   // ▼▼▼ FIX LỖI: Ép kiểu 2 lần an toàn ▼▼▼
//   return axiosClient.get<unknown>(`/products/courses/${id}`) as unknown as Course;
// };

// /**
//  * Tạo hoặc Cập nhật khóa học
//  * POST /products/courses
//  */
// export const createOrUpdateCourse = async (data: CourseInput): Promise<Course> => {
//   // ▼▼▼ FIX LỖI: Ép kiểu 2 lần an toàn ▼▼▼
//   return axiosClient.post<unknown>('/products/courses', data) as unknown as Course;
// };

// /**
//  * Xóa khóa học
//  * DELETE /products/courses/{id}
//  */
// export const deleteCourse = async (id: number): Promise<void> => {
//   return axiosClient.delete(`/products/courses/${id}`);
// };

// /**
//  * Lấy khóa học đã mở khóa
//  * GET /products/courses/unlock
//  */
// export const getUnlockedCourses = async (): Promise<Course[]> => {
//   const res = await axiosClient.get<unknown>('/products/courses/unlock');
  
//   if (Array.isArray(res)) {
//     return res as Course[];
//   }
  
//   if (res && typeof res === 'object' && 'content' in res) {
//     // ▼▼▼ FIX LỖI: Dùng "as unknown as" để ép kiểu mạnh ▼▼▼
//     return (res as unknown as PageResponse<Course>).content;
//   }

//   return [];
// };

// // --- LESSONS ---

// /**
//  * Lấy danh sách bài học theo Course ID
//  * GET /products/lessons?courseId=...
//  */
// export const getLessonsByCourse = async (courseId: number): Promise<Lesson[]> => {
//   // ▼▼▼ FIX LỖI: Ép kiểu 2 lần an toàn ▼▼▼
//   return axiosClient.get<unknown>('/products/lessons', {
//     params: { courseId }
//   }) as unknown as Lesson[];
// };

// src/services/product/courseService.ts
import axiosClient from '../api';
import type { ApiResponse } from '../api';
import type {
  Course,
  CourseInput,
  Lesson,
  CourseListResponse,
  CourseDetailResponse,
  ListLessonResponse,
} from '../../types/course';

// ======================
// COURSES
// ======================

/**
 * Tìm kiếm khóa học
 * GET /products/courses/search?page=1&limit=10&keyword=...
 *
 * Backend trả:
 * ApiResponse<CourseListResponse>
 */
export const getCourses = async (
  page: number = 1,
  limit: number = 10,
  keyword: string = '',
): Promise<CourseListResponse> => {
  const res = await axiosClient.get<ApiResponse<CourseListResponse>>(
    '/products/courses/search',
    {
      params: { page, limit, keyword },
    },
  );

  // AxiosResponse<ApiResponse<CourseListResponse>> -> ApiResponse.data -> CourseListResponse
  return res.data.data;
};

/**
 * Lấy chi tiết khóa học
 * GET /products/courses/{id}
 *
 * Backend trả:
 * ApiResponse<CourseDetailResponse>
 */
export const getCourseById = async (
  id: number | string,
): Promise<CourseDetailResponse> => {
  const res = await axiosClient.get<ApiResponse<CourseDetailResponse>>(
    `/products/courses/${id}`,
  );

  return res.data.data;
};

/**
 * Tạo hoặc Cập nhật khóa học
 * POST /products/courses
 *
 * Body: CourseDTO (FE: CourseInput)
 * Backend trả:
 * ApiResponse<CourseResponse>  -> FE: Course
 */
export const createOrUpdateCourse = async (
  data: CourseInput,
): Promise<Course> => {
  const res = await axiosClient.post<ApiResponse<Course>>(
    '/products/courses',
    data,
  );

  return res.data.data;
};

/**
 * Xóa khóa học
 * DELETE /products/courses/{id}
 *
 * Backend trả:
 * ApiResponse<?>  nhưng FE chỉ cần biết là gọi thành công hay lỗi.
 */
export const deleteCourse = async (id: number): Promise<void> => {
  await axiosClient.delete<ApiResponse<unknown>>(`/products/courses/${id}`);
};

// ======================
// UNLOCKED COURSES
// ======================

/**
 * Lấy khóa học đã mở khóa cho user hiện tại
 * GET /products/courses/unlock
 *
 * Backend trả:
 * ApiResponse<List<CourseResponse>>  -> FE: Course[]
 */
export const getUnlockedCourses = async (): Promise<Course[]> => {
  const res = await axiosClient.get<ApiResponse<Course[]>>(
    '/products/courses/unlock',
  );

  return res.data.data ?? [];
};

// ======================
// LESSONS
// ======================

/**
 * Lấy danh sách bài học theo Course ID
 * GET /products/lessons?courseId=...
 *
 * Backend trả:
 * ApiResponse<ListLessonResponse>
 */
export const getLessonsByCourse = async (
  courseId: number,
): Promise<Lesson[]> => {
  const res = await axiosClient.get<ApiResponse<ListLessonResponse>>(
    '/products/lessons',
    {
      params: { courseId },
    },
  );

  return res.data.data.lessons;
};
