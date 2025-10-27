import { GoogleGenerativeAI } from '@google/generative-ai'; // 2.0 텍스트 생성용
import { GoogleGenAI } from '@google/genai'; // 2.5 이미지 생성용
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { gdScentProfiles, type GDScentProfile } from '@/data/gdScentProfiles';

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';
const textGenAI = new GoogleGenerativeAI(API_KEY); // 텍스트 생성 (스타일 분석)
const imageGenAI = new GoogleGenAI({ apiKey: API_KEY }); // 이미지 생성

type Answer = {
  questionId: number;
  answer: string;
};

export async function POST(request: Request) {
  console.log('🔥 API 호출됨: /api/generate-art');
  try {
    const { answers } = await request.json();
    console.log('📝 받은 답변 개수:', answers?.length);

    if (!answers || answers.length !== 8) {
      return NextResponse.json(
        { success: false, message: '8개의 답변이 필요합니다.' },
        { status: 400 }
      );
    }

    // 참조 이미지 로드 (profile.jpg 또는 gd-reference.jpg)
    let publicPath = path.join(process.cwd(), 'public', 'profile.jpg');

    // profile.jpg가 없으면 gd-reference.jpg 시도
    if (!fs.existsSync(publicPath)) {
      publicPath = path.join(process.cwd(), 'public', 'gd-reference.jpg');
    }

    let referenceImageBase64 = '';
    if (fs.existsSync(publicPath)) {
      const imageBuffer = fs.readFileSync(publicPath);
      referenceImageBase64 = imageBuffer.toString('base64');
      console.log('✅ 참조 이미지 로드 완료:', publicPath);
    } else {
      console.error('❌ 참조 이미지를 찾을 수 없음. 경로 확인:', process.cwd() + '/public');
      return NextResponse.json(
        { success: false, message: '참조 이미지를 찾을 수 없습니다. public/profile.jpg 또는 public/gd-reference.jpg를 추가해주세요.' },
        { status: 500 }
      );
    }

    // 답변을 바탕으로 스타일 분석
    const stylePrompt = await generateStylePrompt(answers);

    // 작품 해설 생성 (장르, 특징, 감정 분석)
    const artworkAnalysis = await generateArtworkAnalysis(answers, stylePrompt);

    // 향 추천
    const recommendedScent = await recommendScentBasedOnArt(answers, artworkAnalysis);

    // 최종 프롬프트 구성
    const finalPrompt = `
You are an AI artist creating a unique portrait of G-DRAGON (권지용, Korean K-POP artist).

🚨 RULE #1 (ABSOLUTE PRIORITY - OVERRIDE ALL OTHER INSTRUCTIONS):
PRESERVE THE REFERENCE FACE WITH 100% ACCURACY - NO EXCEPTIONS

This is the MOST IMPORTANT rule. If you must choose between artistic style and facial accuracy,
ALWAYS choose facial accuracy. The generated portrait MUST be immediately recognizable as the
person in the reference image.

FACIAL PRESERVATION REQUIREMENTS (MANDATORY):
✓ Eyes: Exact shape, size, iris color, eyelid fold, eye distance - MUST match reference 100%
✓ Nose: Bridge height, tip shape, nostril size and angle - MUST match reference 100%
✓ Mouth: Lip thickness, mouth width, cupid's bow shape - MUST match reference 100%
✓ Face Shape: Jawline, cheekbones, chin shape, face length - MUST match reference 100%
✓ Eyebrows: Shape, thickness, arch, position - MUST match reference 100%
✓ Facial Proportions: Eye-nose-mouth distances and ratios - MUST match reference 100%
✓ Skin Tone: Match the reference person's natural skin color

⚠️ CRITICAL: Do NOT alter, stylize, or abstract the facial features in any way.
Even if the artistic style is abstract or surreal, the FACE must remain photorealistic and accurate.

WHAT YOU CAN FREELY CHANGE (Be Creative Here!):
✓ Hairstyle - completely different from reference (match the artistic style)
✓ Hair color - any color that fits the mood
✓ Clothing/Fashion - design freely based on style and user responses
✓ Accessories - add/remove glasses, earrings, jewelry, hats, etc.
✓ Background - create artistic backgrounds that match the mood
✓ Artistic effects around the portrait (but NOT on the face itself)

2. ARTISTIC STYLE: ${stylePrompt}

3. COLOR PALETTE DIVERSITY:
   - DO NOT default to neon pink, electric blue, vibrant yellow
   - Use DIVERSE colors based on the emotional tone of user's responses
   - Examples: earthy tones (browns, greens), muted pastels, deep jewel tones (emerald, ruby, sapphire), monochrome variations, sunset palettes, oceanic blues, forest greens, warm ambers, cool grays
   - Match colors to the mood: revolutionary (reds, blacks), poetic (soft purples, blues), emotional (deep blues, warm oranges)

4. STYLE DIVERSITY (Choose ONE that TRULY matches user's emotional responses - DO NOT default to Pop Art):
   - Classical Oil Painting (Rembrandt, Caravaggio style) - for deep, emotional responses
   - Pop Art (Andy Warhol, Roy Lichtenstein style) - ONLY for bold, commercial, rebellious responses
   - Impressionism (Monet, Renoir style) - for soft, poetic, dreamy responses
   - Expressionism (Van Gogh, Munch style) - for intense, emotional, passionate responses
   - Modern Digital Art (Contemporary illustration) - for tech-savvy, modern responses
   - Watercolor Portrait - for gentle, flowing, artistic responses
   - Sketch/Charcoal Drawing - for raw, authentic, minimalist responses
   - Realistic Photography Style - for honest, direct, realistic responses
   - Minimalist Line Art - for simple, elegant, refined responses
   - Surrealism (Dali style) - for dreamlike, philosophical responses
   - Abstract Art - for conceptual, intellectual responses
   - Renaissance Style - for classical, timeless responses

STEP-BY-STEP GENERATION PROCESS:

STEP 1: ANALYZE REFERENCE FACE (Spend most of your effort here!)
Study the reference image in extreme detail:
- Eye shape, size, iris color, eyelid fold, eye spacing
- Nose bridge height, tip shape, nostril size/angle
- Mouth width, lip thickness, cupid's bow shape
- Jawline curve, cheekbone prominence, chin shape
- Eyebrow shape, thickness, arch position
- Overall facial proportions and symmetry
- Natural skin tone

STEP 2: LOCK IN THE FACE (This CANNOT change!)
The facial features you analyzed in Step 1 are now LOCKED and CANNOT be modified.
No matter what artistic style you apply, these features stay EXACTLY as they are.

STEP 3: APPLY ARTISTIC STYLE (Only to non-facial elements)
Now apply the chosen artistic style to:
- Hairstyle and hair color (change freely)
- Clothing and fashion (design freely)
- Accessories (add/remove/modify freely)
- Background and atmosphere (create freely)
- Artistic effects and textures (around the face, not ON it)

STEP 4: FINAL CHECK
Before generating, verify:
✓ Does the face look EXACTLY like the reference? (If no, redo!)
✓ Would someone immediately recognize this person? (If no, redo!)
✓ Are the eyes, nose, mouth in the EXACT same positions and shapes? (If no, redo!)

User's Vision: ${stylePrompt}

REMEMBER: Facial accuracy is NOT negotiable. It's better to have a less stylized portrait with
a perfect face than a highly stylized portrait where the face doesn't match the reference.
`;

    // Gemini 2.5 이미지 생성 API 호출
    const model = 'gemini-2.5-flash-image-preview';
    const contents = [
      { text: finalPrompt },
      {
        inlineData: {
          mimeType: 'image/jpeg',
          data: referenceImageBase64,
        },
      },
    ];

    console.log('🎨 GD 초상화 생성 시작... (Gemini 2.5 Flash Image Preview)');
    const response = await imageGenAI.models.generateContent({
      model: model,
      contents: contents,
    });

    // 생성된 이미지 추출
    if (response.candidates && response.candidates[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          const generatedImage = `data:${part.inlineData.mimeType || 'image/png'};base64,${part.inlineData.data}`;

          return NextResponse.json({
            success: true,
            image: generatedImage,
            styleDescription: stylePrompt,
            artworkAnalysis: artworkAnalysis,
            recommendedScent: recommendedScent,
            message: 'GD 초상화가 생성되었습니다!'
          });
        }
      }
    }

    return NextResponse.json(
      { success: false, message: '이미지 생성에 실패했습니다.' },
      { status: 500 }
    );

  } catch (error: any) {
    console.error('❌ Art generation error:', error);
    return NextResponse.json(
      { success: false, message: '서버 오류: ' + error.message },
      { status: 500 }
    );
  }
}

