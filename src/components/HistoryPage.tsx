import { motion } from 'motion/react';
import { ArrowRight, Calendar, ArrowLeft } from 'lucide-react';

interface HistoryPageProps {
  onCheckBack: () => void;
  lang: 'en' | 'vn';
}

export function HistoryPage({ onCheckBack, lang }: HistoryPageProps) {
  const timeline = [
    {
      year: '1899',
      title: lang === 'vn' ? 'Thành lập Nippon Electric Company' : 'Foundation of Nippon Electric Company',
      desc: lang === 'vn' ? 'NEC được thành lập vào ngày 17 tháng 7 năm 1899, liên doanh nước ngoài đầu tiên của Nhật Bản.' : 'NEC was established on July 17, 1899, as Japan\'s first joint venture with foreign capital.',
      image: 'https://images.unsplash.com/photo-1516086208940-058df34af529?w=800&q=80'
    },
    {
      year: '1928',
      title: lang === 'vn' ? 'Phát triển thiết bị truyền ảnh quang' : 'Developed phototelegraphic equipment',
      desc: lang === 'vn' ? 'Phát triển thiết bị truyền ảnh quang NE đầu tiên tại Nhật Bản, truyền tải thành công Lễ Đăng quang của Hoàng đế.' : 'Developed NE-type phototelegraphic equipment (first in Japan), and successfully transmitted scenes of the Imperial Accession Ceremony.',
      image: 'https://images.unsplash.com/photo-1542646271-9ce16a44c5ab?w=800&q=80'
    },
    {
      year: '1958',
      title: lang === 'vn' ? 'Hoàn thành máy tính NEAC-1102' : 'Completed NEAC-1102 computer',
      desc: lang === 'vn' ? 'Máy tính thương mại đầu tiên của NEC. Hiện thực hóa các tính toán công nghệ và kỹ thuật độ chính xác cao.' : 'NEC\'s first commercial computer NEAC-1102. Realization of highly accurate scientific and technological calculations.',
      image: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=800&q=80'
    },
    {
      year: '1964',
      title: lang === 'vn' ? 'Truyền hình vệ tinh Olympic Tokyo' : 'Satellite broadcast of Tokyo Olympics',
      desc: lang === 'vn' ? 'Thiết bị truyền thông vệ tinh của NEC được sử dụng tích cực trong chương trình phát sóng truyền hình trực tiếp.' : 'NEC\'s satellite communication equipment is actively used in the live television broadcast of the Tokyo Olympics.',
      image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&q=80'
    },
    {
      year: '1970',
      title: lang === 'vn' ? 'Vệ tinh đầu tiên của Nhật Bản' : 'Japan\'s first satellite',
      desc: lang === 'vn' ? 'Chế tạo và bàn giao vệ tinh đầu tiên của Nhật Bản "Osumi" cho Đại học Tokyo.' : 'Delivered Japan\'s first satellite "Osumi" to the Institute of Space and Aeronautical Science.',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80'
    },
    {
      year: '1982',
      title: lang === 'vn' ? 'Ra mắt máy tính cá nhân PC-9801' : 'Released 16-bit PC PC-9801',
      desc: lang === 'vn' ? 'Chiến lược kinh doanh vi máy tính dẫn đến thị phần số 1 cho máy tính cá nhân NEC.' : 'Sales strategy of microcomputers linked to No. 1 PC market share. Released 16-bit personal computer "PC-9801".',
      image: 'https://images.unsplash.com/photo-1629654291663-b91ad427698f?w=800&q=80'
    },
    {
      year: '2002',
      title: lang === 'vn' ? 'Siêu máy tính Earth Simulator' : 'Earth Simulator Supercomputer',
      desc: lang === 'vn' ? 'Siêu máy tính nhanh nhất thế giới thời điểm đó, kinh ngạc cả ngành công nghiệp Hoa Kỳ.' : '"Computonik" - the world\'s fastest supercomputer that amazed the US at the time.',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80'
    },
    {
      year: '2010',
      title: lang === 'vn' ? 'Sứ mệnh Hayabusa' : 'Hayabusa space probe',
      desc: lang === 'vn' ? 'Đóng vai trò quan trọng trong việc đưa tàu thăm dò không gian Hayabusa trở về Trái đất mang theo mẫu vật dải ngân hà.' : 'Played a crucial role in returning the Hayabusa space probe to Earth with asteroid samples.',
      image: 'https://images.unsplash.com/photo-1614729939124-03290b55c9ce?w=800&q=80'
    },
    {
      year: '2026',
      title: lang === 'vn' ? 'Kỷ nguyên AI & Chuyển đổi số toàn cầu' : 'AI Era & Global Digital Transformation',
      desc: lang === 'vn' ? 'Tiếp tục tiên phong trong các giải pháp công nghệ hiện đại, kết hợp AI, cảm biến sinh trắc học và hạ tầng số cho một xã hội bền vững.' : 'Continuing to pioneer modern technology solutions, combining AI, biometric sensing, and digital infrastructure for a sustainable society.',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F7] pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <button 
          onClick={onCheckBack}
          className="mb-8 inline-flex items-center gap-2 text-[#1a1a1a]/60 hover:text-[#005CB9] transition-colors font-semibold tracking-wide uppercase text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          {lang === 'vn' ? 'Quay lại' : 'Back to Home'}
        </button>

        <div className="mb-10 text-center flex flex-col items-center overflow-visible">
          <span className="text-[#131A9C] font-black text-[32px] md:text-[40px] tracking-tight inline-block scale-x-[1.6] origin-center mb-6">NEC</span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#1a1a1a]">
            {lang === 'vn' ? 'Lịch sử Hình thành & Phát triển' : 'History of Innovation'}
          </h1>
        </div>

        <div className="relative">
          {/* Decorative line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gray-200 hidden md:block"></div>

          <div className="space-y-12 py-8">
            {timeline.map((item, index) => (
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                key={index} 
                className={`flex flex-col md:flex-row gap-8 lg:gap-16 items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Image */}
                <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pl-12' : 'md:pr-12'}`}>
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-white relative group">
                     <div className="absolute inset-0 bg-[#005CB9]/20 group-hover:bg-transparent transition-colors z-10 mix-blend-multiply duration-500"></div>
                     <img 
                       src={item.image} 
                       alt={item.title} 
                       className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105"
                       onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1541888046428-d81bbc192fcb?w=800&q=80';
                       }}
                     />
                  </div>
                </div>

                {/* Timeline Node - Desktop only */}
                <div className="hidden md:flex w-16 h-16 shrink-0 bg-white border-4 border-[#005CB9] rounded-full absolute left-1/2 -translate-x-1/2 items-center justify-center shadow-lg z-20">
                   <Calendar className="w-6 h-6 text-[#005CB9]" />
                </div>

                {/* Content */}
                <div className={`w-full md:w-1/2 flex flex-col ${index % 2 === 0 ? 'md:items-end md:text-right' : 'md:items-start md:text-left'}`}>
                  <div className="inline-block px-5 py-2 bg-[#1a1a1a] text-white text-lg font-bold tracking-widest rounded-full mb-6 shadow-xl">
                    {item.year}
                  </div>
                  <h3 className="text-3xl font-bold text-[#1a1a1a] mb-6 leading-tight">{item.title}</h3>
                  <p className="text-[#1a1a1a]/70 text-lg leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className="mt-16 text-center pb-8 border-t border-gray-200 pt-8">
            <p className="text-xl text-[#1a1a1a]/60 font-medium max-w-3xl mx-auto mb-10 leading-relaxed">
              {lang === 'vn' 
                ? 'Trong suốt quá trình lịch sử của mình, NEC đã vượt qua nhiều dự án phát triển khó khăn khác nhau, tích lũy kiến thức qua những lần thử nghiệm và lỗi. Tinh thần của chúng tôi là luôn hướng đến chân lý.'
                : 'Throughout our history, NEC has overcome various difficult development projects, accumulating knowledge through trial and error. Our spirit goes toward the truth.'}
            </p>
            <a href="https://www.nec.com/en/global/about/history.html" target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 px-8 py-4 bg-[#005CB9] text-white rounded-full font-bold tracking-wide hover:bg-[#004b99] transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1">
              {lang === 'vn' ? 'Xem đầy đủ Lịch sử trên NEC.com' : 'View full History on NEC.com'} <ArrowRight className="w-5 h-5" />
            </a>
        </div>
      </div>
    </div>
  );
}
