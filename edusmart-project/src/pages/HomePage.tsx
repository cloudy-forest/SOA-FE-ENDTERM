// // src/pages/HomePage.tsx
// import { Link } from 'react-router-dom';
// import { useState } from 'react';

// // Import data
// import { allCourses } from '../data/mockCourses';
// import { allExams } from '../data/mockExams';
// import { allArticles } from '../data/mockBlogArticles';

// // Import components
// import { CourseCard } from './courses/components/CourseCard';
// import { ExamCard } from './exam/components/ExamCard';
// import { ArticleCard } from './blog/components/ArticleCard';

// // Import Swiper React components
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// // Import Swiper styles (RẤT QUAN TRỌNG)
// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';

// // Import Icons
// import { 
//   AcademicCapIcon, BookOpenIcon, PencilSquareIcon
// } from '@heroicons/react/24/outline';
// import { ArrowRightIcon } from '@heroicons/react/24/solid';


// // --- Các Section Con Của Trang Chủ ---

// // 1. Hero Carousel (Quảng cáo lướt)
// const HeroCarousel = () => (
//   <section className="relative w-full h-[600px] text-white">
//     <Swiper
//       modules={[Autoplay, Pagination, Navigation]}
//       loop={true}
//       autoplay={{ delay: 5000, disableOnInteraction: false }}
//       pagination={{ clickable: true }}
//       navigation={true}
//       className="h-full"
//     >
//       {/* Slide 1 */}
//       <SwiperSlide className="bg-gradient-to-r from-blue-700 to-indigo-900">
//         <div className="max-w-7xl mx-auto px-6 lg:px-8 h-full flex flex-col justify-center text-left">
//           <h1 className="text-5xl font-extrabold tracking-tight mb-4">Luyện thi THPT Quốc Gia 2026</h1>
//           <p className="text-xl text-blue-100 max-w-2xl mb-8">
//             Bộ đề thi và lộ trình học bám sát cấu trúc mới nhất của Bộ Giáo dục.
//           </p>
//           <div className="flex gap-4">
//             <Link to="/exams" className="px-8 py-3 bg-white text-blue-700 font-semibold rounded-lg shadow-lg hover:bg-gray-100">
//               Xem đề thi
//             </Link>
//           </div>
//         </div>
//       </SwiperSlide>
//       {/* Slide 2 */}
//       <SwiperSlide className="bg-gradient-to-r from-green-600 to-teal-800">
//         <div className="max-w-7xl mx-auto px-6 lg:px-8 h-full flex flex-col justify-center text-left">
//           <h1 className="text-5xl font-extrabold tracking-tight mb-4">Khóa học IELTS 7.5+ Cấp tốc</h1>
//           <p className="text-xl text-green-100 max-w-2xl mb-8">
//             Lộ trình cá nhân hóa, học 1-1 với giảng viên, cam kết đầu ra.
//           </p>
//           <Link to="/courses" className="px-8 py-3 bg-white text-green-700 font-semibold rounded-lg shadow-lg hover:bg-gray-100">
//             Tìm hiểu ngay
//           </Link>
//         </div>
//       </SwiperSlide>
//     </Swiper>
//   </section>
// );

// // 2. Khóa học nổi bật (Carousel)
// const FeaturedCourseCarousel = () => {
//   const featuredCourses = allCourses.slice(0, 8); // Lấy 8 khóa

//   return (
//     <section className="py-16 sm:py-24 bg-white dark:bg-gray-800">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-4">
//           Khóa học online nổi bật
//         </h2>
//         <p className="text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12">
//           Khám phá các khóa học được học viên đánh giá cao nhất và đăng ký nhiều nhất trong tháng.
//         </p>
//         <Swiper
//           modules={[Navigation]}
//           navigation={true}
//           spaceBetween={30}
//           slidesPerView={1}
//           breakpoints={{
//             640: { slidesPerView: 2 },
//             1024: { slidesPerView: 4 },
//           }}
//           className="pb-10" // Thêm padding-bottom cho navigation
//         >
//           {featuredCourses.map(course => (
//             <SwiperSlide key={course.id}>
//               <CourseCard course={course} />
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>
//     </section>
//   );
// };

// // 3. Form Tư vấn (Kết hợp #4 và #8)
// const ConsultationFormSection = () => {
//   const [name, setName] = useState('');
//   const [phone, setPhone] = useState('');

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     alert(`Cảm ơn ${name}! Chúng tôi sẽ liên hệ qua SĐT: ${phone} để tư vấn.`);
//     setName('');
//     setPhone('');
//   };

