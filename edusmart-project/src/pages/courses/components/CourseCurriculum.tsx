// src/pages/courses/components/CourseCurriculum.tsx
import type { CurriculumSection } from '../../../types/course';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { ChevronUpIcon, PlayCircleIcon, LockClosedIcon } from '@heroicons/react/24/solid';

export const CourseCurriculum = ({ sections }: { sections: CurriculumSection[] }) => (
  <div>
    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
      Chương trình học
    </h2>
    <div className="space-y-3">
      {sections.map(section => (
        <Disclosure as="div" key={section.id} defaultOpen={section.id === 1}>
          {({ open }) => (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <DisclosureButton className="w-full flex justify-between items-center px-5 py-4 text-left">
                <span className="text-lg font-medium text-gray-900 dark:text-white">{section.title}</span>
                <ChevronUpIcon className={`w-5 h-5 text-gray-500 ${!open ? 'transform rotate-180' : ''}`} />
              </DisclosureButton>
              <DisclosurePanel className="px-5 pb-4 border-t border-gray-100 dark:border-gray-700">
                <ul className="divide-y divide-gray-100 dark:divide-gray-700">
                  {section.lessons.map(lesson => (
                    <li key={lesson.id} className="flex justify-between items-center py-3">
                      <div className="flex items-center">
                        {lesson.isFreePreview ? (
                          <PlayCircleIcon className="w-5 h-5 text-blue-500 mr-3" />
                        ) : (
                          <LockClosedIcon className="w-5 h-5 text-gray-400 mr-3" />
                        )}
                        <span className="text-gray-700 dark:text-gray-300">{lesson.title}</span>
                      </div>
                      <span className="text-sm text-gray-500">{lesson.durationMinutes} phút</span>
                    </li>
                  ))}
                </ul>
              </DisclosurePanel>
            </div>
          )}
        </Disclosure>
      ))}
    </div>
  </div>
);