import React from 'react';

export const RiskGauge = ({ probability = 0, size = 180, strokeWidth = 14 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  // Use a 270-degree arc for a sleek gauge look
  const arcLength = circumference * 0.75;
  const strokeDashoffset = arcLength - (arcLength * (probability / 100));

  // Color mapping based on probability
  let strokeColor = '#10B981'; // Green (Approved/High)
  let glowColor = 'rgba(16, 185, 129, 0.2)';
  let labelColor = 'text-emerald-600';

  if (probability < 45) {
    strokeColor = '#EF4444'; // Red (Rejected/Low)
    glowColor = 'rgba(239, 68, 68, 0.2)';
    labelColor = 'text-rose-600';
  } else if (probability < 65) {
    strokeColor = '#F59E0B'; // Amber (Medium)
    glowColor = 'rgba(245, 158, 11, 0.2)';
    labelColor = 'text-amber-600';
  }

  return (
    <div className="relative flex flex-col items-center justify-center">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="rotate-[135deg] transform"
      >
        {/* Background Track Arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#E2E8F0"
          strokeWidth={strokeWidth}
          strokeDasharray={`${arcLength} ${circumference}`}
          strokeLinecap="round"
        />

        {/* Animated Progress Arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={`${arcLength} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{
            transition: 'stroke-dashoffset 1s ease-in-out, stroke 0.5s ease',
            filter: `drop-shadow(0 2px 8px ${glowColor})`,
          }}
        />
      </svg>

      {/* Center Percentage Display */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-2">
        <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
          {probability}%
        </span>
        <span className={`text-xs font-semibold uppercase tracking-wider ${labelColor}`}>
          Confidence Score
        </span>
      </div>
    </div>
  );
};
