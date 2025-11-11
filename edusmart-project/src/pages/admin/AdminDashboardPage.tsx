// src/pages/admin/AdminDashboardPage.tsx
import { useState, useEffect } from 'react';
import {
  UsersIcon,
  BookOpenIcon,
  BanknotesIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';
import type { DashboardStats, AdminTransaction, TransactionStatus } from '../../types/admin';
import { getDashboardStats, getRecentTransactions } from '../../services/adminService';
import { Spinner } from '../../components/ui/Spinner';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';

// --- Component Thẻ Thống Kê (Stat Card) ---
// Dùng lại HTML/CSS từ thiết kế của bạn
const StatCard = ({
  title,
  value,
  percentage,
  icon: Icon,
  iconBg
}: {
  title: string;
  value: string;
  percentage: number;
  icon: React.ElementType;
  iconBg: string;
}) => (
  <div className="stat-card bg-white rounded-xl p-6 border border-gray-200">
    <div className="flex items-center justify-between mb-4">
      <div className={clsx("w-12 h-12 rounded-lg flex items-center justify-center", iconBg)}>
        <Icon className="w-6 h-6 text-current" />
      </div>
      <span className={clsx("text-xs font-medium px-2 py-1 rounded-full",
        percentage >= 0 ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'
      )}>
        {percentage >= 0 ? `+${percentage}%` : `${percentage}%`}
      </span>
    </div>
    <h3 className="text-gray-500 text-sm font-medium mb-1">{title}</h3>
    <p className="text-3xl font-bold text-gray-900">{value}</p>
  </div>
);

// --- Component Hàng Giao Dịch ---
// Dùng lại HTML/CSS từ thiết kế của bạn
const TransactionRow = ({ transaction }: { transaction: AdminTransaction }) => {
  const statusClasses: Record<TransactionStatus, string> = {
    success: 'badge-success',
    pending: 'badge-warning',
    failed: 'badge-danger',
  };
  
  const statusText: Record<TransactionStatus, string> = {
    success: 'Thành công',
    pending: 'Đang xử lý',
    failed: 'Thất bại',
  };

  // Tính thời gian (ví dụ: "5 phút trước")
  const timeAgo = formatDistanceToNow(new Date(transaction.createdAt), { addSuffix: true, locale: vi });

  return (
    <tr className="table-row">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{transaction.id}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{transaction.userName}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{transaction.courseName}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {transaction.amount.toLocaleString('vi-VN')}đ
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={clsx('badge', statusClasses[transaction.status])}>
          {statusText[transaction.status]}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
        {timeAgo}
      </td>
    </tr>
  );
};

// --- Component Trang Chính ---
export const AdminDashboardPage = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [transactions, setTransactions] = useState<AdminTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Gọi 2 API "giả" song song
        const [statsData, transactionsData] = await Promise.all([
          getDashboardStats(),
          getRecentTransactions(),
        ]);
        
        setStats(statsData);
        setTransactions(transactionsData);
        
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError('Lỗi không xác định khi tải dashboard.');
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) {
    return <div className="flex justify-center p-12"><Spinner /></div>;
  }
  
  if (error) {
    return <div className="text-red-500 p-6">{error}</div>;
  }

  return (
    // Đây là HTML từ thiết kế của bạn, nhưng đã được "React-hóa"
    <div className="space-y-8">
      {/* 1. Thẻ Thống kê (Stats Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats && (
          <>
            <StatCard
              title="Tổng học viên"
              value={stats.totalUsers.value.toLocaleString('vi-VN')}
              percentage={stats.totalUsers.percentageChange}
              icon={UsersIcon}
              iconBg="bg-blue-100 text-blue-600"
            />
            <StatCard
              title="Khóa học"
              value={stats.totalCourses.value.toLocaleString('vi-VN')}
              percentage={stats.totalCourses.percentageChange}
              icon={BookOpenIcon}
              iconBg="bg-purple-100 text-purple-600"
            />
            <StatCard
              title="Doanh thu tháng"
              // Hiển thị 89.5M
              value={`₫${(stats.monthlyRevenue.value / 1000000).toFixed(1)}M`}
              percentage={stats.monthlyRevenue.percentageChange}
              icon={BanknotesIcon}
              iconBg="bg-green-100 text-green-600"
            />
            <StatCard
              title="Đề thi"
              value={stats.totalExams.value.toLocaleString('vi-VN')}
              percentage={stats.totalExams.percentageChange}
              icon={DocumentTextIcon}
              iconBg="bg-yellow-100 text-yellow-600"
            />
          </>
        )}
      </div>
      
      {/* 2. Biểu đồ và Khóa học (Tạm thời placeholder như thiết kế) */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Doanh thu theo tháng</h2>
          <div className="chart-container rounded-lg p-6 text-white h-64 flex items-center justify-center">
            <p>(Biểu đồ sẽ được thêm sau)</p>
          </div>
        </div>
        {/* Top Courses */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Khóa học phổ biến</h2>
          <div className="space-y-4 flex flex-col items-center justify-center h-64">
             <p className="text-gray-500">(Danh sách khóa học phổ biến)</p>
          </div>
        </div>
      </div>

      {/* 3. Giao dịch gần đây (Bảng thật) */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Giao dịch gần đây</h2>
          <Link to="payments" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            Xem tất cả
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mã GD</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Học viên</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Khóa học</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Số tiền</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thời gian</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactions.map(tx => (
                <TransactionRow key={tx.id} transaction={tx} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};