// src/pages/exam/components/ExamTimer.tsx
import React from 'react';
import { useAppSelector } from '../../../app/hooks';
import clsx from 'clsx';

const formatTime = (seconds: number): string => {
    if (seconds < 0) seconds = 0;
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export const ExamTimer = () => {
    const timeRemaining = useAppSelector((state) => state.examAttempt.timeRemaining);

    const timerClass = clsx(
        'rounded-lg px-4 py-1.5 text-center transition-colors',
        timeRemaining <= 300 ? 'timer-warning-5' :
        timeRemaining <= 900 ? 'timer-warning-15' :
        'bg-blue-50 dark:bg-gray-700 border border-blue-200 dark:border-gray-600'
    );

    return (
        <div className={timerClass}>
            <div className="text-xs sm:text-sm font-medium timer-label">
                Thời gian còn lại
            </div>
            <div className="text-xl sm:text-2xl font-bold timer-time">
                {formatTime(timeRemaining)}
            </div>
        </div>
    );
};