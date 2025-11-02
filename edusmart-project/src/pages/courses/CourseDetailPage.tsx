// src/pages/courses/CourseDetailPage.tsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMockCourseById } from '../../data/mockCourses';
import type { Course } from '../../types/course';
import { Spinner } from '../../components/ui/Spinner';

// Import các component con
import { CourseHero } from './components/CourseHero';
import { CourseStickyNav } from './components/CourseStickyNav';
import { CourseOutcomes } from './components/CourseOutcomes';
import { CourseCurriculum } from './components/CourseCurriculum';
import { CourseReviews } from './components/CourseReviews';
import { CourseStickySidebar } from './components/CourseStickySidebar';
//import { CourseInfo } from './components/CourseInfo'; // 

export const CourseDetailPage = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!courseId) return;
    const loadCourse = async () => {
      try {
        setLoading(true);
        const data = await fetchMockCourseById(courseId);
        setCourse(data);
      } catch (err) {
        console.error("Lỗi tải chi tiết khóa học:", err);
      } finally {
        setLoading(false);
      }
    };
    loadCourse();
  }, [courseId]);

  // Hàm JS để cuộn mượt
  const handleScrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -80; // (64px cho header + 16px padding)
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-40"><Spinner /></div>
    );
  }

  if (!course) {
    return (
      <div className="py-40 text-center text-gray-600">Không tìm thấy khóa học.</div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      {/* 1. Hero */}
      <CourseHero course={course} />
      
      {/* 2. Sticky Nav */}
      <CourseStickyNav onSelect={handleScrollToSection} />

      {/* 3. Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Cột trái (Nội dung chính) */}
          <div className="lg:w-2/3 space-y-8">
            <section id="outcomes">
              <CourseOutcomes outcomes={course.outcomes || []} />
            </section>
            
            <section id="info">
              {/* (Component Thông tin chi tiết - Bạn có thể tạo file mới cho nó) */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Thông tin khóa học</h2>
                <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: course.description }} />
              </div>
            </section>
            
            <section id="curriculum">
              <CourseCurriculum sections={course.curriculum || []} />
            </section>
            
            <section id="reviews">
              <CourseReviews
                reviews={course.reviews || []}
                testimonials={course.testimonials || []}
                feedbackImages={course.feedbackImages || []}
                avgRating={course.rating}
                totalStudents={course.students}
              />
            </section>
          </div>

          {/* Cột phải (Sidebar) */}
          <div className="lg:w-1/3">
            <CourseStickySidebar course={course} />
          </div>

        </div>
      </div>
    </div>
  );
};