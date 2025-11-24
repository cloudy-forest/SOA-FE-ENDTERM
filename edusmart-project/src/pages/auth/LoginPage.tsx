// // src/pages/auth/LoginPage.tsx
// import { Link, useSearchParams, useNavigate } from 'react-router-dom';
// import { useAppDispatch, useAppSelector } from '../../app/hooks';
// import { authStart, authFailed, loginSuccess } from '../../app/slices/authSlice';
// import type { UserProfile } from '../../types/auth';
// import { useState, Fragment } from 'react';
// import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
// import clsx from 'clsx';
// import { GoogleLogin } from '@react-oauth/google';
// import type { CredentialResponse } from '@react-oauth/google';
// import { jwtDecode } from 'jwt-decode';

// import { loginWithUsername, registerWithUsername } from '../../services/authService';

// // --- (Các component con giữ nguyên) ---
// const GoogleLoginButton = ({ onSuccess, onError }: { onSuccess: (res: CredentialResponse) => void, onError: () => void }) => (
//   <div className="flex justify-center"><GoogleLogin onSuccess={onSuccess} onError={onError} shape="rectangular" theme="outline" size="large" width="320px" logo_alignment="left" /></div>
// );
// const OrDivider = () => (
//   <div className="my-6 flex items-center"><div className="flex-grow border-t border-gray-200 dark:border-gray-600"></div><span className="mx-4 flex-shrink text-sm text-gray-500 dark:text-gray-400">HOẶC</span><div className="flex-grow border-t border-gray-200 dark:border-gray-600"></div></div>
// );
// const AuthInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
//   <input {...props} className="form-input" />
// );

// // --- Component Chính (Đã Cập nhật) ---
// export const LoginPage = () => {
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();
//   const [searchParams] = useSearchParams();
//   const redirectUrl = searchParams.get('redirect') || '/';

//   const { status, error } = useAppSelector(state => state.auth);
//   const isLoading = status === 'loading';

//   // State cho Đăng nhập
//   const [loginUsername, setLoginUsername] = useState('');
//   const [loginPassword, setLoginPassword] = useState('');
  
//   // State cho Đăng ký
//   const [registerUsername, setRegisterUsername] = useState('');
//   const [registerPassword, setRegisterPassword] = useState('');

//   // ▼▼▼ 1. THÊM STATE MỚI ▼▼▼
//   const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');
//   const [registerError, setRegisterError] = useState<string | null>(null); // Lỗi cục bộ

//   // Xử lý Google (giữ nguyên)
//   const handleGoogleSuccess = (credentialResponse: CredentialResponse) => {
//     try {
//       const decodedProfile: { name: string; email: string; picture: string; sub: string; } = 
//         jwtDecode(credentialResponse.credential as string);
//       const userProfile: UserProfile = {
//         id: decodedProfile.sub, name: decodedProfile.name,
//         email: decodedProfile.email, avatarUrl: decodedProfile.picture, role: 'user',
//       };
//       dispatch(loginSuccess(userProfile));
//       alert(`Chào mừng, ${userProfile.name}!`);
//       navigate(redirectUrl, { replace: true });
//     } catch (error) { 
//       console.error("Lỗi giải mã JWT Google:", error);
//       dispatch(authFailed('Lỗi xử lý thông tin Google.')); 
//     }
//   };
//   const handleAuthError = (platform: string) => {
//     dispatch(authFailed(`Đăng nhập ${platform} thất bại.`));
//   };

//   // Hàm Đăng nhập (giữ nguyên)
//   const handleEmailLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (isLoading) return;
//     dispatch(authStart());
//     try {
//       const userData = await loginWithUsername(loginUsername, loginPassword);
//       dispatch(loginSuccess(userData));
//       if (userData.role === 'admin') {
//         navigate('/admin');
//       } else {
//         navigate(redirectUrl, { replace: true });
//       }
//     } catch (err: unknown) { 
//       if (err instanceof Error) { dispatch(authFailed(err.message)); } 
//       else { dispatch(authFailed('Lỗi không xác định')); }
//     }
//   };

//   // ▼▼▼ 2. CẬP NHẬT HÀM ĐĂNG KÝ (Thêm kiểm tra) ▼▼▼
//   const handleEmailRegister = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (isLoading) return;

//     // Xóa lỗi cũ
//     setRegisterError(null);

