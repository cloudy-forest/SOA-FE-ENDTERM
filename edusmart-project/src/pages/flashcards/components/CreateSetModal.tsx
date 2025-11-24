// // src/pages/flashcards/components/CreateSetModal.tsx
// import { Fragment } from 'react';
// import { useForm } from 'react-hook-form';
// import type { SubmitHandler } from 'react-hook-form';
// import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
// import { XMarkIcon } from '@heroicons/react/24/outline';
// import { Spinner } from '../../../components/ui/Spinner';

// // Inputs cho form
// type FormInputs = {
//   title: string;
//   language: string;
//   description: string;
// };

// // Props cho component
// interface CreateSetModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSubmit: (data: FormInputs) => Promise<void>; // Hàm xử lý submit từ bên ngoài
// }

// export const CreateSetModal = ({ isOpen, onClose, onSubmit }: CreateSetModalProps) => {
//   const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = 
//     useForm<FormInputs>({
//       defaultValues: {
//         title: '',
//         language: 'en', // Mặc định là Tiếng Anh
//         description: '',
//       }
//     });

//   const handleFormSubmit: SubmitHandler<FormInputs> = async (data) => {
//     await onSubmit(data); // Gọi hàm submit (từ TabMySets)
//     reset(); // Xóa form
//   };

//   const handleClose = () => {
//     reset(); // Xóa form khi đóng
//     onClose();
//   };

//   return (
//     <Transition appear show={isOpen} as={Fragment}>
//       <Dialog as="div" className="relative z-50" onClose={handleClose}>
//         <TransitionChild as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
//           <div className="fixed inset-0 bg-black/30" />
//         </TransitionChild>
//         <div className="fixed inset-0 overflow-y-auto">
//           <div className="flex min-h-full items-center justify-center p-4">
//             <TransitionChild as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
//               <DialogPanel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
//                 <DialogTitle as="h3" className="text-lg font-medium leading-6 text-gray-900">
//                   Tạo bộ thẻ mới
//                 </DialogTitle>
//                 <button onClick={handleClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
//                   <XMarkIcon className="w-6 h-6" />
//                 </button>
                
//                 <form onSubmit={handleSubmit(handleFormSubmit)} className="mt-4 space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề</label>
//                     <input {...register('title', { required: 'Tiêu đề là bắt buộc' })} className="form-input" />
//                     {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Ngôn ngữ</label>
//                     <select {...register('language')} className="form-input">
//                       <option value="en">Tiếng Anh (English)</option>
//                       <option value="vi">Tiếng Việt (Vietnamese)</option>
//                       <option value="jp">Tiếng Nhật (Japanese)</option>
//                       <option value="kr">Tiếng Hàn (Korean)</option>
//                       <option value="cn">Tiếng Trung (Chinese)</option>
//                     </select>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
//                     <textarea {...register('description')} className="form-input" rows={3} />
//                   </div>
                  
//                   <div className="pt-4">
//                     <button type="submit" disabled={isSubmitting} className="flex items-center justify-center bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-400">
//                       {isSubmitting ? <Spinner size="sm" /> : 'Lưu và Tạo'}
//                     </button>
//                   </div>
//                 </form>
//               </DialogPanel>
//             </TransitionChild>
//           </div>
//         </div>
//       </Dialog>
//     </Transition>
//   );
// };

import { Fragment } from 'react';
import { Dialog, Transition, TransitionChild, DialogPanel, DialogTitle } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Spinner } from '../../../components/ui/Spinner';
import { createOrUpdateFlashCard } from '../../../services/product/flashcardService';
import type { FlashCardInput } from '../../../types/flashcard';

// Form input match với FlashCardDTO của Backend
type CreateSetInputs = {
  title: string;
  description: string;
  language: string;
};

interface CreateSetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void; // Callback để reload list sau khi tạo
}

export const CreateSetModal = ({ isOpen, onClose, onSuccess }: CreateSetModalProps) => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<CreateSetInputs>();

  const onSubmit: SubmitHandler<CreateSetInputs> = async (data) => {
    try {
      // Map dữ liệu sang FlashCardInput
      const payload: FlashCardInput = {
        title: data.title,
        description: data.description,
        language: data.language,
        number_of_word: 0, // Mặc định 0 từ
        // subject_id: ... (Nếu backend hỗ trợ thì thêm dropdown chọn subject ở đây)
      };

      await createOrUpdateFlashCard(payload);
      
      reset();
      onSuccess(); // Báo cho cha biết để reload
      onClose();
    } catch (error) {
      console.error(error);
      alert("Lỗi khi tạo bộ thẻ. Vui lòng thử lại.");
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <TransitionChild as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black/30" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <TransitionChild as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
              <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
                <div className="flex justify-between items-center mb-4">
                  <DialogTitle as="h3" className="text-lg font-bold text-gray-900">
                    Tạo bộ thẻ mới
                  </DialogTitle>
                  <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><XMarkIcon className="w-6 h-6" /></button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tên bộ thẻ</label>
                    <input 
                      {...register('title', { required: 'Tên là bắt buộc' })}
                      className="form-input w-full border border-gray-300 rounded-lg px-3 py-2"
                      placeholder="VD: Từ vựng TOEIC 500"
                    />
                    {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
                    <textarea 
                      {...register('description')}
                      className="form-input w-full border border-gray-300 rounded-lg px-3 py-2"
                      rows={3}
                      placeholder="Mô tả ngắn về bộ thẻ..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ngôn ngữ</label>
                    <select {...register('language')} className="form-select w-full border border-gray-300 rounded-lg px-3 py-2 bg-white">
                      <option value="English">Tiếng Anh</option>
                      <option value="Korean">Tiếng Hàn</option>
                      <option value="Japanese">Tiếng Nhật</option>
                    </select>
                  </div>

                  <div className="mt-6 flex justify-end gap-3">
                    <button type="button" onClick={onClose} className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">Hủy</button>
                    <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center disabled:opacity-70">
                      {isSubmitting && <Spinner size="sm" className="mr-2 text-white" />} Tạo mới
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