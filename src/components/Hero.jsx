import { useState, useEffect } from 'react';
import { Sparkles, Server, Users, ArrowRight, Activity } from 'lucide-react';

export default function Hero() {
  const [timeLeft, setTimeLeft] = useState({ days: '00', hours: '00', minutes: '00' });

  useEffect(() => {
    const target = new Date("2026-12-05T00:00:00+08:00").getTime();
    const interval = setInterval(() => {
      const distance = target - new Date().getTime();
      if (distance > 0) {
        setTimeLeft({
          days: String(Math.floor(distance / (1000 * 60 * 60 * 24))).padStart(2, '0'),
          hours: String(Math.floor((distance / (1000 * 60 * 60)) % 24)).padStart(2, '0'),
          minutes: String(Math.floor((distance / (1000 * 60)) % 60)).padStart(2, '0')
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-32 pb-16 overflow-hidden">
      {/* 模擬極光背景光暈 */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-aurora-cyan/20 blur-[150px] rounded-full mix-blend-screen animate-pulse-slow pointer-events-none"></div>
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-aurora-purple/20 blur-[150px] rounded-full mix-blend-screen animate-pulse-slow pointer-events-none" style={{ animationDelay: '2s' }}></div>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center flex-1 w-full">
        
        {/* 左側：巨型排版與文字 */}
        <div className="text-left z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-aurora-cyan/30 bg-aurora-cyan/10 text-aurora-cyan text-xs font-semibold mb-8 uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-aurora-cyan animate-pulse"></span>
            Minecraft Creators Event
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-4 leading-[1.1]">
            一年一次<br/>
            <span className="text-gradient">冬日相聚.</span>
          </h1>
          
          <p className="text-lg text-gray-400 max-w-xl mb-10 leading-relaxed">
            Winter Festival 2026｜冬境之約。這不僅是一個伺服器，這是一場專為創作者打造的 12 週沉浸式冬季聯動企劃。
          </p>

          <div className="flex flex-wrap items-center gap-6">
            <button className="flex items-center gap-2 bg-white text-night px-8 py-4 rounded-full font-bold hover:bg-gray-200 transition-colors">
              提交審核 <ArrowRight size={18} />
            </button>
            <button className="flex items-center gap-2 text-white px-6 py-4 rounded-full font-bold border border-white/10 hover:bg-white/5 transition-colors">
              觀看預告片
            </button>
          </div>
        </div>

        {/* 右側：科技感儀表板卡片 (致敬參考圖) */}
        <div className="relative z-10 hidden md:block">
          {/* 主卡片：伺服器狀態 */}
          <div className="glass-panel p-8 w-full max-w-md ml-auto relative z-20 bg-[#0D111A]/90">
            <div className="flex justify-between items-start mb-8">
              <div className="p-3 bg-aurora-purple/20 rounded-xl">
                <Server className="text-aurora-purple" size={24} />
              </div>
              <span className="text-xs text-aurora-green flex items-center gap-1 bg-aurora-green/10 px-3 py-1 rounded-full border border-aurora-green/20">
                <Activity size={12} /> Status: Preparing
              </span>
            </div>
            <h3 className="text-2xl font-bold mb-2">Winter Kingdom</h3>
            <p className="text-sm text-gray-400 mb-8">Whitelisted Creator Server</p>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-3xl font-black text-aurora-cyan">15-20</p>
                <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">Target Creators</p>
              </div>
              <div>
                <p className="text-3xl font-black text-white">12</p>
                <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">Weeks Event</p>
              </div>
            </div>

            {/* 進度條 */}
            <div className="w-full bg-white/5 rounded-full h-1.5 mb-2">
              <div className="bg-gradient-to-r from-aurora-cyan to-aurora-purple h-1.5 rounded-full w-1/3"></div>
            </div>
            <p className="text-xs text-gray-500 text-right">Building World...</p>
          </div>

          {/* 懸浮倒數卡片 */}
          <div className="glass-panel p-6 absolute -bottom-12 -left-12 z-30 flex items-center gap-6 animate-float bg-[#0D111A]/95 border-aurora-cyan/20">
            <div className="p-3 bg-aurora-cyan/20 rounded-xl">
              <Sparkles className="text-aurora-cyan" size={24} />
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Time to Launch</p>
              <div className="text-2xl font-black font-mono tracking-widest text-white">
                {timeLeft.days}<span className="text-aurora-cyan">:</span>{timeLeft.hours}<span className="text-aurora-cyan">:</span>{timeLeft.minutes}
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* 底部：無限跑馬燈 (地圖景點) */}
      <div className="absolute bottom-0 w-full border-t border-white/5 bg-night/50 backdrop-blur-md py-4 overflow-hidden flex z-20">
        <div className="animate-marquee whitespace-nowrap flex gap-12 items-center text-sm font-bold text-gray-500 tracking-widest uppercase">
          {Array(4).fill("冬境城 • 極光塔 • 冬日市集 • 創作者村 • 榮譽殿堂 • 永冬山脈 • ").map((text, i) => (
            <span key={i} className="hover:text-aurora-cyan transition-colors cursor-default">{text}</span>
          ))}
        </div>
      </div>
    </section>
  );
}