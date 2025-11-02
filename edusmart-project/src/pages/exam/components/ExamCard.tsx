// src/pages/exam/components/ExamCard.tsx
import { Link } from 'react-router-dom';
import type { Exam } from '../../../types/exam';
import { ClockIcon, UserGroupIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';

interface ExamCardProps {
  exam: Exam;
}

// Helper lấy text (bạn có thể chuyển ra file utils sau)
const getSubjectText = (subject: string) => {
  const map: Record<string, string> = { math: 'Toán', physics: 'Lý', chemistry: 'Hóa', english: 'Anh', ielts: 'IELTS' };
  return map[subject] || subject;
};

export const ExamCard = ({ exam }: ExamCardProps) => {
  return (
    <div className="group bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          {/* Tag */}
          <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-800 bg-blue-100 dark:text-blue-200 dark:bg-blue-900/50 rounded-full">
            {getSubjectText(exam.subject)}
          </span>
          {/* Difficulty */}
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
            {exam.difficulty}
          </span>
        </div>
        
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {exam.title}
        </h3>
        
        {/* Info */}
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
          <span className="flex items-center"><QuestionMarkCircleIcon className="w-4 h-4 mr-1.5" /> {exam.questions} câu</span>
          <span className="flex items-center"><ClockIcon className="w-4 h-4 mr-1.5" /> {exam.duration} phút</span>
          <span className="flex items-center"><UserGroupIcon className="w-4 h-4 mr-1.5" /> {exam.attempts} lượt thi</span>
        </div>
        
        {/* Author */}
        <p className="text-sm text-gray-500 dark:text-gray-500 mb-5">
          Biên soạn bởi: <span className="font-medium text-gray-700 dark:text-gray-300">{exam.author}</span>
        </p>
        
        {/* Action */}
        <div className="mt-5">
          <Link 
            to={`/exam/detail/${exam.id}`} // Đi đến trang chi tiết
            className="w-full block text-center px-4 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Xem chi tiết
          </Link>
        </div>
      </div>
    </div>
  );
};