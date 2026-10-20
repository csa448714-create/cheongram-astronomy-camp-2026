import { useState } from 'react';
import { Phone, Mail, MapPin, Share2, Copy, Check, QrCode, Heart } from 'lucide-react';
import { EventConfig } from '../types/event';
import QrCodeModal from './QrCodeModal';

interface EndingSectionProps {
  config: EventConfig;
}

export default function EndingSection({ config }: EndingSectionProps) {
  const [copied, setCopied] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
      const textArea = document.createElement('textarea');
      textArea.value = window.location.href;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${config.schoolName} ${config.eventName}`,
          text: `[초대장] ${config.eventSubtitle} - ${config.eventDateText}에 여러분을 초대합니다.`,
          url: window.location.href
        });
      } catch {
        // user cancelled or failed, fallback to copy
        handleCopyLink();
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <section id="ending" className="relative py-20 px-6 sm:px-10 flex flex-col items-center text-center">
      {/* Decorative Golden Stardust */}
      <div className="flex items-center gap-3 mb-6">
        <span className="w-8 h-[1px] bg-gradient-to-r from-transparent to-amber-300/60" />
        <span className="text-amber-300/80 text-xs tracking-[0.3em] font-cinzel uppercase">
          CLOSING & CONTACT
        </span>
        <span className="w-8 h-[1px] bg-gradient-to-l from-transparent to-amber-300/60" />
      </div>

      {/* Poetic Closing Card */}
      <div className="w-full max-w-xl mx-auto p-8 sm:p-10 rounded-2xl bg-slate-900/40 backdrop-blur-md border border-amber-300/20 shadow-2xl shadow-black/60 relative mb-12">
        <div className="w-10 h-10 mx-auto mb-4 rounded-full border border-amber-300/30 flex items-center justify-center text-amber-200">
          ✦
        </div>

        <div className="space-y-3 font-serif-kr text-slate-200 text-sm sm:text-base leading-relaxed tracking-wide">
          {config.closingMessage.map((line, idx) => (
            <p
              key={idx}
              className={
                line.includes('기다리겠습니다')
                  ? 'text-amber-200 font-bold text-base sm:text-lg pt-2'
                  : 'font-light text-slate-300'
              }
            >
              {line}
            </p>
          ))}
        </div>

        <div className="my-6 w-16 h-[1px] bg-amber-300/30 mx-auto" />

        <div className="space-y-1">
          <p className="text-xs text-slate-400 font-sans-kr">{config.schoolName}</p>
          <p className="text-sm font-serif-kr text-amber-100 font-medium">
            {config.eventName} 운영위원회
          </p>
        </div>
      </div>

      {/* Contact Information Card */}
      <div className="w-full max-w-xl mx-auto rounded-2xl bg-slate-900/40 backdrop-blur-md border border-amber-300/20 p-6 sm:p-8 shadow-xl shadow-black/50 mb-12 text-left space-y-4">
        <h3 className="text-base font-serif-kr font-bold text-slate-100 mb-2">
          행사 관련 문의
        </h3>
        <div className="space-y-3 text-xs sm:text-sm text-slate-300">
          <div className="flex items-center gap-3">
            <Phone className="w-4 h-4 text-amber-300 shrink-0" />
            <a
              href={`tel:${config.contact.phone.replace(/[^0-9]/g, '')}`}
              className="hover:text-amber-200 transition-colors font-medium text-slate-100"
            >
              {config.contact.phone}
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="w-4 h-4 text-amber-300 shrink-0" />
            <a
              href={`mailto:${config.contact.email}`}
              className="hover:text-amber-200 transition-colors font-medium text-slate-100"
            >
              {config.contact.email}
            </a>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="w-4 h-4 text-amber-300 shrink-0" />
            <span>{config.contact.location}</span>
          </div>
        </div>
      </div>

      {/* Share Actions Strip */}
      <div className="w-full max-w-xl mx-auto space-y-4">
        <div className="grid grid-cols-3 gap-2.5">
          {/* Share on Kakao / SNS */}
          <button
            onClick={handleShare}
            className="py-3 px-3 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm flex flex-col sm:flex-row items-center justify-center gap-1.5 shadow-lg shadow-amber-400/20 hover:bg-amber-300 transition-all cursor-pointer active:scale-[0.98]"
          >
            <Share2 className="w-4 h-4" />
            <span>초대장 공유</span>
          </button>

          {/* Copy URL */}
          <button
            onClick={handleCopyLink}
            className="py-3 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-medium text-xs sm:text-sm flex flex-col sm:flex-row items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-[0.98]"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400">복사 완료</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-amber-300" />
                <span>링크 복사</span>
              </>
            )}
          </button>

          {/* QR Code */}
          <button
            onClick={() => setQrOpen(true)}
            className="py-3 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-medium text-xs sm:text-sm flex flex-col sm:flex-row items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-[0.98]"
          >
            <QrCode className="w-4 h-4 text-amber-300" />
            <span>QR 코드</span>
          </button>
        </div>

        {/* Footer Copyright */}
        <div className="pt-8 text-center text-xs text-slate-500 font-light space-y-1">
          <p className="flex items-center justify-center gap-1">
            <span>© 2026 {config.schoolName} {config.organizer}</span>
            <Heart className="w-3 h-3 text-red-400 inline" />
          </p>
          <p className="text-[11px] text-slate-600">
            과학중점고등학교 디지털 모바일 초대장
          </p>
        </div>
      </div>

      {/* QR Code Lightbox */}
      <QrCodeModal isOpen={qrOpen} onClose={() => setQrOpen(false)} url={window.location.href} />
    </section>
  );
}
