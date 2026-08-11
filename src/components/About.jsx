import { CalendarDays, Coins, Gem, Radio, Users, WandSparkles } from 'lucide-react';

const highlights = [
  {
    icon: CalendarDays,
    title: '12 週冬季聯動',
    description: '從開幕到閉幕，以每週主題活動串起整個冬季。官方活動固定於每週五 20:00–22:00 舉行。',
    meta: '2026/11/27 — 2027/02/20',
  },
  {
    icon: Users,
    title: '創作者共同參與',
    description: 'Winter Festival 不是大型生存競賽，而是一場以交流、直播、拍片與共同創作為核心的 Minecraft Java 創作者企劃。',
    meta: '約 20 位創作者',
  },
  {
    icon: Gem,
    title: '冬境之心',
    description: '中央廣場以巨大漂浮冰晶「冬境之心」為核心，串聯舞台、整合塔、創作者區與官方活動區。',
    meta: '中央世界地標',
  },
  {
    icon: Coins,
    title: '任務與冬境幣',
    description: '透過全服合作任務、個人每日任務與隱藏任務取得冬境幣，讓 12 週活動彼此連結，而不是一次性的單場玩法。',
    meta: '每日・每週・隱藏任務',
  },
];

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden px-6 py-28 md:py-36">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-aurora-blue/10 blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-14 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-aurora-cyan/20 bg-aurora-cyan/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-aurora-cyan">
              <WandSparkles size={15} />
              About MCWF 2026
            </div>
            <h2 className="max-w-4xl text-4xl font-black leading-tight text-white md:text-6xl">
              不是競賽伺服器，
              <span className="text-gradient">是一場跨越整個冬季的相聚。</span>
            </h2>
          </div>

          <div className="lg:pb-2">
            <p className="text-base leading-8 text-gray-300 md:text-lg">
              Winter Festival 2026｜冬境之約，是 Minecraft Java 1.21.11 的第一屆創作者冬季聯動活動。
              我們把重點放在交流、故事、節慶與共同創作，讓每一週都有值得直播、拍片與一起完成的事情。
            </p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {highlights.map(({ icon: Icon, title, description, meta }) => (
            <article key={title} className="glass-panel group p-7 md:p-9">
              <div className="mb-7 flex items-start justify-between gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-aurora-cyan transition-transform duration-300 group-hover:-translate-y-1">
                  <Icon size={24} />
                </div>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-bold tracking-widest text-gray-400">
                  {meta}
                </span>
              </div>
              <h3 className="mb-3 text-2xl font-black text-white">{title}</h3>
              <p className="leading-7 text-gray-400">{description}</p>
            </article>
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-5 rounded-3xl border border-aurora-purple/20 bg-gradient-to-r from-aurora-purple/10 via-white/[0.03] to-aurora-cyan/10 p-7 md:flex-row md:items-center md:justify-between md:p-9">
          <div className="flex items-start gap-4">
            <div className="mt-1 rounded-2xl bg-aurora-purple/15 p-3 text-aurora-purple">
              <Radio size={24} />
            </div>
            <div>
              <p className="mb-1 text-sm font-bold uppercase tracking-[0.2em] text-aurora-purple">Winter Awards</p>
              <h3 className="text-xl font-black text-white md:text-2xl">把 12 週共同創造的回憶，留到最後一刻。</h3>
            </div>
          </div>
          <p className="max-w-xl text-sm leading-7 text-gray-400 md:text-right">
            活動以閉幕週與 Winter Awards 收束整個企劃，回顧這一季的合作、故事與創作成果。
          </p>
        </div>
      </div>
    </section>
  );
}
