// src/app/slices/examAttemptSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import type { ExamAttemptState } from '../../types/exam';
import type { PayloadAction } from '@reduxjs/toolkit';

// Định nghĩa kiểu dữ liệu cho action "loadExamSuccess"
interface LoadExamPayload {
  examId: string;
  title: string;
  totalQuestions: number; 
  durationMinutes: number;
}

// Định nghĩa kiểu dữ liệu cho action "selectAnswer"
interface SelectAnswerPayload {
  questionId: number;
  answerIndex: number;
}

// State ban đầu khi chưa làm gì cả cho persisted 
const initialState: ExamAttemptState = {
  examId: null,
  title: '',
  totalQuestions: 0,
  durationMinutes: 0,
  startTime: null,
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
      // Khi bắt đầu tải đề thi, reset state về ban đầu
      Object.assign(state, initialState); // Reset state về ban đầu
      state.isLoading = true;
    },
    
    // Action khi tải đề thi thành công
    loadExamSuccess(state, action: PayloadAction<LoadExamPayload>) {
      const { examId, title, totalQuestions, durationMinutes } = action.payload;
      // Chỉ gán state nếu đây là bài thi mới (hoặc chưa có)
      // Nếu examId đã tồn tại (do F5), state sẽ được persist, không ghi đè
      if (state.examId !== examId) {
        Object.assign(state, initialState); // Reset state về ban đầu
        state.examId = examId;
        state.title = title;
        state.totalQuestions = totalQuestions;
        state.durationMinutes = durationMinutes;
        state.isLoading = false;
        // Không set startTime ở đây, để khi người dùng bấm "Bắt đầu thi" mới set
      } else {
        // Người dùng F5 trang, state đã được rehydrate
        // Chỉ cần tắt loading (vì questions sẽ được tải ở component)
        state.isLoading = false; // Chỉ tắt loading nếu đã có examId
      }
    },
    
    // Action khi bắt đầu bấm giờ
    startTimer(state) {
      // Chỉ set startTime nếu chưa có (tránh set lại khi F5)
      if (!state.startTime) {
        state.startTime = Date.now();
      }
    },
    
    // Action được gọi mỗi giây để đếm ngược
    // tickTimer(state) {
    //   if (!state.isSubmitted && state.timeRemaining > 0) {
    //     state.timeRemaining -= 1;
    //   } else if (state.timeRemaining <= 0) {
    //     state.isSubmitted = true; // Tự động nộp bài khi hết giờ
    //   }
    // },
    
    // Action khi người dùng chọn một đáp án
    selectAnswer(state, action: PayloadAction<SelectAnswerPayload>) {
      if (state.isSubmitted) return; // Không cho chọn đáp án nếu đã nộp bài
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
    },
    // Action để reset hoàn toàn khi bắt đầu một bài thi mới
    resetExam: () => initialState,
  },
});

// Export các hàm actions để component có thể gọi (dispatch)
export const {
  loadExamStart,
  loadExamSuccess,
  startTimer,
  selectAnswer,
  goToQuestion,
  toggleFlagQuestion,
  submitExam,
  resetExam,
} = examAttemptSlice.actions;

// Export reducer để kết nối với store chính
export default examAttemptSlice.reducer;