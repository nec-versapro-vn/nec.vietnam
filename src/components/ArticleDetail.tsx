import { motion } from 'motion/react';
import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Clock, Share2, BookmarkPlus, ArrowRight, TrendingUp, ChevronRight } from 'lucide-react';
import { newsData } from '../data/newsData';

interface ArticleDetailProps {
  articleId: string;
  onBack: () => void;
  onReadArticle: (articleId: string) => void;
  onHome?: () => void;
  onViewAll?: () => void;
}

export function ArticleDetail({ articleId, onBack, onReadArticle, onHome, onViewAll }: ArticleDetailProps) {
  const bannerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: -1000, y: -1000 });
  const [emailSent, setEmailSent] = useState(false);
  const [emailValue, setEmailValue] = useState('');
  const [errorShake, setErrorShake] = useState(false);
  
  useEffect(() => {
    // window.scrollTo removed because AnimatePresence onExitComplete handles it
  }, [articleId]);

  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!bannerRef.current) return;
    const rect = bannerRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: -1000, y: -1000 });
  };

  const article = newsData.find(a => a.id === articleId) || newsData[0];
  
  // Get 3 related articles
  const relatedArticles = newsData.filter(a => a.id !== article.id && a.category === article.category).slice(0, 3);
  if (relatedArticles.length < 3) {
    relatedArticles.push(...newsData.filter(a => a.id !== article.id && !relatedArticles.includes(a)).slice(0, 3 - relatedArticles.length));
  }

  return (
    <div className="bg-white min-h-screen pt-[100px] md:pt-[120px] font-sans text-[#1a1a1a]">
      {/* Container */}
      <div className="max-w-[1536px] mx-auto px-6 lg:px-8 pb-16">

        {/* PROMO HERO BANNER (Interactive Cyber Liquid Glass) */}
        <div 
          ref={bannerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="w-full relative rounded-2xl overflow-hidden bg-[#0A1128] text-white py-3 px-6 md:py-4 md:px-8 mb-8 shadow-lg border border-white/10 group flex items-center min-h-[110px] md:min-h-[120px]"
        >
          {/* Base Cinematic Tech BG */}
          <div className="absolute inset-0 bg-[url('https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExMWkwYmgzc3NudWhydXZ5bGIzanBha25sMzN5cXFvdHRoMzBxOW1meCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/L1R1tvI9svkIWwpVYr/giphy.gif')] opacity-20 bg-cover bg-center mix-blend-screen pointer-events-none"></div>
          
          {/* Cyber Liquid Wave (Follows Mouse closely) */}
          <motion.div
            className="absolute rounded-full pointer-events-none blur-[40px] z-0 mix-blend-screen"
            animate={{
              x: mousePosition.x - 300,
              y: mousePosition.y - 300,
            }}
            transition={{ type: "tween", ease: "easeOut", duration: 0.8 }}
            style={{
              width: 600,
              height: 600,
              background: 'radial-gradient(circle, rgba(0,229,255,0.2) 0%, rgba(59,130,246,0.05) 50%, transparent 70%)',
            }}
          />
          
          {/* Central Highlight Ring (Follows Mouse with slight delay/parallax) */}
          <motion.div
            className="absolute rounded-full pointer-events-none blur-[15px] mix-blend-overlay z-0"
            animate={{
              x: mousePosition.x - 150,
              y: mousePosition.y - 150,
            }}
            transition={{ type: "tween", ease: "easeOut", duration: 0.2 }}
            style={{
              width: 300,
              height: 300,
              background: 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 60%)',
            }}
          />

          {/* Liquid Glass Overlay (Adds distortion-like texture) */}
          <div className="absolute inset-0 bg-white/[0.01] backdrop-blur-[3px] pointer-events-none z-0 border-t border-white/10"></div>
          
          {/* Dark Overlay Gradient for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B132B]/95 via-[#0B132B]/70 to-transparent pointer-events-none z-0"></div>
          
          <div className="relative z-10 w-full flex flex-col md:flex-row items-center justify-between gap-4 max-w-7xl mx-auto pointer-events-none">
            <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6 w-full text-center md:text-left pointer-events-none">
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-[#00E5FF] font-black tracking-[0.1em] uppercase text-[15px] md:text-[18px] shadow-[0_0_20px_rgba(0,229,255,0.15)] whitespace-nowrap">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E5FF] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00E5FF]"></span>
                </span>
                SIÊU ƯU ĐÃI THÁNG 5
              </div>
              <h2 className="text-[15px] md:text-[18px] font-extrabold leading-tight tracking-tight drop-shadow-lg flex flex-wrap items-center justify-center md:justify-start gap-2">
                <span className="uppercase">Carry Lite. <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] to-[#3B82F6]">Achieve Ultra.</span></span>
                <span className="hidden md:inline-block text-white/30 font-light">|</span>
                <span className="text-[#E2E8F0] text-[14px] md:text-[15px] font-medium">
                  Ưu đãi lên tới 20% & Tặng Chuột + Balo Cao Cấp
                </span>
              </h2>
            </div>
            
            <div className="shrink-0 mt-2 md:mt-0 w-full md:w-auto flex justify-center pointer-events-auto">
              <button 
                onClick={() => onReadArticle('promo-birthday')}
                className="bg-gradient-to-r from-[#00E5FF] to-[#3B82F6] text-[#0A1128] px-6 py-2 md:py-2.5 rounded-full font-extrabold tracking-[0.1em] text-[12px] hover:shadow-[0_0_30px_rgba(0,229,255,0.4)] transition-all duration-300 uppercase hover:scale-[1.05] whitespace-nowrap"
              >
                Khám Phá Ngay
              </button>
            </div>
          </div>
        </div>

        {/* Layout: Main Article (72%) + Sidebar (28%) */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          
          {/* Main Article Content */}
          <div className="w-full lg:w-[72%]">
            
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[#1a1a1a]/50 mb-6 overflow-x-auto whitespace-nowrap">
              <button onClick={(e) => { e.preventDefault(); if(onHome) onHome(); }} className="hover:text-[#005CB9] transition-colors flex items-center gap-1">
                 <ArrowLeft className="w-3 h-3" /> Trang chủ
              </button>
              <span className="text-[#1a1a1a]/20"><ChevronRight className="w-3 h-3" /></span>
              <button onClick={onViewAll || onBack} className="hover:text-[#005CB9] transition-colors flex items-center gap-1">
                 Blog & Tin Tức
              </button>
              <span className="text-[#1a1a1a]/20"><ChevronRight className="w-3 h-3" /></span>
              <span className="text-[#005CB9]">{article.category}</span>
            </div>

            {/* Article Header (Left Aligned for modern news look) */}
            <div className="mb-8">
              <div className="inline-block bg-[#005CB9]/5 text-[#005CB9] px-4 py-2 rounded-xl text-[11px] font-bold uppercase tracking-widest mb-4 border border-[#005CB9]/10">
                {article.category}
              </div>
              <h1 className="text-[34px] sm:text-[40px] md:text-[48px] lg:text-[54px] font-extrabold leading-[1.1] tracking-tighter mb-6 text-[#1a1a1a] line-clamp-2 overflow-hidden text-ellipsis">
                {article.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-5 md:gap-8 text-[15px] md:text-[16px] font-semibold text-[#1a1a1a]/50 border-t border-[#1a1a1a]/5 border-b py-4 md:py-6">
                 <span className="flex items-center gap-2 text-[#1a1a1a]">
                   <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#005CB9] to-[#00E5FF] shadow-inner flex items-center justify-center text-white text-[12px] font-bold">N</div> NEC Việt Nam
                 </span>
                 <span className="w-1.5 h-1.5 rounded-full bg-[#1a1a1a]/15"></span>
                 <span>{article.date}</span>
                 <span className="w-1.5 h-1.5 rounded-full bg-[#1a1a1a]/15"></span>
                 <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> {article.timeToRead}</span>
                 
                 <div className="flex gap-4 ml-auto">
                   <button className="w-10 h-10 rounded-full bg-[#F5F5F7] flex items-center justify-center hover:bg-[#005CB9] hover:text-white transition-all"><Share2 className="w-4 h-4" /></button>
                   <button className="w-10 h-10 rounded-full bg-[#F5F5F7] flex items-center justify-center hover:bg-[#005CB9] hover:text-white transition-all"><BookmarkPlus className="w-4 h-4" /></button>
                 </div>
              </div>
            </div>

            {/* Hero Image */}
            <figure className="mb-10">
              <div className="w-full aspect-[16/9] rounded-3xl overflow-hidden mb-3 shadow-xl border border-black/5 bg-[#0a0a0a]">
                <img src={article.image} alt={article.title} className="w-full h-full object-contain" />
              </div>
              <figcaption className="text-[14px] md:text-[15px] text-center text-[#1a1a1a]/50 italic px-4">
                {article.title}
              </figcaption>
            </figure>

            {/* Article HTML Content */}
            <div className="max-w-[900px] text-[20px] md:text-[22px] leading-[1.8] md:leading-[1.9] text-[#1a1a1a]/85 font-serif md:font-sans
              [&_h2]:text-[26px] [&_h2]:md:text-[32px] [&_h2]:font-extrabold [&_h2]:mt-12 [&_h2]:mb-6 [&_h2]:text-[#1a1a1a] [&_h2]:tracking-tight [&_h2]:leading-[1.2]
              [&_h3]:text-[22px] [&_h3]:md:text-[26px] [&_h3]:font-extrabold [&_h3]:mt-10 [&_h3]:mb-4 [&_h3]:text-[#1a1a1a] [&_h3]:tracking-tight [&_h3]:leading-[1.3]
              [&_h4]:text-[18px] [&_h4]:md:text-[22px] [&_h4]:font-bold [&_h4]:mt-8 [&_h4]:mb-3 [&_h4]:text-[#1a1a1a]
              [&_p]:mb-6 
              [&_ul]:list-disc [&_ul]:pl-8 [&_ul]:mb-8 [&_ul_li]:mb-3 [&_ul_li::marker]:text-[#005CB9] [&_ul_li::marker]:font-bold
              [&_ol]:list-decimal [&_ol]:pl-8 [&_ol]:mb-8 [&_ol_li]:mb-3
              [&_a]:text-[#005CB9] [&_a]:font-bold [&_a]:underline-offset-4 hover:[&_a]:underline
              
              [&_.inline-cta]:my-10 [&_.inline-cta]:p-6 [&_.inline-cta]:md:p-8 [&_.inline-cta]:bg-gradient-to-r [&_.inline-cta]:from-[#F5F5F7] [&_.inline-cta]:to-[#FAFAFA] [&_.inline-cta]:border-l-[6px] [&_.inline-cta]:border-[#005CB9] [&_.inline-cta]:rounded-r-xl [&_.inline-cta]:text-[20px] [&_.inline-cta]:md:text-[22px] [&_.inline-cta]:text-[#1a1a1a] [&_.inline-cta]:shadow-sm
              [&_.inline-cta_a]:!text-[#005CB9] [&_.inline-cta_a]:!underline [&_.inline-cta_a]:underline-offset-4 hover:[&_.inline-cta_a]:!text-[#004a94] [&_.inline-cta_a]:transition-colors [&_.inline-cta_a]:block [&_.inline-cta_a]:w-full [&_.inline-cta_a]:mt-4
              [&_.inline-cta_a_*]:!text-[#005CB9] [&_.inline-cta_a_*]:!underline [&_.inline-cta_a_*]:decoration-[#005CB9] hover:[&_.inline-cta_a_*]:!text-[#004a94]
              
              [&_blockquote]:border-l-[6px] [&_blockquote]:border-[#005CB9] [&_blockquote]:bg-[#F5F5F7] [&_blockquote]:rounded-r-2xl [&_blockquote]:p-8 [&_blockquote]:italic [&_blockquote]:text-[24px] [&_blockquote]:md:text-[28px] [&_blockquote]:my-10 [&_blockquote]:text-[#1a1a1a] [&_blockquote]:font-medium [&_blockquote]:leading-tight
              [&_img]:rounded-[1.5rem] [&_img]:my-10 [&_img]:w-full [&_img]:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] [&_figure]:my-10 [&_figure_img]:w-full [&_figure_img]:rounded-[1.5rem] [&_figure_img]:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] [&_figcaption]:text-[15px] [&_figcaption]:text-center [&_figcaption]:mt-4 [&_figcaption]:text-[#1a1a1a]/50 [&_figcaption]:italic
              [&_strong]:text-[#1a1a1a] [&_strong]:font-extrabold
              [&_em]:text-[#1a1a1a]/80
              [&_table]:w-full [&_table]:my-10 [&_table]:text-left [&_table]:border-collapse [&_table]:text-[18px] [&_table]:shadow-sm [&_table]:rounded-xl [&_table]:overflow-hidden
              [&_table_th]:bg-[#F5F5F7] [&_table_th]:border-b-2 [&_table_th]:border-[#1a1a1a]/10 [&_table_th]:p-5 [&_table_th]:text-[#1a1a1a] [&_table_th]:font-bold
              [&_table_td]:border-b [&_table_td]:border-[#F5F5F7] [&_table_td]:p-5
              
              [&_.cta-box]:bg-gradient-to-br [&_.cta-box]:from-[#0B132B] [&_.cta-box]:to-[#1C2541] [&_.cta-box]:border [&_.cta-box]:border-white/10 [&_.cta-box]:rounded-2xl [&_.cta-box]:p-10 [&_.cta-box]:my-12 [&_.cta-box]:text-center [&_.cta-box]:shadow-2xl [&_.cta-box]:text-white
              [&_.cta-box_h3]:mt-0 [&_.cta-box_h3]:mb-4 [&_.cta-box_h3]:text-[28px] [&_.cta-box_h3]:md:text-[36px] [&_.cta-box_h3]:text-white [&_.cta-box_h3]:font-extrabold
              [&_.cta-box_p]:text-white/80 [&_.cta-box_p]:mb-8 [&_.cta-box_p]:text-[18px]
              [&_.cta-box_a]:inline-block [&_.cta-box_a]:bg-[#00E5FF] [&_.cta-box_a]:text-[#0A1128] [&_.cta-box_a]:px-10 [&_.cta-box_a]:py-4 [&_.cta-box_a]:rounded-full [&_.cta-box_a]:font-extrabold [&_.cta-box_a]:text-[16px] [&_.cta-box_a]:uppercase [&_.cta-box_a]:tracking-wider hover:[&_.cta-box_a]:bg-white hover:[&_.cta-box_a]:scale-105 hover:[&_.cta-box_a]:shadow-[0_10px_20px_rgba(0,229,255,0.3)] [&_.cta-box_a]:transition-all [&_.cta-box_a]:!no-underline [&_.cta-box_a_*]:!text-[#0A1128] [&_.cta-box_a_*]:!no-underline
            ">
              {article.content ? (
                <div dangerouslySetInnerHTML={{ __html: article.content }} />
              ) : (
                <>
                  <p className="lead text-2xl md:text-3xl mb-8 font-light text-[#1a1a1a]/70 leading-relaxed">
                    Việc lựa chọn thiết bị công nghệ phù hợp không chỉ giúp tối ưu hóa hiệu suất làm việc mà còn phản ánh phong cách sống của người dùng hiện đại. Thương hiệu NEC từ lâu đã được giới doanh nhân và người dùng chuyên nghiệp tin chọn nhờ chất lượng hoàn thiện chuẩn Nhật, độ bền vững và sự tối giản trong thiết kế.
                  </p>
                  <h2>Thiết kế hướng đến sự tập trung cao độ</h2>
                  <p>
                    Các dòng laptop của NEC, đặc biệt là dòng UltraLite, nổi bật với ngôn ngữ thiết kế <em>"Quiet Luxury"</em> - không phô trương nhưng để lại ấn tượng mạnh nhờ lớp vỏ hợp kim Magie - Carbon siêu nhẹ. Việc sử dụng vật liệu này giúp máy chỉ nặng xấp xỉ 1kg, tạo điều kiện lý tưởng cho những chuyến công tác hay đơn giản là di chuyển giữa các phòng họp.
                  </p>
                  <figure>
                    <img src="https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?w=1200&q=80" alt="Work setup" />
                    <figcaption>Góc làm việc hiện đại cùng vi xử lý siêu tốc</figcaption>
                  </figure>
                  <h3>Sự kết hợp hoàn hảo cùng AI</h3>
                  <p>
                    Không chỉ dừng lại ở phần cứng mỏng nhẹ, sản phẩm mới nhất của NEC còn được trang bị vi xử lý <strong>Intel Core Ultra</strong> tích hợp NPU dành riêng cho xử lý trí tuệ nhân tạo (AI). Điều này đồng nghĩa với việc các tác vụ như xóa phông nền khi gọi video call, dịch thuật tức thời hay xử lý phân tích dữ liệu trên Copilot đều diễn ra mượt mà và tiết kiệm pin hơn đáng kể.
                  </p>
                  <blockquote>
                    "Sau một tháng trải nghiệm chiếc máy này, tôi thực sự bị thuyết phục. Độ phản hồi của hệ thống và thời lượng pin đều vượt kỳ vọng." – Chuyên gia công nghệ nổi tiếng
                  </blockquote>
                  <h2>Kết luận</h2>
                  <p>
                    Sự chuyển mình của NEC trong năm nay là minh chứng rõ nét cho việc kết hợp truyền thống sản xuất khắt khe của Nhật Bản với công nghệ cập nhật thời đại mới. Đây chắc chắn là một trong những thiết bị đáng mong đợi nhất.
                  </p>
                </>
              )}
            </div>

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-[#1a1a1a]/10 flex flex-wrap items-center gap-3">
              <span className="text-[13px] font-bold uppercase tracking-[0.2em] text-[#1a1a1a]/40 mr-2">Tags:</span>
              {['NEC UltraLite', 'Tin Tức Mới', 'Bảo Mật', 'Siêu Nhẹ'].map(tag => (
                <span key={tag} className="bg-[#F5F5F7] px-5 py-2.5 rounded-full text-[13px] font-bold text-[#1a1a1a]/80 cursor-pointer hover:bg-[#005CB9] hover:text-white transition-colors">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          {/* Sidebar - 28% width */}
          <div className="w-full lg:w-[28%]">
            <div className="sticky top-28 space-y-10">
              
              {/* Box Subscribe or AD in Sidebar */}
              <div className="rounded-3xl p-6 md:p-8 bg-gradient-to-br from-[#005CB9] to-[#004a94] text-white shadow-xl shadow-[#005CB9]/20">
                <h3 className="text-[26px] font-extrabold mb-3 leading-tight">Bản Tin <br/>Công Nghệ</h3>
                <p className="text-white/80 mb-6 font-light text-[15px] md:text-[16px] leading-relaxed">Đăng ký để nhận tin tức mới nhất</p>
                {emailSent ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    className="bg-[#00E5FF]/20 text-[#00E5FF] font-bold p-4 rounded-xl text-sm border border-[#00E5FF]/30 tracking-wide text-center uppercase"
                  >
                    Đã đăng ký!
                  </motion.div>
                ) : (
                  <motion.div 
                    animate={errorShake ? { x: [-10, 10, -10, 10, 0], transition: { duration: 0.4 } } : {}}
                    className="relative"
                  >
                    <div className="relative">
                      <input 
                        type="email" 
                        placeholder="Email của bạn..." 
                        value={emailValue}
                        onChange={(e) => {
                          setEmailValue(e.target.value);
                          setErrorShake(false);
                        }}
                        className={`w-full px-5 py-3.5 rounded-xl text-[#1a1a1a] outline-none mb-3 font-medium ${errorShake ? 'bg-red-50 border-2 border-red-500 placeholder-red-300 text-red-500' : 'bg-white border-2 border-transparent'}`} 
                      />
                      {errorShake && (
                         <span className="absolute right-4 top-[25px] -translate-y-1/2 text-red-500 font-bold">!</span>
                      )}
                    </div>
                    <button 
                      onClick={() => {
                        if (!emailValue.includes('@')) {
                          setErrorShake(true);
                        } else {
                          setEmailSent(true);
                        }
                      }}
                      className="w-full bg-[#00E5FF] text-[#0A1128] font-extrabold py-3.5 rounded-xl hover:bg-white transition-all uppercase tracking-widest text-sm"
                    >
                      Đăng Ký Khám Phá
                    </button>
                  </motion.div>
                )}
              </div>

              {/* Trending Posts */}
              <div className="bg-[#F5F5F7] rounded-3xl p-6 md:p-8">
                <h3 className="text-[16px] md:text-[18px] font-extrabold text-[#1a1a1a] mb-6 flex items-center gap-3 tracking-tight">
                  <TrendingUp className="w-5 h-5 text-[#005CB9]" /> Đang Thịnh Hành
                </h3>
                <div className="space-y-6">
                  {newsData.slice(0, 4).map((news, idx) => (
                    <div 
                      key={news.id} 
                      className="flex gap-5 group cursor-pointer"
                      onClick={() => {
                        onReadArticle(news.id);
                      }}
                    >
                      <div className="text-[42px] font-extrabold text-[#1a1a1a]/10 group-hover:text-[#005CB9]/20 transition-colors leading-none mt-1">
                        0{idx + 1}
                      </div>
                      <div>
                        <h4 className="font-bold text-[#1a1a1a] text-[18px] leading-snug group-hover:text-[#005CB9] transition-colors line-clamp-3">
                          {news.title}
                        </h4>
                        <span className="text-[13px] text-[#1a1a1a]/50 mt-3 block font-bold uppercase tracking-widest">{news.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Category Links */}
              <div>
                <h3 className="text-[18px] font-extrabold text-[#1a1a1a] mb-6 tracking-tight pl-2">Chuyên Mục</h3>
                <div className="flex flex-col gap-3">
                  {['Tư Vấn Mua Hàng', 'Đánh Giá Sản Phẩm', 'Công Nghệ Mới', 'Work From Anywhere'].map((cat) => (
                    <button key={cat} className="text-left w-full px-6 py-4 rounded-2xl bg-[#F5F5F7] text-[#1a1a1a]/70 font-bold hover:bg-[#005CB9] hover:text-white transition-all flex items-center justify-between group">
                      {cat}
                      <ChevronRight className="w-5 h-5 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Editor's Picks / Related (Full width below) */}
      <div className="bg-[#1a1a1a] text-white py-20 md:py-24 border-t-[6px] border-[#005CB9]">
        <div className="max-w-[1536px] mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h3 className="text-[32px] md:text-[42px] font-extrabold tracking-tight">Bài Viết Khác Cùng Chuyên Mục</h3>
            <button onClick={onViewAll || onBack} className="text-[15px] font-bold text-[#00E5FF] flex items-center gap-2 hover:text-white transition-colors group uppercase tracking-widest hidden md:flex border border-[#00E5FF]/30 px-8 py-3 rounded-full">
               Xem tất cả <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {relatedArticles.map(news => (
               <motion.div 
                 key={news.id}
                 whileHover={{ y: -8 }}
                 className="bg-white/5 border border-white/10 rounded-[2rem] overflow-hidden group cursor-pointer flex flex-col"
                 onClick={() => {
                   onReadArticle(news.id);
                 }}
               >
                 <div className="aspect-[16/9] relative overflow-hidden">
                    <img src={news.image} alt={news.title} className="w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700" />
                    <div className="absolute top-6 left-6 bg-[#005CB9] text-white px-5 py-2 rounded-full text-[11px] font-black uppercase tracking-widest shadow-lg">
                       {news.category}
                    </div>
                 </div>
                 <div className="p-10 flex-1 flex flex-col">
                    <h4 className="font-extrabold text-[28px] leading-[1.3] mb-6 group-hover:text-[#00E5FF] transition-colors tracking-tight text-white">{news.title}</h4>
                    <p className="text-white/60 text-[19px] line-clamp-2 mb-8 flex-1 leading-relaxed">{news.desc}</p>
                    <div className="flex items-center gap-4 text-[13px] uppercase font-bold tracking-[0.15em] text-white/40 mt-auto pt-8 border-t border-white/10">
                       <span>{news.date}</span>
                       <span className="opacity-50">•</span>
                       <span>{news.timeToRead}</span>
                    </div>
                 </div>
               </motion.div>
            ))}
          </div>
          <div className="mt-16 text-center md:hidden">
            <button onClick={onViewAll || onBack} className="inline-flex text-[15px] font-bold text-[#00E5FF] items-center gap-2 hover:text-white transition-colors uppercase tracking-widest border border-[#00E5FF]/30 px-8 py-4 rounded-full">
               Xem tất cả <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
