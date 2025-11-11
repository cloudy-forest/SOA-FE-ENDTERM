// src/pages/admin/SubjectManagementPage.tsx
import { useState, useEffect, Fragment } from 'react';
import type { Subject } from '../../types/admin';
import { fetchAllSubjects, createSubject, updateSubject, deleteSubject } from '../../services/adminService';
import { Spinner } from '../../components/ui/Spinner';
import { PlusIcon, PencilIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';

type SubjectFormInputs = {
  name: string;
};

// Component Modal (Form)
const SubjectFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  defaultValues,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: SubjectFormInputs) => Promise<void>;
  defaultValues?: SubjectFormInputs;
}) => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<SubjectFormInputs>({
    defaultValues: defaultValues || { name: '' },
  });
  
  // Reset form khi giá trị default thay đổi (khi bấm Sửa)
  useEffect(() => {
    if (defaultValues) reset(defaultValues);
    else reset({ name: '' });
  }, [defaultValues, reset]);

  const handleFormSubmit: SubmitHandler<SubjectFormInputs> = async (data) => {
    await onSubmit(data);
    reset();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle as="h3" className="text-lg font-medium leading-6 text-gray-900">
                  {defaultValues ? 'Cập nhật Chủ đề' : 'Tạo Chủ đề mới'}
                </DialogTitle>
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                  <XMarkIcon className="w-6 h-6" />
                </button>
                
                <form onSubmit={handleSubmit(handleFormSubmit)} className="mt-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tên chủ đề</label>
                    <input 
                      {...register('name', { required: 'Tên là bắt buộc' })}
                      className="form-input" 
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                  </div>
                  
                  <div className="pt-4">
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="flex items-center justify-center bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-400"
                    >
                      {isSubmitting ? <Spinner size="sm" /> : 'Lưu lại'}
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


// Component trang chính
export const SubjectManagementPage = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // State cho Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);

  // Tải data
  const loadSubjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchAllSubjects();
      setSubjects(data);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError('Lỗi không xác định khi tải chủ đề.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSubjects();
  }, []);

  // Mở Modal (Tạo mới)
  const handleAddNew = () => {
    setEditingSubject(null);
    setIsModalOpen(true);
  };

  // Mở Modal (Sửa)
  const handleEdit = (subject: Subject) => {
    setEditingSubject(subject);
    setIsModalOpen(true);
  };
  
  // Đóng Modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingSubject(null);
  };

  // Xử lý Submit (Cả Tạo và Sửa)
  const handleSubmit = async (data: SubjectFormInputs) => {
    try {
      if (editingSubject) {
        // --- CHẾ ĐỘ SỬA ---
        await updateSubject(editingSubject.id, data);
      } else {
        // --- CHẾ ĐỘ TẠO MỚI ---
        await createSubject(data);
      }
      handleCloseModal();
      await loadSubjects(); // Tải lại danh sách
    } catch (err: unknown) {
      if (err instanceof Error) alert(`Lỗi: ${err.message}`);
      else alert('Lỗi không xác định.');
    }
  };

  // Hàm Xóa
  const handleDelete = async (subject: Subject) => {
    if (window.confirm(`Bạn có chắc muốn xóa chủ đề "${subject.name}"?`)) {
      try {
        await deleteSubject(subject.id);
        await loadSubjects(); // Tải lại danh sách
      } catch (err: unknown) {
        if (err instanceof Error) alert(`Lỗi: ${err.message}`);
        else alert('Lỗi không xác định khi xóa.');
      }
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
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Quản lý Chủ đề ({subjects.length})</h2>
          <button 
            onClick={handleAddNew}
            className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            <PlusIcon className="w-4 h-4 mr-2" />
            Thêm chủ đề mới
          </button>
        </div>
        
        {/* Bảng */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên Chủ đề</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID (Slug)</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Hành động</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {subjects.map(subject => (
                <tr key={subject.id} className="table-row">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{subject.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">{subject.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      onClick={() => handleEdit(subject)}
                      className="text-indigo-600 hover:text-indigo-900 mr-3"
                    >
                      <PencilIcon className="w-5 h-5 inline" />
                    </button>
                    <button 
                      onClick={() => handleDelete(subject)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <TrashIcon className="w-5 h-5 inline" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form */}
      <SubjectFormModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        defaultValues={editingSubject || undefined}
      />
    </>
  );
};