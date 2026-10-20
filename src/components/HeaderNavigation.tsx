import { QrCode, Sliders } from 'lucide-react';
import { EventConfig } from '../types/event';

interface HeaderNavigationProps {
  config: EventConfig;
  onOpenQr: () => void;
  onOpenOrganizer: () => void;
}

export default function HeaderNavigation({ config, onOpenQr, onOpenOrganizer }: HeaderNavigationProps) {
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
          className="text-sm sm:text-base font-serif-kr font-bold text-amber-200 tracking-wide whitespace-nowrap shrink-0 flex items-center gap-1.5 hover:text-amber-100 transition-colors"
        >
          <span>✦</span>
          <span>{config.schoolName} 천문캠프</span>
        </button>

        {/* Zone 2: 4 concise single-line links */}
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
        </nav>

        {/* Zone 3: Actions (QR Code button & Organizer customizer toggle) */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenQr}
            className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 text-amber-200 border border-amber-300/20 text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            title="초대장 QR 코드"
            aria-label="QR 코드 열기"
          >
            <QrCode className="w-3.5 h-3.5" />
            <span className="hidden sm:inline font-medium">QR</span>
          </button>

          <button
            onClick={onOpenOrganizer}
            className="py-1.5 px-2.5 rounded-lg bg-amber-400/15 hover:bg-amber-400/25 border border-amber-300/30 text-amber-200 text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap"
            title="행사 정보 커스터마이징 및 재사용 설정"
            aria-label="행사 정보 수정"
          >
            <Sliders className="w-3.5 h-3.5 text-amber-300" />
            <span className="hidden xs:inline">행사정보 편집</span>
          </button>
        </div>
      </div>
    </header>
  );
}
