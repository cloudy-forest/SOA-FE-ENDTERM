import { allCourses } from '../../data/mockCourses';
import type { Course } from '../../types/course';
import { FAKE_DELAY } from './constants';

// Tạo database ảo cho khóa học
let coursesDB: Course[] = [...allCourses];

/**
 * Giả lập API: GET /api/admin/courses
 */
export const fetchAllCourses = (): Promise<Course[]> => {
  console.log("(Giả lập API) Đang tải danh sách khóa học...");
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...coursesDB]); // Trả về bản sao
    }, FAKE_DELAY);
  });
};

/**
 * Giả lập API: GET /api/admin/courses/:courseId
 */
export const fetchCourseById = (courseId: string): Promise<Course> => {
  console.log(`(Giả lập API) Đang tải chi tiết khóa học ID: ${courseId}`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const course = coursesDB.find(c => c.id === parseInt(courseId));
      if (course) {
        resolve({ ...course }); // Trả về bản sao
      } else {
        reject(new Error('Không tìm thấy khóa học.'));
      }
    }, FAKE_DELAY / 2); // Tải nhanh hơn
  });
};

/**
 * Giả lập API: DELETE /api/admin/courses/:courseId
 */
export const deleteCourse = (courseId: string): Promise<{ success: true }> => {
  console.log(`(Giả lập API) Đang xóa khóa học ID: ${courseId}`);
  return new Promise((resolve) => {
    setTimeout(() => {
      coursesDB = coursesDB.filter(c => c.id !== parseInt(courseId));
      resolve({ success: true });
    }, FAKE_DELAY);
  });
};

/**
 * Giả lập API: POST /api/admin/courses
 * (Tạo khóa học mới)
 */
export const createCourse = (data: Omit<Course, 'id'>): Promise<Course> => {
  console.log("(Giả lập API) Đang tạo khóa học mới:", data.title);
  return new Promise((resolve) => {
    setTimeout(() => {
      const newId = Math.max(...coursesDB.map(c => c.id)) + 1;
      const newCourse: Course = {
        ...data,
        id: newId,
        // (Thêm các giá trị mặc định nếu cần)
      };
      coursesDB.push(newCourse);
      resolve({ ...newCourse });
    }, FAKE_DELAY);
  });
};

/**
 * Giả lập API: PUT /api/admin/courses/:courseId
 * (Cập nhật khóa học)
 */
export const updateCourse = (courseId: string, data: Partial<Course>): Promise<Course> => {
  console.log(`(Giả lập API) Đang cập nhật khóa học ID: ${courseId}`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = coursesDB.findIndex(c => c.id === parseInt(courseId));
      if (index === -1) {
        return reject(new Error('Không tìm thấy khóa học để cập nhật.'));
      }
      
      const updatedCourse = { ...coursesDB[index], ...data };
      coursesDB[index] = updatedCourse;
      
      resolve({ ...updatedCourse });
    }, FAKE_DELAY);
  });
};