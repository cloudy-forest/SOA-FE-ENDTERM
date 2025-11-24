// // src/pages/checkout/CheckoutPage.tsx
// import { useState, useEffect } from 'react';
// import { useParams, useNavigate, Link } from 'react-router-dom';
// import { useAppSelector } from '../../app/hooks';
// import { fetchMockCourseById } from '../../data/mockCourses';
// import type { Course } from '../../types/course';
// import { Spinner } from '../../components/ui/Spinner';
// import { LockClosedIcon, BanknotesIcon } from '@heroicons/react/24/outline';

// export const CheckoutPage = () => {
//   const { courseId } = useParams<{ courseId: string }>();
//   const navigate = useNavigate();
//   // Lấy user từ Redux (đã được ProtectedRoute đảm bảo là có)
//   const user = useAppSelector(state => state.auth.user); 

//   const [course, setCourse] = useState<Course | null>(null);
//   const [loading, setLoading] = useState(true);

//   // === State cho Form ===
//   // Tự động điền thông tin từ Redux
//   const [name, setName] = useState(user?.name || '');
//   const [email, setEmail] = useState(user?.email || '');
//   const [phone, setPhone] = useState('');
//   const [address, setAddress] = useState('');

//   // Tải thông tin khóa học để biết giá
//   useEffect(() => {
//     if (!courseId) return;
//     const loadCourse = async () => {
//       try {
//         setLoading(true);
//         const data = await fetchMockCourseById(courseId);
//         setCourse(data);
//       } catch (err) { console.error("Lỗi tải khóa học:", err); } 
//       finally { setLoading(false); }
//     };
//     loadCourse();
//   }, [courseId]);

//   // Xử lý khi bấm "Mua ngay"
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // (Trong ứng dụng thật, đây là nơi gọi API backend để tạo đơn hàng)
//     alert('Đơn hàng của bạn đã được gửi! Vui lòng làm theo Hướng dẫn thanh toán bên dưới.');
//     // Chuyển hướng người dùng đến trang profile (tab Lịch sử giao dịch)
//     navigate('/profile'); 
//   };

//   if (loading) {
//     return <div className="flex justify-center items-center py-40"><Spinner /></div>;
//   }

//   if (!course) {
//     return <div className="py-40 text-center text-gray-600 dark:text-gray-400">Không tìm thấy khóa học.</div>;
//   }

//   // Tính toán giá
//   const hasDiscount = course.originalPrice && course.originalPrice > course.price;
//   const finalPrice = course.price;

//   return (
//     <div className="bg-gray-50 dark:bg-gray-900 py-16 sm:py-24">
//       <div className="max-w-2xl mx-auto px-4">
//         {/* 1. Tiêu đề */}
//         <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white">Thanh toán</h1>
//         <p className="text-center text-lg text-gray-600 dark:text-gray-400 mt-2">
//           Bạn đang đăng ký khóa học: <strong className="text-blue-600">{course.title}</strong>
//         </p>

//         <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          
//           {/* 2. Chú thích ưu đãi */}
//           <div className="mb-6">
//             <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Chi tiết ưu đãi</h2>
//             {hasDiscount ? (
//               <div className="mt-2">
//                 <p className="text-gray-500 dark:text-gray-400 line-through">
//                   Giá gốc: {course.originalPrice?.toLocaleString('vi-VN')}đ
//                 </p>
//                 <p className="text-2xl font-bold text-green-600">
//                   Giá ưu đãi: {finalPrice.toLocaleString('vi-VN')}đ
//                 </p>
//               </div>
//             ) : (
//               <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
//                 Giá: {finalPrice.toLocaleString('vi-VN')}đ
//               </p>
//             )}
//           </div>

//           {/* 3. Phương thức thanh toán */}
//           <div className="mb-6">
//             <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Phương thức thanh toán</h2>
//             <div className="mt-2 flex items-center gap-3 p-4 border border-blue-500 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
//               <BanknotesIcon className="w-6 h-6 text-blue-600" />
//               <span className="font-medium text-blue-700 dark:text-blue-300">Chuyển khoản trực tiếp</span>
//             </div>
//           </div>

