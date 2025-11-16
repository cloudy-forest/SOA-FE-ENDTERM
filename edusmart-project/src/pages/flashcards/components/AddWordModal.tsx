// src/pages/flashcards/components/AddWordModal.tsx
import { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { 
  Dialog, DialogPanel, DialogTitle, Transition, TransitionChild, 
  Disclosure, DisclosureButton, DisclosurePanel 
} from '@headlessui/react';
import { XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { Spinner } from '../../../components/ui/Spinner';
import type { FlashcardWord } from '../../../types/flashcard';

// Kiểu dữ liệu cho form (Giống FlashcardWord nhưng bỏ 'id')
export type WordFormInputs = Omit<FlashcardWord, 'id'>;

interface AddWordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: WordFormInputs) => Promise<void>;
}

export const AddWordModal = ({ isOpen, onClose, onSubmit }: AddWordModalProps) => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = 
    useForm<WordFormInputs>({
      // Giá trị mặc định khi reset form
      defaultValues: {
        text: '',
        definition: '',
        phonetic: '',
        type_of_text: '',
        example: '',
        image_url: '',
        note: '',
      }
    });

  // Khi submit, gọi hàm 'onSubmit' từ bên ngoài
  const handleFormSubmit: SubmitHandler<WordFormInputs> = async (data) => {
    await onSubmit(data);
    reset(); // Tự động xóa form
  };

  // Khi đóng modal, cũng reset form
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
                  Thêm từ mới
                </DialogTitle>
                <button onClick={handleClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                  <XMarkIcon className="w-6 h-6" />
                </button>
                
                <form onSubmit={handleSubmit(handleFormSubmit)} className="mt-4 space-y-4">
                  {/* --- Các trường bắt buộc --- */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Từ mới</label>
                    <input {...register('text', { required: 'Từ mới là bắt buộc' })} className="form-input" />
                    {errors.text && <p className="text-red-500 text-xs mt-1">{errors.text.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Định nghĩa</label>
                    <textarea {...register('definition', { required: 'Định nghĩa là bắt buộc' })} className="form-input" rows={3} />
                    {errors.definition && <p className="text-red-500 text-xs mt-1">{errors.definition.message}</p>}
                  </div>

                  {/* --- Các trường tùy chọn (Disclosure) --- */}
                  <Disclosure>
                    {({ open }) => (
                      <>
                        <DisclosureButton className="flex w-full justify-between items-center rounded-lg bg-gray-100 px-4 py-2 text-left text-sm font-medium text-gray-900 hover:bg-gray-200">
                          <span>Thêm phiên âm, ví dụ, ảnh... (Tùy chọn)</span>
                          <ChevronDownIcon className={`${open ? 'rotate-180' : ''} h-5 w-5 text-gray-500 transition-transform`} />
                        </DisclosureButton>
                        <DisclosurePanel className="px-2 pt-4 pb-2 space-y-4 border rounded-lg border-gray-200">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Loại từ (N, Adj, V...)</label>
                            <input {...register('type_of_text')} className="form-input" placeholder="e.g. noun, verb" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phiên âm</label>
                            <input {...register('phonetic')} className="form-input" placeholder="e.g. /wɜːrd/" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Ví dụ</label>
                            <textarea {...register('example')} className="form-input" rows={2} />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Link ảnh (URL)</label>
                            <input {...register('image_url')} className="form-input" placeholder="https://example.com/image.png" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Ghi chú</label>
                            <textarea {...register('note')} className="form-input" rows={2} />
                          </div>
                        </DisclosurePanel>
                      </>
                    )}
                  </Disclosure>
                  
                  {/* --- Nút Lưu --- */}
                  <div className="pt-4">
                    <button type="submit" disabled={isSubmitting} className="flex items-center justify-center bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:bg-gray-400">
                      {isSubmitting ? <Spinner size="sm" /> : 'Lưu'}
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