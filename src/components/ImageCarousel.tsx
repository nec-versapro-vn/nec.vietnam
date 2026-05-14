import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

interface ImageCarouselProps {
  images: string[];
}

export function ImageCarousel({ images }: ImageCarouselProps) {
  const [[page, direction], setPage] = useState([0, 0]);

  // Wrap index to 0-images.length-1
  const imageIndex = Math.abs(page % images.length);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? '100%' : '-100%',
        opacity: 0
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        x: direction < 0 ? '100%' : '-100%',
        opacity: 0
      };
    }
  };

  return (
    <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden rounded-2xl group flex flex-col justify-center bg-transparent">
      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          key={page}
          src={images[imageIndex]}
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
          className="absolute top-0 left-0 w-full h-full object-contain cursor-grab drop-shadow-lg"
          whileTap={{ cursor: 'grabbing' }}
        />
      </AnimatePresence>

      {/* Navigation Arrows (Desktop) */}
      <div className="absolute inset-y-0 left-0 flex items-center pl-2 opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex z-10">
         <button 
           className="bg-white/80 hover:bg-white backdrop-blur shadow-sm p-2 rounded-full text-[#1a1a1a] transition-colors"
           onClick={(e) => { e.stopPropagation(); paginate(-1); }}
         >
            <ChevronLeft className="w-5 h-5" />
         </button>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex z-10">
         <button 
           className="bg-white/80 hover:bg-white backdrop-blur shadow-sm p-2 rounded-full text-[#1a1a1a] transition-colors"
           onClick={(e) => { e.stopPropagation(); paginate(1); }}
         >
            <ChevronRight className="w-5 h-5" />
         </button>
      </div>

      {/* Dot Indicators */}
      <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-2 z-10">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={(e) => {
               e.stopPropagation();
               setPage([idx, idx > imageIndex ? 1 : -1]);
            }}
            className={`transition-all duration-300 rounded-full ${
              imageIndex === idx ? 'w-6 h-1.5 bg-[#005CB9]' : 'w-1.5 h-1.5 bg-[#1a1a1a]/20 hover:bg-[#1a1a1a]/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
