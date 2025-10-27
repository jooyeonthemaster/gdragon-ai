'use client';

interface CharacteristicsCloudProps {
  characteristics: string[];
  visualElements: string[];
}

export default function CharacteristicsCloud({ characteristics, visualElements }: CharacteristicsCloudProps) {
  const allWords = [...characteristics, ...visualElements];

  // 각 단어에 랜덤 크기와 위치 할당 (시드 기반으로 일관성 유지)
  const wordData = allWords.map((word, index) => {
    const seed = word.length + index;
    const size = 12 + (seed % 3) * 6; // 12px, 18px, 24px
    const x = 10 + ((seed * 17) % 80); // 10-90%
    const y = 15 + ((seed * 23) % 70); // 15-85%
    const rotation = ((seed * 7) % 30) - 15; // -15도 ~ +15도
    const color = index < characteristics.length ? 'text-neon-pink' : 'text-neon-cyan';

    return { word, size, x, y, rotation, color };
  });

  return (
    <div className="gd-glass rounded-xl p-8 h-64 relative overflow-hidden">
      {wordData.map((data, index) => (
        <div
          key={index}
          className={`absolute font-bold ${data.color} whitespace-nowrap`}
          style={{
            fontSize: `${data.size}px`,
            left: `${data.x}%`,
            top: `${data.y}%`,
            transform: `rotate(${data.rotation}deg) translate(-50%, -50%)`
          }}
        >
          {data.word}
        </div>
      ))}
    </div>
  );
}
