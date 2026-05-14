/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, Globe, ChevronDown, Search, ArrowRight, Plus, X, Menu, ShieldCheck, BatteryCharging, Feather, User, Cpu } from 'lucide-react';
import { content } from './content';
import { ProductGrid } from './components/ProductGrid';
import { Configurator } from './components/Configurator';
import { TechSpecs } from './components/TechSpecs';
import { Reviews } from './components/Reviews';
import { Blog } from './components/Blog';
import { HistoryPage } from './components/HistoryPage';
import { NecWayPage } from './components/NecWayPage';
import { Footer } from './components/Footer';
import { FloatingChat } from './components/FloatingChat';
import { UserModal } from './components/UserModal';

import { NewsPortal } from './components/NewsPortal';
import { ArticleDetail } from './components/ArticleDetail';

// ... everything else is same, just place the components

type Language = 'en' | 'vn';

export default function App() {
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('nec_lang');
    if (saved === 'en' || saved === 'vn') return saved as Language;
    return 'vn'; // Default is Vietnamese
  });
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [historyModalOpen, setHistoryModalOpen] = useState(false);
  const [necWayModalOpen, setNecWayModalOpen] = useState(false);
  const [newsPortalOpen, setNewsPortalOpen] = useState(false);
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [checkoutStep, setCheckoutStep] = useState(false);
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [flyingParticle, setFlyingParticle] = useState<{ id: number, rect: DOMRect } | null>(null);
  const nextParticleId = useRef(0);
  const cartIconRef = useRef<HTMLButtonElement>(null);

  const [isFirstPurchase, setIsFirstPurchase] = useState(() => {
    return localStorage.getItem('hasPurchased') !== 'true';
  });

  const t = content[lang];

  useEffect(() => {
    localStorage.setItem('nec_lang', lang);
  }, [lang]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    
    let needsWait = false;
    if (selectedArticleId || newsPortalOpen || historyModalOpen || necWayModalOpen) {
      setSelectedArticleId(null);
      setNewsPortalOpen(false);
      setHistoryModalOpen(false);
      setNecWayModalOpen(false);
      needsWait = true;
    }
    
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;
  
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, needsWait ? 400 : 100);
  };

  const openHistory = () => {
    setMobileMenuOpen(false);
    setSelectedArticleId(null);
    setNewsPortalOpen(false);
    setNecWayModalOpen(false);
    setHistoryModalOpen(true);
    window.scrollTo(0, 0);
  };

  const openNecWay = () => {
    setMobileMenuOpen(false);
    setSelectedArticleId(null);
    setNewsPortalOpen(false);
    setHistoryModalOpen(false);
    setNecWayModalOpen(true);
    window.scrollTo(0, 0);
  };

  const completePurchase = () => {
    localStorage.setItem('hasPurchased', 'true');
    setIsFirstPurchase(false);
    setCartItems([]);
    setCheckoutStep(false);
    setCartOpen(false);
    alert(lang === 'vn' ? 'Cảm ơn bạn đã mua sắm với NEC!' : 'Thank you for shopping with NEC!');
  };

  const handleSelectProduct = (id: string) => {
    setSelectedProductId(id);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseConfigurator = () => {
    setSelectedProductId(null);
    document.body.style.overflow = 'auto';
  };

  const handleAddToCart = (item: any, sourceRect: DOMRect) => {
    // Trigger flying animation
    const id = nextParticleId.current++;
    setFlyingParticle({ id, rect: sourceRect });
    
    // Play premium click sound 
    try {
      const audio = new Audio('/click.mp3'); // Mock path, mostly for structure
      audio.volume = 0.2;
      audio.play().catch(() => {});
    } catch(e) {}

    setTimeout(() => {
      setCartItems(prev => {
        const existingItem = prev.find(i => 
          i.id === item.id && 
          i.config.ram === item.config.ram && 
          i.config.ssd === item.config.ssd && 
          i.config.color === item.config.color
        );
        if (existingItem) {
          return prev.map(i => i === existingItem ? { ...i, quantity: (i.quantity || 1) + 1 } : i);
        }
        return [...prev, { ...item, quantity: 1 }];
      });
      setFlyingParticle(null);
      handleCloseConfigurator();
    }, 800); // 800ms animation duration
  };

  const cartTotalQuantity = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);
  const cartTotalPrice = cartItems.reduce((acc, item) => {
    const price = isFirstPurchase ? item.discountPrice : item.originalPrice;
    return acc + (price || 0) * (item.quantity || 1);
  }, 0);
  
  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN').replace(/,/g, '.') + ' VNĐ';
  };

  const handleUpdateQuantity = (index: number, delta: number) => {
    setCartItems(prev => {
      const newItems = [...prev];
      newItems[index].quantity = (newItems[index].quantity || 1) + delta;
      if (newItems[index].quantity <= 0) {
        newItems.splice(index, 1);
      }
      return newItems;
    });
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        key={lang}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-white text-[#1a1a1a] font-sans selection:bg-[#005CB9] selection:text-white relative"
      >
        {/* Flying Particle Animation */}
        <AnimatePresence>
          {flyingParticle && cartIconRef.current && (
            <motion.div
              key={`particle-${flyingParticle.id}`}
              initial={{ 
                x: flyingParticle.rect.left, 
                y: flyingParticle.rect.top, 
                scale: 1, 
                opacity: 1 
              }}
              animate={{ 
                x: cartIconRef.current.getBoundingClientRect().left, 
                y: cartIconRef.current.getBoundingClientRect().top, 
                scale: 0.1, 
                opacity: 0,
                rotate: 180
              }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="fixed z-[100] w-20 h-20 bg-white shadow-2xl rounded-xl flex items-center justify-center pointer-events-none"
            >
              <div className="w-12 h-12 rounded-full bg-[#005CB9] blur-md opacity-50 absolute" />
              <div className="w-12 h-12 bg-[#F5F5F7] border border-[#d1d1d6] flex items-center justify-center p-2 relative z-10 shadow-sm rounded-sm">
                <div className="w-full h-2/3 bg-white border border-[#1a1a1a] rounded-[2px] relative flex shadow-sm">
                   <div className="absolute inset-0.5 bg-[#1a1a1a] rounded-[1px] flex items-center justify-center">
                      <span className="text-white/40 text-[4px] font-bold tracking-widest">NEC</span>
                   </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation - SLIDE 1 */}
        <header 
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b-[1.5px] border-[#d9d9d9] ${
            isScrolled ? 'h-[80px] bg-white/95 backdrop-blur-md shadow-[0_4px_20px_-10px_rgba(0,0,0,0.1)]' : 'h-[80px] bg-white shadow-[0_2px_15px_-10px_rgba(0,0,0,0.05)]'
          }`}
        >
          <div className="w-full h-full px-6 md:px-12 flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-12">
               <a href="#" onClick={(e) => { e.preventDefault(); setHistoryModalOpen(false); setNecWayModalOpen(false); setNewsPortalOpen(false); setSelectedArticleId(null); window.scrollTo(0, 0); }} className="hover:opacity-80 transition-opacity flex items-center pr-8">
                 <span className="text-[#131A9C] font-black text-[28px] md:text-[32px] tracking-tight inline-block scale-x-[1.6] origin-left">NEC</span>
               </a>
            </div>

            {/* Desktop Nav (Hidden, using Hamburger menu now) */}
            <nav className="hidden items-center gap-8 text-[13px] font-medium text-[#1a1a1a]/70 uppercase tracking-widest">
              <button onClick={() => scrollToSection('products')} className="hover:text-[#005CB9] transition-colors">{t.navbar.products}</button>
              <button onClick={() => scrollToSection('reviews')} className="hover:text-[#005CB9] transition-colors">{t.navbar.reviews}</button>
              <button onClick={() => scrollToSection('support')} className="hover:text-[#005CB9] transition-colors">{t.navbar.support}</button>
              
              <div className="relative group cursor-pointer">
                <span className="flex items-center gap-1 hover:text-[#005CB9] transition-colors">
                  {t.navbar.about} <ChevronDown className="w-3 h-3" />
                </span>
                <div className="absolute top-full right-0 mt-6 w-48 bg-white border border-[#F5F5F7] shadow-xl opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all pointer-events-none group-hover:pointer-events-auto">
                  <div className="p-2 flex flex-col">
                    <button onClick={openHistory} className="w-full text-left px-4 py-3 text-[11px] font-bold tracking-widest uppercase hover:bg-[#F5F5F7] hover:text-[#005CB9] transition-colors">{lang === 'vn' ? 'Lịch sử hình thành' : 'History'}</button>
                    <button onClick={openNecWay} className="w-full text-left px-4 py-3 text-[11px] font-bold tracking-widest uppercase hover:bg-[#F5F5F7] hover:text-[#005CB9] transition-colors">{lang === 'vn' ? 'Sứ mệnh & Thiết chế' : 'The NEC Way'}</button>
                  </div>
                </div>
              </div>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2 md:gap-4">
              {/* Language Switcher */}
              <div className="flex bg-[#F5F5F7] rounded-full p-1 border border-transparent">
                <button 
                  onClick={() => setLang('vn')}
                  className={`px-3 py-1 text-[11px] font-bold rounded-full transition-all ${lang === 'vn' ? 'bg-white shadow-sm text-[#005CB9]' : 'text-[#1a1a1a]/50 hover:text-[#1a1a1a]'}`}
                >
                  VN
                </button>
                <button 
                  onClick={() => setLang('en')}
                  className={`px-3 py-1 text-[11px] font-bold rounded-full transition-all ${lang === 'en' ? 'bg-white shadow-sm text-[#005CB9]' : 'text-[#1a1a1a]/50 hover:text-[#1a1a1a]'}`}
                >
                  EN
                </button>
              </div>

              <button className="hidden md:flex p-2 hover:bg-[#F5F5F7] rounded-full transition-colors">
                <Search className="w-5 h-5 text-[#1a1a1a]" />
              </button>

              {/* User Account */}
              <button 
                onClick={() => setUserModalOpen(true)}
                className="relative p-2 text-[#1a1a1a] hover:text-[#005CB9] transition-colors rounded-full flex items-center justify-center gap-2"
              >
                <User className="w-5 h-5" />
                {currentUser && (
                   <span className="hidden md:block text-[11px] font-bold tracking-widest uppercase truncate max-w-[80px]">{currentUser.name}</span>
                )}
              </button>

              {/* Cart Toggle */}
              <button 
                ref={cartIconRef}
                onClick={() => setCartOpen(true)}
                className="relative p-2 text-[#1a1a1a] hover:text-[#005CB9] transition-colors rounded-full"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartTotalQuantity > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-4 h-4 bg-[#005CB9] text-white text-[9px] font-bold flex items-center justify-center rounded-full"
                  >
                    {cartTotalQuantity}
                  </motion.span>
                )}
              </button>

              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="w-10 h-10 flex flex-col items-center justify-center gap-[4px] hover:bg-[#F5F5F7] rounded-full transition-colors text-[#1a1a1a] focus:outline-none"
                aria-label="Toggle menu"
              >
                <div className={`w-5 h-[2px] bg-current transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-[6px]' : ''}`}></div>
                <div className={`w-5 h-[2px] bg-current transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></div>
                <div className={`w-5 h-[2px] bg-current transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`}></div>
              </button>
            </div>
          </div>
          
          {/* Menu Dropdown */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-white border-t border-[#F5F5F7] overflow-hidden absolute w-full shadow-lg"
              >
                <div className="flex flex-col px-6 py-6 space-y-4 text-[13px] font-medium text-[#1a1a1a] uppercase tracking-widest md:hidden lg:hidden items-center text-center">
                  <button className="py-2 hover:text-[#005CB9]" onClick={() => scrollToSection('products')}>{t.navbar.products}</button>
                  <button className="py-2 hover:text-[#005CB9]" onClick={() => scrollToSection('reviews')}>{t.navbar.reviews}</button>
                  <button className="py-2 hover:text-[#005CB9]" onClick={() => { setMobileMenuOpen(false); setSelectedArticleId(null); setNewsPortalOpen(true); window.scrollTo(0,0); }}>{lang === 'vn' ? 'Blog & Tin Tức' : 'Blog & News'}</button>
                  <div className="pt-6 mt-2 border-t border-[#F5F5F7] w-full max-w-xs">
                    <span className="text-[#1a1a1a]/50 text-[11px] mb-6 block text-center">About NEC</span>
                    <button onClick={openHistory} className="block w-full py-2 uppercase hover:text-[#005CB9] flex justify-center">{lang === 'vn' ? 'Lịch sử hình thành' : 'History'}</button>
                    <button onClick={openNecWay} className="block w-full py-2 uppercase hover:text-[#005CB9] flex justify-center">{lang === 'vn' ? 'Sứ mệnh & Thiết chế' : 'The NEC Way'}</button>
                  </div>
                </div>
                
                {/* Desktop layout for dropdown */}
                <div className="hidden md:flex lg:flex max-w-7xl mx-auto px-12 py-10 justify-between items-start">
                   <div className="flex flex-col space-y-6">
                      <span className="text-[#1a1a1a]/30 text-[10px] font-bold uppercase tracking-[0.3em]">Explore</span>
                      <button className="text-2xl font-bold tracking-tight hover:text-[#005CB9] transition-colors text-left" onClick={() => scrollToSection('products')}>{t.navbar.products}</button>
                      <button className="text-2xl font-bold tracking-tight hover:text-[#005CB9] transition-colors text-left" onClick={() => scrollToSection('reviews')}>{t.navbar.reviews}</button>
                      <button className="text-2xl font-bold tracking-tight hover:text-[#005CB9] transition-colors text-left" onClick={() => { setMobileMenuOpen(false); setSelectedArticleId(null); setNewsPortalOpen(true); window.scrollTo(0,0); }}>{lang === 'vn' ? 'Blog & Tin Tức' : 'Blog & News'}</button>
                   </div>
                   
                   <div className="flex flex-col space-y-6">
                      <span className="text-[#1a1a1a]/30 text-[10px] font-bold uppercase tracking-[0.3em] mb-2">About NEC</span>
                      <button onClick={openHistory} className="text-left text-lg font-bold tracking-wide hover:text-[#005CB9] transition-colors">{lang === 'vn' ? 'Lịch sử Hình thành' : 'History of Innovation'}</button>
                      <button onClick={openNecWay} className="text-left text-lg font-medium text-[#1a1a1a]/70 hover:text-[#005CB9] transition-colors">{lang === 'vn' ? 'Sứ mệnh & Thiết chế' : 'The NEC Way'}</button>
                   </div>
                   
                   <div className="flex flex-col space-y-6">
                      <span className="text-[#1a1a1a]/30 text-[10px] font-bold uppercase tracking-[0.3em] mb-2">Connect</span>
                      <button className="text-lg font-medium text-[#1a1a1a]/70 hover:text-[#005CB9] transition-colors text-left" onClick={() => scrollToSection('support')}>{t.navbar.support}</button>
                      <button onClick={() => scrollToSection('support')} className="text-lg font-medium text-[#1a1a1a]/70 hover:text-[#005CB9] transition-colors text-left">Contact Sales</button>
                      <button onClick={() => scrollToSection('support')} className="text-lg font-medium text-[#1a1a1a]/70 hover:text-[#005CB9] transition-colors text-left">Global Network</button>
                   </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Premium shadow overlay */}
          <div className="absolute -bottom-[2px] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-black/5 to-transparent w-full opacity-50" />
        </header>

        <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
          {selectedArticleId ? (
            <motion.div
              key={`article-${selectedArticleId}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <ArticleDetail 
                 articleId={selectedArticleId}
                 onBack={() => {
                   setSelectedArticleId(null);
                 }}
                 onHome={() => {
                   setSelectedArticleId(null);
                   setNewsPortalOpen(false);
                 }}
                 onViewAll={() => {
                   setSelectedArticleId(null);
                   setNewsPortalOpen(true);
                 }}
                 onReadArticle={(id) => {
                   setSelectedArticleId(id);
                 }}
              />
            </motion.div>
          ) : newsPortalOpen ? (
            <motion.div
              key="news"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <NewsPortal 
                 onReadArticle={(id) => {
                   setSelectedArticleId(id);
                 }}
              />
            </motion.div>
          ) : historyModalOpen ? (
            <motion.div
              key="history"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <HistoryPage 
                 onCheckBack={() => {
                   setHistoryModalOpen(false);
                 }} 
                 lang={lang} 
              />
            </motion.div>
          ) : necWayModalOpen ? (
            <motion.div
              key="nec-way"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <NecWayPage 
                 onCheckBack={() => {
                   setNecWayModalOpen(false);
                 }} 
                 lang={lang} 
              />
            </motion.div>
          ) : (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
        {/* Hero - SLIDE 2 */}
        <section className="pt-[100px] pb-12 min-h-[85vh] flex flex-col items-center justify-center relative overflow-hidden bg-[#0a0a0a] text-white">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-[#0a0a0a] z-10" />
            <video 
              autoPlay 
              loop 
              muted 
              playsInline 
              poster="https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=1600&q=80"
              className="w-full h-full object-cover opacity-80"
            >
              <source src="https://cdn.pixabay.com/video/2020/08/17/47402-450974866_large.mp4" type="video/mp4" />
              {/* Fallback video if the above fails */}
              <source src="https://videos.pexels.com/video-files/4058296/4058296-uhd_2560_1440_25fps.mp4" type="video/mp4" />
            </video>
          </div>
          
          <div className="max-w-4xl mx-auto text-center z-10 flex flex-col items-center gap-6 px-6 pt-12 md:pt-16">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-4 text-white/60 font-medium text-[10px] tracking-[0.4em] uppercase mb-4"
            >
              <span className="w-12 h-[1px] bg-white/30"></span>
              {lang === 'vn' ? 'Tinh hoa công nghệ Nhật Bản' : 'Japanese Engineering Excellence'}
              <span className="w-12 h-[1px] bg-white/30"></span>
            </motion.div>
            
            <motion.h1 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
              className="text-[56px] md:text-[96px] leading-[1.05] font-medium tracking-tight text-white mb-2"
            >
              Carry Lite.<br/>Achieve Ultra.
            </motion.h1>
            
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-lg md:text-xl text-white/70 max-w-xl mx-auto font-light tracking-wide drop-shadow-md"
            >
              {lang === 'vn' 
                ? 'Nhẹ nhàng tinh tế. Khẳng định vị thế.' 
                : 'Premium unibody design. Breakthrough power with AI.'}
            </motion.p>
            
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex items-center gap-4 pt-10"
            >
              <button 
                onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-4 text-sm font-medium tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-500 rounded-none mix-blend-screen"
              >
                {t.hero.cta1}
              </button>
            </motion.div>
          </div>
        </section>

        {/* Section divider */}
        <div className="w-full text-center py-12 bg-[#F5F5F7]">
          <p className="text-[10px] font-bold tracking-[0.3em] text-[#1a1a1a]/40 uppercase">125 Years of Technological Innovation</p>
        </div>

        {/* Product Grid - SLIDE 3 (Part 1) */}
        <ProductGrid lang={lang} onSelectProduct={handleSelectProduct} isFirstPurchase={isFirstPurchase} />

        {/* Storytelling - SLIDE 6 */}
        <section className="py-12 px-6 bg-white overflow-hidden border-t border-[#F5F5F7]">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
            <div className="md:w-1/2">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-flex items-center gap-3 text-[#005CB9] font-semibold text-xs tracking-[0.2em] uppercase mb-6">
                  <span className="w-8 h-[1px] bg-[#005CB9]"></span>
                  Heritage
                </div>
                <h2 className="text-[48px] leading-[0.9] font-semibold tracking-tighter text-[#1a1a1a] mb-6">{t.story.title}</h2>
                <p className="text-lg text-[#1a1a1a]/60 leading-relaxed mb-8">{t.story.subtitle}</p>
                
                <div className="space-y-6">
                  {t.story.pillars.map((pillar, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded border border-[#F5F5F7] flex items-center justify-center shrink-0">
                        {i === 0 ? <Feather className="w-5 h-5 text-[#005CB9]" /> :
                         i === 1 ? <ShieldCheck className="w-5 h-5 text-[#005CB9]" /> :
                         i === 2 ? <BatteryCharging className="w-5 h-5 text-[#005CB9]" /> :
                         <Cpu className="w-5 h-5 text-[#005CB9]" />}
                      </div>
                      <span className="text-sm font-semibold tracking-wide text-[#1a1a1a]">{pillar}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
            <div className="md:w-1/2 relative">
               <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="aspect-square bg-[#F5F5F7]/30 overflow-hidden relative border border-[#F5F5F7]"
               >
                 <video
                   autoPlay
                   muted
                   loop
                   playsInline
                   className="w-full h-full object-cover"
                 >
                   <source src="https://videos.pexels.com/video-files/853889/853889-hd_1920_1080_25fps.mp4" type="video/mp4" />
                   <source src="https://cdn.pixabay.com/video/2020/08/17/47402-450974866_large.mp4" type="video/mp4" />
                 </video>
                 <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent flex items-end p-8 z-10">
                   <div className="text-white drop-shadow-md">
                      <p className="font-bold text-[11px] uppercase tracking-widest mb-1">{t.story.philosophyTitle}</p>
                      <p className="text-[11px] text-white/80">{t.story.philosophyDesc}</p>
                   </div>
                 </div>
               </motion.div>
            </div>
          </div>
        </section>

        {/* Technical Specs - SLIDE 8 */}
        <TechSpecs lang={lang} />

        {/* Reviews - SLIDE 8.5 */}
        <Reviews lang={lang} />

        {/* Blog Section */}
        <Blog lang={lang} onViewAll={() => { setNewsPortalOpen(true); window.scrollTo(0, 0); }} onReadArticle={(id) => { setSelectedArticleId(id); window.scrollTo(0, 0); }} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer - SLIDE 10 */}
        <FloatingChat lang={lang} onAddToCart={handleAddToCart} selectedArticleId={selectedArticleId} />
        <Footer lang={lang} />

        {/* Cart Sidebar - SLIDE 4 & 5 Checkout Form Flow */}
        <AnimatePresence>
          {cartOpen && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => {
                  setCartOpen(false);
                  setTimeout(() => setCheckoutStep(false), 400); // reset after closing
                }}
                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
              />
              <motion.div 
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
                className="fixed top-0 right-0 h-full w-full max-w-md bg-white border-l border-[#F5F5F7] shadow-2xl z-50 p-8 flex flex-col"
              >
                {!checkoutStep ? (
                  <>
                    <div className="flex justify-between items-center mb-10 pb-6 border-b border-[#F5F5F7]">
                      <div>
                        <h2 className="text-[20px] font-semibold tracking-tighter uppercase text-[#1a1a1a]">{t.cart.title}</h2>
                        <p className="text-[11px] font-medium tracking-wide text-[#1a1a1a]/50 mt-1">{t.cart.subtitle}</p>
                      </div>
                      <button onClick={() => {
                        setCartOpen(false);
                      }} className="p-2 hover:bg-[#F5F5F7] border border-transparent rounded-full transition-colors text-[#1a1a1a]">
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="flex-1 overflow-y-auto pr-2">
                      {!isFirstPurchase && !checkoutStep && (
                        <div className="mb-4 flex justify-center">
                          <button 
                             onClick={() => {
                               localStorage.removeItem('hasPurchased');
                               setIsFirstPurchase(true);
                             }}
                             className="text-[10px] bg-red-50 text-red-500 font-bold uppercase tracking-widest px-3 py-2 rounded-full border border-red-100 hover:bg-red-100 transition-colors"
                          >
                            Reset Discount (Dev Test)
                          </button>
                        </div>
                      )}
                      {cartItems.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-[#1a1a1a]/20 gap-4">
                          <ShoppingCart className="w-12 h-12" />
                          <p className="text-[11px] uppercase tracking-widest font-bold">Your cart is empty.</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {cartItems.map((item, i) => (
                            <div key={i} className="flex gap-4 p-4 border border-[#F5F5F7] transition-all">
                              <div className="w-20 h-20 bg-[#F5F5F7]/30 p-2 border border-[#F5F5F7] flex items-center justify-center">
                                {/* Tiny CSS Laptop Mockup for cart thumbnail */}
                                <div className="w-12 h-8 bg-white border border-[#1a1a1a] rounded-[2px] relative flex shadow-sm">
                                   <div className="absolute inset-0.5 bg-[#1a1a1a] rounded-[1px] flex items-center justify-center">
                                      <span className="text-white/40 text-[4px] font-bold tracking-widest">NEC</span>
                                   </div>
                                </div>
                              </div>
                              <div className="flex flex-col justify-center flex-1">
                                <div className="flex justify-between items-start">
                                  <p className="font-bold text-[13px] tracking-wide text-[#1a1a1a] pr-4">{item.name}</p>
                                  <div className="flex items-center gap-1 bg-[#F5F5F7] rounded-full p-0.5">
                                    <button onClick={() => handleUpdateQuantity(i, -1)} className="w-5 h-5 flex items-center justify-center text-[#1a1a1a] hover:bg-white rounded-full transition-colors text-xs font-bold">-</button>
                                    <span className="text-[11px] font-semibold text-[#1a1a1a] min-w-[16px] text-center">{item.quantity || 1}</span>
                                    <button onClick={() => handleUpdateQuantity(i, 1)} className="w-5 h-5 flex items-center justify-center text-[#1a1a1a] hover:bg-white rounded-full transition-colors text-xs font-bold">+</button>
                                  </div>
                                </div>
                                <p className="text-[10px] text-[#1a1a1a]/50 mt-1 uppercase tracking-widest">{item.config.ram} / {item.config.ssd} / {item.config.color}</p>
                                <p className="text-[#005CB9] font-bold mt-auto text-[11px] tracking-wide">{formatPrice((isFirstPurchase ? item.discountPrice : item.originalPrice) * (item.quantity || 1))}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="mt-6 pt-6 border-t border-[#F5F5F7]">
                      <div className="flex justify-between items-center mb-6">
                        <span className="text-[11px] font-bold uppercase tracking-widest text-[#1a1a1a]/40">Total</span>
                        <div className="flex flex-col items-end">
                          <span className="font-semibold text-lg tracking-tighter text-[#1a1a1a]">{cartItems.length > 0 ? formatPrice(cartTotalPrice) : '0 VNĐ'}</span>
                          {isFirstPurchase && cartItems.length > 0 && (
                             <span className="text-[#005CB9] text-[10px] font-bold uppercase tracking-widest mt-1">15% First-time discount applied</span>
                          )}
                        </div>
                      </div>
                      <button 
                        onClick={() => setCheckoutStep(true)}
                        disabled={cartItems.length === 0}
                        className="w-full py-4 bg-[#1a1a1a] text-white font-bold text-[11px] uppercase tracking-widest disabled:opacity-50 hover:bg-[#005CB9] transition-all flex items-center justify-center gap-2"
                      >
                        {t.cart.buyNow}
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex flex-col h-full"
                  >
                    <div className="flex justify-between items-center mb-10 pb-6 border-b border-[#F5F5F7]">
                      <div>
                        <button onClick={() => setCheckoutStep(false)} className="text-[10px] font-bold tracking-widest uppercase text-[#1a1a1a]/40 hover:text-[#005CB9] mb-2 flex items-center gap-1 transition-colors">
                           &larr; Back to Cart
                        </button>
                        <h2 className="text-[20px] font-semibold tracking-tighter uppercase text-[#1a1a1a]">{t.checkout.title}</h2>
                      </div>
                      <button onClick={() => {
                        setCartOpen(false);
                        setTimeout(() => setCheckoutStep(false), 400);
                      }} className="p-2 hover:bg-[#F5F5F7] rounded-full transition-colors">
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="flex-1 overflow-y-auto pr-2 space-y-6 pb-12">
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                        <label className="block text-[10px] font-bold text-[#1a1a1a]/50 uppercase tracking-widest mb-2">{t.checkout.fullName}</label>
                        <input className="w-full bg-white border border-[#F5F5F7] px-4 py-3 focus:outline-none focus:border-[#005CB9] text-sm text-[#1a1a1a] transition-colors" />
                      </motion.div>
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                        <label className="block text-[10px] font-bold text-[#1a1a1a]/50 uppercase tracking-widest mb-2">{t.checkout.phone}</label>
                        <input className="w-full bg-white border border-[#F5F5F7] px-4 py-3 focus:outline-none focus:border-[#005CB9] text-sm text-[#1a1a1a] transition-colors" />
                      </motion.div>
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                        <label className="block text-[10px] font-bold text-[#1a1a1a]/50 uppercase tracking-widest mb-2">{t.checkout.email}</label>
                        <input className="w-full bg-white border border-[#F5F5F7] px-4 py-3 focus:outline-none focus:border-[#005CB9] text-sm text-[#1a1a1a] transition-colors" />
                      </motion.div>
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                        <label className="block text-[10px] font-bold text-[#1a1a1a]/50 uppercase tracking-widest mb-2">{t.checkout.address}</label>
                        <textarea className="w-full bg-white border border-[#F5F5F7] px-4 py-3 focus:outline-none focus:border-[#005CB9] text-sm text-[#1a1a1a] transition-colors" rows={3}></textarea>
                      </motion.div>
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                        <label className="block text-[10px] font-bold text-[#1a1a1a]/50 uppercase tracking-widest mb-4">{t.checkout.payment}</label>
                        <div className="space-y-3">
                           <label className="flex items-center gap-3 p-4 border border-[#F5F5F7] cursor-pointer hover:border-[#005CB9] transition-colors">
                             <input type="radio" name="payment" defaultChecked className="accent-[#005CB9] w-4 h-4" />
                             <span className="text-[11px] font-bold uppercase tracking-widest text-[#1a1a1a]">{t.checkout.cod}</span>
                           </label>
                           <label className="flex items-center gap-3 p-4 border border-[#F5F5F7] cursor-pointer hover:border-[#005CB9] transition-colors">
                             <input type="radio" name="payment" className="accent-[#005CB9] w-4 h-4" />
                             <span className="text-[11px] font-bold uppercase tracking-widest text-[#1a1a1a]">{t.checkout.credit}</span>
                           </label>
                           <label className="flex items-center gap-3 p-4 border border-[#F5F5F7] cursor-pointer hover:border-[#005CB9] transition-colors">
                             <input type="radio" name="payment" className="accent-[#005CB9] w-4 h-4" />
                             <span className="text-[11px] font-bold uppercase tracking-widest text-[#1a1a1a]">{t.checkout.installments}</span>
                           </label>
                        </div>
                      </motion.div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-[#F5F5F7]">
                      <div className="flex justify-between items-center mb-6">
                        <span className="text-[11px] font-bold uppercase tracking-widest text-[#1a1a1a]/40">Total</span>
                        <div className="flex flex-col items-end">
                          <span className="font-semibold text-xl tracking-tighter text-[#1a1a1a]">{formatPrice(cartTotalPrice)}</span>
                          {isFirstPurchase && (
                             <span className="text-[#005CB9] text-[10px] font-bold uppercase tracking-widest mt-1">15% First-time discount applied</span>
                          )}
                        </div>
                      </div>
                      <button 
                        onClick={completePurchase}
                        className="w-full py-4 bg-[#005CB9] text-white font-bold text-[11px] uppercase tracking-widest hover:bg-[#004A99] transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#005CB9]"
                      >
                        Confirm Order
                      </button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Configurator Shared Element Modals */}
        <AnimatePresence>
          {selectedProductId && (
            <Configurator 
              productId={selectedProductId}
              lang={lang}
              onClose={handleCloseConfigurator}
              onAddToCart={handleAddToCart}
              isFirstPurchase={isFirstPurchase}
            />
          )}
        </AnimatePresence>

        <UserModal 
          lang={lang}
          isOpen={userModalOpen}
          onClose={() => setUserModalOpen(false)}
          user={currentUser}
          onLogin={(user) => {
             setCurrentUser(user);
             setUserModalOpen(false);
          }}
          onLogout={() => setCurrentUser(null)}
        />
        
      </motion.div>
    </AnimatePresence>
  );
}