//     // BƯỚC KIỂM TRA MỚI
//     if (registerPassword !== registerConfirmPassword) {
//       setRegisterError('Mật khẩu xác nhận không khớp. Vui lòng thử lại.');
//       return; // Dừng hàm
//     }

//     // Nếu mật khẩu khớp, tiếp tục như cũ
//     dispatch(authStart());
//     try {
//       const newUserData = await registerWithUsername(registerUsername, registerPassword);
//       dispatch(loginSuccess(newUserData));
//       alert('Đăng ký thành công! Chào mừng bạn!');
//       navigate(redirectUrl, { replace: true }); 
//     } catch (err: unknown) { 
//       if (err instanceof Error) { dispatch(authFailed(err.message)); } 
//       else { dispatch(authFailed('Lỗi không xác định')); }
//     }
//   };

//   // Hàm xóa lỗi khi người dùng gõ
//   const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setRegisterPassword(e.target.value);
//     setRegisterError(null); // Xóa lỗi khi gõ
//   };

//   const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setRegisterConfirmPassword(e.target.value);
//     setRegisterError(null); // Xóa lỗi khi gõ
//   };

//   return (
//     <div className="py-16 sm:py-24 bg-gray-50 dark:bg-gray-900">
//       <div className="max-w-md mx-auto px-4">
//         <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          
//           <TabGroup>
//             {/* (TabList giữ nguyên) */}
//             <TabList className="flex space-x-1 rounded-lg bg-gray-100 dark:bg-gray-900 p-1 mb-6">
//               <Tab as={Fragment}>
//                 {({ selected }) => ( <button className={clsx('w-full rounded-lg py-2.5 text-sm font-medium leading-5', 'focus:outline-none', selected ? 'bg-white dark:bg-gray-700 text-blue-700 dark:text-blue-400 shadow' : 'text-gray-500 hover:bg-white/[0.12] dark:hover:text-gray-300' )}>Đăng nhập</button> )}
//               </Tab>
//               <Tab as={Fragment}>
//                 {({ selected }) => ( <button className={clsx('w-full rounded-lg py-2.5 text-sm font-medium leading-5', 'focus:outline-none', selected ? 'bg-white dark:bg-gray-700 text-blue-700 dark:text-blue-400 shadow' : 'text-gray-500 hover:bg-white/[0.12] dark:hover:text-gray-300' )}>Đăng ký</button> )}
//               </Tab>
//             </TabList>

//             <TabPanels>
//               {/* --- Panel 1: Đăng nhập (Giữ nguyên) --- */}
//               <TabPanel className="focus:outline-none">
//                 <form onSubmit={handleEmailLogin} className="space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tên đăng nhập</label>
//                     <AuthInput type="text" value={loginUsername} onChange={e => setLoginUsername(e.target.value)} required />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Mật khẩu</label>
//                     <AuthInput type="password" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} required />
//                   </div>
//                   <div className="text-right"><Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">Quên mật khẩu?</Link></div>
                  
//                   {error && <p className="text-sm text-center text-red-500">{error}</p>}
//                   <button type="submit" disabled={isLoading} className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400">
//                     {isLoading ? 'Đang xử lý...' : 'Đăng nhập'}
//                   </button>
//                 </form>
//                 <OrDivider />
//                 <GoogleLoginButton onSuccess={handleGoogleSuccess} onError={() => handleAuthError('Google')} />
//               </TabPanel>

//               {/* --- Panel 2: Đăng ký (Đã sửa) --- */}
//               <TabPanel className="focus:outline-none">
//                 <form onSubmit={handleEmailRegister} className="space-y-4">
                  
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tên đăng nhập</label>
//                     <AuthInput type="text" value={registerUsername} onChange={e => setRegisterUsername(e.target.value)} required />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Mật khẩu</label>
//                     {/* ▼▼▼ 3. THÊM HÀM onChange MỚI ▼▼▼ */}
//                     <AuthInput type="password" value={registerPassword} onChange={handlePasswordChange} required />
//                   </div>

//                   {/* ▼▼▼ 4. THÊM Ô "XÁC NHẬN MẬT KHẨU" ▼▼▼ */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Xác nhận mật khẩu</label>
//                     <AuthInput type="password" value={registerConfirmPassword} onChange={handleConfirmPasswordChange} required />
//                   </div>
                  
