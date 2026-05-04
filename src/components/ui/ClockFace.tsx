interface Props {
  hours: number;
  minutes: number;
  size?: number;
}

export default function ClockFace({ hours, minutes, size = 180 }: Props) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 8;

  const minuteAngle = (minutes / 60) * 2 * Math.PI;
  const hourAngle = ((hours % 12) / 12 + minutes / 720) * 2 * Math.PI;

  const handEnd = (angle: number, length: number) => ({
    x: cx + Math.sin(angle) * length,
    y: cy - Math.cos(angle) * length,
  });

  const hourHand = handEnd(hourAngle, r * 0.52);
  const minHand  = handEnd(minuteAngle, r * 0.72);

  const hourTicks = Array.from({ length: 12 }, (_, i) => {
    const a = (i / 12) * 2 * Math.PI;
    const outer = { x: cx + Math.sin(a) * r, y: cy - Math.cos(a) * r };
    const inner = { x: cx + Math.sin(a) * (r - 10), y: cy - Math.cos(a) * (r - 10) };
    return { outer, inner };
  });

  const minTicks = Array.from({ length: 60 }, (_, i) => {
    if (i % 5 === 0) return null;
    const a = (i / 60) * 2 * Math.PI;
    const outer = { x: cx + Math.sin(a) * r, y: cy - Math.cos(a) * r };
    const inner = { x: cx + Math.sin(a) * (r - 5), y: cy - Math.cos(a) * (r - 5) };
    return { outer, inner };
  });

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
      {/* Dark clock face */}
      <circle cx={cx} cy={cy} r={r} fill="#0d0d18" stroke="#00f5ff" strokeWidth="2" strokeOpacity="0.5" />
      {/* Subtle glow ring */}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#00f5ff" strokeWidth="6" strokeOpacity="0.08" />

      {/* Minute ticks */}
      {minTicks.map((t, i) =>
        t ? (
          <line key={i} x1={t.outer.x} y1={t.outer.y} x2={t.inner.x} y2={t.inner.y}
            stroke="#00f5ff" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.25" />
        ) : null
      )}

      {/* Hour ticks — neon cyan */}
      {hourTicks.map((t, i) => (
        <line key={i} x1={t.outer.x} y1={t.outer.y} x2={t.inner.x} y2={t.inner.y}
          stroke="#00f5ff" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.7" />
      ))}

      {/* Hour numerals */}
      {numerals.map(({ n, x, y }) => (
        <text key={n} x={x} y={y} textAnchor="middle" dominantBaseline="central"
          fontSize={size * 0.09} fontWeight="700" fill="#e0e0ff" fontFamily="Orbitron, system-ui"
          opacity="0.85">
          {n}
        </text>
      ))}

      {/* Hour hand — neon orange */}
      <line x1={cx} y1={cy} x2={hourHand.x} y2={hourHand.y}
        stroke="#ff6b00" strokeWidth="5" strokeLinecap="round" />

      {/* Minute hand — neon cyan */}
      <line x1={cx} y1={cy} x2={minHand.x} y2={minHand.y}
        stroke="#00f5ff" strokeWidth="3.5" strokeLinecap="round" />

      {/* Center dot */}
      <circle cx={cx} cy={cy} r="5" fill="#00f5ff" />
      <circle cx={cx} cy={cy} r="8" fill="none" stroke="#00f5ff" strokeWidth="1" strokeOpacity="0.4" />
    </svg>
  );
}
