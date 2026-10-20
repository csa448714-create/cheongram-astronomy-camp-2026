import { ChevronDown, Sparkles } from 'lucide-react';
import { EventConfig } from '../types/event';
import heroImg from '../assets/images/hero_celestial_night_1792472205181.jpg';

interface HeroCoverProps {
  config: EventConfig;
  onScrollDown: () => void;
}

export default function HeroCover({ config, onScrollDown }: HeroCoverProps) {
  return (
    <section className="relative min-h-[95vh] sm:min-h-screen flex flex-col justify-between items-center text-center px-6 py-12 overflow-hidden">
      {/* Background Hero Image with atmospheric dark vignette and gold rim */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImg}
          onError={(e) => {
            const target = e.currentTarget;
            target.src = '/images/hero_celestial_night_1792472205181.jpg';
          }}
          alt="계림고등학교 천문대와 밤하늘 은하수"
          className="w-full h-full object-cover object-center filter brightness-[0.65] contrast-[1.08] scale-105 transform animate-in fade-in duration-1000"
        />
        {/* Gradients to guarantee legibility and luxury wedding invitation depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050814]/85 via-[#050814]/40 to-[#050814]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#050814]/30 to-[#050814]/90" />
      </div>

      {/* Top Header Tag */}
      <div className="relative z-10 pt-4 flex flex-col items-center">
        <div className="flex items-center gap-2 text-xs tracking-[0.25em] text-amber-200/90 font-medium uppercase font-cinzel">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>INVITATION · CELESTIAL NIGHT</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
        </div>
        <p className="mt-2 text-xs text-slate-300/80 tracking-wider font-light">
          {config.schoolType} · {config.schoolName}
        </p>
      </div>

      {/* Center Event Typography & Emblem */}
      <div className="relative z-10 my-auto py-8 max-w-sm sm:max-w-md flex flex-col items-center">
        {/* Subtle decorative gold circle ring */}
        <div className="relative w-16 h-16 mb-6 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-amber-300/40 animate-spin-slow" />
          <div className="absolute inset-1 rounded-full border border-amber-400/20 border-dashed" />
          <span className="text-amber-200 text-xl font-cinzel">✦</span>
        </div>

        {/* Slogan */}
        <p className="text-amber-200/90 font-serif-kr text-base sm:text-lg tracking-widest font-normal mb-3">
          {config.eventSubtitle}
        </p>

        {/* Main Event Title */}
        <h1 className="text-3xl sm:text-4xl font-serif-kr font-bold text-white tracking-tight leading-tight text-balance shadow-black drop-shadow-md flex flex-col items-center">
          <span className="text-xl sm:text-2xl font-light text-amber-200/90 tracking-widest mb-1.5 font-serif-kr">
            2026학년도
          </span>
          <span className="text-3xl sm:text-4xl tracking-tight text-white font-bold font-serif-kr">
            청람시민천문캠프
          </span>
        </h1>

        <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-amber-300/70 to-transparent my-6" />

        {/* Date and Time Badge */}
        <div className="space-y-1.5 text-slate-200 font-light">
          <p className="text-lg sm:text-xl font-cinzel tracking-wider text-amber-100 font-medium">
            2026. 11. 20 · FRI · 18:40
          </p>
          <p className="text-xs sm:text-sm text-slate-300 font-sans-kr tracking-wide">
            {config.eventLocation}
          </p>
        </div>
      </div>

      {/* Bottom Scroll Prompt */}
      <div className="relative z-10 pb-4 flex flex-col items-center">
        <button
          onClick={onScrollDown}
          className="group flex flex-col items-center gap-1.5 text-xs text-amber-200/80 hover:text-amber-100 transition-colors cursor-pointer focus:outline-none"
          aria-label="초대장 아래로 스크롤하여 내용 보기"
        >
          <span className="tracking-widest font-serif-kr text-[11px] group-hover:tracking-[0.2em] transition-all">
            초대장 열어보기
          </span>
          <div className="w-8 h-8 rounded-full border border-amber-300/30 flex items-center justify-center bg-black/20 backdrop-blur-xs group-hover:border-amber-300/60 transition-colors animate-bounce">
            <ChevronDown className="w-4 h-4 text-amber-200" />
          </div>
        </button>
      </div>
    </section>
  );
}
