import { GoogleGenerativeAI } from '@google/generative-ai';
import type { GDQuestion } from '@/data/gdQuestions';

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(API_KEY);

export interface EmotionalProfile {
  revolutionary: number; // 0-10
  poetic: number;
  emotional: number;
  artistic: number;
  charismatic: number;
  description: string;
  personalMessage: string;
}

type Answer = {
  questionId: number;
  answer: string;
};

export async function analyzeGDEmotion(
  answers: Answer[],
  questions: GDQuestion[]
): Promise<EmotionalProfile> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

    // 질문과 답변을 텍스트로 정리
    const qaText = answers
      .map((a) => {
        const q = questions.find((question) => question.id === a.questionId);
        if (!q) return '';

        return `질문 ${q.id}: ${q.question}\n답변: ${a.answer}\n타입: ${q.type}\n`;
      })
      .join('\n');

    const prompt = `
당신은 G-DRAGON(지드래곤, 권지용)의 음악과 예술 세계를 깊이 이해하는 감정 분석 전문가입니다.

아래 질문과 답변을 분석하여, 사용자가 GD를 향해 가지고 있는 감정의 5가지 차원을 0-10 점수로 평가해주세요.

**5가지 감정 차원:**
1. **revolutionary (혁명적)**: 기존 질서에 대한 반항, 쿠데타 정신, 변화와 도전, 파격적인 시도
2. **poetic (시적)**: 철학적 사고, 문학적 감수성, 은유와 상징, 깊이 있는 사유
3. **emotional (감정적)**: 내면의 깊이, 우울과 슬픔, 진솔한 감정 표현, 취약함의 공유
4. **artistic (예술적)**: 창의성, 실험정신, 독창성, 예술에 대한 집착과 완벽주의
5. **charismatic (카리스마)**: 리더십, 존재감, 자신감, 강렬한 인상, 영향력

**질문과 답변:**
${qaText}

**중요한 분석 기준:**
- factual 타입 질문: 정답 여부보다는 어떤 곡/앨범을 선택했는지에 주목 (예: 무제 선택 = 시적+감정적 높음)
- emotional 타입 질문: 선택지의 감정 가중치를 반영
- interpretive 타입 질문: 텍스트 답변의 뉘앙스와 깊이를 분석

다음 JSON 형식으로만 응답해주세요:
{
  "revolutionary": <0-10 숫자>,
  "poetic": <0-10 숫자>,
  "emotional": <0-10 숫자>,
  "artistic": <0-10 숫자>,
  "charismatic": <0-10 숫자>,
  "description": "<사용자의 GD 감정 프로필을 2-3문장으로 요약>",
  "personalMessage": "<사용자에게 전하는 개인적인 메시지 (GD의 어떤 면모가 당신과 공명했는지, 1-2문장)>"
}
`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    // JSON 추출 (마크다운 코드 블록 제거)
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('JSON 형식을 찾을 수 없습니다');
    }

    const profile: EmotionalProfile = JSON.parse(jsonMatch[0]);

    // 검증: 점수가 0-10 범위인지 확인
    const scores = [
      profile.revolutionary,
      profile.poetic,
      profile.emotional,
      profile.artistic,
      profile.charismatic,
    ];

    if (scores.some((s) => s < 0 || s > 10 || isNaN(s))) {
      throw new Error('점수가 유효하지 않습니다');
    }

    return profile;
  } catch (error) {
    console.error('Gemini API 에러:', error);

    // 폴백: 답변 기반 간단한 점수 계산
    const fallbackProfile = calculateFallbackProfile(answers, questions);
    return fallbackProfile;
  }
}

// 폴백: 간단한 가중치 기반 점수 계산
function calculateFallbackProfile(
  answers: Answer[],
  questions: GDQuestion[]
): EmotionalProfile {
  const scores = {
    revolutionary: 0,
    poetic: 0,
    emotional: 0,
    artistic: 0,
    charismatic: 0,
  };

  let count = 0;

  answers.forEach((a) => {
    const q = questions.find((question) => question.id === a.questionId);
    if (!q || !q.options) return;

    const selectedOption = q.options.find((opt) => opt.value === a.answer);
    if (!selectedOption) return;

    scores.revolutionary += selectedOption.weight.revolutionary;
    scores.poetic += selectedOption.weight.poetic;
    scores.emotional += selectedOption.weight.emotional;
    scores.artistic += selectedOption.weight.artistic;
    scores.charismatic += selectedOption.weight.charismatic;
    count++;
  });

  // 평균 내기
  if (count > 0) {
    scores.revolutionary = Math.round(scores.revolutionary / count);
    scores.poetic = Math.round(scores.poetic / count);
    scores.emotional = Math.round(scores.emotional / count);
    scores.artistic = Math.round(scores.artistic / count);
    scores.charismatic = Math.round(scores.charismatic / count);
  }

  return {
    ...scores,
    description:
      '당신은 GD의 다양한 면모에 균형있게 공감하는 사람입니다. 그의 음악과 예술 세계를 폭넓게 이해하고 있습니다.',
    personalMessage:
      'G-DRAGON의 진정성과 예술적 완성도가 당신의 마음을 움직였습니다.',
  };
}
