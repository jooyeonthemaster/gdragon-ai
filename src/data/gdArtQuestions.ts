export interface GDArtQuestion {
  id: number;
  question: string;
  placeholder: string;
  hint?: string;
}

export const gdArtQuestions: GDArtQuestion[] = [
  {
    id: 1,
    question: '지디를 한 단어로 표현한다면?',
    placeholder: '예: 혁명가, 예술가, 아이콘...',
    hint: '당신이 생각하는 GD의 본질을 한 단어로 표현해보세요',
  },
  {
    id: 2,
    question: '지디의 가장 강력한 무기는 무엇이라고 생각하나?',
    placeholder: '예: 창의성, 카리스마, 진정성...',
    hint: 'GD를 GD답게 만드는 가장 핵심적인 힘',
  },
  {
    id: 3,
    question: '지디가 가장 살아있다고 느끼는 순간은 언제일까?',
    placeholder: '예: 무대 위에서, 작업실에서, 팬들과 함께...',
    hint: 'GD가 가장 빛나는 순간을 상상해보세요',
  },
  {
    id: 4,
    question: '지디 스타일에서 가장 인상적인 요소는?',
    placeholder: '예: 파격적인 패션, 독특한 헤어스타일, 액세서리...',
    hint: 'GD의 외적 표현 중 가장 기억에 남는 것',
  },
  {
    id: 5,
    question: '지디가 10년 후에도 변하지 않고 계속하고 있을 것은?',
    placeholder: '예: 음악 작업, 패션, 예술적 실험...',
    hint: 'GD의 영원한 본질은 무엇일까요?',
  },
  {
    id: 6,
    question: '지디의 가장 큰 유산은 무엇이 될 것 같나?',
    placeholder: '예: K-POP의 혁명, 예술적 자유, 개성의 존중...',
    hint: 'GD가 세상에 남길 가장 큰 영향',
  },
  {
    id: 7,
    question: '지디에게 "성공"이란 무엇일까?',
    placeholder: '예: 예술적 완성, 자유로운 표현, 진정성...',
    hint: 'GD가 추구하는 진정한 가치',
  },
  {
    id: 8,
    question: '지디가 가장 많은 에너지를 쏟는 곳은 어디라고 생각하나?',
    placeholder: '예: 음악 제작, 패션 디자인, 무대 퍼포먼스...',
    hint: 'GD의 열정이 가장 집중되는 영역',
  },
];
