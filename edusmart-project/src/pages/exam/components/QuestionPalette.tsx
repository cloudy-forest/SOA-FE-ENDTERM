// src/pages/exam/components/QuestionPalette.tsx
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { goToQuestion } from '../../../app/slices/examAttemptSlice';
import clsx from 'clsx';

// Component con cho mỗi nút
const PaletteButton = ({
  index,
  isCurrent,
  isAnswered,
  isFlagged,
  onClick,
}: {
  index: number;
  isCurrent: boolean;
  isAnswered: boolean;
  isFlagged: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "question-number-btn", // Class này từ index.css
        isCurrent && 'current',
        isAnswered && 'answered',
        isFlagged && 'flagged',
      )}
    >
      {index + 1}
    </button>
  );
};

export const QuestionPalette = () => {
  const dispatch = useAppDispatch();
  
  // ▼▼▼ 1. LẤY STATE MỚI TỪ REDUX (KHÔNG CÓ "questions") ▼▼▼
  const {
    totalQuestions,
    currentQuestionIndex,
    answers,
    flaggedQuestions,
  } = useAppSelector(state => state.examAttempt);

  const handleGoToQuestion = (index: number) => {
    dispatch(goToQuestion(index));
  };

  return (
    <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-full p-6 overflow-y-auto">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Danh sách câu hỏi
      </h3>
      
      {/* ▼▼▼ 2. DÙNG "totalQuestions" ĐỂ TẠO MẢNG ▼▼▼ */}
      <div className="grid grid-cols-5 gap-2">
        {Array.from({ length: totalQuestions }, (_, index) => {
          
          // ▼▼▼ 3. KIỂM TRA STATE DỰA TRÊN "index" ▼▼▼
          // (Logic này dựa trên slice mới của chúng ta)
          const isCurrent = index === currentQuestionIndex;
          const isAnswered = answers[index] !== undefined;
          const isFlagged = flaggedQuestions.includes(index);

          return (
            <PaletteButton
              key={index}
              index={index}
              isCurrent={isCurrent}
              isAnswered={isAnswered}
              isFlagged={isFlagged}
              onClick={() => handleGoToQuestion(index)}
            />
          );
        })}
      </div>

      {/* Chú thích */}
      <div className="mt-6 space-y-2 text-sm text-gray-600 dark:text-gray-400">
        <div className="flex items-center">
          <div className="w-5 h-5 rounded bg-blue-600 border border-blue-600 mr-2"></div>
          <span>Câu hiện tại</span>
        </div>
        <div className="flex items-center">
          <div className="w-5 h-5 rounded bg-green-500 border border-green-500 mr-2"></div>
          <span>Đã trả lời</span>
        </div>
        <div className="flex items-center">
          <div className="w-5 h-5 rounded bg-yellow-500 border border-yellow-500 mr-2"></div>
          <span>Đã đánh dấu</span>
        </div>
        <div className="flex items-center">
          <div className="w-5 h-5 rounded bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 mr-2"></div>
          <span>Chưa trả lời</span>
        </div>
      </div>
    </div>
  );
};