import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  X,
  Search,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Clock,
  MapPin,
  ExternalLink,
  MessageCircle,
  RefreshCw,
  Phone,
  Info,
  Server
} from 'lucide-react';

interface ResultLookupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface LookupSuccessResult {
  status: 'matched';
  assignments: {
    slot1: string;
    slot2: string;
    slot3: string;
  };
  openChatUrl: string | null;
}

interface LookupDuplicateResult {
  status: 'duplicate';
  message: string;
}

interface LookupNotFoundResult {
  status: 'not_found';
  message: string;
}

interface LookupErrorResult {
  status: 'error';
  message: string;
}

interface LookupConfigErrorResult {
  status: 'config_error';
  message: string;
  detail?: string;
}

type LookupResponse =
  | LookupSuccessResult
  | LookupDuplicateResult
  | LookupNotFoundResult
  | LookupErrorResult
  | LookupConfigErrorResult;

/**
 * Resolves verified program time and location based on the confirmed event schedule
 */
function resolveProgramMeta(slotIndex: 1 | 2 | 3, programName: string) {
  // Confirmed time slots from official event schedule
  const timeSlots: Record<number, string> = {
    1: '20:00 ~ 20:25 (25분간)',
    2: '20:35 ~ 21:00 (25분간)',
    3: '21:10 ~ 21:35 (25분간)',
  };

  const time = timeSlots[slotIndex];

  // Match confirmed locations from the campus blueprint and program highlights
  let location: string | null = null;
  const lower = programName.toLowerCase();

  if (lower.includes('celestron') || lower.includes('c14') || lower.includes('행성') || lower.includes('천문고')) {
    location = '천문고 (교내 천문대)';
  } else if (lower.includes('seestar') || lower.includes('스마트')) {
    location = '대운동장 (야외 관측 구역)';
  } else if (lower.includes('안시') || lower.includes('달') || lower.includes('크레이터')) {
    location = '대운동장 (야외 관측 구역)';
  } else if (lower.includes('아스카') || lower.includes('빅센') || lower.includes('성운') || lower.includes('성단')) {
    location = '대운동장 (야외 관측 구역)';
  } else if (lower.includes('투영') || lower.includes('플라네타륨') || lower.includes('돔')) {
    location = '화랑관 2층 강당 (실내 돔)';
  } else if (lower.includes('특강') || lower.includes('반고흐') || lower.includes('별 볼일') || lower.includes('배준석')) {
    location = '화랑관 2층 강당';
  }

  return { time, location };
}

