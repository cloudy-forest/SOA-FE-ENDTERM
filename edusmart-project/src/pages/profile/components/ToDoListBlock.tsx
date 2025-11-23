import { useState, useEffect } from 'react';
import { PlusIcon, CalendarIcon } from '@heroicons/react/24/outline';
import type { ToDoList, Task } from '../../../types/schedule';
import { getTasksByToDoList, createTask } from '../../../services/auth/scheduleService';
import { TaskItem } from './TaskItem';
import { Spinner } from '../../../components/ui/Spinner';

export const ToDoListBlock = ({ todo }: { todo: ToDoList }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTaskContent, setNewTaskContent] = useState('');

  useEffect(() => {
    const loadTasks = async () => {
      const data = await getTasksByToDoList(todo.id);
      setTasks(data);
      setLoading(false);
    };
    loadTasks();
  }, [todo.id]);

  const handleAddTask = async () => {
    if (!newTaskContent.trim()) return;
    try {
      const newTask = await createTask(todo.id, newTaskContent);
      setTasks([...tasks, newTask]);
      setNewTaskContent('');
    } catch (error) {
      console.error("Lỗi tạo task", error);
    }
  };

  return (
    <div className="bg-gray-50/50 rounded-xl border border-gray-200 p-4 mb-4 h-full">
      {/* Header của ToDo List */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h4 className="font-semibold text-gray-800">{todo.title}</h4>
          {todo.implemented_date && (
            <div className="flex items-center text-xs text-gray-500 mt-1">
              <CalendarIcon className="w-3 h-3 mr-1" />
              {todo.implemented_date}
            </div>
          )}
        </div>
        <span className="text-xs font-medium bg-blue-100 text-blue-700 px-2 py-1 rounded-full capitalize">
          {todo.type}
        </span>
      </div>

      {/* Danh sách Tasks */}
      {loading ? (
        <div className="py-2 flex justify-center"><Spinner size="sm" /></div>
      ) : (
        <div className="space-y-1">
          {tasks.map(task => (
            <TaskItem 
              key={task.id} 
              task={task} 
              onDelete={(id) => setTasks(tasks.filter(t => t.id !== id))} 
            />
          ))}
        </div>
      )}

      {/* Input thêm Task */}
      <div className="mt-3 flex items-center border-t border-gray-200 pt-2">
        <input 
          type="text"
          placeholder="+ Thêm task mới..."
          className="flex-1 bg-transparent text-sm focus:outline-none py-1 text-gray-700 placeholder-gray-400 transition-colors"
          value={newTaskContent}
          onChange={e => setNewTaskContent(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleAddTask()}
        />
        <button 
          onClick={handleAddTask}
          disabled={!newTaskContent}
          className="ml-2 text-blue-600 hover:text-blue-700 disabled:opacity-50"
        >
          <PlusIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};