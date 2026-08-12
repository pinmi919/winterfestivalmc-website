import { CalendarClock, CircleCheck, Copy, Server, ShieldCheck, Users } from 'lucide-react';
import { joinSteps, participationNotes, serverFacts, serverStatus } from '../data/server';

const iconMap = {
  server: Server,
  shield: ShieldCheck,
  users: Users,
  calendar: CalendarClock,
};

export default function Requirements() {
  return (
    <section id="server" className="relative z-10 overflow-hidden px-6 py-28">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-aurora-blue/10 blur-[130px]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <span className="mb-4 inline-flex rounded-full border border-aurora-cyan/20 bg-aurora-cyan/10 px-4 py-2 text-xs font-black uppercase tracking-[0.24em] text-aurora-cyan">
            Server & Join Info
          </span>
          <h2 className="text-4xl font-black tracking-tight text-white md:text-5xl">
            伺服器與<span className="text-gradient">參與資訊</span>
          </h2>
          <p className="mt-5 text-base leading-8 text-gray-400 md:text-lg">
            Winter Festival 2026 是為 Minecraft Java 創作者設計的期間限定冬季聯動企劃。
            這裡集中整理版本、白名單、活動時段與未來連線資訊。
          </p>
        </div>

        <div className="mb-6 rounded-3xl border border-aurora-cyan/20 bg-gradient-to-r from-aurora-cyan/[0.08] via-white/[0.035] to-aurora-purple/[0.08] p-6 shadow-[0_0_45px_rgba(0,240,255,0.06)] backdrop-blur-xl md:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-2 text-xs font-black uppercase tracking-[0.22em] text-aurora-cyan">
                <span className={`h-2.5 w-2.5 rounded-full ${serverStatus.online ? 'bg-aurora-green shadow-[0_0_14px_rgba(74,222,128,0.7)]' : 'bg-gray-500'}`} />
                Server Status
              </div>
              <h3 className="text-2xl font-black text-white md:text-3xl">{serverStatus.label}</h3>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-gray-400 md:text-base">{serverStatus.detail}</p>
            </div>

            <button
              type="button"
              disabled={!serverStatus.address}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-black text-gray-500 transition enabled:border-aurora-cyan/25 enabled:text-white enabled:hover:bg-aurora-cyan/10 disabled:cursor-not-allowed"
              title={serverStatus.address ? '複製伺服器位址' : '正式伺服器位址尚未公開'}
            >
              <Copy size={17} />
              {serverStatus.address || 'IP 尚未公開'}
            </button>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {serverFacts.map(({ icon, eyebrow, title, description }) => {
            const Icon = iconMap[icon] || Server;
            return (
              <article key={title} className="glass-panel p-7">
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/5">
                    <Icon className="text-aurora-cyan" size={23} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.18em] text-gray-600">{eyebrow}</span>
                </div>
                <h3 className="text-xl font-black text-white">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-gray-400">{description}</p>
              </article>
            );
          })}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-7 backdrop-blur-xl md:p-9">
            <div className="mb-7 flex items-center gap-3">
              <CircleCheck className="text-aurora-green" size={22} />
              <h3 className="text-xl font-black text-white">參與流程</h3>
            </div>

            <div className="grid gap-4">
              {joinSteps.map((item) => (
                <div key={item.step} className="flex gap-4 rounded-2xl border border-white/5 bg-black/10 p-5">
                  <div className="font-mono text-sm font-black tracking-widest text-aurora-cyan">{item.step}</div>
                  <div>
                    <h4 className="font-black text-white">{item.title}</h4>
                    <p className="mt-2 text-sm leading-6 text-gray-400">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.025] p-7 md:p-9">
            <h3 className="text-xl font-black text-white">企劃參與說明</h3>
            <div className="mt-6 grid gap-3">
              {participationNotes.map((note) => (
                <div key={note} className="rounded-2xl border border-white/5 bg-black/10 p-5 text-sm leading-7 text-gray-300">
                  {note}
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm leading-6 text-gray-500">
              更多參與名單、正式連線資訊與活動細節將依官方企劃進度更新。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
