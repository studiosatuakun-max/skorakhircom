'use client';

import { useChat } from 'ai/react';
import { useState, useRef, useEffect } from 'react';
import { Send, Bot, Loader2, Zap } from 'lucide-react';

export default function AiPredictionSection() {
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
    <section className="mt-16 w-full" aria-labelledby="ai-prediction">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-yellow-400 text-slate-950 p-2 rounded-lg">
          <Zap className="w-6 h-6 fill-slate-950" />
        </div>
        <div>
          <h2 id="ai-prediction" className="text-2xl sm:text-3xl font-black italic tracking-tight uppercase text-white">
            Prediksi <span className="text-yellow-400">SkorAkhir AI</span>
          </h2>
          <p className="text-slate-400 text-sm font-medium mt-1">
            Tanya prediksi skor, analisa taktik, atau statistik pertandingan hari ini.
          </p>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[500px]">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800/20 via-slate-900 to-slate-900">
          
          {/* Welcome Message */}
          {messages.length === 0 && (
            <div className="flex justify-start">
              <div className="max-w-[85%] md:max-w-[70%] rounded-2xl rounded-tl-sm bg-slate-800 p-5 text-slate-300 shadow-md border border-slate-700">
                Halo Bro! ⚽ Gue <strong>SkorAkhir AI</strong>, siap nemenin lu ngebahas taktik atau tebak skor. Siapa tim yang mau lu tanyain peluang menangnya hari ini?
              </div>
            </div>
          )}

          {/* Chat History */}
          {messages.map((m: any) => (
            <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex gap-4 max-w-[90%] md:max-w-[75%] ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-full flex shrink-0 items-center justify-center font-bold text-xs ${
                  m.role === 'user' ? 'bg-slate-700 text-slate-300' : 'bg-yellow-400 text-slate-950'
                }`}>
                  {m.role === 'user' ? 'LU' : <Bot className="w-5 h-5" />}
                </div>

                {/* Bubble */}
                <div
                  className={`rounded-2xl p-4 shadow-md whitespace-pre-wrap leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-yellow-400 text-slate-950 rounded-tr-sm font-medium'
                      : 'bg-slate-800 text-slate-200 rounded-tl-sm border border-slate-700'
                  }`}
                >
                  {m.content}
                </div>
              </div>
            </div>
          ))}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex gap-4 max-w-[90%] md:max-w-[75%]">
                <div className="w-8 h-8 rounded-full bg-yellow-400 text-slate-950 flex shrink-0 items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <div className="rounded-2xl rounded-tl-sm bg-slate-800 p-4 text-slate-400 shadow-md border border-slate-700 flex items-center gap-3">
                  <Loader2 className="w-4 h-4 animate-spin text-yellow-400" />
                  <span className="italic text-sm font-medium">Menganalisa data...</span>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="text-center p-3 rounded-lg bg-red-900/30 border border-red-800 text-red-400 text-sm font-bold">
              {error.message || 'Waduh, koneksi ke server AI lagi gangguan nih Bro.'}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 sm:p-6 bg-slate-950 border-t border-slate-800 shrink-0">
          <form onSubmit={handleSubmit} className="relative flex items-center max-w-4xl mx-auto">
            <input
              className="w-full bg-slate-900 border border-slate-700 text-white rounded-full pl-6 pr-14 py-4 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-all placeholder-slate-500 shadow-inner"
              value={input}
              onChange={handleInputChange}
              placeholder="Tanya peluang menang Madrid malam ini..."
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="absolute right-2 w-10 h-10 rounded-full bg-yellow-400 text-slate-950 flex items-center justify-center hover:bg-yellow-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed transition-all"
            >
              <Send className="w-5 h-5 ml-[-2px]" />
            </button>
          </form>
          <div className="text-center mt-3">
            <span className="text-[10px] text-slate-500 font-medium">Prediksi AI didasarkan pada probabilitas masa lalu. Selalu cek kembali faktanya.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
