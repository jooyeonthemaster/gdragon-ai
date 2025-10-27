export interface GDScentProfile {
  id: string;
  number: number;
  name: string;
  mainScent: string;
  gdConnection: string; // GD와의 연결고리
  personalityMatch: {
    revolutionary: number; // 0-10
    poetic: number;
    emotional: number;
    artistic: number;
    charismatic: number;
  };
  notes: {
    citrus: number;
    floral: number;
    woody: number;
    musk: number;
    fruity: number;
    spicy: number;
  };
  intensityLevel: 'light' | 'medium' | 'strong';
  mood: string;
  description: string;
  gdMoment: string; // GD의 어떤 순간을 떠올리게 하는가
  recommendationReason: string;
}

export const gdScentProfiles: GDScentProfile[] = [
  {
    id: 'GD_COUP_DETAT',
    number: 1,
    name: 'COUP D\'ETAT',
    mainScent: '비터 오렌지 & 핑크페퍼',
    gdConnection: '쿠데타의 강렬한 선언, 기존 질서에 대한 반항',
    personalityMatch: {
      revolutionary: 10,
      poetic: 5,
      emotional: 6,
      artistic: 8,
      charismatic: 10
    },
    notes: {
      citrus: 7,
      floral: 3,
      woody: 6,
      musk: 5,
      fruity: 4,
      spicy: 9
    },
    intensityLevel: 'strong',
    mood: '혁명적, 강렬한, 카리스마틱',
    description: '강렬한 비터 오렌지의 쌉싸래함과 핑크페퍼의 스파이시함이 만나 폭발적인 에너지를 발산합니다. 기존의 틀을 깨고 새로운 질서를 선언하는 GD의 쿠데타 정신을 담았습니다. 첫 향부터 끝까지 지속되는 강인함과 카리스마가 당신의 존재를 각인시킵니다.',
    gdMoment: 'Coup d\'Etat 앨범 발매 순간, 무대 위에서 "나는 나다"를 외치던 그 순간',
    recommendationReason: '기존 질서에 반항하고 자신만의 길을 개척하는 혁명적 정신을 가진 당신에게. GD의 카리스마와 리더십에 공감하며, 세상에 강렬한 메시지를 던지고 싶은 사람에게 추천합니다.'
  },
  {
    id: 'GD_UNTITLED',
    number: 2,
    name: 'UNTITLED',
    mainScent: '라벤더 & 샌달우드',
    gdConnection: '무제(無題), 이름 없는 감정의 깊이',
    personalityMatch: {
      revolutionary: 3,
      poetic: 10,
      emotional: 10,
      artistic: 10,
      charismatic: 4
    },
    notes: {
      citrus: 2,
      floral: 6,
      woody: 9,
      musk: 8,
      fruity: 1,
      spicy: 6
    },
    intensityLevel: 'medium',
    mood: '시적, 우울한, 내면적',
    description: '라벤더의 고요한 아로마와 샌달우드의 깊이 있는 우디함이 어우러져 명상적인 공간을 만듭니다. "삶은 파도야..."라는 가사처럼 끊임없이 밀려오는 감정의 파도를 향으로 표현했습니다. 깊은 내면의 목소리에 귀 기울이게 하는 시적인 향입니다.',
    gdMoment: '무제(無題)를 혼자 듣던 밤, 가사 하나하나에 공감하며 눈물 흘리던 순간',
    recommendationReason: 'GD의 시적이고 철학적인 면에 깊이 공감하는 당신에게. 무제(無題)의 가사처럼 삶의 깊이와 우울함을 이해하고, 예술적 감수성이 풍부한 사람에게 추천합니다.'
  },
  {
    id: 'GD_HEARTBREAKER',
    number: 3,
    name: 'HEARTBREAKER',
    mainScent: '만다린 오렌지 & 머스크',
    gdConnection: '솔로 데뷔의 설렘과 야망, 첫 번째 혁명',
    personalityMatch: {
      revolutionary: 8,
      poetic: 4,
      emotional: 6,
      artistic: 7,
      charismatic: 9
    },
    notes: {
      citrus: 8,
      floral: 5,
      woody: 4,
      musk: 7,
      fruity: 7,
      spicy: 5
    },
    intensityLevel: 'light',
    mood: '경쾌한, 야망찬, 젊은',
    description: '밝고 경쾌한 만다린 오렌지가 첫인상을 사로잡고, 깔끔한 머스크가 세련된 여운을 남깁니다. 2009년, 솔로 아티스트로서 첫 발을 내딛던 GD의 야망과 자신감을 담았습니다. 젊고 패기 넘치는 에너지가 느껴지는 상큼한 향입니다.',
    gdMoment: 'Heartbreaker 뮤직비디오에서 자신감 넘치게 춤추던 GD의 모습',
    recommendationReason: '도전과 야망으로 가득 찬 당신에게. GD의 솔로 데뷔 시절처럼 새로운 시작과 변화를 두려워하지 않는 사람에게 추천합니다.'
  },
  {
    id: 'GD_KWON_JI_YONG',
    number: 4,
    name: 'KWON JI YONG',
    mainScent: '화이트로즈 & 스웨이드',
    gdConnection: '권지용이라는 인간, 가면 뒤의 진실한 나',
    personalityMatch: {
      revolutionary: 7,
      poetic: 9,
      emotional: 10,
      artistic: 10,
      charismatic: 6
    },
    notes: {
      citrus: 3,
      floral: 8,
      woody: 7,
      musk: 9,
      fruity: 2,
      spicy: 4
    },
    intensityLevel: 'medium',
    mood: '순수한, 진솔한, 내면적',
    description: '순백의 화이트로즈와 부드러운 스웨이드가 만나 진솔하고 섬세한 향을 만듭니다. G-DRAGON이 아닌 권지용이라는 한 사람의 진실한 감정을 담았습니다. USB 앨범처럼 형식을 파괴하고 본질에 집중한, 가장 인간적인 향입니다.',
    gdMoment: '"권지용" 앨범의 USB 패키지를 처음 봤을 때의 충격과 감동',
    recommendationReason: '진정한 자아를 탐구하고 표현하는 당신에게. G-DRAGON이 아닌 권지용의 인간적인 면모에 공감하며, 예술의 본질에 대해 고민하는 사람에게 추천합니다.'
  },
  {
    id: 'GD_ONE_OF_A_KIND',
    number: 5,
    name: 'ONE OF A KIND',
    mainScent: '블랙베리 & 레더',
    gdConnection: '유일무이, 세상에 단 하나뿐인 존재',
    personalityMatch: {
      revolutionary: 9,
      poetic: 6,
      emotional: 5,
      artistic: 9,
      charismatic: 10
    },
    notes: {
      citrus: 4,
      floral: 3,
      woody: 7,
      musk: 6,
      fruity: 8,
      spicy: 8
    },
    intensityLevel: 'strong',
    mood: '독창적, 강렬한, 독보적',
    description: '달콤하면서도 강렬한 블랙베리와 고급스러운 레더 향이 조화를 이뤄 독보적인 카리스마를 발산합니다. "One of a Kind"라는 선언처럼, 누구와도 비교할 수 없는 당신만의 향입니다. 패션 아이콘 GD의 독창적인 스타일을 향으로 담아냈습니다.',
    gdMoment: 'One of a Kind 무대에서 독특한 패션과 퍼포먼스로 모두를 압도하던 순간',
    recommendationReason: '자신만의 독창적인 스타일과 정체성을 확립한 당신에게. GD처럼 남과 다른 것을 두려워하지 않고, 유일무이한 존재가 되고자 하는 사람에게 추천합니다.'
  },
  {
    id: 'GD_BLACK',
    number: 6,
    name: 'BLACK',
    mainScent: '스모키 블렌드 우드 & 바이올렛',
    gdConnection: '어둠 속 빛, 고통과 성장',
    personalityMatch: {
      revolutionary: 6,
      poetic: 10,
      emotional: 10,
      artistic: 10,
      charismatic: 5
    },
    notes: {
      citrus: 1,
      floral: 7,
      woody: 10,
      musk: 7,
      fruity: 2,
      spicy: 6
    },
    intensityLevel: 'strong',
    mood: '어두운, 깊은, 신비로운',
    description: '깊고 농밀한 스모키 우드와 신비로운 바이올렛이 만나 몽환적이고 강렬한 향을 만듭니다. BLACK의 가사처럼 어둠 속에서도 빛을 찾아가는 여정을 표현했습니다. 고통과 성장, 그 경계에서 피어나는 예술적 깊이를 담았습니다.',
    gdMoment: 'BLACK의 뮤직비디오, 어둠 속에서 홀로 서 있던 GD의 슬픈 눈빛',
    recommendationReason: '인생의 어두운 순간을 겪으며 성장한 당신에게. GD의 감정적이고 예술적인 깊이에 공감하며, 고통을 예술로 승화시키는 사람에게 추천합니다.'
  },
  {
    id: 'GD_CRAYON',
    number: 7,
    name: 'CRAYON',
    mainScent: '스트로베리 & 레몬페퍼',
    gdConnection: '자유분방한 색깔, 장난스러운 천재성',
    personalityMatch: {
      revolutionary: 8,
      poetic: 5,
      emotional: 4,
      artistic: 9,
      charismatic: 8
    },
    notes: {
      citrus: 7,
      floral: 5,
      woody: 4,
      musk: 4,
      fruity: 9,
      spicy: 7
    },
    intensityLevel: 'light',
    mood: '발랄한, 자유로운, 창의적',
    description: '달콤한 스트로베리와 톡 쏘는 레몬페퍼가 만나 예측 불가능한 매력을 발산합니다. CRAYON의 뮤직비디오처럼 컬러풀하고 자유분방한 에너지를 담았습니다. 장난스럽지만 천재적인, GD의 독특한 창의성을 향으로 표현했습니다.',
    gdMoment: 'CRAYON 무대에서 컬러풀한 의상과 자유로운 퍼포먼스로 즐거워하던 모습',
    recommendationReason: '자유로운 창의성과 장난기를 가진 당신에게. GD의 예술적 실험정신과 파격적인 시도에 공감하며, 색다른 것을 추구하는 사람에게 추천합니다.'
  },
  {
    id: 'GD_BULLSHIT',
    number: 8,
    name: 'BULLSHIT',
    mainScent: '타임 & 이탈리안 사이프러스',
    gdConnection: '위선에 대한 직설적 저항, 진실의 외침',
    personalityMatch: {
      revolutionary: 10,
      poetic: 7,
      emotional: 7,
      artistic: 8,
      charismatic: 9
    },
    notes: {
      citrus: 3,
      floral: 2,
      woody: 9,
      musk: 5,
      fruity: 2,
      spicy: 9
    },
    intensityLevel: 'strong',
    mood: '직설적, 강인한, 솔직한',
    description: '강렬한 타임 허브와 시원한 사이프러스 우드가 만나 거침없는 에너지를 발산합니다. "BULLSHIT"이라는 직설적인 제목처럼, 위선과 가식을 거부하고 진실만을 말하는 GD의 태도를 담았습니다. 타협 없는 솔직함이 느껴지는 강인한 향입니다.',
    gdMoment: '불(BULLSHIT) 가사를 통해 사회에 던진 날카로운 메시지',
    recommendationReason: '위선을 거부하고 진실을 말하는 용기를 가진 당신에게. GD처럼 타협하지 않고 자신의 목소리를 내는 사람에게 추천합니다.'
  },
  {
    id: 'GD_DIVINA_COMMEDIA',
    number: 9,
    name: 'DIVINA COMMEDIA',
    mainScent: '무화과 & 베르가못',
    gdConnection: '신곡, 지옥과 천국 사이의 여정',
    personalityMatch: {
      revolutionary: 5,
      poetic: 10,
      emotional: 9,
      artistic: 10,
      charismatic: 6
    },
    notes: {
      citrus: 7,
      floral: 6,
      woody: 6,
      musk: 7,
      fruity: 7,
      spicy: 4
    },
    intensityLevel: 'medium',
    mood: '철학적, 우아한, 여유로운',
    description: '지중해의 무화과와 우아한 베르가못이 만나 철학적이고 품격 있는 향을 만듭니다. Divina Commedia(신곡)처럼 인생의 지옥과 천국을 모두 경험한 자의 깊이와 여유를 담았습니다. GD의 철학적이고 문학적인 면모를 향으로 표현했습니다.',
    gdMoment: 'Divina Commedia 발표 당시, 단테의 신곡을 인용한 깊이 있는 컨셉',
    recommendationReason: '인생의 깊이를 이해하고 철학적 사고를 즐기는 당신에게. GD의 문학적이고 예술적인 깊이에 공감하며, 우아한 여유를 추구하는 사람에게 추천합니다.'
  },
  {
    id: 'GD_WHO_YOU',
    number: 10,
    name: 'WHO YOU?',
    mainScent: '민트 & 바다소금',
    gdConnection: '정체성의 질문, 당신은 누구인가',
    personalityMatch: {
      revolutionary: 8,
      poetic: 8,
      emotional: 7,
      artistic: 8,
      charismatic: 8
    },
    notes: {
      citrus: 9,
      floral: 2,
      woody: 5,
      musk: 4,
      fruity: 4,
      spicy: 6
    },
    intensityLevel: 'light',
    mood: '청량한, 도발적, 질문하는',
    description: '시원한 민트와 미네랄한 바다소금이 만나 맑고 청량한 향을 만듭니다. "Who You?"라는 질문처럼, 끊임없이 자신과 타인의 정체성에 대해 질문하는 GD의 탐구정신을 담았습니다. 신선하고 도발적인, 질문하는 향입니다.',
    gdMoment: '"너는 누구니?" 라고 묻는 가사, 정체성에 대한 끊임없는 질문',
    recommendationReason: '끊임없이 자신과 세상에 대해 질문하는 당신에게. GD처럼 정체성을 탐구하고, 진실을 찾아가는 여정을 즐기는 사람에게 추천합니다.'
  },
  {
    id: 'GD_SUPERSTAR',
    number: 11,
    name: 'SUPERSTAR',
    mainScent: '이탈리안 만다린 & 오렌지 블라썸',
    gdConnection: '슈퍼스타의 빛과 그림자, 고독한 정상',
    personalityMatch: {
      revolutionary: 6,
      poetic: 7,
      emotional: 9,
      artistic: 7,
      charismatic: 9
    },
    notes: {
      citrus: 8,
      floral: 8,
      woody: 4,
      musk: 6,
      fruity: 6,
      spicy: 3
    },
    intensityLevel: 'light',
    mood: '화려한, 외로운, 복잡한',
    description: '화사한 이탈리안 만다린과 우아한 오렌지 블라썸이 만나 화려하면서도 쓸쓸한 향을 만듭니다. 슈퍼스타로서의 빛나는 순간과 그 이면의 고독을 동시에 담았습니다. 화려함 뒤에 숨겨진 복잡한 감정이 느껴지는 향입니다.',
    gdMoment: '무대 위의 화려한 GD와 무대 밖의 외로운 권지용의 대비',
    recommendationReason: '겉으로는 화려하지만 내면의 깊은 감정을 가진 당신에게. 성공의 빛과 그림자를 모두 경험한 사람에게 추천합니다.'
  },
  {
    id: 'GD_WINDOW',
    number: 12,
    name: 'WINDOW',
    mainScent: '튤립 & 은방울꽃',
    gdConnection: '창문 너머 보이는 세상, 소통의 갈망',
    personalityMatch: {
      revolutionary: 4,
      poetic: 9,
      emotional: 10,
      artistic: 8,
      charismatic: 5
    },
    notes: {
      citrus: 4,
      floral: 9,
      woody: 3,
      musk: 6,
      fruity: 5,
      spicy: 2
    },
    intensityLevel: 'light',
    mood: '순수한, 그리운, 소통하는',
    description: '섬세한 튤립과 순수한 은방울꽃이 만나 맑고 투명한 향을 만듭니다. WINDOW의 가사처럼, 창문 너머 세상과 소통하고 싶은 갈망을 담았습니다. 순수하고 진솔한, 마음을 여는 향입니다.',
    gdMoment: 'WINDOW 가사, "창문을 열어봐" - 소통과 이해에 대한 갈망',
    recommendationReason: '진솔한 소통과 이해를 갈망하는 당신에게. GD의 감성적이고 순수한 면모에 공감하는 사람에게 추천합니다.'
  },
  {
    id: 'GD_OBSESSION',
    number: 13,
    name: 'OBSESSION',
    mainScent: '로즈 & 튜베로즈',
    gdConnection: '집착, 예술에 대한 광기어린 열정',
    personalityMatch: {
      revolutionary: 7,
      poetic: 8,
      emotional: 9,
      artistic: 10,
      charismatic: 7
    },
    notes: {
      citrus: 3,
      floral: 10,
      woody: 5,
      musk: 7,
      fruity: 4,
      spicy: 6
    },
    intensityLevel: 'strong',
    mood: '관능적, 집착적, 열정적',
    description: '클래식한 로즈와 강렬한 튜베로즈가 만나 관능적이고 농밀한 향을 만듭니다. 예술에 대한 GD의 집착과 광기어린 열정을 담았습니다. 깊이 빠져들게 만드는, 중독성 있는 향입니다.',
    gdMoment: '작업실에서 완벽을 위해 끊임없이 수정하는 GD의 집착',
    recommendationReason: '무언가에 깊이 빠져들고 집착하는 열정을 가진 당신에게. 완벽을 추구하며 예술에 몰입하는 사람에게 추천합니다.'
  },
  {
    id: 'GD_BREATHE',
    number: 14,
    name: 'BREATHE',
    mainScent: '캐럿 & 페티그레인',
    gdConnection: '숨 쉬기, 삶의 기본으로의 회귀',
    personalityMatch: {
      revolutionary: 3,
      poetic: 8,
      emotional: 8,
      artistic: 7,
      charismatic: 4
    },
    notes: {
      citrus: 8,
      floral: 6,
      woody: 4,
      musk: 5,
      fruity: 4,
      spicy: 3
    },
    intensityLevel: 'light',
    mood: '자연스러운, 편안한, 본질적',
    description: '대지의 향 캐럿과 청량한 페티그레인이 만나 자연스럽고 편안한 향을 만듭니다. BREATHE(숨 쉬기)처럼, 복잡한 세상에서 가장 기본으로 돌아가는 편안함을 담았습니다. 자연스럽고 건강한, 본질에 집중하는 향입니다.',
    gdMoment: '모든 것을 내려놓고 그저 숨 쉬는 것만으로도 감사한 순간',
    recommendationReason: '본질에 집중하고 자연스러움을 추구하는 당신에게. 복잡한 것을 벗어나 편안함을 찾는 사람에게 추천합니다.'
  },
  {
    id: 'GD_THAT_XX',
    number: 15,
    name: 'THAT XX',
    mainScent: '유자 & 라임',
    gdConnection: '그XX, 상처와 분노의 직설적 표현',
    personalityMatch: {
      revolutionary: 9,
      poetic: 6,
      emotional: 9,
      artistic: 7,
      charismatic: 8
    },
    notes: {
      citrus: 9,
      floral: 2,
      woody: 4,
      musk: 5,
      fruity: 6,
      spicy: 7
    },
    intensityLevel: 'medium',
    mood: '톡 쏘는, 신랄한, 솔직한',
    description: '톡 쏘는 유자와 강렬한 라임이 만나 신랄하고 직설적인 향을 만듭니다. THAT XX의 가사처럼, 상처받은 감정을 숨기지 않고 솔직하게 표현하는 GD의 태도를 담았습니다. 날카롭지만 정직한, 용기 있는 향입니다.',
    gdMoment: 'THAT XX 가사의 솔직한 감정 표현, 상처를 숨기지 않는 용기',
    recommendationReason: '감정을 숨기지 않고 솔직하게 표현하는 용기를 가진 당신에게. 상처를 인정하고 당당히 말하는 사람에게 추천합니다.'
  }
];

// GD 감정 분석 기반 향 추천 알고리즘
export function recommendGDScent(emotionalProfile: {
  revolutionary: number;
  poetic: number;
  emotional: number;
  artistic: number;
  charismatic: number;
}): GDScentProfile[] {
  const scores = gdScentProfiles.map(scent => {
    // 유클리드 거리 계산 (가까울수록 좋음)
    const distance = Math.sqrt(
      Math.pow(scent.personalityMatch.revolutionary - emotionalProfile.revolutionary, 2) +
      Math.pow(scent.personalityMatch.poetic - emotionalProfile.poetic, 2) +
      Math.pow(scent.personalityMatch.emotional - emotionalProfile.emotional, 2) +
      Math.pow(scent.personalityMatch.artistic - emotionalProfile.artistic, 2) +
      Math.pow(scent.personalityMatch.charismatic - emotionalProfile.charismatic, 2)
    );

    return { scent, distance };
  });

  // 거리가 가까운 순으로 정렬
  scores.sort((a, b) => a.distance - b.distance);

  // 상위 3개 반환
  return scores.slice(0, 3).map(item => item.scent);
}
