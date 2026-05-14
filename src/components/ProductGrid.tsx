import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { content } from '../content';

export const products = [
  {
    id: 'flagship',
    originalPrice: '33.000.000 – 58.000.000 VNĐ',
    discountPrice: '28.050.000 – 49.300.000 VNĐ', 
    image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&auto=format&fit=crop&q=80' 
  },
  {
    id: 'pm',
    originalPrice: '37.500.000 – 55.000.000 VNĐ',
    discountPrice: '31.875.000 – 46.750.000 VNĐ',
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'vg',
    originalPrice: '30.000.000 – 50.000.000 VNĐ',
    discountPrice: '25.500.000 – 42.500.000 VNĐ',
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'n15',
    originalPrice: '34.000.000 VNĐ',
    discountPrice: '28.900.000 VNĐ',
    image: 'https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?w=800&auto=format&fit=crop&q=80'
  }
];

export function ProductGrid({ lang, onSelectProduct, isFirstPurchase = true }: { lang: 'en' | 'vn', onSelectProduct: (id: string) => void, isFirstPurchase?: boolean }) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const t = content[lang];

  return (
    <section id="products" className="py-12 px-6 bg-white border-t border-[#F5F5F7]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 flex flex-col items-center">
          <div className="inline-flex items-center gap-3 text-[#005CB9] font-semibold text-xs tracking-[0.2em] uppercase mb-4">
              <span className="w-8 h-[1px] bg-[#005CB9]"></span>
              {t.navbar.products}
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {products.map((product) => {
            const productData = t.products[product.id as keyof typeof t.products];
            const isHovered = hoveredId === product.id;
            const isDimmed = hoveredId !== null && hoveredId !== product.id;

            return (
              <motion.div
                key={product.id}
                layoutId={`product-card-${product.id}`}
                onMouseEnter={() => setHoveredId(product.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`group bg-white border rounded-3xl p-4 md:p-5 cursor-pointer transition-all duration-500 ease-out relative flex flex-col items-center text-center ${
                  isDimmed 
                    ? 'opacity-20 blur-[4px] scale-[0.95] translate-y-2 border-transparent bg-[#FAFAFA]' 
                    : isHovered 
                      ? 'shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] border-[#005CB9]/40 z-20 scale-[1.03] -translate-y-1' 
                      : 'border-[#F5F5F7] shadow-sm hover:shadow-md opacity-100'
                }`}
                onClick={() => onSelectProduct(product.id)}
              >
                {/* 1. Ảnh */}
                <div className="w-full h-[140px] md:h-[160px] flex items-center justify-center mb-4 px-2">
                  <motion.img 
                    src={product.image}
                    alt={productData.name}
                    layoutId={`product-image-${product.id}`}
                    className="w-full h-full object-contain mix-blend-multiply hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                {/* 2. Tên & 3. Mô tả */}
                <div className="w-full flex-1 flex flex-col justify-start">
                  <h3 className="text-[17px] md:text-[19px] font-semibold leading-tight mb-1 text-[#1a1a1a]">{productData.name}</h3>
                  <p className="text-[12px] text-[#1a1a1a]/60 font-medium mb-2 px-2 line-clamp-2 min-h-[36px]">{productData.pos}</p>
                  
                  <div className="mt-auto w-full flex flex-col items-center">
                    {/* 5. Giá */}
                    <div className="flex flex-col items-center justify-center pt-3 border-t border-[#1a1a1a]/5 w-full mb-3 min-h-[70px]">
                      {isFirstPurchase ? (
                        <>
                          <div className="text-[12px] text-[#1a1a1a]/40 line-through mb-1">
                            {product.originalPrice}
                          </div>
                          <div className="flex items-center gap-2 mb-1 flex-wrap justify-center">
                            <span className="font-semibold text-[16px] text-[#1a1a1a]">{product.discountPrice}</span>
                            <span className="bg-[#005CB9]/10 text-[#005CB9] text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wide">-15%</span>
                          </div>
                          <p className="text-[10px] text-[#1a1a1a]/50 text-center max-w-[180px]">
                            {lang === 'vn' ? 'Áp dụng lần mua đầu' : '15% off for first time buyers'}
                          </p>
                        </>
                      ) : (
                        <div className="flex items-center gap-2 mt-2">
                            <span className="font-semibold text-[16px] text-[#1a1a1a]">{product.originalPrice}</span>
                        </div>
                      )}
                    </div>

                    {/* 6. Nút "Xem chi tiết" */}
                    <button 
                      className="bg-[#1a1a1a] hover:bg-[#005CB9] text-white transition-colors rounded-full px-5 py-2 flex items-center justify-center gap-2 w-full max-w-[150px]"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProduct(product.id);
                      }}
                    >
                      <span className="text-[12px] font-semibold tracking-wide">{lang === 'vn' ? 'Xem chi tiết' : 'View Details'}</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
