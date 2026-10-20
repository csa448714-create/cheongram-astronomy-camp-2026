import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, ZoomIn, ZoomOut, RotateCcw, Check } from 'lucide-react';
import SchoolCampusSvg from './SchoolCampusSvg';

interface CampusMapModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CampusMapModal({ isOpen, onClose }: CampusMapModalProps) {
  const [scale, setScale] = useState(1);

  // Lock body scroll and reset zoom scale on open
  useEffect(() => {
    if (isOpen) {
      setScale(1);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || typeof document === 'undefined') return null;

  const zoomIn = () => setScale((s) => Math.min(2.2, s + 0.2));
  const zoomOut = () => setScale((s) => Math.max(0.85, s - 0.2));
  const resetZoom = () => setScale(1);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const modalContent = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label="계림고등학교 교내 배치도"
    >
      <div
        className="relative w-full max-w-xl bg-slate-900 border border-amber-300/40 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[94vh] sm:max-h-[90vh] my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-3.5 py-2.5 sm:px-4 sm:py-3 border-b border-slate-800 flex items-center justify-between bg-slate-950/95">
          <div>
            <h3 className="text-sm sm:text-base font-serif-kr font-bold text-amber-200">
              계림고등학교 교내 배치도 (관측 구역)
            </h3>
            <p className="text-[11px] text-slate-400">
              화면을 터치하거나 우측 버튼으로 확대/축소할 수 있습니다.
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-colors ml-2 cursor-pointer"
            aria-label="배치도 닫기"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Zoom Controls Overlay */}
        <div className="absolute top-16 sm:top-18 right-4 z-20 flex flex-col gap-1 bg-black/80 backdrop-blur-md p-1 rounded-lg border border-slate-700 shadow-xl">
          <button
            onClick={zoomIn}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-200 hover:text-white cursor-pointer"
            title="확대"
            aria-label="확대"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={zoomOut}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-200 hover:text-white cursor-pointer"
            title="축소"
            aria-label="축소"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={resetZoom}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-200 hover:text-white cursor-pointer"
            title="원래 크기"
            aria-label="원래 크기"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        </div>

        {/* Map Canvas / Diagram Container */}
        <div className="p-2 sm:p-3 overflow-hidden flex items-center justify-center bg-[#070b18] flex-1">
          <div
            style={{ transform: `scale(${scale})`, transition: 'transform 0.2s ease-out' }}
            className="origin-center w-full max-w-lg aspect-[4/3] relative rounded-xl border border-amber-300/20 bg-slate-950 p-2 sm:p-3 select-none flex items-center justify-center shadow-inner"
          >
            <SchoolCampusSvg className="w-full h-auto max-h-[58vh] sm:max-h-[64vh] object-contain drop-shadow" />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="py-2.5 px-3 bg-slate-950 flex items-center justify-between border-t border-slate-800 text-[11px] text-amber-200/90 font-light">
          <span>※ 당일 기상 및 운영에 따라 일부 변경될 수 있습니다.</span>
          <button
            onClick={onClose}
            className="py-1 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium cursor-pointer"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
