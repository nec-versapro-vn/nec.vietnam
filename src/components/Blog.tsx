import { useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { newsData } from '../data/newsData';

const blogsEn = [
  {
    id: '5',
    tag: 'Brand',
    title: 'Best Authentic NEC Laptop Store in Da Nang 2026',
    desc: 'Learn about the NEC brand with advanced technology, high durability, and long-standing reputation...',
    time: '5–7 min read',
    image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800&q=80',
    link: '#'
  },
  {
    id: '1',
    tag: 'Guide',
    title: 'How to Choose the Right NEC Laptop for Students and Office Workers',
    desc: 'Learn how to choose an NEC laptop suited for study needs, from specs to ultra-light design...',
    time: '4–5 min read',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80',
    link: '#'
  },
  {
    id: '2',
    tag: 'Review',
    title: 'NEC VersaPro UltraLite: A Sub-1kg Laptop Worth Buying?',
    desc: 'Reviewing the ultra-light design, long battery life, and Japanese durability of NEC...',
    time: '4–6 min read',
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&q=80',
    link: '#'
  },
  {
    id: '3',
    tag: 'Lifestyle',
    title: 'Work Anywhere: Why a Light Laptop Matters?',
    desc: 'Experience flexible working at cafes and offices with NEC laptops...',
    time: '3–5 min read',
    image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=800&q=80',
    link: '#'
  },
  {
    id: '4',
    tag: 'Comparison',
    title: 'NEC vs MacBook vs Dell: Who is the Lightest?',
    desc: 'Comparing weight, battery life, and experience among top ultrabooks...',
    time: '5–7 min read',
    image: 'https://images.unsplash.com/photo-1531297172864-45d1b55903b4?w=800&q=80',
    link: '#'
  },
  {
    id: '6',
    tag: 'Mobility',
    title: 'NEC VersaPro J UltraLite – The Solution for Frequent Travelers',
    desc: 'Explore the sub-1kg ultra-light laptop series, durable battery, optimized for flexible work and study...',
    time: '3–5 min read',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80',
    link: '#'
  }
];

// Compute Vietnamese content from central data source
const formatNewsDataToBlog = (newsItems: typeof newsData) => newsItems.map(n => ({
  id: n.id,
  tag: n.category,
  title: n.title,
  desc: n.desc,
  time: n.timeToRead,
  image: n.image,
  link: '#'
}));

const featuredVn = newsData.find(n => n.id === '5') || newsData[0];
const otherVn = newsData.filter(n => n.id !== featuredVn.id);
const sortedVn = [featuredVn, ...otherVn];
const blogsVn = formatNewsDataToBlog(sortedVn);

export function Blog({ lang, onViewAll, onReadArticle }: { lang: 'en' | 'vn', onViewAll: () => void, onReadArticle: (id: string) => void }) {
  const blogs = lang === 'vn' ? blogsVn : blogsEn;
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  return (
    <section id="blog" className="py-12 px-6 bg-[#F5F5F7]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-6">
          <div>
            <h2 className="text-[32px] md:text-[48px] font-semibold tracking-tighter text-[#1a1a1a] mb-4">
              {lang === 'vn' ? 'Blog & Tin Tức' : 'Blog & News'}
            </h2>
            <p className="text-[#1a1a1a]/60 text-lg md:text-xl font-light">
              {lang === 'vn' 
                ? 'Cập nhật tin tức, xu hướng công nghệ và thủ thuật hữu ích' 
                : 'Discover tech news, trends, and helpful tips'}
            </p>
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-2">
              <button 
                onClick={scrollLeft}
                className="w-10 h-10 rounded-full border border-[#1a1a1a]/10 hover:border-[#005CB9] bg-white hover:bg-[#005CB9]/5 flex items-center justify-center text-[#1a1a1a] hover:text-[#005CB9] transition-all"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={scrollRight}
                className="w-10 h-10 rounded-full border border-[#1a1a1a]/10 hover:border-[#005CB9] bg-white hover:bg-[#005CB9]/5 flex items-center justify-center text-[#1a1a1a] hover:text-[#005CB9] transition-all"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <button onClick={onViewAll} className="flex items-center gap-2 text-[#005CB9] hover:text-[#004a94] font-medium transition-colors group whitespace-nowrap">
              {lang === 'vn' ? 'Xem tất cả' : 'View all'}
              <span className="bg-[#005CB9]/10 p-2 rounded-full group-hover:bg-[#005CB9]/20 transition-colors">
                 <ArrowRight className="w-4 h-4" />
              </span>
            </button>
          </div>
        </div>

        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] -mx-6 px-6 md:mx-0 md:px-0 scroll-smooth"
        >
          {blogs.map((blog, idx) => (
            <motion.a 
              href={blog.link}
              onClick={(e) => { e.preventDefault(); onReadArticle(blog.id); }}
              key={blog.id || idx}
              className="min-w-[300px] sm:min-w-[350px] bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] transition-all duration-500 snap-center group flex flex-col"
              whileHover={{ y: -5 }}
            >
              <div className="relative h-56 overflow-hidden bg-gray-100">
                <img 
                  src={blog.image} 
                  alt={blog.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-[#1a1a1a]">
                  {blog.tag}
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <div className="text-xs font-bold tracking-widest text-[#1a1a1a]/40 mb-4 uppercase">
                  {blog.time}
                </div>
                <h3 className="text-2xl font-bold text-[#1a1a1a] mb-4 leading-tight group-hover:text-[#005CB9] transition-colors line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-[#1a1a1a]/60 text-[17px] leading-relaxed line-clamp-2 mb-8 flex-1">
                  {blog.desc}
                </p>
                <div className="flex items-center justify-between mt-auto pt-5 border-t border-[#F5F5F7]">
                  <div className="text-[15px] font-bold text-[#1a1a1a] group-hover:text-[#005CB9] transition-colors flex items-center gap-2">
                    {lang === 'vn' ? 'Đọc bài viết' : 'Read article'}
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[#F5F5F7] group-hover:bg-[#005CB9] text-[#1a1a1a] group-hover:text-white flex items-center justify-center transition-all duration-300">
                    <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-all duration-300" />
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
