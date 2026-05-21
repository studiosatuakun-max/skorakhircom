'use client';

import { useChat } from 'ai/react';
import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Loader2 } from 'lucide-react';

export default function FloatingChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
    api: '/api/chat',
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 rounded-full bg-yellow-400 text-slate-950 shadow-[0_0_20px_rgba(250,204,21,0.4)] hover:scale-110 active:scale-95 transition-all z-50 flex items-center justify-center ${isOpen ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'}`}
        aria-label="Tanya AI SkorAkhir"
      >
        <MessageCircle className="w-7 h-7" />
        <span className="absolute -top-2 -right-2 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
        </span>
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-6 right-6 w-[350px] sm:w-[400px] h-[550px] max-h-[80vh] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50 transition-all duration-300 origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-50 opacity-0 pointer-events-none'}`}
      >
        {/* Header */}
        <div className="bg-slate-950 p-4 border-b border-slate-800 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center text-slate-950">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-white font-black italic tracking-tight leading-none">SkorAkhir AI</h3>
              <p className="text-[10px] text-yellow-400 font-bold uppercase tracking-wider mt-1">Pakar Olahraga</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900/50">
          {/* Welcome Message */}
          {messages.length === 0 && (
            <div className="flex justify-start">
              <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-slate-800 p-4 text-slate-300 text-sm shadow-md border border-slate-700">
                Halo Bro! ⚽ Gue <strong>SkorAkhir AI</strong>, siap nemenin lu ngebahas taktik, prediksi skor, atau sekadar obrolan santai soal olahraga. Ada yang mau ditanyain hari ini?
              </div>
            </div>
          )}

          {/* Chat History */}
          {messages.map((m: any) => (
            <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[85%] rounded-2xl p-3 text-sm shadow-md whitespace-pre-wrap leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-yellow-400 text-slate-950 rounded-tr-sm font-medium'
                    : 'bg-slate-800 text-slate-300 rounded-tl-sm border border-slate-700'
                }`}
              >
                {/* Kalau butuh render markdown beneran, bisa pakai react-markdown. Untuk sekarang whitespace-pre-wrap cukup */}
                {m.content}
              </div>
            </div>
          ))}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="rounded-2xl rounded-tl-sm bg-slate-800 p-3 text-slate-400 text-sm shadow-md border border-slate-700 flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-yellow-400" />
                <span className="italic text-xs font-medium">Menganalisa data...</span>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="text-center p-2 rounded bg-red-900/30 border border-red-800 text-red-400 text-xs font-bold">
              {error.message || 'Waduh, koneksi ke server AI lagi gangguan nih Bro.'}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 shrink-0">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              className="flex-1 bg-slate-800 border border-slate-700 text-white text-sm rounded-full px-4 py-2 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-all placeholder-slate-500"
              value={input}
              onChange={handleInputChange}
              placeholder="Tanya soal bola..."
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="w-10 h-10 shrink-0 rounded-full bg-yellow-400 text-slate-950 flex items-center justify-center hover:bg-yellow-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-4 h-4 ml-[-2px]" />
            </button>
          </form>
          <div className="text-center mt-2">
            <span className="text-[9px] text-slate-500 font-medium">Sistem AI dapat melakukan kesalahan. Cek kembali faktanya.</span>
          </div>
        </div>
      </div>
    </>
  );
}
