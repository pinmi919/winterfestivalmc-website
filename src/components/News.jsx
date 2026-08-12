import { useEffect, useState } from 'react';
import { Calendar, ChevronRight, Sparkles, X } from 'lucide-react';
import { newsCategoryClass, newsItems } from '../data/news';

export default function News() {
  const featured = newsItems.find((item) => item.featured);
  const regular = newsItems.filter((item) => !item.featured);
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    if (!selectedArticle) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setSelectedArticle(null);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [selectedArticle]);

  const articleMeta = (item) => (
    <div className="mb-5 flex flex-wrap items-center gap-3 text-xs">
      <span className={`rounded-full border px-3 py-1 font-bold ${newsCategoryClass[item.category] || ''}`}>
        {item.category}
      </span>
      <span className="flex items-center gap-1.5 text-gray-500">
        <Calendar size={13} /> {item.date}
      </span>
    </div>
  );

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
          <div className="text-sm font-semibold text-gray-500">點擊公告查看完整內容</div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {featured && (
            <button
              type="button"
              onClick={() => setSelectedArticle(featured)}
              className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.045] text-left transition-all duration-500 hover:border-aurora-cyan/35 hover:bg-white/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-cyan/70 lg:col-span-2 lg:grid lg:grid-cols-2"
              aria-label={`閱讀公告：${featured.title}`}
            >
              <div className="relative min-h-64 overflow-hidden">
                <img src={featured.image} alt={featured.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-night/85 via-night/10 to-transparent lg:bg-gradient-to-r" />
              </div>

              <div className="flex flex-col justify-center p-7 sm:p-9">
                {articleMeta(featured)}
                <h3 className="text-2xl font-black leading-tight text-white transition-colors group-hover:text-aurora-cyan sm:text-3xl">
                  {featured.title}
                </h3>
                <p className="mt-4 leading-7 text-gray-400">{featured.excerpt}</p>
                <div className="mt-8 flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-gray-300">
                  閱讀完整公告 <ChevronRight size={15} />
                </div>
              </div>
            </button>
          )}

          {regular.map((item) => (
            <button
              type="button"
              key={item.id}
              onClick={() => setSelectedArticle(item)}
              className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.045] text-left transition-all duration-500 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-cyan/70"
              aria-label={`閱讀公告：${item.title}`}
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img src={item.image} alt={item.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="p-6">
                {articleMeta(item)}
                <h3 className="text-xl font-black leading-snug text-white transition-colors group-hover:text-aurora-cyan">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-gray-400">{item.excerpt}</p>
                <div className="mt-5 flex items-center gap-2 text-xs font-bold text-gray-500 transition-colors group-hover:text-aurora-cyan">
                  閱讀完整公告 <ChevronRight size={14} />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {selectedArticle && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-[#02060d]/85 p-4 backdrop-blur-xl sm:p-6"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedArticle(null);
          }}
        >
          <article
            role="dialog"
            aria-modal="true"
            aria-labelledby="news-detail-title"
            className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-[2rem] border border-white/10 bg-[#08111e] shadow-[0_30px_100px_rgba(0,0,0,0.7)]"
          >
            <button
              type="button"
              onClick={() => setSelectedArticle(null)}
              className="absolute right-5 top-5 z-20 grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-[#08111e]/80 text-gray-400 backdrop-blur-xl transition hover:border-white/20 hover:bg-white/10 hover:text-white"
              aria-label="關閉公告"
            >
              <X size={18} />
            </button>

            <div className="relative aspect-[16/7] min-h-52 overflow-hidden rounded-t-[2rem]">
              <img src={selectedArticle.image} alt={selectedArticle.title} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08111e] via-[#08111e]/30 to-transparent" />
            </div>

            <div className="-mt-10 relative z-10 p-6 pt-0 sm:p-9 sm:pt-0">
              {articleMeta(selectedArticle)}
              <h3 id="news-detail-title" className="max-w-3xl text-3xl font-black leading-tight text-white sm:text-5xl">
                {selectedArticle.title}
              </h3>
              <p className="mt-5 max-w-3xl text-base leading-8 text-gray-300 sm:text-lg">{selectedArticle.excerpt}</p>

              {selectedArticle.highlights?.length > 0 && (
                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  {selectedArticle.highlights.map((highlight) => (
                    <div key={highlight} className="rounded-2xl border border-aurora-cyan/15 bg-aurora-cyan/[0.05] px-4 py-3 text-sm font-semibold text-gray-300">
                      {highlight}
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-8 space-y-5 border-t border-white/10 pt-8">
                {selectedArticle.body?.map((paragraph) => (
                  <p key={paragraph} className="max-w-3xl text-sm leading-8 text-gray-400 sm:text-base">{paragraph}</p>
                ))}
              </div>
            </div>
          </article>
        </div>
      )}
    </section>
  );
}