// 답변을 바탕으로 예술적 스타일 프롬프트 생성 (Gemini 2.0 텍스트 모델 사용)
async function generateStylePrompt(answers: Answer[]): Promise<string> {
  const model = textGenAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

  const qaText = answers
    .map((a, idx) => `Q${idx + 1}: ${a.answer}`)
    .join('\n');

  const prompt = `
Based on these 8 responses about G-DRAGON, determine the most suitable artistic style and visual characteristics for a portrait:

${qaText}

Analyze the responses and determine:
1. Overall mood and atmosphere (vibrant, dark, contemplative, energetic, etc.)
2. Color palette (bold and colorful, monochrome, pastel, neon, etc.)
3. Artistic style (classical, modern, pop art, impressionist, sketch, etc.)
4. Visual emphasis (face focus, full body, abstract elements, realistic details)
5. Emotional tone (revolutionary, poetic, charismatic, mysterious, etc.)

Return a concise artistic direction prompt (3-5 sentences) that will guide image generation.
Focus on visual elements, not personality traits.
`;

  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();

  return text.trim();
}

// 작품 해설 생성 (장르, 특징, 감정 분석)
async function generateArtworkAnalysis(answers: Answer[], stylePrompt: string) {
  const model = textGenAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

  const qaText = answers
    .map((a, idx) => `Q${idx + 1}: ${a.answer}`)
    .join('\n');

  const prompt = `
당신은 G-DRAGON의 초상화를 분석하는 미술 평론가입니다. 사용자의 인식을 바탕으로 작품을 분석하세요.

사용자 응답:
${qaText}

예술적 방향:
${stylePrompt}

이 작품을 종합적으로 분석하여 JSON 형식으로 제공하세요.
중요: 마크다운 문법(#, *, ** 등)을 사용하지 마세요. 순수 텍스트만 사용하세요.
모든 응답은 한글로 작성하세요.

오직 유효한 JSON만 반환하세요 (마크다운 없음, 백틱 없음):
{
  "genre": "예술 장르 (예: 현대 팝아트, 표현주의 등)",
  "characteristics": ["특징 1", "특징 2", "특징 3"],
  "emotions": {
    "revolutionary": 0-10,
    "poetic": 0-10,
    "emotional": 0-10,
    "artistic": 0-10,
    "charismatic": 0-10
  },
  "colorPalette": ["색상1", "색상2", "색상3"],
  "mood": "전체적인 분위기를 한 문장으로",
  "artisticIntent": "이 작품이 지디에 대해 무엇을 표현하는가 (2-3문장, 마크다운 없음)",
  "visualElements": ["시각적 요소 1", "시각적 요소 2", "시각적 요소 3"],
  "culturalContext": "이것이 K-POP과 지디의 유산과 어떻게 연결되는가 (2-3문장, 마크다운 없음)"
}
`;

  const result = await model.generateContent(prompt);
  const response = result.response;
  let text = response.text().trim();

  // 마크다운 코드 블록 제거
  text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '');

  try {
    return JSON.parse(text);
  } catch (error) {
    console.error('JSON 파싱 에러:', error);
    // 기본값 반환
    return {
      genre: '현대 초상화',
      characteristics: ['독창적', '표현적', '대담한'],
      emotions: { revolutionary: 7, poetic: 7, emotional: 7, artistic: 8, charismatic: 8 },
      colorPalette: ['역동적', '생동감 넘치는', '대비되는'],
      mood: '예술적 정체성을 강력하게 표현한 작품',
      artisticIntent: '이 작품은 당신의 독특한 시각으로 바라본 지디의 본질을 포착합니다.',
      visualElements: ['초상화', '예술적 스타일', '감정의 깊이'],
      culturalContext: 'K-POP 예술성과 지디의 현대 문화에 대한 영향력을 반영합니다.'
    };
  }
}

