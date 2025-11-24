// src/types/learning.ts

// --- EXAM ---

// 1. Dữ liệu khi NHẬN VỀ (GET /learning/exams/{id})
// Khớp với: learning-service/.../ExamResponse.java
export interface Exam {
  id: number;
  type: string; // VD: "IELTS", "TOEIC"
  title: string;
  info: string;
  time: number; // Phút
  part: number;
  term: string;
  categoryId: number; // Lưu ý: Backend trả về camelCase ở đây
  
  // @JsonProperty("number_of_completion")
  number_of_completion: number;
  
  // @JsonProperty("number_of_question")
  number_of_question: number;
  
  // @JsonProperty("thumbnail_url")
  thumbnail_url: string;
  
  // @JsonProperty("thumbnail_id")
  thumbnail_id: number;
}

// 2. Dữ liệu khi GỬI LÊN (POST /learning/exams)
// Khớp với: learning-service/.../ExamDTO.java
export interface ExamInput {
  id?: number;
  type: string;
  title: string;
  info: string;
  time: number;
  part: number;
  
  // @JsonProperty("exam_category_id")
  exam_category_id: number;
  
  // @JsonProperty("number_of_question")
  number_of_question: number;
}

// --- QUESTION ---

// 3. Cấu trúc Câu hỏi (GET /products/questions/take-exam)
// Khớp với: learning-service/.../QuestionResponse.java
export interface Question {
  id: number;
  script: string;
  question: string;
  
  imageUrl: string;
  imageId: number;
  
  audio: string;
  audioId: number;
  
  answerA: string;
  answerB: string;
  answerC: string;
  answerD: string;
  
  // Frontend tự thêm để quản lý trạng thái chọn (khi làm bài)
  selectedAnswer?: string; // 'A', 'B', 'C', 'D'
}

// --- TAKE EXAM (Nộp bài) ---

// Khớp với: learning-service/.../QuestionCompleteExamDTO.java (Dự đoán)
export interface QuestionCompleteDTO {
  question_id: number; // Hoặc questionId (cần check kỹ nếu backend dùng snake_case)
  selected_answer: string; // VD: "A"
}

// Khớp với: learning-service/.../TakeExamDTO.java
export interface TakeExamInput {
  // @JsonProperty("exam_attempt_id")
  exam_attempt_id: number;
  
  questions: QuestionCompleteDTO[];
}

// Khớp với: learning-service/.../ExamCategoryDTO.java
export interface ExamCategory {
  id: number;
  content: string; // Backend dùng từ 'content' thay vì 'name'
}

// Interface phân trang chung (Dùng lại của Product cũng được, hoặc khai báo mới)
export interface PageResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}