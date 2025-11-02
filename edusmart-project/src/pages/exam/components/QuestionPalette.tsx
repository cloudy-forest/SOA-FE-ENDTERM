// src/pages/exam/components/QuestionPalette.tsx
import React from 'react';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { goToQuestion } from '../../../app/slices/examAttemptSlice';
import clsx from 'clsx';

export const QuestionPalette = () => {
    const dispatch = useAppDispatch();
    const { 
        totalQuestions, 
        currentQuestionIndex, 
        answers, 
        flaggedQuestions,
        questions 
    } = useAppSelector((state) => state.examAttempt);

    const answeredCount = Object.keys(answers).length;
    const remainingCount = totalQuestions - answeredCount;
    const progressPercent = totalQuestions > 0 ? (answeredCount / totalQuestions) * 100 : 0;

    const handleJumpToQuestion = (index: number) => {
        dispatch(goToQuestion(index));
    };

    return (
        <div className="w-full sm:w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4 overflow-y-auto h-full flex flex-col">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4 text-base">Danh sách câu hỏi</h3>
            {/* Progress */}
            <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">Tiến độ</div>
                <div className="flex justify-between text-sm mb-2">
                    <span className="dark:text-gray-300">Đã làm: <span className="font-semibold text-green-600 dark:text-green-400">{answeredCount}</span></span>
                    <span className="dark:text-gray-300">Còn lại: <span className="font-semibold text-gray-600 dark:text-gray-400">{remainingCount}</span></span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: `${progressPercent}%` }}></div>
                </div>
            </div>
            {/* Legend */}
            <div className="mb-4 text-xs space-y-1 dark:text-gray-400">
                <div className="flex items-center space-x-2"><div className="w-3 h-3 bg-blue-600 rounded"></div><span>Câu hiện tại</span></div>
                <div className="flex items-center space-x-2"><div className="w-3 h-3 bg-green-500 rounded"></div><span>Đã trả lời</span></div>
                <div className="flex items-center space-x-2"><div className="w-3 h-3 bg-yellow-500 rounded"></div><span>Đánh dấu</span></div>
                <div className="flex items-center space-x-2"><div className="w-3 h-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded"></div><span>Chưa làm</span></div>
            </div>
            {/* Grid */}
            <div className="grid grid-cols-5 gap-2 flex-1">
                {Array.from({ length: totalQuestions }, (_, i) => {
                    const questionNumber = i + 1;
                    const questionId = questions[i]?.id; 
                    const isCurrent = i === currentQuestionIndex;
                    const isAnswered = answers[questionId] !== undefined;
                    const isFlagged = flaggedQuestions.includes(questionId);

                    return (
                        <button
                            key={i}
                            onClick={() => handleJumpToQuestion(i)}
                            className={clsx(
                                'question-number-btn', 
                                isCurrent && 'current',
                                !isCurrent && isAnswered && 'answered',
                                !isCurrent && !isAnswered && isFlagged && 'flagged',
                                !isCurrent && isAnswered && isFlagged && 'answered flagged',
                                !isCurrent && !isAnswered && !isFlagged && 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300'
                            )}
                        >
                            {questionNumber}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};