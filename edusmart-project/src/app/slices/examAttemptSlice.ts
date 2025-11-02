// src/app/slices/examAttemptSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import type { ExamAttemptState, ExamQuestion } from '../../types/exam';
import type { PayloadAction } from '@reduxjs/toolkit';

// Định nghĩa kiểu dữ liệu cho action "loadExamSuccess"
interface LoadExamPayload {
  examId: string;
  title: string;
  questions: ExamQuestion[];
  durationMinutes: number;
}

// Định nghĩa kiểu dữ liệu cho action "selectAnswer"
interface SelectAnswerPayload {
  questionId: number;
  answerIndex: number;
}

// State ban đầu khi chưa làm gì cả
const initialState: ExamAttemptState = {
  examId: null,
  title: '',
  questions: [],
  totalQuestions: 0,
  durationMinutes: 0,
  startTime: null,
  timeRemaining: 0,
  currentQuestionIndex: 0,
  answers: {},
  flaggedQuestions: [],
  isSubmitted: false,
  isLoading: true,
};

// Tạo slice
const examAttemptSlice = createSlice({
  name: 'examAttempt', // Tên của slice
  initialState,
  // "reducers" là tập hợp các hàm nhận state hiện tại và action,
  // sau đó trả về state mới (hoặc chỉnh sửa state trực tiếp với Redux Toolkit)
  reducers: {
    // Action khi bắt đầu tải đề thi
    loadExamStart(state) {
      state.isLoading = true;
    },
    
    // Action khi tải đề thi thành công
    loadExamSuccess(state, action: PayloadAction<LoadExamPayload>) {
      const { examId, title, questions, durationMinutes } = action.payload;
      state.examId = examId;
      state.title = title;
      state.questions = questions;
      state.totalQuestions = questions.length;
      state.durationMinutes = durationMinutes;
      state.timeRemaining = durationMinutes * 60; // Đổi phút ra giây
      state.isLoading = false;
      state.isSubmitted = false;
      state.currentQuestionIndex = 0; // Luôn bắt đầu từ câu 0
      state.answers = {};
      state.flaggedQuestions = [];
    },
    
    // Action khi bắt đầu bấm giờ
    startTimer(state) {
      state.startTime = Date.now();
    },
    
    // Action được gọi mỗi giây để đếm ngược
    tickTimer(state) {
      if (!state.isSubmitted && state.timeRemaining > 0) {
        state.timeRemaining -= 1;
      } else if (state.timeRemaining <= 0) {
        state.isSubmitted = true; // Tự động nộp bài khi hết giờ
      }
    },
    
    // Action khi người dùng chọn một đáp án
    selectAnswer(state, action: PayloadAction<SelectAnswerPayload>) {
      const { questionId, answerIndex } = action.payload;
      state.answers[questionId] = answerIndex;
    },
    
    // Action khi nhảy tới một câu hỏi cụ thể (bằng index)
    goToQuestion(state, action: PayloadAction<number>) {
      const index = action.payload;
      if (index >= 0 && index < state.totalQuestions) {
        state.currentQuestionIndex = index;
      }
    },
    
    // Action khi đánh dấu/bỏ đánh dấu một câu (bằng questionId)
    toggleFlagQuestion(state, action: PayloadAction<number>) {
      const questionId = action.payload;
      const flagIndex = state.flaggedQuestions.indexOf(questionId);

      if (flagIndex > -1) {
        // Nếu đã đánh dấu -> Bỏ đánh dấu
        state.flaggedQuestions.splice(flagIndex, 1);
      } else {
        // Nếu chưa -> Đánh dấu
        state.flaggedQuestions.push(questionId);
      }
    },
    
    // Action khi bấm nút nộp bài
    submitExam(state) {
      state.isSubmitted = true;
      state.timeRemaining = 0; // Dừng đồng hồ
    },
  },
});

// Export các hàm actions để component có thể gọi (dispatch)
export const {
  loadExamStart,
  loadExamSuccess,
  startTimer,
  tickTimer,
  selectAnswer,
  goToQuestion,
  toggleFlagQuestion,
  submitExam,
} = examAttemptSlice.actions;

// Export reducer để kết nối với store chính
export default examAttemptSlice.reducer;