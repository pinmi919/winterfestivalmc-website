import { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

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
      
      {/* 修正版：外部圖片背景 + 內建 CSS 模糊效果 */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-night">
        {/* 1. 將 opacity 提高到 80，讓圖片能清楚透出 */}
        <img 
          src="/bg-blur.png" /* ⚠️ 如果你的圖是 jpg，請把這裡改成 /bg-blur.jpg */
          alt="Background" 
          className="w-full h-full object-cover opacity-100 blur-[20px] scale-110"
        />
        {/* 2. 減弱上方與中間的黑色遮罩，只保留底部的全黑來完美過渡到下一區塊 */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-night/40 to-night"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center flex-1 w-full z-10">
        
        {/* 左側：極簡純粹的標題排版 */}
        <div className="text-left relative z-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-aurora-cyan/30 bg-aurora-cyan/10 text-aurora-cyan text-xs font-semibold mb-8 uppercase tracking-widest backdrop-blur-md shadow-[0_0_15px_rgba(0,240,255,0.2)]">
            <span className="w-2 h-2 rounded-full bg-aurora-cyan animate-pulse"></span>
            Minecraft Creators Event
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-2 leading-[1.1]">
            Winter Festival 2026
          </h1>
          <h2 className="text-6xl md:text-8xl font-black mb-8 text-gradient drop-shadow-[0_0_20px_rgba(0,240,255,0.3)]">
            冬境之約
          </h2>
          
          <p className="text-2xl md:text-3xl font-bold text-white tracking-wide border-l-4 border-aurora-cyan pl-6 py-2">
            一年一次，冬日相聚。
          </p>
        </div>

        {/* 右側：高質感圖片疊加展示 */}
        <div className="relative z-20 hidden lg:block h-[500px] w-full">
          
          {/* 主展示圖 (後方) -> pic1.png */}
          <div className="absolute top-0 right-0 w-[80%] h-[350px] rounded-2xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform rotate-3 hover:rotate-0 transition-all duration-500 bg-[#0D111A]">
            <img src="/pic1.png" alt="Winter Kingdom Main" className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
          </div>

          {/* 副展示圖 (前方疊加) -> pic2.png */}
          <div className="absolute bottom-16 left-0 w-[65%] h-[250px] rounded-2xl overflow-hidden border border-aurora-cyan/30 shadow-[0_0_40px_rgba(0,240,255,0.2)] transform -rotate-3 hover:rotate-0 transition-all duration-500 z-20 bg-[#0D111A]">
            <img src="/pic2.png" alt="Winter Kingdom Detail" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
          </div>

          {/* 懸浮倒數卡片 */}
          <div className="glass-panel p-5 absolute -bottom-4 right-10 z-30 flex items-center gap-5 animate-float bg-[#0D111A]/95 border-aurora-purple/30 shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
            <div className="p-3 bg-aurora-purple/20 rounded-xl">
              <Sparkles className="text-aurora-purple" size={24} />
            </div>
            <div>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Server Launch</p>
              <div className="text-xl font-black font-mono tracking-widest text-white">
                {timeLeft.days}<span className="text-aurora-purple mx-1">:</span>{timeLeft.hours}<span className="text-aurora-purple mx-1">:</span>{timeLeft.minutes}
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* 底部：無限跑馬燈 */}
      <div className="absolute bottom-0 w-full border-t border-white/5 bg-night/50 backdrop-blur-md py-4 overflow-hidden flex z-30">
        <div className="animate-marquee whitespace-nowrap flex gap-12 items-center text-sm font-bold text-gray-500 tracking-widest uppercase">
          {Array(4).fill("冬境城 • 極光塔 • 冬日市集 • 創作者村 • 榮譽殿堂 • 永冬山脈 • ").map((text, i) => (
            <span key={i} className="hover:text-aurora-cyan transition-colors cursor-default">{text}</span>
          ))}
        </div>
      </div>
    </section>
  );
}