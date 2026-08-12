import { ExternalLink, Sparkles, Users } from 'lucide-react';
import { creators, creatorsMeta } from '../data/creators';

export default function Creators() {
  const hasCreators = creators.length > 0;

  return (
    <section id="creators" className="relative overflow-hidden px-6 py-28 md:py-36">
      <div className="pointer-events-none absolute left-0 top-1/3 h-[420px] w-[420px] rounded-full bg-aurora-cyan/10 blur-[130px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-14 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-aurora-cyan/25 bg-aurora-cyan/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-aurora-cyan">
              <Users size={15} />
              Participating Creators
            </div>
            <h2 className="max-w-4xl text-4xl font-black leading-tight text-white md:text-6xl">
              這個冬天，<span className="text-gradient">由創作者們一起完成。</span>
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-8 text-gray-400 md:text-lg">
              Winter Festival 2026 預計由 {creatorsMeta.expectedCount} Minecraft Java 創作者共同參與。正式名單與頻道資訊會依企劃確認進度陸續公開。
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-sm text-gray-400">
            <span className="font-black text-white">Roster Status</span>
            <div className="mt-1">{creatorsMeta.status}</div>
          </div>
        </div>

        {hasCreators ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {creators.map((creator) => (
              <article key={creator.name} className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] transition-all duration-300 hover:-translate-y-1 hover:border-aurora-cyan/25">
                <div className="aspect-square overflow-hidden bg-white/[0.03]">
                  {creator.image ? (
                    <img src={creator.image} alt={creator.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  ) : (
                    <div className="grid h-full place-items-center text-gray-600">
                      <Users size={42} />
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-black text-white">{creator.name}</h3>
                  {creator.platform && <p className="mt-1 text-sm text-gray-500">{creator.platform}</p>}
                  {creator.url && (
                    <a href={creator.url} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-aurora-cyan transition hover:text-white">
                      前往頻道 <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-[2rem] border border-dashed border-white/15 bg-white/[0.025] px-6 py-16 text-center md:py-20">
            <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-2xl border border-aurora-purple/20 bg-aurora-purple/10 text-aurora-purple">
              <Sparkles size={25} />
            </div>
            <h3 className="text-2xl font-black text-white">參與創作者名單準備中</h3>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-500 md:text-base">
              目前不預先公開尚未確認的創作者資訊。正式名單確認後，這裡會顯示每位創作者的名稱、頭像與主要頻道連結。
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
