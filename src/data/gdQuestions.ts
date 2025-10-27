export interface GDQuestion {
  id: number;
  question: string;
  type: 'factual' | 'emotional' | 'interpretive';
  options?: {
    value: string;
    label: string;
    weight: {
      revolutionary: number;
      poetic: number;
      emotional: number;
      artistic: number;
      charismatic: number;
    };
  }[];
  answerType: 'single' | 'text';
  expectedAnswer?: string;
}

export const gdQuestions: GDQuestion[] = [
  {
    id: 1,
    question: '첫 솔로앨범 Heartbreaker는 어느 해에 발매됐나요?',
    type: 'factual',
    answerType: 'text',
  },
  {
    id: 2,
    question: '삶은 파도야 이 가사는 어떤 곡에서 나온 걸까요?',
    type: 'factual',
    answerType: 'text',
  },
  {
    id: 3,
    question: '삶이 그대를 속일지라도를 인용한 트랙은 무엇인가요?',
    type: 'factual',
    answerType: 'text',
  },
  {
    id: 4,
    question: '권지용과 G-DRAGON의 차이는 무엇이라고 생각하나요?',
    type: 'interpretive',
    answerType: 'text',
  },
  {
    id: 5,
    question: 'GD가 쿠데타를 일으켰다고 느꼈던 순간은 언제였나요? 그 순간 당신은 어떤 감정을 느꼈나요?',
    type: 'interpretive',
    answerType: 'text',
  },
  {
    id: 6,
    question: '무제를 처음 들었을 때 어떤 감정이 들었나요? 그 감정을 자유롭게 표현해주세요.',
    type: 'emotional',
    answerType: 'text',
  },
  {
    id: 7,
    question: 'Coup D\'etat 앨범이 보여준 세계관은 무엇이라고 생각하나요?',
    type: 'interpretive',
    answerType: 'text',
  },
  {
    id: 8,
    question: 'UBERMENSCH는 무엇을 의미한다고 생각하나요?',
    type: 'interpretive',
    answerType: 'text',
  },
  {
    id: 9,
    question: 'GD의 예술은 음악일까요, 메시지일까요? 당신의 생각을 들려주세요.',
    type: 'interpretive',
    answerType: 'text',
  },
  {
    id: 10,
    question: '패션과 음악 중, GD를 더 잘 설명하는 언어는 무엇이라고 생각하나요? 그 이유는 무엇인가요?',
    type: 'interpretive',
    answerType: 'text',
  },
];
