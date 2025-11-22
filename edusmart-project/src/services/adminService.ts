// src/services/adminService.ts
import { mockUsers } from '../data/mockAdminData';
import type { AdminUser, Subject, AdminTransaction, DashboardStats, AdminExam, AdminExamDetails, CreateExamInput, AdminBlog, BlogListResponse } from '../types/admin';
// import type { TransactionStatus } from '../types/admin';
import type { Exam, ExamQuestion } from '../types/exam';
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

// ▼▼▼ TẠO DATABASE "ẢO" CHO CÂU HỎI ▼▼▼
// Giả lập rằng mỗi đề thi trong examsDB có một danh sách câu hỏi
// Chúng ta sẽ "bịa" ra data câu hỏi khi cần
const generateMockQuestions = (examId: number, count: number): ExamQuestion[] => {
  const questions: ExamQuestion[] = [];
  for (let i = 1; i <= count; i++) {
    questions.push({
      id: (examId * 100) + i, // ID câu hỏi duy nhất
      content: `Đây là nội dung câu hỏi ${i} của đề thi ${examId}?`,
      options: [
        `Lựa chọn A (Đúng)`,
        `Lựa chọn B`,
        `Lựa chọn C`,
        `Lựa chọn D`,
      ],
      correctAnswer: 0, // Đáp án A là đúng
      explanation: `Đây là giải thích chi tiết cho câu hỏi ${i}.`
    });
  }
  return questions;
};

// Mock Data cho Blog
const mockBlogs: AdminBlog[] = Array.from({ length: 25 }).map((_, index) => ({
  id: index + 1,
  title: `Bài viết mẫu số ${index + 1} về IELTS`,
  subtitle: `Tóm tắt nội dung quan trọng của bài viết ${index + 1}...`,
  content: '<p>Nội dung chi tiết...</p>',
  writer: index % 2 === 0 ? 'Admin EduSmart' : 'Teacher Lan',
  keywords: 'ielts, tips, vocabulary',
  views: Math.floor(Math.random() * 1000)
}));

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

// --- ▼▼▼ BẮT ĐẦU CÁC HÀM API MỚI CHO CÂU HỎI ▼▼▼ ---
//

/**
 * Giả lập API: GET /api/admin/exams/:examId/details
 * (Lấy chi tiết đề thi VÀ danh sách câu hỏi)
 */
export const getExamDetailsWithQuestions = (examId: number): Promise<AdminExamDetails> => {
  console.log(`(Giả lập API) Đang tải chi tiết và câu hỏi cho đề thi ID: ${examId}`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const exam = examsDB.find(e => e.id === examId);
      if (!exam) {
        return reject(new Error('Không tìm thấy đề thi.'));
      }
      
      const examDetails: AdminExamDetails = {
        id: exam.id,
        title: exam.title,
        subject: exam.subject,
        duration: exam.duration,
        questions: generateMockQuestions(exam.id, exam.questions), // Tạo câu hỏi "giả"
      };
      resolve(examDetails);
      
    }, FAKE_DELAY);
  });
};

/**
 * Giả lập API: DELETE /api/admin/questions/:questionId
 */
export const deleteQuestion = (questionId: number): Promise<{ success: true }> => {
  console.log(`(Giả lập API) Đang xóa câu hỏi ID: ${questionId}`);
  // (Trong app thật, chúng ta sẽ xóa khỏi DB. Ở đây, chúng ta chỉ giả vờ thành công)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, FAKE_DELAY);
  });
};

/**
 * Giả lập API: POST /api/admin/exams/:examId/questions
 * (Tạo câu hỏi mới)
 */
export const createQuestion = (examId: number, data: Omit<ExamQuestion, 'id'>): Promise<ExamQuestion> => {
  console.log(`(Giả lập API) Đang tạo câu hỏi mới cho đề thi ${examId}:`, data.content);
  return new Promise((resolve) => {
    setTimeout(() => {
      const newQuestion: ExamQuestion = {
        ...data,
        id: Math.floor(Math.random() * 10000) + 1000, // ID ngẫu nhiên
      };
      // (Trong app thật, chúng ta sẽ thêm vào DB)
      resolve(newQuestion);
    }, FAKE_DELAY);
  });
};

