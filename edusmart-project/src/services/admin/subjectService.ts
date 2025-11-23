import type { Subject } from '../../types/admin';
import { FAKE_DELAY } from './constants';

// TẠO DATABASE "ẢO" CHO CHỦ ĐỀ 
let subjectsDB: Subject[] = [
  { id: 'math', name: 'Toán' },
  { id: 'physics', name: 'Vật lý' },
  { id: 'chemistry', name: 'Hóa' },
  { id: 'english', name: 'Tiếng Anh' },
  { id: 'ielts', name: 'IELTS' },
  { id: 'toeic', name: 'TOEIC' },
];

// --- BẮT ĐẦU CÁC HÀM API MỚI CHO CHỦ ĐỀ ---
/**
 * Giả lập API: GET /api/admin/subjects
*/
export const fetchAllSubjects = (): Promise<Subject[]> => {
  console.log("(Giả lập API) Đang tải danh sách chủ đề...");
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...subjectsDB]);
    }, FAKE_DELAY);
  });
};

/**
 * Giả lập API: DELETE /api/admin/subjects/:subjectId
 */
export const deleteSubject = (subjectId: string): Promise<{ success: true }> => {
  console.log(`(Giả lập API) Đang xóa chủ đề ID: ${subjectId}`);
  return new Promise((resolve) => {
    setTimeout(() => {
      subjectsDB = subjectsDB.filter(s => s.id !== subjectId);
      resolve({ success: true });
    }, FAKE_DELAY);
  });
};

/**
 * Giả lập API: POST /api/admin/subjects
 * (Tạo chủ đề mới)
 */
export const createSubject = (data: Omit<Subject, 'id'>): Promise<Subject> => {
  console.log("(Giả lập API) Đang tạo chủ đề mới:", data.name);
  return new Promise((resolve) => {
    setTimeout(() => {
      const newSubject: Subject = {
        id: data.name.toLowerCase().replace(/\s+/g, '-'), // Tự tạo ID từ tên
        name: data.name,
      };
      subjectsDB.push(newSubject);
      resolve({ ...newSubject });
    }, FAKE_DELAY);
  });
};

/**
 * Giả lập API: PUT /api/admin/subjects/:subjectId
 * (Cập nhật chủ đề)
 */
export const updateSubject = (subjectId: string, data: Partial<Subject>): Promise<Subject> => {
  console.log(`(Giả lập API) Đang cập nhật chủ đề ID: ${subjectId}`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = subjectsDB.findIndex(s => s.id === subjectId);
      if (index === -1) {
        return reject(new Error('Không tìm thấy chủ đề.'));
      }
      
      const updatedSubject = { ...subjectsDB[index], ...data };
      subjectsDB[index] = updatedSubject;
      
      resolve({ ...updatedSubject });
    }, FAKE_DELAY);
  });
};