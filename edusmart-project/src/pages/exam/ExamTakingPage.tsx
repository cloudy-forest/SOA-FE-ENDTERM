// src/pages/exam/ExamTakingPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  // ▼▼▼ 1. IMPORT CÁC ACTION ĐÚNG (KHÔNG CÓ tickTimer) ▼▼▼
  loadExamStart,
  loadExamSuccess,
  startTimer,
  selectAnswer,
  goToQuestion,
  toggleFlagQuestion,
  submitExam,
  resetExam, // (resetExam sẽ được dùng ở đây)
} from '../../app/slices/examAttemptSlice';

// ▼▼▼ 2. SỬA LỖI ĐÁNH MÁY "Moc" -> "Mock" ▼▼▼
import { fetchMockExamById } from '../../data/mockExams'; 
import type { ExamQuestion } from '../../types/exam';

// ▼▼▼ 3. IMPORT HEADER TỪ FILE CHÍNH XÁC ▼▼▼
import { ExamHeader } from './components/ExamHeader';
import { QuestionPalette } from './components/QuestionPalette';
import { AnswerOption } from './components/AnswerOption';
import { SubmitModal } from './components/SubmitModal';
import { Spinner } from '../../components/ui/Spinner';
import { FlagIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export const ExamTakingPage = () => {
  const { examId } = useParams<{ examId: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Lấy state từ Redux
  const {
    examId: currentExamId,
    title,
    totalQuestions,
    currentQuestionIndex,
    answers,
    flaggedQuestions,
    isSubmitted,
    isLoading,
    startTime,
    durationMinutes
  } = useAppSelector((state) => state.examAttempt);

  // State local (chỉ tồn tại trong component này)
  const [questions, setQuestions] = useState<ExamQuestion[]>([]);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  // 4. LOAD ĐỀ THI VÀ BẮT ĐẦU
  useEffect(() => {
    const loadExam = async () => {
      if (!examId) return;

      try {
        // Chỉ tải lại nếu là bài thi mới
        if (examId !== currentExamId) {
          dispatch(resetExam()); // XÓA BÀI CŨ
          dispatch(loadExamStart()); // Bắt đầu loading cho bài mới
        } else if (questions.length > 0) {
          // Nếu F5, examId đã khớp, chỉ cần thoát
          return;
        }

        // ▼▼▼ CHỈ GỌI 1 HÀM FETCH ▼▼▼
        const examDetails = await fetchMockExamById(examId);
        
        if (!examDetails || !examDetails.detailedQuestions) {
          throw new Error("Không tìm thấy đề thi hoặc câu hỏi chi tiết");
        }
        
        // Lấy câu hỏi từ bên trong data
        const questionsData = examDetails.detailedQuestions;
        
        setQuestions(questionsData); // Lưu câu hỏi vào state local
        
        // Gửi thông tin chung lên Redux
        dispatch(loadExamSuccess({
          examId: examId,
          title: examDetails.title,
          totalQuestions: questionsData.length, // Lấy độ dài
          durationMinutes: examDetails.duration,
        }));
        
        dispatch(startTimer()); // Bắt đầu bấm giờ (nó sẽ tự kiểm tra)

      } catch (error) {
        console.error(error);
        navigate('/exams'); 
      }
    };
    
    loadExam();
  }, [examId, dispatch, currentExamId, questions.length, navigate]);


  // HÀM XỬ LÝ KHI HẾT GIỜ (ĐƯỢC GỌI TỪ ExamTimer)
  const handleTimeUp = () => {
    if (!isSubmitted) {
      dispatch(submitExam());
      alert('Hết thời gian! Bài thi của bạn đã được nộp tự động.');
    }
  };

  // LẤY THÔNG TIN CÂU HỎI HIỆN TẠI
  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswerIndex = answers[currentQuestionIndex];
  const isCurrentFlagged = flaggedQuestions.includes(currentQuestionIndex);

  // CÁC HÀM HANDLERS
  const handleSelectAnswer = (optionIndex: number) => {
    if (isSubmitted) return;
    dispatch(selectAnswer({ questionId: currentQuestionIndex, answerIndex: optionIndex }));
  };
  const handleToggleFlag = () => {
    if (isSubmitted) return;
    dispatch(toggleFlagQuestion(currentQuestionIndex));
  };
  const handleNext = () => dispatch(goToQuestion(currentQuestionIndex + 1));
  const handlePrev = () => dispatch(goToQuestion(currentQuestionIndex - 1));
  
  const handleConfirmSubmit = () => {
    dispatch(submitExam());
    setIsSubmitModalOpen(false);
  };

  // RENDER (Loading)
  if (isLoading || questions.length === 0 && !isSubmitted) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
        <Spinner />
        <span className="ml-4 text-lg text-gray-700 dark:text-gray-300">Đang tải đề thi...</span>
      </div>
    );
  }

  // RENDER (Đã nộp bài)
  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50 dark:bg-gray-900 text-center p-6">
        <h1 className="text-3xl font-bold text-green-600 dark:text-green-400 mb-4">Hoàn thành!</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">Bạn đã nộp bài thi. Cảm ơn!</p>
        <button 
          onClick={() => navigate('/exams')}
          className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
        >
          Xem các đề thi khác
        </button>
      </div>
    );
  }

  // RENDER (Trang thi chính)
  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
      
      {/* ▼▼▼ 4. KHỐI HEADER ĐÃ ĐƯỢC THAY THẾ HOÀN TOÀN ▼▼▼ */}
      <ExamHeader
        title={title}
        totalQuestions={totalQuestions}
        onSubmitClick={() => setIsSubmitModalOpen(true)}
        startTime={startTime}
        durationInMinutes={durationMinutes}
        isSubmitted={isSubmitted}
        onTimeUp={handleTimeUp}
      />

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar (Palette) */}
        <div className="hidden sm:block flex-shrink-0 h-full overflow-y-auto">
          <QuestionPalette />
        </div>

        {/* Question Area */}
        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
            <div className="max-w-4xl mx-auto">
              
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                    Câu {currentQuestionIndex + 1} / {totalQuestions}
                  </h2>
                </div>
                <button
                  onClick={handleToggleFlag}
                  className={clsx(
                    "flex items-center space-x-2 px-3 py-1.5 text-sm rounded-lg transition-colors",
                    isCurrentFlagged
                      ? 'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300 hover:bg-yellow-200'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                  )}
                >
                  <FlagIcon className="w-4 h-4" />
                  <span>{isCurrentFlagged ? 'Bỏ đánh dấu' : 'Đánh dấu'}</span>
                </button>
              </div>

              {currentQuestion && (
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                  <div
                    className="text-gray-900 dark:text-gray-100 text-base sm:text-lg leading-relaxed mb-6 max-w-none"
                    dangerouslySetInnerHTML={{ __html: currentQuestion.content }}
                  />
                  <div className="space-y-3">
                    {currentQuestion.options.map((optionText, index) => (
                      <AnswerOption
                        key={index}
                        index={index}
                        text={optionText}
                        isSelected={currentAnswerIndex === index}
                        onSelect={() => handleSelectAnswer(index)}
                        isDisabled={isSubmitted}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center">
                <button
                  onClick={handlePrev}
                  disabled={currentQuestionIndex === 0}
                  className="flex items-center space-x-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-50"
                >
                  <ChevronLeftIcon className="w-4 h-4" />
                  <span>Câu trước</span>
                </button>
                <button
                  onClick={handleNext}
                  disabled={currentQuestionIndex === totalQuestions - 1}
                  className="flex items-center space-x-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-50"
                >
                  <span>Câu tiếp theo</span>
                  <ChevronRightIcon className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>

      <SubmitModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        onConfirm={handleConfirmSubmit}
      />
    </div>
  );
};