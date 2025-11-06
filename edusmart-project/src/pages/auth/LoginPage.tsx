// src/pages/auth/LoginPage.tsx
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { loginSuccess } from '../../app/slices/authSlice';
import type { UserProfile } from '../../types/auth';

// ▼▼▼ 1. IMPORT CÁC THƯ VIỆN CẦN THIẾT ▼▼▼
import { Fragment } from 'react'; // Chỉ cần Fragment
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import clsx from 'clsx'; // Dùng để tạo class động cho Tab
import { GoogleLogin } from '@react-oauth/google';
import type { CredentialResponse } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

// ▼▼▼ 2. TẠO COMPONENT CON (HELPER) ▼▼▼

// Nút Đăng nhập/Đăng ký Google (tái sử dụng)
// Component này sẽ hiển thị nút Google chính thức
const GoogleLoginButton = ({ 
  onSuccess, 
  onError 
}: { 
  onSuccess: (res: CredentialResponse) => void, 
  onError: () => void 
}) => (
  <div className="flex justify-center pt-8">
    <GoogleLogin
      onSuccess={onSuccess}
      onError={onError}
      shape="rectangular" // Vuông vắn, hiện đại
      theme="outline"      // Viền xám
      size="large"         // Kích thước lớn
      width="320px"        // Chiều rộng cố định
      logo_alignment="left"
    />
  </div>
);

// ▼▼▼ 3. COMPONENT CHÍNH (ĐÃ CẬP NHẬT) ▼▼▼
export const LoginPage = () => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const redirectUrl = searchParams.get('redirect') || '/';

  // --- 1. XỬ LÝ GOOGLE (Cho cả Đăng nhập & Đăng ký) ---
  const handleGoogleSuccess = (credentialResponse: CredentialResponse) => {
    try {
      // Giải mã token
      const decodedProfile: {
        name: string; email: string; picture: string; sub: string;
      } = jwtDecode(credentialResponse.credential as string);
      
      // Chuyển đổi (map) data sang UserProfile
      const userProfile: UserProfile = {
        id: decodedProfile.sub,
        name: decodedProfile.name,
        email: decodedProfile.email,
        avatarUrl: decodedProfile.picture,
      };

      // Gửi thông tin lên Redux
      dispatch(loginSuccess(userProfile));

      // Thông báo và chuyển hướng
      alert(`Chào mừng, ${userProfile.name}!`);
      navigate(redirectUrl, { replace: true });

    } catch (error) {
      console.error("Lỗi giải mã JWT:", error);
      handleGoogleError();
    }
  };

  const handleGoogleError = () => {
    alert('Đăng nhập/Đăng ký với Google thất bại. Vui lòng thử lại.');
  };

  return (
    <div className="py-16 sm:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md mx-auto px-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          
          {/* ▼▼▼ 4. KHUNG TABS (ĐĂNG NHẬP / ĐĂNG KÝ) ▼▼▼ */}
          <TabGroup>
            {/* Thanh chọn Tab */}
            <TabList className="flex space-x-1 rounded-lg bg-gray-100 dark:bg-gray-900 p-1 mb-6">
              <Tab as={Fragment}>
                {({ selected }) => (
                  <button
                    className={clsx(
                      'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                      'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
                      selected
                        ? 'bg-white dark:bg-gray-700 text-blue-700 dark:text-blue-400 shadow'
                        : 'text-gray-500 hover:bg-white/[0.12] dark:hover:text-gray-300'
                    )}
                  >
                    Đăng nhập
                  </button>
                )}
              </Tab>
              <Tab as={Fragment}>
                {({ selected }) => (
                  <button
                    className={clsx(
                      'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                      'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
                      selected
                        ? 'bg-white dark:bg-gray-700 text-blue-700 dark:text-blue-400 shadow'
                        : 'text-gray-500 hover:bg-white/[0.12] dark:hover:text-gray-300'
                    )}
                  >
                    Đăng ký
                  </button>
                )}
              </Tab>
            </TabList>

            {/* Nội dung Tabs */}
            <TabPanels>
              {/* --- Panel 1: Đăng nhập --- */}
              <TabPanel className="focus:outline-none">
                <p className="text-center text-gray-600 dark:text-gray-400">
                  Sử dụng tài khoản Google của bạn để đăng nhập nhanh chóng.
                </p>
                <GoogleLoginButton 
                  onSuccess={handleGoogleSuccess} 
                  onError={handleGoogleError} 
                />
              </TabPanel>

              {/* --- Panel 2: Đăng ký --- */}
              <TabPanel className="focus:outline-none">
                <p className="text-center text-gray-600 dark:text-gray-400">
                  Tạo tài khoản mới bằng Google chỉ với một cú nhấp chuột.
                </p>
                <GoogleLoginButton 
                  onSuccess={handleGoogleSuccess} 
                  onError={handleGoogleError} 
                />
              </TabPanel>
            </TabPanels>
          </TabGroup>
          
          <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-8">
            Bằng việc đăng nhập hoặc đăng ký, bạn đồng ý với 
            <Link to="/terms" className="text-blue-600 hover:underline"> Điều khoản dịch vụ </Link> 
            của chúng tôi.
          </p>

        </div>
      </div>
    </div>
  );
};