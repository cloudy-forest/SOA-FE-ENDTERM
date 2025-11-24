// src/pages/courses/components/CourseOutcomes.tsx
import type { Outcome } from '../../../types/course';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

interface CourseOutcomesProps {
  outcomes: Outcome[];
}

export const CourseOutcomes = ({ outcomes }: CourseOutcomesProps) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
      Bạn sẽ đạt được gì sau khóa học?
    </h2>
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
      {outcomes.map((item) => (
        <li key={item.id} className="flex items-start">
          <CheckCircleIcon className="w-6 h-6 text-green-500 flex-shrink-0 mr-3" />
          <span className="text-gray-700 dark:text-gray-300">
            {item.text}
          </span>
        </li>
      ))}
    </ul>
  </div>
);
