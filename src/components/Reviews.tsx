import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { content } from '../content';

export function Reviews({ lang }: { lang: 'en' | 'vn' }) {
  const t = content[lang];
  const reviews = t.reviewsData.list;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, [isHovered, reviews.length]);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      let nextIndex = prev + newDirection;
      if (nextIndex < 0) nextIndex = reviews.length - 1;
      if (nextIndex >= reviews.length) nextIndex = 0;
      return nextIndex;
    });
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <section id="reviews" className="py-12 px-6 bg-[#FAFAFA] text-[#1a1a1a] overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        <div className="text-center mb-8">
           <div className="inline-flex items-center gap-3 text-[#005CB9] font-semibold text-[10px] tracking-[0.3em] uppercase mb-4">
             <span className="w-8 h-[1px] bg-[#005CB9]"></span>
             {t.reviewsData.subtitle}
             <span className="w-8 h-[1px] bg-[#005CB9]"></span>
           </div>
           <h2 className="text-[36px] md:text-[48px] font-semibold tracking-tight text-[#1a1a1a]">
             {t.reviewsData.title}
           </h2>
        </div>

        <div 
          className="relative px-0 md:px-16"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
           {/* Desktop Navigation */}
           <div className="hidden md:flex absolute inset-y-0 left-0 items-center justify-center z-10 w-16">
             <button 
               onClick={() => paginate(-1)}
               className="w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-sm border border-[#1a1a1a]/5 text-[#1a1a1a]/50 hover:text-[#1a1a1a] hover:shadow-md transition-all"
             >
               <ChevronLeft className="w-6 h-6" />
             </button>
           </div>
           <div className="hidden md:flex absolute inset-y-0 right-0 items-center justify-center z-10 w-16">
             <button 
               onClick={() => paginate(1)}
               className="w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-sm border border-[#1a1a1a]/5 text-[#1a1a1a]/50 hover:text-[#1a1a1a] hover:shadow-md transition-all"
             >
               <ChevronRight className="w-6 h-6" />
             </button>
           </div>

           <div className="relative h-[450px] md:h-[350px] w-full max-w-4xl mx-auto">
             <AnimatePresence initial={false} custom={direction}>
               <motion.div
                 key={currentIndex}
                 custom={direction}
                 variants={variants}
                 initial="enter"
                 animate="center"
                 exit="exit"
                 transition={{
                   x: { type: "spring", stiffness: 300, damping: 30 },
                   opacity: { duration: 0.2 }
                 }}
                 drag="x"
                 dragConstraints={{ left: 0, right: 0 }}
                 dragElastic={1}
                 onDragEnd={(e, { offset, velocity }) => {
                   const swipe = swipePower(offset.x, velocity.x);
                   if (swipe < -swipeConfidenceThreshold) {
                     paginate(1);
                   } else if (swipe > swipeConfidenceThreshold) {
                     paginate(-1);
                   }
                 }}
                 className="absolute inset-0 w-full h-full flex flex-col md:flex-row items-center cursor-grab active:cursor-grabbing bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-[#1a1a1a]/5 gap-8 object-cover"
               >
                 {/* Image */}
                 <div className="w-24 h-24 md:w-40 md:h-40 rounded-full overflow-hidden shrink-0 border border-[#F5F5F7]">
                   <img 
                     src={reviews[currentIndex].image} 
                     alt={reviews[currentIndex].name}
                     className="w-full h-full object-cover"
                     draggable="false"
                   />
                 </div>
                 
                 {/* Content */}
                 <div className="flex-1 flex flex-col justify-center text-center md:text-left">
                   <div className="flex gap-1 text-[#005CB9] mb-4 justify-center md:justify-start">
                     <span className="text-xl">★</span>
                     <span className="text-xl">★</span>
                     <span className="text-xl">★</span>
                     <span className="text-xl">★</span>
                     <span className="text-xl">★</span>
                   </div>
                   
                   <p className="text-lg md:text-2xl font-medium leading-relaxed text-[#1a1a1a] mb-6 md:mb-8">
                     {reviews[currentIndex].text}
                   </p>
                   
                   <div>
                     <div className="font-semibold text-[#1a1a1a] text-sm tracking-wide uppercase mb-1">
                       {reviews[currentIndex].name}
                     </div>
                     <div className="text-[11px] text-[#1a1a1a]/50 uppercase tracking-widest font-bold">
                       {reviews[currentIndex].role}
                     </div>
                   </div>
                 </div>
               </motion.div>
             </AnimatePresence>
           </div>
        </div>
        
        {/* Dots */}
        <div className="flex justify-center items-center gap-3 mt-12">
          {reviews.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              className={`transition-all duration-300 rounded-full ${
                currentIndex === idx 
                  ? 'bg-[#1a1a1a] w-8 h-1.5' 
                  : 'bg-[#1a1a1a]/20 hover:bg-[#1a1a1a]/40 w-1.5 h-1.5'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

