import { EventConfig } from '../types/event';

interface HeaderNavigationProps {
  config: EventConfig;
}

export default function HeaderNavigation({ config }: HeaderNavigationProps) {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#050814]/85 backdrop-blur-md border-b border-amber-300/15 transition-all">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        {/* Zone 1: Single text wordmark */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-sm sm:text-base font-serif-kr font-bold text-amber-200 tracking-wide whitespace-nowrap shrink-0 flex items-center gap-1.5 hover:text-amber-100 transition-colors cursor-pointer"
        >
          <span>✦</span>
          <span>{config.schoolName} 청람시민천문캠프</span>
        </button>

        {/* Zone 2: Concise single-line navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-xs text-slate-300 font-medium tracking-wide">
          <button
            onClick={() => scrollTo('greeting')}
            className="hover:text-amber-200 transition-colors whitespace-nowrap cursor-pointer"
          >
            초대의 글
          </button>
          <button
            onClick={() => scrollTo('overview')}
            className="hover:text-amber-200 transition-colors whitespace-nowrap cursor-pointer"
          >
            행사 안내
          </button>
          <button
            onClick={() => scrollTo('schedule')}
            className="hover:text-amber-200 transition-colors whitespace-nowrap cursor-pointer"
          >
            프로그램
          </button>
          <button
            onClick={() => scrollTo('location')}
            className="hover:text-amber-200 transition-colors whitespace-nowrap cursor-pointer"
          >
            오시는 길
          </button>
          {config.registration.enabled && (
            <button
              onClick={() => scrollTo('registration')}
              className="hover:text-amber-200 transition-colors whitespace-nowrap cursor-pointer"
            >
              참가 신청
            </button>
          )}
        </nav>

        {/* Zone 3: Direct Registration Quick Action (Visitor Only) */}
        {config.registration.enabled && (
          <div className="flex items-center shrink-0">
            <button
              onClick={() => scrollTo('registration')}
              className="py-1.5 px-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs tracking-wide transition-all shadow-md shadow-amber-400/20 active:scale-[0.98] cursor-pointer"
            >
              참가 신청
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
