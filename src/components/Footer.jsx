import { Mail, Snowflake } from 'lucide-react';

const footerGroups = [
  {
    title: '探索企劃',
    links: [
      { href: '#about', label: '關於企劃' },
      { href: '#news', label: '最新公告' },
      { href: '#schedule', label: '12 週活動' },
    ],
  },
  {
    title: '參與內容',
    links: [
      { href: '#creators', label: '參與創作者' },
      { href: '#systems', label: '冬境系統' },
      { href: '#server', label: '伺服器資訊' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative z-10 mt-20 border-t border-white/10 bg-black/30 backdrop-blur-xl">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
        <div>
          <a href="#home" className="inline-flex items-center gap-3 font-black text-white">
            <span className="grid h-10 w-10 place-items-center rounded-xl border border-aurora-cyan/20 bg-aurora-cyan/10">
              <Snowflake className="text-aurora-cyan" size={20} />
            </span>
            <span>
              Winter Festival 2026
              <span className="ml-2 text-gray-500">｜冬境之約</span>
            </span>
          </a>
          <p className="mt-5 max-w-xl text-sm leading-7 text-gray-500">
            Minecraft Java 創作者冬季聯動企劃。以十二週活動、創作者交流、任務系統與節慶內容，構成屬於 2026 冬季的共同旅程。
          </p>

          <div className="mt-6 flex flex-wrap gap-3 text-xs font-semibold text-gray-400">
            <span className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-2">Minecraft Java 1.21.11</span>
            <span className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-2">2026/11/27 — 2027/02/20</span>
            <span className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-2">每週五 20:00–22:00</span>
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          {footerGroups.map((group) => (
            <div key={group.title}>
              <h2 className="text-xs font-black uppercase tracking-[0.2em] text-gray-500">{group.title}</h2>
              <div className="mt-4 grid gap-3 text-sm text-gray-300">
                {group.links.map((link) => (
                  <a key={link.href} href={link.href} className="w-fit transition-colors hover:text-aurora-cyan">
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-5 text-xs text-gray-600 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Winter Festival｜冬境之約. All rights reserved.</span>
          <a href="mailto:contact@winterfestivalmc.com" className="inline-flex items-center gap-2 transition-colors hover:text-white">
            <Mail size={14} />
            contact@winterfestivalmc.com
          </a>
        </div>
      </div>
    </footer>
  );
}
