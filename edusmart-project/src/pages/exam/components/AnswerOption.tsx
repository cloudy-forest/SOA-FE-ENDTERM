// src/pages/exam/components/AnswerOption.tsx
import React from 'react';
import clsx from 'clsx';

interface AnswerOptionProps {
    index: number;
    text: string;
    isSelected: boolean;
    onSelect: () => void;
    isDisabled: boolean;
}

export const AnswerOption: React.FC<AnswerOptionProps> = ({ index, text, isSelected, onSelect, isDisabled }) => {
    const optionLetter = String.fromCharCode(65 + index); // A, B, C, D

    return (
        <div
            className={clsx(
                'answer-option', 
                isSelected && 'selected',
                isDisabled && 'opacity-70 cursor-not-allowed'
            )}
            onClick={!isDisabled ? onSelect : undefined}
        >
            <label className="flex items-center space-x-3 cursor-pointer w-full">
                <input
                    type="radio"
                    name="answer"
                    value={index}
                    checked={isSelected}
                    onChange={!isDisabled ? onSelect : undefined}
                    disabled={isDisabled}
                    className="flex-shrink-0"
                />
                <span className="font-medium text-gray-700 dark:text-gray-300">{optionLetter}.</span>
                <span 
                    className="text-gray-900 dark:text-gray-100 flex-1"
                    dangerouslySetInnerHTML={{ __html: text }} 
                />
            </label>
        </div>
    );
};