import { useState, useEffect, useRef } from 'react';
import { X, Copy, Check, QrCode as QrIcon } from 'lucide-react';

interface QrCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
}

export default function QrCodeModal({ isOpen, onClose, url }: QrCodeModalProps) {
  const [copied, setCopied] = useState(false);
  const qrCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    // Generate a visual QR Code using Google Charts QR API or canvas fallback
    const targetUrl = url || window.location.href;
    const canvas = qrCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Load QR image via reliable public QR endpoint or draw cleanly
    const qrImg = new Image();
    qrImg.crossOrigin = 'anonymous';
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(
      targetUrl
    )}&color=050814&bgcolor=ffffff&qzone=2`;

    qrImg.onload = () => {
      canvas.width = 240;
      canvas.height = 240;
      ctx.drawImage(qrImg, 0, 0, 240, 240);
    };

    qrImg.onerror = () => {
      // Fallback simple clean grid if offline
      canvas.width = 240;
      canvas.height = 240;
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, 240, 240);
      ctx.fillStyle = '#050814';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('QR Code Preview', 120, 110);
      ctx.fillText(targetUrl.substring(0, 28) + '...', 120, 135);
    };
  }, [isOpen, url]);

  if (!isOpen) return null;

  const handleCopy = async () => {
    const targetUrl = url || window.location.href;
    try {
      await navigator.clipboard.writeText(targetUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm bg-slate-900 border border-amber-300/30 rounded-2xl overflow-hidden shadow-2xl p-6 text-center space-y-4">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-white"
          aria-label="QR 코드 닫기"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center justify-center gap-2 text-amber-300 font-cinzel text-xs tracking-widest pt-2">
          <QrIcon className="w-4 h-4" />
          <span>SCAN QR CODE</span>
        </div>

        <h3 className="text-base font-serif-kr font-bold text-slate-100">
          모바일 초대장 QR 코드
        </h3>
        <p className="text-xs text-slate-400 font-light">
          카메라 앱으로 스캔하시면 별도 앱 설치 없이 초대장이 열립니다.
        </p>

        {/* QR Code Container */}
        <div className="p-4 bg-white rounded-xl shadow-inner inline-block mx-auto border border-amber-300/40">
          <canvas ref={qrCanvasRef} width={240} height={240} className="w-48 h-48 mx-auto" />
        </div>

        {/* Copy Link Button */}
        <button
          onClick={handleCopy}
          className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-amber-300/30 text-amber-200 text-xs font-medium flex items-center justify-center gap-1.5 transition-all"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-semibold">링크가 복사되었습니다</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-amber-300" />
              <span>초대장 URL 복사하기</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
