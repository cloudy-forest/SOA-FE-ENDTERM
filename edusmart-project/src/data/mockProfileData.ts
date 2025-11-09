// src/data/mockProfileData.ts
import type { ProfileExamResult, Transaction } from '../types/profile';

// Dùng cho tab "Kết quả luyện thi"
export const mockExamResults: ProfileExamResult[] = [
  { id: 'r1', examTitle: 'Đề thi thử THPT QG 2025 - Môn Anh', score: 8.5, totalQuestions: 50, dateTaken: '2025-11-08T10:30:00Z' },
  { id: 'r2', examTitle: 'Kiểm tra 45 phút - Unit 12', score: 9.0, totalQuestions: 30, dateTaken: '2025-11-05T15:00:00Z' },
  { id: 'r3', examTitle: 'Đề thi thử TOEIC Reading Part 5', score: 7.0, totalQuestions: 40, dateTaken: '2025-11-01T09:00:00Z' },
];

// Dùng cho tab "Lịch sử giao dịch"
export const mockTransactions: Transaction[] = [
  { id: 't1', date: '2025-11-01T09:05:00Z', description: 'Đăng ký Khóa học IELTS Intensive', amount: 1200000, status: 'success' },
  { id: 't2', date: '2025-10-20T14:22:00Z', description: 'Nâng cấp tài khoản VIP 1 năm', amount: 899000, status: 'success' },
  { id: 't3', date: '2025-10-15T11:00:00Z', description: 'Đăng ký Khóa học TOEIC Căn bản', amount: 500000, status: 'failed' },
];