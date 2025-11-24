// // src/pages/courses/CourseDetailPage.tsx
// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { fetchMockCourseById } from '../../data/mockCourses';
// import type { Course } from '../../types/course';
// import { Spinner } from '../../components/ui/Spinner';

// // Import các component con
// import { CourseHero } from './components/CourseHero';
// import { CourseStickyNav } from './components/CourseStickyNav';
// import { CourseOutcomes } from './components/CourseOutcomes';
// import { CourseCurriculum } from './components/CourseCurriculum';
// import { CourseReviews } from './components/CourseReviews';
// import { CourseStickySidebar } from './components/CourseStickySidebar';
// //import { CourseInfo } from './components/CourseInfo'; // 

// export const CourseDetailPage = () => {
//   const { courseId } = useParams<{ courseId: string }>();
//   const [course, setCourse] = useState<Course | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!courseId) return;
//     const loadCourse = async () => {
//       try {
//         setLoading(true);
//         const data = await fetchMockCourseById(courseId);
//         setCourse(data);
//       } catch (err) {
//         console.error("Lỗi tải chi tiết khóa học:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadCourse();
//   }, [courseId]);

//   // Hàm JS để cuộn mượt
//   const handleScrollToSection = (sectionId: string) => {
//     const element = document.getElementById(sectionId);
//     if (element) {
//       const yOffset = -80; // (64px cho header + 16px padding)
//       const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
//       window.scrollTo({ top: y, behavior: 'smooth' });
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center py-40"><Spinner /></div>
//     );
//   }

//   if (!course) {
//     return (
//       <div className="py-40 text-center text-gray-600">Không tìm thấy khóa học.</div>
//     );
//   }

//   return (
//     <div className="bg-gray-50 dark:bg-gray-900">
//       {/* 1. Hero */}
//       <CourseHero course={course} />
      
//       {/* 2. Sticky Nav */}
//       <CourseStickyNav onSelect={handleScrollToSection} />

//       {/* 3. Main Content */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="flex flex-col lg:flex-row gap-8">
          
//           {/* Cột trái (Nội dung chính) */}
//           <div className="lg:w-2/3 space-y-8">
//             <section id="outcomes">
//               <CourseOutcomes outcomes={course.outcomes || []} />
//             </section>
            
//             <section id="info">
//               {/* (Component Thông tin chi tiết - Bạn có thể tạo file mới cho nó) */}
//               <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
//                 <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Thông tin khóa học</h2>
//                 <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: course.description }} />
//               </div>
//             </section>
            
//             <section id="curriculum">
//               <CourseCurriculum sections={course.curriculum || []} />
//             </section>
            
//             <section id="reviews">
//               <CourseReviews
//                 reviews={course.reviews || []}
//                 testimonials={course.testimonials || []}
//                 feedbackImages={course.feedbackImages || []}
//                 avgRating={course.rating}
//                 totalStudents={course.students}
//               />
//             </section>
//           </div>

