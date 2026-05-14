import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

export function UserModal({ 
  lang, 
  isOpen, 
  onClose,
  user,
  onLogin,
  onLogout
}: { 
  lang: 'en' | 'vn'; 
  isOpen: boolean; 
  onClose: () => void;
  user: any;
  onLogin: (user: any) => void;
  onLogout: () => void;
}) {
  const [isLoginMode, setIsLoginMode] = useState(true);
  
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 10 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white/98 backdrop-blur-3xl max-w-[340px] w-full border border-gray-100 shadow-[0_24px_80px_-12px_rgba(0,0,0,0.12)] p-6 md:p-7 relative flex flex-col rounded-[2rem]"
        >
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-[#F5F5F7] rounded-full transition-colors text-[#1a1a1a]"
          >
            <X className="w-5 h-5" />
          </button>

          {user ? (
             <div className="flex flex-col w-full">
                <h2 className="text-[20px] font-semibold tracking-tighter text-[#1a1a1a] mb-6">
                  {lang === 'vn' ? 'Quản lý Tài khoản' : 'Account Settings'}
                </h2>
                
                <div className="space-y-4 flex-1 overflow-y-auto pr-2 pb-6 max-h-[60vh]">
                  {/* Info Section */}
                  <div className="space-y-4 pt-2">
                    <h3 className="text-[11px] font-bold tracking-widest uppercase text-[#1a1a1a]/50 mb-2 border-b border-[#F5F5F7] pb-2">
                      {lang === 'vn' ? 'Thông tin Cá nhân' : 'Personal Info'}
                    </h3>
                    
                    <div>
                      <label className="block text-[10px] font-bold text-[#1a1a1a]/50 uppercase tracking-widest mb-1">{lang === 'vn' ? 'Họ và tên' : 'Full Name'}</label>
                      <input 
                        type="text" 
                        defaultValue={user.name}
                        className="w-full bg-transparent border border-[#E5E5EA] px-4 py-3 text-sm focus:outline-none focus:border-[#005CB9] focus:ring-1 focus:ring-[#005CB9] text-[#1a1a1a] transition-all rounded-xl" 
                      />
                    </div>
                    
                    <div>
                      <label className="block text-[10px] font-bold text-[#1a1a1a]/50 uppercase tracking-widest mb-1">Email</label>
                      <input 
                        type="email" 
                        defaultValue={user.email}
                        readOnly
                        className="w-full bg-gray-50 border border-transparent px-4 py-3 text-sm text-[#1a1a1a]/40 cursor-not-allowed rounded-xl outline-none" 
                      />
                    </div>
                    
                    <div>
                      <label className="block text-[10px] font-bold text-[#1a1a1a]/50 uppercase tracking-widest mb-1">{lang === 'vn' ? 'Số điện thoại' : 'Phone Number'}</label>
                      <input 
                        type="tel" 
                        defaultValue={user.phone || ''}
                        className="w-full bg-transparent border border-[#E5E5EA] px-4 py-3 text-sm focus:outline-none focus:border-[#005CB9] focus:ring-1 focus:ring-[#005CB9] text-[#1a1a1a] transition-all rounded-xl" 
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-[#1a1a1a]/50 uppercase tracking-widest mb-1">{lang === 'vn' ? 'Địa chỉ' : 'Address'}</label>
                      <textarea 
                        rows={1}
                        defaultValue={user.address || ''}
                        onInput={(e) => {
                          const target = e.target as HTMLTextAreaElement;
                          target.style.height = 'auto';
                          target.style.height = `${target.scrollHeight}px`;
                        }}
                        className="w-full bg-transparent border border-[#E5E5EA] px-4 py-3 text-sm focus:outline-none focus:border-[#005CB9] focus:ring-1 focus:ring-[#005CB9] text-[#1a1a1a] transition-all resize-none min-h-[44px] max-h-32 overflow-y-auto rounded-xl" 
                      />
                    </div>
                  </div>

                  {/* Payment Methods Section */}
                  <div className="space-y-4 pt-4">
                    <h3 className="text-[11px] font-bold tracking-widest uppercase text-[#1a1a1a]/50 mb-2 border-b border-[#F5F5F7] pb-2">
                      {lang === 'vn' ? 'Phương thức Thanh toán' : 'Payment Methods'}
                    </h3>
                    
                    {user.cards && user.cards.length > 0 ? (
                      <div className="space-y-2">
                        {user.cards.map((card: any, idx: number) => (
                          <div key={idx} className="flex justify-between items-center p-4 border border-[#F5F5F7] bg-white rounded-md">
                            <div className="flex flex-col">
                              <span className="text-[12px] font-bold uppercase tracking-widest text-[#1a1a1a]">VISA •••• {card.last4}</span>
                              <span className="text-[10px] text-[#1a1a1a]/50">Exp: {card.exp}</span>
                            </div>
                            <span className="text-[10px] bg-[#F5F5F7] px-2 py-1 rounded text-[#1a1a1a]/60">Default</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                       <p className="text-[12px] text-[#1a1a1a]/50">{lang === 'vn' ? 'Chưa có thẻ nào được thêm.' : 'No cards added yet.'}</p>
                    )}
                    
                    <button className="w-full py-3 border border-dashed border-[#1a1a1a]/20 text-[11px] font-bold uppercase tracking-widest hover:border-[#005CB9] hover:text-[#005CB9] transition-colors text-[#1a1a1a]/50 rounded-xl">
                      {lang === 'vn' ? '+ Thêm thẻ VISA/Mastercard' : '+ Add VISA/Mastercard'}
                    </button>
                  </div>
                </div>
                
                <div className="pt-6 border-t border-[#F5F5F7] mt-auto flex flex-col gap-3">
                  <button 
                    onClick={() => {
                        // Mock save
                        alert(lang === 'vn' ? 'Lưu thay đổi thành công!' : 'Changes saved successfully!');
                        onClose();
                    }}
                    className="w-full bg-[#005CB9] hover:bg-[#004A99] text-white py-4 text-[11px] font-bold tracking-widest uppercase transition-colors rounded-xl"
                  >
                    {lang === 'vn' ? 'Lưu thay đổi' : 'Save Changes'}
                  </button>
                  <button 
                    onClick={onLogout}
                    className="w-full bg-white hover:bg-[#F5F5F7] text-[#1a1a1a] border border-[#1a1a1a]/10 py-3 text-[11px] font-bold tracking-widest uppercase transition-colors rounded-xl"
                  >
                    {lang === 'vn' ? 'Đăng xuất' : 'Logout'}
                  </button>
                </div>
             </div>
          ) : (
            <>
              <div className="mb-6">
                <h2 className="text-[24px] font-semibold tracking-tighter text-[#1a1a1a]">
                  {isLoginMode 
                    ? (lang === 'vn' ? 'Đăng nhập' : 'Login') 
                    : (lang === 'vn' ? 'Đăng ký' : 'Register')}
                </h2>
                <p className="text-[12px] font-medium text-[#1a1a1a]/50 tracking-wide mt-1">
                  {lang === 'vn' ? 'Chào mừng đến với NEC' : 'Welcome to NEC'}
                </p>
              </div>

              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  const fd = new FormData(e.currentTarget);
                  const email = fd.get('email') as string;
                  const name = fd.get('name') as string || email.split('@')[0];
                  
                  if (!isLoginMode) {
                    // Password validation if needed
                  }

                  // mock login
                  onLogin({ name, email });
                }} 
                className="space-y-4"
              >
                {!isLoginMode && (
                  <div className="space-y-4">
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                      <label className="block text-[10px] font-bold text-[#1a1a1a]/50 uppercase tracking-widest mb-1">{lang === 'vn' ? 'Họ và tên' : 'Full Name'}</label>
                      <input required name="name" type="text" className="w-full bg-transparent border border-[#E5E5EA] px-4 py-3 text-sm focus:outline-none focus:border-[#005CB9] focus:ring-1 focus:ring-[#005CB9] text-[#1a1a1a] transition-all placeholder:text-[#1a1a1a]/30 rounded-xl" placeholder={lang === 'vn' ? 'Tên của bạn' : 'Your name'} />
                    </motion.div>
                    
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                      <label className="block text-[10px] font-bold text-[#1a1a1a]/50 uppercase tracking-widest mb-1">{lang === 'vn' ? 'Số điện thoại' : 'Phone Number'}</label>
                      <input required name="phone" type="tel" className="w-full bg-transparent border border-[#E5E5EA] px-4 py-3 text-sm focus:outline-none focus:border-[#005CB9] focus:ring-1 focus:ring-[#005CB9] text-[#1a1a1a] transition-all placeholder:text-[#1a1a1a]/30 rounded-xl" placeholder={lang === 'vn' ? 'Số điện thoại' : 'Phone number'} />
                    </motion.div>
                  </div>
                )}
                
                <div>
                  <label className="block text-[10px] font-bold text-[#1a1a1a]/50 uppercase tracking-widest mb-1">Email</label>
                  <input required name="email" type="email" className="w-full bg-transparent border border-[#E5E5EA] px-4 py-3 text-sm focus:outline-none focus:border-[#005CB9] focus:ring-1 focus:ring-[#005CB9] text-[#1a1a1a] transition-all placeholder:text-[#1a1a1a]/30 rounded-xl" placeholder="Email" />
                </div>
                
                <div>
                  <label className="block text-[10px] font-bold text-[#1a1a1a]/50 uppercase tracking-widest mb-1">{lang === 'vn' ? 'Mật khẩu' : 'Password'}</label>
                  <input required name="password" type="password" className="w-full bg-transparent border border-[#E5E5EA] px-4 py-3 text-sm focus:outline-none focus:border-[#005CB9] focus:ring-1 focus:ring-[#005CB9] text-[#1a1a1a] transition-all placeholder:text-[#1a1a1a]/30 rounded-xl" placeholder="••••••••" />
                </div>

                {isLoginMode && (
                  <div className="flex items-center gap-2 pt-1">
                    <input type="checkbox" id="remember" name="remember" className="w-4 h-4 rounded border-[#1a1a1a]/20 text-[#005CB9] focus:ring-[#005CB9]" />
                    <label htmlFor="remember" className="text-[12px] text-[#1a1a1a]/60 leading-tight cursor-pointer">
                      {lang === 'vn' ? 'Lưu mật khẩu' : 'Remember password'}
                    </label>
                  </div>
                )}

                <div className="flex items-start gap-2 pt-1">
                  <input required type="checkbox" id="terms" name="terms" className="mt-[2px] w-4 h-4 rounded border-[#1a1a1a]/20 text-[#005CB9] focus:ring-[#005CB9]" />
                  <label htmlFor="terms" className="text-[12px] text-[#1a1a1a]/60 leading-tight">
                    {lang === 'vn' ? 'Tôi đồng ý với các ' : 'I agree to the '}
                    <a href="#" className="text-[#005CB9] hover:underline font-medium">{lang === 'vn' ? 'Điều khoản và điều kiện' : 'Terms and Conditions'}</a>
                    {lang === 'vn' ? ' của NEC.' : ' of NEC.'}
                  </label>
                </div>

                <div className="pt-4">
                  <button type="submit" className="w-full bg-[#005CB9] hover:bg-[#004A99] text-white py-4 text-[11px] font-bold tracking-widest uppercase transition-colors rounded-xl">
                     {isLoginMode 
                        ? (lang === 'vn' ? 'Đăng nhập' : 'Login')
                        : (lang === 'vn' ? 'Tạo tài khoản' : 'Create Account')}
                  </button>
                </div>
              </form>

              <div className="mt-6 text-center border-t border-[#F5F5F7] pt-5">
                <button 
                  onClick={() => setIsLoginMode(!isLoginMode)}
                  className="text-[11px] font-bold text-[#1a1a1a]/50 uppercase tracking-widest hover:text-[#005CB9] transition-colors"
                >
                  {isLoginMode 
                    ? (lang === 'vn' ? 'Chưa có tài khoản? Đăng ký ngay' : 'No account? Register now')
                    : (lang === 'vn' ? 'Đã có tài khoản? Đăng nhập' : 'Have an account? Login')}
                </button>
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
