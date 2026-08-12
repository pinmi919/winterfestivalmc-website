import { Menu, Snowflake, X } from 'lucide-react';
import { useState } from 'react';

const links = [
  { href: '#about', label: '關於企劃' },
  { href: '#news', label: '最新公告' },
  { href: '#schedule', label: '12週活動' },
  { href: '#creators', label: '參與創作者' },
  { href: '#systems', label: '冬境系統' },
  { href: '#server', label: '伺服器資訊' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-5 z-50 px-4">
      <nav className="pointer-events-auto mx-auto max-w-6xl rounded-2xl border border-white/10 bg-[#08111e]/80 px-4 py-3 shadow-[0_14px_40px_rgba(0,0,0,0.42)] backdrop-blur-2xl md:px-5">
        <div className="flex items-center justify-between gap-4">
          <a href="#home" className="group flex min-w-0 items-center gap-3" onClick={() => setOpen(false)}>
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-aurora-cyan/20 bg-aurora-cyan/10">
              <Snowflake className="text-aurora-cyan transition-transform duration-500 group-hover:rotate-90" size={18} />
            </span>
            <span className="truncate text-sm font-black tracking-wide text-white sm:text-base">
              2026 MCWF <span className="hidden text-gray-400 sm:inline">｜冬境之約</span>
            </span>
          </a>

          <ul className="hidden items-center gap-4 text-sm font-semibold text-gray-300 xl:flex">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="transition-colors hover:text-aurora-cyan">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <a href="#schedule" className="hidden rounded-full bg-gradient-to-r from-aurora-cyan to-aurora-blue px-5 py-2.5 text-sm font-black text-night shadow-[0_0_18px_rgba(0,240,255,0.22)] transition-transform hover:-translate-y-0.5 md:inline-flex">
            查看活動
          </a>

          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-white xl:hidden"
            aria-label={open ? '關閉選單' : '開啟選單'}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>

        {open && (
          <div className="mt-3 border-t border-white/10 pt-3 xl:hidden">
            <div className="grid gap-1">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-3 text-sm font-semibold text-gray-200 transition-colors hover:bg-white/5 hover:text-aurora-cyan"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
