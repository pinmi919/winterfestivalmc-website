import { useEffect, useState } from 'react';
import { CalendarDays, Clock3, PauseCircle, Radio, Sparkles, X } from 'lucide-react';
import { scheduleMeta, statusLabel, weeks } from '../data/schedule';
import { eventDetails } from '../data/events';
import { getEventStatus } from '../utils/eventStatus';

export default function Schedule() {
  const eventStatus = getEventStatus();
  const currentWeekNumber = eventStatus.week?.num ?? null;
  const [selectedWeek, setSelectedWeek] = useState(null);

  useEffect(() => {
    if (!selectedWeek) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setSelectedWeek(null);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [selectedWeek]);

  const selectedDetail = selectedWeek ? eventDetails[selectedWeek.num] : null;

  return (
    <section id="schedule" className="relative px-6 py-28 md:py-36">
      <div className="pointer-events-none absolute right-0 top-16 h-[420px] w-[420px] rounded-full bg-aurora-purple/10 blur-[130px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-14 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-aurora-purple/25 bg-aurora-purple/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-aurora-purple">
              <CalendarDays size={15} />
              12 Week Journey
            </div>
            <h2 className="text-4xl font-black text-white md:text-6xl">
              12 週，<span className="text-gradient">每週都有新的相聚理由。</span>
            </h2>
            <p className="mt-4 text-sm text-gray-500">點擊任一週次即可查看活動詳細資訊。</p>
          </div>

          <div className="flex flex-col gap-2 text-sm text-gray-400 sm:flex-row sm:gap-6">
            <span className="flex items-center gap-2"><CalendarDays size={16} className="text-aurora-cyan" /> {scheduleMeta.dateRange}</span>
            <span className="flex items-center gap-2"><Clock3 size={16} className="text-aurora-cyan" /> {scheduleMeta.weeklyTime}</span>
          </div>
        </div>

        {eventStatus.phase !== 'upcoming' && eventStatus.phase !== 'ended' && (
          <div className="mb-6 flex items-center gap-3 rounded-2xl border border-aurora-cyan/25 bg-aurora-cyan/[0.07] px-5 py-4 text-sm text-gray-300">
            <Radio size={17} className="shrink-0 text-aurora-cyan" />
            <span>
              目前進度：<strong className="text-white">{eventStatus.detail}</strong>
              {eventStatus.phase === 'break' ? '（本週暫停官方活動）' : ''}
            </span>
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {weeks.map((week) => {
            const isPlanning = week.status === 'planning';
            const isBreak = week.status === 'break';
            const isCurrent = week.num === currentWeekNumber;

            return (
              <button
                type="button"
                key={week.num}
                onClick={() => setSelectedWeek(week)}
                className={`group relative min-h-[190px] overflow-hidden rounded-3xl border p-6 text-left transition-all duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-cyan/70 ${
                  isCurrent
                    ? 'border-aurora-cyan/60 bg-gradient-to-br from-aurora-cyan/15 via-white/[0.06] to-aurora-purple/10 shadow-[0_0_40px_rgba(0,240,255,0.12)]'
                    : week.featured
                      ? 'border-aurora-cyan/30 bg-gradient-to-br from-aurora-cyan/10 via-white/[0.04] to-aurora-purple/10 shadow-[0_0_35px_rgba(0,240,255,0.07)]'
                      : isBreak
                        ? 'border-white/10 bg-white/[0.025]'
                        : isPlanning
                          ? 'border-dashed border-white/15 bg-white/[0.02]'
                          : 'border-white/10 bg-white/[0.04] hover:border-white/20'
                }`}
                aria-label={`查看 Week ${week.num} ${week.title} 詳細內容`}
              >
                {isCurrent && (
                  <div className="absolute right-4 top-4 rounded-full border border-aurora-cyan/30 bg-aurora-cyan/10 px-2.5 py-1 text-[10px] font-black tracking-widest text-aurora-cyan">
                    CURRENT
                  </div>
                )}

                <div className="mb-10 flex items-center justify-between pr-16">
                  <span className="font-mono text-sm font-black tracking-widest text-aurora-cyan">
                    WEEK {String(week.num).padStart(2, '0')}
                  </span>
                  {!isCurrent && (
                    <span className={`rounded-full border px-2.5 py-1 text-[10px] font-bold tracking-widest ${
                      isBreak
                        ? 'border-white/10 bg-white/5 text-gray-400'
                        : isPlanning
                          ? 'border-aurora-purple/20 bg-aurora-purple/10 text-aurora-purple'
                          : 'border-aurora-cyan/20 bg-aurora-cyan/10 text-aurora-cyan'
                    }`}>
                      {statusLabel[week.status]}
                    </span>
                  )}
                </div>

                <div className="flex items-end justify-between gap-4">
                  <div>
                    <h3 className={`text-2xl font-black ${isPlanning && !isCurrent ? 'text-gray-500' : 'text-white'}`}>{week.title}</h3>
                    <span className="mt-3 inline-block text-xs font-bold text-gray-500 transition-colors group-hover:text-aurora-cyan">查看詳情 →</span>
                  </div>
                  {isBreak ? (
                    <PauseCircle size={24} className="shrink-0 text-gray-500" />
                  ) : isCurrent ? (
                    <Radio size={24} className="shrink-0 text-aurora-cyan" />
                  ) : week.featured ? (
                    <Sparkles size={24} className="shrink-0 text-aurora-purple" />
                  ) : null}
                </div>

                {(week.featured || isCurrent) && (
                  <div className="pointer-events-none absolute -bottom-12 -right-12 h-32 w-32 rounded-full bg-aurora-cyan/10 blur-3xl" />
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.025] px-5 py-4 text-sm leading-6 text-gray-400">
          第 9、10 週目前仍在企劃階段，因此官網先明確標示為「規劃中」，不預先填入尚未定案的活動內容。
        </div>
      </div>

      {selectedWeek && selectedDetail && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-[#02060d]/80 p-4 backdrop-blur-xl sm:p-6"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedWeek(null);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="event-detail-title"
            className="relative max-h-[88vh] w-full max-w-3xl overflow-y-auto rounded-[2rem] border border-white/10 bg-[#08111e] p-6 shadow-[0_30px_100px_rgba(0,0,0,0.65)] sm:p-9"
          >
            <button
              type="button"
              onClick={() => setSelectedWeek(null)}
              className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-gray-400 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
              aria-label="關閉活動詳情"
            >
              <X size={18} />
            </button>

            <div className="mb-7 pr-12">
              <div className="mb-3 font-mono text-xs font-black tracking-[0.24em] text-aurora-cyan">
                WEEK {String(selectedWeek.num).padStart(2, '0')} · {statusLabel[selectedWeek.status]}
              </div>
              <h3 id="event-detail-title" className="text-3xl font-black text-white sm:text-5xl">{selectedWeek.title}</h3>
              <div className="mt-5 flex flex-wrap gap-3 text-sm text-gray-400">
                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">{scheduleMeta.weeklyTime}</span>
                {selectedWeek.status === 'planning' && (
                  <span className="rounded-full border border-aurora-purple/20 bg-aurora-purple/10 px-4 py-2 text-aurora-purple">內容規劃中</span>
                )}
                {selectedWeek.status === 'break' && (
                  <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">本週暫停官方活動</span>
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 text-sm leading-7 text-gray-300 sm:p-6 sm:text-base">
              {selectedDetail.summary}
            </div>

            {selectedDetail.sections.length > 0 ? (
              <div className="mt-6 grid gap-4">
                {selectedDetail.sections.map((section) => (
                  <div key={section.title} className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
                    <h4 className="mb-3 font-black text-white">{section.title}</h4>
                    <div className="text-sm leading-7 text-gray-400">{section.content}</div>
                  </div>
                ))}
              </div>
            ) : selectedWeek.status !== 'break' && (
              <div className="mt-6 rounded-2xl border border-dashed border-white/10 px-5 py-5 text-sm leading-6 text-gray-500">
                活動流程、詳細規則、參加方式、冬境幣獎勵與注意事項尚未定案。確認後會直接更新在這個詳情視窗中。
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