/**
 * Giả lập API: PUT /api/admin/questions/:questionId
 * (Cập nhật câu hỏi)
 */
export const updateQuestion = (questionId: number, data: Partial<ExamQuestion>): Promise<ExamQuestion> => {
  console.log(`(Giả lập API) Đang cập nhật câu hỏi ID ${questionId}:`, data.content);
  return new Promise((resolve) => {
    setTimeout(() => {
      const updatedQuestion: ExamQuestion = {
        id: questionId,
        content: data.content || "Nội dung câu hỏi bị thiếu",
        options: data.options || ['A', 'B', 'C', 'D'],
        correctAnswer: data.correctAnswer || 0,
        explanation: data.explanation || "",
      };
      resolve(updatedQuestion);
    }, FAKE_DELAY);
  });
};

/**
 * Giả lập API: POST /products/exams
 * (Sử dụng FormData để upload file)
 */
export const createExam = async (data: CreateExamInput): Promise<void> => {
  console.log("(Giả lập API) Đang tạo đề thi với FormData...");

  // 1. Chuyển đổi object sang FormData (Mô phỏng việc gửi lên server)
  const formData = new FormData();
  formData.append('title', data.title);
  formData.append('exam_type', data.exam_type);
  formData.append('info', data.info);
  formData.append('time', data.time.toString());
  formData.append('part', data.part.toString());
  formData.append('total_score', data.total_score.toString());
  formData.append('completed', data.completed.toString());
  formData.append('number_of_completion', data.number_of_completion.toString());
  formData.append('number_of_question', data.number_of_question.toString());
  formData.append('term', data.term);
  formData.append('category_id', data.category_id.toString());
  
  if (data.thumbnail) {
    formData.append('thumbnail', data.thumbnail);
    console.log("File ảnh:", data.thumbnail.name);
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("(Giả lập API) Đã tạo thành công!");
      // Ở đây bạn sẽ gọi fetch thật:
      // await fetch('/api/products/exams', { method: 'POST', body: formData });
      resolve();
    }, FAKE_DELAY);
  });
};

/**
 * Giả lập API: GET /products/blogs?keyword=&page=&limit
 */
export const fetchAdminBlogs = async (
  keyword: string = '', 
  page: number = 1, 
  limit: number = 10
): Promise<BlogListResponse> => {
  console.log(`Fetching blogs: keyword="${keyword}", page=${page}, limit=${limit}`);
  
  return new Promise((resolve) => {
    setTimeout(() => {
      // 1. Lọc theo keyword
      let filtered = mockBlogs;
      if (keyword) {
        const lowerTerm = keyword.toLowerCase();
        filtered = mockBlogs.filter(b => 
          b.title.toLowerCase().includes(lowerTerm) || 
          b.writer.toLowerCase().includes(lowerTerm)
        );
      }

      // 2. Tính toán phân trang
      const total_pages = Math.ceil(filtered.length / limit);
      const startIndex = (page - 1) * limit;
      const paginatedBlogs = filtered.slice(startIndex, startIndex + limit);

      // 3. Trả về đúng cấu trúc API
      resolve({
        total_pages,
        current_page: page,
        blogs: paginatedBlogs
      });
    }, FAKE_DELAY);
  });
};

/**
 * Giả lập API: DELETE /products/blogs/{id}
 */
export const deleteAdminBlog = async (id: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Đã xóa blog ID: ${id}`);
      // Trong thực tế, bạn sẽ xóa khỏi mảng mockBlogs
      // const index = mockBlogs.findIndex(b => b.id === id);
      // if (index !== -1) mockBlogs.splice(index, 1);
      resolve();
    }, FAKE_DELAY);
  });
};