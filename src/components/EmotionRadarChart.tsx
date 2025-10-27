'use client';

interface EmotionRadarChartProps {
  emotions: {
    revolutionary: number;
    poetic: number;
    emotional: number;
    artistic: number;
    charismatic: number;
  };
}

export default function EmotionRadarChart({ emotions }: EmotionRadarChartProps) {
  const labels = [
    { key: 'revolutionary', label: '혁명적' },
    { key: 'poetic', label: '시적' },
    { key: 'emotional', label: '감성적' },
    { key: 'artistic', label: '예술적' },
    { key: 'charismatic', label: '카리스마' }
  ];

  const maxValue = 10;
  const centerX = 225;
  const centerY = 225;
  const radius = 150;

  // 각 포인트의 좌표 계산
  const points = labels.map((label, index) => {
    const angle = (Math.PI * 2 * index) / labels.length - Math.PI / 2;
    const value = emotions[label.key as keyof typeof emotions];
    const distance = (value / maxValue) * radius;
    return {
      x: centerX + Math.cos(angle) * distance,
      y: centerY + Math.sin(angle) * distance,
      labelX: centerX + Math.cos(angle) * (radius + 60),
      labelY: centerY + Math.sin(angle) * (radius + 60),
      label: label.label,
      value: value
    };
  });

  const pathData = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';

  // 배경 그리드
  const gridLevels = [2, 4, 6, 8, 10];
  const gridPaths = gridLevels.map(level => {
    const gridPoints = labels.map((_, index) => {
      const angle = (Math.PI * 2 * index) / labels.length - Math.PI / 2;
      const distance = (level / maxValue) * radius;
      return {
        x: centerX + Math.cos(angle) * distance,
        y: centerY + Math.sin(angle) * distance
      };
    });
    return gridPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';
  });

  return (
    <div className="flex flex-col items-center">
      <svg width="300" height="300" viewBox="0 0 450 450" className="gd-glass rounded-xl p-4">
        {/* 배경 그리드 */}
        {gridPaths.map((path, index) => (
          <path
            key={index}
            d={path}
            fill="rgba(0, 242, 254, 0.03)"
            stroke="rgba(255, 16, 240, 0.3)"
            strokeWidth="1.5"
          />
        ))}

        {/* 축선 */}
        {labels.map((label, index) => {
          const angle = (Math.PI * 2 * index) / labels.length - Math.PI / 2;
          const endX = centerX + Math.cos(angle) * radius;
          const endY = centerY + Math.sin(angle) * radius;
          return (
            <line
              key={label.key}
              x1={centerX}
              y1={centerY}
              x2={endX}
              y2={endY}
              stroke="rgba(0, 242, 254, 0.2)"
              strokeWidth="1"
            />
          );
        })}

        {/* 데이터 영역 */}
        <path
          d={pathData}
          fill="rgba(255, 16, 240, 0.3)"
          stroke="#FF10F0"
          strokeWidth="2"
        />

        {/* 데이터 포인트 */}
        {points.map((point, index) => (
          <circle
            key={index}
            cx={point.x}
            cy={point.y}
            r="4"
            fill="#00F2FE"
            className="gd-neon-glow"
          />
        ))}

        {/* 라벨 */}
        {points.map((point, index) => (
          <text
            key={index}
            x={point.labelX}
            y={point.labelY}
            textAnchor="middle"
            className="text-lg font-bold fill-neon-cyan"
            dominantBaseline="middle"
          >
            {point.label}
            <tspan x={point.labelX} dy="22" className="text-base fill-neon-pink">
              {point.value}/10
            </tspan>
          </text>
        ))}
      </svg>
    </div>
  );
}
