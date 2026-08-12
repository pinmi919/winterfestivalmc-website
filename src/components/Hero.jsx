import { useEffect, useState } from 'react';
import { CalendarDays, Radio, Sparkles } from 'lucide-react';
import { assetUrl } from '../utils/assetUrl';
import { EVENT_START, getCountdown, getEventStatus } from '../utils/eventStatus';

const countdownUnits = [
  ['天', 'days'],
  ['時', 'hours'],
  ['分', 'minutes'],
  ['秒', 'seconds'],
];

function StatusContent({ eventStatus, timeLeft, compact = false }) {
  const showCountdown = eventStatus.phase === 'upcoming';

  if (showCountdown) {
    return (
      <>
        <p className="mb-3 text-sm text-gray-400">{eventStatus.detail}</p>
        <div className={`grid grid-cols-4 text-center font-mono ${compact ? 'gap-2' : 'gap-3'}`}>
          {countdownUnits.map(([label, key]) => (
            <div key={key} className={`rounded-xl border border-white/5 bg-white/5 ${compact ? 'px-1.5 py-2.5' : 'px-2 py-3'}`}>
              <div className={`${compact ? 'text-lg' : 'text-xl'} font-black tabular-nums text-white`}>{timeLeft[key]}</div>
              <div className="mt-1 text-[10px] text-gray-500">{label}</div>
            </div>
          ))}
        </div>
      </>
    );
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-center gap-2 text-lg font-black text-white">
        {eventStatus.phase === 'live' && <Radio size={18} className="text-aurora-cyan" />}
        {eventStatus.detail}
      </div>
      <p className="mt-2 text-sm leading-6 text-gray-400">
        {eventStatus.phase === 'ended'
          ? '感謝所有參與本屆冬境之約的創作者與觀眾。'
          : eventStatus.phase === 'break'
            ? '本週暫停官方活動，下一週再回到冬境相聚。'
            : 'Winter Festival 2026 活動期間中，本週主題與詳細內容可於活動週次查看。'}
      </p>
    </div>
  );
}

