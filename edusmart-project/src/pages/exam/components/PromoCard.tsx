// src/pages/exam/components/PromoCard.tsx
import { Link } from 'react-router-dom';

export const PromoCard = () => (
  <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-lg shadow-lg p-6">
    <h2 className="text-xl font-bold mb-2">Luyện thi toàn diện</h2>
    <p className="text-sm text-blue-100 mb-4">
      Mở khóa toàn bộ khóa học và ngân hàng đề thi không giới hạn với gói PRO.
    </p>
    <Link 
      to="/courses" // (Sửa link đến trang nâng cấp sau)
      className="block w-full text-center px-4 py-2 text-sm font-semibold bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors"
    >
      Nâng cấp ngay
    </Link>
  </div>
);