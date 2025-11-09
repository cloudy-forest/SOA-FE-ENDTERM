// src/pages/profile/components/ProfileTabExams.tsx
import { mockExamResults } from '../../../data/mockProfileData';
import type { ProfileExamResult } from '../../../types/profile';

const ResultRow = ({ result }: { result: ProfileExamResult }) => {
  const scorePercent = (result.score / result.totalQuestions) * 100;
  return (
    <tr className="hover:bg-gray-50 dark:hover:bg-gray-800">
      <td className="px-5 py-4 text-sm font-medium text-gray-900 dark:text-white">{result.examTitle}</td>
      <td className="px-5 py-4 text-sm text-center text-gray-700 dark:text-gray-300">
        <span className={`font-semibold ${scorePercent >= 50 ? 'text-green-600' : 'text-red-600'}`}>
          {result.score}/{result.totalQuestions}
        </span>
      </td>
      <td className="px-5 py-4 text-sm text-right text-gray-600 dark:text-gray-400">
        {new Date(result.dateTaken).toLocaleString('vi-VN')}
      </td>
    </tr>
  );
};

export const ProfileTabExams = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Tên đề thi</th>
            <th className="px-5 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Kết quả</th>
            <th className="px-5 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Ngày làm</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {mockExamResults.map(result => (
            <ResultRow key={result.id} result={result} />
          ))}
        </tbody>
      </table>
    </div>
  );
};