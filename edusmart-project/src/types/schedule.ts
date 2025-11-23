// src/types/schedule.ts

export type ScheduleStatus = 'planning' | 'in_progress' | 'completed';

export interface Task {
  id: number;
  content: string;
  is_completed: boolean;
  todo_list_id?: number; // Để liên kết với bảng cha
}

export interface ToDoList {
  id: number;
  title: string;
  type: string; // VD: 'Daily', 'Weekly', 'Custom'
  status: string;
  implemented_date?: string;
  schedule_id: number; // Để liên kết với bảng cha
}

export interface Schedule {
  id: number;
  title: string;
  description: string;
  status: ScheduleStatus;
  created_date: string;
}

export interface ScheduleListResponse {
  total_schedule: number;
  list_schedule: Schedule[];
}