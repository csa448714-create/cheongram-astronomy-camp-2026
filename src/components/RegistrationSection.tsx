import { CheckCircle2, AlertCircle, Sparkles, Lock } from 'lucide-react';
import { EventConfig } from '../types/event';

interface RegistrationSectionProps {
  config: EventConfig;
  onOpenLookup?: () => void;
}

export default function RegistrationSection({ config, onOpenLookup }: RegistrationSectionProps) {
  // Check if section is visible
  if (!config.sectionVisibility.registration) {
    return null;
  }

  return (
    <section id="registration" className="relative py-16 px-6 sm:px-10 flex flex-col items-center">
      {/* Decorative Section Tag */}
      <div className="flex items-center gap-3 mb-4">
        <span className="w-8 h-[1px] bg-gradient-to-r from-transparent to-amber-300/60" />
        <span className="text-amber-300/80 text-xs tracking-[0.3em] font-cinzel uppercase">
          REGISTRATION CLOSED & RESULTS
        </span>
        <span className="w-8 h-[1px] bg-gradient-to-l from-transparent to-amber-300/60" />
      </div>

      <h2 className="text-2xl sm:text-3xl font-serif-kr font-bold text-slate-100 mb-2 tracking-wide text-center">
        참가 신청 마감 & 선정 결과 안내
      </h2>
      <p className="text-xs sm:text-sm text-slate-400 font-light mb-8 text-center">
        2026 청람시민천문캠프 참가자 선발 및 프로그램 배정이 완료되었습니다.
      </p>

      {/* Primary Action Card: 선정 결과 및 프로그램 확인 */}
      {onOpenLookup && (
        <div className="w-full max-w-xl mx-auto mb-8 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-amber-500/20 via-amber-400/10 to-amber-500/20 border border-amber-400/40 shadow-xl shadow-amber-400/10 text-center space-y-3 relative overflow-hidden">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-200 text-xs font-serif-kr font-bold border border-amber-300/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>선정 결과 발표</span>
          </div>

          <h3 className="text-base sm:text-lg font-serif-kr font-bold text-amber-100">
            캠프 참가 선정 결과 및 타임별 프로그램 확인
          </h3>

          <p className="text-xs text-slate-300 leading-relaxed max-w-md mx-auto">
            신청할 때 등록하신 <strong>휴대폰 번호 뒤 4자리</strong>를 입력하시면 선정 여부와 1·2·3타임 배정 프로그램을 바로 확인하실 수 있습니다.
          </p>

          <div className="pt-1">
            <button
              onClick={onOpenLookup}
              className="w-full sm:w-auto py-3.5 px-8 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-sm inline-flex items-center justify-center gap-2 shadow-lg shadow-amber-400/20 transition-all transform active:scale-[0.98] cursor-pointer"
            >
              <Sparkles className="w-4 h-4 fill-current" />
              <span>선정 결과 및 프로그램 확인</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Registration Closed Notice Card (Google Form Links Blocked) */}
      <div className="w-full max-w-xl mx-auto rounded-2xl bg-gradient-to-b from-slate-900/80 to-slate-950/90 border border-slate-800 p-6 sm:p-8 shadow-2xl shadow-black/60 space-y-6 text-center relative overflow-hidden">
        {/* Subtle celestial radial glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-32 bg-amber-400/5 blur-3xl pointer-events-none" />

        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 text-xs font-medium border border-slate-700">
            <Lock className="w-3 h-3 text-slate-400" />
            <span>접수 마감</span>
          </div>
          <p className="text-base sm:text-lg font-serif-kr font-bold text-slate-200">
            2026 청람시민천문캠프 참가 접수
          </p>
          <p className="text-xs sm:text-sm text-amber-200/90 font-medium leading-relaxed">
            {config.registration.periodText}
          </p>
          <p className="text-xs text-slate-400">
            {config.registration.limitCountText}
          </p>
        </div>

        {/* Closed Announcement Notice Box */}
        <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 text-left space-y-2.5 relative z-10 shadow-lg">
          <div className="flex items-center gap-2 text-xs font-serif-kr font-bold text-amber-300">
            <AlertCircle className="w-4 h-4 text-amber-300 shrink-0" />
            <span>참가 신청 마감 안내</span>
          </div>
          <div className="space-y-1.5 pl-6 text-xs leading-relaxed text-slate-300">
            <p className="text-slate-200 font-medium bg-slate-900/80 p-2.5 rounded-lg border border-slate-800 leading-relaxed">
              📢 <strong>접수 마감:</strong> 2026 청람시민천문캠프 참가 신청 접수가 성황리에 마감되었습니다. 많은 관심과 성원에 진심으로 감사드립니다.
            </p>
            <p className="text-slate-300 font-light pt-1">
              • <strong>선발 완료:</strong> 사전 신청 접수(11.8 자정)가 종료되어 최종 90명 선발 및 타임별 프로그램 배정이 완료되었습니다.
            </p>
            <p className="text-slate-400 font-light">
              • <strong>신규 접수 제한:</strong> 현재 신규 신청 및 신청서 수정은 불가하오니 양해 부탁드립니다.
            </p>
            <p className="text-slate-400 font-light">
              • <strong>준비물:</strong> {config.suppliesNotice}
            </p>
          </div>
        </div>

        {/* Disabled Closed Button (No active link) */}
        <div className="pt-2 relative z-10 space-y-2">
          <div
            className="w-full py-4 px-6 rounded-xl bg-slate-800/80 border border-slate-700/80 text-slate-400 font-bold text-sm sm:text-base flex items-center justify-center gap-2 cursor-not-allowed select-none shadow-inner"
            aria-disabled="true"
          >
            <Lock className="w-4 h-4 text-slate-500" />
            <span>참가 신청 접수가 마감되었습니다</span>
          </div>

          <p className="text-[11px] text-slate-500 font-light">
            ※ 신청 기한이 경과하여 구글 폼 신청서 접근이 차단되었습니다.
          </p>
        </div>

        {/* Checklist */}
        <div className="pt-2 grid grid-cols-2 gap-2 text-left text-xs text-slate-300 relative z-10">
          <div className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-900/60 border border-slate-800">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>선정자 전액 무료 참여</span>
          </div>
          <div className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-900/60 border border-slate-800">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>기념품 전원 증정</span>
          </div>
        </div>
      </div>
    </section>
  );
}