export default function Hero() {
  const [timeLeft, setTimeLeft] = useState(() => getCountdown());
  const [eventStatus, setEventStatus] = useState(() => getEventStatus());

  useEffect(() => {
    const updateStatus = () => {
      setTimeLeft(getCountdown(EVENT_START));
      setEventStatus(getEventStatus());
    };

    updateStatus();
    const interval = window.setInterval(updateStatus, 1000);
    return () => window.clearInterval(interval);
  }, []);

  const statusAccent = eventStatus.phase === 'live'
    ? 'text-aurora-cyan border-aurora-cyan/30 bg-aurora-cyan/10'
    : eventStatus.phase === 'break'
      ? 'text-gray-300 border-white/10 bg-white/5'
      : eventStatus.phase === 'ended'
        ? 'text-gray-400 border-white/10 bg-white/5'
        : 'text-aurora-purple border-aurora-purple/30 bg-aurora-purple/10';

  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden pb-24 pt-32 sm:pt-36">
      <div className="absolute inset-0 bg-night">
        <img
          src={assetUrl('bg-blur.png')}
          alt=""
          aria-hidden="true"
          className="h-full w-full scale-110 object-cover opacity-70 blur-[18px]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_35%,rgba(0,240,255,0.14),transparent_34%),radial-gradient(circle_at_30%_65%,rgba(139,92,246,0.16),transparent_32%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-night/35 via-night/50 to-night" />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-12 px-6 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-7">
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-aurora-cyan/25 bg-aurora-cyan/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-aurora-cyan">
              <Sparkles size={15} />
              Minecraft Java Creator Event
            </div>
            <div className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-black tracking-[0.12em] ${statusAccent}`}>
              {eventStatus.phase === 'live' && <Radio size={13} />}
              {eventStatus.label}
            </div>
          </div>

          <img
            src={assetUrl('logo.png')}
            alt="2026 MC Winter Festival 冬境之約"
            className="mb-8 h-auto w-72 object-contain drop-shadow-[0_0_24px_rgba(255,255,255,0.18)] sm:w-96 lg:w-[520px]"
          />

          <h1 className="max-w-3xl text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            一年一次，<span className="text-gradient">冬日相聚。</span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-gray-300 sm:text-lg">
            2026 MC Winter Festival｜冬境之約，是以創作者交流、共同創作與冬季節慶為核心的 12 週 Minecraft Java 聯動企劃。
          </p>

          <div className="mt-8 grid gap-3 text-sm sm:grid-cols-2 lg:max-w-2xl">
            <div className="glass-panel flex items-center gap-3 px-4 py-3">
              <CalendarDays size={18} className="shrink-0 text-aurora-cyan" />
              <div>
                <div className="text-xs text-gray-500">活動期間</div>
                <strong className="text-white">2026/11/27 — 2027/02/20</strong>
              </div>
            </div>
            <div className="glass-panel px-4 py-3">
              <div className="text-xs text-gray-500">伺服器版本</div>
              <strong className="text-white">Minecraft Java 1.21.11</strong>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-[#08111e]/70 p-4 backdrop-blur-xl lg:hidden">
            <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-aurora-purple">
              <Sparkles size={14} />
              {eventStatus.label}
            </div>
            <StatusContent eventStatus={eventStatus} timeLeft={timeLeft} compact />
          </div>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href="#schedule" className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-aurora-cyan to-aurora-blue px-7 py-3.5 text-sm font-black text-night shadow-[0_0_25px_rgba(0,240,255,0.28)] transition-transform hover:-translate-y-0.5">
              查看 12 週活動
            </a>
            <a href="#systems" className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-bold text-white backdrop-blur-xl transition-colors hover:border-white/30 hover:bg-white/10">
              查看冬境系統
            </a>
            <a href="#about" className="inline-flex items-center justify-center px-4 py-3 text-sm font-bold text-gray-400 transition-colors hover:text-white sm:px-2">
              認識企劃 →
            </a>
          </div>
        </div>

        <div className="relative hidden h-[560px] lg:col-span-5 lg:block">
          <div className="absolute right-0 top-0 h-[360px] w-[88%] rotate-2 overflow-hidden rounded-3xl border border-white/10 bg-[#0D111A] shadow-[0_25px_70px_rgba(0,0,0,0.55)] transition-transform duration-500 hover:rotate-0">
            <img src={assetUrl('pic1.png')} alt="Winter Festival 2026 視覺" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-night/80 via-transparent to-transparent" />
          </div>

          <div className="absolute bottom-24 left-0 z-20 h-[260px] w-[72%] -rotate-3 overflow-hidden rounded-3xl border border-aurora-cyan/25 bg-[#0D111A] shadow-[0_0_45px_rgba(0,240,255,0.14)] transition-transform duration-500 hover:rotate-0">
            <img src={assetUrl('pic2.png')} alt="Winter Festival 2026 活動視覺" className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
          </div>

          <div className="glass-panel absolute bottom-0 right-2 z-30 w-[88%] border-aurora-purple/25 bg-[#0D111A]/90 p-5 shadow-[0_18px_45px_rgba(0,0,0,0.55)]">
            <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-aurora-purple">
              <Sparkles size={15} />
              {eventStatus.label}
            </div>
            <StatusContent eventStatus={eventStatus} timeLeft={timeLeft} />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 z-20 flex w-full overflow-hidden border-t border-white/5 bg-night/60 py-4 backdrop-blur-md">
        <div className="animate-marquee flex items-center gap-12 whitespace-nowrap text-xs font-bold uppercase tracking-[0.22em] text-gray-500">
          {Array(4).fill('12 週主題活動 • 每日任務 • 每週合作任務 • 隱藏任務 • 冬境幣 • Winter Awards • 創作者聯動').map((text, index) => (
            <span key={index}>{text}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
