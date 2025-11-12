// src/pages/profile/ScheduleTab.tsx
import { useState, useEffect, Fragment } from 'react';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import type { Schedule, ScheduleStatus } from '../../../types/schedule';
import { deleteSchedule, createSchedule, getSchedules } from '../../../services/authService';
import { Spinner } from '../../../components/ui/Spinner';
import { PlusIcon, TrashIcon, XMarkIcon, PencilIcon, CalendarDaysIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

// --- Form Inputs (Cho Modal) ---
type ScheduleFormInputs = {
  title: string;
  description: string;
  status: ScheduleStatus;
};

// --- Component Modal (Form Tạo/Sửa Lịch học) ---
const ScheduleFormModal = ({
  isOpen,
  onClose,
  onSubmit,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ScheduleFormInputs) => Promise<void>;
  // (Chúng ta sẽ thêm 'defaultValues' cho chức năng Sửa sau)
}) => {
  
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = 
    useForm<ScheduleFormInputs>({
      defaultValues: {
        title: '',
        description: '',
        status: 'planning', // Mặc định
      }
    });

  const handleFormSubmit: SubmitHandler<ScheduleFormInputs> = async (data) => {
    await onSubmit(data);
    reset(); // Xóa form sau khi submit
  };
  
  // Đóng modal và reset form
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
              <DialogPanel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle as="h3" className="text-lg font-medium leading-6 text-gray-900">
                  Tạo Lịch học mới
                </DialogTitle>
                <button onClick={handleClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                  <XMarkIcon className="w-6 h-6" />
                </button>
                
                <form onSubmit={handleSubmit(handleFormSubmit)} className="mt-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề</label>
                    <input {...register('title', { required: 'Tiêu đề là bắt buộc' })} className="form-input" />
                    {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
                    <textarea {...register('description')} className="form-input" rows={3} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Trạng thái</label>
                    <select {...register('status')} className="form-input">
                      <option value="planning">Đang lên kế hoạch</option>
                      <option value="in_progress">Đang thực hiện</option>
                      <option value="completed">Đã hoàn thành</option>
                    </select>
                  </div>
                  
                  <div className="pt-4">
                    <button type="submit" disabled={isSubmitting} className="flex items-center justify-center bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-400">
                      {isSubmitting ? <Spinner size="sm" /> : 'Tạo Lịch học'}
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


// --- Component Tab (Chính) ---
export const ScheduleTab = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Tải data
  const loadSchedules = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getSchedules();
      setSchedules(data.list_schedule);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError('Lỗi không xác định khi tải lịch học.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSchedules();
  }, []);

  // Xử lý Tạo mới
  const handleSubmit = async (data: ScheduleFormInputs) => {
    try {
      await createSchedule(data);
      setIsModalOpen(false); // Đóng modal
      await loadSchedules(); // Tải lại danh sách
    } catch (err: unknown) {
      if (err instanceof Error) alert(`Lỗi: ${err.message}`);
      else alert('Lỗi không xác định.');
    }
  };

  // Xử lý Xóa
  const handleDelete = async (schedule: Schedule) => {
    if (window.confirm(`Bạn có chắc muốn xóa lịch học "${schedule.title}"?`)) {
      try {
        await deleteSchedule(schedule.id);
        await loadSchedules(); // Tải lại
      } catch (err: unknown) {
        if (err instanceof Error) alert(`Lỗi: ${err.message}`);
        else alert('Lỗi không xác định khi xóa.');
      }
    }
  };
  
  // Hiển thị Badge theo Status
  const statusBadge = (status: ScheduleStatus) => {
    switch (status) {
      case 'in_progress': return 'badge-success'; // Màu xanh lá
      case 'planning': return 'badge-info'; // Màu xanh dương
      case 'completed': return 'badge-warning'; // Màu vàng/cam
      default: return 'badge-info';
    }
  };

  if (loading) {
    return <div className="flex justify-center p-12"><Spinner /></div>;
  }
  
  if (error) {
    return <div className="text-red-500 p-6">{error}</div>;
  }

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Lịch học của tôi</h2>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            <PlusIcon className="w-4 h-4 mr-2" />
            Tạo Lịch học
          </button>
        </div>

        {/* Danh sách Lịch học */}
        <div className="space-y-4">
          {schedules.length > 0 ? schedules.map(schedule => (
            <div key={schedule.id} className="border border-gray-200 rounded-lg p-4 flex items-start justify-between">
              <div>
                <div className="flex items-center space-x-3 mb-1">
                  <h3 className="text-lg font-semibold text-gray-800">{schedule.title}</h3>
                  <span className={clsx("badge capitalize", statusBadge(schedule.status))}>
                    {schedule.status.replace('_', ' ')}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{schedule.description}</p>
                <p className="text-xs text-gray-400">
                  Tạo ngày: {new Date(schedule.created_date).toLocaleDateString('vi-VN')}
                </p>
              </div>
              <div className="flex-shrink-0 flex space-x-1">
                {/* (Nút Sửa và Chi tiết sẽ làm sau) */}
                <button 
                  // onClick={() => handleEdit(schedule)}
                  className="p-2 rounded-lg text-indigo-600 hover:bg-indigo-50" title="Sửa (chưa làm)">
                  <PencilIcon className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => handleDelete(schedule)}
                  className="p-2 rounded-lg text-red-600 hover:bg-red-50" title="Xóa">
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          )) : (
            <div className="text-center p-8 border border-dashed rounded-lg">
              <CalendarDaysIcon className="w-12 h-12 mx-auto text-gray-300" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Chưa có Lịch học</h3>
              <p className="mt-1 text-sm text-gray-500">Hãy bắt đầu bằng cách tạo một lịch học mới.</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal Form */}
      <ScheduleFormModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </>
  );
};