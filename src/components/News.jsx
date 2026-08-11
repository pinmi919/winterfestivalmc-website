import { Calendar, ChevronRight, Sparkles } from 'lucide-react';

const NEWS_DATA = [
  {
    id: 1,
    title: 'Winter Festival 2026｜冬境之約正式籌備中',
    excerpt: '第一屆 MC Winter Festival 將於 2026 年 11 月 27 日展開，12 週企劃將以創作者交流、共同創作與冬季節慶活動為核心。',
    category: '企劃公告',
    date: '2026/08/11',
    image: '/pic1.png',
    featured: true,
  },
  {
    id: 2,
    title: '12 週活動與冬境系統持續開發',
    excerpt: '每週活動、每日任務、每週任務、隱藏任務、冬境幣與 Winter Awards 將共同構成今年冬境之約的主要活動體驗。',
    category: '開發進度',
    date: '2026/08/11',
    image: '/pic2.png',
  },
];

const categoryClass = {
  企劃公告: 'border-aurora-purple/30 bg-aurora-purple/15 text-aurora-purple',
  開發進度: 'border-aurora-cyan/30 bg-aurora-cyan/15 text-aurora-cyan',
};

export default function News() {
  const featured = NEWS_DATA.find((item) => item.featured);
  const regular = NEWS_DATA.filter((item) => !item.featured);

  return (
    <section id="news" className="relative overflow-hidden bg-night px-6 py-24 sm:py-28">
      <div className="pointer-events-none absolute left-1/2 top-10 h-72 w-[720px] -translate-x-1/2 rounded-full bg-aurora-cyan/10 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-aurora-purple/30 bg-aurora-purple/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-aurora-purple">
              <Sparkles size={14} />
              Latest Updates
            </div>
            <h2 className="text-4xl font-black tracking-tight text-white md:text-5xl">
              最新<span className="text-gradient">公告</span>
            </h2>
            <p className="mt-4 max-w-2xl leading-7 text-gray-400">
              集中整理 Winter Festival 2026 的企劃進度、活動資訊與重要更新。
            </p>
          </div>
          <div className="text-sm font-semibold text-gray-500">持續更新中</div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {featured && (
            <article className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.045] transition-all duration-500 hover:border-aurora-cyan/35 hover:bg-white/[0.07] lg:col-span-2 lg:grid lg:grid-cols-2">
              <div className="relative min-h-64 overflow-hidden">
                <img src={featured.image} alt={featured.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-night/85 via-night/10 to-transparent lg:bg-gradient-to-r" />
              </div>

              <div className="flex flex-col justify-center p-7 sm:p-9">
                <div className="mb-5 flex flex-wrap items-center gap-3 text-xs">
                  <span className={`rounded-full border px-3 py-1 font-bold ${categoryClass[featured.category]}`}>
                    {featured.category}
                  </span>
                  <span className="flex items-center gap-1.5 text-gray-500">
                    <Calendar size={13} /> {featured.date}
                  </span>
                </div>
                <h3 className="text-2xl font-black leading-tight text-white transition-colors group-hover:text-aurora-cyan sm:text-3xl">
                  {featured.title}
                </h3>
                <p className="mt-4 leading-7 text-gray-400">{featured.excerpt}</p>
                <div className="mt-8 flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-gray-300">
                  MCWF 2026 <ChevronRight size={15} />
                </div>
              </div>
            </article>
          )}

          {regular.map((item) => (
            <article key={item.id} className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.045] transition-all duration-500 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.07]">
              <div className="aspect-[16/10] overflow-hidden">
                <img src={item.image} alt={item.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="p-6">
                <div className="mb-4 flex flex-wrap items-center gap-3 text-xs">
                  <span className={`rounded-full border px-3 py-1 font-bold ${categoryClass[item.category]}`}>
                    {item.category}
                  </span>
                  <span className="flex items-center gap-1.5 text-gray-500">
                    <Calendar size={13} /> {item.date}
                  </span>
                </div>
                <h3 className="text-xl font-black leading-snug text-white transition-colors group-hover:text-aurora-cyan">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-gray-400">{item.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
