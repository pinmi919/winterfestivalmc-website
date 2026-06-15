import React, { useState, useRef, useEffect, useCallback } from 'react';

const BAR_COUNT = 12;

const VolumeKnob = ({ onChange }) => {
  const [vol, setVol] = useState(65);
  const [muted, setMuted] = useState(false);
  const [prevVol, setPrevVol] = useState(65);
  const knobRef = useRef(null);
  const dragging = useRef(false);
  const startY = useRef(0);
  const startVol = useRef(0);

  const display = muted ? 0 : vol;
  const t = display / 100;
  const MIN_DEG = -135, MAX_DEG = 135;
  const deg = MIN_DEG + t * (MAX_DEG - MIN_DEG);
  const ARC_LEN = 220;
  const arcColor = muted ? 'rgba(255,255,255,0.15)' : vol > 70 ? '#FF6B6B' : vol > 40 ? '#00F0FF' : '#007BFF';

  useEffect(() => { onChange?.(muted ? 0 : vol); }, [vol, muted]);

  const clamp = (v) => Math.max(0, Math.min(100, v));

  const handleMouseDown = (e) => {
    dragging.current = true;
    startY.current = e.clientY;
    startVol.current = vol;
    e.preventDefault();
  };

  useEffect(() => {
    const onMove = (e) => {
      if (!dragging.current) return;
      const dy = startY.current - e.clientY;
      const next = clamp(startVol.current + Math.round(dy * 0.8));
      setVol(next);
      if (muted && next > 0) setMuted(false);
    };
    const onUp = () => { dragging.current = false; };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); };
  }, [muted]);

  const handleWheel = (e) => {
    e.preventDefault();
    const next = clamp(vol + (e.deltaY < 0 ? 2 : -2));
    setVol(next);
    if (muted && next > 0) setMuted(false);
  };

  const toggleMute = () => {
    if (!muted) { setPrevVol(vol); setMuted(true); }
    else { setMuted(false); setVol(prevVol || 50); }
  };

  return (
    <div className="flex flex-col items-center gap-3 p-4 bg-night/80 rounded-2xl border border-white/10 w-[160px]">
      <span className="text-[10px] tracking-widest text-white/30 uppercase">Volume</span>

      {/* Knob */}
      <div
        ref={knobRef}
        className="relative w-[80px] h-[80px] cursor-grab active:cursor-grabbing select-none"
        onMouseDown={handleMouseDown}
        onWheel={handleWheel}
      >
        <svg viewBox="0 0 90 90" className="absolute inset-0 w-full h-full">
          <circle cx="45" cy="45" r="40" fill="none" stroke="rgba(255,255,255,0.06)"
            strokeWidth="3" strokeDasharray="220 999" strokeDashoffset="-30" strokeLinecap="round"/>
          <circle cx="45" cy="45" r="40" fill="none" stroke={arcColor}
            strokeWidth="3" strokeDasharray={`${t * ARC_LEN} 999`}
            strokeDashoffset="-30" strokeLinecap="round"
            style={{ transition: 'stroke-dasharray 0.1s, stroke 0.2s' }}/>
        </svg>
        <div className="absolute inset-[10px] rounded-full bg-[#1a1d2e] border border-white/10 flex items-center justify-center">
          <div
            className="w-1 h-1 rounded-full bg-aurora-cyan absolute top-[10px] left-1/2 -translate-x-1/2"
            style={{
              transform: `translateX(-50%) rotate(${deg}deg)`,
              transformOrigin: '50% 25px',
              transition: dragging.current ? 'none' : 'transform 0.05s',
            }}
          />
        </div>
      </div>

      {/* Value */}
      <div className="flex items-baseline gap-1">
        <span className={`text-xl font-semibold tabular-nums ${muted ? 'text-white/25' : 'text-white'}`}>
          {Math.round(display)}
        </span>
        <span className="text-xs text-white/30">%</span>
      </div>

      {/* Sound bars */}
      <div className="flex items-end gap-[3px] h-6">
        {Array.from({ length: BAR_COUNT }).map((_, i) => {
          const threshold = (i / BAR_COUNT) * 100;
          const lit = !muted && vol > threshold;
          const ratio = i / BAR_COUNT;
          const h = Math.round(3 + ratio * 18);
          const color = lit
            ? ratio > 0.7 ? `rgba(255,107,107,${0.6 + ratio * 0.4})`
            : ratio > 0.4 ? `rgba(0,240,255,${0.5 + ratio * 0.5})`
            : `rgba(0,123,255,0.7)`
            : 'rgba(255,255,255,0.07)';
          return (
            <div
              key={i}
              className="w-1 rounded-sm transition-colors duration-150"
              style={{ height: h, background: color }}
            />
          );
        })}
      </div>

      {/* Mute */}
      <button
        onClick={toggleMute}
        className={`text-[10px] tracking-wider px-3 py-1 rounded-md border transition-all ${
          muted
            ? 'border-aurora-cyan text-aurora-cyan'
            : 'border-white/10 text-white/30 hover:border-white/25 hover:text-white/60'
        }`}
      >
        {muted ? 'unmute' : 'mute'}
      </button>
    </div>
  );
};

export default VolumeKnob;