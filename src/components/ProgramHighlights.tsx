import { Sparkles } from 'lucide-react';
import { EventConfig } from '../types/event';

interface ProgramHighlightsProps {
  config: EventConfig;
}

export default function ProgramHighlights({ config }: ProgramHighlightsProps) {
  return (
    <section id="highlights" className="relative py-16 px-6 sm:px-10 flex flex-col items-center">
      {/* Decorative Section Tag */}
      <div className="flex items-center gap-3 mb-4">
        <span className="w-8 h-[1px] bg-gradient-to-r from-transparent to-amber-300/60" />
        <span className="text-amber-300/80 text-xs tracking-[0.3em] font-cinzel uppercase">
          HIGHLIGHTS
        </span>
        <span className="w-8 h-[1px] bg-gradient-to-l from-transparent to-amber-300/60" />
      </div>

      <h2 className="text-2xl sm:text-3xl font-serif-kr font-bold text-slate-100 mb-2 tracking-wide text-center">
        주요 프로그램 안내
      </h2>
      <p className="text-xs sm:text-sm text-amber-200/90 font-medium mb-4 text-center">
        (주요 프로그램 5가지 중 3가지 선택 참가)
      </p>

      {/* Helpful Info Banner for 3 choices & Snack/Griptok activity */}
      <div className="w-full max-w-xl mx-auto mb-10 p-3.5 rounded-xl bg-slate-900/60 border border-amber-300/30 text-xs text-slate-300 space-y-1 text-left">
        <p className="font-semibold text-amber-200 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>프로그램 체험 안내</span>
        </p>
        <p className="text-slate-300 font-light leading-relaxed">
          • 사전 신청 시 5가지 프로그램 중 3가지 사전 선택하여 타임별(각 30분)로 참여합니다.
        </p>
        <p className="text-amber-200/90 font-light leading-relaxed">
          • 프로그램 간 대기 시간이 생기는 경우, 야외 부스에서 <strong className="text-white">우주 그립톡 만들기 체험</strong> 및 <strong className="text-white">따뜻한 간식차</strong>를 자유롭게 이용하실 수 있습니다.
        </p>
      </div>

      {/* Alternating Highlights List */}
      <div className="w-full max-w-xl mx-auto space-y-12">
        {config.highlights.map((item, idx) => {
          const isReversed = idx % 2 === 1;

          return (
            <div
              key={item.id}
              className="rounded-2xl bg-slate-900/40 backdrop-blur-md border border-amber-300/20 overflow-hidden shadow-xl shadow-black/50 group"
            >
              {/* Highlight Image with gentle zoom on hover */}
              <div className="relative h-56 sm:h-64 w-full overflow-hidden">
                <img
                  src={item.image}
                  alt={item.imageAlt || item.title}
                  className="w-full h-full object-cover filter brightness-[0.85] group-hover:scale-105 transition-transform duration-700 ease-out"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src.includes('/src/assets/images/')) {
                      target.src = target.src.replace('/src/assets/images/', '/images/');
                    }
                  }}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                
                {/* Index badge */}
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-amber-300/30 text-xs text-amber-200 font-cinzel tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  <span>{idx === 0 ? '개회 특강' : `체험 프로그램 0${idx}`}</span>
                </div>
              </div>

              {/* Text Description Box */}
              <div className="p-6 sm:p-7 text-left space-y-2">
                <p className="text-xs font-cinzel tracking-wider text-amber-300/80 font-medium">
                  {item.subtitle}
                </p>
                <h3 className="text-lg sm:text-xl font-serif-kr font-bold text-slate-100 group-hover:text-amber-100 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300/90 font-light leading-relaxed pt-1">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
