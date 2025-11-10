// src/pages/exam/components/ExamTimer.tsx
import { useState, useEffect } from 'react';
import { ClockIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

interface ExamTimerProps {
  startTime: number | null;
  durationInMinutes: number;
  isSubmitted: boolean;
  onTimeUp: () => void;
}

export const ExamTimer = ({ startTime, durationInMinutes, isSubmitted, onTimeUp }: ExamTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(durationInMinutes * 60); // (giây)
  const [timerClass, setTimerClass] = useState('');

  useEffect(() => {
    // Nếu chưa bắt đầu, hoặc đã nộp, thì không chạy đồng hồ
    if (!startTime || isSubmitted) {
      return;
    }

    // 1. Tính thời điểm kết thúc
    const endTime = startTime + durationInMinutes * 60 * 1000; // (milliseconds)

    const interval = setInterval(() => {
      // 2. Tính thời gian còn lại (ms)
      const remainingMs = endTime - Date.now();

      if (remainingMs <= 0) {
        // 3. Hết giờ!
        setTimeLeft(0);
        clearInterval(interval);
        onTimeUp(); // Báo cho cha biết đã hết giờ
      } else {
        // 4. Cập nhật thời gian còn lại (giây)
        const remainingSeconds = Math.floor(remainingMs / 1000);
        setTimeLeft(remainingSeconds);

        // 5. Cập nhật class CSS cảnh báo
        if (remainingSeconds <= 5 * 60) {
          setTimerClass('timer-warning-5'); // Dưới 5 phút
        } else if (remainingSeconds <= 15 * 60) {
          setTimerClass('timer-warning-15'); // Dưới 15 phút
        }
      }
    }, 1000); // Cập nhật mỗi giây

    // Dọn dẹp interval khi component unmount
    return () => clearInterval(interval);

  }, [startTime, durationInMinutes, isSubmitted, onTimeUp]);

  // Tính toán phút và giây để hiển thị
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div
      className={clsx(
        "flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border",
        timerClass || "bg-gray-50 border-gray-200 dark:bg-gray-700/50 dark:border-gray-700"
      )}
    >
      <ClockIcon className={clsx("w-5 h-5", timerClass ? 'timer-label' : 'text-gray-500 dark:text-gray-400')} />
      <span className={clsx("font-mono font-semibold text-sm", timerClass ? 'timer-time' : 'text-gray-800 dark:text-gray-200')}>
        {/* Nếu đã nộp, hiển thị 00:00 */}
        {isSubmitted ? '00:00' : `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`}
      </span>
    </div>
  );
};