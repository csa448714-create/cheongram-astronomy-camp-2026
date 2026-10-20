import { Clock, MapPin } from 'lucide-react';
import { EventConfig } from '../types/event';

interface ProgramTimelineProps {
  config: EventConfig;
}

export default function ProgramTimeline({ config }: ProgramTimelineProps) {
  return (
    <section id="schedule" className="relative py-16 px-6 sm:px-10 flex flex-col items-center">
      {/* Decorative Section Tag */}
      <div className="flex items-center gap-3 mb-4">
        <span className="w-8 h-[1px] bg-gradient-to-r from-transparent to-amber-300/60" />
        <span className="text-amber-300/80 text-xs tracking-[0.3em] font-cinzel uppercase">
          PROGRAM SCHEDULE
        </span>
        <span className="w-8 h-[1px] bg-gradient-to-l from-transparent to-amber-300/60" />
      </div>

      <h2 className="text-2xl sm:text-3xl font-serif-kr font-bold text-slate-100 mb-2 tracking-wide text-center">
        행사 프로그램 일정
      </h2>
      <p className="text-xs sm:text-sm text-slate-400 font-light mb-10 text-center">
        천문학 특강 및 3타임 선택 체험 활동으로 다채롭게 구성되었습니다.
      </p>

      {/* Vertical Timeline Container */}
      <div className="w-full max-w-xl mx-auto relative pl-4 sm:pl-6">
        {/* Continuous glowing vertical line */}
        <div className="absolute left-[27px] sm:left-[35px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-amber-400/80 via-amber-300/40 to-amber-400/10" />

        <div className="space-y-6">
          {config.schedule.map((item, index) => {
            const isSpecialBreak = item.badge === '상시운영';

            return (
              <div key={item.id} className="relative flex items-start gap-4 sm:gap-6 group">
                {/* Star Node on the Timeline */}
                <div
                  className={`relative z-10 w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-[#050814] border-2 flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform ${
                    isSpecialBreak
                      ? 'border-sky-400/80 shadow-sky-400/30'
                      : 'border-amber-300/60 shadow-amber-400/20 group-hover:border-amber-300'
                  }`}
                >
                  <span
                    className={`text-[10px] sm:text-xs font-cinzel font-bold ${
                      isSpecialBreak ? 'text-sky-300' : 'text-amber-200'
                    }`}
                  >
                    {isSpecialBreak ? '★' : index + 1}
                  </span>
                </div>

                {/* Program Card */}
                <div
                  className={`flex-1 rounded-xl backdrop-blur-md border p-5 shadow-lg shadow-black/40 transition-all duration-300 ${
                    isSpecialBreak
                      ? 'bg-sky-950/30 border-sky-400/30 hover:border-sky-300/60'
                      : 'bg-slate-900/50 border-slate-800 hover:border-amber-400/30 group-hover:bg-slate-900/70'
                  }`}
                >
                  {/* Header row with time and tag */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div
                      className={`flex items-center gap-1.5 text-xs font-cinzel tracking-wider ${
                        isSpecialBreak ? 'text-sky-300' : 'text-amber-300'
                      }`}
                    >
                      <Clock className="w-3.5 h-3.5" />
                      <span className="font-semibold">{item.time}</span>
                    </div>
                    {item.badge && (
                      <span
                        className={`text-[11px] font-sans-kr px-2.5 py-0.5 rounded-full font-medium ${
                          isSpecialBreak
                            ? 'bg-sky-400/15 text-sky-200 border border-sky-300/30'
                            : 'bg-amber-400/10 text-amber-200 border border-amber-300/20'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>

                {/* Program Title */}
                <h3 className="text-base sm:text-lg font-serif-kr font-bold text-slate-100 mb-1.5">
                  {item.title}
                </h3>

                {/* Location */}
                <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-2">
                  <MapPin className="w-3.5 h-3.5 text-amber-300/70 shrink-0" />
                  <span>{item.location}</span>
                </div>

                {/* Description - calmer font and refined compact size */}
                <p className="font-calm text-[11.5px] sm:text-xs text-slate-300/80 leading-relaxed font-normal tracking-wide pt-0.5">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
        </div>
      </div>
    </section>
  );
}
