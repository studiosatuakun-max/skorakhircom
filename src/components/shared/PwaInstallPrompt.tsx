'use client';

import React, { useEffect, useState } from 'react';
import { Download, X, Share } from 'lucide-react';

export default function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Registrasi Service Worker
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch((err) => {
          console.log('ServiceWorker registration failed: ', err);
        });
      });
    }

    // Deteksi iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIosDevice);

    // Cek apakah mode standalone (sudah di-install)
    const isInStandaloneMode = ('standalone' in window.navigator) && (window.navigator as any).standalone;
    const isPwa = window.matchMedia('(display-mode: standalone)').matches;
    const isInstalledInStorage = localStorage.getItem('pwa_installed') === 'true';

    // Jika sudah di-install, jangan jalankan logika prompt
    if (isInStandaloneMode || isPwa || isInstalledInStorage) return;

    let intervalId: NodeJS.Timeout;

    // Listener jika sukses di-install via native prompt (Android/Desktop)
    const handleAppInstalled = () => {
      localStorage.setItem('pwa_installed', 'true');
      setShowPrompt(false);
      if (intervalId) clearInterval(intervalId);
    };
    window.addEventListener('appinstalled', handleAppInstalled);

    if (isIosDevice) {
      // Tampilkan prompt manual untuk iOS setelah 5 detik, lalu setiap 5 menit
      const showIosPrompt = () => setShowPrompt(true);
      const timer = setTimeout(() => {
        showIosPrompt();
        intervalId = setInterval(showIosPrompt, 300000);
      }, 5000);

      return () => {
        clearTimeout(timer);
        if (intervalId) clearInterval(intervalId);
        window.removeEventListener('appinstalled', handleAppInstalled);
      };
    }

    // Event untuk Android/Chrome (Hanya trigger jika web belum di-install)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      
      // Beri delay sedikit agar user bisa baca konten dulu, lalu setiap 5 menit
      const showAndroidPrompt = () => setShowPrompt(true);
      setTimeout(() => {
        showAndroidPrompt();
        intervalId = setInterval(showAndroidPrompt, 300000);
      }, 3000);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
        // Jika diterima, jangan munculkan lagi
        setShowPrompt(false);
      } else {
        console.log('User dismissed the install prompt');
        // Jika ditolak native prompt, kita tutup UI kita (nanti 5 menit lagi kebuka sendiri)
        setShowPrompt(false);
      }
      setDeferredPrompt(null);
    }
  };

  const handleClose = () => {
    setShowPrompt(false);
    // Tidak di-save ke localStorage agar 5 menit lagi tetap muncul
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-slate-900 border-2 border-orange-500 rounded-2xl shadow-2xl z-[9999] p-4 flex flex-col gap-3 animate-in slide-in-from-bottom-5 fade-in duration-500">
      <button 
        onClick={handleClose}
        className="absolute top-2 right-2 text-slate-500 hover:text-white transition-colors"
        aria-label="Tutup"
      >
        <X className="w-5 h-5" />
      </button>
      
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center font-black text-2xl text-slate-900 shrink-0 shadow-lg">
          S
        </div>
        <div>
          <h3 className="text-white font-black italic tracking-tight">Install SkorAkhir App</h3>
          <p className="text-xs text-slate-400 font-medium mt-1">
            {isIOS 
              ? 'Tambahkan SkorAkhir ke Home Screen agar lebih cepat dan ringan tanpa buka browser.' 
              : 'Install aplikasi SkorAkhir untuk akses berita olahraga tercepat tanpa address bar.'}
          </p>
        </div>
      </div>

      <div className="mt-2">
        {isIOS ? (
          <>
            <div className="bg-slate-800 rounded-lg p-3 text-xs text-slate-300 flex flex-col gap-2">
              <p className="flex items-center gap-2">
                1. Tap icon <Share className="w-4 h-4 text-blue-400" /> di menu bawah Safari.
              </p>
              <p className="flex items-center gap-2">
                2. Scroll ke bawah, lalu pilih <strong className="text-white">"Add to Home Screen"</strong>.
              </p>
            </div>
            <button 
              onClick={() => {
                localStorage.setItem('pwa_installed', 'true');
                setShowPrompt(false);
              }}
              className="w-full mt-2 text-slate-400 hover:text-white font-bold text-[10px] uppercase tracking-wider py-2 transition-colors"
            >
              Saya sudah install
            </button>
          </>
        ) : (
          <button 
            onClick={handleInstallClick}
            className="w-full bg-orange-500 hover:bg-orange-400 text-slate-900 font-black text-sm uppercase tracking-widest py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" /> Install Sekarang
          </button>
        )}
      </div>
    </div>
  );
}
