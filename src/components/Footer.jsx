import { Mail, Snowflake } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative z-10 mt-20 border-t border-white/10 bg-black/30 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 md:flex-row md:items-center md:justify-between">
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
          <p className="mt-4 max-w-lg text-sm leading-7 text-gray-500">
            Minecraft Java 創作者冬季聯動企劃。一起在十二週的冬境旅程中交流、創作，留下屬於 2026 冬天的故事。
          </p>
        </div>

        <div className="flex flex-col gap-3 text-sm text-gray-400 md:items-end">
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <a href="#about" className="transition-colors hover:text-aurora-cyan">關於企劃</a>
            <a href="#schedule" className="transition-colors hover:text-aurora-cyan">12 週活動</a>
            <a href="#server" className="transition-colors hover:text-aurora-cyan">伺服器資訊</a>
          </div>
          <a href="mailto:contact@winterfestivalmc.com" className="inline-flex items-center gap-2 transition-colors hover:text-white">
            <Mail size={15} />
            contact@winterfestivalmc.com
          </a>
        </div>
      </div>

      <div className="border-t border-white/5 px-6 py-5 text-center text-xs text-gray-600">
        © 2026 Winter Festival｜冬境之約. All rights reserved.
      </div>
    </footer>
  );
}
