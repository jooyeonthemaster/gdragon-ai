'use client';

import { useState, useEffect } from 'react';
import { recommendGDScent, type GDScentProfile } from '@/data/gdScentProfiles';
import type { EmotionalProfile } from '@/lib/geminiService';
import ScentCard from './ScentCard';
import EmotionalRadar from './EmotionalRadar';

interface ResultDisplayProps {
  emotionalProfile: EmotionalProfile;
  answers: any[];
}

export default function ResultDisplay({ emotionalProfile, answers }: ResultDisplayProps) {
  const [recommendedScents, setRecommendedScents] = useState<GDScentProfile[]>([]);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const scents = recommendGDScent(emotionalProfile);
    setRecommendedScents(scents);
  }, [emotionalProfile]);

  return (
    <div className="w-full max-w-6xl mx-auto space-y-12 pb-20">
      {/* 헤더 */}
      <div className="text-center space-y-4 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-bold gd-glow-gold">
          YOUR GD SCENT
        </h1>
        <p className="text-gray-400 text-lg">
          당신의 감정 프로필과 추천 향
        </p>
      </div>

      {/* 감정 프로필 섹션 */}
      <div className="gd-neon-card p-8 space-y-6 animate-fade-in-delay-1">
        <h2 className="text-2xl font-bold text-gold flex items-center gap-3">
          <span className="text-3xl">💭</span>
          당신의 GD 감정 프로필
        </h2>

        <p className="text-gray-300 text-lg leading-relaxed">
          {emotionalProfile.description}
        </p>

        <div className="gd-glass p-6 rounded-xl">
          <p className="text-gray-200 italic">
            &ldquo;{emotionalProfile.personalMessage}&rdquo;
          </p>
        </div>

        {/* 감정 차트 */}
        <div className="pt-4">
          <EmotionalRadar profile={emotionalProfile} />
        </div>

        {/* 상세 점수 토글 */}
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-gold hover:text-neon-yellow transition-colors text-sm flex items-center gap-2"
        >
          {showDetails ? '상세 점수 숨기기' : '상세 점수 보기'}
          <svg
            className={`w-4 h-4 transition-transform ${showDetails ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {showDetails && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 pt-4 animate-fade-in">
            <ScoreCard label="혁명적" score={emotionalProfile.revolutionary} icon="🔥" />
            <ScoreCard label="시적" score={emotionalProfile.poetic} icon="📖" />
            <ScoreCard label="감정적" score={emotionalProfile.emotional} icon="💔" />
            <ScoreCard label="예술적" score={emotionalProfile.artistic} icon="🎨" />
            <ScoreCard label="카리스마" score={emotionalProfile.charismatic} icon="👑" />
          </div>
        )}
      </div>

      {/* 추천 향 섹션 */}
      <div className="space-y-6 animate-fade-in-delay-2">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold gd-glow-pink">
            추천 향
          </h2>
          <p className="text-gray-400">
            당신의 감정과 공명하는 GD의 세계
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {recommendedScents.map((scent, index) => (
            <ScentCard key={scent.id} scent={scent} rank={index + 1} />
          ))}
        </div>
      </div>

      {/* 다시하기 버튼 */}
      <div className="text-center pt-8">
        <button
          onClick={() => window.location.reload()}
          className="gd-glass px-8 py-4 rounded-xl hover:border-gold/50 transition-colors group"
        >
          <span className="flex items-center gap-3 text-gray-300 group-hover:text-gold">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            다시 시작하기
          </span>
        </button>
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

        .animate-fade-in-delay-1 {
          animation: fade-in 0.8s ease-out 0.2s both;
        }

        .animate-fade-in-delay-2 {
          animation: fade-in 0.8s ease-out 0.4s both;
        }
      `}</style>
    </div>
  );
}

function ScoreCard({ label, score, icon }: { label: string; score: number; icon: string }) {
  return (
    <div className="gd-glass p-4 rounded-xl text-center space-y-2">
      <div className="text-2xl">{icon}</div>
      <div className="text-sm text-gray-400">{label}</div>
      <div className="text-3xl font-bold gd-glow-gold">{score}</div>
      <div className="text-xs text-gray-500">/ 10</div>
    </div>
  );
}
