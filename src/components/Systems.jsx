import { Award, Coins, Eye, Handshake, ListChecks, Sparkles } from 'lucide-react';
import { systemFootnote, winterSystems } from '../data/systems';

const iconById = {
  coins: Coins,
  daily: ListChecks,
  community: Handshake,
  hidden: Eye,
  awards: Award,
};

export default function Systems() {
  return (
    <section id="systems" className="relative overflow-hidden px-6 py-28 md:py-36">
      <div className="pointer-events-none absolute left-0 top-16 h-[420px] w-[420px] rounded-full bg-aurora-cyan/10 blur-[130px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[360px] w-[360px] rounded-full bg-aurora-purple/10 blur-[130px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-14 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-aurora-cyan/25 bg-aurora-cyan/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-aurora-cyan">
              <Sparkles size={15} />
              Winter Systems
            </div>
            <h2 className="text-4xl font-black leading-tight text-white md:text-6xl">
              讓 12 週活動彼此連結的，<span className="text-gradient">不只是每週主題。</span>
            </h2>
          </div>

          <p className="text-base leading-8 text-gray-400 md:text-lg">
            冬境之約以任務、冬境幣與季末回顧系統串起整個活動週期，讓玩家在每一天、每一週都有持續參與的理由。
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {winterSystems.map((system, index) => {
            const Icon = iconById[system.id] ?? Sparkles;
            const featured = system.id === 'coins' || system.id === 'awards';

            return (
              <article
                key={system.id}
                className={`group relative overflow-hidden rounded-3xl border p-7 transition-all duration-300 hover:-translate-y-1 md:p-8 ${
                  featured
                    ? 'border-aurora-cyan/25 bg-gradient-to-br from-aurora-cyan/10 via-white/[0.04] to-aurora-purple/10'
                    : 'border-white/10 bg-white/[0.035] hover:border-white/20'
                } ${index === 0 ? 'md:col-span-2 xl:col-span-1' : ''}`}
              >
                <div className="mb-7 flex items-start justify-between gap-4">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/5 text-aurora-cyan transition-transform duration-300 group-hover:-translate-y-1">
                    <Icon size={24} />
                  </div>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-black tracking-widest text-gray-400">
                    {system.meta}
                  </span>
                </div>

                <div className="mb-2 text-[11px] font-black uppercase tracking-[0.22em] text-aurora-purple">
                  {system.kicker}
                </div>
                <h3 className="mb-4 text-2xl font-black text-white">{system.title}</h3>
                <p className="text-sm leading-7 text-gray-400 md:text-base">{system.description}</p>

                {featured && (
                  <div className="pointer-events-none absolute -bottom-12 -right-12 h-32 w-32 rounded-full bg-aurora-cyan/10 blur-3xl" />
                )}
              </article>
            );
          })}
        </div>

        <div className="mt-6 rounded-2xl border border-dashed border-white/10 bg-white/[0.02] px-5 py-4 text-sm leading-6 text-gray-500">
          {systemFootnote}
        </div>
      </div>
    </section>
  );
}
