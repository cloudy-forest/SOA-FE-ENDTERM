import type { AdminExam, AdminExamDetails, CreateExamInput } from '../../types/admin';
import type { Exam, ExamQuestion } from '../../types/exam';
import { allExams as mockExamData } from '../../data/mockExams';
import { FAKE_DELAY } from './constants';

let examsDB: Exam[] = [...mockExamData];

// Helper: Tạo câu hỏi giả
const generateMockQuestions = (examId: number, count: number): ExamQuestion[] => {
  const questions: ExamQuestion[] = [];
  for (let i = 1; i <= count; i++) {
    questions.push({
      id: (examId * 100) + i,
      content: `Đây là nội dung câu hỏi ${i} của đề thi ${examId}?`,
      options: [`Lựa chọn A (Đúng)`, `Lựa chọn B`, `Lựa chọn C`, `Lựa chọn D`],
      correctAnswer: 0,
      explanation: `Đây là giải thích chi tiết cho câu hỏi ${i}.`
    });
  }
  return questions;
};

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
