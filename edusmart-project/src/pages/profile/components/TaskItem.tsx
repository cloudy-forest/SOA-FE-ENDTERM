// src/pages/profile/components/TaskItem.tsx
import { useState } from 'react';
import { TrashIcon, PencilIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import type { Task } from '../../../types/schedule';
import { deleteTask, updateTask } from '../../../services/auth/scheduleService';

export const TaskItem = ({ task, onDelete, todoListId }: { task: Task, onDelete: (id: number) => void, todoListId: number }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(task.content);

  // Xóa task
  const handleDelete = async () => {
    if (window.confirm('Xóa nhiệm vụ này?')) {
      await deleteTask(task.id);
      onDelete(task.id);
    }
  };

  // Sửa nội dung task
  const handleSave = async () => {
    if (!editContent.trim()) return;
    try {
      await updateTask(todoListId, task.id, { content: editContent });
      setIsEditing(false);
    } catch (error) {
      console.error("Lỗi update nội dung:", error);
      alert("Lỗi khi cập nhật task");
    }
  };

  return (
    <div className="flex items-center justify-between py-2 px-3 bg-white border border-gray-100 rounded-md mb-2 hover:bg-gray-50 group transition-colors">
      {isEditing ? (
        // --- Mode Edit ---
        <div className="flex flex-1 items-center gap-2">
          <input 
            autoFocus
            className="flex-1 text-sm border rounded px-2 py-1 focus:border-blue-500 outline-none"
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSave()}
          />
          <button onClick={handleSave} className="text-green-600 hover:bg-green-50 p-1 rounded"><CheckIcon className="w-4 h-4"/></button>
          <button onClick={() => setIsEditing(false)} className="text-gray-500 hover:bg-gray-100 p-1 rounded"><XMarkIcon className="w-4 h-4"/></button>
        </div>
      ) : (
        // --- Mode View (Không còn Checkbox) ---
        <>
          <div className="flex items-center flex-1">
            {/* Dấu chấm tròn trang trí thay cho checkbox */}
            <div className="w-2 h-2 bg-gray-400 rounded-full mr-3 flex-shrink-0"></div>
            <span className="text-gray-700 text-sm break-words">
              {editContent}
            </span>
          </div>
          
          {/* Các nút thao tác (Hiện khi hover) */}
          <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity gap-1">
            <button onClick={() => setIsEditing(true)} className="text-gray-400 hover:text-blue-500 p-1" title="Sửa nội dung">
              <PencilIcon className="w-4 h-4" />
            </button>
            <button onClick={handleDelete} className="text-gray-400 hover:text-red-500 p-1" title="Xóa">
              <TrashIcon className="w-4 h-4" />
            </button>
          </div>
        </>
      )}
    </div>
  );
};