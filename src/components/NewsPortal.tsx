import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Search, TrendingUp, Clock, ChevronRight } from 'lucide-react';
import { newsData, newsCategories, trendingTags, Article } from '../data/newsData';

interface NewsPortalProps {
  onReadArticle: (articleId: string) => void;
  onClose?: () => void;
}

export function NewsPortal({ onReadArticle, onClose }: NewsPortalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  
  useEffect(() => {
    // window.scrollTo removed because AnimatePresence onExitComplete handles it
  }, []);
  const featuredNews = newsData.find(n => n.id === '5') || newsData[0];
  const otherNews = newsData.filter(n => n.id !== featuredNews.id);
  
  // Exclude id '3' from sideFeaturedNews so it can be picked up by latestNews
  const sideFeaturedNews = otherNews.filter(n => n.id !== '3').slice(0, 3);
  
  const availableForLatest = otherNews.filter(n => !sideFeaturedNews.includes(n));
  const latestWorldOrVietnamNews = availableForLatest.filter(n => Number(n.id) >= 8).slice(0, 2);
  const latestNecBlogs = availableForLatest.filter(n => Number(n.id) <= 6).slice(0, 2);
  const latestNews = [...latestWorldOrVietnamNews, ...latestNecBlogs];
  
  // Group news by categories for the specific layout
  const getNewsByCategory = (cat: string) => newsData.filter(news => news.category === cat).slice(0, 4);
  
  return (
    <div className="bg-white min-h-screen pt-24 font-sans text-[#1a1a1a]">
      {/* Container */}
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">Tin Tức & Blog</h1>
            <p className="text-lg md:text-xl text-[#1a1a1a]/60 font-light">Cập nhật những công nghệ, xu hướng và thủ thuật mới nhất.</p>
          </div>
          <div className="relative w-full md:w-96">
            <input 
              type="text" 
              placeholder="Tìm kiếm bài viết..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#F5F5F7] border border-transparent focus:border-[#005CB9] focus:bg-white rounded-full py-4 pl-14 pr-6 text-base outline-none transition-all"
            />
            <Search className="absolute left-5 top-4.5 w-5 h-5 text-[#1a1a1a]/40" />
          </div>
        </div>

        {/* --- HERO FEATURED NEWS --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-20">
          {/* Main Featured (Left - spans 8 cols) */}
          <motion.div 
            whileHover={{ y: -4 }}
            onClick={() => onReadArticle(featuredNews.id)}
            className="lg:col-span-8 cursor-pointer group flex flex-col"
          >
            <div className="rounded-2xl overflow-hidden relative aspect-[16/9] md:aspect-[2/1] mb-6 shadow-sm">
              <img 
                src={featuredNews.image} 
                alt={featuredNews.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute top-5 left-5 bg-[#005CB9] text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest leading-none">
                {featuredNews.category}
              </div>
            </div>
            <div className="flex items-center gap-4 text-[#1a1a1a]/50 text-sm font-bold uppercase tracking-wider mb-4">
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {featuredNews.timeToRead}</span>
              <span className="opacity-50">•</span>
              <span>{featuredNews.date}</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold leading-[1.15] mb-4 group-hover:text-[#005CB9] transition-colors tracking-tight">
              {featuredNews.title}
            </h2>
            <p className="text-xl text-[#1a1a1a]/70 line-clamp-2 leading-relaxed">
              {featuredNews.desc}
            </p>
          </motion.div>

          {/* Side Featured (Right - spans 4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            {sideFeaturedNews.map((news) => (
              <motion.div 
                key={news.id} 
                whileHover={{ x: 4 }}
                onClick={() => onReadArticle(news.id)}
                className="flex gap-5 cursor-pointer group"
              >
                <div className="w-2/5 aspect-[4/3] rounded-xl overflow-hidden shrink-0 shadow-sm relative">
                  <img src={news.image} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="flex flex-col justify-center flex-1">
                  <div className="text-[#005CB9] text-xs font-bold uppercase tracking-widest mb-2">{news.category}</div>
                  <h3 className="font-bold text-lg md:text-xl leading-snug mb-2.5 group-hover:text-[#005CB9] transition-colors line-clamp-3 tracking-tight">
                    {news.title}
                  </h3>
                  <div className="text-[#1a1a1a]/40 text-xs uppercase font-bold tracking-wider">
                    {news.date}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* --- MAIN CONTENT LAYOUT --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-20">
          
          {/* Main Content Area (Left - 8 cols) */}
          <div className="lg:col-span-8">
            
            {/* Latest News Grid */}
            <div className="mb-20">
              <div className="flex justify-between items-end border-b-2 border-[#1a1a1a] pb-4 mb-8">
                <h2 className="text-3xl font-bold tracking-tight">Mới nhất</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12">
                {latestNews.map(news => (
                  <BlogCard key={news.id} news={news} onClick={() => onReadArticle(news.id)} />
                ))}
              </div>
            </div>

            {/* Category Sections */}
            {['Khuyến mãi', 'Đánh giá sản phẩm', 'Công nghệ', 'Tin Quốc Tế', 'Tin Việt Nam', 'Lifestyle'].map(catTarget => {
              // Fuzzy grouping
              const catNews = newsData.filter(n => n.category.includes(catTarget) || n.title.includes(catTarget));
              if (catNews.length === 0) return null;
              
              const isExpanded = expandedCategories[catTarget];
              const displayedNews = isExpanded ? catNews : catNews.slice(0, 4);
              
              return (
                <div key={catTarget} className="mb-20">
                   <div className="flex justify-between items-center border-b-2 border-[#1a1a1a]/10 pb-4 mb-8">
                    <h2 className="text-[28px] font-bold tracking-tight text-[#1a1a1a]">{catTarget === 'Khuyến mãi' ? 'Công nghệ & Khuyến mãi' : catTarget}</h2>
                    {catNews.length > 4 && (
                      <button 
                        onClick={() => setExpandedCategories(prev => ({ ...prev, [catTarget]: !isExpanded }))}
                        className="text-base font-bold text-[#005CB9] hover:text-[#004a94] flex items-center gap-1 group"
                      >
                        {isExpanded ? 'Thu gọn' : 'Xem thêm'} <ChevronRight className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-90' : 'group-hover:translate-x-1'}`} />
                      </button>
                    )}
                  </div>
                  <div className="space-y-10">
                    {displayedNews.map(news => (
                      <HorizontalCard key={news.id} news={news} onClick={() => onReadArticle(news.id)} />
                    ))}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Sidebar Area (Right - 4 cols) */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 space-y-14">
               
               {/* Trending */}
               <div className="bg-[#F5F5F7] p-8 rounded-3xl">
                 <h3 className="font-bold text-2xl mb-8 flex items-center gap-3 border-b-2 border-[#1a1a1a]/10 pb-5 text-[#1a1a1a]">
                   <TrendingUp className="w-6 h-6 text-[#005CB9]" /> Xu hướng
                 </h3>
                 <div className="space-y-8">
                   {newsData.slice(0, 5).map((news, i) => (
                     <div key={news.id} className="flex gap-5 cursor-pointer group" onClick={() => onReadArticle(news.id)}>
                       <span className="text-4xl font-black text-[#1a1a1a]/10 group-hover:text-[#005CB9]/50 transition-colors mt-[-4px]">0{i+1}</span>
                       <div>
                         <h4 className="font-bold text-base leading-snug group-hover:text-[#005CB9] transition-colors line-clamp-2 mb-2 tracking-tight">{news.title}</h4>
                         <span className="text-[#1a1a1a]/50 text-xs uppercase font-bold tracking-wider">{news.timeToRead}</span>
                       </div>
                     </div>
                   ))}
                 </div>
               </div>

               {/* Tags */}
               <div>
                 <h3 className="font-bold text-2xl mb-6 tracking-tight">Chủ đề nổi bật</h3>
                 <div className="flex flex-wrap gap-2.5">
                   {trendingTags.map(tag => (
                     <button key={tag} className="bg-white border border-[#F5F5F7] hover:border-[#005CB9] px-5 py-2.5 rounded-full text-sm font-bold text-[#1a1a1a]/70 hover:text-[#005CB9] transition-colors shadow-sm tracking-wide">
                       {tag}
                     </button>
                   ))}
                 </div>
               </div>

               {/* Promotional Banner */}
               <div onClick={() => onReadArticle('promo-birthday')} className="relative rounded-3xl overflow-hidden aspect-[3/4] cursor-pointer group shadow-lg bg-black">
                  <img src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExazl5bHVnb3oxMzdkNTM4N3o0ZmNxODJtcHVxd29peGoxNjBvbnYwaiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l4KhQo2MESJucMzLi/giphy.gif" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60" alt="Banner" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent flex flex-col justify-end p-8 text-white">
                    <span className="bg-white text-black px-3 py-1.5 rounded text-[11px] font-bold uppercase w-max mb-4 tracking-widest leading-none">Ưu đãi T5</span>
                    <h4 className="font-bold text-2xl mb-3 leading-tight">Siêu Ưu Đãi Sinh Nhật Tháng 5</h4>
                    <p className="text-base text-white/80 mb-6 font-light">Gọn nhẹ đỉnh cao, giảm ngay 20% cùng nhiều quà tặng.</p>
                    <button className="flex items-center gap-2 text-base font-bold bg-[#005CB9] text-white px-6 py-3 rounded-full w-max hover:bg-[#004a94] transition-colors">
                      Khám phá <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
               </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// Sub-components
const BlogCard: React.FC<{ news: Article, onClick: () => void }> = ({ news, onClick }) => {
  return (
    <motion.div 
      whileHover={{ y: -6 }}
      className="bg-white group cursor-pointer flex flex-col"
      onClick={onClick}
    >
      <div className="rounded-2xl overflow-hidden mb-5 aspect-[4/3] relative shadow-sm">
        <img src={news.image} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-[#1a1a1a] px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest shadow-sm leading-none">
          {news.category}
        </div>
      </div>
      <div>
        <div className="flex items-center gap-3 text-[#1a1a1a]/40 text-xs font-bold uppercase tracking-wider mb-3">
          <span>{news.date}</span>
          <span className="opacity-50">•</span>
          <span>{news.timeToRead}</span>
        </div>
        <h3 className="text-2xl font-bold leading-[1.3] mb-3 group-hover:text-[#005CB9] transition-colors tracking-tight text-[#1a1a1a]">{news.title}</h3>
        <p className="text-[#1a1a1a]/60 text-[17px] leading-relaxed line-clamp-2">{news.desc}</p>
      </div>
    </motion.div>
  )
}

const HorizontalCard: React.FC<{ news: Article, onClick: () => void }> = ({ news, onClick }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-8 group cursor-pointer" onClick={onClick}>
      <div className="w-full sm:w-2/5 aspect-[4/3] md:aspect-[16/10] rounded-2xl overflow-hidden shrink-0 shadow-sm">
        <img src={news.image} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" />
      </div>
      <div className="flex flex-col justify-center flex-1 py-2">
        <div className="text-[#005CB9] text-xs font-bold uppercase tracking-widest mb-3">{news.category}</div>
        <h3 className="text-2xl md:text-[28px] font-bold leading-tight mb-4 group-hover:text-[#005CB9] transition-colors tracking-tight text-[#1a1a1a]">{news.title}</h3>
        <p className="text-[#1a1a1a]/60 text-[17px] leading-relaxed line-clamp-2 mb-4">{news.desc}</p>
        <div className="flex items-center gap-4 text-[#1a1a1a]/40 text-xs font-bold uppercase tracking-wider mt-auto">
          <span>{news.date}</span>
          <span className="opacity-50">•</span>
          <span>{news.timeToRead}</span>
        </div>
      </div>
    </div>
  )
}
