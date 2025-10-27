'use client';

import { useState, useEffect } from 'react';
import type { GDArtQuestion } from '@/data/gdArtQuestions';

interface ArtQuestionCardProps {
  question: GDArtQuestion;
  onAnswer: (answer: string) => void;
  onBack?: () => void;
  prefilledAnswer?: string; // 프리셋 답변
}

export default function ArtQuestionCard({ question, onAnswer, onBack, prefilledAnswer }: ArtQuestionCardProps) {
  const [answer, setAnswer] = useState('');

  // 프리셋 답변이 있으면 자동으로 채움
  useEffect(() => {
    if (prefilledAnswer) {
      setAnswer(prefilledAnswer);
    } else {
      setAnswer('');
    }
  }, [prefilledAnswer, question.id]);

  const handleSubmit = () => {
    if (answer.trim()) {
      onAnswer(answer.trim());
      setAnswer('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="gd-neon-card p-8 space-y-6 animate-fade-in">
      {/* 질문 번호 */}
      <div className="flex items-center justify-between">
        <span className="text-neon-pink text-sm font-bold">Q{question.id}</span>
        {onBack && (
          <button
            onClick={onBack}
            className="text-gray-500 hover:text-gray-300 transition-colors text-sm flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            이전
          </button>
        )}
      </div>

      {/* 질문 텍스트 */}
      <h2 className="text-2xl md:text-3xl font-bold text-gray-100 leading-relaxed">
        {question.question}
      </h2>

      {/* 힌트 */}
      {question.hint && (
        <p className="text-gray-400 text-sm italic">
          💡 {question.hint}
        </p>
      )}

      {/* 답변 입력 */}
      <div className="space-y-4">
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={question.placeholder}
          className="w-full min-h-[120px] p-4 bg-white/90 border border-neon-pink/50 rounded-xl placeholder-gray-500 focus:outline-none focus:border-neon-pink focus:bg-white resize-none transition-all"
          style={{
            color: '#000000',
            caretColor: '#FF10F0',
            WebkitTextFillColor: '#000000',
          }}
          autoFocus
        />

        {/* 제출 버튼 */}
        <button
          onClick={handleSubmit}
          disabled={!answer.trim()}
          className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
            answer.trim()
              ? 'bg-gradient-to-r from-neon-pink to-neon-cyan text-black hover:scale-105 hover:shadow-lg hover:shadow-neon-pink/50'
              : 'bg-grey text-gray-600 cursor-not-allowed'
          }`}
        >
          {answer.trim() ? '다음 질문' : '답변을 입력해주세요'}
        </button>
      </div>

      {/* 키보드 힌트 */}
      <p className="text-xs text-gray-600 text-center">
        💬 Enter 키를 눌러 다음 질문으로 이동할 수 있습니다
      </p>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
