// src/pages/auth/LoginPage.tsx
import { Link, useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { loginSuccess } from '../../app/slices/authSlice';
import type { UserProfile } from '../../types/auth';

// SVG cho logo Google (theo chuẩn của Google)
const GoogleIcon = () => (
  <svg className="w-5 h-5 mr-3" viewBox="0 0 48 48">
    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C39.756,34.637,44,29.725,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
  </svg>
);

export const LoginPage = () => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/';

  // ----- Logic Đăng nhập -----
  // (Trong tương lai, chúng ta sẽ gắn Google Identity Services vào đây)
  const handleGoogleLogin = () => {
    alert('Chức năng "Đăng nhập với Google" đang được phát triển!');
  };

  // ----- Nút Mock Login (Để test) -----
  const handleMockLogin = () => {
    const mockUser: UserProfile = {
      id: '12345',
      name: 'Tester EduSmart',
      email: 'tester@edusmart.com',
      avatarUrl: 'https://i.pravatar.cc/150?img=12',
    };
    dispatch(loginSuccess(mockUser));
    // Tự động chuyển hướng về trang trước đó
    // (Trong thực tế, bạn sẽ dùng navigate(redirectUrl, { replace: true }))
    alert('Đăng nhập thử thành công! Giờ bạn sẽ được chuyển hướng...');
    window.location.href = redirectUrl;
  };

  return (
    <div className="py-16 sm:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md mx-auto px-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-2">
            Chào mừng trở lại!
          </h1>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
            Đăng nhập để tiếp tục lộ trình của bạn.
          </p>

          {/* Nút Đăng nhập Google (UI chính thức) */}
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <GoogleIcon />
            Đăng nhập với Google
          </button>
          
          <div className="my-6 flex items-center">
            <div className="flex-grow border-t border-gray-200 dark:border-gray-600"></div>
            <span className="mx-4 flex-shrink text-sm text-gray-500 dark:text-gray-400">hoặc</span>
            <div className="flex-grow border-t border-gray-200 dark:border-gray-600"></div>
          </div>

          {/* Nút Đăng nhập thử (Để test) */}
          <button
            onClick={handleMockLogin}
            className="w-full px-4 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700"
          >
            Đăng nhập thử (Test)
          </button>
          
          <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-6">
            Bằng việc đăng nhập, bạn đồng ý với 
            <Link to="/terms" className="text-blue-600 hover:underline"> Điều khoản dịch vụ </Link> 
            của chúng tôi.
          </p>
        </div>
      </div>
    </div>
  );
};