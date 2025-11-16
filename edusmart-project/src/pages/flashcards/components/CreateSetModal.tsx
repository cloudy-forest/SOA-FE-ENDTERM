// src/pages/flashcards/components/CreateSetModal.tsx
import { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Spinner } from '../../../components/ui/Spinner';

// Inputs cho form
type FormInputs = {
  title: string;
  language: string;
  description: string;
};

// Props cho component
interface CreateSetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormInputs) => Promise<void>; // Hàm xử lý submit từ bên ngoài
}

export const CreateSetModal = ({ isOpen, onClose, onSubmit }: CreateSetModalProps) => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = 
    useForm<FormInputs>({
      defaultValues: {
        title: '',
        language: 'en', // Mặc định là Tiếng Anh
        description: '',
      }
    });

  const handleFormSubmit: SubmitHandler<FormInputs> = async (data) => {
    await onSubmit(data); // Gọi hàm submit (từ TabMySets)
    reset(); // Xóa form
  };

  const handleClose = () => {
    reset(); // Xóa form khi đóng
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
                  Tạo bộ thẻ mới
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ngôn ngữ</label>
                    <select {...register('language')} className="form-input">
                      <option value="en">Tiếng Anh (English)</option>
                      <option value="vi">Tiếng Việt (Vietnamese)</option>
                      <option value="jp">Tiếng Nhật (Japanese)</option>
                      <option value="kr">Tiếng Hàn (Korean)</option>
                      <option value="cn">Tiếng Trung (Chinese)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
                    <textarea {...register('description')} className="form-input" rows={3} />
                  </div>
                  
                  <div className="pt-4">
                    <button type="submit" disabled={isSubmitting} className="flex items-center justify-center bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-400">
                      {isSubmitting ? <Spinner size="sm" /> : 'Lưu và Tạo'}
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