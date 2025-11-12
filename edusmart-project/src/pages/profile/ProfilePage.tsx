// src/pages/profile/ProfilePage.tsx
import { useState, Fragment } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import clsx from 'clsx';
import { PencilIcon, MapPinIcon, PhoneIcon, EnvelopeIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Spinner } from '../../components/ui/Spinner';
import { updateUserProfile } from '../../services/authService';
import { authStart, authFailed, loginSuccess } from '../../app/slices/authSlice'; // Import actions
import type { UserProfile } from '../../types/auth';
import { ScheduleTab } from './components/ScheduleTab';

// --- Form Inputs (cho Modal) ---
type ProfileFormInputs = {
  name: string;
  email: string;
  phone: string;
  address: string;
  bannerUrl: string;
};

// --- Component Modal Chỉnh sửa ---
const ProfileEditModal = ({
  isOpen,
  onClose,
  user
}: {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
}) => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = 
    useForm<ProfileFormInputs>({
      defaultValues: {
        name: user.name,
        email: user.email,
        phone: user.phone || '',
        address: user.address || '',
        bannerUrl: user.bannerUrl || '',
      }
    });

  const onSubmit: SubmitHandler<ProfileFormInputs> = async (data) => {
    dispatch(authStart());
    try {
      // Gọi API "giả"
      const updatedUser = await updateUserProfile(user.id, data);
      
      // Cập nhật lại Redux state
      dispatch(loginSuccess(updatedUser));
      alert('Cập nhật hồ sơ thành công!');
      onClose(); // Đóng modal

    } catch (err: unknown) {
      if (err instanceof Error) dispatch(authFailed(err.message));
      else dispatch(authFailed('Lỗi không xác định'));
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
              <DialogPanel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle as="h3" className="text-lg font-medium leading-6 text-gray-900">
                  Chỉnh sửa Hồ sơ
                </DialogTitle>
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                  <XMarkIcon className="w-6 h-6" />
                </button>
                
                <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Họ và tên</label>
                    <input {...register('name', { required: 'Tên là bắt buộc' })} className="form-input" />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input {...register('email', { required: 'Email là bắt buộc' })} type="email" className="form-input" />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
                    <input {...register('phone')} className="form-input" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Địa chỉ</label>
                    <input {...register('address')} className="form-input" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">URL Ảnh bìa (Banner)</label>
                    <input {...register('bannerUrl')} className="form-input" />
                  </div>
                  
                  <div className="pt-4">
                    <button type="submit" disabled={isSubmitting} className="flex items-center justify-center bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-400">
                      {isSubmitting ? <Spinner size="sm" /> : 'Lưu thay đổi'}
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


// --- Component Trang Chính ---
export const ProfilePage = () => {
  const user = useAppSelector(state => state.auth.user);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
        <p className="ml-4">Đang tải thông tin người dùng...</p>
      </div>
    );
  }

  const tabClass = ({ selected }: { selected: boolean }) =>
    clsx(
      'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
      'focus:outline-none',
      selected
        ? 'bg-white text-blue-700 shadow'
        : 'text-gray-500 hover:bg-white/[0.6]'
    );

  return (
    <>
      <div className="bg-gray-100 dark:bg-gray-900">
        {/* 1. Phần Banner và Avatar */}
        <div className="relative h-48 md:h-64 bg-gray-300">
          <img 
            src={user.bannerUrl || 'https://images.unsplash.com/photo-1504805572947-34fad45aed93?q=80&w=2070&auto=format&fit=crop'} 
            alt="Ảnh bìa" 
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 bg-gradient-to-t from-black/60 to-transparent">
            <div className="flex items-end space-x-4">
              <img 
                src={user.avatarUrl} 
                alt={user.name}
                className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white shadow-text">{user.name}</h1>
                <p className="text-sm text-gray-200 shadow-text">{user.email}</p>
              </div>
            </div>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="absolute top-4 right-4 bg-white/80 hover:bg-white text-gray-800 px-3 py-2 rounded-lg text-sm font-medium flex items-center shadow-md backdrop-blur-sm"
          >
            <PencilIcon className="w-4 h-4 mr-2" />
            Sửa hồ sơ
          </button>
        </div>

        {/* 2. Phần Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <TabGroup>
            <TabList className="flex space-x-1 rounded-xl bg-blue-100/60 p-1">
              <Tab className={tabClass}>Thông tin cá nhân</Tab>
              <Tab className={tabClass}>Khóa học của tôi</Tab>
              <Tab className={tabClass}>Lịch học (Schedule)</Tab>
            </TabList>
            <TabPanels className="mt-4">
              
              {/* Tab 1: Thông tin cá nhân */}
              <TabPanel className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Thông tin chi tiết</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <EnvelopeIcon className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-700">{user.email}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <PhoneIcon className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-700">{user.phone || 'Chưa cập nhật'}</span>
                  </div>
                  <div className="flex items-center space-x-3 md:col-span-2">
                    <MapPinIcon className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-700">{user.address || 'Chưa cập nhật'}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="font-medium text-gray-500">Vai trò:</span>
                    <span className="badge badge-info capitalize">{user.role}</span>
                  </div>
                </div>
              </TabPanel>

              {/* Tab 2: Khóa học của tôi (Placeholder) */}
              <TabPanel className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Khóa học của tôi</h2>
                <p className="text-gray-600">(Nội dung các khóa học đã đăng ký sẽ hiển thị ở đây...)</p>
              </TabPanel>

              {/* Tab 3: Lịch học (Placeholder) */}
              <TabPanel className="rounded-xl focus:outline-none">
                <ScheduleTab/>
              </TabPanel>

            </TabPanels>
          </TabGroup>
        </div>
      </div>

      {/* 3. Modal (ẩn) */}
      <ProfileEditModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={user}
      />
    </>
  );
};