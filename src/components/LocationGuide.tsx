import { useState } from 'react';
import { MapPin, Copy, Check, Navigation, Maximize2, Car, Bus, Info } from 'lucide-react';
import { EventConfig } from '../types/event';
import CampusMapModal from './CampusMapModal';
import SchoolCampusSvg from './SchoolCampusSvg';

interface LocationGuideProps {
  config: EventConfig;
}

export default function LocationGuide({ config }: LocationGuideProps) {
  const [copied, setCopied] = useState(false);
  const [mapModalOpen, setMapModalOpen] = useState(false);

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(config.eventAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = config.eventAddress;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <section id="location" className="relative py-16 px-6 sm:px-10 flex flex-col items-center">
      {/* Decorative Section Tag */}
      <div className="flex items-center gap-3 mb-4">
        <span className="w-8 h-[1px] bg-gradient-to-r from-transparent to-amber-300/60" />
        <span className="text-amber-300/80 text-xs tracking-[0.3em] font-cinzel uppercase">
          LOCATION GUIDE
        </span>
        <span className="w-8 h-[1px] bg-gradient-to-l from-transparent to-amber-300/60" />
      </div>

      <h2 className="text-2xl sm:text-3xl font-serif-kr font-bold text-slate-100 mb-2 tracking-wide text-center">
        오시는 길 & 행사장 안내
      </h2>
      <p className="text-xs sm:text-sm text-slate-400 font-light mb-8 text-center">
        {config.schoolName} 운동장 및 천문고
      </p>

      {/* Main Location Container */}
      <div className="w-full max-w-xl mx-auto rounded-2xl bg-slate-900/40 backdrop-blur-md border border-amber-300/20 p-6 sm:p-8 shadow-xl shadow-black/50 space-y-6">
        {/* Address & Copy Box */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-slate-950/70 border border-slate-800">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <p className="text-sm font-serif-kr font-bold text-slate-100">
                {config.schoolName}
              </p>
              <p className="text-xs text-slate-300 break-keep">
                {config.eventAddress}
              </p>
            </div>
          </div>
          <button
            onClick={handleCopyAddress}
            className="self-end sm:self-center py-2 px-3.5 rounded-lg bg-amber-400/10 hover:bg-amber-400/20 border border-amber-300/30 text-amber-200 text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer shrink-0"
            aria-label="주소 복사"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-semibold">복사완료</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-amber-300" />
                <span>주소 복사</span>
              </>
            )}
          </button>
        </div>

        {/* Interactive Campus Map Preview (Directly visible + Tap to Enlarge) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-300 font-medium flex items-center gap-1.5">
              <Navigation className="w-3.5 h-3.5 text-amber-300" />
              교내 관측 구역 배치도
              <span className="text-[10px] text-amber-300/70 font-light hidden sm:inline">(장소는 추후 수정될 수 있음)</span>
            </span>
            <button
              onClick={() => setMapModalOpen(true)}
              className="text-xs text-amber-300/90 hover:text-amber-200 font-medium flex items-center gap-1 cursor-pointer bg-amber-400/10 hover:bg-amber-400/20 px-2 py-0.5 rounded border border-amber-300/30 transition-colors"
            >
              <Maximize2 className="w-3 h-3" />
              <span>크게 보기</span>
            </button>
          </div>

          <div
            onClick={() => setMapModalOpen(true)}
            className="w-full relative group rounded-xl overflow-hidden border border-amber-300/30 bg-slate-950 p-2 sm:p-3 cursor-pointer transition-all hover:border-amber-300/70 shadow-lg text-left"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setMapModalOpen(true);
              }
            }}
            aria-label="교내 배치도 전체화면 크게 보기"
          >
            {/* Direct High-Fidelity Blueprint SVG */}
            <div className="w-full aspect-[4/3] rounded-lg overflow-hidden bg-[#070b18] border border-slate-800 flex items-center justify-center">
              <SchoolCampusSvg className="w-full h-full object-contain" />
            </div>

            {/* Tap Hint Banner */}
            <div className="mt-2 flex items-center justify-between px-1">
              <span className="text-[11px] text-slate-400">
                ※ 화랑관(강당), 천문고, 대운동장 위치 안내
              </span>
              <span className="text-[11px] text-amber-300 font-medium flex items-center gap-1">
                <Maximize2 className="w-3 h-3" />
                <span>터치하여 전체화면 확대</span>
              </span>
            </div>
          </div>
        </div>

        {/* External Map Application Navigation Links */}
        <div className="space-y-2">
          <p className="text-xs text-slate-400 font-medium">내비게이션 및 지도 앱 연결</p>
          <div className="grid grid-cols-3 gap-2">
            <a
              href={config.mapKakaoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-2 rounded-xl bg-[#FEE500]/10 hover:bg-[#FEE500]/20 border border-[#FEE500]/30 text-[#FEE500] text-xs font-medium text-center flex flex-col items-center justify-center gap-1 transition-all active:scale-[0.98]"
            >
              <span className="font-bold">카카오맵</span>
            </a>
            <a
              href={config.mapNaverUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-2 rounded-xl bg-[#03C75A]/10 hover:bg-[#03C75A]/20 border border-[#03C75A]/30 text-[#03C75A] text-xs font-medium text-center flex flex-col items-center justify-center gap-1 transition-all active:scale-[0.98]"
            >
              <span className="font-bold">네이버 지도</span>
            </a>
            <a
              href={config.mapTmapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-2 rounded-xl bg-[#2860E1]/10 hover:bg-[#2860E1]/20 border border-[#2860E1]/30 text-[#60A5FA] text-xs font-medium text-center flex flex-col items-center justify-center gap-1 transition-all active:scale-[0.98]"
            >
              <span className="font-bold">티맵 (TMAP)</span>
            </a>
          </div>
        </div>

        {/* Transportation & Parking Details */}
        <div className="pt-2 space-y-3 divide-y divide-slate-800 text-left">
          {config.transitGuide.map((transit, idx) => (
            <div key={idx} className="pt-3 first:pt-0 flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center shrink-0 mt-0.5">
                {idx === 0 ? (
                  <Car className="w-3.5 h-3.5 text-amber-300" />
                ) : idx === 1 ? (
                  <Bus className="w-3.5 h-3.5 text-sky-300" />
                ) : (
                  <Info className="w-3.5 h-3.5 text-amber-200" />
                )}
              </div>
              <div className="space-y-0.5">
                <p className="text-xs font-semibold text-slate-200">
                  {transit.title}
                </p>
                <p className="text-xs text-slate-400 font-light leading-relaxed">
                  {transit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <CampusMapModal isOpen={mapModalOpen} onClose={() => setMapModalOpen(false)} />
    </section>
  );
}
