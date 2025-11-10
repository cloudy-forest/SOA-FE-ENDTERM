// src/pages/exam/components/ExamHeader.tsx
import { ExamTimer } from './ExamTimer';

interface ExamHeaderProps {
  title: string;
  totalQuestions: number;
  onSubmitClick: () => void;
  // Truyền các state cần thiết cho đồng hồ
  startTime: number | null;
  durationInMinutes: number;
  isSubmitted: boolean;
  onTimeUp: () => void;
}

export const ExamHeader = ({
  title,
  totalQuestions,
  onSubmitClick,
  startTime,
  durationInMinutes,
  isSubmitted,
  onTimeUp
}: ExamHeaderProps) => {
  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40 flex-shrink-0">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Tiêu đề */}
          <div className="flex-1 min-w-0">
            <h1 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white truncate" title={title}>
              {title}
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              {totalQuestions} câu hỏi
            </p>
          </div>

          {/* Đồng hồ */}
          <div className="flex-shrink-0 mx-4">
            <ExamTimer
              startTime={startTime}
              durationInMinutes={durationInMinutes}
              isSubmitted={isSubmitted}
              onTimeUp={onTimeUp}
            />
          </div>

          {/* Nút Nộp bài */}
          <div className="flex-1 flex justify-end min-w-0">
            <button
              onClick={onSubmitClick}
              disabled={isSubmitted}
              className="submit-btn text-white px-4 py-2 sm:px-6 sm:py-2 rounded-lg font-semibold text-sm sm:text-base whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed"
            >
              NỘP BÀI
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};