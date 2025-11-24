// import { allCourses } from '../../data/mockCourses';
// import type { Course } from '../../types/course';
// import { FAKE_DELAY } from './constants';

// // Tạo database ảo cho khóa học
// let coursesDB: Course[] = [...allCourses];

// /**
//  * Giả lập API: GET /api/admin/courses
//  */
// export const fetchAllCourses = (): Promise<Course[]> => {
//   console.log("(Giả lập API) Đang tải danh sách khóa học...");
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve([...coursesDB]); // Trả về bản sao
//     }, FAKE_DELAY);
//   });
// };

// /**
//  * Giả lập API: GET /api/admin/courses/:courseId
//  */
// export const fetchCourseById = (courseId: string): Promise<Course> => {
//   console.log(`(Giả lập API) Đang tải chi tiết khóa học ID: ${courseId}`);
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       const course = coursesDB.find(c => c.id === parseInt(courseId));
//       if (course) {
//         resolve({ ...course }); // Trả về bản sao
//       } else {
//         reject(new Error('Không tìm thấy khóa học.'));
//       }
//     }, FAKE_DELAY / 2); // Tải nhanh hơn
//   });
// };

// /**
//  * Giả lập API: DELETE /api/admin/courses/:courseId
//  */
// export const deleteCourse = (courseId: string): Promise<{ success: true }> => {
//   console.log(`(Giả lập API) Đang xóa khóa học ID: ${courseId}`);
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       coursesDB = coursesDB.filter(c => c.id !== parseInt(courseId));
//       resolve({ success: true });
//     }, FAKE_DELAY);
//   });
// };

// /**
//  * Giả lập API: POST /api/admin/courses
//  * (Tạo khóa học mới)
//  */
// export const createCourse = (data: Omit<Course, 'id'>): Promise<Course> => {
//   console.log("(Giả lập API) Đang tạo khóa học mới:", data.title);
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       const newId = Math.max(...coursesDB.map(c => c.id)) + 1;
//       const newCourse: Course = {
//         ...data,
//         id: newId,
//         // (Thêm các giá trị mặc định nếu cần)
//       };
//       coursesDB.push(newCourse);
//       resolve({ ...newCourse });
//     }, FAKE_DELAY);
//   });
// };

// /**
//  * Giả lập API: PUT /api/admin/courses/:courseId
//  * (Cập nhật khóa học)
//  */
// export const updateCourse = (courseId: string, data: Partial<Course>): Promise<Course> => {
//   console.log(`(Giả lập API) Đang cập nhật khóa học ID: ${courseId}`);
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       const index = coursesDB.findIndex(c => c.id === parseInt(courseId));
//       if (index === -1) {
//         return reject(new Error('Không tìm thấy khóa học để cập nhật.'));
//       }
      
//       const updatedCourse = { ...coursesDB[index], ...data };
//       coursesDB[index] = updatedCourse;
      
//       resolve({ ...updatedCourse });
//     }, FAKE_DELAY);
//   });
// };

// src/services/admin/courseService.ts
import type {
  Course,
  CourseInput,
  CourseListResponse,
  CourseDetailResponse,
} from '../../types/course';

import {
  getCourses as productGetCourses,
  getCourseById as productGetCourseById,
  createOrUpdateCourse as productCreateOrUpdateCourse,
  deleteCourse as productDeleteCourse,
} from '../product/courseService';

/**
 * ADMIN: Lấy tất cả khóa học
 * Tạm thời: lấy page=1, limit=1000, không keyword
 */
export const fetchAllCourses = async (): Promise<Course[]> => {
  const list: CourseListResponse = await productGetCourses(1, 1000, '');
  return list.courses ?? [];
};

/**
 * ADMIN: Lấy chi tiết khóa học
 * Trả về CourseDetailResponse (course + subject + lessons)
 */
export const fetchCourseById = async (
  courseId: string,
): Promise<CourseDetailResponse> => {
  return productGetCourseById(courseId);
};

/**
 * ADMIN: Xóa khóa học theo ID
 * Dùng lại deleteCourse thật
 */
export const deleteCourse = async (
  courseId: string,
): Promise<{ success: true }> => {
  await productDeleteCourse(Number(courseId));
  return { success: true };
};

/**
 * ADMIN: Tạo khóa học mới
 * Body: CourseInput (theo CourseDTO backend)
 */
export const createCourse = async (data: CourseInput): Promise<Course> => {
  const created = await productCreateOrUpdateCourse(data);
  return created;
};

/**
 * ADMIN: Cập nhật khóa học
 * Yêu cầu truyền đầy đủ CourseInput, id sẽ được set từ courseId
 */
export const updateCourse = async (
  courseId: string,
  data: CourseInput,
): Promise<Course> => {
  const body: CourseInput = {
    ...data,
    id: Number(courseId),
  };

  const updated = await productCreateOrUpdateCourse(body);
  return updated;
};
