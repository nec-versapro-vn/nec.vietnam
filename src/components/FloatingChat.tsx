import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { content } from '../content';
import { products } from './ProductGrid';
import { GoogleGenAI } from '@google/genai';
import { newsData } from '../data/newsData';
import Markdown from 'react-markdown';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

type Message = {
  role: 'user' | 'model';
  text: string;
};

export function FloatingChat({ lang, onAddToCart, selectedArticleId }: { lang: 'en' | 'vn', onAddToCart: (item: any, rect: DOMRect) => void, selectedArticleId: string | null }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: lang === 'vn' ? 'Xin chào! Tôi có thể giúp gì cho bạn hôm nay? Bạn có thể hỏi tôi bất cứ điều gì về các sản phẩm NEC hoặc nội dung bài viết.' : 'Hello! How can I assist you today? Feel free to ask me about NEC products or any article content.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const t = content[lang];

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setInput('');
    const newMessages: Message[] = [...messages, { role: 'user', text: userText }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      // Add empty message for streaming
      setMessages(prev => [...prev, { role: 'model', text: '' }]);

      const articleInfo = selectedArticleId ? newsData.find(a => a.id === selectedArticleId) : null;
      let systemInstruction = `You are NEC AI Concierge, a knowledgeable and polite AI assistant for NEC Vietnam, specifically helping with NEC UltraLite laptops. 
Answer concisely. Always reply in ${lang === 'vn' ? 'Vietnamese' : 'English'}. Format using standard markdown.`;
      
      if (articleInfo) {
        systemInstruction += `\n\n[CONTEXT] The user is currently reading an article titled "${articleInfo.title}". Here is a snippet of the article content to help you summarize or answer questions about it:\n${articleInfo.content.slice(0, 3000)}`;
      }

      const contents = newMessages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const stream = await ai.models.generateContentStream({
        model: 'gemini-3-flash-preview',
        contents,
        config: { systemInstruction }
      });

      let fullResponse = '';
      for await (const chunk of stream) {
        if (chunk.text) {
          fullResponse += chunk.text;
          setMessages(prev => {
            const updated = [...prev];
            updated[updated.length - 1].text = fullResponse;
            return updated;
          });
        }
      }

    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1].text = "Sorry, I'm having trouble connecting right now. Please try again.";
        return updated;
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 200, damping: 20 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-[60] w-14 h-14 bg-[#1a1a1a] rounded-full flex items-center justify-center shadow-2xl hover:scale-110 hover:bg-[#005CB9] transition-all cursor-pointer group"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="bot"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Bot className="w-6 h-6 text-white group-hover:rotate-12 transition-transform" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9, transformOrigin: "bottom right" }}
            animate={{ opacity: 1, y: 0, scale: 1, transformOrigin: "bottom right" }}
            exit={{ opacity: 0, y: 20, scale: 0.9, transformOrigin: "bottom right" }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed bottom-24 right-6 z-[60] w-full max-w-[360px] bg-white border border-[#F5F5F7] shadow-2xl flex flex-col h-[500px] rounded-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#1a1a1a] p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-[11px] tracking-widest uppercase text-white">NEC AI Concierge</h4>
                  <p className="text-[9px] text-green-400 font-bold tracking-widest mt-1">● ONLINE</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-5 overflow-y-auto bg-white flex flex-col gap-6">
              {messages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`p-4 w-[85%] text-[12px] font-medium leading-relaxed rounded-2xl ${
                    msg.role === 'user' 
                      ? 'bg-[#1a1a1a] text-white self-end rounded-br-sm' 
                      : 'bg-[#F5F5F7]/80 text-[#1a1a1a]/80 self-start rounded-bl-sm [&_strong]:text-[#1a1a1a] [&_ul]:list-disc [&_ul]:pl-4 [&_ul_li]:mb-1'
                  }`}
                >
                   {msg.text ? <div className="markdown-body"><Markdown>{msg.text}</Markdown></div> : (isLoading && idx === messages.length - 1 ? <Loader2 className="w-4 h-4 animate-spin opacity-50" /> : '')}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Footer */}
            <div className="p-4 border-t border-[#F5F5F7] bg-white flex gap-2 items-center">
               <input 
                 type="text" 
                 value={input}
                 onChange={(e) => setInput(e.target.value)}
                 onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                 placeholder={lang === 'vn' ? 'Nhập tin nhắn...' : 'Type a message...'} 
                 className="flex-1 bg-[#F5F5F7]/50 border border-transparent px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-[#005CB9]/30 text-[#1a1a1a] transition-all" 
               />
               <button 
                 onClick={handleSend}
                 disabled={isLoading || !input.trim()}
                 className="w-11 h-11 rounded-xl flex-shrink-0 bg-[#005CB9] text-white flex items-center justify-center hover:bg-[#004A99] disabled:opacity-50 disabled:hover:bg-[#005CB9] transition-colors"
               >
                 <Send className="w-4 h-4 ml-0.5" />
               </button>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
