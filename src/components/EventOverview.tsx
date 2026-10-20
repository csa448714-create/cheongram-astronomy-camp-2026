import { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Users, Award, CalendarPlus, Check, CloudRain } from 'lucide-react';
import { EventConfig } from '../types/event';

interface EventOverviewProps {
  config: EventConfig;
}

export default function EventOverview({ config }: EventOverviewProps) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isPast: boolean;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: false });

  const [calendarAdded, setCalendarAdded] = useState(false);

  useEffect(() => {
    const calculateTime = () => {
      const targetTime = new Date(config.eventDateIso).getTime();
      const now = new Date().getTime();
      const diff = targetTime - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds, isPast: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [config.eventDateIso]);

  // Generate .ics calendar download
  const handleAddToCalendar = () => {
    const title = `${config.schoolName} ${config.eventName}`;
    const description = `${config.eventSubtitle}\\n${config.organizer}\\n${config.eventLocationDetail}`;
    const location = config.eventAddress;
    const start = '20261120T094000Z'; // UTC equivalent for 2026-11-20 18:40 KST (+9)
    const end = '20261120T130000Z'; // UTC equivalent for 2026-11-20 22:00 KST (+9)

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Gyerim High School//Astronomy Camp//KO',
      'CALSCALE:GREGORIAN',
      'BEGIN:VEVENT',
      `SUMMARY:${title}`,
      `DESCRIPTION:${description}`,
      `LOCATION:${location}`,
      `DTSTART:${start}`,
      `DTEND:${end}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', '2026_청람시민천문캠프.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setCalendarAdded(true);
    setTimeout(() => setCalendarAdded(false), 3000);
  };

  // Google Calendar URL
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    `${config.schoolName} ${config.eventName}`
  )}&dates=20261120T094000Z/20261120T130000Z&details=${encodeURIComponent(
    `${config.eventSubtitle}\n${config.organizer}\n${config.backupDateNotice}`
  )}&location=${encodeURIComponent(config.eventAddress)}`;

  return (
    <section id="overview" className="relative py-16 px-6 sm:px-10 flex flex-col items-center">
      {/* Decorative Section Tag */}
      <div className="flex items-center gap-3 mb-4">
        <span className="w-8 h-[1px] bg-gradient-to-r from-transparent to-amber-300/60" />
        <span className="text-amber-300/80 text-xs tracking-[0.3em] font-cinzel uppercase">
          INFORMATION
        </span>
        <span className="w-8 h-[1px] bg-gradient-to-l from-transparent to-amber-300/60" />
      </div>

      <h2 className="text-2xl sm:text-3xl font-serif-kr font-bold text-slate-100 mb-8 tracking-wide text-center">
        행사 안내
      </h2>

      {/* Main Information Card */}
      <div className="w-full max-w-xl mx-auto rounded-2xl bg-slate-900/40 backdrop-blur-md border border-amber-300/20 p-6 sm:p-8 shadow-xl shadow-black/50 space-y-6">
        {/* D-Day Countdown Strip */}
        <div className="rounded-xl bg-slate-950/60 border border-amber-300/15 p-4 text-center">
          <p className="text-xs text-amber-200/80 font-serif-kr tracking-wider mb-2">
            청람 밤하늘이 열리기까지
          </p>
          {timeLeft.isPast ? (
            <p className="text-base text-amber-200 font-serif-kr font-medium">
              행사가 진행 중이거나 성황리에 종료되었습니다.
            </p>
          ) : (
            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-cinzel font-bold text-amber-100 tabular-nums">
                  {timeLeft.days}
                </span>
                <span className="text-[10px] text-slate-400 font-cinzel uppercase tracking-wider">
                  DAYS
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-cinzel font-bold text-amber-100 tabular-nums">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span className="text-[10px] text-slate-400 font-cinzel uppercase tracking-wider">
                  HOURS
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-cinzel font-bold text-amber-100 tabular-nums">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span className="text-[10px] text-slate-400 font-cinzel uppercase tracking-wider">
                  MINS
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-cinzel font-bold text-amber-200 tabular-nums">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
                <span className="text-[10px] text-slate-400 font-cinzel uppercase tracking-wider">
                  SECS
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Key Event Details with spacious dividing lines */}
        <div className="text-left">
          {/* 1. Date */}
          <div className="flex items-start gap-4 py-2">
            <div className="w-10 h-10 rounded-full bg-amber-400/10 border border-amber-300/20 flex items-center justify-center shrink-0 mt-0.5">
              <Calendar className="w-5 h-5 text-amber-300" />
            </div>
            <div className="space-y-1.5 flex-1">
              <p className="text-xs text-amber-300/80 font-medium tracking-wide">행사 일시</p>
              <p className="text-[15px] sm:text-base font-serif-kr font-bold text-slate-100">
                {config.eventDateText}
              </p>
              <p className="text-[13.5px] text-slate-200/90 font-serif-kr flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-300/70" />
                <span>{config.eventTimeText}</span>
              </p>
              {/* Rainy day notice */}
              <div className="mt-2.5 text-xs text-amber-200/90 bg-amber-950/30 border border-amber-400/20 rounded-lg p-2.5 flex items-start gap-2">
                <CloudRain className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                <span>{config.backupDateNotice}</span>
              </div>
            </div>
          </div>

          {/* Divider 1 with breathing room */}
          <div className="my-5 w-full h-[1px] bg-slate-800/80" />

          {/* 2. Location */}
          <div className="flex items-start gap-4 py-2">
            <div className="w-10 h-10 rounded-full bg-amber-400/10 border border-amber-300/20 flex items-center justify-center shrink-0 mt-0.5">
              <MapPin className="w-5 h-5 text-amber-300" />
            </div>
            <div className="space-y-1.5 flex-1">
              <p className="text-xs text-amber-300/80 font-medium tracking-wide">행사 장소</p>
              <p className="text-[15px] sm:text-base font-serif-kr font-bold text-slate-100">
                {config.eventLocation}
              </p>
              <p className="text-[13.5px] text-slate-200/90 font-serif-kr leading-relaxed">
                {config.eventLocationDetail}
              </p>
              <p className="text-xs text-slate-400 font-light pt-0.5">
                {config.eventAddress}
              </p>
            </div>
          </div>

          {/* Divider 2 with breathing room */}
          <div className="my-5 w-full h-[1px] bg-slate-800/80" />

          {/* 3. Organizer */}
          <div className="flex items-start gap-4 py-2">
            <div className="w-10 h-10 rounded-full bg-amber-400/10 border border-amber-300/20 flex items-center justify-center shrink-0 mt-0.5">
              <Award className="w-5 h-5 text-amber-300" />
            </div>
            <div className="space-y-1.5 flex-1">
              <p className="text-xs text-amber-300/80 font-medium tracking-wide">주최 및 주관</p>
              <p className="text-[14.5px] sm:text-base font-serif-kr text-slate-100 font-semibold">
                {config.organizer}
              </p>
            </div>
          </div>

          {/* Divider 3 with breathing room */}
          <div className="my-5 w-full h-[1px] bg-slate-800/80" />

          {/* 4. Target Audience & Fee */}
          <div className="flex items-start gap-4 py-2">
            <div className="w-10 h-10 rounded-full bg-amber-400/10 border border-amber-300/20 flex items-center justify-center shrink-0 mt-0.5">
              <Users className="w-5 h-5 text-amber-300" />
            </div>
            <div className="space-y-1.5 flex-1">
              <p className="text-xs text-amber-300/80 font-medium tracking-wide">참가 대상 및 비용</p>
              <p className="text-[13.5px] text-slate-200/90 font-serif-kr leading-relaxed">
                {config.targetAudience}
              </p>
              <p className="text-xs text-amber-200 font-medium pt-0.5">
                참가비: {config.feeText}
              </p>
            </div>
          </div>
        </div>

        {/* Add to Calendar Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
          <button
            onClick={handleAddToCalendar}
            className="flex-1 py-3 px-4 rounded-xl bg-amber-400/15 hover:bg-amber-400/25 border border-amber-300/30 text-amber-200 hover:text-amber-100 text-xs sm:text-sm font-medium flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
          >
            {calendarAdded ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>일정 파일 저장 완료 (.ics)</span>
              </>
            ) : (
              <>
                <CalendarPlus className="w-4 h-4 text-amber-300" />
                <span>휴대폰 캘린더에 일정 저장</span>
              </>
            )}
          </button>

          <a
            href={googleCalendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="py-3 px-4 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200 hover:text-white text-xs sm:text-sm font-medium flex items-center justify-center gap-2 transition-all text-center"
          >
            Google 캘린더 등록
          </a>
        </div>
      </div>
    </section>
  );
}
