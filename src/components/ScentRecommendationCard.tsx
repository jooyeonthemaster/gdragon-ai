'use client';

import type { GDScentProfile } from '@/data/gdScentProfiles';

interface ScentRecommendationCardProps {
  scent: GDScentProfile;
  matchScore: number;
  reason: string;
  emotionalConnection: string;
}

export default function ScentRecommendationCard({
  scent,
  matchScore,
  reason,
  emotionalConnection
}: ScentRecommendationCardProps) {
  // 매치 스코어 색상
  const getScoreColor = () => {
    if (matchScore >= 90) return 'text-green-400';
    if (matchScore >= 75) return 'text-neon-cyan';
    if (matchScore >= 60) return 'text-yellow-400';
    return 'text-orange-400';
  };

  return (
    <div className="gd-glass rounded-xl p-6 space-y-4">
      {/* 헤더 */}
      <div className="flex items-start justify-between">
        <div>
          <div className="text-sm text-gray-400">향 No.{scent.number}</div>
          <h3 className="text-2xl font-bold text-neon-pink gd-neon-text">
            {scent.name}
          </h3>
          <p className="text-neon-cyan text-sm mt-1">{scent.mainScent}</p>
        </div>
        <div className="text-right">
          <div className="text-xs text-gray-400">매칭 점수</div>
          <div className={`text-3xl font-bold ${getScoreColor()}`}>
            {matchScore}%
          </div>
        </div>
      </div>

      {/* 향 설명 */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-400">강도:</span>
          <span className="text-neon-cyan capitalize">{scent.intensityLevel}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-400">분위기:</span>
          <span className="text-gray-300">{scent.mood}</span>
        </div>
      </div>

      {/* AI 추천 이유 */}
      <div className="space-y-3 pt-3 border-t border-neon-pink/20">
        <div>
          <h4 className="text-sm font-bold text-neon-cyan mb-2">왜 이 향인가?</h4>
          <p className="text-gray-300 text-sm leading-relaxed">{reason}</p>
        </div>

        <div>
          <h4 className="text-sm font-bold text-neon-pink mb-2">감정적 연결</h4>
          <p className="text-gray-300 text-sm leading-relaxed">{emotionalConnection}</p>
        </div>
      </div>

      {/* GD 연결고리 */}
      <div className="pt-3 border-t border-neon-cyan/20">
        <h4 className="text-xs font-bold text-gray-400 mb-2">지디와의 연결</h4>
        <p className="text-neon-cyan text-sm">{scent.gdConnection}</p>
      </div>

      {/* 향 노트 바 그래프 */}
      <div className="space-y-2 pt-3">
        <h4 className="text-xs font-bold text-gray-400 mb-3">향 노트</h4>
        {Object.entries(scent.notes).map(([note, value]) => (
          <div key={note} className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-gray-400 capitalize">{note}</span>
              <span className="text-neon-pink">{value}/10</span>
            </div>
            <div className="w-full bg-black/50 rounded-full h-1.5">
              <div
                className="h-1.5 rounded-full bg-gradient-to-r from-neon-pink to-neon-cyan"
                style={{ width: `${(value / 10) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
