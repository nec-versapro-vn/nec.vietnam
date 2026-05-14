import React from 'react';
import { Cpu, Maximize, Activity, Battery, ShieldCheck, Wifi, Monitor, HardDrive, Zap, Lock, Bluetooth, Scale } from 'lucide-react';
import { content } from '../content';

export function TechSpecs({ lang }: { lang: 'en' | 'vn' }) {
  const t = content[lang];
  
  const sections = [
    {
      title: lang === 'vn' ? 'Hiệu năng Vượt trội' : 'Superior Performance',
      specs: [
        { icon: <Cpu className="w-8 h-8" />, number: 'Core Ultra 7', label: 'Intel Processor' },
        { icon: <Activity className="w-8 h-8" />, number: '32GB', label: 'LPDDR5x RAM' },
        { icon: <HardDrive className="w-8 h-8" />, number: '2TB', label: 'PCIe SSD' },
      ]
    },
    {
      title: lang === 'vn' ? 'Tính di động & Bền bỉ' : 'Portability & Durability',
      specs: [
        { icon: <Scale className="w-8 h-8" />, number: '<1.0 kg', label: 'Ultra Lightweight' },
        { icon: <Battery className="w-8 h-8" />, number: '24 hrs', label: 'Battery Life' },
        { icon: <ShieldCheck className="w-8 h-8" />, number: 'MIL-STD', label: 'Durability' },
      ]
    },
    {
       title: lang === 'vn' ? 'Kết nối & Hiển thị' : 'Display & Connectivity',
       specs: [
         { icon: <Monitor className="w-8 h-8" />, number: '13.3"', label: 'WUXGA Display' },
         { icon: <Wifi className="w-8 h-8" />, number: 'Wi-Fi 7', label: 'Ultra-fast Network' },
         { icon: <Zap className="w-8 h-8" />, number: 'Thunderbolt 4', label: 'Dual Ports' },
       ]
    }
  ];

  return (
    <section id="comparison" className="py-8 px-6 bg-white overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-6">
           <h2 className="text-[28px] md:text-[40px] font-semibold tracking-tighter text-[#1a1a1a] mb-2">
              {lang === 'vn' ? 'Thông số Kỹ thuật' : 'Technical Specifications'}
           </h2>
           <p className="text-sm md:text-base text-[#1a1a1a]/60">
              {lang === 'vn' ? 'Được định hình bởi thiết kế và công nghệ hàng đầu.' : 'Defined by industry-leading design and technology.'}
           </p>
        </div>

        <div className="flex flex-col gap-8">
          {sections.map((section, idx) => (
            <div key={idx} className="flex flex-col gap-4">
               <h3 className="text-[12px] font-bold tracking-[0.2em] uppercase text-[#005CB9] border-b border-[#F5F5F7] pb-2">
                 {section.title}
               </h3>
               <div className="grid grid-cols-3 gap-4">
                 {section.specs.map((spec, i) => (
                   <div key={i} className="flex flex-col items-center text-center p-4 bg-[#F5F5F7]/50 rounded-xl hover:bg-[#F5F5F7] transition-colors">
                     <div className="text-[#1a1a1a] mb-2">
                       {React.cloneElement(spec.icon as React.ReactElement, { className: "w-6 h-6" })}
                     </div>
                     <div className="text-xl font-bold text-[#1a1a1a] tracking-tight mb-1">
                        {spec.number}
                     </div>
                     <div className="text-[10px] font-medium tracking-wide uppercase text-[#1a1a1a]/50">
                        {spec.label}
                     </div>
                   </div>
                 ))}
               </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
