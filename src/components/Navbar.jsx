import { Snowflake } from 'lucide-react';

export default function Navbar() {
  return (
    <div className="fixed top-6 w-full z-50 flex justify-center px-4 pointer-events-none">
      <nav className="pointer-events-auto flex items-center justify-between w-full max-w-5xl bg-[#0D111A]/80 backdrop-blur-2xl border border-white/10 px-6 py-3 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
        
        <a href="#" className="flex items-center gap-2 text-white font-bold text-lg tracking-wider group">
          <Snowflake className="text-aurora-cyan group-hover:animate-spin" size={20} />
          <span>2026 MC Winter Festival 冬境之約</span>
        </a>
        
        <ul className="hidden md:flex gap-8 text-sm font-medium text-gray-400">
          <li><a href="#about" className="hover:text-aurora-cyan transition-colors">世界觀</a></li>
          <li><a href="#schedule" className="hover:text-aurora-cyan transition-colors">12週規劃</a></li>
          <li><a href="#requirements" className="hover:text-aurora-cyan transition-colors">招募條件</a></li>
        </ul>
        
        <button className="bg-gradient-to-r from-aurora-cyan to-aurora-blue text-night px-6 py-2 rounded-full text-sm font-bold hover:scale-105 transition-transform shadow-[0_0_15px_rgba(0,240,255,0.4)]">
          立即報名
        </button>
      </nav>
    </div>
  );
}