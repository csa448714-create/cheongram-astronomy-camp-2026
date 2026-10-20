import React, { useState } from 'react';
import { X, Copy, Check, RotateCcw, Eye, Save, Code, Sliders } from 'lucide-react';
import { EventConfig, ProgramItem } from '../types/event';
import { defaultEventConfig } from '../config/eventData';

interface EventConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: EventConfig;
  onUpdateConfig: (newConfig: EventConfig) => void;
}

export default function EventConfigModal({
  isOpen,
  onClose,
  config,
  onUpdateConfig
}: EventConfigModalProps) {
  const [activeTab, setActiveTab] = useState<'basic' | 'sections' | 'schedule' | 'export'>('basic');
  const [copied, setCopied] = useState(false);
  const [tempConfig, setTempConfig] = useState<EventConfig>(config);
  const [statusMsg, setStatusMsg] = useState('');

  if (!isOpen) return null;

  const handleSave = () => {
    onUpdateConfig(tempConfig);
    setStatusMsg('설정이 실시간 화면에 반영되었습니다!');
    setTimeout(() => setStatusMsg(''), 2500);
  };

  const handleReset = () => {
    setTempConfig(defaultEventConfig);
    onUpdateConfig(defaultEventConfig);
    setStatusMsg('기본 설정으로 초기화되었습니다.');
    setTimeout(() => setStatusMsg(''), 2500);
  };

  const handleCopyCode = async () => {
    const code = `// src/config/eventData.ts 에 붙여넣으시면 영구 적용됩니다.\nexport const defaultEventConfig = ${JSON.stringify(
      tempConfig,
      null,
      2
    )};`;
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  const handleAddScheduleItem = () => {
    const newItem: ProgramItem = {
      id: `step-${Date.now()}`,
      time: '20:00 ~ 20:30',
      title: '새로운 프로그램 순서',
      location: '천문고 및 운동장',
      description: '프로그램 활동 내용을 입력하세요.',
      badge: '진행'
    };
    setTempConfig({
      ...tempConfig,
      schedule: [...tempConfig.schedule, newItem]
    });
  };

  const handleRemoveScheduleItem = (id: string) => {
    setTempConfig({
      ...tempConfig,
      schedule: tempConfig.schedule.filter((item) => item.id !== id)
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-amber-300/30 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-amber-300" />
            <h3 className="text-base font-serif-kr font-bold text-amber-200">
              행사 정보 간편 편집 & 재사용 관리기
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-white"
            aria-label="편집기 닫기"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-1 p-2 bg-slate-950/80 border-b border-slate-800 text-xs overflow-x-auto">
          <button
            onClick={() => setActiveTab('basic')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
              activeTab === 'basic'
                ? 'bg-amber-400/20 text-amber-200 border border-amber-300/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            기본 정보
          </button>
          <button
            onClick={() => setActiveTab('sections')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
              activeTab === 'sections'
                ? 'bg-amber-400/20 text-amber-200 border border-amber-300/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            섹션 노출(ON/OFF)
          </button>
          <button
            onClick={() => setActiveTab('schedule')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
              activeTab === 'schedule'
                ? 'bg-amber-400/20 text-amber-200 border border-amber-300/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            프로그램 일정 ({tempConfig.schedule.length})
          </button>
          <button
            onClick={() => setActiveTab('export')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
              activeTab === 'export'
                ? 'bg-amber-400/20 text-amber-200 border border-amber-300/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            코드 내보내기
          </button>
        </div>

        {/* Body Content */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs text-slate-200 flex-1">
          {activeTab === 'basic' && (
            <div className="space-y-4">
              <div>
                <label className="block text-slate-400 mb-1">학교명</label>
                <input
                  type="text"
                  value={tempConfig.schoolName}
                  onChange={(e) => setTempConfig({ ...tempConfig, schoolName: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-100"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">행사명</label>
                <input
                  type="text"
                  value={tempConfig.eventName}
                  onChange={(e) => setTempConfig({ ...tempConfig, eventName: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-100 font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">행사 슬로건 / 부제</label>
                <input
                  type="text"
                  value={tempConfig.eventSubtitle}
                  onChange={(e) => setTempConfig({ ...tempConfig, eventSubtitle: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-100"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">행사 일자 표기</label>
                  <input
                    type="text"
                    value={tempConfig.eventDateText}
                    onChange={(e) => setTempConfig({ ...tempConfig, eventDateText: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">행사 시간 표기</label>
                  <input
                    type="text"
                    value={tempConfig.eventTimeText}
                    onChange={(e) => setTempConfig({ ...tempConfig, eventTimeText: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">우천 시 예비 일정 안내</label>
                <input
                  type="text"
                  value={tempConfig.backupDateNotice}
                  onChange={(e) => setTempConfig({ ...tempConfig, backupDateNotice: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-100"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">행사 장소</label>
                <input
                  type="text"
                  value={tempConfig.eventLocation}
                  onChange={(e) => setTempConfig({ ...tempConfig, eventLocation: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-100"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">학교 도로명 주소</label>
                <input
                  type="text"
                  value={tempConfig.eventAddress}
                  onChange={(e) => setTempConfig({ ...tempConfig, eventAddress: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-100"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">주최 및 주관 부서</label>
                <input
                  type="text"
                  value={tempConfig.organizer}
                  onChange={(e) => setTempConfig({ ...tempConfig, organizer: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-100"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">구글 폼 신청 URL</label>
                <input
                  type="text"
                  value={tempConfig.registration.formUrl}
                  onChange={(e) =>
                    setTempConfig({
                      ...tempConfig,
                      registration: { ...tempConfig.registration, formUrl: e.target.value }
                    })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-100"
                />
              </div>
            </div>
          )}

          {activeTab === 'sections' && (
            <div className="space-y-3">
              <p className="text-slate-400 mb-2">
                필요하지 않은 섹션은 스위치를 꺼서 화면에서 감출 수 있습니다.
              </p>
              {Object.entries(tempConfig.sectionVisibility).map(([key, isVisible]) => (
                <label
                  key={key}
                  className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800 cursor-pointer hover:border-slate-700"
                >
                  <span className="capitalize font-medium text-slate-200">
                    {key === 'cover' && '표지 (Cover)'}
                    {key === 'greeting' && '초대의 글 (Greeting)'}
                    {key === 'overview' && '행사 기본 정보 (Overview)'}
                    {key === 'schedule' && '프로그램 타임라인 (Schedule)'}
                    {key === 'highlights' && '주요 프로그램 소개 (Highlights)'}
                    {key === 'location' && '오시는 길 & 배치도 (Location)'}
                    {key === 'registration' && '참가 신청 구글 폼 (RSVP)'}
                    {key === 'guestbook' && '방명록 및 응원 (Guestbook)'}
                    {key === 'ending' && '마무리 및 문의처 (Ending)'}
                  </span>
                  <input
                    type="checkbox"
                    checked={isVisible}
                    onChange={(e) =>
                      setTempConfig({
                        ...tempConfig,
                        sectionVisibility: {
                          ...tempConfig.sectionVisibility,
                          [key]: e.target.checked
                        }
                      })
                    }
                    className="w-4 h-4 accent-amber-400"
                  />
                </label>
              ))}
            </div>
          )}

          {activeTab === 'schedule' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">타임라인 항목 편집</span>
                <button
                  type="button"
                  onClick={handleAddScheduleItem}
                  className="px-2.5 py-1 rounded bg-amber-400/20 text-amber-200 border border-amber-300/30 hover:bg-amber-400/30"
                >
                  + 일정 추가
                </button>
              </div>

              {tempConfig.schedule.map((item, idx) => (
                <div key={item.id} className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-amber-200">#{idx + 1} 순서</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveScheduleItem(item.id)}
                      className="text-red-400 hover:text-red-300 text-[11px]"
                    >
                      삭제
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="시간 (예: 19:00 ~ 19:30)"
                      value={item.time}
                      onChange={(e) => {
                        const updated = [...tempConfig.schedule];
                        updated[idx].time = e.target.value;
                        setTempConfig({ ...tempConfig, schedule: updated });
                      }}
                      className="px-2 py-1.5 rounded bg-slate-900 border border-slate-700"
                    />
                    <input
                      type="text"
                      placeholder="장소 (예: 시청각실)"
                      value={item.location}
                      onChange={(e) => {
                        const updated = [...tempConfig.schedule];
                        updated[idx].location = e.target.value;
                        setTempConfig({ ...tempConfig, schedule: updated });
                      }}
                      className="px-2 py-1.5 rounded bg-slate-900 border border-slate-700"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="프로그램 제목"
                    value={item.title}
                    onChange={(e) => {
                      const updated = [...tempConfig.schedule];
                      updated[idx].title = e.target.value;
                      setTempConfig({ ...tempConfig, schedule: updated });
                    }}
                    className="w-full px-2 py-1.5 rounded bg-slate-900 border border-slate-700 font-medium"
                  />
                  <input
                    type="text"
                    placeholder="간단한 설명"
                    value={item.description}
                    onChange={(e) => {
                      const updated = [...tempConfig.schedule];
                      updated[idx].description = e.target.value;
                      setTempConfig({ ...tempConfig, schedule: updated });
                    }}
                    className="w-full px-2 py-1.5 rounded bg-slate-900 border border-slate-700 text-slate-300"
                  />
                </div>
              ))}
            </div>
          )}

          {activeTab === 'export' && (
            <div className="space-y-3">
              <p className="text-slate-300">
                현재 수정한 모든 행사 설정이 포함된 코드입니다.
                클립보드에 복사하여 <code className="text-amber-200">src/config/eventData.ts</code>에 붙여넣으시면 영구히 보존됩니다.
              </p>
              <button
                onClick={handleCopyCode}
                className="w-full py-2.5 px-4 rounded-xl bg-amber-400 text-slate-950 font-bold flex items-center justify-center gap-1.5 hover:bg-amber-300 transition-colors"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? '복사 완료!' : '설정 코드 전체 복사하기'}</span>
              </button>
              <pre className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-[11px] font-mono text-slate-300 overflow-x-auto max-h-56">
                {JSON.stringify(tempConfig, null, 2)}
              </pre>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between gap-3">
          <button
            onClick={handleReset}
            className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>기본값 초기화</span>
          </button>

          <div className="flex items-center gap-2">
            {statusMsg && (
              <span className="text-xs text-emerald-400 font-medium animate-pulse">
                {statusMsg}
              </span>
            )}
            <button
              onClick={handleSave}
              className="py-2 px-4 rounded-xl bg-amber-400/20 hover:bg-amber-400/30 border border-amber-300/40 text-amber-200 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer active:scale-[0.98]"
            >
              <Save className="w-3.5 h-3.5 text-amber-300" />
              <span>화면에 즉시 적용</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
