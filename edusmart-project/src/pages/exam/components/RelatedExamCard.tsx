// src/pages/exam/components/RelatedExamCard.tsx
import { Link } from 'react-router-dom';
import type { RelatedExamInfo } from '../../../types/exam';
import { DocumentTextIcon, ClockIcon } from '@heroicons/react/24/outline';

interface RelatedExamCardProps {
  exams: RelatedExamInfo[];
}

export const RelatedExamCard = ({ exams }: RelatedExamCardProps) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Đề thi liên quan</h2>
    <ul className="space-y-4">
      {exams.map(exam => (
        <li key={exam.id} className="border-b border-gray-100 dark:border-gray-700 pb-3 last:border-b-0 last:pb-0">
          <Link to={`/exam/detail/${exam.id}`} className="block group">
            <h4 className="font-semibold text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">
              {exam.title}
            </h4>
            <div className="flex items-center space-x-3 text-xs text-gray-500 dark:text-gray-400 mt-1.5">
              <span className="flex items-center"><DocumentTextIcon className="w-3.5 h-3.5 mr-1" /> {exam.questions} câu</span>
              <span className="flex items-center"><ClockIcon className="w-3.5 h-3.5 mr-1" /> {exam.duration} phút</span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  </div>
);