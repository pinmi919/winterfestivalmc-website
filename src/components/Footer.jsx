import { Snowflake } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/40 backdrop-blur-lg pt-12 pb-6 mt-20 relative z-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        
        <div className="flex items-center gap-2 text-winter-accent font-bold text-xl opacity-80">
          <Snowflake size={24} /> WF2026
        </div>

        <div className="text-center md:text-left text-sm text-gray-400">
          <p className="mb-2">由呱呱呱呱呱呱提供</p>
          <div className="flex justify-center md:justify-start gap-4 text-winter-accent">
            <a href="#" className="hover:text-white transition">官方網站</a>
            <a href="mailto:contact@winterfestivalmc.com" className="hover:text-white transition">聯繫我們</a>
          </div>
        </div>

      </div>
      <div className="text-center text-xs text-gray-500 mt-12">
        © 2026 Winter Festival｜冬境之約. All rights reserved.
      </div>
    </footer>
  );
}