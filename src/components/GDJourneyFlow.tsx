'use client';

import { useState, useEffect } from 'react';
import { gdQuestions, type GDQuestion } from '@/data/gdQuestions';
import QuestionCard from './QuestionCard';
import ResultDisplay from './ResultDisplay';
import { analyzeGDEmotion } from '@/lib/geminiService';

type Answer = {
  questionId: number;
  answer: string;
};

export default function GDJourneyFlow() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [emotionalProfile, setEmotionalProfile] = useState<any>(null);

  const currentQuestion = gdQuestions[currentStep];
  const progress = ((currentStep + 1) / gdQuestions.length) * 100;

  const handleAnswer = async (answer: string) => {
    const newAnswer: Answer = {
      questionId: currentQuestion.id,
      answer,
    };

    const updatedAnswers = [...answers, newAnswer];
    setAnswers(updatedAnswers);

    // 마지막 질문이면 분석 시작
    if (currentStep === gdQuestions.length - 1) {
      setIsAnalyzing(true);
      try {
        const profile = await analyzeGDEmotion(updatedAnswers, gdQuestions);
        setEmotionalProfile(profile);
      } catch (error) {
        console.error('감정 분석 실패:', error);
        // 폴백: 기본 감정 프로필
        setEmotionalProfile({
          revolutionary: 5,
          poetic: 5,
          emotional: 5,
          artistic: 5,
          charismatic: 5,
          description: '분석 중 오류가 발생했습니다. 기본 프로필로 진행합니다.',
        });
      }
      setIsAnalyzing(false);
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

  // 분석 중이면 로딩 화면
  if (isAnalyzing) {
    return (
      <div className="w-full max-w-2xl mx-auto text-center space-y-8">
        <h2 className="text-3xl md:text-4xl font-bold gd-glow-gold">
          감정 분석 중...
        </h2>
        <div className="gd-glass p-12 rounded-2xl space-y-6">
          <div className="gd-loading mx-auto" />
          <p className="text-gray-300 text-lg">
            당신의 감정을 분석하고 있습니다
          </p>
          <p className="text-gray-500 text-sm">
            GD의 세계와 당신의 감정이 만나는 순간...
          </p>
        </div>
      </div>
    );
  }

  // 분석 완료되면 결과 화면
  if (emotionalProfile) {
    return <ResultDisplay emotionalProfile={emotionalProfile} answers={answers} />;
  }

  // 질문 화면
  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* 프로그레스 바 */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-400">
            질문 {currentStep + 1} / {gdQuestions.length}
          </span>
          <span className="text-gold font-semibold">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="gd-progress" style={{ '--progress': `${progress}%` } as React.CSSProperties} />
      </div>

      {/* 질문 카드 */}
      <QuestionCard
        question={currentQuestion}
        onAnswer={handleAnswer}
        onBack={currentStep > 0 ? handleBack : undefined}
      />

      {/* 힌트 텍스트 */}
      <div className="text-center text-gray-500 text-sm">
        {currentQuestion.type === 'factual' && '✨ 정답이 있는 질문입니다'}
        {currentQuestion.type === 'emotional' && '💭 당신의 감정을 솔직하게 답해주세요'}
        {currentQuestion.type === 'interpretive' && '🎨 정답은 없습니다. 자유롭게 답해주세요'}
      </div>
    </div>
  );
}