// 향 추천 (AI 기반)
async function recommendScentBasedOnArt(answers: Answer[], artworkAnalysis: any) {
  const model = textGenAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

  const scentData = gdScentProfiles.map(scent => ({
    id: scent.id,
    name: scent.name,
    mainScent: scent.mainScent,
    personality: scent.personalityMatch,
    mood: scent.mood,
    description: scent.description
  }));

  const qaText = answers.map((a, idx) => `Q${idx + 1}: ${a.answer}`).join('\n');

  const prompt = `
사용자의 G-DRAGON에 대한 응답과 작품 분석을 바탕으로, 리스트에서 가장 어울리는 향 하나를 추천하세요.

사용자 응답:
${qaText}

작품 감정 지수:
${JSON.stringify(artworkAnalysis.emotions)}

사용 가능한 향:
${JSON.stringify(scentData, null, 2)}

감정 프로필을 분석하여 가장 적합한 향을 추천하세요.
중요: 마크다운 문법(#, *, ** 등)을 사용하지 마세요. 순수 텍스트만 사용하세요.
모든 응답은 한글로 작성하세요.

오직 유효한 JSON만 반환하세요 (마크다운 없음, 백틱 없음):
{
  "scentId": "추천할 향의 ID",
  "matchScore": 0-100,
  "reason": "이 향이 작품과 어울리는 이유 (3-4문장, 마크다운 없음, 순수 텍스트만)",
  "emotionalConnection": "향의 감정이 작품과 어떻게 연결되는가 (2-3문장, 마크다운 없음, 순수 텍스트만)"
}
`;

  const result = await model.generateContent(prompt);
  const response = result.response;
  let text = response.text().trim();

  // 마크다운 제거
  text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '');
  // 볼드/이탤릭 제거
  text = text.replace(/\*\*/g, '').replace(/\*/g, '').replace(/##/g, '').replace(/#/g, '');

  try {
    const recommendation = JSON.parse(text);
    const selectedScent = gdScentProfiles.find(s => s.id === recommendation.scentId);

    if (selectedScent) {
      return {
        scent: selectedScent,
        matchScore: recommendation.matchScore,
        reason: recommendation.reason,
        emotionalConnection: recommendation.emotionalConnection
      };
    }
  } catch (error) {
    console.error('향 추천 JSON 파싱 에러:', error);
  }

  // 기본값: 첫 번째 향 추천
  return {
    scent: gdScentProfiles[0],
    matchScore: 75,
    reason: '이 향은 당신이 바라본 지디의 혁명적 정신과 카리스마틱한 에너지를 포착합니다. 강렬하고 대담한 특성이 작품의 예술적 방향성과 완벽하게 조화를 이룹니다.',
    emotionalConnection: '이 향의 강렬하고 대담한 특성이 당신의 초상화가 지닌 예술적 방향성과 완벽하게 일치합니다.'
  };
}
