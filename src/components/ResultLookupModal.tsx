import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Sparkles, ExternalLink, RefreshCw, AlertCircle } from 'lucide-react';

interface ResultLookupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const APPS_SCRIPT_WEB_APP_URL =
  'https://script.google.com/macros/s/AKfycbwq7nuU18k6RL5itV91gGmhLL3WissfzKQTMZQxti6EPRIrBhDeP3T13TuinnK4IbCAgg/exec';

export default function ResultLookupModal({ isOpen, onClose }: ResultLookupModalProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [iframeKey, setIframeKey] = useState(0);

  // Reset loading state and handle body scroll lock
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setIsLoading(true);
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleReload = () => {
    setIsLoading(true);
    setIframeKey((prev) => prev + 1);
  };

  const modalContent = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#070b19] border border-amber-300/30 rounded-2xl shadow-2xl shadow-black overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="lookup-modal-title"
      >
        {/* Header Strip with Celestial Starlight Accent */}
        <div className="relative p-4 sm:p-5 border-b border-amber-300/15 bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-slate-900/95 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-amber-400/15 border border-amber-300/30 flex items-center justify-center text-amber-200 shrink-0">
              <Sparkles className="w-4 h-4 text-amber-300" />
            </div>
            <div className="min-w-0">
              <h2
                id="lookup-modal-title"
                className="text-sm sm:text-base font-serif-kr font-bold text-amber-200 tracking-wide truncate"
              >
                선정 결과 및 프로그램 확인
              </h2>
              <p className="text-[11px] text-slate-400 truncate">
                2026학년도 청람시민천문캠프
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <a
              href={APPS_SCRIPT_WEB_APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-400/15 hover:bg-amber-400/25 border border-amber-300/30 text-amber-200 hover:text-amber-100 text-xs font-serif-kr font-semibold transition-colors cursor-pointer"
              title="새 창으로 열기"
            >
              <span>새 탭에서 열기</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={handleReload}
              className="p-2 rounded-lg text-slate-400 hover:text-amber-200 hover:bg-slate-800/80 transition-colors cursor-pointer"
              title="새로고침"
              aria-label="화면 새로고침"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer"
              aria-label="닫기"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Helpful Top Banner */}
        <div className="px-4 py-2.5 bg-slate-900/90 border-b border-amber-300/10 flex items-center justify-between gap-2 text-xs text-slate-300 shrink-0">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 animate-pulse" />
            <span className="truncate text-[11px] sm:text-xs">
              신청 시 등록한 <strong>휴대폰 번호 뒤 4자리</strong>를 아래 화면에 입력해 주세요.
            </span>
          </div>
          <a
            href={APPS_SCRIPT_WEB_APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="sm:hidden inline-flex items-center gap-1 text-[11px] text-amber-300 hover:text-amber-200 font-semibold underline underline-offset-2 shrink-0"
          >
            <span>새 탭 열기</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Scrollable Iframe Container */}
        <div className="relative flex-1 w-full bg-slate-950 overflow-y-auto overscroll-contain flex flex-col min-h-[460px] h-[66vh] max-h-[660px]">
          {/* Loading Overlay */}
          {isLoading && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-[#070b19] text-slate-300">
              <div className="w-9 h-9 rounded-full border-2 border-amber-400/30 border-t-amber-400 animate-spin" />
              <p className="text-xs text-amber-200/90 font-serif-kr tracking-wide">
                조회 화면을 불러오는 중입니다...
              </p>
              <p className="text-[11px] text-slate-400">
                잠시만 기다려 주세요.
              </p>
            </div>
          )}

          {/* Embedded Google Apps Script Web App */}
          <iframe
            key={iframeKey}
            src={APPS_SCRIPT_WEB_APP_URL}
            title="2026 청람시민천문캠프 선정 결과 및 프로그램 배정 조회"
            className={`w-full flex-1 border-0 bg-white transition-opacity duration-300 ${
              isLoading ? 'opacity-0' : 'opacity-100'
            }`}
            onLoad={() => setIsLoading(false)}
            allow="clipboard-write"
            sandbox="allow-scripts allow-forms allow-same-origin allow-popups allow-modals"
          />

          {/* Fallback Notice for restrictive mobile browsers */}
          <noscript>
            <div className="p-6 text-center text-xs text-amber-200">
              <p>자바스크립트가 비활성화되어 있습니다.</p>
              <a
                href={APPS_SCRIPT_WEB_APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block underline"
              >
                새 탭에서 조회하기
              </a>
            </div>
          </noscript>
        </div>

        {/* Footer Actions */}
        <div className="p-3 sm:p-3.5 bg-slate-950/95 border-t border-amber-300/15 flex flex-col sm:flex-row items-center justify-between gap-2 shrink-0">
          <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-slate-400">
            <AlertCircle className="w-3.5 h-3.5 text-amber-400/80 shrink-0" />
            <span>화면이 잘 보이지 않으시면 새 탭에서 열어 조회하실 수 있습니다.</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <a
              href={APPS_SCRIPT_WEB_APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none py-2 px-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-serif-kr font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md shadow-amber-400/10 cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>조회 화면 새 탭에서 열기</span>
            </a>

            <button
              onClick={onClose}
              className="py-2 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-serif-kr text-xs font-medium transition-colors cursor-pointer"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
