import { EventConfig } from '../types/event';

interface InvitationMessageProps {
  config: EventConfig;
}

export default function InvitationMessage({ config }: InvitationMessageProps) {
  return (
    <section id="greeting" className="relative py-20 px-6 sm:px-10 flex flex-col items-center text-center">
      {/* Decorative Golden Stardust Accent Header */}
      <div className="flex items-center gap-3 mb-6">
        <span className="w-8 h-[1px] bg-gradient-to-r from-transparent to-amber-300/60" />
        <span className="text-amber-300/80 text-xs tracking-[0.3em] font-cinzel uppercase">
          INVITATION
        </span>
        <span className="w-8 h-[1px] bg-gradient-to-l from-transparent to-amber-300/60" />
      </div>

      {/* Section Title */}
      <h2 className="text-2xl sm:text-3xl font-serif-kr font-bold text-slate-100 mb-8 tracking-wide">
        초대의 글
      </h2>

      {/* Invitation Content Box with delicate gold hairline border */}
      <div className="w-full max-w-xl mx-auto p-8 sm:p-10 rounded-2xl bg-slate-900/40 backdrop-blur-md border border-amber-300/20 shadow-2xl shadow-black/60 relative">
        {/* Subtle corner ornaments */}
        <div className="absolute top-2 left-2 text-[10px] text-amber-300/40 font-cinzel">⌜</div>
        <div className="absolute top-2 right-2 text-[10px] text-amber-300/40 font-cinzel">⌝</div>
        <div className="absolute bottom-2 left-2 text-[10px] text-amber-300/40 font-cinzel">⌞</div>
        <div className="absolute bottom-2 right-2 text-[10px] text-amber-300/40 font-cinzel">⌟</div>

        {/* Poetic Message Lines */}
        <div className="space-y-4 font-serif-kr text-slate-200 text-sm sm:text-base leading-relaxed tracking-wide">
          {config.invitationGreeting.map((line, idx) => {
            if (line.trim() === '') {
              return <div key={idx} className="h-3" />;
            }
            // Emphasize key sentences
            const isHighlight =
              line.includes('별을 읽고, 우주를 만나다') ||
              line.includes('2026 시민천문캠프') ||
              line.includes('특별한 우주 탐험');

            return (
              <p
                key={idx}
                className={
                  isHighlight
                    ? 'text-amber-200 font-semibold text-base sm:text-lg py-1'
                    : 'text-slate-200/90 font-light'
                }
              >
                {line}
              </p>
            );
          })}
        </div>

        {/* Delicate divider */}
        <div className="my-8 flex justify-center items-center gap-2 text-amber-300/40">
          <span className="w-6 h-[1px] bg-amber-300/30" />
          <span className="text-xs">✦</span>
          <span className="w-6 h-[1px] bg-amber-300/30" />
        </div>

        {/* Signatures */}
        <div className="space-y-1">
          <p className="text-xs text-slate-400 font-sans-kr tracking-wider">
            {config.schoolName}
          </p>
          <p className="text-sm sm:text-base font-serif-kr text-amber-100 font-medium tracking-wide">
            {config.hostSignature}
          </p>
        </div>
      </div>
    </section>
  );
}