//           {/* Cột phải (Sidebar) */}
//           <div className="lg:w-1/3">
//             <CourseStickySidebar course={course} />
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// src/pages/courses/CourseDetailPage.tsx
import { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { getCourseById } from '../../services/product/courseService';
import type {
  CourseDetailResponse,
  Lesson,
  UICourseDetail,
} from '../../types/course';

import {
  mockOutcomes,
  mockCurriculum,
  mockReviews,
  mockTestimonials,
  mockFeedbackImages,
} from '../../data/mockCourses';

import { Spinner } from '../../components/ui/Spinner';

import { CourseHero } from './components/CourseHero';
import { CourseStickyNav } from './components/CourseStickyNav';
import { CourseOutcomes } from './components/CourseOutcomes';
import { CourseCurriculum } from './components/CourseCurriculum';
import { CourseReviews } from './components/CourseReviews';
import { CourseStickySidebar } from './components/CourseStickySidebar';

// Helpers: build curriculum từ Lesson API nếu có
const buildCurriculumFromLessons = (lessons: Lesson[]) => {
  if (!lessons || lessons.length === 0) return mockCurriculum;

  return [
    {
      id: 1,
      title: 'Nội dung khóa học',
      lessons: lessons.map((l, idx) => ({
        id: l.id ?? idx,
        title: l.title,
        durationMinutes: 15,
        isFreePreview: idx === 0,
      })),
    },
  ];
};

export const CourseDetailPage = () => {
  const { courseId } = useParams<{ courseId: string }>();

  const [detail, setDetail] = useState<CourseDetailResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!courseId) return;

    const loadCourse = async () => {
      try {
        setLoading(true);
        const data = await getCourseById(Number(courseId));
        setDetail(data);
      } catch (err) {
        console.error('Lỗi tải chi tiết khóa học:', err);
      } finally {
        setLoading(false);
      }
    };

    loadCourse();
  }, [courseId]);

  const uiCourse: UICourseDetail | null = useMemo(() => {
    if (!detail) return null;
    const { course, subject, lessons } = detail;

    const curriculum =
      lessons && lessons.lessons && lessons.lessons.length > 0
        ? buildCurriculumFromLessons(lessons.lessons)
        : mockCurriculum;

    const totalLessons =
      curriculum?.reduce(
        (sum, section) => sum + section.lessons.length,
        0,
      ) ?? 0;

    return {
      id: course.id,
      title: course.course_name,
      description: course.course_desc,
      price: course.final_price,
      originalPrice: course.initial_price,
      thumbnail: course.thumbnail,
      rating: 4.8,
      students: course.registered_student,
      author: course.teacher_desc || subject.name || 'Giảng viên',
      level: 'Tất cả trình độ',
      category: subject.name || course.subject_name,
      outcomes: mockOutcomes,
      curriculum,
      reviews: mockReviews,
      testimonials: mockTestimonials,
      feedbackImages: mockFeedbackImages,
      totalLessons,
      totalPractice: 0,
      validityText: course.expire_time,
    };
  }, [detail]);

  const handleScrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-40">
        <Spinner />
      </div>
    );
  }

  if (!detail || !uiCourse) {
    return (
      <div className="py-40 text-center text-gray-600 dark:text-gray-300">
        Không tìm thấy khóa học.
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <CourseHero course={uiCourse} />

      <CourseStickyNav onSelect={handleScrollToSection} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cột trái */}
          <div className="lg:w-2/3 space-y-8">
            <section id="outcomes">
              <CourseOutcomes outcomes={uiCourse.outcomes} />
            </section>

            <section id="info">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Thông tin khóa học
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                  {uiCourse.description}
                </p>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                  <div className="bg-gray-50 dark:bg-gray-900/40 rounded-lg p-3">
                    <p className="font-medium text-gray-800 dark:text-gray-100">
                      Giảng viên
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 mt-1">
                      {uiCourse.author}
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-900/40 rounded-lg p-3">
                    <p className="font-medium text-gray-800 dark:text-gray-100">
                      Thời lượng
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 mt-1">
                      {courseId} buổi / {detail.course.study_time} giờ
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-900/40 rounded-lg p-3">
                    <p className="font-medium text-gray-800 dark:text-gray-100">
                      Hạn sử dụng
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 mt-1">
                      {detail.course.expire_time}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section id="curriculum">
              <CourseCurriculum sections={uiCourse.curriculum} />
            </section>

            <section id="reviews">
              <CourseReviews
                reviews={uiCourse.reviews}
                testimonials={uiCourse.testimonials}
                feedbackImages={uiCourse.feedbackImages}
                avgRating={uiCourse.rating}
                totalStudents={uiCourse.students}
              />
            </section>
          </div>

          {/* Cột phải */}
          <div className="lg:w-1/3">
            <CourseStickySidebar course={uiCourse} />
          </div>
        </div>
      </div>
    </div>
  );
};
