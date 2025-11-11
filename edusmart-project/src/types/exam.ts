// src/types/exam.ts

// Kiểu dữ liệu cho một câu hỏi
export interface ExamQuestion {
  id: number;
  content: string; // Nội dung câu hỏi (có thể chứa HTML)
  options: string[]; // Mảng các lựa chọn
  correctAnswer: number;
  explanation?: string; 
}

// Kiểu dữ liệu cho toàn bộ trạng thái (state) của bài thi
export interface ExamAttemptState {
  examId: string | null;
  title: string;
  totalQuestions: number;
  durationMinutes: number;
  startTime: number | null; // Timestamp (Date.now()) khi bắt đầu
  currentQuestionIndex: number; // Vị trí câu hỏi hiện tại (0 -> n-1)
  answers: Record<number, number>; // { [questionId]: answerIndex }
  flaggedQuestions: number[]; // Mảng các questionId được đánh dấu
  isSubmitted: boolean;
  isLoading: boolean;
}

export interface RelatedExamInfo {
  id: number;
  title: string;
  questions: number;
  duration: number;
}

export interface ContentCoverageItem {
  topic: string;
  count: number;
}

export interface MockComment {
  id: number;
  user: string;
  avatarInitials: string;
  time: string;
  text: string;
  likes: number;
}
// Kiểu dữ liệu cho một đề thi (để mock data)
// (Chúng ta sẽ mở rộng interface này sau khi làm trang chi tiết)
export interface Exam {
  id: number;
  title: string;
  subject: string;
  level: string;
  type: string;
  source: string;
  duration: number;
  questions: number;
  attempts: number;
  comments: number; // Có thể lấy từ length của mảng bình luận
  difficulty: string;
  createdAt: string;
  author: string;
  authorTitle: string;
  authorBio: string;
  authorImage?: string; // (Thêm) Ảnh tác giả
  description: string;
  contentCoverage: ContentCoverageItem[]; // (Thêm) Phân tích nội dung
  detailedQuestions?: ExamQuestion[];
  relatedExams?: RelatedExamInfo[]; // (Thêm) Đề liên quan
  averageScore?: number
}

export type ExamSubject = 'math' | 'physics' | 'chemistry' | 'english' | 'ielts' | 'toeic';
export type ExamLevel = 'grade10' | 'grade11' | 'grade12' | 'university' | 'basic' | 'advanced';
export type ExamType = 'fullTest' | 'test45' | 'test15' | 'practice';
export type ExamSort = 'newest' | 'popular' | 'attempts-low' | 'attempts-high';

//  Kiểu dữ liệu cho state của bộ lọc đề thi
export interface ExamFilterState {
  searchTerm: string;
  subjects: ExamSubject[];
  levels: ExamLevel[];
  types: ExamType[];
  sortBy: ExamSort;
  page: number;
}