export default function ResultLookupModal({ isOpen, onClose }: ResultLookupModalProps) {
  const [last4, setLast4] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<LookupResponse | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Reset state when modal is opened or closed
  useEffect(() => {
    if (isOpen) {
      setLast4('');
      setResult(null);
      setIsLoading(false);
      document.body.style.overflow = 'hidden';

      // Focus input on open
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    } else {
      document.body.style.overflow = '';
      setLast4('');
      setResult(null);
      setIsLoading(false);
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

  // Handle number keypad input: preserve leading zeros, max 4 digits only
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9]/g, '').slice(0, 4);
    setLast4(val);
    // Reset previous search results when user modifies digits
    if (result) {
      setResult(null);
    }
  };

  const handleLookup = async (targetDigits?: string) => {
    const queryDigits = (targetDigits !== undefined ? targetDigits : last4).trim();
    if (!/^\d{4}$/.test(queryDigits)) return;

    setIsLoading(true);
    setResult(null);

    const apiBase = (import.meta.env.VITE_API_BASE_URL || '').trim().replace(/\/$/, '');
    const isBrowser = typeof window !== 'undefined';
    const hostname = isBrowser ? window.location.hostname : '';
    const isGitHubPages = hostname.endsWith('github.io');
    const isLocalOrDevServer = hostname === 'localhost' || hostname === '127.0.0.1' || hostname.endsWith('.run.app');

    // Differentiate configuration error: GitHub Pages has no co-located backend server.
    // If VITE_API_BASE_URL is missing on GitHub Pages, provide explicit admin setup guidance.
    if (isGitHubPages && !apiBase) {
      setResult({
        status: 'config_error',
        message: '조회 서버 주소(VITE_API_BASE_URL)가 설정되지 않았습니다.',
        detail: 'GitHub Pages 정적 사이트에서 배정 조회를 운영하려면 별도로 배포된 백엔드 API 주소가 필요합니다. GitHub 저장소의 Settings > Secrets and variables > Actions에 VITE_API_BASE_URL을 등록한 뒤 Actions 워크플로를 재실행해 주세요.',
      });
      setIsLoading(false);
      return;
    }

    try {
      const targetUrl = apiBase ? `${apiBase}/api/lookup` : '/api/lookup';
      const response = await fetch(targetUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ last4: queryDigits }),
      });

      const contentType = response.headers.get('content-type') || '';

      if (!response.ok || !contentType.includes('application/json')) {
        // Detect static host 404/405 or HTML fallback when backend is absent
        if (response.status === 404 || response.status === 405 || contentType.includes('text/html')) {
          if (!apiBase && (isGitHubPages || !isLocalOrDevServer)) {
            setResult({
              status: 'config_error',
              message: '조회 서버 주소(VITE_API_BASE_URL) 설정이 필요합니다 (404/405).',
              detail: '정적 웹사이트 호스팅에서는 배정 조회 서버로의 연결 URL이 빌드 시 주입되어야 합니다.',
            });
            setIsLoading(false);
            return;
          }
        }

        if (response.status === 429) {
          setResult({
            status: 'error',
            message: '조회 요청이 너무 많습니다. 1분 후 다시 시도해 주세요.',
          });
          setIsLoading(false);
          return;
        }

        if (contentType.includes('application/json')) {
          try {
            const errData = await response.json();
            setResult({
              status: 'error',
              message: errData.message || '잠시 후 다시 시도해 주세요.',
            });
            setIsLoading(false);
            return;
          } catch {
            // fallback
          }
        }

        setResult({
          status: 'error',
          message: '잠시 후 다시 시도해 주세요.',
        });
        setIsLoading(false);
        return;
      }

      const data: LookupResponse = await response.json();
      setResult(data);
    } catch (err) {
      console.error('Lookup request error:', err);
      if (!apiBase && (isGitHubPages || !isLocalOrDevServer)) {
        setResult({
          status: 'config_error',
          message: '조회 서버 주소(VITE_API_BASE_URL)가 설정되지 않았습니다.',
          detail: 'GitHub Pages에서 조회가 동작하려면 백엔드 서버 주소를 GitHub Actions 환경변수(VITE_API_BASE_URL)로 등록해 주셔야 합니다.',
        });
      } else {
        setResult({
          status: 'error',
          message: '일시적인 연결 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.',
        });
      }
    } finally {
      setIsLoading(false);
    }
  };


  const handleResetSearch = () => {
    setLast4('');
    setResult(null);
    inputRef.current?.focus();
  };

  const modalContent = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-[#070b19] border border-amber-300/30 rounded-2xl shadow-2xl shadow-black overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="lookup-modal-title"
      >
        {/* Header Strip with Celestial Starlight Accent */}
        <div className="relative p-5 pb-4 border-b border-amber-300/15 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-slate-900/90 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-amber-400/10 border border-amber-300/30 flex items-center justify-center text-amber-200">
              <Sparkles className="w-4 h-4 text-amber-300" />
            </div>
            <div>
              <h2
                id="lookup-modal-title"
                className="text-base sm:text-lg font-serif-kr font-bold text-amber-200 tracking-wide"
              >
                선정 결과 및 프로그램 확인
              </h2>
              <p className="text-[11px] text-slate-400">
                2026학년도 청람시민천문캠프
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer"
            aria-label="닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-5 sm:p-6 space-y-6 overflow-y-auto">
          {/* Section 1: Phone Last 4 Digits Input */}
          <div className="space-y-3">
            <label className="block text-xs sm:text-sm text-slate-200 font-medium text-center">
              신청할 때 등록한 휴대폰 번호 뒤 4자리를 입력해 주세요.
            </label>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleLookup();
              }}
              className="flex flex-col sm:flex-row items-center gap-2 max-w-sm mx-auto"
            >
              <div className="relative w-full">
                <input
                  ref={inputRef}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={4}
                  value={last4}
                  onChange={handleInputChange}
                  placeholder="예: 0037"
                  className="w-full text-center tracking-[0.5em] text-xl font-mono font-bold py-3 px-4 rounded-xl bg-slate-950/80 border border-amber-300/30 text-amber-100 placeholder:text-slate-600 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
                  aria-label="휴대폰 번호 뒤 4자리"
                />
                {last4 && (
                  <button
                    type="button"
                    onClick={handleResetSearch}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-200 transition-colors"
                    title="초기화"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <button
                type="submit"
                disabled={last4.length !== 4 || isLoading}
                className="w-full sm:w-auto py-3 px-6 rounded-xl bg-amber-400 hover:bg-amber-300 disabled:bg-slate-800 disabled:text-slate-500 disabled:border-slate-700 text-slate-950 font-bold text-sm shrink-0 flex items-center justify-center gap-2 border border-amber-300/40 transition-all cursor-pointer disabled:cursor-not-allowed active:scale-[0.98]"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>조회 중...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    <span>결과 확인</span>
                  </>
                )}
              </button>
            </form>

            <p className="text-[11px] text-slate-400 text-center font-light">
              ※ 대표자 이름이나 신청 순번 없이, 등록하신 휴대폰 번호 뒤 4자리로만 조회됩니다.
            </p>
          </div>

          {/* Section 2: Results Display */}
          {result && (
            <div className="pt-2 animate-in fade-in zoom-in-95 duration-200">
              {/* CASE 1: Single Match -> Success */}
              {result.status === 'matched' && (
                <div className="space-y-4">
                  {/* Congratulations Banner */}
                  <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/20 via-amber-400/10 to-amber-500/20 border border-amber-400/40 text-center space-y-1">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-200 text-xs font-semibold">
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      <span>선정 안내</span>
                    </div>
                    <h3 className="text-base sm:text-lg font-serif-kr font-bold text-amber-200">
                      참가 대상으로 선정되셨습니다!
                    </h3>
                    <p className="text-xs text-slate-300 font-light">
                      2026 청람시민천문캠프에 오신 것을 진심으로 환영합니다.
                    </p>
                  </div>

                  {/* Joint Lecture Note */}
                  <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 flex items-start gap-2.5 text-left">
                    <Info className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                    <div className="text-xs text-slate-300 space-y-0.5">
                      <p className="font-semibold text-slate-200">
                        19:00 ~ 19:50 천문학 특별 강연 (19:50~20:00 휴식 및 이동)
                      </p>
                      <p className="text-[11px] text-slate-400">
                        모든 선정팀은 화랑관 2층 강당에서 특강(별 볼일 있는 하루)에 함께 참여하며, 19:50부터 휴식(간식차/그립톡) 후 20:00에 1타임 배정 프로그램이 시작됩니다.
                      </p>
                    </div>
                  </div>

                  {/* 1, 2, 3 Time Slot Assigned Cards */}
                  <div className="space-y-2.5">
                    <p className="text-xs text-amber-200 font-serif-kr font-semibold flex items-center gap-1.5">
                      <span>✦</span>
                      <span>나의 타임별 체험 프로그램 배정표</span>
                    </p>

                    {/* Slot 1 */}
                    <SlotCard
                      slotNumber={1}
                      programName={result.assignments.slot1}
                    />

                    {/* Slot 2 */}
                    <SlotCard
                      slotNumber={2}
                      programName={result.assignments.slot2}
                    />

                    {/* Slot 3 */}
                    <SlotCard
                      slotNumber={3}
                      programName={result.assignments.slot3}
                    />
                  </div>

                  {/* SECTION: 행사 변경 사항 및 주차 안내 (1~3타임 배정 결과 바로 아래 / 오픈채팅 버튼 바로 위) */}
                  <div className="pt-2 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-serif-kr font-bold text-amber-200 tracking-wide">
                      <span>✦</span>
                      <span>행사 변경 사항 및 주차 안내</span>
                    </div>

                    {/* 1. 🚗 주차 안내 카드 */}
                    <div className="p-4 rounded-xl bg-slate-900/85 border border-amber-300/25 shadow-sm text-left space-y-2">
                      <div className="flex items-center gap-2 text-xs font-serif-kr font-bold text-amber-300">
                        <span className="text-sm">🚗</span>
                        <span>주차 안내</span>
                      </div>
                      <p className="text-xs text-slate-200 leading-relaxed font-normal">
                        교내 주차 공간이 협소하여 학교 안에 주차하기 어렵습니다. 개인 차량으로 오시는 분은{' '}
                        <strong className="text-amber-200 font-bold bg-amber-400/10 px-1 py-0.5 rounded border border-amber-300/30">
                          황성동 유림공용주차장
                        </strong>{' '}
                        또는{' '}
                        <strong className="text-amber-200 font-bold bg-amber-400/10 px-1 py-0.5 rounded border border-amber-300/30">
                          경주실내체육관 입구 인근 공영주차장
                        </strong>
                        을 이용해 주세요.
                      </p>
                    </div>

                    {/* 2. 🎤 특강 변경 안내 카드 */}
                    <div className="p-4 rounded-xl bg-slate-900/85 border border-amber-300/25 shadow-sm text-left space-y-2.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs font-serif-kr font-bold text-amber-300">
                          <span className="text-sm">🎤</span>
                          <span>특강 변경 안내</span>
                        </div>
                        <span className="text-[10px] font-sans px-2 py-0.5 rounded bg-amber-400/15 text-amber-200 border border-amber-300/30">
                          강연 안내
                        </span>
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed">
                        천문학 특강의 주제와 강연자가 아래와 같이 변경되었습니다.
                      </p>

                      <div className="p-3 rounded-lg bg-slate-950/70 border border-amber-300/20 space-y-1.5 text-xs">
                        <div className="flex items-start gap-2">
                          <span className="text-amber-300 font-bold shrink-0">• 강연 주제 :</span>
                          <span className="text-amber-100 font-bold font-serif-kr">별 볼일 있는 하루</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-amber-300 font-bold shrink-0">• 강연자 :</span>
                          <span className="text-slate-200 font-medium">배준석 선생님(포항고등학교)</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Open Chat Button (Only when single match and URL configured) */}
                  {result.openChatUrl && (
                    <div className="pt-2 space-y-2">
                      <a
                        href={result.openChatUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3.5 px-4 rounded-xl bg-[#FEE500] hover:bg-[#FADA0A] text-[#191919] font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-400/10 transition-all transform active:scale-[0.98] cursor-pointer"
                      >
                        <MessageCircle className="w-4 h-4 fill-current" />
                        <span>행사 안내 오픈채팅 입장</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <p className="text-[11px] text-slate-400 text-center font-light leading-relaxed">
                        ※ 행사 당일 기상 상황 및 실시간 관측 순서 등 긴급 공지가 카카오톡 오픈채팅을 통해 안내됩니다.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* CASE 2: No Match / Not Selected */}
              {result.status === 'not_found' && (
                <div className="p-5 sm:p-6 rounded-xl bg-slate-900/90 border border-amber-400/30 text-center space-y-3.5 shadow-lg">
                  <div className="w-10 h-10 mx-auto rounded-full bg-amber-400/10 border border-amber-300/25 flex items-center justify-center text-amber-300">
                    <AlertCircle className="w-5 h-5" />
                  </div>
                  <h4 className="text-base sm:text-lg font-serif-kr font-bold text-amber-300 tracking-wide">
                    선정 결과를 확인할 수 없습니다.
                  </h4>
                  <div className="space-y-2.5 text-xs text-slate-100 font-light leading-relaxed pt-1 text-left sm:text-center max-w-md mx-auto">
                    <p>
                      2026 계림 청람시민천문캠프에 관심을 가져주시고 신청해 주셔서 진심으로 감사합니다.
                    </p>
                    <p>
                      한정된 인원으로 운영되는 행사인 만큼, 아쉽게도 이번 캠프 참가자로 선정되지 않으셨습니다. 기대하며 신청해 주신 만큼 아쉬움이 크실 텐데, 이번에 함께하지 못하게 되어 저희도 아쉽습니다.
                    </p>
                    <p>
                      보내주신 관심에 다시 한번 감사드리며, 다음 행사에서 뵐 수 있기를 바랍니다.
                    </p>
                  </div>
                </div>
              )}

              {/* CASE 3: Duplicate Match */}
              {result.status === 'duplicate' && (
                <div className="p-4 sm:p-5 rounded-xl bg-slate-900/90 border border-amber-400/30 text-center space-y-3">
                  <div className="w-10 h-10 mx-auto rounded-full bg-amber-400/10 border border-amber-300/30 flex items-center justify-center text-amber-300">
                    <HelpCircle className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm sm:text-base font-serif-kr font-semibold text-amber-200">
                    동일 번호 등록 팀 확인
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed max-w-sm mx-auto">
                    {result.message}
                  </p>
                  <div className="pt-1 flex items-center justify-center gap-2 text-xs text-amber-300 font-medium">
                    <Phone className="w-3.5 h-3.5" />
                    <a
                      href="tel:0547738933"
                      className="hover:underline underline-offset-2"
                    >
                      문의: 054-773-8933 (과학연구실)
                    </a>
                  </div>
                </div>
              )}

              {/* CASE 4: Server / Network Error */}
              {result.status === 'error' && (
                <div className="p-4 sm:p-5 rounded-xl bg-slate-900/90 border border-red-500/30 text-center space-y-2">
                  <div className="w-10 h-10 mx-auto rounded-full bg-red-500/10 border border-red-400/30 flex items-center justify-center text-red-300">
                    <AlertCircle className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm sm:text-base font-serif-kr font-semibold text-red-200">
                    일시적인 연결 오류
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {result.message}
                  </p>
                  <button
                    onClick={() => handleLookup()}
                    className="mt-2 py-1.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>다시 시도</span>
                  </button>
                </div>
              )}

              {/* CASE 5: Configuration Error (Missing VITE_API_BASE_URL on Static Host) */}
              {result.status === 'config_error' && (
                <div className="p-4 sm:p-5 rounded-xl bg-amber-950/40 border border-amber-500/40 text-center space-y-3">
                  <div className="w-10 h-10 mx-auto rounded-full bg-amber-500/15 border border-amber-400/30 flex items-center justify-center text-amber-300">
                    <Server className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm sm:text-base font-serif-kr font-bold text-amber-200">
                      운영 서버 주소 설정 안내
                    </h4>
                    <p className="text-xs text-amber-300 font-medium">
                      {result.message}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-black/40 border border-amber-400/20 text-left text-[11px] text-slate-300 space-y-2 leading-relaxed">
                    <p className="text-amber-200/90 font-medium">
                      {result.detail || 'GitHub Pages 정적 사이트에서 배정 조회를 정상 운영하려면 별도로 배포된 백엔드 API 주소가 필요합니다.'}
                    </p>
                    <div className="pt-1 border-t border-amber-400/10 space-y-1 text-slate-400 font-mono text-[10px]">
                      <p>1. 백엔드(server.ts) 배포 (Render, Cloud Run 등)</p>
                      <p>2. GitHub 저장소 Settings → Secrets and variables → Actions</p>
                      <p>3. Repository Variable/Secret에 VITE_API_BASE_URL 등록</p>
                    </div>
                  </div>
                  <div className="pt-1 flex items-center justify-center gap-2 text-xs text-amber-300">
                    <Phone className="w-3.5 h-3.5" />
                    <a href="tel:0547738933" className="hover:underline">
                      문의: 054-773-8933 (과학연구실)
                    </a>
                  </div>
                </div>
              )}
            </div>
          )}


        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-950/80 border-t border-slate-800 text-center">
          <button
            onClick={onClose}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 text-xs font-medium transition-colors cursor-pointer"
          >
            창 닫기
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}

/**
 * Individual Program Slot Card with verified time and location
 */
function SlotCard({
  slotNumber,
  programName,
}: {
  slotNumber: 1 | 2 | 3;
  programName: string;
}) {
  const meta = resolveProgramMeta(slotNumber, programName);

  return (
    <div className="p-3.5 rounded-xl bg-slate-900/80 border border-amber-300/20 hover:border-amber-300/40 transition-colors text-left space-y-1.5 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="px-2 py-0.5 rounded-md bg-amber-400/20 border border-amber-300/30 text-amber-200 text-[11px] font-bold">
          {slotNumber}타임 배정
        </span>

        {/* Verified time tag */}
        {meta.time && (
          <span className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
            <Clock className="w-3 h-3 text-amber-300/70" />
            <span>{meta.time}</span>
          </span>
        )}
      </div>

      <p className="text-sm font-serif-kr font-bold text-slate-100 leading-snug">
        {programName || '배정 프로그램 확인 중'}
      </p>

      {/* Verified location tag - only show if verified information exists */}
      {meta.location && (
        <div className="flex items-center gap-1.5 text-xs text-amber-300/90 pt-0.5">
          <MapPin className="w-3.5 h-3.5 shrink-0 text-amber-300" />
          <span className="font-medium">{meta.location}</span>
        </div>
      )}
    </div>
  );
}
