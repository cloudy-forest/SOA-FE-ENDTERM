// src/services/auth/scheduleService.ts
import type { Schedule, ScheduleListResponse, ScheduleStatus, ToDoList, Task } from '../../types/schedule';
import { FAKE_DELAY } from './constants';
import { mockDB } from './mockData';

const randomId = () => Math.floor(Math.random() * 100000);

// --- Mock Data (Quan hệ 1-N-N) ---
let mockToDos: ToDoList[] = [
  { id: 1, title: 'Ngày 1: Khởi động', type: 'Daily', status: 'in_progress', schedule_id: 101, implemented_date: '2025-11-20' },
  { id: 2, title: 'Ngày 2: Từ vựng chủ đề 1', type: 'Daily', status: 'pending', schedule_id: 101, implemented_date: '2025-11-21' },
];

let mockTasks: Task[] = [
  { id: 10, content: 'Học 20 từ mới', todo_list_id: 1 },
  { id: 11, content: 'Làm bài test Part 1', todo_list_id: 1 },
  { id: 12, content: 'Nghe chép chính tả', todo_list_id: 2 },
];

// --- SCHEDULE API ---
export const getSchedules = (): Promise<ScheduleListResponse> => {
  return new Promise((resolve) => setTimeout(() => resolve({
    total_schedule: mockDB.schedules.length,
    list_schedule: [...mockDB.schedules]
  }), FAKE_DELAY));
};

export const createSchedule = (data: { title: string, description: string, status: ScheduleStatus }): Promise<Schedule> => {
  return new Promise((resolve) => setTimeout(() => {
    const newS = { id: randomId(), ...data, created_date: new Date().toISOString() };
    mockDB.schedules.push(newS);
    resolve(newS);
  }, FAKE_DELAY));
};

export const updateSchedule = (id: number, data: { title: string, description: string, status: ScheduleStatus }): Promise<Schedule> => {
  return new Promise((resolve, reject) => setTimeout(() => {
    const index = mockDB.schedules.findIndex(s => s.id === id);
    if (index === -1) return reject("Không tìm thấy lịch học");
    
    const updated = { ...mockDB.schedules[index], ...data };
    mockDB.schedules[index] = updated;
    resolve(updated);
  }, FAKE_DELAY));
};

export const deleteSchedule = (id: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(() => {
    mockDB.schedules = mockDB.schedules.filter(s => s.id !== id);
    resolve();
  }, FAKE_DELAY));
};

// --- TODO LIST API ---
export const getToDoListsBySchedule = (scheduleId: number): Promise<ToDoList[]> => {
  return new Promise((resolve) => setTimeout(() => {
    resolve(mockToDos.filter(t => t.schedule_id === scheduleId));
  }, FAKE_DELAY / 2));
};

export const createToDoList = (scheduleId: number, data: { title: string, type: string, implemented_date: string }): Promise<ToDoList> => {
  return new Promise((resolve) => setTimeout(() => {
    const newItem = { id: randomId(), schedule_id: scheduleId, ...data, status: 'pending' };
    mockToDos.push(newItem);
    resolve(newItem);
  }, FAKE_DELAY));
};

export const updateToDoList = (scheduleId: number, todoId: number, data: { title: string, implemented_date: string }): Promise<ToDoList> => {
  return new Promise((resolve, reject) => setTimeout(() => {
    const index = mockToDos.findIndex(t => t.id === todoId);
    if (index === -1) return reject("Không tìm thấy ToDo List");

    const updated = { ...mockToDos[index], ...data };
    mockToDos[index] = updated;
    resolve(updated);
  }, FAKE_DELAY));
};

export const deleteToDoList = (scheduleId: number, todoId: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(() => {
    mockToDos = mockToDos.filter(t => t.id !== todoId);
    // Xóa luôn các task con của nó (Optional logic)
    mockTasks = mockTasks.filter(t => t.todo_list_id !== todoId);
    resolve();
  }, FAKE_DELAY));
};

// --- TASK API ---
export const getTasksByToDoList = (todoListId: number): Promise<Task[]> => {
  return new Promise((resolve) => setTimeout(() => {
    resolve(mockTasks.filter(t => t.todo_list_id === todoListId));
  }, FAKE_DELAY / 3));
};

export const createTask = (todoListId: number, content: string): Promise<Task> => {
  return new Promise((resolve) => setTimeout(() => {
    const newTask = { id: randomId(), content, todo_list_id: todoListId };
    mockTasks.push(newTask);
    resolve(newTask);
  }, FAKE_DELAY));
};

export const updateTask = (todoListId: number, taskId: number, data: { content?: string }): Promise<Task> => {
  return new Promise((resolve, reject) => setTimeout(() => {
    const index = mockTasks.findIndex(t => t.id === taskId);
    if (index === -1) return reject("Không tìm thấy Task");

    const updated = { ...mockTasks[index], ...data };
    mockTasks[index] = updated;
    resolve(updated);
  }, FAKE_DELAY / 2)); // Nhanh hơn chút để checkbox mượt
};


export const deleteTask = (taskId: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(() => {
    mockTasks = mockTasks.filter(t => t.id !== taskId);
    resolve();
  }, FAKE_DELAY));
};