//   return (
//     <section className="py-16 sm:py-24 bg-gray-50 dark:bg-gray-900">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
//           {/* Cột thông tin */}
//           <div>
//             <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
//               Chưa biết bắt đầu từ đâu?
//             </h2>
//             <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
//               Hãy để lại thông tin, các chuyên gia giáo dục hàng đầu của EduSmart sẽ liên hệ và tư vấn miễn phí lộ trình học cá nhân hóa dành riêng cho bạn.
//             </p>
//             <ul className="space-y-4">
//               <li className="flex items-start">
//                 <AcademicCapIcon className="w-6 h-6 text-blue-600 flex-shrink-0 mr-3 mt-1" />
//                 <span className="text-gray-700 dark:text-gray-300">Phân tích điểm mạnh, điểm yếu.</span>
//               </li>
//               <li className="flex items-start">
//                 <BookOpenIcon className="w-6 h-6 text-blue-600 flex-shrink-0 mr-3 mt-1" />
//                 <span className="text-gray-700 dark:text-gray-300">Thiết kế lộ trình học bám sát mục tiêu (IELTS, THPT QG...).</span>
//               </li>
//               <li className="flex items-start">
//                 <PencilSquareIcon className="w-6 h-6 text-blue-600 flex-shrink-0 mr-3 mt-1" />
//                 <span className="text-gray-700 dark:text-gray-300">Gợi ý các khóa học, tài liệu phù hợp nhất.</span>
//               </li>
//             </ul>
//           </div>
          
//           {/* Cột Form */}
//           <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
//             <h3 className="text-2xl font-semibold text-center text-gray-900 dark:text-white mb-6">
//               Đăng ký tư vấn lộ trình
//             </h3>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div>
//                 <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Họ và tên</label>
//                 <input 
//                   type="text" 
//                   id="name" 
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500" 
//                   placeholder="Nguyễn Văn A" 
//                   required 
//                 />
//               </div>
//               <div>
//                 <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Số điện thoại</label>
//                 <input 
//                   type="tel" 
//                   id="phone" 
//                   value={phone}
//                   onChange={(e) => setPhone(e.target.value)}
//                   className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500" 
//                   placeholder="09xx xxx xxx" 
//                   required 
//                 />
//               </div>
//               <button 
//                 type="submit" 
//                 className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
//               >
//                 Nhận tư vấn miễn phí
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// // 4. Test trình độ (CTA Banner)
// const TestCtaBanner = () => (
//   <section className="bg-indigo-700 text-white">
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
//       <h2 className="text-3xl font-bold mb-4">Test trình độ miễn phí</h2>
//       <p className="text-lg text-indigo-100 max-w-2xl mx-auto mb-8">
//         Làm bài test 15 phút để biết ngay trình độ của bạn và nhận gợi ý lộ trình học phù hợp.
//       </p>
//       <Link 
//         to="/exams" // (Link đến trang test)
//         className="px-8 py-3 bg-white text-indigo-700 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition duration-200"
//       >
//         Làm bài test ngay
//       </Link>
//     </div>
//   </section>
// );

// // 5. Đề thi mới nhất
// const NewestExamsSection = () => {
//   const newestExams = allExams.slice(0, 4); // Lấy 4 đề mới nhất
//   return (
//     <section className="py-16 sm:py-24 bg-white dark:bg-gray-800">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
//           Đề thi mới nhất
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
//           {/* (Dùng 2 cột cho card đề thi to hơn) */}
//           {newestExams.map(exam => (
//             <ExamCard key={exam.id} exam={exam} />
//           ))}
//         </div>
//         <div className="text-center mt-12">
//           <Link
//             to="/exams"
//             className="px-6 py-3 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
//           >
//             Xem tất cả đề thi
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// };

// // 6. Chương trình luyện thi (CTA #7)
// const TrainingProgramCta = () => (
//   <section className="py-16 sm:py-24 bg-gray-50 dark:bg-gray-900">
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//       <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4">
//         <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0">
//           <div className="lg:self-center">
//             <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Chương trình Luyện thi Cấp tốc</h2>
//             <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
//               Tham gia ngay chương trình luyện thi được thiết kế đặc biệt, bám sát đề thi thật, giúp bạn bứt phá điểm số chỉ trong 3 tháng.
//             </p>
//           </div>
//         </div>
//         <div className="flex items-center justify-center p-6 lg:p-0">
//           <Link
//             to="/courses" // (Link đến khóa luyện thi)
//             className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors text-lg"
//           >
//             Đăng ký luyện thi
//           </Link>
//         </div>
//       </div>
//     </div>
//   </section>
// );

