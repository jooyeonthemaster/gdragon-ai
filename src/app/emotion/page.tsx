'use client';

import { useState } from 'react';
import GDJourneyFlow from '@/components/GDJourneyFlow';
import Link from 'next/link';

export default function EmotionPage() {
  const [isStarted, setIsStarted] = useState(false);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 relative">
      {!isStarted ? (
        <div className="w-full max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          {/* 뒤로가기 버튼 */}
          <Link
            href="/"
            className="absolute top-8 left-8 text-gray-400 hover:text-gold transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>돌아가기</span>
          </Link>

          {/* 메인 타이틀 */}
          <div className="space-y-4">
            <h1 className="gd-title gd-glow-gold">
              GD SCENT JOURNEY
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 font-light tracking-wide">
              지드래곤을 향한 <span className="text-gold font-semibold">나의 감정</span>
            </p>
          </div>

          {/* 설명 */}
          <div className="gd-glass p-8 rounded-2xl space-y-4 max-w-2xl mx-auto">
            <p className="text-gray-300 text-lg leading-relaxed">
              G-DRAGON의 음악, 그의 예술, 그의 철학.<br />
              당신은 그에게서 무엇을 보았나요?
            </p>
            <p className="text-gray-400 leading-relaxed">
              10개의 질문을 통해 당신의 감정을 분석하고,<br />
              GD의 세계를 담은 향을 추천해드립니다.
            </p>
          </div>

          {/* 시작 버튼 */}
          <button
            onClick={() => setIsStarted(true)}
            className="gd-button group relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-3">
              여정 시작하기
              <svg
                className="w-5 h-5 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </span>
          </button>

          {/* 하단 메타 정보 */}
          <div className="pt-8 space-y-2">
            <p className="text-sm text-gray-500">
              &ldquo;삶은 파도야, 끝없이 부딪치며...&rdquo; - 무제(無題)
            </p>
            <p className="text-xs text-gray-600">
              Powered by Gemini AI
            </p>
          </div>
        </div>
      ) : (
        <GDJourneyFlow />
      )}

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
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
    </main>
  );
}
