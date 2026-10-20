import { EventConfig } from '../types/event';
import heroImg from '../assets/images/hero_celestial_night_1792472205181.jpg';
import vangoghLectureImg from '../assets/images/program_vangogh_lecture_1792484209222.jpg';
import celestronC14Img from '../assets/images/program_celestron_c14_1792484210044.jpg';
import seestarSmartImg from '../assets/images/program_seestar_smart_1792484210479.jpg';
import moonCraterImg from '../assets/images/program_moon_crater_eyepiece_1792484211010.jpg';
import askarVixenImg from '../assets/images/program_askar_vixen_deepsky_1792484211163.jpg';
import planetariumDomeImg from '../assets/images/program_planetarium_dome_1792484211939.jpg';

/**
 * ============================================================================
 * [행사 정보 통합 설정 파일 (eventData.ts)]
 * ============================================================================
 * 향후 다른 학교 행사나 연도별 행사에 재사용하실 때,
 * 이 파일의 내용만 수정하시면 전체 초대장 웹페이지에 자동으로 반영됩니다.
 */
export const defaultEventConfig: EventConfig = {
  // 1. 기본 학교 및 행사 명칭
  schoolName: '계림고등학교',
  schoolType: '경북형 과학중점고등학교',
  eventName: '2026학년도 청람시민천문캠프',
  eventSubtitle: '별을 읽고, 우주를 만나다.',
  eventSlogan: '밤하늘 아래 펼쳐지는 계림 과학인들과 시민들의 특별한 우주 탐험',

  // 2. 행사 일시 및 장소
  eventDateText: '2026년 11월 20일 (금요일)',
  eventDateIso: '2026-11-20T18:40:00+09:00',
  eventEndTimeIso: '2026-11-20T22:00:00+09:00',
  eventTimeText: '18:40 ~ 22:00 (등록 18:40 시작 / 특강 19:00 / 폐회 22:00)',
  backupDateNotice: '※ 기상 악화 시 12월 14일(월) ~ 18일(금) 중 1일로 연기됩니다.',
  eventLocation: '계림고등학교 화랑관(강당), 운동장 및 천문고',
  eventLocationDetail: '화랑관 2층 강당(특강 및 개회) / 운동장 및 천문고(체험활동 및 천체관측)',
  eventAddress: '경상북도 경주시 용담로 122 (계림고등학교)',

  // 3. 주최, 대상, 참가비 및 안내
  organizer: '계림고등학교 과학중점부',
  targetAudience: '본교 재학생, 학부모, 교직원 및 천문우주에 관심 있는 시민 누구나',
  feeText: '전액 무료',
  suppliesNotice: '야간 야외 관측이 진행되므로 따뜻한 겉옷(방한복, 핫팩) 및 편안한 신발을 권장합니다.',

  // 4. 모바일 청첩장 스타일 초대 메시지 (본문 - 사용자 요청 줄바꿈 반영)
  invitationGreeting: [
    '밤하늘을 수놓은 수많은 별들,',
    '그 너머에는 어떤 이야기가 숨어 있을까요?',
    '',
    '과학중점학급 학생들이 직접 기획하고 운영하는',
    '2026 시민천문캠프에 여러분을 초대합니다.',
    '',
    '이번 캠프에서는 흥미로운 천문학 강연을 통해',
    '우주의 신비를 알아보고,',
    '천체망원경을 이용한 관측 활동으로',
    '밤하늘의 천체를 직접 만나보는',
    '특별한 시간을 마련했습니다.',
    '',
    '별을 향한 호기심이 과학적 탐구로 이어지고,',
    '책과 영상에서만 접하던 우주를 두 눈으로 마주하는 시간.',
    '',
    '별을 읽고, 우주를 만나다.',
    '',
    '밤하늘 아래 펼쳐지는 특별한 우주 탐험에 여러분을 초대합니다.'
  ],
  hostSignature: '계림고등학교 과학중점부 학생 및 교직원 일동',

  // 5. 행사 프로그램 세부 일정 (전면 수정 반영)
  schedule: [
    {
      id: 'step-1',
      time: '18:40 ~ 19:00',
      title: '참가자 등록 및 안내 자료 배부',
      location: '화랑관 2층 강당 입구',
      description: '참가자 명단 확인, 천문 캠프 가이드북 및 야광 팔찌·성도 배부',
      badge: '등록'
    },
    {
      id: 'step-2',
      time: '19:00 ~ 20:10',
      title: '개회식 및 천문학 특별 강연',
      location: '화랑관 2층 강당',
      description: '주제: 반 고흐 〈별이 빛나는 밤〉의 천문학적 해석 (강연자: 에스엘랩 대표 김정현)',
      badge: '특강'
    },
    {
      id: 'step-3',
      time: '20:10 ~ 20:40',
      title: '프로그램 체험 활동 (1타임)',
      location: '각 지정 체험 구역 (운동장/천문고/교실)',
      description: '사전 선택한 프로그램 참가 (30분간 진행)',
      badge: '1타임'
    },
    {
      id: 'step-4',
      time: '20:40 ~ 21:10',
      title: '프로그램 체험 활동 (2타임)',
      location: '각 지정 체험 구역 (운동장/천문고/교실)',
      description: '사전 선택한 프로그램 참가 (30분간 진행)',
      badge: '2타임'
    },
    {
      id: 'step-5',
      time: '21:10 ~ 21:50',
      title: '프로그램 체험 활동 (3타임)',
      location: '각 지정 체험 구역 (운동장/천문고/교실)',
      description: '사전 선택한 프로그램 참가 (30분간 진행)',
      badge: '3타임'
    },
    {
      id: 'step-bonus',
      time: '체험 활동 중 상시',
      title: '우주 그립톡 만들기 체험 & 간식차 이용',
      location: '화랑관 앞 야외 부스 및 간식차 존',
      description: '프로그램 간 대기 시간이나 쉬는 시간에 나만의 별자리 그립톡 만들기 및 따뜻한 간식차를 자유롭게 이용하실 수 있습니다.',
      badge: '상시운영'
    },
    {
      id: 'step-6',
      time: '21:50 ~ 22:00',
      title: '폐회 및 기념품 증정',
      location: '화랑관 2층 강당',
      description: '캠프 만족도 조사 참여 및 참가자 전원 기념품 증정',
      badge: '폐회'
    }
  ],

  // 6. 주요 프로그램 안내 (특강 및 5개 선택 프로그램 - 번들 이미지 연결)
  highlights: [
    {
      id: 'hl-special',
      title: '특강: 반고흐 별이 빛나는 밤의 천문학적 해석',
      subtitle: 'Opening Special Lecture · 강연자: 김정현 대표 (에스엘랩)',
      description: '불멸의 화가 빈센트 반 고흐가 캔버스에 담아낸 소용돌이치는 밤하늘과 별, 금성과 초승달의 실제 천문학적 배치와 우주의 신비를 밝혀내는 특별 강연입니다. (장소: 화랑관 2층 강당)',
      image: vangoghLectureImg,
      imageAlt: '반 고흐 명화와 우주 성운을 배경으로 진행되는 천문학 특별 강연'
    },
    {
      id: 'hl-prog-1',
      title: '프로그램 1: Celestron, US/C14-A XLT 천체 망원경을 이용한 천체 관측 (태양계 행성 관측)',
      subtitle: '대구경 14인치 최고급 광학 망원경 · 태양계 행성 정밀 관측 (장소: 천문고)',
      description: '계림고 천문고의 주망원경인 구경 14인치 Celestron C14-A XLT 천체 망원경을 통해 목성의 줄무늬와 4대 갈릴레이 위성, 토성의 신비로운 고리를 고배율로 감상합니다.',
      image: celestronC14Img,
      imageAlt: 'Celestron 대구경 14인치 천체 망원경 관측'
    },
    {
      id: 'hl-prog-2',
      title: '프로그램 2: SeeStar(망원경) 운용방법 및 관측',
      subtitle: '스마트 올인원 디지털 망원경 · 모바일 실시간 딥스카이 촬영 (장소: 대운동장)',
      description: '스마트폰 앱과 무선 연동되는 최신 디지털 스마트 망원경 SeeStar의 자동 위치 보정 및 촬영 기법을 배우고, 먼 우주의 성운과 은하를 실시간으로 스크린에 담아봅니다.',
      image: seestarSmartImg,
      imageAlt: 'SeeStar 스마트 망원경 운용 및 관측'
    },
    {
      id: 'hl-prog-3',
      title: '프로그램 3: 안시 망원경 조작법 학습 및 달 관측',
      subtitle: '정통 안시 관측 · 굴절 및 반사망원경 달 표면 크레이터 탐험 (장소: 대운동장)',
      description: '아이피스(접안렌즈)를 눈으로 직접 확인하는 정통 광학 망원경의 조작법을 배우고, 달의 바다와 운석 분화구의 입체적인 그림자를 선명하게 관측합니다.',
      image: moonCraterImg,
      imageAlt: '안시 망원경을 이용한 달 표면 크레이터 관측'
    },
    {
      id: 'hl-prog-4',
      title: '프로그램 4: 아스카, 빅센 망원경을 이용한 천체 관측 (성운 및 성단 촬영 및 관측)',
      subtitle: '아스카 & 빅센 정밀 망원경 · 가을·겨울철 딥스카이 보석 관측 (장소: 대운동장)',
      description: '세계적인 천체 광학 명가 아스카(Askar) 및 빅센(Vixen) 천체 망원경을 활용하여 플레이아데스 성단(M45), 페르세우스 이중성단 등 밤하늘의 보석 성단을 촬영 및 관측합니다.',
      image: askarVixenImg,
      imageAlt: '아스카와 빅센 망원경으로 성운 및 성단을 관측하는 모습'
    },
    {
      id: 'hl-prog-5',
      title: '프로그램 5: 천체 투영실 체험',
      subtitle: '플라네타륨 돔 스크린 · 360도 가상 우주 시뮬레이션 (장소: 화랑관 2층 강당)',
      description: '계림고 강당 돔 스크린 아래 누워 360도로 펼쳐지는 사계절 별자리 신화와 성간 우주의 광활함을 온몸으로 느껴보는 특별한 돔 시네마 체험입니다.',
      image: planetariumDomeImg,
      imageAlt: '천체 투영실 돔 스크린에서 펼쳐지는 가상 밤하늘 체험'
    }
  ],

  // 7. 위치 안내 및 학교 지도
  mapImage: heroImg,
  mapKakaoUrl: 'https://map.kakao.com/link/search/계림고등학교',
  mapNaverUrl: 'https://map.naver.com/p/search/계림고등학교',
  mapTmapUrl: 'https://surl.tmaps.co.kr/search?keyword=계림고등학교',
  transitGuide: [
    {
      title: '자가용 및 내비게이션',
      description: '‘계림고등학교’ 또는 ‘경주시 용담로 122’ 검색 (교내 지정 주차 구역 무료 주차 가능)'
    },
    {
      title: '대중교통 (시내버스) 이용 시',
      description: '경주 시내버스 탑승 후 ‘황성주공2차,계림고’ 정류장 하차 (도보 약 2분)'
    },
    {
      title: '캠프 당일 교내 안내',
      description: '정문 진입 후 화랑관(2층 강당)으로 먼저 오셔서 등록 및 특강에 참여하시면 됩니다. (야광 유도 표지판 및 도우미 배치)'
    }
  ],

  // 8. 참가 신청 (구글 폼 링크)
  registration: {
    enabled: true,
    buttonText: '천문캠프 참가 신청하기 (구글 폼)',
    formUrl: 'https://forms.gle/jx5E6sxpC5iwVtiQ9',
    notice: '신청 인원이 90명 초과 시 추첨을 통해 90명만 선발합니다. (원활하고 안전한 관측 장비 운영을 위해 선발 인원이 제한됩니다.)',
    periodText: '신청 기한: 11. 8(일) 자정까지',
    limitCountText: '모집 인원: 90명 (※ 신청 인원이 90명 초과 시 추첨으로 90명만 선발)'
  },

  // 9. 마무리 및 문의처
  contact: {
    department: '계림고등학교 과학중점부',
    schoolName: '계림고등학교 (Gyerim High School)',
    phone: '054-773-8933 (과학연구실)',
    email: 'csa448714@gmail.com',
    location: '경상북도 경주시 용담로 122'
  },
  closingMessage: [
    '우리가 바라보는 별빛은 수만 년의 시간을 건너 오늘 밤 우리에게 도착했습니다.',
    '깊어가는 가을밤, 반짝이는 별빛 아래서',
    '소중한 이들과 잊지 못할 우주의 추억을 만들어 가시길 바랍니다.',
    '',
    '계림의 교정에서 따뜻한 마음으로 여러분을 기다리겠습니다.'
  ],

  // 10. 섹션 가시성 제어
  sectionVisibility: {
    cover: true,
    greeting: true,
    overview: true,
    schedule: true,
    highlights: true,
    location: true,
    registration: true,
    guestbook: false, // 축하 및 기대평 삭제 요청 반영
    ending: true
  },

  // 11. 디자인 테마 컬러
  theme: {
    primaryColor: '#d4af37',
    secondaryColor: '#38bdf8',
    backgroundColor: '#050814'
  }
};