//           {/* 4. Form thông tin */}
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Thông tin khách hàng</h2>
//             <div>
//               <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Họ và tên</label>
//               <input id="name" type="text" value={name} onChange={e => setName(e.target.value)} required className="form-input" />
//             </div>
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
//               <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required className="form-input" />
//             </div>
//             <div>
//               <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Số điện thoại</label>
//               <input id="phone" type="tel" value={phone} onChange={e => setPhone(e.target.value)} required className="form-input" placeholder="09xx xxx xxx" />
//             </div>
//             <div>
//               <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Địa chỉ (Quận/Huyện, Tỉnh/Thành phố)</label>
//               <input id="address" type="text" value={address} onChange={e => setAddress(e.target.value)} required className="form-input" />
//             </div>
            
//             {/* 5. Button Mua ngay */}
//             <button 
//               type="submit" 
//               className="w-full flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors text-lg"
//             >
//               <LockClosedIcon className="w-5 h-5 mr-2" />
//               Mua ngay ({finalPrice.toLocaleString('vi-VN')}đ)
//             </button>
//           </form>

//           {/* 6. Điều khoản */}
//           <div className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400">
//             <p>Bằng việc bấm "Mua ngay", bạn đồng ý với <Link to="/terms" className="text-blue-600 hover:underline">Điều khoản và Điều kiện giao dịch</Link>.</p>
//           </div>

//           {/* 7. Hướng dẫn thanh toán */}
//           <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-6">
//             <h3 className="text-base font-semibold text-gray-900 dark:text-white">Hướng dẫn thanh toán</h3>
//             <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
//               1. Vui lòng chuyển khoản chính xác số tiền <strong className="text-lg text-gray-800 dark:text-white">{finalPrice.toLocaleString('vi-VN')}đ</strong>.
//               <br />
//               2. Ngân hàng: <strong>Vietcombank</strong>
//               <br />
//               3. Số tài khoản: <strong>0123456789</strong>
//               <br />
//               4. Tên chủ tài khoản: <strong>EDU SMART VN</strong>
//               <br />
//               5. Nội dung chuyển khoản: <strong>{`[SĐT của bạn] [Mã khóa học ${course.id}]`}</strong>
//               <br />
//               (Ví dụ: 0909123456 KHOAHOC {course.id})
//             </p>
//             <p className="text-sm text-red-500 mt-2 font-medium">Khóa học sẽ được kích hoạt trong vòng 15 phút sau khi giao dịch thành công.</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// src/pages/checkout/CheckoutPage.tsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';

import { getCourseById } from '../../services/product/courseService';
import type { Course, CourseDetailResponse, UICourseListItem } from '../../types/course';

import { Spinner } from '../../components/ui/Spinner';
import { LockClosedIcon, BanknotesIcon } from '@heroicons/react/24/outline';

// Helper map Course(API) -> UICourseListItem (giống HomePage)
const mapCourseToUI = (c: Course): UICourseListItem => ({
  id: c.id,
  title: c.course_name,
  description: c.course_desc,
  price: c.final_price,
  originalPrice: c.initial_price,
  thumbnail: c.thumbnail,
  rating: 4.8, // Backend chưa có rating -> mock
  students: c.registered_student,
  author: c.teacher_desc || 'Giảng viên',
  level: 'Tất cả trình độ',
  category: c.subject_name,
});

