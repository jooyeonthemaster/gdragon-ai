'use client';

import { useState } from 'react';
import Link from 'next/link';
import EmotionRadarChart from './EmotionRadarChart';
import CharacteristicsCloud from './CharacteristicsCloud';
import ScentRecommendationCard from './ScentRecommendationCard';

interface ArtResultDisplayProps {
  generatedImage: string;
  styleDescription: string;
  artworkAnalysis: {
    genre: string;
    characteristics: string[];
    emotions: {
      revolutionary: number;
      poetic: number;
      emotional: number;
      artistic: number;
      charismatic: number;
    };
    colorPalette: string[];
    mood: string;
    artisticIntent: string;
    visualElements: string[];
    culturalContext: string;
  };
  recommendedScent: {
    scent: any;
    matchScore: number;
    reason: string;
    emotionalConnection: string;
  };
  answers: any[];
  onRestart: () => void;
}

export default function ArtResultDisplay({
  generatedImage,
  styleDescription,
  artworkAnalysis,
  recommendedScent,
  answers,
  onRestart,
}: ArtResultDisplayProps) {
  const [showAnswers, setShowAnswers] = useState(false);

  const downloadImage = () => {
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = `gd_portrait_${Date.now()}.png`;
    link.click();
  };

  return (
    <main className="min-h-screen flex flex-col items-center p-8 bg-black">
      <div className="w-full max-w-7xl mx-auto space-y-12 pb-20">
        {/* 매거진 헤더 */}
        <div className="text-center space-y-6 animate-fade-in border-b border-neon-pink/20 pb-12">
          <div className="inline-block px-6 py-2 bg-gradient-to-r from-neon-pink/20 to-neon-cyan/20 rounded-full">
            <span className="text-sm font-bold text-neon-cyan tracking-widest">작품 분석 리포트</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold gd-glow-pink">
            나만의 GD
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            당신이 인식한 지드래곤의 본질을 시각적으로 구현한 작품입니다
          </p>
        </div>

        {/* 메인 그리드: 이미지 + 작품 정보 */}
        <div className="grid md:grid-cols-2 gap-12 animate-fade-in-delay-1">
          {/* 왼쪽: 이미지 */}
          <div className="space-y-6">
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden border-2 border-neon-pink/30 shadow-2xl">
              <img
                src={generatedImage}
                alt="Generated GD Portrait"
                className="w-full h-full object-cover"
              />
            </div>

            {/* 다운로드 버튼 */}
            <button
              onClick={downloadImage}
              className="w-full py-4 bg-gradient-to-r from-neon-pink to-neon-cyan text-black font-bold rounded-xl hover:scale-105 transition-transform flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              작품 다운로드
            </button>
          </div>

          {/* 오른쪽: 작품 정보 */}
          <div className="space-y-8">
            {/* 장르 & 무드 */}
            <div className="gd-glass p-6 rounded-xl space-y-4">
              <div>
                <h3 className="text-xs font-bold text-gray-400 tracking-widest mb-2">장르</h3>
                <p className="text-2xl font-bold text-neon-pink">{artworkAnalysis.genre}</p>
              </div>
              <div>
                <h3 className="text-xs font-bold text-gray-400 tracking-widest mb-2">분위기</h3>
                <p className="text-gray-300 leading-relaxed">{artworkAnalysis.mood}</p>
              </div>
            </div>

            {/* 컬러 팔레트 */}
            <div className="gd-glass p-6 rounded-xl space-y-3">
              <h3 className="text-xs font-bold text-gray-400 tracking-widest">색상 팔레트</h3>
              <div className="grid grid-cols-2 gap-3">
                {artworkAnalysis.colorPalette.map((color: string, idx: number) => {
                  // 색상 이름에서 실제 색상 추출 (간단한 매핑)
                  const getColorClass = (colorName: string) => {
                    const lower = colorName.toLowerCase();
                    if (lower.includes('pink') || lower.includes('핑크') || lower.includes('분홍')) return 'from-pink-500 to-pink-600';
                    if (lower.includes('blue') || lower.includes('블루') || lower.includes('파란')) return 'from-blue-500 to-blue-600';
                    if (lower.includes('cyan') || lower.includes('시안') || lower.includes('청록')) return 'from-cyan-400 to-cyan-600';
                    if (lower.includes('purple') || lower.includes('보라') || lower.includes('퍼플')) return 'from-purple-500 to-purple-700';
                    if (lower.includes('red') || lower.includes('빨강') || lower.includes('레드')) return 'from-red-500 to-red-600';
                    if (lower.includes('orange') || lower.includes('오렌지') || lower.includes('주황')) return 'from-orange-500 to-orange-600';
                    if (lower.includes('yellow') || lower.includes('노랑') || lower.includes('옐로')) return 'from-yellow-400 to-yellow-500';
                    if (lower.includes('green') || lower.includes('초록') || lower.includes('그린')) return 'from-green-500 to-green-600';
                    if (lower.includes('black') || lower.includes('검정') || lower.includes('블랙')) return 'from-gray-800 to-black';
                    if (lower.includes('white') || lower.includes('흰색') || lower.includes('화이트')) return 'from-gray-100 to-white';
                    if (lower.includes('gold') || lower.includes('골드') || lower.includes('금색')) return 'from-yellow-500 to-amber-600';
                    if (lower.includes('silver') || lower.includes('실버') || lower.includes('은색')) return 'from-gray-300 to-gray-400';
                    // 기본값
                    return idx === 0 ? 'from-neon-pink to-pink-600' :
                           idx === 1 ? 'from-neon-cyan to-blue-600' :
                           idx === 2 ? 'from-purple-500 to-purple-700' :
                           'from-yellow-400 to-orange-500';
                  };

                  return (
                    <div key={idx} className="text-center">
                      <div className={`h-16 rounded-lg bg-gradient-to-br ${getColorClass(color)} mb-2 shadow-lg`} />
                      <p className="text-xs text-gray-300 font-medium">{color}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 작품 의도 */}
            <div className="gd-glass p-6 rounded-xl space-y-3">
              <h3 className="text-xs font-bold text-gray-400 tracking-widest">작품 의도</h3>
              <p className="text-gray-300 leading-relaxed">{artworkAnalysis.artisticIntent}</p>
            </div>
          </div>
        </div>

        {/* 특성 시각화 섹션 */}
        <div className="space-y-8 animate-fade-in-delay-2">
          <h2 className="text-3xl font-bold text-center text-neon-cyan">
            작품 특성 분석
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* 감정 레이더 차트 */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-center text-neon-pink">감정 프로필</h3>
              <EmotionRadarChart emotions={artworkAnalysis.emotions} />
            </div>

            {/* 특성 텍스트 클라우드 */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-center text-neon-cyan">시각적 요소</h3>
              <CharacteristicsCloud
                characteristics={artworkAnalysis.characteristics}
                visualElements={artworkAnalysis.visualElements}
              />
            </div>
          </div>
        </div>

        {/* 문화적 맥락 */}
        <div className="gd-glass p-8 rounded-xl space-y-4 animate-fade-in-delay-3">
          <h3 className="text-xs font-bold text-gray-400 tracking-widest">문화적 맥락</h3>
          <p className="text-gray-300 text-lg leading-relaxed">{artworkAnalysis.culturalContext}</p>
        </div>

        {/* 향 추천 섹션 */}
        <div className="space-y-8 animate-fade-in-delay-4">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-neon-pink">
              추천 향
            </h2>
            <p className="text-gray-400">
              이 작품과 가장 잘 어울리는 향
            </p>
          </div>
          <ScentRecommendationCard {...recommendedScent} />
        </div>

        {/* 답변 보기 토글 */}
        {showAnswers && (
          <div className="gd-glass p-8 rounded-xl space-y-6 animate-fade-in">
            <h3 className="text-xl font-bold text-neon-cyan text-center">나의 응답</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {answers.map((answer, idx) => (
                <div key={idx} className="gd-glass p-4 rounded-lg border-l-2 border-neon-pink/50">
                  <p className="text-xs text-gray-500 mb-2">질문 {idx + 1}</p>
                  <p className="text-gray-300">{answer.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 하단 액션 버튼 */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-delay-5">
          <button
            onClick={() => setShowAnswers(!showAnswers)}
            className="px-8 py-4 gd-glass border border-neon-cyan/30 text-neon-cyan font-bold rounded-xl hover:border-neon-cyan transition-colors"
          >
            {showAnswers ? '답변 숨기기' : '내 답변 보기'}
          </button>
          <button
            onClick={onRestart}
            className="px-8 py-4 gd-glass border border-gold/30 hover:border-gold text-gold font-bold rounded-xl transition-colors"
          >
            다시 그리기
          </button>

          <Link
            href="/"
            className="px-8 py-4 gd-glass border border-gray-600 hover:border-gray-400 text-gray-300 font-bold rounded-xl transition-colors"
          >
            홈으로
          </Link>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
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

          .animate-fade-in-delay-3 {
            animation: fade-in 0.8s ease-out 0.6s both;
          }

          .animate-fade-in-delay-4 {
            animation: fade-in 0.8s ease-out 0.8s both;
          }

          .animate-fade-in-delay-5 {
            animation: fade-in 0.8s ease-out 1s both;
          }
        `
      }} />
    </main>
  );
}
