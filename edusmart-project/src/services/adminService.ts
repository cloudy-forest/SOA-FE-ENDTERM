// src/services/adminService.ts
import { mockUsers } from '../data/mockAdminData';
import type { AdminUser, Subject, AdminTransaction, DashboardStats, AdminExam } from '../types/admin';
// import type { TransactionStatus } from '../types/admin';
import type { Exam } from '../types/exam';
import { allExams as mockExamData } from '../data/mockExams';
import { allCourses } from '../data/mockCourses';
import type { Course } from '../types/course';  

const FAKE_DELAY = 500; // Giả lập 0.5s chờ mạng

// Cơ sở dữ liệu "ảo" trong bộ nhớ
const usersDB: AdminUser[] = [...mockUsers];

// Tạo database ảo cho khóa học
let coursesDB: Course[] = [...allCourses];

// TẠO DATABASE "ẢO" CHO CHỦ ĐỀ 
let subjectsDB: Subject[] = [
  { id: 'math', name: 'Toán' },
  { id: 'physics', name: 'Vật lý' },
  { id: 'chemistry', name: 'Hóa' },
  { id: 'english', name: 'Tiếng Anh' },
  { id: 'ielts', name: 'IELTS' },
  { id: 'toeic', name: 'TOEIC' },
];

// TẠO DATABASE "ẢO" CHO GIAO DỊCH 
const transactionsDB: AdminTransaction[] = [
  { id: '#TXN-8472', userName: 'Nguyễn Văn A', courseName: 'TOEIC Listening & Reading', amount: 1299000, status: 'success', createdAt: new Date(Date.now() - 5 * 60000).toISOString() },
  { id: '#TXN-8471', userName: 'Trần Thị B', courseName: 'IELTS Speaking & Writing', amount: 899000, status: 'success', createdAt: new Date(Date.now() - 12 * 60000).toISOString() },
  { id: '#TXN-8470', userName: 'Lê Văn C', courseName: 'Tiếng Anh Giao Tiếp', amount: 699000, status: 'pending', createdAt: new Date(Date.now() - 28 * 60000).toISOString() },
  { id: '#TXN-8469', userName: 'Phạm Thị D', courseName: 'Business English', amount: 1499000, status: 'success', createdAt: new Date(Date.now() - 60 * 60000).toISOString() },
  { id: '#TXN-8468', userName: 'Hoàng Văn E', courseName: 'Grammar Foundation', amount: 599000, status: 'failed', createdAt: new Date(Date.now() - 120 * 60000).toISOString() },
  { id: '#TXN-8467', userName: 'Vũ Thị F', courseName: 'TOEIC Listening & Reading', amount: 1299000, status: 'success', createdAt: new Date(Date.now() - 180 * 60000).toISOString() },
];

// ▼▼▼ TẠO DATABASE "ẢO" CHO ĐỀ THI ▼▼▼
// Dùng data gốc từ mockExams
let examsDB: Exam[] = [...mockExamData];

/**
 * Giả lập API: GET /api/admin/users
 * (Lấy tất cả user)
 */
export const fetchAllUsers = (): Promise<AdminUser[]> => {
  console.log("(Giả lập API) Đang tải danh sách user...");
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...usersDB]); // Trả về một bản sao
    }, FAKE_DELAY);
  });
};

/**
 * Giả lập API: POST /api/admin/users/:userId/disable
 * (Vô hiệu hóa user)
 */
export const disableUser = (userId: string): Promise<{ success: true; user: AdminUser }> => {
  console.log(`(Giả lập API) Đang vô hiệu hóa user ID: ${userId}`);
  
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const userIndex = usersDB.findIndex(u => u.id === userId);
      if (userIndex === -1) {
        return reject(new Error('Không tìm thấy user.'));
      }
      
      const user = usersDB[userIndex];
      // Admin không thể tự khóa mình
      if (user.role === 'admin') {
        return reject(new Error('Không thể vô hiệu hóa tài khoản Admin.'));
      }
      
      // Cập nhật "database" ảo
      user.status = 'disabled';
      usersDB[userIndex] = user;
      
      console.log("(Giả lập API) Đã vô hiệu hóa:", user);
      resolve({ success: true, user: { ...user } }); // Trả về bản sao

    }, FAKE_DELAY);
  });
};

/**
 * Giả lập API: POST /api/admin/users/:userId/enable
 * (Kích hoạt lại user)
 */
export const enableUser = (userId: string): Promise<{ success: true; user: AdminUser }> => {
    console.log(`(Giả lập API) Đang kích hoạt user ID: ${userId}`);
    
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const userIndex = usersDB.findIndex(u => u.id === userId);
        if (userIndex === -1) {
          return reject(new Error('Không tìm thấy user.'));
        }
        
        const user = usersDB[userIndex];
        user.status = 'active';
        usersDB[userIndex] = user;
        
        console.log("(Giả lập API) Đã kích hoạt:", user);
        resolve({ success: true, user: { ...user } });
  
      }, FAKE_DELAY);
    });
};

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

