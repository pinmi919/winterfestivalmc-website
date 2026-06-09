export default function Schedule() {
  const weeks = [
    { num: 1, title: "相遇週", icon: "🤝" }, { num: 2, title: "建設週", icon: "🔨" },
    { num: 3, title: "市集週", icon: "🏪" }, { num: 4, title: "聖誕週", icon: "🎄", glow: true },
    { num: 5, title: "新年週", icon: "🎆", glow: true }, { num: 6, title: "探索週", icon: "🗺️" },
    { num: 7, title: "合作週", icon: "⚔️" }, { num: 8, title: "攝影週", icon: "📸" },
    { num: 9, title: "故事週", icon: "📖" }, { num: 10, title: "尋寶週", icon: "💎" },
    { num: 11, title: "回憶週", icon: "🎞️" }, { num: 12, title: "閉幕週", icon: "🎇", glow: true },
  ];

  return (
    <section id="schedule" className="py-24 px-6 max-w-6xl mx-auto relative z-10">
      <h2 className="section-title">12週主題規劃</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {weeks.map((w) => (
          <div key={w.num} className={`glass-panel p-6 flex flex-col items-center justify-center text-center group cursor-default ${w.glow ? 'border-winter-accent/40 bg-winter-accent/10 shadow-[0_0_20px_rgba(174,232,255,0.1)]' : ''}`}>
            <span className="text-4xl mb-4 transform group-hover:scale-125 group-hover:-translate-y-2 transition-all duration-300 drop-shadow-md">{w.icon}</span>
            <span className="text-xs text-winter-accent mb-1 font-bold tracking-widest uppercase">Week {w.num}</span>
            <h3 className="text-xl font-bold text-white tracking-wide">{w.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}