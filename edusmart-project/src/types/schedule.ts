// src/types/schedule.ts

// Dựa trên APIdocs (status có thể là 'planning', 'in_progress', 'completed')
export type ScheduleStatus = 'planning' | 'in_progress' | 'completed';

// Dựa trên Output của POST /users/me/schedule
export interface Schedule {
  id: number; // APIdocs ghi 'long', nên dùng 'number'
  title: string;
  description: string;
  status: ScheduleStatus;
  created_date: string; // ISO String
}

// Dựa trên Output của GET /users/me/schedule
export interface ScheduleListResponse {
  total_schedule: number;
  list_schedule: Schedule[];
}