// src/types/profile.ts

// Dùng cho tab "Kết quả luyện thi"
export interface ProfileExamResult {
  id: string;
  examTitle: string;
  score: number;
  totalQuestions: number;
  dateTaken: string; // ISO string
}

// Dùng cho tab "Lịch sử giao dịch"
export interface Transaction {
  id: string;
  date: string; // ISO string
  description: string;
  amount: number;
  status: 'success' | 'pending' | 'failed';
}