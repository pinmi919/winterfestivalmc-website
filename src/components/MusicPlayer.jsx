import { useEffect, useRef, useState } from 'react';
import VolumeKnob from './VolumeKnob';
import { assetUrl } from '../utils/assetUrl';

const TRACKS = [
  {
    title: '冬境之約主題曲 01',
    artist: '2026 MC Winter Festival',
    emoji: '❄️',
    color: '#22d3ee',
    src: assetUrl('2026MCWinterFestival冬境之約主題曲01.wav'),
  },
  {
    title: '波蘭牛',
    artist: 'polish cow',
    emoji: '🐄',
    color: '#818cf8',
    src: assetUrl('polish_cow.mp4'),
  },
];

const formatTime = (seconds) => {
  if (!Number.isFinite(seconds)) return '0:00';
  const whole = Math.max(0, Math.floor(seconds));
  return `${Math.floor(whole / 60)}:${String(whole % 60).padStart(2, '0')}`;
};

const MusicPlayer = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [showVolume, setShowVolume] = useState(false);
  const [currentSeconds, setCurrentSeconds] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef(null);
  const isPlayingRef = useRef(false);
  const currentTrack = TRACKS[currentTrackIndex];
  const progress = duration > 0 ? (currentSeconds / duration) * 100 : 0;

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    const mobile = window.matchMedia('(max-width: 767px)');
    const applyMobileDefault = () => {
      if (mobile.matches) setIsMinimized(true);
    };

    applyMobileDefault();
    mobile.addEventListener('change', applyMobileDefault);
    return () => mobile.removeEventListener('change', applyMobileDefault);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return undefined;

    const updateTime = () => setCurrentSeconds(audio.currentTime || 0);
    const updateDuration = () => setDuration(Number.isFinite(audio.duration) ? audio.duration : 0);
    const handleEnded = () => setCurrentTrackIndex((index) => (index + 1) % TRACKS.length);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('durationchange', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('durationchange', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.load();
    setCurrentSeconds(0);
    setDuration(0);

    if (isPlayingRef.current) {
      audio.play().catch(() => setIsPlaying(false));
    }
  }, [currentTrackIndex]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    try {
      await audio.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  const seek = (event) => {
    if (!audioRef.current || !duration) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
    audioRef.current.currentTime = ratio * duration;
  };

  const changeTrack = (index) => {
    setCurrentTrackIndex(index);
    setShowPlaylist(false);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2 sm:bottom-6 sm:right-6">
      <audio ref={audioRef} src={currentTrack.src} preload="metadata" />

      {isMinimized ? (
        <button
          type="button"
          onClick={() => setIsMinimized(false)}
          className="grid h-12 w-12 place-items-center rounded-full border border-white/10 bg-[#08111e]/90 text-lg text-white shadow-2xl backdrop-blur-xl transition hover:scale-105 hover:border-aurora-cyan/40"
          aria-label="開啟音樂播放器"
        >
          ♪
        </button>
      ) : (
        <div className="relative flex max-w-[calc(100vw-2rem)] items-end">
          {showPlaylist && (
            <div className="absolute bottom-full right-0 mb-2 w-[min(280px,calc(100vw-2rem))] rounded-2xl border border-white/10 bg-[#08111e]/95 p-3 shadow-2xl backdrop-blur-xl">
              <p className="mb-2 px-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/35">Playlist</p>
              <div className="grid gap-1">
                {TRACKS.map((track, index) => (
                  <button
                    type="button"
                    key={track.title}
                    onClick={() => changeTrack(index)}
                    className={`flex items-center gap-3 rounded-xl px-3 py-2 text-left text-sm transition ${index === currentTrackIndex ? 'bg-white/10 text-white' : 'text-white/55 hover:bg-white/5 hover:text-white'}`}
                  >
                    <span aria-hidden="true">{track.emoji}</span>
                    <span className="min-w-0 flex-1 truncate">{track.title}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {showVolume && (
            <div className="absolute bottom-full right-0 mb-2">
              <VolumeKnob
                onChange={(value) => {
                  if (audioRef.current) audioRef.current.volume = value / 100;
                }}
              />
            </div>
          )}

          <div className="flex w-[min(360px,calc(100vw-2rem))] items-center gap-3 rounded-2xl border border-white/10 bg-[#08111e]/92 p-3 shadow-2xl backdrop-blur-xl sm:gap-4 sm:p-4">
            <div className="relative h-14 w-14 shrink-0 sm:h-[68px] sm:w-[68px]">
              <div className="absolute inset-0 rounded-full border border-white/10 bg-gradient-to-br from-gray-800 via-gray-950 to-black" />
              <div
                className="absolute inset-[10px] grid place-items-center overflow-hidden rounded-full"
                style={{
                  backgroundColor: currentTrack.color,
                  animation: isPlaying ? 'mcwf-record-spin 8s linear infinite' : 'none',
                }}
              >
                {currentTrackIndex === 1 ? (
                  <img src={assetUrl('cow.gif')} alt="波蘭牛彩蛋封面" loading="lazy" decoding="async" className="h-full w-full scale-125 object-cover" />
                ) : (
                  <span className="text-lg" aria-hidden="true">{currentTrack.emoji}</span>
                )}
              </div>
            </div>

            <div className="min-w-0 flex-1">
              <div className="mb-2 min-w-0">
                <p className="truncate text-sm font-bold text-white">{currentTrack.title}</p>
                <p className="truncate text-[11px] text-white/40">{currentTrack.artist}</p>
              </div>

              <button
                type="button"
                onClick={seek}
                className="mb-2 flex w-full items-center gap-2 text-left"
                aria-label={`播放進度 ${formatTime(currentSeconds)} / ${formatTime(duration)}`}
              >
                <span className="h-1 flex-1 overflow-hidden rounded-full bg-white/10">
                  <span className="block h-full rounded-full" style={{ width: `${progress}%`, backgroundColor: currentTrack.color }} />
                </span>
                <span className="min-w-[64px] text-right text-[10px] tabular-nums text-white/30">
                  {formatTime(currentSeconds)} / {formatTime(duration)}
                </span>
              </button>

              <div className="flex items-center gap-1">
                <button type="button" onClick={() => setShowVolume((value) => !value)} className="rounded-lg p-2 text-white/55 transition hover:bg-white/5 hover:text-white" aria-label="音量設定">⌕</button>
                <button type="button" onClick={() => setCurrentTrackIndex((index) => (index - 1 + TRACKS.length) % TRACKS.length)} className="rounded-lg p-2 text-white/55 transition hover:bg-white/5 hover:text-white" aria-label="上一首">◀</button>
                <button type="button" onClick={togglePlay} className="rounded-lg p-2 text-white transition hover:bg-white/5" aria-label={isPlaying ? '暫停' : '播放'}>{isPlaying ? '❚❚' : '▶'}</button>
                <button type="button" onClick={() => setCurrentTrackIndex((index) => (index + 1) % TRACKS.length)} className="rounded-lg p-2 text-white/55 transition hover:bg-white/5 hover:text-white" aria-label="下一首">▶</button>
                <button type="button" onClick={() => setShowPlaylist((value) => !value)} className="rounded-lg p-2 text-white/55 transition hover:bg-white/5 hover:text-white" aria-label="播放清單">☷</button>
                <button
                  type="button"
                  onClick={() => {
                    setIsMinimized(true);
                    setShowPlaylist(false);
                    setShowVolume(false);
                  }}
                  className="ml-auto rounded-lg p-2 text-white/30 transition hover:bg-white/5 hover:text-white/70"
                  aria-label="縮小播放器"
                >
                  —
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes mcwf-record-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default MusicPlayer;
