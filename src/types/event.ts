export interface ProgramItem {
  id: string;
  time: string;
  title: string;
  location: string;
  description: string;
  badge?: string;
}

export interface HighlightItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  imageAlt: string;
}

export interface ContactInfo {
  department: string;
  schoolName: string;
  phone: string;
  email: string;
  location: string;
}

export interface GuestbookEntry {
  id: string;
  name: string;
  role: string; // e.g. 학부모, 학생, 동문, 시민, 교직원
  message: string;
  createdAt: string;
}

export interface EventConfig {
  // 기본 행사 정보
  schoolName: string;
  schoolType: string;
  eventName: string;
  eventSubtitle: string;
  eventSlogan: string;
  
  // 일시 및 장소
  eventDateText: string;
  eventDateIso: string; // YYYY-MM-DDTHH:mm:ss for D-day calculation & calendar
  eventEndTimeIso: string;
  eventTimeText: string;
  backupDateNotice: string;
  eventLocation: string;
  eventLocationDetail: string;
  eventAddress: string;
  
  // 주최 및 안내
  organizer: string;
  targetAudience: string;
  feeText: string;
  suppliesNotice: string;

  // 초대 메시지 전문
  invitationGreeting: string[];
  hostSignature: string;

  // 프로그램 및 하이라이트
  schedule: ProgramItem[];
  highlights: HighlightItem[];

  // 위치 및 지도 안내
  mapImage: string;
  mapKakaoUrl: string;
  mapNaverUrl: string;
  mapTmapUrl: string;
  transitGuide: {
    title: string;
    description: string;
  }[];

  // 참가 신청 (구글 폼 등)
  registration: {
    enabled: boolean;
    buttonText: string;
    formUrl: string;
    notice: string;
    periodText: string;
    limitCountText: string;
  };

  // 문의 및 마무리
  contact: ContactInfo;
  closingMessage: string[];

  // 섹션 표시 여부 (추후 다른 행사 재사용 시 온/오프 가능)
  sectionVisibility: {
    cover: boolean;
    greeting: boolean;
    overview: boolean;
    schedule: boolean;
    highlights: boolean;
    location: boolean;
    registration: boolean;
    guestbook: boolean;
    ending: boolean;
  };

  // 테마 설정
  theme: {
    primaryColor: string; // gold accent
    secondaryColor: string;
    backgroundColor: string;
  };
}
