# GD Scent Journey

지드래곤(G-DRAGON)을 향한 당신의 감정을 분석하고, 그에 맞는 향을 추천해주는 AI 기반 감정 분석 프로그램

## 🎯 프로젝트 컨셉

G-DRAGON의 음악과 예술 세계를 향으로 재해석하여, 사용자가 GD에 대해 가지고 있는 감정을 5가지 차원으로 분석하고 맞춤 향을 추천합니다.

### 5가지 감정 차원
- **Revolutionary (혁명적)**: 쿠데타, 반항, 변화
- **Poetic (시적)**: 철학, 문학, 은유
- **Emotional (감정적)**: 내면, 우울, 진솔함
- **Artistic (예술적)**: 창의성, 실험, 독창성
- **Charismatic (카리스마)**: 리더십, 존재감, 영향력

## 🎨 디자인 테마

- **다크 테마**: 블랙 배경에 황금빛 액센트
- **네온 효과**: 핫핑크, 시안, 옐로우 네온 글로우
- **글래스모피즘**: 투명한 글래스 카드
- **타이포그래피**: 임팩트 있는 대형 헤더

## 🛠 기술 스택

- **Framework**: Next.js 15.5.2 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **AI**: Google Gemini 2.0 Flash
- **Animation**: Framer Motion, GSAP

## 📦 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start
```

## 🔑 환경 변수

`.env.local` 파일 생성:

```env
NEXT_PUBLIC_GEMINI_API_KEY=your_api_key_here
GEMINI_API_KEY=your_api_key_here
NEXT_PUBLIC_GEMINI_DEMO_MODE=false
NEXT_PUBLIC_DISABLE_SAFETY_CHECKER=true
```

## 📂 프로젝트 구조

```
src/
├── app/
│   ├── layout.tsx          # 루트 레이아웃
│   ├── page.tsx            # 메인 페이지
│   └── globals.css         # 글로벌 스타일
├── components/
│   ├── GDJourneyFlow.tsx   # 메인 플로우 컴포넌트
│   ├── QuestionCard.tsx    # 질문 카드
│   ├── ResultDisplay.tsx   # 결과 화면
│   ├── ScentCard.tsx       # 향 카드
│   └── EmotionalRadar.tsx  # 감정 차트
├── data/
│   ├── gdQuestions.ts      # 질문 데이터 (10개)
│   └── gdScentProfiles.ts  # 향 데이터 (15개)
└── lib/
    └── geminiService.ts    # Gemini AI 서비스
```

## 🎵 GD 향 리스트

1. **COUP D'ETAT** - 비터 오렌지 & 핑크페퍼
2. **UNTITLED** - 라벤더 & 샌달우드
3. **HEARTBREAKER** - 만다린 오렌지 & 머스크
4. **KWON JI YONG** - 화이트로즈 & 스웨이드
5. **ONE OF A KIND** - 블랙베리 & 레더
6. **BLACK** - 스모키 블렌드 우드 & 바이올렛
7. **CRAYON** - 스트로베리 & 레몬페퍼
8. **BULLSHIT** - 타임 & 이탈리안 사이프러스
9. **DIVINA COMMEDIA** - 무화과 & 베르가못
10. **WHO YOU?** - 민트 & 바다소금
11. **SUPERSTAR** - 이탈리안 만다린 & 오렌지 블라썸
12. **WINDOW** - 튤립 & 은방울꽃
13. **OBSESSION** - 로즈 & 튜베로즈
14. **BREATHE** - 캐럿 & 페티그레인
15. **THAT XX** - 유자 & 라임

## 🎯 주요 기능

1. **10개 질문**: Factual, Emotional, Interpretive 타입
2. **AI 감정 분석**: Gemini 2.0 Flash 기반
3. **3개 향 추천**: 감정 프로필 매칭
4. **인터랙티브 UI**: 애니메이션과 글로우 효과
5. **반응형 디자인**: 모바일 최적화

## 📱 반응형 브레이크포인트

- xs: 375px
- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px
- 2xl: 1536px

## 🎨 컬러 팔레트

```css
--gd-gold: #D4AF37
--gd-neon-yellow: #FFFF00
--gd-neon-pink: #FF10F0
--gd-neon-cyan: #00FFFF
--gd-black: #0a0a0a
--gd-grey: #1a1a1a
```

## 📄 라이센스

This project is for educational and personal use only.

## 👤 Author

GD Scent Journey Team
