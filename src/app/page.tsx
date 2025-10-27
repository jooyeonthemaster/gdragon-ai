'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 relative">
      <div className="w-full max-w-6xl mx-auto text-center space-y-12 animate-fade-in">
        {/* 메인 타이틀 */}
        <div className="space-y-4">
          <h1 className="gd-title gd-glow-gold">
            GD SCENT JOURNEY
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 font-light tracking-wide">
            지드래곤을 향한 <span className="text-gold font-semibold">나의 여정</span>
          </p>
        </div>

        {/* 2개 버튼 선택 */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* 감정 향기 프로그램 */}
          <Link href="/emotion" className="gd-neon-card p-8 space-y-6 group hover:scale-105 transition-transform cursor-pointer">
            <div className="space-y-4">
              <div className="text-5xl">💭</div>
              <h2 className="text-2xl md:text-3xl font-bold gd-glow-gold">
                감정 향기
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                G-DRAGON의 음악, 그의 예술, 그의 철학.<br />
                당신은 그에게서 무엇을 보았나요?
              </p>
              <p className="text-gray-400">
                10개의 질문을 통해 당신의 감정을 분석하고,<br />
                GD의 세계를 담은 향을 추천해드립니다.
              </p>
            </div>
            <div className="flex items-center justify-center gap-2 text-gold group-hover:text-neon-yellow transition-colors">
              <span className="font-semibold">감정 분석 시작</span>
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
            </div>
          </Link>

          {/* GD 그림 프로그램 */}
          <Link href="/art" className="gd-neon-card p-8 space-y-6 group hover:scale-105 transition-transform cursor-pointer">
            <div className="space-y-4">
              <div className="text-5xl">🎨</div>
              <h2 className="text-2xl md:text-3xl font-bold gd-glow-pink">
                나만의 GD
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                당신이 바라본 지드래곤의 모습,<br />
                그것을 그림으로 표현합니다.
              </p>
              <p className="text-gray-400">
                8개의 질문에 답하면,<br />
                AI가 당신만의 개성있는 GD 초상화를 그려드립니다.
              </p>
            </div>
            <div className="flex items-center justify-center gap-2 text-neon-pink group-hover:text-neon-cyan transition-colors">
              <span className="font-semibold">그림 생성 시작</span>
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
            </div>
          </Link>
        </div>

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
