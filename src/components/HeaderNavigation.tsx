import { Sparkles } from 'lucide-react';
import { EventConfig } from '../types/event';

interface HeaderNavigationProps {
  config: EventConfig;
  onOpenLookup?: () => void;
}

export default function HeaderNavigation({ config, onOpenLookup }: HeaderNavigationProps) {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#050814]/85 backdrop-blur-md border-b border-amber-300/15 transition-all">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-3">
        {/* Zone 1: Single text wordmark */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-xs sm:text-base font-serif-kr font-bold text-amber-200 tracking-wide whitespace-nowrap shrink-0 flex items-center gap-1.5 hover:text-amber-100 transition-colors cursor-pointer"
        >
          <span>✦</span>
          <span>{config.schoolName} 청람시민천문캠프</span>
        </button>

        {/* Zone 2: Concise single-line navigation links */}
        <nav className="hidden lg:flex items-center gap-5 text-xs text-slate-300 font-medium tracking-wide">
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
          {config.sectionVisibility.registration && (
            <button
              onClick={() => scrollTo('registration')}
              className="hover:text-amber-200 transition-colors whitespace-nowrap cursor-pointer"
            >
              선정 결과 안내
            </button>
          )}
        </nav>

        {/* Zone 3: Quick Action (Result Lookup Button) */}
        {onOpenLookup && (
          <div className="flex items-center shrink-0">
            <button
              onClick={onOpenLookup}
              className="py-1.5 px-3 rounded-xl bg-gradient-to-r from-amber-400/20 via-amber-400/30 to-amber-400/20 hover:from-amber-400/30 hover:to-amber-400/40 text-amber-200 hover:text-amber-100 font-serif-kr font-bold text-xs flex items-center gap-1.5 border border-amber-300/40 shadow-sm transition-all active:scale-[0.98] cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>선정 결과 확인</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
