'use client';

import type { EmotionalProfile } from '@/lib/geminiService';

interface EmotionalRadarProps {
  profile: EmotionalProfile;
}

export default function EmotionalRadar({ profile }: EmotionalRadarProps) {
  const dimensions = [
    { key: 'revolutionary', label: '혁명적', value: profile.revolutionary, icon: '🔥' },
    { key: 'poetic', label: '시적', value: profile.poetic, icon: '📖' },
    { key: 'emotional', label: '감정적', value: profile.emotional, icon: '💔' },
    { key: 'artistic', label: '예술적', value: profile.artistic, icon: '🎨' },
    { key: 'charismatic', label: '카리스마', value: profile.charismatic, icon: '👑' },
  ];

  return (
    <div className="space-y-4">
      {dimensions.map((dim, index) => (
        <div key={dim.key} className="space-y-2 animate-slide-in" style={{ animationDelay: `${index * 0.1}s` }}>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span>{dim.icon}</span>
              <span className="text-gray-300 font-medium">{dim.label}</span>
            </div>
            <span className="text-gold font-bold text-lg">{dim.value}</span>
          </div>
          <div className="relative w-full h-3 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-gold via-neon-yellow to-gold rounded-full transition-all duration-1000 ease-out"
              style={{
                width: `${dim.value * 10}%`,
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
            </div>
          </div>
        </div>
      ))}

      <style jsx>{`
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-slide-in {
          animation: slide-in 0.6s ease-out both;
        }

        .animate-shimmer {
          animation: shimmer 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
