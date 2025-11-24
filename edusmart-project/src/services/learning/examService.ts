// src/services/learning/examService.ts
import axiosClient from '../api';
import type { Exam, ExamInput, Question, TakeExamInput, PageResponse, ExamCategory } from '../../types/learning';

// --- EXAM API ---

/**
 * Lấy danh sách danh mục đề thi (để hiển thị Dropdown)
 * GET /products/exam_category/search
 */
export const getExamCategories = async (): Promise<ExamCategory[]> => {
  // Lưu ý: Endpoint này có thể trả về List hoặc Page tùy backend
  const res = await axiosClient.get<unknown>('/products/exam_category/search');

  if (Array.isArray(res)) {
    return res as ExamCategory[];
  }

  // Nếu trả về Page
  if (res && typeof res === 'object' && 'content' in res) {
    return (res as unknown as PageResponse<ExamCategory>).content;
  }

  return [];
};

/**
 * Tìm kiếm đề thi (Phân trang)
 * GET /learning/exams/search?page=1&limit=10&keyword=...&category_id=...
 */
export const searchExams = async (
  page: number = 1,
  limit: number = 10,
  keyword: string = '',
  categoryId?: number
): Promise<Exam[]> => {
  // ▼▼▼ FIX LỖI: Thay 'any' bằng 'Record<string, string | number>' ▼▼▼
  const params: Record<string, string | number> = { page, limit, keyword };
  
  if (categoryId) {
    params.category_id = categoryId; // Backend yêu cầu snake_case
  }

  const res = await axiosClient.get<unknown>('/learning/exams/search', { params });

  // Xử lý dữ liệu trả về (Mảng hoặc Page)
  if (Array.isArray(res)) {
    return res as Exam[];
  }
  
  // Kiểm tra nếu là Page Object
  if (res && typeof res === 'object' && 'content' in res) {
    return (res as unknown as PageResponse<Exam>).content;
  }
  
  return [];
};


/**
 * Lấy chi tiết đề thi
 * GET /learning/exams/{id}
 */
export const getExamById = async (id: number): Promise<Exam> => {
  return axiosClient.get<unknown>(`/learning/exams/${id}`) as unknown as Exam;
};

/**
 * Tạo mới đề thi
 * POST /learning/exams
 */
export const createExam = async (data: ExamInput): Promise<Exam> => {
  return axiosClient.post<unknown>('/learning/exams', data) as unknown as Exam;
};

// --- QUESTION API ---

/**
 * Lấy danh sách câu hỏi để làm bài
 * GET /products/questions/take-exam?exam_id=...
 */
export const getQuestionsForExam = async (examId: number): Promise<Question[]> => {
  // Lưu ý: Endpoint có thể là /products/questions hoặc /learning/questions tùy cấu hình gateway
  const res = await axiosClient.get<unknown>('/products/questions/take-exam', {
    params: { exam_id: examId }
  });

  if (Array.isArray(res)) {
    return res as Question[];
  }
  return [];
};

/**
 * Nộp bài thi
 * POST /products/questions/complete-exam
 */
// ▼▼▼ FIX LỖI: Thay Promise<any> bằng Promise<unknown> ▼▼▼
export const submitExam = async (data: TakeExamInput): Promise<unknown> => {
  return axiosClient.post<unknown>('/products/questions/complete-exam', data);
};