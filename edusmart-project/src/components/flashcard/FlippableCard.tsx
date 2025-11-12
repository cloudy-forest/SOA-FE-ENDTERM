// src/components/flashcard/FlippableCard.tsx
import { useState, useEffect } from 'react';
import clsx from 'clsx';
import type { FlashcardWord } from '../../types/flashcard';

interface Props {
  word: FlashcardWord;
}

export const FlippableCard = ({ word }: Props) => {
  const [isFlipped, setIsFlipped] = useState(false);

  // Khi từ vựng thay đổi (bấm Next/Prev), thẻ sẽ tự lật về mặt trước
  useEffect(() => {
    setIsFlipped(false);
  }, [word]);

  return (
    <div className="flashcard-container w-full h-64" onClick={() => setIsFlipped(!isFlipped)}>
      <div className={clsx("flashcard", isFlipped && "flipped")}>
        
        {/* Mặt trước (Word) */}
        <div className="flashcard-front">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">{word.text}</h2>
            <p className="text-lg text-gray-500 dark:text-gray-400 mt-2">{word.phonetic}</p>
            <p className="text-md text-blue-600 font-medium mt-1">({word.type_of_text})</p>
          </div>
        </div>

        {/* Mặt sau (Definition) */}
        <div className="flashcard-back">
          <p className="text-lg text-gray-800 dark:text-gray-200 text-center">{word.definition}</p>
        </div>
        
      </div>
    </div>
  );
};