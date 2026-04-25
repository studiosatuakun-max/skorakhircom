import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-slate-950 border-b border-slate-800">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between text-white">
        <Link href="/" className="flex items-center text-2xl font-black tracking-tighter">
          SKORAKHIR<span className="text-yellow-400 tracking-normal uppercase">.COM</span>
        </Link>

        {/* Top menu categories removed per request */}
        <nav className="hidden md:flex gap-6 font-bold text-sm tracking-wide">
        </nav>

        <button className="md:hidden p-2 text-current active:scale-95 transition-all" aria-label="Menu">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
        </button>
      </div>
    </header>
  );
}
