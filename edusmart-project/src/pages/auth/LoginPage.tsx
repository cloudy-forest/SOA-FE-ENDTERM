// src/pages/auth/LoginPage.tsx
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { authStart, authFailed, loginSuccess } from '../../app/slices/authSlice';
import type { UserProfile } from '../../types/auth';
import { useState, Fragment } from 'react';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import clsx from 'clsx';
import { GoogleLogin } from '@react-oauth/google';
import type { CredentialResponse } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

// Import hàm mới (đã sửa)
import { loginWithUsername, registerWithUsername } from '../../services/authService';

// --- (Các component con: GoogleLoginButton, OrDivider, AuthInput... giữ nguyên) ---
const GoogleLoginButton = ({ onSuccess, onError }: { onSuccess: (res: CredentialResponse) => void, onError: () => void }) => (
  <div className="flex justify-center"><GoogleLogin onSuccess={onSuccess} onError={onError} shape="rectangular" theme="outline" size="large" width="320px" logo_alignment="left" /></div>
);
const OrDivider = () => (
  <div className="my-6 flex items-center"><div className="flex-grow border-t border-gray-200 dark:border-gray-600"></div><span className="mx-4 flex-shrink text-sm text-gray-500 dark:text-gray-400">HOẶC</span><div className="flex-grow border-t border-gray-200 dark:border-gray-600"></div></div>
);
const AuthInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input {...props} className="form-input" />
);

// --- Component Chính (Đã Cập nhật) ---
export const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/';

  const { status, error } = useAppSelector(state => state.auth);
  const isLoading = status === 'loading';

  // State cho Đăng nhập
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // ▼▼▼ 1. XÓA STATE "registerName" ▼▼▼
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  // Xử lý Google (giữ nguyên)
  const handleGoogleSuccess = (credentialResponse: CredentialResponse) => {
    try {
      const decodedProfile: { name: string; email: string; picture: string; sub: string; } = 
        jwtDecode(credentialResponse.credential as string);
      const userProfile: UserProfile = {
        id: decodedProfile.sub, name: decodedProfile.name,
        email: decodedProfile.email, avatarUrl: decodedProfile.picture, role: 'user',
      };
      dispatch(loginSuccess(userProfile));
      alert(`Chào mừng, ${userProfile.name}!`);
      navigate(redirectUrl, { replace: true });
    } catch (error) { 
      console.error("Lỗi giải mã JWT Google:", error);
      dispatch(authFailed('Lỗi xử lý thông tin Google.')); 
    }
  };
  const handleAuthError = (platform: string) => {
    dispatch(authFailed(`Đăng nhập ${platform} thất bại.`));
  };

  // Hàm Đăng nhập (giữ nguyên)
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    dispatch(authStart());
    try {
      const userData = await loginWithUsername(loginUsername, loginPassword);
      dispatch(loginSuccess(userData));
      if (userData.role === 'admin') {
        navigate('/admin');
      } else {
        navigate(redirectUrl, { replace: true });
      }
    } catch (err: unknown) { 
      if (err instanceof Error) { dispatch(authFailed(err.message)); } 
      else { dispatch(authFailed('Lỗi không xác định')); }
    }
  };

  // ▼▼▼ 2. CẬP NHẬT HÀM ĐĂNG KÝ (Bỏ "name") ▼▼▼
  const handleEmailRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    dispatch(authStart());
    try {
      // Gọi hàm mới (chỉ 2 tham số)
      const newUserData = await registerWithUsername(registerUsername, registerPassword);
      dispatch(loginSuccess(newUserData));
      alert('Đăng ký thành công! Chào mừng bạn!');
      navigate(redirectUrl, { replace: true }); 
    } catch (err: unknown) { 
      if (err instanceof Error) { dispatch(authFailed(err.message)); } 
      else { dispatch(authFailed('Lỗi không xác định')); }
    }
  };

  return (
    <div className="py-16 sm:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md mx-auto px-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          
          <TabGroup>
            {/* (TabList giữ nguyên) */}
            <TabList className="flex space-x-1 rounded-lg bg-gray-100 dark:bg-gray-900 p-1 mb-6">
              <Tab as={Fragment}>
                {({ selected }) => ( <button className={clsx('w-full rounded-lg py-2.5 text-sm font-medium leading-5', 'focus:outline-none', selected ? 'bg-white dark:bg-gray-700 text-blue-700 dark:text-blue-400 shadow' : 'text-gray-500 hover:bg-white/[0.12] dark:hover:text-gray-300' )}>Đăng nhập</button> )}
              </Tab>
              <Tab as={Fragment}>
                {({ selected }) => ( <button className={clsx('w-full rounded-lg py-2.5 text-sm font-medium leading-5', 'focus:outline-none', selected ? 'bg-white dark:bg-gray-700 text-blue-700 dark:text-blue-400 shadow' : 'text-gray-500 hover:bg-white/[0.12] dark:hover:text-gray-300' )}>Đăng ký</button> )}
              </Tab>
            </TabList>

            <TabPanels>
              {/* --- Panel 1: Đăng nhập (Giữ nguyên) --- */}
              <TabPanel className="focus:outline-none">
                <form onSubmit={handleEmailLogin} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tên đăng nhập</label>
                    <AuthInput type="text" value={loginUsername} onChange={e => setLoginUsername(e.target.value)} required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Mật khẩu</label>
                    <AuthInput type="password" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} required />
                  </div>
                  <div className="text-right"><Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">Quên mật khẩu?</Link></div>
                  
                  {error && <p className="text-sm text-center text-red-500">{error}</p>}
                  <button type="submit" disabled={isLoading} className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400">
                    {isLoading ? 'Đang xử lý...' : 'Đăng nhập'}
                  </button>
                </form>
                <OrDivider />
                <GoogleLoginButton onSuccess={handleGoogleSuccess} onError={() => handleAuthError('Google')} />
              </TabPanel>

              {/* --- Panel 2: Đăng ký (Đã sửa) --- */}
              <TabPanel className="focus:outline-none">
                <form onSubmit={handleEmailRegister} className="space-y-4">
                  
                  {/* ▼▼▼ 3. XÓA Ô "Họ và tên" ▼▼▼ */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tên đăng nhập</label>
                    <AuthInput type="text" value={registerUsername} onChange={e => setRegisterUsername(e.target.value)} required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Mật khẩu</label>
                    <AuthInput type="password" value={registerPassword} onChange={e => setRegisterPassword(e.target.value)} required />
                  </div>

                  {error && <p className="text-sm text-center text-red-500">{error}</p>}
                  <button type="submit" disabled={isLoading} className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400">
                    {isLoading ? 'Đang xử lý...' : 'Tạo tài khoản'}
                  </button>
                </form>
                <OrDivider />
                <GoogleLoginButton onSuccess={handleGoogleSuccess} onError={() => handleAuthError('Google')} />
              </TabPanel>
            </TabPanels>
          </TabGroup>
          
          <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-8">
            Bằng việc đăng nhập hoặc đăng ký, bạn đồng ý với <Link to="/terms" className="text-blue-600 hover:underline"> Điều khoản dịch vụ </Link>.
          </p>
        </div>
      </div>
    </div>
  );
};