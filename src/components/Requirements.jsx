import { CalendarClock, CircleCheck, Server, ShieldCheck, Users } from 'lucide-react';

const serverFacts = [
  {
    icon: Server,
    title: 'Minecraft Java 1.21.11',
    description: '伺服器核心採用 Paper，活動以 Java Edition 為唯一版本。',
  },
  {
    icon: ShieldCheck,
    title: '原生白名單制',
    description: '使用 Minecraft 原生白名單管理參與者，不使用額外金鑰驗證。',
  },
  {
    icon: Users,
    title: '創作者聯動',
    description: '預計約 20 位創作者共同參與，重點是交流、直播、拍片與共同創作。',
  },
  {
    icon: CalendarClock,
    title: '12 週冬季企劃',
    description: '活動期間為 2026/11/27 至 2027/02/20，每週五 20:00–22:00 進行官方活動。',
  },
];

const participationNotes = [
  '活動定位以創作者交流與冬季節慶體驗為核心，而非大型競技生存。',
  '活動期間將包含每日任務、每週合作任務、隱藏任務與冬境幣系統。',
  '每週主題活動、Winter Awards 與冬境世界內容將依企劃進度陸續公開。',
];

export default function Requirements() {
  return (
    <section id="server" className="relative z-10 overflow-hidden px-6 py-28">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-aurora-blue/10 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <span className="mb-4 inline-flex rounded-full border border-aurora-cyan/20 bg-aurora-cyan/10 px-4 py-2 text-xs font-black uppercase tracking-[0.24em] text-aurora-cyan">
            Server & Participation
          </span>
          <h2 className="text-4xl font-black tracking-tight text-white md:text-5xl">
            伺服器與<span className="text-gradient">參與資訊</span>
          </h2>
          <p className="mt-5 text-base leading-8 text-gray-400 md:text-lg">
            Winter Festival 2026 是為 Minecraft Java 創作者設計的期間限定冬季聯動企劃。
            這裡整理目前已確認的活動與伺服器資訊。
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {serverFacts.map(({ icon: Icon, title, description }) => (
            <article key={title} className="glass-panel p-7 md:p-8">
              <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/5">
                <Icon className="text-aurora-cyan" size={23} />
              </div>
              <h3 className="text-xl font-black text-white">{title}</h3>
              <p className="mt-3 leading-7 text-gray-400">{description}</p>
            </article>
          ))}
        </div>

        <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.035] p-7 backdrop-blur-xl md:p-9">
          <div className="mb-6 flex items-center gap-3">
            <CircleCheck className="text-aurora-green" size={22} />
            <h3 className="text-xl font-black text-white">企劃參與方式</h3>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {participationNotes.map((note) => (
              <div key={note} className="rounded-2xl border border-white/5 bg-black/10 p-5 text-sm leading-7 text-gray-300">
                {note}
              </div>
            ))}
          </div>

          <p className="mt-7 text-center text-sm text-gray-500">
            更多參與名單、連線資訊與活動細節將依官方企劃進度更新。
          </p>
        </div>
      </div>
    </section>
  );
}
