import { useEffect, useRef, useState } from 'react';
import {
  motion,
  animate as motionAnimate,
  useMotionValue,
  useTransform,
} from 'motion/react';

interface PreloaderProps {
  onComplete: () => void;
}

/** SVG Rim — styled to match the site's industrial dark aesthetic */
function RimSVG() {
  return (
    <svg
      viewBox="0 0 260 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%' }}
      aria-hidden="true"
    >
      {/* Outer tyre ring */}
      <circle cx="130" cy="130" r="124" stroke="#1e1e1e" strokeWidth="10" />
      {/* Outer rim ring */}
      <circle cx="130" cy="130" r="112" stroke="#2a2a2a" strokeWidth="3" />
      {/* Red accent ring */}
      <circle cx="130" cy="130" r="108" stroke="#E52525" strokeWidth="1" strokeDasharray="6 6" />
      {/* Spoke barrel ring */}
      <circle cx="130" cy="130" r="72" stroke="#222" strokeWidth="2.5" />
      {/* Centre hub */}
      <circle cx="130" cy="130" r="18" stroke="#2a2a2a" strokeWidth="3" />
      <circle cx="130" cy="130" r="10" fill="#E52525" />
      <circle cx="130" cy="130" r="5" fill="#111" />

      {/* 6 Spokes */}
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i * 60 * Math.PI) / 180;
        const innerR = 20;
        const outerR = 70;
        const x1 = 130 + innerR * Math.cos(angle);
        const y1 = 130 + innerR * Math.sin(angle);
        const x2 = 130 + outerR * Math.cos(angle);
        const y2 = 130 + outerR * Math.sin(angle);
        // Side edges of spoke (width ~8px)
        const perpAngle = angle + Math.PI / 2;
        const halfW = 3.5;
        const lx1 = x1 + halfW * Math.cos(perpAngle);
        const ly1 = y1 + halfW * Math.sin(perpAngle);
        const lx2 = x2 + halfW * Math.cos(perpAngle);
        const ly2 = y2 + halfW * Math.sin(perpAngle);
        const rx1 = x1 - halfW * Math.cos(perpAngle);
        const ry1 = y1 - halfW * Math.sin(perpAngle);
        const rx2 = x2 - halfW * Math.cos(perpAngle);
        const ry2 = y2 - halfW * Math.sin(perpAngle);
        return (
          <polygon
            key={i}
            points={`${lx1},${ly1} ${lx2},${ly2} ${rx2},${ry2} ${rx1},${ry1}`}
            fill={i === 0 ? '#E52525' : '#2a2a2a'}
            stroke="#111"
            strokeWidth="0.5"
          />
        );
      })}

      {/* Bolt holes — 6 evenly spaced around hub */}
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i * 60 * Math.PI) / 180 + Math.PI / 6;
        const r = 34;
        const cx = 130 + r * Math.cos(angle);
        const cy = 130 + r * Math.sin(angle);
        return (
          <g key={i}>
            <circle cx={cx} cy={cy} r={5} fill="#111" stroke="#333" strokeWidth="1" />
            <circle cx={cx} cy={cy} r={2} fill="#1a1a1a" />
          </g>
        );
      })}
    </svg>
  );
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [visible, setVisible] = useState(true);
  const progressValue = useMotionValue(0);
  const leftPanelX = useMotionValue('0%');
  const rightPanelX = useMotionValue('0%');
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const displayCount = useTransform(progressValue, (v) =>
    String(Math.round(v)).padStart(3, '0')
  );
  const barWidth = useTransform(progressValue, (v) => `${v}%`);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      // 1. Count 0→100 over 2.2s ease-out
      await motionAnimate(progressValue, 100, {
        duration: 2.2,
        ease: [0.16, 1, 0.3, 1],
      });
      if (cancelled) return;

      // 2. Hold at 100% for 400ms
      await new Promise((r) => setTimeout(r, 400));
      if (cancelled) return;

      // 3. Left panel slides left, right panel slides right — simultaneously
      await Promise.all([
        motionAnimate(leftPanelX, '-100%', {
          duration: 0.8,
          ease: [0.76, 0, 0.24, 1],
        }),
        motionAnimate(rightPanelX, '100%', {
          duration: 0.8,
          ease: [0.76, 0, 0.24, 1],
        }),
      ]);
      if (cancelled) return;

      setVisible(false);
      onCompleteRef.current();
    };

    run();
    return () => { cancelled = true; };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 overflow-hidden flex"
      style={{ zIndex: 99999, backgroundColor: '#050505' }}
    >
      {/* ══════════════════════════════════
          LEFT PANEL — Spinning Rim
      ══════════════════════════════════ */}
      <motion.div
        className="relative flex items-center justify-center overflow-hidden"
        style={{
          width: '50%',
          backgroundColor: '#050505',
          x: leftPanelX,
        }}
      >
        {/* Subtle radial glow behind the rim */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: 380,
            height: 380,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(229,37,37,0.04) 0%, transparent 70%)',
          }}
        />

        {/* Spinning rim */}
        <motion.div
          style={{ width: 'clamp(200px, 26vw, 300px)' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
        >
          <RimSVG />
        </motion.div>

        {/* Bottom-left label */}
        <div className="absolute bottom-8 left-8">
          <p className="font-mono text-[8px] tracking-[0.3em] text-[#2a2a2a] uppercase">
            Industrial Grade
          </p>
        </div>
      </motion.div>

      {/* ══════════════════════════════════
          VERTICAL DIVIDER LINE
      ══════════════════════════════════ */}
      <motion.div
        className="absolute top-0 bottom-0 w-[1px]"
        style={{
          left: '50%',
          backgroundColor: '#E52525',
          zIndex: 10,
        }}
        initial={{ scaleY: 0, originY: 0.5 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* ══════════════════════════════════
          RIGHT PANEL — Brand + Progress
      ══════════════════════════════════ */}
      <motion.div
        className="relative flex flex-col justify-center overflow-hidden"
        style={{
          width: '50%',
          backgroundColor: '#080808',
          x: rightPanelX,
          paddingLeft: 'clamp(32px, 6vw, 80px)',
          paddingRight: 'clamp(32px, 6vw, 80px)',
        }}
      >
        {/* Grain texture */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: 0.025,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px',
          }}
        />

        {/* ── Brand Name ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mb-2"
        >
          <p className="font-mono text-[9px] tracking-[0.35em] text-modina-red uppercase mb-4">
            — Loading
          </p>
          <h1
            className="font-condensed text-white uppercase leading-none"
            style={{
              fontSize: 'clamp(36px, 6vw, 72px)',
              fontWeight: 700,
              letterSpacing: '0.04em',
            }}
          >
            MODINA
          </h1>
          <p
            className="font-condensed text-[#444] uppercase"
            style={{
              fontSize: 'clamp(14px, 2vw, 22px)',
              fontWeight: 300,
              letterSpacing: '0.12em',
              marginTop: 4,
            }}
          >
            RIM &amp; PARTS LTD.
          </p>
        </motion.div>

        {/* Red accent line under brand name */}
        <motion.div
          className="h-[1px] bg-modina-red mb-10"
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
          style={{ width: 'clamp(60px, 8vw, 100px)' }}
        />

        {/* ── Large Counter ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.8 }}
          className="mb-10"
        >
          <motion.span
            className="font-condensed text-modina-red tabular-nums select-none"
            style={{
              fontSize: 'clamp(64px, 11vw, 140px)',
              fontWeight: 200,
              letterSpacing: '-0.02em',
              lineHeight: 1,
            }}
          >
            {displayCount}
          </motion.span>
          <span
            className="font-mono text-[#333] ml-2 align-bottom"
            style={{ fontSize: 'clamp(10px, 1.5vw, 16px)', letterSpacing: '0.2em' }}
          >
            / 100
          </span>
        </motion.div>

        {/* ── Progress Bar ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.9 }}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="font-mono text-[8px] tracking-[0.3em] text-[#2a2a2a] uppercase">
              Precision Components
            </p>
            <p className="font-mono text-[8px] tracking-[0.2em] text-[#2a2a2a] uppercase">
              Jashore, Bangladesh
            </p>
          </div>
          {/* Track */}
          <div className="w-full h-[1px] bg-[#1a1a1a] relative">
            {/* Fill */}
            <motion.div
              className="absolute top-0 left-0 h-full"
              style={{ width: barWidth, backgroundColor: '#E52525' }}
            />
            {/* Glowing leading edge */}
            <motion.div
              className="absolute top-0 h-full w-3"
              style={{
                left: barWidth,
                background: 'linear-gradient(to right, #E52525, transparent)',
                opacity: 0.6,
                transform: 'translateX(-100%)',
              }}
            />
          </div>
        </motion.div>

        {/* Bottom-right corner detail */}
        <div className="absolute bottom-8 right-8">
          <p className="font-mono text-[8px] tracking-[0.25em] text-[#1e1e1e] uppercase">
            Est. 2010
          </p>
        </div>
      </motion.div>
    </div>
  );
}
