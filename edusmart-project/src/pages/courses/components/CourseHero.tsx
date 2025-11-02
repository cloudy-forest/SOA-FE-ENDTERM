// src/pages/courses/components/CourseHero.tsx
import type { Course } from '../../../types/course';
import { StarIcon } from '@heroicons/react/24/solid';

export const CourseHero = ({ course }: { course: Course }) => (
  <section 
    className="relative py-20 md:py-32 text-white bg-no-repeat bg-cover bg-center"
    style={{ backgroundImage: `url(${course.heroImage})` }}
  >
    {/* Lớp phủ mờ (overlay) */}
    <div className="absolute inset-0 bg-gray-900 bg-opacity-70"></div>
    
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
      <h1 className="text-4xl lg:text-5xl font-extrabold mb-4">{course.title}</h1>
      <p className="text-xl text-gray-200 mb-4 max-w-3xl">{course.promoText}</p>
      <div className="flex items-center gap-4">
        <div className="flex items-center">
          <span className="font-bold text-lg mr-1">{course.rating.toFixed(1)}</span>
          {[...Array(5)].map((_, i) => (
            <StarIcon 
              key={i} 
              className={`w-5 h-5 ${i < Math.floor(course.rating) ? 'text-yellow-400' : 'text-gray-400'}`} 
            />
          ))}
        </div>
        <span className="text-gray-300">({course.students.toLocaleString('vi-VN')} học viên)</span>
      </div>
    </div>
  </section>
);