//                   {/* ▼▼▼ 5. HIỂN THỊ LỖI CỤC BỘ HOẶC LỖI API ▼▼▼ */}
//                   {(registerError || error) && (
//                     <p className="text-sm text-center text-red-500">
//                       {registerError || error}
//                     </p>
//                   )}
                  
//                   <button type="submit" disabled={isLoading} className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400">
//                     {isLoading ? 'Đang xử lý...' : 'Tạo tài khoản'}
//                   </button>
//                 </form>
//                 <OrDivider />
//                 <GoogleLoginButton onSuccess={handleGoogleSuccess} onError={() => handleAuthError('Google')} />
//               </TabPanel>
//             </TabPanels>
//           </TabGroup>
          
//           <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-8">
//             Bằng việc đăng nhập hoặc đăng ký, bạn đồng ý với <Link to="/terms" className="text-blue-600 hover:underline"> Điều khoản dịch vụ </Link>.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// src/pages/auth/LoginPage.tsx
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { authStart, authFailed, loginSuccess } from '../../app/slices/authSlice';
import { useState, Fragment } from 'react';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import clsx from 'clsx';
import { loginWithUsername, registerWithUsername } from '../../services/authService';
import bcrypt from 'bcryptjs';

// --- COMPONENT NÚT GOOGLE (Giao diện chuẩn Google Branding Guidelines) ---
const GoogleLoginButton = ({ onClick }: { onClick: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    className="group w-full flex items-center justify-center gap-3 bg-white border border-gray-300 hover:bg-gray-50 hover:border-gray-400 text-gray-700 font-medium py-2.5 px-4 rounded-lg transition-all duration-200 focus:ring-2 focus:ring-offset-1 focus:ring-blue-500"
  >
    {/* Logo Google SVG Chuẩn */}
    <svg className="w-5 h-5" viewBox="0 0 48 48">
      <title>Google Logo</title>
      <clipPath id="g">
        <path d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"/>
      </clipPath>
      <g className="colors" clipPath="url(#g)">
        <path fill="#FBBC05" d="M0 37V11l17 13z"/>
        <path fill="#EA4335" d="M0 11l17 13 7-6.1L48 14V0H0z"/>
        <path fill="#34A853" d="M0 37l30-23 7.9 1L48 0v48H0z"/>
        <path fill="#4285F4" d="M48 48L17 24l-4-3 35-10z"/>
      </g>
    </svg>
    <span>Tiếp tục với Google</span>
  </button>
);

// --- COMPONENT NÚT FACEBOOK (Giao diện chuẩn) ---
const FacebookLoginButton = ({ onClick }: { onClick: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    className="group w-full flex items-center justify-center gap-3 bg-[#1877F2] hover:bg-[#166fe5] text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-200 mt-3 focus:ring-2 focus:ring-offset-1 focus:ring-blue-600"
  >
    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
    <span>Tiếp tục với Facebook</span>
  </button>
);

const OrDivider = () => (
  <div className="my-6 flex items-center">
    <div className="flex-grow border-t border-gray-200 dark:border-gray-600"></div>
    <span className="mx-4 flex-shrink text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Hoặc đăng nhập bằng</span>
    <div className="flex-grow border-t border-gray-200 dark:border-gray-600"></div>
  </div>
);

const AuthInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input {...props} className="form-input" />
);

export const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/';

  const { status, error } = useAppSelector(state => state.auth);
  const isLoading = status === 'loading';

  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');
  const [registerError, setRegisterError] = useState<string | null>(null);

  // --- HÀM CHUYỂN HƯỚNG SANG BACKEND (BẮT BUỘC PHẢI DÙNG CÁCH NÀY) ---
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8090/auth/oauth2/authorization/google";
  };

  const handleFacebookLogin = () => {
     window.location.href = "http://localhost:8090/auth/oauth2/authorization/facebook";
  };
  // ---------------------------------------------------------------------

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

  const handleEmailRegister = async (e: React.FormEvent) => {
      e.preventDefault();
      if (isLoading) return;
      setRegisterError(null);

      if (registerPassword !== registerConfirmPassword) {
        setRegisterError('Mật khẩu xác nhận không khớp.');
        return;
      }

      dispatch(authStart());
      try {
        // ▼▼▼ THỦ THUẬT FIX LỖI BACKEND KHÔNG HASH ▼▼▼
        // Tạo salt và hash password ngay tại frontend
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(registerPassword, salt);
        
        // Gửi password đã mã hóa lên server
        // Server lưu chuỗi này vào DB -> Lúc login sẽ khớp!
        const newUserData = await registerWithUsername(registerUsername, hashedPassword);
        
        dispatch(loginSuccess(newUserData));
        alert('Đăng ký thành công! Chào mừng bạn!');
        navigate(redirectUrl, { replace: true }); 
      } catch (err: unknown) { 
        if (err instanceof Error) { dispatch(authFailed(err.message)); } 
        else { dispatch(authFailed('Lỗi không xác định')); }
      }
  };

  return (
    <div className="py-12 sm:py-20 bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md px-4">
        {/* Logo / Branding */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">EduSmart</h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Học tập thông minh, hiệu quả vượt trội</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
          
          <TabGroup>
            <TabList className="flex space-x-1 rounded-lg bg-gray-100 dark:bg-gray-900 p-1 mb-8">
              <Tab as={Fragment}>
                {({ selected }) => ( <button className={clsx('w-full rounded-md py-2.5 text-sm font-semibold leading-5 transition-all duration-200', 'focus:outline-none', selected ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300' )}>Đăng nhập</button> )}
              </Tab>
              <Tab as={Fragment}>
                {({ selected }) => ( <button className={clsx('w-full rounded-md py-2.5 text-sm font-semibold leading-5 transition-all duration-200', 'focus:outline-none', selected ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300' )}>Đăng ký</button> )}
              </Tab>
            </TabList>

            <TabPanels>
              {/* --- Panel 1: Đăng nhập --- */}
              <TabPanel className="focus:outline-none">
                <form onSubmit={handleEmailLogin} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Tên đăng nhập</label>
                    <AuthInput type="text" value={loginUsername} onChange={e => setLoginUsername(e.target.value)} required placeholder="Nhập username" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Mật khẩu</label>
                    <AuthInput type="password" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} required placeholder="••••••••" />
                    <div className="flex justify-end mt-1">
                       <Link to="/forgot-password" className="text-xs font-medium text-blue-600 hover:text-blue-500 hover:underline">Quên mật khẩu?</Link>
                    </div>
                  </div>
                  
                  {error && <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-lg text-center">{error}</div>}
                  
                  <button type="submit" disabled={isLoading} className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 disabled:bg-blue-400 transition-colors shadow-lg shadow-blue-600/20">
                    {isLoading ? 'Đang xử lý...' : 'Đăng nhập'}
                  </button>
                </form>
                
                <OrDivider />
                
                {/* NÚT GOOGLE / FACEBOOK */}
                <div className="space-y-3">
                   <GoogleLoginButton onClick={handleGoogleLogin} />
                   <FacebookLoginButton onClick={handleFacebookLogin} />
                </div>
              </TabPanel>

              {/* --- Panel 2: Đăng ký --- */}
              <TabPanel className="focus:outline-none">
                <form onSubmit={handleEmailRegister} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Tên đăng nhập</label>
                    <AuthInput type="text" value={registerUsername} onChange={e => setRegisterUsername(e.target.value)} required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Mật khẩu</label>
                    <AuthInput type="password" value={registerPassword} onChange={e => setRegisterPassword(e.target.value)} required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Xác nhận mật khẩu</label>
                    <AuthInput type="password" value={registerConfirmPassword} onChange={e => setRegisterConfirmPassword(e.target.value)} required />
                  </div>
                  
                  {(registerError || error) && (
                    <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-lg text-center">{registerError || error}</div>
                  )}
                  
                  <button type="submit" disabled={isLoading} className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 disabled:bg-blue-400 transition-colors shadow-lg shadow-blue-600/20">
                    {isLoading ? 'Đang xử lý...' : 'Tạo tài khoản miễn phí'}
                  </button>
                </form>
                
                <OrDivider />
                
                <div className="space-y-3">
                   <GoogleLoginButton onClick={handleGoogleLogin} />
                   <FacebookLoginButton onClick={handleFacebookLogin} />
                </div>
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </div>
        
        <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-8 px-4">
          Bằng việc tiếp tục, bạn đồng ý với <Link to="/terms" className="text-blue-600 font-medium hover:underline">Điều khoản dịch vụ</Link> và <Link to="/privacy" className="text-blue-600 font-medium hover:underline">Chính sách bảo mật</Link> của EduSmart.
        </p>
      </div>
    </div>
  );
};