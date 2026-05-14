import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { X, Plus, ChevronDown } from 'lucide-react';
import { content } from '../content';
import { products } from './ProductGrid';
import { ImageCarousel } from './ImageCarousel';

interface ConfiguratorProps {
  productId: string;
  lang: 'en' | 'vn';
  onClose: () => void;
  onAddToCart: (item: any, imageRect: DOMRect) => void;
  isFirstPurchase?: boolean;
}

const flagshipImages = [
  'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=1600&q=80',
  'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=1600&q=80',
  'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=1600&q=80',
  'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=1600&q=80'
];

export function Configurator({ productId, lang, onClose, onAddToCart, isFirstPurchase = true }: ConfiguratorProps) {
  const t = content[lang];
  const productInfo = t.products[productId as keyof typeof t.products];
  const productImg = products.find(p => p.id === productId)?.image || '';
  
  const [ram, setRam] = useState('16GB');
  const [ssd, setSsd] = useState('512GB');
  const [color, setColor] = useState('Graphite Black');
  
  const basePrices: Record<string, number> = {
    flagship: 33000000,
    pm: 37500000,
    vg: 30000000,
    n15: 34000000
  };
  
  const ramPrices: Record<string, number> = {
    '16GB': 0,
    '32GB': 5000000,
    '64GB': 15000000
  };

  const ssdPrices: Record<string, number> = {
    '512GB': 0,
    '1TB': 3000000,
    '2TB': 10000000
  };

  const basePrice = basePrices[productId] || 33000000;
  const originalPrice = basePrice + (ramPrices[ram] || 0) + (ssdPrices[ssd] || 0);
  const discountPrice = originalPrice * 0.85; // 15% off

  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN').replace(/,/g, '.') + ' VNĐ';
  };
  
  const imageRef = useRef<HTMLImageElement>(null);

  const handleAddToCart = () => {
    if (imageRef.current) {
      const rect = imageRef.current.getBoundingClientRect();
      onAddToCart({ id: productId, ...productInfo, config: { ram, ssd, color }, originalPrice, discountPrice, price: discountPrice }, rect);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-white z-[60] overflow-y-auto"
    >
      <div className="max-w-7xl mx-auto px-6 py-8 min-h-screen grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 relative">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 bg-white border border-[#F5F5F7] hover:bg-[#F5F5F7] rounded-full transition-colors z-[70]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Product Info & Image */}
        <div className="flex flex-col h-full lg:sticky lg:top-12 lg:max-h-[90vh] justify-center lg:py-8 relative z-10">
           <div className="mb-2">
             <p className="text-[#005CB9] font-bold tracking-[0.2em] uppercase text-[10px] mb-2">{t.configurator.title}</p>
             <h1 className="text-[28px] lg:text-[40px] leading-[1] font-semibold tracking-tighter text-[#1a1a1a] mb-2">{productInfo.name}</h1>
             <p className="text-[15px] text-[#1a1a1a]/60 font-medium">{productInfo.pos}</p>
           </div>
           
          <motion.div
            layoutId={`product-card-${productId}`}
            className="w-full flex-1 flex justify-center items-center relative min-h-[200px] lg:min-h-[350px]"
          >
             <div ref={imageRef as any} className="flex justify-center items-center w-full relative z-10 p-2 lg:p-4">
                {productId === 'flagship' ? (
                  <div className="w-full max-w-[450px]">
                    <ImageCarousel images={flagshipImages} />
                  </div>
                ) : (
                  <motion.img 
                     src={productImg}
                     alt={productInfo.name}
                     className="w-full h-full object-contain mix-blend-multiply drop-shadow-xl max-w-[450px] max-h-[350px]"
                     layoutId={`product-image-${productId}`}
                  />
                )}
             </div>
          </motion.div>
        </div>

        {/* Right Side: Configuration */}
        <div className="flex flex-col justify-center h-full lg:overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="py-4 lg:py-8"
          >
            <div className="mb-8 space-y-2 border border-[#F5F5F7] rounded-xl p-5 bg-[#F5F5F7]/30 mt-2">
              <h3 className="text-[11px] font-bold tracking-widest uppercase text-[#1a1a1a] mb-3">{lang === 'vn' ? 'Thông số nổi bật' : 'Key Specifications'}</h3>
              {productInfo.specs.map((spec, i) => (
                 <div key={i} className="flex gap-3 text-[13px] text-[#1a1a1a]/80 items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#005CB9] flex-shrink-0"></div>
                    {spec}
                 </div>
              ))}
            </div>

            <div className="space-y-6">
              {/* RAM Selection */}
              <div>
                <div className="flex justify-between items-end mb-3">
                  <h3 className="text-[10px] font-bold tracking-widest uppercase text-[#1a1a1a]/60">{t.configurator.ram}</h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {['16GB', '32GB', '64GB'].map(option => (
                    <button 
                      key={option}
                      onClick={() => setRam(option)}
                      className={`p-3 rounded-xl border text-left transition-all relative ${
                        ram === option 
                          ? 'border-[#005CB9] bg-white shadow-[0_0_0_1px_#005CB9]' 
                          : 'border-[#F5F5F7] hover:border-gray-300 bg-white'
                      }`}
                    >
                      <span className={`block text-[11px] font-bold ${ram === option ? 'text-[#005CB9]' : 'text-[#1a1a1a]'}`}>{option}</span>
                      <span className="text-[9px] text-[#1a1a1a]/40 mt-0.5 block tracking-wide uppercase">Unified Memory</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* SSD Selection */}
              <div>
                <h3 className="text-[10px] font-bold tracking-widest uppercase text-[#1a1a1a]/60 mb-3">{t.configurator.ssd}</h3>
                <div className="grid grid-cols-3 gap-3">
                  {['512GB', '1TB', '2TB'].map(option => (
                    <button 
                      key={option}
                      onClick={() => setSsd(option)}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        ssd === option 
                          ? 'border-[#005CB9] bg-white shadow-[0_0_0_1px_#005CB9]' 
                          : 'border-[#F5F5F7] hover:border-gray-300 bg-white'
                      }`}
                    >
                      <span className={`block text-[11px] font-bold ${ssd === option ? 'text-[#005CB9]' : 'text-[#1a1a1a]'}`}>{option}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              <div>
                <h3 className="text-[10px] font-bold tracking-widest uppercase text-[#1a1a1a]/60 mb-3">{t.configurator.colorway}</h3>
                <div className="flex gap-4">
                  {[
                    { name: 'Graphite Black', color: '#2C2C2E' },
                    { name: 'Lunar Silver', color: '#E5E5EA' }
                  ].map(option => (
                    <button 
                      key={option.name}
                      onClick={() => setColor(option.name)}
                      className={`group flex flex-col items-center gap-2`}
                    >
                      <div className={`w-10 h-10 rounded-full border-2 p-1 transition-colors ${
                        color === option.name ? 'border-[#005CB9]' : 'border-transparent group-hover:border-gray-300'
                      }`}>
                        <div className="w-full h-full rounded-full" style={{ backgroundColor: option.color }}></div>
                      </div>
                      <span className={`text-[10px] uppercase tracking-widest font-bold ${color === option.name ? 'text-gray-900' : 'text-gray-500'}`}>
                        {option.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Price and Action */}
            <div className="mt-8 pt-5 border-t border-[#F5F5F7] flex items-center justify-between">
               <div className="flex flex-col">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#1a1a1a]/40 mb-1">Total Configuration</p>
                  <div className="flex items-center gap-3">
                    <p className="text-2xl font-bold tracking-tighter text-[#1a1a1a]">{formatPrice(isFirstPurchase ? discountPrice : originalPrice)}</p>
                    {isFirstPurchase && (
                      <div className="flex flex-col">
                        <span className="text-[12px] font-medium text-[#1a1a1a]/40 line-through">{formatPrice(originalPrice)}</span>
                        <span className="text-[#005CB9] text-[10px] font-bold uppercase tracking-widest mt-0.5">-15% OFF (First Buy)</span>
                      </div>
                    )}
                  </div>
               </div>
               
               <button 
                onClick={handleAddToCart}
                className="group bg-[#1a1a1a] text-white py-3 px-6 rounded-full hover:bg-[#005CB9] transition-all flex items-center gap-3"
               >
                 <span className="text-[11px] font-bold uppercase tracking-widest">Add to Cart</span>
                 <div className="bg-white/10 p-1.5 rounded-full">
                    <Plus className="w-4 h-4 text-white" />
                 </div>
               </button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
