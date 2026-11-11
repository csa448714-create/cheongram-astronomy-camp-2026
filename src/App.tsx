import { useState, useEffect } from 'react';
import { defaultEventConfig } from './config/eventData';
import { EventConfig } from './types/event';
import StarryCanvas from './components/StarryCanvas';
import HeaderNavigation from './components/HeaderNavigation';
import HeroCover from './components/HeroCover';
import InvitationMessage from './components/InvitationMessage';
import EventOverview from './components/EventOverview';
import ProgramTimeline from './components/ProgramTimeline';
import ProgramHighlights from './components/ProgramHighlights';
import LocationGuide from './components/LocationGuide';
import RegistrationSection from './components/RegistrationSection';
import EndingSection from './components/EndingSection';
import ResultLookupModal from './components/ResultLookupModal';
import { ChevronUp, Sparkles } from 'lucide-react';

export default function App() {
  // Use canonical defaultEventConfig defined in code by the administrator
  const [config] = useState<EventConfig>(defaultEventConfig);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [lookupModalOpen, setLookupModalOpen] = useState(false);

  useEffect(() => {
    // Clear any obsolete local storage entries from previous editing sessions
    try {
      localStorage.removeItem('gyerim_custom_event_config_v7');
      localStorage.removeItem('gyerim_custom_event_config_v6');
      localStorage.removeItem('gyerim_custom_event_config_v5');
    } catch {
      // ignore
    }

    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollDownFromCover = () => {
    const target = document.getElementById('greeting');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-[#050814] text-slate-100 selection:bg-amber-400/20 selection:text-amber-200">
      {/* Dynamic Starry Canvas in the background */}
      <StarryCanvas />

      {/* Top Header Navigation (Clean Visitor Nav with Result Lookup shortcut) */}
      <HeaderNavigation
        config={config}
        onOpenLookup={() => setLookupModalOpen(true)}
      />

      {/* Main Container: Mobile-First Invitation Canvas with elegant desktop framing */}
      <main className="relative z-10 w-full max-w-xl mx-auto sm:border-x sm:border-amber-300/10 sm:shadow-2xl sm:shadow-black bg-[#050814]/75 backdrop-blur-[2px]">
        {/* SECTION 1: Invitation Cover */}
        {config.sectionVisibility.cover && (
          <HeroCover
            config={config}
            onScrollDown={handleScrollDownFromCover}
            onOpenLookup={() => setLookupModalOpen(true)}
          />
        )}

        {/* SECTION 2: Invitation Message (Greeting) */}
        {config.sectionVisibility.greeting && (
          <InvitationMessage config={config} />
        )}

        {/* SECTION 3: Event Overview & Countdown & Calendar */}
        {config.sectionVisibility.overview && (
          <EventOverview config={config} />
        )}

        {/* SECTION 4: Program Schedule (Vertical Timeline) */}
        {config.sectionVisibility.schedule && (
          <ProgramTimeline config={config} />
        )}

        {/* SECTION 5: Major Program Highlights */}
        {config.sectionVisibility.highlights && (
          <ProgramHighlights config={config} />
        )}

        {/* SECTION 6: Location Guide & Map Navigation */}
        {config.sectionVisibility.location && (
          <LocationGuide config={config} />
        )}

        {/* SECTION 7: Registration & Google Form & Result Lookup */}
        {config.sectionVisibility.registration && (
          <RegistrationSection
            config={config}
            onOpenLookup={() => setLookupModalOpen(true)}
          />
        )}

        {/* SECTION 8: Closing & Contact */}
        {config.sectionVisibility.ending && (
          <EndingSection config={config} />
        )}
      </main>

      {/* Floating Bottom Quick Action (Fixed Result Lookup shortcut when scrolling) */}
      {config.sectionVisibility.registration && showScrollTop && (
        <div className="fixed bottom-4 left-0 right-0 z-30 px-4 pointer-events-none flex justify-center">
          <div className="pointer-events-auto flex items-center gap-2 max-w-sm w-full bg-slate-900/90 backdrop-blur-md p-1.5 pl-3 rounded-2xl border border-amber-300/30 shadow-2xl">
            <button
              onClick={() => setLookupModalOpen(true)}
              className="p-1.5 rounded-xl bg-amber-400/20 hover:bg-amber-400/30 border border-amber-300/30 text-amber-200 transition-colors shrink-0"
              title="선정 결과 확인"
              aria-label="선정 결과 확인"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
            </button>
            <div className="flex-1 min-w-0 pr-1 cursor-pointer" onClick={() => setLookupModalOpen(true)}>
              <p className="text-xs font-serif-kr font-bold text-amber-200 truncate">
                선정 결과 및 배정 확인
              </p>
              <p className="text-[10px] text-slate-400 truncate">
                참가 접수 마감 · 선정 결과 조회
              </p>
            </div>
            <button
              onClick={() => setLookupModalOpen(true)}
              className="py-2 px-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 text-slate-950 font-bold text-xs flex items-center gap-1 shrink-0 transition-transform active:scale-[0.98] cursor-pointer shadow-sm shadow-amber-900/30"
            >
              <Sparkles className="w-3 h-3 text-slate-950" />
              <span>결과 확인</span>
            </button>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              title="맨 위로"
              aria-label="맨 위로 이동"
            >
              <ChevronUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Result Lookup Modal */}
      <ResultLookupModal
        isOpen={lookupModalOpen}
        onClose={() => setLookupModalOpen(false)}
      />
    </div>
  );
}
