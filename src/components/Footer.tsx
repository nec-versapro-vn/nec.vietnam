import { useState } from 'react';
import { content } from '../content';
import { Linkedin, Facebook, Instagram, Youtube } from 'lucide-react';
import { motion } from 'motion/react';

const TiktokIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 2.23-1.15 4.39-2.9 5.8-1.74 1.41-4.09 2.05-6.31 1.72-2.26-.34-4.29-1.68-5.6-3.56-1.32-1.91-1.71-4.28-1.2-6.52.54-2.31 2.03-4.32 4.1-5.46 2.08-1.15 4.54-1.37 6.78-.71v4.13c-1.34-.69-3.05-.67-4.32.1-1.25.75-2.02 2.15-2 3.6.01 1.48.81 2.89 2.07 3.63 1.25.73 2.87.69 4.09-.07 1.19-.74 1.9-2.09 1.95-3.52.07-3.95.03-7.9.04-11.85Z" />
  </svg>
);

export function Footer({ lang }: { lang: 'en' | 'vn' }) {
  const t = content[lang];
  const [emailValue, setEmailValue] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [errorShake, setErrorShake] = useState(false);

  return (
    <footer id="support" className="bg-white border-t border-[#F5F5F7] pt-10 pb-6 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-8">
          {/* Column 1: Logo & Social */}
          <div className="md:w-1/3">
             <div className="mb-6">
               <a href="https://www.nec.com" target="_blank" rel="noopener noreferrer" className="inline-block hover:opacity-80 transition-opacity pr-10">
                 <span className="text-[#131A9C] font-black text-[32px] md:text-[40px] tracking-tight inline-block scale-x-[1.6] origin-left">NEC</span>
               </a>
             </div>
             <p className="text-[#1a1a1a]/50 font-light text-[13px] max-w-xs leading-relaxed mb-8">
               {lang === 'vn' 
                 ? <>Kế thừa tinh hoa di sản 125 năm từ Nhật Bản.<br />Đổi mới không ngừng vì một thế giới tốt đẹp hơn.</>
                 : <>Inheriting 125 years of Japanese heritage.<br />Relentless innovation for a better world.</>}
             </p>
             <div className="flex gap-4">
              <a href="https://www.linkedin.com/company/nec" target="_blank" rel="noopener noreferrer" className="text-[#1a1a1a]/50 hover:text-[#005CB9] transition-colors p-2 bg-[#F5F5F7] hover:bg-[#ebf4ff] rounded-full">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://www.facebook.com/nec.global" target="_blank" rel="noopener noreferrer" className="text-[#1a1a1a]/50 hover:text-[#005CB9] transition-colors p-2 bg-[#F5F5F7] hover:bg-[#ebf4ff] rounded-full">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/nec_corp/" target="_blank" rel="noopener noreferrer" className="text-[#1a1a1a]/50 hover:text-[#E1306C] transition-colors p-2 bg-[#F5F5F7] hover:bg-[#fceef3] rounded-full">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://www.youtube.com/user/NECglobalOfficial" target="_blank" rel="noopener noreferrer" className="text-[#1a1a1a]/50 hover:text-[#FF0000] transition-colors p-2 bg-[#F5F5F7] hover:bg-[#ffeeee] rounded-full">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="https://www.tiktok.com/@nec_versapro" target="_blank" rel="noopener noreferrer" className="text-[#1a1a1a]/50 hover:text-[#000000] transition-colors p-2 bg-[#F5F5F7] hover:bg-[#e0e0e0] rounded-full">
                <TiktokIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Support */}
          <div className="md:w-1/4">
            <h4 className="text-[13px] font-bold uppercase tracking-widest text-[#1a1a1a] mb-6">
              {lang === 'vn' ? 'Hỗ trợ' : 'Support'}
            </h4>
            <ul className="flex flex-col space-y-4 text-sm font-medium text-[#1a1a1a]/60">
              <li><a href="#" className="hover:text-[#005CB9] transition-colors">{lang === 'vn' ? 'Câu hỏi thường gặp (FAQ)' : 'FAQ'}</a></li>
              <li><a href="#" className="hover:text-[#005CB9] transition-colors">{lang === 'vn' ? 'Chính sách đổi trả' : 'Return Policy'}</a></li>
              <li><a href="#" className="hover:text-[#005CB9] transition-colors">{lang === 'vn' ? 'Liên hệ hỗ trợ' : 'Contact Support'}</a></li>
              <li><a href="#" className="hover:text-[#005CB9] transition-colors">{lang === 'vn' ? 'Về NEC' : 'About NEC'}</a></li>
            </ul>
          </div>

          {/* Column 3: Newsletter */}
          <div className="md:w-5/12 flex flex-col">
            <h4 className="text-[13px] font-bold uppercase tracking-widest text-[#1a1a1a] mb-4">
              {lang === 'vn' ? 'Đăng ký nhận ưu đãi' : 'Subscribe & Get Offers'}
            </h4>
            <p className="text-[#1a1a1a]/60 text-sm mb-2">
              {lang === 'vn' ? 'Nhận ngay ưu đãi 15% cho đơn hàng đầu tiên' : 'Get 15% off your first order'}
            </p>
            <p className="text-[#1a1a1a]/60 text-sm mb-6 flex items-center gap-1">
              👉 {lang === 'vn' ? 'Nhập email của bạn để không bỏ lỡ các chương trình khuyến mãi mới nhất' : 'Enter your email to not miss out on our latest promotions'}
            </p>
            <div className="flex w-full items-center">
              {emailSent ? (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  className="bg-[#E6F4EA] text-[#1E8E3E] font-bold px-6 py-3 rounded-md text-sm border border-[#ceead6] w-full"
                >
                  {lang === 'vn' ? 'Đã đăng ký!' : 'Subscribed!'}
                </motion.div>
              ) : (
                <motion.div 
                  animate={errorShake ? { x: [-10, 10, -10, 10, 0], transition: { duration: 0.4 } } : {}}
                  className="flex w-full items-center relative"
                >
                   <input 
                     type="email" 
                     value={emailValue}
                     onChange={(e) => {
                       setEmailValue(e.target.value);
                       setErrorShake(false);
                     }}
                     placeholder={lang === 'vn' ? 'Email của bạn' : 'Your email'} 
                     className={`flex-1 bg-[#F5F5F7] border ${errorShake ? 'border-red-500 text-red-500 placeholder-red-300' : 'border-transparent focus:border-[#005CB9]'} rounded-l-md px-4 py-3 text-sm text-[#1a1a1a] focus:outline-none transition-colors pr-10`}
                   />
                   {errorShake && (
                     <span className="absolute right-[110px] text-red-500 font-bold top-1/2 -translate-y-1/2">!</span>
                   )}
                   <button 
                     onClick={() => {
                       if (!emailValue.includes('@')) {
                         setErrorShake(true);
                       } else {
                         setEmailSent(true);
                       }
                     }}
                     className="bg-[#005CB9] text-white px-6 py-3 rounded-r-md text-sm font-bold hover:bg-[#004a94] transition-colors whitespace-nowrap z-10"
                   >
                      {lang === 'vn' ? 'Đăng ký' : 'Subscribe'}
                   </button>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-[#F5F5F7] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap gap-4 text-[10px] font-bold tracking-widest uppercase text-[#1a1a1a]/30">
             {t.footer.legal.map((item, i) => (
               <a key={i} href="#" className="hover:text-[#005CB9] transition-colors">{item}</a>
             ))}
          </div>
          <p className="text-[10px] font-bold tracking-widest uppercase text-[#1a1a1a]/30">
            © {new Date().getFullYear()} NEC Corporation. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
