import type { ExamQuestion } from "./exam";

// src/types/admin.ts
export type UserRole = 'admin' | 'user';
export type UserStatus = 'active' | 'disabled';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string; // ISO string (ngày tạo tài khoản)
}

export interface Subject {
  id: string;
  name: string;
  // (Chúng ta có thể thêm các trường khác như 'icon', 'color' sau)
}

// Kiểu dữ liệu cho trạng thái Giao dịch
export type TransactionStatus = 'success' | 'pending' | 'failed';

// Kiểu dữ liệu cho Giao dịch (trong bảng)
export interface AdminTransaction {
  id: string; // Ví dụ: #TXN-8472
  userName: string;
  courseName: string;
  amount: number;
  status: TransactionStatus;
  createdAt: string; // ISO string
}

// Kiểu dữ liệu cho các Thẻ Thống kê (Stat Cards)
export interface DashboardStats {
  totalUsers: {
    value: number;
    percentageChange: number; // Ví dụ: 12
  };
  totalCourses: {
    value: number;
    percentageChange: number; // Ví dụ: 8
  };
  monthlyRevenue: {
    value: number;
    percentageChange: number; // Ví dụ: 24
  };
  totalExams: {
    value: number;
    percentageChange: number; // Ví dụ: 5
  };
}

// Kiểu dữ liệu rút gọn cho đề thi (dùng trong trang danh sách)
export interface AdminExam {
  id: number; // ID này là số (number)
  title: string;
  subject: string;
  questionCount: number;
  duration: number; // (số phút)
}

export interface AdminExamDetails {
  id: number;
  title: string;
  subject: string;
  duration: number;
  questions: ExamQuestion[]; // <<< Danh sách các câu hỏi
}

export type ExamType = 'LISTENING' | 'READING' | 'WRITING' | 'SPEAKING';
// Input khớp với API POST /products/exams
export interface CreateExamInput {
  title: string;
  exam_type: ExamType;
  info: string;
  time: number;
  part: number;
  total_score: number;
  completed: boolean; // Thường mặc định là false khi tạo mới
  number_of_completion: number; // Thường mặc định là 0
  number_of_question: number;
  term: string;
  thumbnail: File | null; // API yêu cầu MultipartFile
  category_id: number; // ID của Subject
}

// Khớp với object trong mảng "blogs" của API
export interface AdminBlog {
  id: number;
  title: string;
  subtitle: string;
  content: string;
  writer: string;
  keywords: string;
  views: number;
}

// Khớp với response của GET /products/blogs
export interface BlogListResponse {
  total_pages: number;
  current_page: number;
  blogs: AdminBlog[];
}