// --- BẮT ĐẦU CÁC HÀM API MỚI CHO CHỦ ĐỀ ---
/**
 * Giả lập API: GET /api/admin/subjects
*/
export const fetchAllSubjects = (): Promise<Subject[]> => {
  console.log("(Giả lập API) Đang tải danh sách chủ đề...");
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...subjectsDB]);
    }, FAKE_DELAY);
  });
};

/**
 * Giả lập API: DELETE /api/admin/subjects/:subjectId
 */
export const deleteSubject = (subjectId: string): Promise<{ success: true }> => {
  console.log(`(Giả lập API) Đang xóa chủ đề ID: ${subjectId}`);
  return new Promise((resolve) => {
    setTimeout(() => {
      subjectsDB = subjectsDB.filter(s => s.id !== subjectId);
      resolve({ success: true });
    }, FAKE_DELAY);
  });
};

/**
 * Giả lập API: POST /api/admin/subjects
 * (Tạo chủ đề mới)
 */
export const createSubject = (data: Omit<Subject, 'id'>): Promise<Subject> => {
  console.log("(Giả lập API) Đang tạo chủ đề mới:", data.name);
  return new Promise((resolve) => {
    setTimeout(() => {
      const newSubject: Subject = {
        id: data.name.toLowerCase().replace(/\s+/g, '-'), // Tự tạo ID từ tên
        name: data.name,
      };
      subjectsDB.push(newSubject);
      resolve({ ...newSubject });
    }, FAKE_DELAY);
  });
};

/**
 * Giả lập API: PUT /api/admin/subjects/:subjectId
 * (Cập nhật chủ đề)
 */
export const updateSubject = (subjectId: string, data: Partial<Subject>): Promise<Subject> => {
  console.log(`(Giả lập API) Đang cập nhật chủ đề ID: ${subjectId}`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = subjectsDB.findIndex(s => s.id === subjectId);
      if (index === -1) {
        return reject(new Error('Không tìm thấy chủ đề.'));
      }
      
      const updatedSubject = { ...subjectsDB[index], ...data };
      subjectsDB[index] = updatedSubject;
      
      resolve({ ...updatedSubject });
    }, FAKE_DELAY);
  });
};

// --- ▼▼▼ BẮT ĐẦU CÁC HÀM API MỚI CHO DASHBOARD ▼▼▼ ---
//

/**
 * Giả lập API: GET /api/admin/dashboard/stats
 */
export const getDashboardStats = (): Promise<DashboardStats> => {
  console.log("(Giả lập API) Đang tải thống kê dashboard...");
  return new Promise((resolve) => {
    setTimeout(() => {
      const stats: DashboardStats = {
        totalUsers: { value: usersDB.length, percentageChange: 12 },
        totalCourses: { value: coursesDB.length, percentageChange: 8 },
        monthlyRevenue: { value: 89500000, percentageChange: 24 },
        totalExams: { value: 342, percentageChange: 5 }, // (Mock data)
      };
      resolve(stats);
    }, FAKE_DELAY);
  });
};

/**
 * Giả lập API: GET /api/admin/dashboard/transactions?limit=5
 */
export const getRecentTransactions = (): Promise<AdminTransaction[]> => {
  console.log("(Giả lập API) Đang tải giao dịch gần đây...");
  return new Promise((resolve) => {
    setTimeout(() => {
      // Sắp xếp để lấy giao dịch mới nhất
      const recent = transactionsDB.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      resolve(recent.slice(0, 5)); // Lấy 5 cái
    }, FAKE_DELAY);
  });
};

// --- ▼▼▼ BẮT ĐẦU CÁC HÀM API MỚI CHO ĐỀ THI ▼▼▼ ---

/**
 * Giả lập API: GET /api/admin/exams
 * (Lấy danh sách rút gọn)
 */
export const fetchAllAdminExams = (): Promise<AdminExam[]> => {
  console.log("(Giả lập API) Đang tải danh sách đề thi (admin)...");
  return new Promise((resolve) => {
    setTimeout(() => {
      // Chuyển đổi từ data "Exam" đầy đủ sang "AdminExam" rút gọn
      const adminExams: AdminExam[] = examsDB.map(exam => ({
        id: exam.id,
        title: exam.title,
        subject: exam.subject, // Giả sử Exam type đã có subject
        questionCount: exam.questions,
        duration: exam.duration,
      }));
      resolve(adminExams);
    }, FAKE_DELAY);
  });
};

/**
 * Giả lập API: DELETE /api/admin/exams/:examId
 */
export const deleteExam = (examId: number): Promise<{ success: true }> => {
  console.log(`(Giả lập API) Đang xóa đề thi ID: ${examId}`);
  return new Promise((resolve) => {
    setTimeout(() => {
      // Xóa trong database "ảo"
      examsDB = examsDB.filter(exam => exam.id !== examId);
      resolve({ success: true });
    }, FAKE_DELAY);
  });
};