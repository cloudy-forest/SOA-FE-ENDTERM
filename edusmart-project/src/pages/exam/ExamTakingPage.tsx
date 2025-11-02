// src/pages/exam/ExamTakingPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  loadExamStart,
  loadExamSuccess,
  startTimer,
  tickTimer,
  selectAnswer,
  toggleFlagQuestion,
  submitExam,
  goToQuestion
} from '../../app/slices/examAttemptSlice';
import { fetchMockExamById } from '../../data/mockExams'; 

// Import các component con
import { ExamTimer } from './components/ExamTimer';
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

    const {
        title, questions, totalQuestions, currentQuestionIndex,
        answers, flaggedQuestions, isSubmitted, isLoading,
        startTime, timeRemaining
    } = useAppSelector((state) => state.examAttempt);

    const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

    // 1. LOAD ĐỀ THI (CHẠY 1 LẦN)
    useEffect(() => {
        if (!examId) return;
        const loadExam = async () => {
            dispatch(loadExamStart());
            try {
                const examData = await fetchMockExamById(examId);
                if (examData.detailedQuestions) {
                    dispatch(loadExamSuccess({
                        examId: examId,
                        title: examData.title,
                        questions: examData.detailedQuestions,
                        durationMinutes: examData.duration,
                    }));
                    dispatch(startTimer());
                } else {
                    // Xử lý lỗi (sẽ thêm sau)
                }
            } catch (err) {
                console.error("Lỗi khi tải đề thi:", err);
            }
        };
        loadExam();
    }, [examId, dispatch]);

    // 2. CHẠY ĐỒNG HỒ
    useEffect(() => {
        if (startTime && !isSubmitted && timeRemaining > 0) {
            const timerId = setInterval(() => {
                dispatch(tickTimer());
            }, 1000);
            return () => clearInterval(timerId);
        } else if (timeRemaining <= 0 && startTime && !isSubmitted) {
            // Tự động nộp bài khi hết giờ
            dispatch(submitExam());
            alert('Hết thời gian! Bài thi của bạn đã được nộp tự động.');
            navigate('/'); // Chuyển về trang chủ
        }
    }, [startTime, isSubmitted, timeRemaining, dispatch, navigate]);

    // 3. LẤY THÔNG TIN CÂU HỎI HIỆN TẠI
    const currentQuestion = questions[currentQuestionIndex];
    const currentQuestionId = currentQuestion?.id;
    const currentAnswerIndex = currentQuestionId ? answers[currentQuestionId] : undefined;
    const isCurrentFlagged = currentQuestionId ? flaggedQuestions.includes(currentQuestionId) : false;

    // 4. CÁC HÀM HANDLERS
    const handleSelectAnswer = (optionIndex: number) => {
        if (!currentQuestionId || isSubmitted) return;
        dispatch(selectAnswer({ questionId: currentQuestionId, answerIndex: optionIndex }));
    };
    const handleToggleFlag = () => {
        if (!currentQuestionId || isSubmitted) return;
        dispatch(toggleFlagQuestion(currentQuestionId));
    };
    const handleNext = () => dispatch(goToQuestion(currentQuestionIndex + 1));
    const handlePrev = () => dispatch(goToQuestion(currentQuestionIndex - 1));
    const handleConfirmSubmit = () => {
        dispatch(submitExam());
        setIsSubmitModalOpen(false);
        alert('Nộp bài thành công!');
        navigate('/'); 
    };

    // 5. RENDER
    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
                <Spinner />
                <span className="ml-4 text-lg text-gray-700 dark:text-gray-300">Đang tải đề thi...</span>
            </div>
        );
    }

    if (isSubmitted) {
         return (
             <div className="flex flex-col items-center justify-center h-screen bg-gray-50 dark:bg-gray-900 text-center p-6">
                <h1 className="text-3xl font-bold text-green-600 dark:text-green-400 mb-4">Hoàn thành!</h1>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">Bạn đã nộp bài thi. Cảm ơn!</p>
                <button 
                    onClick={() => navigate('/')} 
                    className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
                >
                    Về trang chủ
                </button>
             </div>
         );
    }

    return (
        <div className="flex flex-col h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
            {/* Header */}
            <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40 flex-shrink-0">
                <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex-1 min-w-0">
                            <h1 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white truncate" title={title}>
                                {title}
                            </h1>
                             <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{totalQuestions} câu hỏi</p>
                        </div>
                        <div className="flex-shrink-0 mx-4">
                            <ExamTimer />
                        </div>
                        <div className="flex-1 flex justify-end min-w-0">
                            <button
                                onClick={() => setIsSubmitModalOpen(true)}
                                className="submit-btn text-white px-4 py-2 sm:px-6 sm:py-2 rounded-lg font-semibold text-sm sm:text-base whitespace-nowrap"
                            >
                                NỘP BÀI
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="flex flex-1 overflow-hidden">
                {/* Left Sidebar */}
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

            {/* Modal */}
            <SubmitModal
                isOpen={isSubmitModalOpen}
                onClose={() => setIsSubmitModalOpen(false)}
                onConfirm={handleConfirmSubmit}
            />
        </div>
    );
};