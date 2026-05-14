import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';

interface NecWayPageProps {
  onCheckBack: () => void;
  lang: 'en' | 'vn';
}

export function NecWayPage({ onCheckBack, lang }: NecWayPageProps) {
  return (
    <div className="min-h-screen bg-white pt-24 pb-12">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <button 
          onClick={onCheckBack}
          className="mb-8 inline-flex items-center gap-2 text-[#1a1a1a]/60 hover:text-[#005CB9] transition-colors font-semibold tracking-wide uppercase text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          {lang === 'vn' ? 'Quay lại' : 'Back to Home'}
        </button>

        <div className="text-center mb-10">
          <span className="font-bold text-lg tracking-[0.3em] text-[#005CB9] block mb-4 uppercase">The NEC Way</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#1a1a1a] mb-6">
            {lang === 'vn' ? 'Định Hướng Của Chúng Tôi' : 'Our Corporate Profile'}
          </h1>
          <p className="text-[#1a1a1a]/70 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            {lang === 'vn'
              ? '"The NEC Way" là các hoạt động tập thể của ban quản lý Tập đoàn NEC, bao gồm: Sứ mệnh, Mục đích, Giá trị Cốt lõi và Bộ Quy tắc Ứng xử. Chúng tôi áp dụng NEC Way vào thực tiễn để đóng góp cho khách hàng và xã hội nhằm kiến tạo một xã hội thông tin thân thiện với con người và Trái Đất.'
              : '"The NEC Way" is the collective activities of NEC Group management. This consists of our Corporate Philosophy, Vision, Core Values, Charter of Corporate Behavior, and Code of Conduct. We put The NEC Way into practice to contribute to our customers and society so as to create an information society that is friendly to humans and the earth.'}
          </p>
        </div>

        <div className="mb-10 max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-[#F5F5F7] bg-white">
          <img 
            src="https://www.nec.com/en/global/about/images/main_img.png" 
            alt="The NEC Way"
            className="w-full h-auto object-cover max-h-[400px]"
            onError={(e) => {
               // Fallback if image fails to load
               (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&q=80";
            }}
          />
        </div>

        <div className="space-y-12">
          <section className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center">
             <div className="md:col-span-5">
               <h2 className="text-3xl font-bold tracking-tight text-[#1a1a1a] mb-2">{lang === 'vn' ? 'Mục Đích' : 'Purpose'}</h2>
               <div className="h-1 w-12 bg-[#005CB9] mb-6"></div>
             </div>
             <div className="md:col-span-7">
               <p className="text-xl md:text-2xl text-[#1a1a1a] font-medium leading-relaxed">
                 {lang === 'vn' 
                    ? 'NEC kiến tạo các giá trị xã hội về an toàn, an ninh, công bằng và hiệu quả để thúc đẩy một thế giới bền vững hơn, nơi mọi người đều có cơ hội phát huy tối đa tiềm năng của mình.'
                    : 'NEC creates the social values of safety, security, fairness and efficiency to promote a more sustainable world where everyone has the chance to reach their full potential.'}
               </p>
             </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-10 gap-8 md:gap-10 items-start">
             <div className="md:col-span-3">
               <h2 className="text-3xl font-bold tracking-tight text-[#1a1a1a] mb-2">{lang === 'vn' ? 'Nguyên Tắc' : 'Principles'}</h2>
               <div className="h-1 w-12 bg-[#005CB9] mb-6"></div>
             </div>
             <div className="md:col-span-7 space-y-6">
                {[
                  lang === 'vn' ? 'Tinh thần Sáng lập "Sản phẩm tốt hơn, Dịch vụ tốt hơn"' : 'The Founding Spirit of "Better Products, Better Services"',
                  lang === 'vn' ? 'Chính trực và Tôn trọng Quyền con người' : 'Uncompromising Integrity and Respect for Human Rights',
                  lang === 'vn' ? 'Không ngừng Đổi mới' : 'Relentless Pursuit of Innovation'
                ].map((principle, idx) => (
                   <div key={idx} className="flex gap-4 items-start">
                      <span className="text-[#005CB9] font-bold text-xl mt-1">✓</span>
                      <p className={`text-lg md:text-[20px] text-[#1a1a1a]/80 font-medium ${idx === 0 ? 'md:whitespace-nowrap' : ''}`}>{principle}</p>
                   </div>
                ))}
             </div>
          </section>

          <section>
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-[#1a1a1a] mb-2">{lang === 'vn' ? 'Giá Trị Cốt Lõi' : 'Code of Values'}</h2>
              <div className="h-1 w-12 bg-[#005CB9] mx-auto mb-6"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { en: 'Look Outward. See the Future.', vn: 'Hướng ngoại. Nhìn về Tương lai.' },
                { en: 'Think Simply. Display Clear Strategy.', vn: 'Suy nghĩ Đơn giản. Chiến lược Rõ ràng.' },
                { en: 'Be Passionate. Follow through to the End.', vn: 'Đam mê. Theo đuổi đến cùng.' },
                { en: 'Move Fast. Never Miss an Opportunity.', vn: 'Di chuyển Nhanh. Nắm bắt Cơ hội.' },
                { en: 'Encourage Openness. Stimulate the Growth of All.', vn: 'Khuyến khích Sự cởi mở. Thúc đẩy Sự phát triển chung.' }
              ].map((value, idx) => (
                 <motion.div 
                   key={idx}
                   whileHover={{ y: -5 }}
                   className="bg-[#F5F5F7]/50 p-8 rounded-2xl border border-[#F5F5F7]"
                 >
                    <div className="text-[#005CB9] text-3xl font-light mb-4">0{idx + 1}</div>
                    <h3 className="text-xl font-bold text-[#1a1a1a] leading-snug">
                       {lang === 'vn' ? value.vn : value.en}
                    </h3>
                 </motion.div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
