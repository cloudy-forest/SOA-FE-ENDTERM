// import type { DashboardStats, AdminTransaction } from '../../types/admin';
// import { mockUsers } from '../../data/mockAdminData';
// import { allCourses } from '../../data/mockCourses';
// import { FAKE_DELAY } from './constants';

// // TẠO DATABASE "ẢO" CHO GIAO DỊCH 
// const transactionsDB: AdminTransaction[] = [
//   { id: '#TXN-8472', userName: 'Nguyễn Văn A', courseName: 'TOEIC Listening & Reading', amount: 1299000, status: 'success', createdAt: new Date(Date.now() - 5 * 60000).toISOString() },
//   { id: '#TXN-8471', userName: 'Trần Thị B', courseName: 'IELTS Speaking & Writing', amount: 899000, status: 'success', createdAt: new Date(Date.now() - 12 * 60000).toISOString() },
//   { id: '#TXN-8470', userName: 'Lê Văn C', courseName: 'Tiếng Anh Giao Tiếp', amount: 699000, status: 'pending', createdAt: new Date(Date.now() - 28 * 60000).toISOString() },
//   { id: '#TXN-8469', userName: 'Phạm Thị D', courseName: 'Business English', amount: 1499000, status: 'success', createdAt: new Date(Date.now() - 60 * 60000).toISOString() },
//   { id: '#TXN-8468', userName: 'Hoàng Văn E', courseName: 'Grammar Foundation', amount: 599000, status: 'failed', createdAt: new Date(Date.now() - 120 * 60000).toISOString() },
//   { id: '#TXN-8467', userName: 'Vũ Thị F', courseName: 'TOEIC Listening & Reading', amount: 1299000, status: 'success', createdAt: new Date(Date.now() - 180 * 60000).toISOString() },
// ];

// /**
//  * Giả lập API: GET /api/admin/dashboard/stats
//  */
// export const getDashboardStats = (): Promise<DashboardStats> => {
//   console.log("(Giả lập API) Đang tải thống kê dashboard...");
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       const stats: DashboardStats = {
//         totalUsers: { value: mockUsers.length, percentageChange: 12 },
//         totalCourses: { value: allCourses.length, percentageChange: 8 },
//         monthlyRevenue: { value: 89500000, percentageChange: 24 },
//         totalExams: { value: 342, percentageChange: 5 }, // (Mock data)
//       };
//       resolve(stats);
//     }, FAKE_DELAY);
//   });
// };

// /**
//  * Giả lập API: GET /api/admin/dashboard/transactions?limit=5
//  */
// export const getRecentTransactions = (): Promise<AdminTransaction[]> => {
//   console.log("(Giả lập API) Đang tải giao dịch gần đây...");
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       // Sắp xếp để lấy giao dịch mới nhất
//       const recent = transactionsDB.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
//       resolve(recent.slice(0, 5)); // Lấy 5 cái
//     }, FAKE_DELAY);
//   });
// };

// src/services/admin/dashboardService.ts
import type { DashboardStats, AdminTransaction } from '../../types/admin';
import { mockUsers } from '../../data/mockAdminData';
import { FAKE_DELAY } from './constants';

// TẠO DATABASE "ẢO" CHO GIAO DỊCH
const transactionsDB: AdminTransaction[] = [
  {
    id: '#TXN-8472',
    userName: 'Nguyễn Văn A',
    courseName: 'TOEIC Listening & Reading',
    amount: 1_299_000,
    status: 'success',
    createdAt: new Date(Date.now() - 5 * 60_000).toISOString(),
  },
  {
    id: '#TXN-8471',
    userName: 'Trần Thị B',
    courseName: 'IELTS Speaking & Writing',
    amount: 899_000,
    status: 'success',
    createdAt: new Date(Date.now() - 12 * 60_000).toISOString(),
  },
  {
    id: '#TXN-8470',
    userName: 'Lê Văn C',
    courseName: 'Tiếng Anh Giao Tiếp',
    amount: 699_000,
    status: 'pending',
    createdAt: new Date(Date.now() - 28 * 60_000).toISOString(),
  },
  {
    id: '#TXN-8469',
    userName: 'Phạm Thị D',
    courseName: 'Business English',
    amount: 1_499_000,
    status: 'success',
    createdAt: new Date(Date.now() - 60 * 60_000).toISOString(),
  },
  {
    id: '#TXN-8468',
    userName: 'Hoàng Văn E',
    courseName: 'Grammar Foundation',
    amount: 599_000,
    status: 'failed',
    createdAt: new Date(Date.now() - 120 * 60_000).toISOString(),
  },
  {
    id: '#TXN-8467',
    userName: 'Vũ Thị F',
    courseName: 'TOEIC Listening & Reading',
    amount: 1_299_000,
    status: 'success',
    createdAt: new Date(Date.now() - 180 * 60_000).toISOString(),
  },
];

/**
 * Giả lập API: GET /api/admin/dashboard/stats
 */
export const getDashboardStats = (): Promise<DashboardStats> => {
  console.log('(Giả lập API) Đang tải thống kê dashboard...');
  return new Promise((resolve) => {
    setTimeout(() => {
      const stats: DashboardStats = {
        totalUsers: { value: mockUsers.length, percentageChange: 12 },
        // Giữ số khóa học mock cố định (trước đây dùng allCourses.length)
        totalCourses: { value: 24, percentageChange: 8 },
        monthlyRevenue: { value: 89_500_000, percentageChange: 24 },
        totalExams: { value: 342, percentageChange: 5 },
      };
      resolve(stats);
    }, FAKE_DELAY);
  });
};

/**
 * Giả lập API: GET /api/admin/dashboard/transactions?limit=5
 */
export const getRecentTransactions = (): Promise<AdminTransaction[]> => {
  console.log('(Giả lập API) Đang tải giao dịch gần đây...');
  return new Promise((resolve) => {
    setTimeout(() => {
      const recent = transactionsDB
        .slice()
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime(),
        );
      resolve(recent.slice(0, 5));
    }, FAKE_DELAY);
  });
};
