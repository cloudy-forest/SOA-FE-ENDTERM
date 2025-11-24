// // src/pages/flashcards/components/AddWordModal.tsx
// import { Fragment } from 'react';
// import { useForm } from 'react-hook-form';
// import type { SubmitHandler } from 'react-hook-form';
// import { 
//   Dialog, DialogPanel, DialogTitle, Transition, TransitionChild, 
//   Disclosure, DisclosureButton, DisclosurePanel 
// } from '@headlessui/react';
// import { XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
// import { Spinner } from '../../../components/ui/Spinner';
// import type { FlashcardWord } from '../../../types/flashcard';

// // Kiểu dữ liệu cho form (Giống FlashcardWord nhưng bỏ 'id')
// export type WordFormInputs = Omit<FlashcardWord, 'id'>;

// interface AddWordModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSubmit: (data: WordFormInputs) => Promise<void>;
// }

// export const AddWordModal = ({ isOpen, onClose, onSubmit }: AddWordModalProps) => {
//   const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = 
//     useForm<WordFormInputs>({
//       // Giá trị mặc định khi reset form
//       defaultValues: {
//         text: '',
//         definition: '',
//         phonetic: '',
//         type_of_text: '',
//         example: '',
//         image_url: '',
//         note: '',
//       }
//     });

//   // Khi submit, gọi hàm 'onSubmit' từ bên ngoài
//   const handleFormSubmit: SubmitHandler<WordFormInputs> = async (data) => {
//     await onSubmit(data);
//     reset(); // Tự động xóa form
//   };

//   // Khi đóng modal, cũng reset form
//   const handleClose = () => {
//     reset();
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
//                   Thêm từ mới
//                 </DialogTitle>
//                 <button onClick={handleClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
//                   <XMarkIcon className="w-6 h-6" />
//                 </button>
                
//                 <form onSubmit={handleSubmit(handleFormSubmit)} className="mt-4 space-y-4">
//                   {/* --- Các trường bắt buộc --- */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Từ mới</label>
//                     <input {...register('text', { required: 'Từ mới là bắt buộc' })} className="form-input" />
//                     {errors.text && <p className="text-red-500 text-xs mt-1">{errors.text.message}</p>}
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Định nghĩa</label>
//                     <textarea {...register('definition', { required: 'Định nghĩa là bắt buộc' })} className="form-input" rows={3} />
//                     {errors.definition && <p className="text-red-500 text-xs mt-1">{errors.definition.message}</p>}
//                   </div>

//                   {/* --- Các trường tùy chọn (Disclosure) --- */}
//                   <Disclosure>
//                     {({ open }) => (
//                       <>
//                         <DisclosureButton className="flex w-full justify-between items-center rounded-lg bg-gray-100 px-4 py-2 text-left text-sm font-medium text-gray-900 hover:bg-gray-200">
//                           <span>Thêm phiên âm, ví dụ, ảnh... (Tùy chọn)</span>
//                           <ChevronDownIcon className={`${open ? 'rotate-180' : ''} h-5 w-5 text-gray-500 transition-transform`} />
//                         </DisclosureButton>
//                         <DisclosurePanel className="px-2 pt-4 pb-2 space-y-4 border rounded-lg border-gray-200">
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Loại từ (N, Adj, V...)</label>
//                             <input {...register('type_of_text')} className="form-input" placeholder="e.g. noun, verb" />
//                           </div>
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Phiên âm</label>
//                             <input {...register('phonetic')} className="form-input" placeholder="e.g. /wɜːrd/" />
//                           </div>
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Ví dụ</label>
//                             <textarea {...register('example')} className="form-input" rows={2} />
//                           </div>
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Link ảnh (URL)</label>
//                             <input {...register('image_url')} className="form-input" placeholder="https://example.com/image.png" />
//                           </div>
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Ghi chú</label>
//                             <textarea {...register('note')} className="form-input" rows={2} />
//                           </div>
//                         </DisclosurePanel>
//                       </>
//                     )}
//                   </Disclosure>
                  
//                   {/* --- Nút Lưu --- */}
//                   <div className="pt-4">
//                     <button type="submit" disabled={isSubmitting} className="flex items-center justify-center bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:bg-gray-400">
//                       {isSubmitting ? <Spinner size="sm" /> : 'Lưu'}
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

// src/pages/flashcard/components/AddWordModal.tsx
import { Fragment } from 'react';
import { Dialog, Transition, TransitionChild, DialogPanel, DialogTitle } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Spinner } from '../../../components/ui/Spinner';

// ▼▼▼ ĐỊNH NGHĨA TYPE CHO FORM ▼▼▼
export type WordFormInputs = {
  term: string;        // Người dùng nhập từ (Frontend gọi là term, Backend gọi là text)
  definition: string;
  phonetic: string;
  type: string;        // Danh từ, động từ...
};

interface AddWordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: WordFormInputs) => Promise<void>;
}

export const AddWordModal = ({ isOpen, onClose, onSubmit }: AddWordModalProps) => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<WordFormInputs>();

  const handleFormSubmit: SubmitHandler<WordFormInputs> = async (data) => {
    await onSubmit(data);
    reset(); // Reset form sau khi submit thành công
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <TransitionChild as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black/30" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
              <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex justify-between items-center mb-4">
                  <DialogTitle as="h3" className="text-lg font-bold leading-6 text-gray-900">
                    Thêm từ vựng mới
                  </DialogTitle>
                  <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
                  {/* Term */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Thuật ngữ / Từ vựng</label>
                    <input 
                      {...register('term', { required: 'Vui lòng nhập từ vựng' })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="VD: Apple"
                      autoFocus
                    />
                    {errors.term && <p className="text-red-500 text-xs mt-1">{errors.term.message}</p>}
                  </div>

                  {/* Definition */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Định nghĩa / Nghĩa</label>
                    <textarea 
                      {...register('definition', { required: 'Vui lòng nhập định nghĩa' })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                      rows={3}
                      placeholder="VD: Quả táo"
                    />
                    {errors.definition && <p className="text-red-500 text-xs mt-1">{errors.definition.message}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {/* Phonetic */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phiên âm (Optional)</label>
                      <input 
                        {...register('phonetic')}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="/ˈæp.l̩/"
                      />
                    </div>
                    {/* Type */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Loại từ</label>
                      <select 
                        {...register('type')}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                      >
                        <option value="noun">Danh từ</option>
                        <option value="verb">Động từ</option>
                        <option value="adjective">Tính từ</option>
                        <option value="adverb">Trạng từ</option>
                        <option value="phrase">Cụm từ</option>
                        <option value="other">Khác</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg"
                    >
                      Hủy bỏ
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center disabled:opacity-70"
                    >
                      {isSubmitting ? <Spinner size="sm" className="mr-2 text-white" /> : null}
                      Lưu từ vựng
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