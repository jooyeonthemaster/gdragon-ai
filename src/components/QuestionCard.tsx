'use client';

import { useState } from 'react';
import { type GDQuestion } from '@/data/gdQuestions';

interface QuestionCardProps {
  question: GDQuestion;
  onAnswer: (answer: string) => void;
  onBack?: () => void;
}

export default function QuestionCard({ question, onAnswer, onBack }: QuestionCardProps) {
  const [textAnswer, setTextAnswer] = useState('');

  const handleSubmit = () => {
    if (textAnswer.trim()) {
      onAnswer(textAnswer.trim());
      setTextAnswer('');
    }
  };

  return (
    <div className="gd-neon-card p-8 space-y-6">
      {/* 질문 */}
      <div className="space-y-4">
        <div className="inline-block px-4 py-1 rounded-full bg-gold/10 border border-gold/30">
          <span className="text-gold text-sm font-semibold">
            Q{question.id}
          </span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
          {question.question}
        </h2>
      </div>

      {/* 답변 입력 */}
      <div className="space-y-4">
        {question.answerType === 'single' && question.options ? (
          // 선택형 질문
          <div className="grid gap-3">
            {question.options.map((option) => (
              <button
                key={option.value}
                onClick={() => onAnswer(option.value)}
                className="gd-glass p-4 rounded-xl text-left hover:border-gold/50 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-gray-200 group-hover:text-gold transition-colors">
                    {option.label}
                  </span>
                  <svg
                    className="w-5 h-5 text-gold opacity-0 group-hover:opacity-100 transition-opacity"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </button>
            ))}
          </div>
        ) : (
          // 텍스트 입력형 질문
          <div className="space-y-3">
            <textarea
              value={textAnswer}
              onChange={(e) => setTextAnswer(e.target.value)}
              placeholder="자유롭게 답변해주세요..."
              className="w-full min-h-[120px] p-4 bg-white/5 border border-gold/20 rounded-xl text-gold placeholder:text-gray-500 focus:outline-none focus:border-gold/50 focus:bg-white/10 transition-colors resize-none"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                  handleSubmit();
                }
              }}
            />
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>Cmd/Ctrl + Enter로 제출</span>
              <span>{textAnswer.length} / 500</span>
            </div>
          </div>
        )}
      </div>

      {/* 버튼 영역 */}
      <div className="flex gap-3 pt-4">
        {onBack && (
          <button
            onClick={onBack}
            className="px-6 py-3 rounded-lg border border-gray-600 text-gray-300 hover:border-gray-400 hover:text-white transition-colors"
          >
            이전
          </button>
        )}
        {question.answerType === 'text' && (
          <button
            onClick={handleSubmit}
            disabled={!textAnswer.trim()}
            className="flex-1 gd-button disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>다음</span>
          </button>
        )}
      </div>
    </div>
  );
}
