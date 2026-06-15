import React, { useState, useRef, useEffect } from 'react';
import VolumeKnob from './VolumeKnob';

const MusicPlayer = ({ isMinimized: initMin = false }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMinimized, setIsMinimized] = useState(initMin);
  const [progress, setProgress] = useState(0);
  const [currentSeconds, setCurrentSeconds] = useState(0);
  const [showVolume, setShowVolume] = useState(false);
  
  const audioRef = useRef(null);
  const intervalRef = useRef(null);
  const totalSeconds = 234;

  const formatTime = (s) =>
    `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  const startPlay = () => {
    setIsPlaying(true);
    audioRef.current?.play();
    intervalRef.current = setInterval(() => {
      setCurrentSeconds((prev) => {
        const next = Math.min(prev + 1, totalSeconds);
        setProgress((next / totalSeconds) * 100);
        return next;
      });
    }, 1000);
  };

  const stopPlay = () => {
    setIsPlaying(false);
    audioRef.current?.pause();
    clearInterval(intervalRef.current);
  };

  const togglePlay = () => (isPlaying ? stopPlay() : startPlay());

  useEffect(() => () => clearInterval(intervalRef.current), []);

  const handleProgressClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    const secs = Math.round(pct * totalSeconds);
    setCurrentSeconds(secs);
    setProgress(pct * 100);
    if (audioRef.current) audioRef.current.currentTime = secs;
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex justify-end items-end">
      
      <audio ref={audioRef} src="/2026MCWinterFestival冬境之約主題曲01.wav" loop />

      {/* --- MINIMIZED BUTTON --- */}
      {/* Hidden when isMinimized is false */}
      <button
        onClick={() => setIsMinimized(false)}
        className={`w-12 h-12 rounded-full bg-night border border-white/10 shadow-lg justify-center items-center text-xl text-white transition-transform hover:scale-110 ${
          isMinimized ? 'flex' : 'hidden'
        }`}
      >
        ♪
      </button>

      {/* --- EXPANDED PLAYER --- */}
      {/* Hidden when isMinimized is true */}
      <div 
        className={`gap-4 bg-night border border-white/10 rounded-[20px] shadow-2xl p-4 w-[340px] items-center ${
          isMinimized ? 'hidden' : 'flex'
        }`}
      >
        
        <div className="relative flex-shrink-0 w-[72px] h-[72px]">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-700 via-gray-900 to-black border border-white/10" />
          
          <div
            className="absolute inset-[6px] rounded-full overflow-hidden"
            style={{
              animation: isPlaying ? 'spin 8s linear infinite' : 'none',
            }}
          >
            <img
              src="/cow.gif"
              alt="Album art"
              className="w-full h-full object-cover rounded-full"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <div
              className="w-full h-full rounded-full bg-gradient-to-br from-aurora-cyan via-blue-500 to-night hidden"
            />
          </div>

          <div
            className="absolute inset-0 rounded-full border border-white/5"
            style={{ boxShadow: 'inset 0 0 0 8px rgba(255,255,255,0.03), inset 0 0 0 16px rgba(255,255,255,0.02)' }}
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white/80 border border-black/20 z-10" />
        </div>

        <div className="flex-1 min-w-0">
          <p className="font-semibold text-[14px] text-white truncate leading-tight mb-0.5">
            冬境之約主題曲
          </p>
          <p className="text-[12px] text-white/40 leading-tight mb-2.5">
            2026 MC Winter Festival
          </p>

          <div className="flex items-center gap-1.5 mb-2">
            <div
              className="flex-1 h-[3px] bg-white/10 rounded-full cursor-pointer overflow-hidden"
              onClick={handleProgressClick}
            >
              <div
                className="h-full bg-aurora-cyan rounded-full transition-[width] duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-[10px] text-white/30 tabular-nums min-w-[30px] text-right">
              {formatTime(currentSeconds)}
            </span>
          </div>

          <div className="flex items-center gap-0.5">
            
            <div className="relative flex items-center">
              <button
                onClick={() => setShowVolume(!showVolume)}
                className={`p-1 rounded-md transition-colors ${showVolume ? 'text-white' : 'text-white/60 hover:text-white'}`}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
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

            <button className="p-1.5 rounded-md text-white/60 hover:text-white hover:bg-white/5 transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 20L9 12l10-8v16z"/>
                <rect x="5" y="4" width="2" height="16" rx="1"/>
              </svg>
            </button>

            <button
              onClick={togglePlay}
              className="p-1.5 rounded-md text-white hover:bg-white/5 transition-colors"
            >
              {isPlaying ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              )}
            </button>

            <button className="p-1.5 rounded-md text-white/60 hover:text-white hover:bg-white/5 transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M5 4l10 8-10 8V4z"/>
                <rect x="17" y="4" width="2" height="16" rx="1"/>
              </svg>
            </button>

            <button
              onClick={() => {
                setIsMinimized(true);
                setShowVolume(false);
              }}
              className="ml-auto p-1 rounded-md text-white/20 hover:text-white/50 transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 13H5v-2h14v2z"/>
              </svg>
            </button>
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