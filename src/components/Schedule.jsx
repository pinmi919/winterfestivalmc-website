import { CalendarDays, Clock3, PauseCircle, Sparkles } from 'lucide-react';
import { scheduleMeta, statusLabel, weeks } from '../data/schedule';

export default function Schedule() {
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
          </div>

          <div className="flex flex-col gap-2 text-sm text-gray-400 sm:flex-row sm:gap-6">
            <span className="flex items-center gap-2"><CalendarDays size={16} className="text-aurora-cyan" /> {scheduleMeta.dateRange}</span>
            <span className="flex items-center gap-2"><Clock3 size={16} className="text-aurora-cyan" /> {scheduleMeta.weeklyTime}</span>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {weeks.map((week) => {
            const isPlanning = week.status === 'planning';
            const isBreak = week.status === 'break';

            return (
              <article
                key={week.num}
                className={`group relative min-h-[190px] overflow-hidden rounded-3xl border p-6 transition-all duration-300 hover:-translate-y-1 ${
                  week.featured
                    ? 'border-aurora-cyan/30 bg-gradient-to-br from-aurora-cyan/10 via-white/[0.04] to-aurora-purple/10 shadow-[0_0_35px_rgba(0,240,255,0.07)]'
                    : isBreak
                      ? 'border-white/10 bg-white/[0.025]'
                      : isPlanning
                        ? 'border-dashed border-white/15 bg-white/[0.02]'
                        : 'border-white/10 bg-white/[0.04] hover:border-white/20'
                }`}
              >
                <div className="mb-10 flex items-center justify-between">
                  <span className="font-mono text-sm font-black tracking-widest text-aurora-cyan">
                    WEEK {String(week.num).padStart(2, '0')}
                  </span>
                  <span className={`rounded-full border px-2.5 py-1 text-[10px] font-bold tracking-widest ${
                    isBreak
                      ? 'border-white/10 bg-white/5 text-gray-400'
                      : isPlanning
                        ? 'border-aurora-purple/20 bg-aurora-purple/10 text-aurora-purple'
                        : 'border-aurora-cyan/20 bg-aurora-cyan/10 text-aurora-cyan'
                  }`}>
                    {statusLabel[week.status]}
                  </span>
                </div>

                <div className="flex items-end justify-between gap-4">
                  <h3 className={`text-2xl font-black ${isPlanning ? 'text-gray-500' : 'text-white'}`}>{week.title}</h3>
                  {isBreak ? (
                    <PauseCircle size={24} className="shrink-0 text-gray-500" />
                  ) : week.featured ? (
                    <Sparkles size={24} className="shrink-0 text-aurora-purple" />
                  ) : null}
                </div>

                {week.featured && (
                  <div className="pointer-events-none absolute -bottom-12 -right-12 h-32 w-32 rounded-full bg-aurora-cyan/10 blur-3xl" />
                )}
              </article>
            );
          })}
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.025] px-5 py-4 text-sm leading-6 text-gray-400">
          第 9、10 週目前仍在企劃階段，因此官網先明確標示為「規劃中」，不預先填入尚未定案的活動內容。
        </div>
      </div>
    </section>
  );
}
