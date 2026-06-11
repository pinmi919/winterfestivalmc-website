import { useState } from 'react';
import { Calendar, ChevronRight, Sparkles, Tag } from 'lucide-react';

// Mock Data - Replace images with your actual Minecraft screenshots
const NEWS_DATA = [
  {
    id: 1,
    title: "正在努力的開發這個網站",
    excerpt: "今天是禮拜幾啊？我發現今天下雨所以今天應該是雨天，但是我又覺得今天其實下雪",
    category: "Announcement",
    date: "Jun 11, 2026",
    image: "/pic1.png", // Using your existing image
    featured: true,
  },
  {
    id: 2,
    title: "誒嘿想不到吧？又是我",
    excerpt: "又是這瘋子在寫網站，所以這還是demo如果要看正式版你可能要等很久",
    category: "Update",
    date: "Jun 11, 2026",
    image: "/pic2.png", // Using your existing image
  },
  
];

// Helper to map categories to your specific aurora colors
const getCategoryStyle = (category) => {
  switch (category) {
    case 'Announcement': return 'bg-aurora-purple/20 text-aurora-purple border-aurora-purple/30';
    case 'Update': return 'bg-aurora-cyan/20 text-aurora-cyan border-aurora-cyan/30';
    case 'Event': return 'bg-aurora-blue/20 text-aurora-blue border-aurora-blue/30';
    case 'Community': return 'bg-aurora-green/20 text-aurora-green border-aurora-green/30';
    default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
  }
};

export default function News() {
  const [activeTab, setActiveTab] = useState('All');
  const tabs = ['All', 'Announcement', 'Update', 'Event', 'Community'];

  const filteredNews = activeTab === 'All' 
    ? NEWS_DATA 
    : NEWS_DATA.filter(news => news.category === activeTab);

  // Separate featured news (only if 'All' is selected to keep the big card at the top)
  const featuredArticle = activeTab === 'All' ? filteredNews.find(n => n.featured) : null;
  const regularArticles = activeTab === 'All' ? filteredNews.filter(n => !n.featured) : filteredNews;

  return (
    <section className="min-h-screen bg-night pt-32 pb-24 px-6 relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-aurora-cyan/10 blur-[120px] rounded-full pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-aurora-purple/30 bg-aurora-purple/10 text-aurora-purple text-xs font-semibold mb-4 uppercase tracking-widest">
              <Sparkles size={14} className="animate-pulse" />
              Stay Updated
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight">
              Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-aurora-cyan to-aurora-blue">News</span>
            </h1>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                  activeTab === tab 
                    ? 'bg-white text-night shadow-[0_0_20px_rgba(255,255,255,0.3)]' 
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          
          {/* Featured Article (Spans 2 columns on large screens) */}
          {featuredArticle && (
            <article className="group cursor-pointer md:col-span-2 lg:col-span-2 bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:bg-white/10 transition-all duration-500 flex flex-col md:flex-row hover:border-aurora-cyan/50 hover:shadow-[0_0_40px_rgba(0,240,255,0.1)]">
              {/* Image Container */}
              <div className="md:w-1/2 relative overflow-hidden aspect-video md:aspect-auto">
                <img 
                  src={featuredArticle.image} 
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-night via-transparent to-transparent opacity-80 md:opacity-60"></div>
              </div>
              
              {/* Content */}
              <div className="md:w-1/2 p-6 md:p-10 flex flex-col justify-center relative">
                <div className="flex items-center gap-4 mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getCategoryStyle(featuredArticle.category)}`}>
                    {featuredArticle.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-gray-400 text-xs font-medium uppercase tracking-wider">
                    <Calendar size={14} />
                    {featuredArticle.date}
                  </div>
                </div>
                
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-white mb-4 leading-tight group-hover:text-aurora-cyan transition-colors">
                  {featuredArticle.title}
                </h2>
                <p className="text-gray-400 text-sm md:text-base line-clamp-3 mb-8">
                  {featuredArticle.excerpt}
                </p>
                
                <div className="mt-auto flex items-center gap-2 text-white font-bold text-sm uppercase tracking-widest group-hover:text-aurora-cyan transition-colors">
                  Read Article <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </article>
          )}

          {/* Regular Articles */}
          {regularArticles.map((news) => (
            <article key={news.id} className="group cursor-pointer bg-white/5 border border-white/10 rounded-3xl overflow-hidden flex flex-col hover:-translate-y-2 hover:border-white/30 hover:bg-white/10 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
              {/* Image Container */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <img 
                  src={news.image} 
                  alt={news.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                {/* Category Badge over image like Nintendo style */}
                <div className="absolute top-4 left-4 z-10">
                  <span className={`backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold border shadow-lg ${getCategoryStyle(news.category)}`}>
                    {news.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-1.5 text-gray-400 text-xs font-medium uppercase tracking-wider mb-3">
                  <Calendar size={14} />
                  {news.date}
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 leading-snug group-hover:text-aurora-cyan transition-colors">
                  {news.title}
                </h3>
                
                <p className="text-gray-400 text-sm line-clamp-2 mb-6 flex-1">
                  {news.excerpt}
                </p>
                
                <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between text-white font-bold text-xs uppercase tracking-widest group-hover:text-aurora-cyan transition-colors">
                  <span>Read More</span>
                  <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </article>
          ))}

        </div>

        {/* Load More Button */}
        <div className="mt-16 flex justify-center">
          <button className="group relative px-8 py-4 bg-transparent border border-white/20 rounded-full font-bold text-white tracking-widest uppercase text-sm hover:border-aurora-cyan transition-colors overflow-hidden">
            <span className="relative z-10 flex items-center gap-2">
              Load More News
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-aurora-cyan/20 to-aurora-blue/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></div>
          </button>
        </div>

      </div>
    </section>
  );
}