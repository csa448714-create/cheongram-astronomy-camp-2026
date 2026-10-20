import { ExternalLink, CheckCircle2, AlertCircle } from 'lucide-react';
import { EventConfig } from '../types/event';

interface RegistrationSectionProps {
  config: EventConfig;
}

export default function RegistrationSection({ config }: RegistrationSectionProps) {
  // Check if enabled
  if (!config.registration.enabled || !config.sectionVisibility.registration) {
    return null;
  }

  return (
    <section id="registration" className="relative py-16 px-6 sm:px-10 flex flex-col items-center">
      {/* Decorative Section Tag */}
      <div className="flex items-center gap-3 mb-4">
        <span className="w-8 h-[1px] bg-gradient-to-r from-transparent to-amber-300/60" />
        <span className="text-amber-300/80 text-xs tracking-[0.3em] font-cinzel uppercase">
          RSVP & REGISTRATION
        </span>
        <span className="w-8 h-[1px] bg-gradient-to-l from-transparent to-amber-300/60" />
      </div>

      <h2 className="text-2xl sm:text-3xl font-serif-kr font-bold text-slate-100 mb-2 tracking-wide text-center">
        참가 신청 안내
      </h2>
      <p className="text-xs sm:text-sm text-slate-400 font-light mb-8 text-center">
        밤하늘의 별빛과 함께할 여러분의 소중한 참여를 기다립니다.
      </p>

      {/* Main Registration Card */}
      <div className="w-full max-w-xl mx-auto rounded-2xl bg-gradient-to-b from-slate-900/80 to-slate-950/90 border border-amber-300/30 p-6 sm:p-8 shadow-2xl shadow-black/60 space-y-6 text-center relative overflow-hidden">
        {/* Subtle celestial radial glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-32 bg-amber-400/10 blur-3xl pointer-events-none" />

        <div className="space-y-2 relative z-10">
          <p className="text-base sm:text-lg font-serif-kr font-bold text-amber-200">
            2026 청람시민천문캠프 참가 접수
          </p>
          <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
            {config.registration.periodText}
          </p>
          <p className="text-xs text-slate-400">
            {config.registration.limitCountText}
          </p>
        </div>

        {/* Highlighted Notice Box */}
        <div className="p-4 rounded-xl bg-slate-950/90 border border-amber-400/30 text-left space-y-2 relative z-10 shadow-lg">
          <div className="flex items-center gap-2 text-xs font-serif-kr font-bold text-amber-300">
            <AlertCircle className="w-4 h-4 text-amber-300 shrink-0" />
            <span>신청 전 꼭 확인해 주세요 (선발 및 추첨 안내)</span>
          </div>
          <div className="space-y-1.5 pl-6 text-xs leading-relaxed">
            <p className="text-amber-200/90 font-medium bg-amber-400/10 p-2 rounded-lg border border-amber-300/20">
              🎯 <strong className="text-amber-200">추첨 안내:</strong> 신청 인원이 90명을 초과할 경우, <span className="underline underline-offset-2 font-bold text-white">추첨을 통해 최종 90명만 선발</span>합니다.
            </p>
            <p className="text-slate-300 font-light">
              • <strong>신청 기간:</strong> 11월 8일(일) 자정까지 접수 마감
            </p>
            <p className="text-slate-300 font-light">
              • <strong>프로그램 선택:</strong> 사전 신청 시 5개 체험 프로그램 중 희망하는 3개 프로그램을 선택하여 타임별(각 30분)로 참여합니다.
            </p>
            <p className="text-slate-400 font-light">
              • <strong>준비물:</strong> {config.suppliesNotice}
            </p>
          </div>
        </div>

        {/* Primary Google Form Registration Button */}
        <div className="pt-2 relative z-10">
          <a
            href={config.registration.formUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-amber-400/20 transition-all transform active:scale-[0.98] cursor-pointer group"
          >
            <span>{config.registration.buttonText}</span>
            <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </a>

          <p className="mt-2.5 text-[11px] text-slate-400 font-light">
            ※ 구글 폼으로 안전하게 연결되며, 별도의 회원가입 없이 신청하실 수 있습니다.
          </p>
        </div>

        {/* Checklist */}
        <div className="pt-2 grid grid-cols-2 gap-2 text-left text-xs text-slate-300 relative z-10">
          <div className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-900/60 border border-slate-800">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>참가비 전액 무료</span>
          </div>
          <div className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-900/60 border border-slate-800">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>가족 및 일반 시민 환영</span>
          </div>
        </div>
      </div>
    </section>
  );
}