export const CheckoutPage = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);

  const [course, setCourse] = useState<UICourseListItem | null>(null);
  const [loading, setLoading] = useState(true);

  // Form state
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  // Tải thông tin khóa học từ API
  useEffect(() => {
    if (!courseId) return;

    const loadCourse = async () => {
      try {
        setLoading(true);
        const detail: CourseDetailResponse = await getCourseById(courseId);
        const uiCourse = mapCourseToUI(detail.course);
        setCourse(uiCourse);
      } catch (err) {
        console.error('Lỗi tải khóa học:', err);
        setCourse(null);
      } finally {
        setLoading(false);
      }
    };

    loadCourse();
  }, [courseId]);

  // Xử lý khi bấm "Mua ngay"
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: chỗ này sẽ gọi API tạo đơn hàng thực tế
    alert(
      'Đơn hàng của bạn đã được gửi! Vui lòng làm theo Hướng dẫn thanh toán bên dưới.',
    );
    navigate('/profile');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-40">
        <Spinner />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="py-40 text-center text-gray-600 dark:text-gray-400">
        Không tìm thấy khóa học.
      </div>
    );
  }

  // Tính toán giá
  const hasDiscount =
    course.originalPrice && course.originalPrice > course.price;
  const finalPrice = course.price;

  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-16 sm:py-24">
      <div className="max-w-2xl mx-auto px-4">
        {/* 1. Tiêu đề */}
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
          Thanh toán
        </h1>
        <p className="text-center text-lg text-gray-600 dark:text-gray-400 mt-2">
          Bạn đang đăng ký khóa học:{' '}
          <strong className="text-blue-600">{course.title}</strong>
        </p>

        <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          {/* 2. Chi tiết ưu đãi */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Chi tiết ưu đãi
            </h2>
            {hasDiscount ? (
              <div className="mt-2">
                <p className="text-gray-500 dark:text-gray-400 line-through">
                  Giá gốc:{' '}
                  {course.originalPrice?.toLocaleString('vi-VN')}
                  đ
                </p>
                <p className="text-2xl font-bold text-green-600">
                  Giá ưu đãi: {finalPrice.toLocaleString('vi-VN')}
                  đ
                </p>
              </div>
            ) : (
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                Giá: {finalPrice.toLocaleString('vi-VN')}
                đ
              </p>
            )}
          </div>

          {/* 3. Phương thức thanh toán */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Phương thức thanh toán
            </h2>
            <div className="mt-2 flex items-center gap-3 p-4 border border-blue-500 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
              <BanknotesIcon className="w-6 h-6 text-blue-600" />
              <span className="font-medium text-blue-700 dark:text-blue-300">
                Chuyển khoản trực tiếp
              </span>
            </div>
          </div>

          {/* 4. Form thông tin */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Thông tin khách hàng
            </h2>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Họ và tên
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="form-input"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-input"
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Số điện thoại
              </label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="form-input"
                placeholder="09xx xxx xxx"
              />
            </div>
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Địa chỉ (Quận/Huyện, Tỉnh/Thành phố)
              </label>
              <input
                id="address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                className="form-input"
              />
            </div>

            {/* 5. Button Mua ngay */}
            <button
              type="submit"
              className="w-full flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors text-lg"
            >
              <LockClosedIcon className="w-5 h-5 mr-2" />
              Mua ngay ({finalPrice.toLocaleString('vi-VN')}
              đ)
            </button>
          </form>

          {/* 6. Điều khoản */}
          <div className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400">
            <p>
              Bằng việc bấm &quot;Mua ngay&quot;, bạn đồng ý với{' '}
              <Link
                to="/terms"
                className="text-blue-600 hover:underline"
              >
                Điều khoản và Điều kiện giao dịch
              </Link>
              .
            </p>
          </div>

          {/* 7. Hướng dẫn thanh toán */}
          <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">
              Hướng dẫn thanh toán
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
              1. Vui lòng chuyển khoản chính xác số tiền{' '}
              <strong className="text-lg text-gray-800 dark:text-white">
                {finalPrice.toLocaleString('vi-VN')}
                đ
              </strong>
              .
              <br />
              2. Ngân hàng: <strong>Vietcombank</strong>
              <br />
              3. Số tài khoản: <strong>0123456789</strong>
              <br />
              4. Tên chủ tài khoản: <strong>EDU SMART VN</strong>
              <br />
              5. Nội dung chuyển khoản:{' '}
              <strong>
                {`[SĐT của bạn] [Mã khóa học ${course.id}]`}
              </strong>
              <br />
              (Ví dụ: 0909123456 KHOAHOC {course.id})
            </p>
            <p className="text-sm text-red-500 mt-2 font-medium">
              Khóa học sẽ được kích hoạt trong vòng 15 phút sau khi giao dịch
              thành công.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
