'use client';

import { useState } from 'react';
import type { GDScentProfile } from '@/data/gdScentProfiles';

interface ScentCardProps {
  scent: GDScentProfile;
  rank: number;
}

export default function ScentCard({ scent, rank }: ScentCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getRankBadge = () => {
    switch (rank) {
      case 1:
        return { emoji: '🥇', label: '1st Match', color: 'gold' };
      case 2:
        return { emoji: '🥈', label: '2nd Match', color: 'neon-cyan' };
      case 3:
        return { emoji: '🥉', label: '3rd Match', color: 'neon-pink' };
      default:
        return { emoji: '✨', label: `${rank}th`, color: 'gray-400' };
    }
  };

  const badge = getRankBadge();

  return (
    <div className="gd-neon-card p-6 space-y-4 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
      {/* 랭크 배지 */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{badge.emoji}</span>
          <span className={`text-sm font-semibold text-${badge.color}`}>{badge.label}</span>
        </div>
        <div className="px-3 py-1 rounded-full bg-black/50 border border-gold/30">
          <span className="text-gold text-xs font-semibold">No.{scent.number}</span>
        </div>
      </div>

      {/* 향 이름 */}
      <div>
        <h3 className="text-2xl font-bold gd-neon-text mb-1">{scent.name}</h3>
        <p className="text-gray-400 text-sm">{scent.mainScent}</p>
      </div>

      {/* GD 연결고리 */}
      <div className="gd-glass p-4 rounded-xl">
        <p className="text-gray-300 text-sm font-medium">{scent.gdConnection}</p>
      </div>

      {/* 무드 */}
      <div className="flex flex-wrap gap-2">
        {scent.mood.split(', ').map((mood, idx) => (
          <span
            key={idx}
            className="px-3 py-1 rounded-full text-xs bg-gold/10 text-gold border border-gold/20"
          >
            {mood}
          </span>
        ))}
      </div>

      {/* 확장 버튼 */}
      <button
        className="w-full flex items-center justify-center gap-2 text-sm text-gray-400 hover:text-gold transition-colors pt-2"
        onClick={(e) => {
          e.stopPropagation();
          setIsExpanded(!isExpanded);
        }}
      >
        {isExpanded ? '접기' : '자세히 보기'}
        <svg
          className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* 확장 영역 */}
      {isExpanded && (
        <div className="space-y-4 pt-4 border-t border-gold/20 animate-fade-in">
          {/* 설명 */}
          <div>
            <h4 className="text-gold font-semibold mb-2">향의 이야기</h4>
            <p className="text-gray-300 text-sm leading-relaxed">{scent.description}</p>
          </div>

          {/* GD 순간 */}
          <div className="gd-glass p-4 rounded-xl">
            <h4 className="text-neon-pink font-semibold mb-2 text-sm">GD Moment</h4>
            <p className="text-gray-300 text-sm italic">{scent.gdMoment}</p>
          </div>

          {/* 추천 이유 */}
          <div>
            <h4 className="text-neon-cyan font-semibold mb-2">추천 이유</h4>
            <p className="text-gray-300 text-sm leading-relaxed">{scent.recommendationReason}</p>
          </div>

          {/* 향 노트 */}
          <div>
            <h4 className="text-gold font-semibold mb-3">향 노트</h4>
            <div className="grid grid-cols-3 gap-2">
              <NoteBar label="시트러스" value={scent.notes.citrus} />
              <NoteBar label="플로럴" value={scent.notes.floral} />
              <NoteBar label="우디" value={scent.notes.woody} />
              <NoteBar label="머스크" value={scent.notes.musk} />
              <NoteBar label="프루티" value={scent.notes.fruity} />
              <NoteBar label="스파이시" value={scent.notes.spicy} />
            </div>
          </div>

          {/* 강도 */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-400">향 강도:</span>
            <div className="flex gap-1">
              {[1, 2, 3].map((level) => (
                <div
                  key={level}
                  className={`w-8 h-2 rounded-full ${
                    (scent.intensityLevel === 'light' && level <= 1) ||
                    (scent.intensityLevel === 'medium' && level <= 2) ||
                    (scent.intensityLevel === 'strong' && level <= 3)
                      ? 'bg-gold'
                      : 'bg-gray-700'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-400 capitalize">{scent.intensityLevel}</span>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            max-height: 0;
          }
          to {
            opacity: 1;
            max-height: 2000px;
          }
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}

function NoteBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center text-xs">
        <span className="text-gray-400">{label}</span>
        <span className="text-gold font-semibold">{value}</span>
      </div>
      <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-gold to-neon-yellow rounded-full transition-all duration-500"
          style={{ width: `${value * 10}%` }}
        />
      </div>
    </div>
  );
}
