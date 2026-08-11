import { useEffect, useState } from 'react';

const VolumeKnob = ({ onChange }) => {
  const [volume, setVolume] = useState(65);
  const [muted, setMuted] = useState(false);
  const [previousVolume, setPreviousVolume] = useState(65);

  const effectiveVolume = muted ? 0 : volume;

  useEffect(() => {
    onChange?.(effectiveVolume);
  }, [effectiveVolume, onChange]);

  const updateVolume = (next) => {
    const value = Math.max(0, Math.min(100, Number(next)));
    setVolume(value);
    if (value > 0) setMuted(false);
  };

  const toggleMute = () => {
    if (muted) {
      setMuted(false);
      setVolume(previousVolume || 50);
      return;
    }

    setPreviousVolume(volume || 50);
    setMuted(true);
  };

  return (
    <div className="w-[180px] rounded-2xl border border-white/10 bg-[#08111e]/95 p-4 shadow-2xl backdrop-blur-xl">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/35">Volume</p>
          <p className="mt-1 text-lg font-black tabular-nums text-white">{Math.round(effectiveVolume)}%</p>
        </div>
        <button
          type="button"
          onClick={toggleMute}
          className="rounded-lg border border-white/10 px-3 py-2 text-[11px] font-bold text-white/60 transition hover:border-aurora-cyan/40 hover:text-white"
          aria-pressed={muted}
          aria-label={muted ? '取消靜音' : '靜音'}
        >
          {muted ? '取消靜音' : '靜音'}
        </button>
      </div>

      <label className="block">
        <span className="sr-only">音量</span>
        <input
          type="range"
          min="0"
          max="100"
          step="1"
          value={effectiveVolume}
          onChange={(event) => updateVolume(event.target.value)}
          className="h-2 w-full cursor-pointer accent-cyan-300"
          aria-label="音量"
        />
      </label>

      <div className="mt-3 flex justify-between text-[10px] font-medium text-white/25" aria-hidden="true">
        <span>0</span>
        <span>50</span>
        <span>100</span>
      </div>
    </div>
  );
};

export default VolumeKnob;
