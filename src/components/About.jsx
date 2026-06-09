import { CalendarDays, Map, Award, Users } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-32 px-6 max-w-7xl mx-auto relative z-10">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-black mb-4">重新定義<span className="text-gradient">冬季企劃</span></h2>
        <p className="text-gray-400">四大核心理念，打造完美的 12 週創作者聯動體驗</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* 大型卡片 1 */}
        <div className="glass-panel p-8 md:col-span-2 group">
          <CalendarDays className="text-aurora-cyan mb-6" size={32} />
          <h3 className="text-2xl font-bold mb-3">完美時程規劃</h3>
          <p className="text-gray-400 mb-6 max-w-md">12 週不間斷的主題活動，從相遇到閉幕，每週都有全新體驗。活動結束後更開放 Open Week 供粉絲參觀。</p>
          <div className="flex flex-wrap gap-3">
            <span className="bg-white/5 border border-white/10 px-4 py-2 rounded-lg text-sm text-white">活動期 12/05 - 02/27</span>
            <span className="bg-white/5 border border-white/10 px-4 py-2 rounded-lg text-sm text-gray-400">Open Week 02/28 - 03/06</span>
          </div>
        </div>

        {/* 小型卡片 1 */}
        <div className="glass-panel p-8 group">
          <Map className="text-aurora-green mb-6" size={32} />
          <h3 className="text-xl font-bold mb-3">世界觀設定</h3>
          <p className="text-gray-400 text-sm leading-relaxed">Winter Kingdom，包含宏偉的冬境城、直達天際的極光塔與熱鬧的冬日市集。</p>
        </div>

        {/* 小型卡片 2 */}
        <div className="glass-panel p-8 group">
          <Users className="text-aurora-blue mb-6" size={32} />
          <h3 className="text-xl font-bold mb-3">粉絲深度參與</h3>
          <p className="text-gray-400 text-sm leading-relaxed">Discord 投票、祝福牆、各項大賽觀眾票選，打破實況主與觀眾的隔閡。</p>
        </div>

        {/* 大型卡片 2 */}
        <div className="glass-panel p-8 md:col-span-2 group relative overflow-hidden">
          <div className="absolute right-0 top-0 w-64 h-64 bg-aurora-purple/10 blur-[80px] rounded-full"></div>
          <Award className="text-aurora-purple mb-6 relative z-10" size={32} />
          <h3 className="text-2xl font-bold mb-3 relative z-10">Winter Awards & 大型活動</h3>
          <p className="text-gray-400 mb-6 relative z-10 max-w-lg">年度 MVP 頒獎、開幕祭、聖誕交換禮物、建築與攝影大賽，以及震撼的閉幕煙火秀。</p>
        </div>

      </div>
    </section>
  );
}