// // 7. Blog mới nhất (Bonus)
// const NewestBlogSection = () => {
//   const newestArticles = allArticles.slice(0, 3); // Lấy 3 bài mới nhất
//   return (
//     <section className="py-16 sm:py-24 bg-white dark:bg-gray-800">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
//           Tin tức & Mẹo học tập
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {newestArticles.map(article => (
//             <ArticleCard key={article.id} article={article} />
//           ))}
//         </div>
//         <div className="text-center mt-12">
//           <Link
//             to="/blog"
//             className="inline-flex items-center gap-2 text-base font-medium text-blue-600 hover:text-blue-800"
//           >
//             Xem tất cả bài viết
//             <ArrowRightIcon className="w-4 h-4" />
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// };


// // --- Component Trang Chủ Chính ---
// export const HomePage = () => {
//   return (
//     <>
//       {/* 1. Hero Carousel */}
//       <HeroCarousel />
      
//       {/* 2. Khóa học nổi bật (Carousel) */}
//       <FeaturedCourseCarousel />
      
//       {/* 3. Thông tin & Form Tư vấn */}
//       <ConsultationFormSection />
      
//       {/* 4. Test trình độ (CTA Banner) */}
//       <TestCtaBanner />
      
//       {/* 5. Đề thi mới nhất */}
//       <NewestExamsSection />
      
//       {/* 6. Chương trình luyện thi (CTA) */}
//       <TrainingProgramCta />
      
//       {/* 7. Blog mới nhất (Bonus) */}
//       <NewestBlogSection />
//     </>
//   );
// };

// src/pages/HomePage.tsx
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

// Import data (mock cho exam/blog vẫn giữ nguyên)
import { allExams } from '../data/mockExams';
import { allArticles } from '../data/mockBlogArticles';

// Import services & types cho course
import { getCourses } from '../services/product/courseService';
import type { Course, UICourseListItem } from '../types/course';

// Import components
import { CourseCard } from './courses/components/CourseCard';
import { ExamCard } from './exam/components/ExamCard';
import { ArticleCard } from './blog/components/ArticleCard';
import { Spinner } from '../components/ui/Spinner';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Import Icons
import {
  AcademicCapIcon,
  BookOpenIcon,
  PencilSquareIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/24/solid';

// =========================
// Helper: Map Course(API) -> UICourseListItem(UI)
// =========================
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

// --- Các Section Con Của Trang Chủ ---

// 1. Hero Carousel (Quảng cáo lướt)
const HeroCarousel = () => (
  <section className="relative w-full h-[600px] text-white">
    <Swiper
      modules={[Autoplay, Pagination, Navigation]}
      loop={true}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      navigation={true}
      className="h-full"
    >
      {/* Slide 1 */}
      <SwiperSlide className="bg-gradient-to-r from-blue-700 to-indigo-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-full flex flex-col justify-center text-left">
          <h1 className="text-5xl font-extrabold tracking-tight mb-4">
            Luyện thi THPT Quốc Gia 2026
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mb-8">
            Bộ đề thi và lộ trình học bám sát cấu trúc mới nhất của Bộ Giáo
            dục.
          </p>
          <div className="flex gap-4">
            <Link
              to="/exams"
              className="px-8 py-3 bg-white text-blue-700 font-semibold rounded-lg shadow-lg hover:bg-gray-100"
            >
              Xem đề thi
            </Link>
          </div>
        </div>
      </SwiperSlide>
      {/* Slide 2 */}
      <SwiperSlide className="bg-gradient-to-r from-green-600 to-teal-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-full flex flex-col justify-center text-left">
          <h1 className="text-5xl font-extrabold tracking-tight mb-4">
            Khóa học IELTS 7.5+ Cấp tốc
          </h1>
          <p className="text-xl text-green-100 max-w-2xl mb-8">
            Lộ trình cá nhân hóa, học 1-1 với giảng viên, cam kết đầu ra.
          </p>
          <Link
            to="/courses"
            className="px-8 py-3 bg-white text-green-700 font-semibold rounded-lg shadow-lg hover:bg-gray-100"
          >
            Tìm hiểu ngay
          </Link>
        </div>
      </SwiperSlide>
    </Swiper>
  </section>
);

// 2. Khóa học nổi bật (Carousel) – dùng API thật
const FeaturedCourseCarousel = () => {
  const [courses, setCourses] = useState<UICourseListItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFeaturedCourses = async () => {
      setLoading(true);
      try {
        // Lấy page 1, limit 8, không keyword
        const res = await getCourses(1, 8, '');
        const uiCourses = (res.courses || []).map(mapCourseToUI);
        setCourses(uiCourses);
      } catch (error) {
        console.error('Lỗi tải khóa học nổi bật:', error);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedCourses();
  }, []);

  return (
    <section className="py-16 sm:py-24 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-4">
          Khóa học online nổi bật
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12">
          Khám phá các khóa học được học viên đăng ký và đánh giá cao.
        </p>

        {loading ? (
          <div className="flex justify-center py-10">
            <Spinner />
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400 py-10">
            Hiện chưa có khóa học nào.
          </div>
        ) : (
          <Swiper
            modules={[Navigation]}
            navigation={true}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
            className="pb-10"
          >
            {courses.map((course) => (
              <SwiperSlide key={course.id}>
                <CourseCard course={course} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
};

// 3. Form Tư vấn
const ConsultationFormSection = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(
      `Cảm ơn ${name}! Chúng tôi sẽ liên hệ qua SĐT: ${phone} để tư vấn.`,
    );
    setName('');
    setPhone('');
  };

  return (
    <section className="py-16 sm:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Cột thông tin */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Chưa biết bắt đầu từ đâu?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
              Hãy để lại thông tin, các chuyên gia giáo dục của EduSmart sẽ
              liên hệ và tư vấn miễn phí lộ trình học cá nhân hóa dành riêng
              cho bạn.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start">
                <AcademicCapIcon className="w-6 h-6 text-blue-600 flex-shrink-0 mr-3 mt-1" />
                <span className="text-gray-700 dark:text-gray-300">
                  Phân tích điểm mạnh, điểm yếu.
                </span>
              </li>
              <li className="flex items-start">
                <BookOpenIcon className="w-6 h-6 text-blue-600 flex-shrink-0 mr-3 mt-1" />
                <span className="text-gray-700 dark:text-gray-300">
                  Thiết kế lộ trình học bám sát mục tiêu (IELTS, THPT QG...).
                </span>
              </li>
              <li className="flex items-start">
                <PencilSquareIcon className="w-6 h-6 text-blue-600 flex-shrink-0 mr-3 mt-1" />
                <span className="text-gray-700 dark:text-gray-300">
                  Gợi ý các khóa học, tài liệu phù hợp nhất.
                </span>
              </li>
            </ul>
          </div>

          {/* Cột Form */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-semibold text-center text-gray-900 dark:text-white mb-6">
              Đăng ký tư vấn lộ trình
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Họ và tên
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Nguyễn Văn A"
                  required
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
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="09xx xxx xxx"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Nhận tư vấn miễn phí
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

// 4. Test trình độ (CTA Banner)
const TestCtaBanner = () => (
  <section className="bg-indigo-700 text-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
      <h2 className="text-3xl font-bold mb-4">Test trình độ miễn phí</h2>
      <p className="text-lg text-indigo-100 max-w-2xl mx-auto mb-8">
        Làm bài test 15 phút để biết ngay trình độ của bạn và nhận gợi ý lộ
        trình học phù hợp.
      </p>
      <Link
        to="/exams"
        className="px-8 py-3 bg-white text-indigo-700 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition duration-200"
      >
        Làm bài test ngay
      </Link>
    </div>
  </section>
);

// 5. Đề thi mới nhất
const NewestExamsSection = () => {
  const newestExams = allExams.slice(0, 4);
  return (
    <section className="py-16 sm:py-24 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Đề thi mới nhất
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {newestExams.map((exam) => (
            <ExamCard key={exam.id} exam={exam} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            to="/exams"
            className="px-6 py-3 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
          >
            Xem tất cả đề thi
          </Link>
        </div>
      </div>
    </section>
  );
};

// 6. Chương trình luyện thi (CTA)
const TrainingProgramCta = () => (
  <section className="py-16 sm:py-24 bg-gray-50 dark:bg-gray-900">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4">
        <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0">
          <div className="lg:self-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text:white">
              Chương trình Luyện thi Cấp tốc
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              Tham gia ngay chương trình luyện thi được thiết kế đặc biệt, bám
              sát đề thi thật, giúp bạn bứt phá điểm số chỉ trong 3 tháng.
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center p-6 lg:p-0">
          <Link
            to="/courses"
            className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors text-lg"
          >
            Đăng ký luyện thi
          </Link>
        </div>
      </div>
    </div>
  </section>
);

// 7. Blog mới nhất
const NewestBlogSection = () => {
  const newestArticles = allArticles.slice(0, 3);
  return (
    <section className="py-16 sm:py-24 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Tin tức & Mẹo học tập
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newestArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-base font-medium text-blue-600 hover:text-blue-800"
          >
            Xem tất cả bài viết
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

// --- Component Trang Chủ Chính ---
export const HomePage = () => {
  return (
    <>
      <HeroCarousel />
      <FeaturedCourseCarousel />
      <ConsultationFormSection />
      <TestCtaBanner />
      <NewestExamsSection />
      <TrainingProgramCta />
      <NewestBlogSection />
    </>
  );
};
