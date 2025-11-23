// src/pages/profile/ScheduleTab.tsx
import { useState, useEffect, Fragment } from 'react';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { 
  Dialog, DialogPanel, DialogTitle, Transition, TransitionChild, 
  Disclosure, DisclosureButton, DisclosurePanel 
} from '@headlessui/react';
import { 
  PlusIcon, TrashIcon, XMarkIcon, ChevronUpIcon, 
  CalendarDaysIcon, PencilIcon
} from '@heroicons/react/24/outline';
import clsx from 'clsx';

import type { Schedule, ScheduleStatus, ToDoList } from '../../../types/schedule';
import { 
  deleteSchedule, createSchedule, updateSchedule, getSchedules, 
  getToDoListsBySchedule, createToDoList 
} from '../../../services/auth/scheduleService';
import { Spinner } from '../../../components/ui/Spinner';
import { ToDoListBlock } from './ToDoListBlock';

// --- Form Inputs ---
type ScheduleFormInputs = {
  title: string;
  description: string;
  status: ScheduleStatus;
};

// --- Component Modal Tạo/Sửa Lịch ---
const ScheduleFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ScheduleFormInputs) => Promise<void>;
  initialData?: Schedule | null;
}) => {
  // ▼▼▼ SỬA LỖI 1: Thêm 'errors' vào đây ▼▼▼
  const { register, handleSubmit, reset, setValue, formState: { isSubmitting, errors } } = 
    useForm<ScheduleFormInputs>({
      defaultValues: { title: '', description: '', status: 'planning' }
    });

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setValue('title', initialData.title);
        setValue('description', initialData.description);
        setValue('status', initialData.status);
      } else {
        reset({ title: '', description: '', status: 'planning' });
      }
    }
  }, [isOpen, initialData, setValue, reset]);

  const handleFormSubmit: SubmitHandler<ScheduleFormInputs> = async (data) => {
    await onSubmit(data);
    onClose();
  };

  // ▼▼▼ SỬA LỖI 2: Khai báo hàm handleClose ▼▼▼
  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleClose}>
        <TransitionChild as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black/30" />
        </TransitionChild>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <TransitionChild as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
              <DialogPanel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
                <div className="flex justify-between items-center mb-4">
                  <DialogTitle as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    {initialData ? 'Cập nhật Lịch học' : 'Tạo Lịch học mới'}
                  </DialogTitle>
                  <button onClick={handleClose} className="text-gray-400 hover:text-gray-600">
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                </div>
                
                <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề</label>
                    <input 
                      {...register('title', { required: 'Tiêu đề là bắt buộc' })} 
                      className="form-input w-full" 
                      placeholder="VD: Lộ trình TOEIC 2 tháng" 
                    />
                    {/* ▼▼▼ SỬA LỖI 1: Dùng biến 'errors' ở đây ▼▼▼ */}
                    {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
                    <textarea {...register('description')} className="form-input w-full" rows={3} placeholder="Mục tiêu, ghi chú..." />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Trạng thái</label>
                    <select {...register('status')} className="form-input w-full">
                      <option value="planning">Đang lên kế hoạch</option>
                      <option value="in_progress">Đang thực hiện</option>
                      <option value="completed">Đã hoàn thành</option>
                    </select>
                  </div>
                  <div className="pt-2 flex justify-end">
                    <button type="submit" disabled={isSubmitting} className="flex items-center bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 transition-colors">
                      {isSubmitting ? <Spinner size="sm" className="text-white" /> : (initialData ? 'Lưu thay đổi' : 'Tạo Lịch')}
                    </button>
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

// --- Component Accordion (Giữ nguyên logic cũ) ---
const ScheduleAccordionItem = ({ schedule, onDelete, onEdit }: { schedule: Schedule, onDelete: (id: number) => void, onEdit: (s: Schedule) => void }) => {
  const [todos, setTodos] = useState<ToDoList[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoadingTodos, setIsLoadingTodos] = useState(false);

  const statusColors = { planning: 'bg-blue-500', in_progress: 'bg-green-500', completed: 'bg-gray-500' };
  const statusText = { planning: 'Lên kế hoạch', in_progress: 'Đang thực hiện', completed: 'Hoàn thành' };

  const handleToggle = async (isOpen: boolean) => {
    if (isOpen && !isLoaded) {
      setIsLoadingTodos(true);
      try {
        const data = await getToDoListsBySchedule(schedule.id);
        setTodos(data);
        setIsLoaded(true);
      } finally { setIsLoadingTodos(false); }
    }
  };

  const handleAddToDo = async () => {
    const title = prompt("Tên danh sách (VD: Ngày 1):");
    if (title) {
      const newTodo = await createToDoList(schedule.id, { title, type: 'Custom', implemented_date: new Date().toISOString().split('T')[0] });
      setTodos([...todos, newTodo]);
    }
  };

  return (
    <Disclosure as="div" className="mb-4 border border-gray-200 rounded-xl bg-white shadow-sm overflow-hidden">
      {({ open }) => {
        if (open && !isLoaded && !isLoadingTodos) setTimeout(() => handleToggle(true), 0);
        return (
        <>
          <DisclosureButton className="w-full flex items-stretch min-h-[80px] hover:bg-gray-50 transition-colors focus:outline-none text-left group">
            <div className={clsx("w-2 flex-shrink-0", statusColors[schedule.status])}></div>
            <div className="flex-1 flex items-center justify-between p-4">
              <div className="flex-1 pr-4">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-lg font-bold text-gray-900">{schedule.title}</h3>
                  <span className="px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">{statusText[schedule.status]}</span>
                </div>
                <p className="text-sm text-gray-500 line-clamp-1">{schedule.description}</p>
                <p className="text-xs text-gray-400 mt-1">Created: {new Date(schedule.created_date).toLocaleDateString('vi-VN')}</p>
              </div>
              <div className="flex items-center gap-2">
                <div onClick={(e) => { e.stopPropagation(); onEdit(schedule); }} className="p-2 text-gray-300 hover:text-blue-500 rounded-full hover:bg-blue-50 transition-all"><PencilIcon className="w-5 h-5" /></div>
                <div onClick={(e) => { e.stopPropagation(); onDelete(schedule.id); }} className="p-2 text-gray-300 hover:text-red-500 rounded-full hover:bg-red-50 transition-all"><TrashIcon className="w-5 h-5" /></div>
                <ChevronUpIcon className={`${open ? 'rotate-180' : ''} h-5 w-5 text-gray-400 transition-transform duration-200`} />
              </div>
            </div>
          </DisclosureButton>
          <DisclosurePanel className="bg-gray-50/50 border-t border-gray-200 p-4">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-sm font-semibold text-gray-700 uppercase">Danh sách công việc</h4>
              <button onClick={handleAddToDo} className="text-sm bg-white border border-blue-200 text-blue-600 px-3 py-1.5 rounded-lg font-medium hover:bg-blue-50 flex items-center shadow-sm"><PlusIcon className="w-4 h-4 mr-1.5" /> Thêm danh sách</button>
            </div>
            {isLoadingTodos ? <div className="flex justify-center py-4"><Spinner size="sm" /></div> : todos.length > 0 ? (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                {todos.map(todo => (
                  <ToDoListBlock key={todo.id} todo={todo} onDeleteBlock={(id) => setTodos(todos.filter(t => t.id !== id))} />
                ))}
              </div>
            ) : <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg"><p className="text-gray-400 text-sm">Chưa có việc làm.</p></div>}
          </DisclosurePanel>
        </>
      )}}
    </Disclosure>
  );
};

// --- Main Component ---
export const ScheduleTab = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<Schedule | null>(null);

  const loadSchedules = async () => {
    try {
      setLoading(true);
      const data = await getSchedules();
      setSchedules(data.list_schedule);
    } finally { setLoading(false); }
  };

  useEffect(() => { loadSchedules(); }, []);

  const handleSave = async (data: ScheduleFormInputs) => {
    try {
      if (editingSchedule) {
        await updateSchedule(editingSchedule.id, data);
      } else {
        await createSchedule(data);
      }
      setIsModalOpen(false);
      setEditingSchedule(null);
      loadSchedules();
    } catch { alert("Lỗi khi lưu lịch học."); }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Xóa lịch trình này?')) {
      await deleteSchedule(id);
      loadSchedules();
    }
  };

  const openCreateModal = () => {
    setEditingSchedule(null);
    setIsModalOpen(true);
  };

  const openEditModal = (schedule: Schedule) => {
    setEditingSchedule(schedule);
    setIsModalOpen(true);
  };

  if (loading) return <div className="flex justify-center p-12"><Spinner /></div>;

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Quản lý Lịch học</h2>
        <button onClick={openCreateModal} className="flex items-center bg-blue-600 text-white px-5 py-2.5 rounded-lg font-bold hover:bg-blue-700 shadow-lg"><PlusIcon className="w-5 h-5 mr-2" /> Tạo Lịch Mới</button>
      </div>
      <div className="space-y-2">
        {schedules.length > 0 ? schedules.map(schedule => (
          <ScheduleAccordionItem 
            key={schedule.id} 
            schedule={schedule} 
            onDelete={handleDelete} 
            onEdit={openEditModal} 
          />
        )) : (
          // ▼▼▼ SỬA LỖI 3: CalendarDaysIcon được dùng ở đây ▼▼▼
          <div className="text-center py-16 bg-white rounded-xl border border-dashed border-gray-300">
            <CalendarDaysIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">Bạn chưa có lịch trình nào</h3>
            <p className="text-gray-500 mt-2 mb-6">Tạo lịch học mới để bắt đầu.</p>
            <button onClick={openCreateModal} className="text-blue-600 font-semibold hover:underline">+ Tạo ngay</button>
          </div>
        )}
      </div>
      <ScheduleFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleSave} 
        initialData={editingSchedule} 
      />
    </div>
  );
};