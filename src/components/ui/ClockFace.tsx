interface Props {
  hours: number;
  minutes: number;
  size?: number;
}

export default function ClockFace({ hours, minutes, size = 180 }: Props) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 8;

  // Angles in radians from 12 o'clock, clockwise
  const minuteAngle = (minutes / 60) * 2 * Math.PI;
  const hourAngle = ((hours % 12) / 12 + minutes / 720) * 2 * Math.PI;

  const handEnd = (angle: number, length: number) => ({
    x: cx + Math.sin(angle) * length,
    y: cy - Math.cos(angle) * length,
  });

  const hourHand = handEnd(hourAngle, r * 0.52);
  const minHand  = handEnd(minuteAngle, r * 0.72);

  // Hour tick marks
  const hourTicks = Array.from({ length: 12 }, (_, i) => {
    const a = (i / 12) * 2 * Math.PI;
    const outer = { x: cx + Math.sin(a) * r, y: cy - Math.cos(a) * r };
    const inner = { x: cx + Math.sin(a) * (r - 10), y: cy - Math.cos(a) * (r - 10) };
    return { outer, inner };
  });

  // Minute tick marks (60 total, skip hour positions)
  const minTicks = Array.from({ length: 60 }, (_, i) => {
    if (i % 5 === 0) return null;
    const a = (i / 60) * 2 * Math.PI;
    const outer = { x: cx + Math.sin(a) * r, y: cy - Math.cos(a) * r };
    const inner = { x: cx + Math.sin(a) * (r - 5), y: cy - Math.cos(a) * (r - 5) };
    return { outer, inner };
  });

  // Hour numerals
  const numerals = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((n, i) => {
    const a = (i / 12) * 2 * Math.PI;
    return {
      n,
      x: cx + Math.sin(a) * (r - 22),
      y: cy - Math.cos(a) * (r - 22),
    };
  });

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Clock face */}
      <circle cx={cx} cy={cy} r={r} fill="white" stroke="#6366f1" strokeWidth="3" />

      {/* Minute ticks */}
      {minTicks.map((t, i) =>
        t ? (
          <line key={i} x1={t.outer.x} y1={t.outer.y} x2={t.inner.x} y2={t.inner.y}
            stroke="#d1d5db" strokeWidth="1.5" strokeLinecap="round" />
        ) : null
      )}

      {/* Hour ticks */}
      {hourTicks.map((t, i) => (
        <line key={i} x1={t.outer.x} y1={t.outer.y} x2={t.inner.x} y2={t.inner.y}
          stroke="#6366f1" strokeWidth="3" strokeLinecap="round" />
      ))}

      {/* Hour numerals */}
      {numerals.map(({ n, x, y }) => (
        <text key={n} x={x} y={y} textAnchor="middle" dominantBaseline="central"
          fontSize={size * 0.095} fontWeight="700" fill="#374151" fontFamily="system-ui">
          {n}
        </text>
      ))}

      {/* Hour hand */}
      <line x1={cx} y1={cy} x2={hourHand.x} y2={hourHand.y}
        stroke="#1e1b4b" strokeWidth="5" strokeLinecap="round" />

      {/* Minute hand */}
      <line x1={cx} y1={cy} x2={minHand.x} y2={minHand.y}
        stroke="#6366f1" strokeWidth="3.5" strokeLinecap="round" />

      {/* Center dot */}
      <circle cx={cx} cy={cy} r="5" fill="#6366f1" />
    </svg>
  );
}
