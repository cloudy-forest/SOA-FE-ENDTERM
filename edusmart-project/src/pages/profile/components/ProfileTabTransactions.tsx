// src/pages/profile/components/ProfileTabTransactions.tsx
import { mockTransactions } from '../../../data/mockProfileData';
import type { Transaction } from '../../../types/profile';
import clsx from 'clsx';

const StatusBadge = ({ status }: { status: Transaction['status'] }) => (
  <span className={clsx('px-2.5 py-0.5 rounded-full text-xs font-medium', {
    'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300': status === 'success',
    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300': status === 'pending',
    'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300': status === 'failed',
  })}>
    {status === 'success' ? 'Thành công' : (status === 'pending' ? 'Đang chờ' : 'Thất bại')}
  </span>
);

const TransactionRow = ({ tx }: { tx: Transaction }) => {
  return (
    <tr className="hover:bg-gray-50 dark:hover:bg-gray-800">
      <td className="px-5 py-4 text-sm font-mono text-gray-500 dark:text-gray-400">{tx.id}</td>
      <td className="px-5 py-4 text-sm text-gray-600 dark:text-gray-400">{new Date(tx.date).toLocaleString('vi-VN')}</td>
      <td className="px-5 py-4 text-sm font-medium text-gray-900 dark:text-white">{tx.description}</td>
      <td className="px-5 py-4 text-sm text-right font-semibold text-gray-700 dark:text-gray-300">{tx.amount.toLocaleString('vi-VN')}đ</td>
      <td className="px-5 py-4 text-center"><StatusBadge status={tx.status} /></td>
    </tr>
  );
};

export const ProfileTabTransactions = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Mã GD</th>
            <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Ngày</th>
            <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Mô tả</th>
            <th className="px-5 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Số tiền</th>
            <th className="px-5 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Trạng thái</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {mockTransactions.map(tx => (
            <TransactionRow key={tx.id} tx={tx} />
          ))}
        </tbody>
      </table>
    </div>
  );
};