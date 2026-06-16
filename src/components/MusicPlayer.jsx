import React, { useState, useRef, useEffect } from 'react';
import VolumeKnob from './VolumeKnob';

const TRACKS = [
  {
    title: '冬境之約主題曲 01',
    artist: '2026 MC Winter Festival',
    duration: 108,
    emoji: '❄️',
    color: '#22d3ee',
    src: '/2026MCWinterFestival冬境之約主題曲01.wav',
  },
  {
    title: '波蘭牛',
    artist: 'polish cow',
    duration: 243,
    emoji: '🐄',
    color: '#818cf8',
    src: '/polish_cow.mp4',
  },
];

const MusicPlayer = ({ isMinimized: initMin = false }) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMinimized, setIsMinimized] = useState(initMin);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentSeconds, setCurrentSeconds] = useState(0);
  const [showVolume, setShowVolume] = useState(false);

  const audioRef = useRef(null);
  const intervalRef = useRef(null);

  const currentTrack = TRACKS[currentTrackIndex];
  const totalSeconds = currentTrack.duration;

  const formatTime = (s) =>
    `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  const startTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (audioRef.current) {
        const secs = Math.floor(audioRef.current.currentTime);
        setCurrentSeconds(secs);
        setProgress((secs / totalSeconds) * 100);

        if (audioRef.current.ended) {
          handleNext();
        }
      }
    }, 250);
  };

  const startPlay = () => {
    setIsPlaying(true);
    audioRef.current?.play().catch(() => {});
    startTimer();
  };

  const stopPlay = () => {
    setIsPlaying(false);
    audioRef.current?.pause();
    clearInterval(intervalRef.current);
  };

  const togglePlay = () => (isPlaying ? stopPlay() : startPlay());

  // --- AUTOPLAY WITH INTERACTION FALLBACK ---
  useEffect(() => {
    let hasStarted = false;

    const attemptPlay = () => {
      if (hasStarted || !audioRef.current) return;

      audioRef.current
        .play()
        .then(() => {
          hasStarted = true;
          setIsPlaying(true);
          startTimer();
          removeListeners();
        })
        .catch(() => {
          // Still blocked by browser, will retry on next user interaction
        });
    };

    const removeListeners = () => {
      window.removeEventListener('click', attemptPlay);
      window.removeEventListener('keydown', attemptPlay);
      window.removeEventListener('touchstart', attemptPlay);
      window.removeEventListener('scroll', attemptPlay);
    };

    // 1. Try immediately (works if browser policy allows it)
    attemptPlay();

    // 2. Fallback: play on first user interaction
    window.addEventListener('click', attemptPlay);
    window.addEventListener('keydown', attemptPlay);
    window.addEventListener('touchstart', attemptPlay);
    window.addEventListener('scroll', attemptPlay);

    return () => removeListeners();
  }, []); // runs once on mount

  // Track switching logic
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      setCurrentSeconds(0);
      setProgress(0);
      if (isPlaying) {
        audioRef.current
          .play()
          .then(startTimer)
          .catch(() => setIsPlaying(false));
      }
    }
  }, [currentTrackIndex]);

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
  };

  const handlePrev = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
  };

  const handleProgressClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    const secs = Math.round(pct * totalSeconds);
    setCurrentSeconds(secs);
    setProgress(pct * 100);
    if (audioRef.current) audioRef.current.currentTime = secs;
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">

      <audio ref={audioRef} src={currentTrack.src} />

      {/* --- MINIMIZED BUTTON --- */}
      <button
        onClick={() => setIsMinimized(false)}
        className={`w-12 h-12 rounded-full bg-night border border-white/10 shadow-lg justify-center items-center text-xl text-white transition-transform hover:scale-110 ${
          isMinimized ? 'flex' : 'hidden'
        }`}
      >
        ♪
      </button>

      {/* --- MAIN INTERFACE GRID --- */}
      <div className={`relative flex items-end ${isMinimized ? 'hidden' : 'flex'}`}>

        {/* --- PLAYLIST DRAWER --- */}
        <div
          className={`bg-night border border-white/10 rounded-l-[20px] shadow-2xl p-4 w-[240px] h-[104px] mr-[-20px] pr-[36px] transition-all duration-300 overflow-y-auto flex flex-col gap-1 z-0 ${
            showPlaylist
              ? 'opacity-100 translate-x-0 pointer-events-auto'
              : 'opacity-0 translate-x-10 pointer-events-none'
          }`}
        >
          <p className="text-[11px] font-bold text-white/40 uppercase tracking-wider mb-1">
            Playlist
          </p>
          {TRACKS.map((track, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentTrackIndex(idx)}
              className={`flex items-center gap-2 w-full text-left p-1 rounded transition-colors text-[12px] ${
                idx === currentTrackIndex
                  ? 'bg-white/10 text-white font-medium'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>{track.emoji}</span>
              <span className="truncate flex-1">{track.title}</span>
            </button>
          ))}
        </div>

        {/* --- EXPANDED PLAYER BOX --- */}
        <div className="gap-4 bg-night border border-white/10 rounded-[20px] shadow-2xl p-4 w-[340px] items-center flex z-10">

          {/* --- ROTATING VINYL DISC --- */}
          <div className="relative flex-shrink-0 w-[72px] h-[72px]">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-800 via-gray-950 to-black border border-white/10 shadow-inner" />
            <div
              className="absolute inset-[4px] rounded-full border border-black/40"
              style={{ boxShadow: 'inset 0 0 0 2px rgba(255,255,255,0.05)' }}
            />
            <div className="absolute inset-[12px] rounded-full border border-white/5" />

            <div
              className="absolute inset-[16px] rounded-full overflow-hidden flex items-center justify-center transition-colors duration-500 shadow-md"
              style={{
                animation: isPlaying ? 'spin 8s linear infinite' : 'none',
                backgroundColor: currentTrack.color || '#374151',
              }}
            >
              {currentTrackIndex === 1 ? (
                <img
                  src="/cow.gif"
                  alt="Album art"
                  className="w-full h-full object-cover scale-125"
                />
              ) : (
                <span className="text-[20px] select-none filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
                  {currentTrack.emoji}
                </span>
              )}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-black/20 via-transparent to-white/10 pointer-events-none" />
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white border border-black/30 z-10 shadow-sm" />
          </div>

          {/* --- TRACK INFO & CONTROLS --- */}
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-[14px] text-white truncate leading-tight mb-0.5">
              {currentTrack.title}
            </p>
            <p className="text-[12px] text-white/40 leading-tight mb-2.5 truncate">
              {currentTrack.artist}
            </p>

            {/* Progress bar */}
            <div className="flex items-center gap-1.5 mb-2">
              <div
                className="flex-1 h-[3px] bg-white/10 rounded-full cursor-pointer overflow-hidden"
                onClick={handleProgressClick}
              >
                <div
                  className="h-full rounded-full transition-[width] duration-150"
                  style={{ width: `${progress}%`, backgroundColor: currentTrack.color }}
                />
              </div>
              <span className="text-[10px] text-white/30 tabular-nums min-w-[30px] text-right">
                {formatTime(currentSeconds)}
              </span>
            </div>

            {/* Controls row */}
            <div className="flex items-center gap-0.5">

              {/* Volume */}
              <div className="relative flex items-center">
                <button
                  onClick={() => setShowVolume(!showVolume)}
                  className={`p-1 rounded-md transition-colors ${
                    showVolume ? 'text-white' : 'text-white/60 hover:text-white'
                  }`}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                  </svg>
                </button>
                <div
                  className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-4 z-50 transition-all duration-200 origin-bottom ${
                    showVolume
                      ? 'opacity-100 visible scale-100 translate-y-0'
                      : 'opacity-0 invisible scale-95 translate-y-2'
                  }`}
                >
                  <VolumeKnob
                    onChange={(v) => {
                      if (audioRef.current) audioRef.current.volume = v / 100;
                    }}
                  />
                </div>
              </div>

              {/* Previous */}
              <button
                onClick={handlePrev}
                className="p-1.5 rounded-md text-white/60 hover:text-white hover:bg-white/5 transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 20L9 12l10-8v16z" />
                  <rect x="5" y="4" width="2" height="16" rx="1" />
                </svg>
              </button>

              {/* Play / Pause */}
              <button
                onClick={togglePlay}
                className="p-1.5 rounded-md text-white hover:bg-white/5 transition-colors"
              >
                {isPlaying ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>

              {/* Next */}
              <button
                onClick={handleNext}
                className="p-1.5 rounded-md text-white/60 hover:text-white hover:bg-white/5 transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M5 4l10 8-10 8V4z" />
                  <rect x="17" y="4" width="2" height="16" rx="1" />
                </svg>
              </button>

              {/* Playlist toggle */}
              <button
                onClick={() => setShowPlaylist(!showPlaylist)}
                className={`p-1.5 rounded-md transition-colors ${
                  showPlaylist
                    ? 'text-white'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="8" y1="6" x2="21" y2="6" />
                  <line x1="8" y1="12" x2="21" y2="12" />
                  <line x1="8" y1="18" x2="21" y2="18" />
                  <line x1="3" y1="6" x2="3.01" y2="6" />
                  <line x1="3" y1="12" x2="3.01" y2="12" />
                  <line x1="3" y1="18" x2="3.01" y2="18" />
                </svg>
              </button>

              {/* Minimize */}
              <button
                onClick={() => {
                  setIsMinimized(true);
                  setShowVolume(false);
                  setShowPlaylist(false);
                }}
                className="ml-auto p-1 rounded-md text-white/20 hover:text-white/50 transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 13H5v-2h14v2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default MusicPlayer;