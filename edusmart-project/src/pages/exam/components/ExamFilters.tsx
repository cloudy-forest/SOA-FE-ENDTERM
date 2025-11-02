// src/pages/exam/components/ExamFilters.tsx
import { useState } from 'react';
import { SectionHeader } from '../../../components/ui/SectionHeader';
import { CheckboxPill } from '../../../components/ui/CheckboxPill';
import { 
  subjectFilters, levelFilters, typeFilters 
} from '../../../data/mockExams';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import {
  toggleExamSubject,
  toggleExamLevel,
  toggleExamType,
  clearExamFilters
} from '../../../app/slices/examFilterSlice';
import type { ExamSubject, ExamLevel, ExamType } from '../../../types/exam';

export const ExamFilters = () => {
  const dispatch = useAppDispatch();
  const { subjects, levels, types } = useAppSelector(state => state.examFilter);

  // State cục bộ cho accordion
  const [openSections, setOpenSections] = useState({
    subject: true,
    level: true,
    type: true,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const hasActiveFilters = subjects.length > 0 || levels.length > 0 || types.length > 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 sticky top-24">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Bộ lọc</h2>

      {/* 1. Subject */}
      <div className="mb-4">
        <SectionHeader title="Môn học" isOpen={openSections.subject} onToggle={() => toggleSection('subject')} />
        {openSections.subject && (
          <div className="py-3 flex flex-wrap gap-2">
            {subjectFilters.map((filter: { id: ExamSubject; name: string }) => ( 
              <CheckboxPill
                key={filter.id}
                id={`sub-${filter.id}`}
                label={filter.name}
                checked={subjects.includes(filter.id)}
                onChange={() => dispatch(toggleExamSubject(filter.id))}
              />
            ))}
          </div>
        )}
      </div>

      {/* 2. Level */}
      <div className="mb-4">
        <SectionHeader title="Trình độ" isOpen={openSections.level} onToggle={() => toggleSection('level')} />
        {openSections.level && (
          <div className="py-3 flex flex-wrap gap-2">
            {levelFilters.map((filter: { id: ExamLevel; name: string }) => (
              <CheckboxPill
                key={filter.id}
                id={`lvl-${filter.id}`}
                label={filter.name}
                checked={levels.includes(filter.id)}
                onChange={() => dispatch(toggleExamLevel(filter.id))}
              />
            ))}
          </div>
        )}
      </div>
      
      {/* 3. Type */}
      <div className="mb-4">
        <SectionHeader title="Loại đề" isOpen={openSections.type} onToggle={() => toggleSection('type')} />
        {openSections.type && (
          <div className="py-3 flex flex-wrap gap-2">
            {typeFilters.map((filter: { id: ExamType; name: string }) => (
              <CheckboxPill
                key={filter.id}
                id={`type-${filter.id}`}
                label={filter.name}
                checked={types.includes(filter.id)}
                onChange={() => dispatch(toggleExamType(filter.id))}
              />
            ))}
          </div>
        )}
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <button
          onClick={() => dispatch(clearExamFilters())}
          className="w-full mt-4 text-sm text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
        >
          Xóa tất cả bộ lọc
        </button>
      )}
    </div>
  );
};