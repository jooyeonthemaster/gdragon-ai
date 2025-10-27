'use client';

import { useState } from 'react';
import Link from 'next/link';
import { gdArtQuestions } from '@/data/gdArtQuestions';
import ArtQuestionCard from '@/components/ArtQuestionCard';
import ArtResultDisplay from '@/components/ArtResultDisplay';

type Answer = {
  questionId: number;
  answer: string;
};

export default function ArtPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [styleDescription, setStyleDescription] = useState<string>('');
  const [artworkAnalysis, setArtworkAnalysis] = useState<any>(null);
  const [recommendedScent, setRecommendedScent] = useState<any>(null);

  const currentQuestion = gdArtQuestions[currentStep];
  const progress = ((currentStep + 1) / gdArtQuestions.length) * 100;
  const isLastQuestion = currentStep === gdArtQuestions.length - 1;

  const handleAnswer = async (answer: string) => {
    const newAnswer: Answer = {
      questionId: currentQuestion.id,
      answer,
    };

    // 이미 해당 질문에 대한 답변이 있으면 교체, 없으면 추가
    const existingIndex = answers.findIndex(a => a.questionId === currentQuestion.id);
    let updatedAnswers: Answer[];

    if (existingIndex >= 0) {
      // 이미 답변이 있으면 교체
      updatedAnswers = [...answers];
      updatedAnswers[existingIndex] = newAnswer;
    } else {
      // 없으면 추가
      updatedAnswers = [...answers, newAnswer];
    }

    setAnswers(updatedAnswers);

    // 마지막 질문이면 이미지 생성 시작
    if (isLastQuestion) {
      setIsGenerating(true);
      try {
        const response = await fetch('/api/generate-art', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ answers: updatedAnswers }),
        });

        const data = await response.json();

        if (data.success) {
          setGeneratedImage(data.image);
          setStyleDescription(data.styleDescription || '');
          setArtworkAnalysis(data.artworkAnalysis);
          setRecommendedScent(data.recommendedScent);
        } else {
          alert('이미지 생성 실패: ' + data.message);
          setIsGenerating(false);
        }
      } catch (error: any) {
        console.error('이미지 생성 오류:', error);
        alert('이미지 생성 중 오류가 발생했습니다: ' + error.message);
        setIsGenerating(false);
      }
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setAnswers(answers.slice(0, -1));
    }
  };

  const restart = () => {
    setCurrentStep(0);
    setAnswers([]);
    setIsGenerating(false);
    setGeneratedImage(null);
    setStyleDescription('');
    setArtworkAnalysis(null);
    setRecommendedScent(null);
  };

  // 테스트용 프리셋 답변 (질문과 맥락에 맞게 현실적으로 수정)
  const presetAnswers: Record<string, string[]> = {
    'sketch': [ // 연필 스케치 유도 - 진솔하고 절제된 답변
      '예술가',
      '진정성',
      '작업실에서 혼자 작업할 때',
      '절제된 미니멀 패션',
      '음악 작업',
      '개성의 존중과 진정성',
      '자기 자신에게 솔직한 것',
      '음악 제작'
    ],
    'popart': [ // 팝아트 유도 - 대담하고 화려한 답변
      '혁명가',
      '파격적인 스타일',
      '무대 위에서 팬들과 함께',
      '형광색 염색과 과감한 액세서리',
      '패션과 스타일 실험',
      'K-POP의 혁명과 글로벌 확장',
      '새로운 것을 만들어내는 것',
      '무대 퍼포먼스와 비주얼'
    ],
    'watercolor': [ // 수채화 유도 - 감성적이고 서정적인 답변
      '시인',
      '감성',
      '조용히 노래를 쓸 때',
      '부드러운 오버사이즈 실루엣',
      '음악 작업',
      '사람들의 마음을 위로한 음악',
      '감정에 솔직한 것',
      '작사와 프로듀싱'
    ],
    'expressionism': [ // 표현주의 유도 - 격정적이고 강렬한 답변
      '반항아',
      '열정',
      '무대에서 관객과 교감할 때',
      '강렬한 색상 대비와 레이어드 룩',
      '음악과 퍼포먼스',
      '예술적 자유와 표현의 자유',
      '한계를 깨는 것',
      '무대 퍼포먼스'
    ],
    'oil': [ // 고전 유화 유도 - 품격있고 깊이있는 답변
      '거장',
      '예술성',
      '작품이 완성되는 순간',
      '클래식한 테일러드 재킷과 빈티지 액세서리',
      '음악 작업',
      '시대를 초월하는 예술 작품',
      '예술적 완성도',
      '음악 제작과 작곡'
    ],
    'surrealism': [ // 초현실주의 유도 - 철학적이고 몽환적인 답변
      '몽상가',
      '상상력',
      '새로운 아이디어가 떠오를 때',
      '예상치 못한 아이템의 조합',
      '예술적 실험',
      '상상력의 확장',
      '새로운 세계를 보여주는 것',
      '음악과 비주얼 아트의 융합'
    ],
    'oriental': [ // 동양화 유도 - 절제되고 동양적인 답변
      '장인',
      '절제',
      '조용히 사색할 때',
      '심플한 한복 라인의 재해석',
      '음악 작업',
      '동서양 문화의 조화',
      '내면의 평화',
      '작곡과 프로듀싱'
    ]
  };

  // 프리셋 적용 함수 - 질문에 자동 입력
  const applyPreset = (presetKey: string) => {
    const presetData = presetAnswers[presetKey];
    if (!presetData || presetData.length !== gdArtQuestions.length) return;

    // 모든 답변을 미리 설정
    const presetAnswersList: Answer[] = presetData.map((answer, idx) => ({
      questionId: idx + 1,
      answer: answer
    }));

    setAnswers(presetAnswersList);
    // 첫 번째 질문으로 이동 (이미 0이지만 명시적으로)
    setCurrentStep(0);
  };

  // 생성 중이면 로딩 화면
  if (isGenerating && !generatedImage) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-2xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold gd-glow-pink">
            그림 생성 중...
          </h2>
          <div className="gd-glass p-12 rounded-2xl space-y-6">
            <div className="gd-loading mx-auto" />
            <p className="text-gray-300 text-lg">
              당신만의 GD 초상화를 그리고 있습니다
            </p>
            <p className="text-gray-500 text-sm">
              AI가 당신의 답변을 바탕으로 개성 있는 작품을 만들고 있습니다...
            </p>
            <p className="text-gray-600 text-xs mt-4">
              ⏱️ 약 30초~1분 정도 소요됩니다
            </p>
          </div>
        </div>
      </main>
    );
  }

  // 생성 완료되면 결과 화면
  if (generatedImage && artworkAnalysis && recommendedScent) {
    return (
      <ArtResultDisplay
        generatedImage={generatedImage}
        styleDescription={styleDescription}
        artworkAnalysis={artworkAnalysis}
        recommendedScent={recommendedScent}
        answers={answers}
        onRestart={restart}
      />
    );
  }

  // 질문 화면
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-3xl mx-auto space-y-6">
        {/* 뒤로가기 버튼 */}
        {currentStep === 0 && (
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-neon-pink transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>돌아가기</span>
          </Link>
        )}

        {/* 테스트 프리셋 버튼 (첫 질문에만 표시) */}
        {currentStep === 0 && (
          <div className="gd-glass rounded-xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-center text-neon-cyan">
              🧪 테스트 프리셋 (개발자용)
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <button
                onClick={() => applyPreset('sketch')}
                className="gd-glass p-4 rounded-lg hover:border-gray-400 transition-all text-center space-y-1"
              >
                <div className="text-2xl">✏️</div>
                <div className="text-sm font-semibold">스케치</div>
                <div className="text-xs text-gray-500">연필 드로잉</div>
              </button>

              <button
                onClick={() => applyPreset('popart')}
                className="gd-glass p-4 rounded-lg hover:border-neon-pink transition-all text-center space-y-1"
              >
                <div className="text-2xl">🎨</div>
                <div className="text-sm font-semibold">팝아트</div>
                <div className="text-xs text-gray-500">화려한 색감</div>
              </button>

              <button
                onClick={() => applyPreset('watercolor')}
                className="gd-glass p-4 rounded-lg hover:border-blue-400 transition-all text-center space-y-1"
              >
                <div className="text-2xl">💧</div>
                <div className="text-sm font-semibold">수채화</div>
                <div className="text-xs text-gray-500">부드러운 느낌</div>
              </button>

              <button
                onClick={() => applyPreset('expressionism')}
                className="gd-glass p-4 rounded-lg hover:border-red-400 transition-all text-center space-y-1"
              >
                <div className="text-2xl">🔥</div>
                <div className="text-sm font-semibold">표현주의</div>
                <div className="text-xs text-gray-500">격정적 감정</div>
              </button>

              <button
                onClick={() => applyPreset('oil')}
                className="gd-glass p-4 rounded-lg hover:border-yellow-600 transition-all text-center space-y-1"
              >
                <div className="text-2xl">🖼️</div>
                <div className="text-sm font-semibold">고전 유화</div>
                <div className="text-xs text-gray-500">깊이 있는 품격</div>
              </button>

              <button
                onClick={() => applyPreset('surrealism')}
                className="gd-glass p-4 rounded-lg hover:border-purple-400 transition-all text-center space-y-1"
              >
                <div className="text-2xl">🌙</div>
                <div className="text-sm font-semibold">초현실주의</div>
                <div className="text-xs text-gray-500">몽환적 분위기</div>
              </button>

              <button
                onClick={() => applyPreset('oriental')}
                className="gd-glass p-4 rounded-lg hover:border-green-600 transition-all text-center space-y-1"
              >
                <div className="text-2xl">🖌️</div>
                <div className="text-sm font-semibold">동양화</div>
                <div className="text-xs text-gray-500">수묵화 여백의 미</div>
              </button>
            </div>
          </div>
        )}

        {/* 프로그레스 바 */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400">
              질문 {currentStep + 1} / {gdArtQuestions.length}
            </span>
            <span className="text-neon-pink font-semibold">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="w-full h-4 bg-grey rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-neon-pink to-neon-cyan transition-all duration-500 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* 질문 카드 */}
        <ArtQuestionCard
          question={currentQuestion}
          onAnswer={handleAnswer}
          onBack={currentStep > 0 ? handleBack : undefined}
          prefilledAnswer={answers.find(a => a.questionId === currentQuestion.id)?.answer}
        />

        {/* 힌트 텍스트 */}
        <div className="text-center text-gray-500 text-sm">
          🎨 당신이 바라본 GD의 모습을 자유롭게 표현해주세요
        </div>
      </div>
    </main>
  );
}
