import { CheckCircle2 } from 'lucide-react';

export default function Requirements() {
  const reqs = [
    "訂閱數 / 追蹤數 200 ~ 2000",
    "Minecraft 內容佔比 80% 以上",
    "活動期間至少 14 天內登入一次",
    "活動期間直播 4 次、影片 4 部，或創作總數 6 次以上",
    "願意遵守活動規範與社群禮儀"
  ];

  return (
    <section id="requirements" className="py-24 px-6 max-w-4xl mx-auto relative z-10">
      <h2 className="section-title">創作者招募條件</h2>
      <div className="glass-panel p-8 md:p-12">
        <p className="text-center text-gray-400 mb-8">徵招對象：Minecraft 創作者、VTuber、YouTuber、實況主。</p>
        <div className="space-y-4 max-w-2xl mx-auto">
          {reqs.map((text, i) => (
            <div key={i} className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors">
              <CheckCircle2 className="text-winter-accent shrink-0 mt-1" size={24} />
              <span className="text-lg text-gray-200">{text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}