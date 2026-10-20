interface SchoolCampusSvgProps {
  className?: string;
  isInteractive?: boolean;
}

export default function SchoolCampusSvg({ className = 'w-full h-auto', isInteractive = false }: SchoolCampusSvgProps) {
  return (
    <svg
      viewBox="0 0 600 450"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="계림고등학교 천문캠프 교내 관측 구역 배치도"
    >
      {/* Outer boundary */}
      <rect x="10" y="10" width="580" height="430" rx="12" fill="#0b1021" stroke="#1e293b" strokeWidth="2" />

      {/* Main Road at bottom (용담로 122) */}
      <rect x="10" y="390" width="580" height="50" fill="#0f172a" />
      <line x1="20" y1="415" x2="580" y2="415" stroke="#334155" strokeDasharray="8 6" strokeWidth="2" />
      <text x="210" y="420" textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="bold">
        용담로 122 (도로)
      </text>

      {/* 정문 진입로 (오른쪽에 치우쳐 위치) */}
      <rect x="420" y="375" width="130" height="30" rx="4" fill="#d97706" fillOpacity="0.35" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="485" y="395" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">
        ▲ 정문 진입로 (우측)
      </text>

      {/* 1. 천문고 (Celestron C14 관측 - 간식차 존 위에 위치) */}
      <rect x="35" y="35" width="215" height="82" rx="8" fill="#1e1b4b" stroke="#38bdf8" strokeWidth="2" />
      <circle cx="142" cy="65" r="18" fill="#0c4a6e" stroke="#7dd3fc" strokeWidth="1.5" />
      <line x1="142" y1="47" x2="142" y2="83" stroke="#e0f2fe" strokeWidth="1.5" />
      <text x="142" y="93" textAnchor="middle" fill="#38bdf8" fontSize="12" fontWeight="bold">
        천문고 (Celestron C14 관측 ★)
      </text>
      <text x="142" y="107" textAnchor="middle" fill="#bae6fd" fontSize="9">
        [프로그램 1] US/C14-A XLT 행성 정밀 관측
      </text>

      {/* 2. 야외 간식차 존 (천문고 바로 아래에 위치) */}
      <rect x="35" y="124" width="215" height="44" rx="7" fill="#0369a1" fillOpacity="0.4" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="4 3" />
      <text x="142" y="143" textAnchor="middle" fill="#7dd3fc" fontSize="11.5" fontWeight="bold">
        야외 간식차 존
      </text>
      <text x="142" y="158" textAnchor="middle" fill="#bae6fd" fontSize="9">
        (프로그램 대기 시간 중 따뜻한 간식 이용)
      </text>

      {/* 3. 화랑관 (2층 강당 - 등록, 특강, 천체투영실, 그립톡 체험존) */}
      <rect x="35" y="176" width="215" height="138" rx="8" fill="#1e293b" stroke="#d4af37" strokeWidth="2" />
      <text x="142" y="197" textAnchor="middle" fill="#f8fafc" fontSize="13" fontWeight="bold">
        화 랑 관 [2층 강당] ★
      </text>
      
      {/* 강당 내부 배정 프로그램들 */}
      <rect x="45" y="206" width="195" height="100" rx="6" fill="#854d0e" fillOpacity="0.45" stroke="#facc15" strokeWidth="1" />
      <text x="142" y="224" textAnchor="middle" fill="#fef08a" fontSize="10" fontWeight="bold">
        • 등록 & 개회식 & 반고흐 특강
      </text>
      <text x="142" y="244" textAnchor="middle" fill="#fef9c3" fontSize="9.5">
        • [프로그램 5] 천체투영실 체험 (강당)
      </text>
      <text x="142" y="264" textAnchor="middle" fill="#fef9c3" fontSize="9.5">
        • 나만의 우주 그립톡 체험존 (강당)
      </text>
      <text x="142" y="284" textAnchor="middle" fill="#fde047" fontSize="9.5">
        • 21:50 폐회 및 전원 기념품 증정
      </text>

      {/* 4. 교내 지정 주차 구역 (P) - 화랑관 바로 아래 위치 */}
      <rect x="35" y="322" width="215" height="48" rx="7" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
      <circle cx="58" cy="346" r="12" fill="#0284c7" fillOpacity="0.5" stroke="#38bdf8" strokeWidth="1.5" />
      <text x="58" y="350" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">
        P
      </text>
      <text x="145" y="342" textAnchor="middle" fill="#7dd3fc" fontSize="11" fontWeight="bold">
        교내 지정 주차 구역 (P)
      </text>
      <text x="145" y="358" textAnchor="middle" fill="#94a3b8" fontSize="9">
        (화랑관 아래 전용 주차 공간 · 무료)
      </text>

      {/* 5. 학교 본관 (대운동장 위에 위치) */}
      <rect x="265" y="35" width="295" height="82" rx="8" fill="#1e293b" stroke="#64748b" strokeWidth="1.5" />
      <text x="412" y="72" textAnchor="middle" fill="#f1f5f9" fontSize="13.5" fontWeight="bold">
        학 교 본 관 (교무실 / 행정실)
      </text>
      <text x="412" y="93" textAnchor="middle" fill="#94a3b8" fontSize="10.5">
        (※ 대운동장 위쪽에 위치)
      </text>

      {/* 6. 대운동장 (학교 본관 아래 위치 - SeeStar, 안시, 아스카, 빅센 집중 배치) */}
      <rect x="265" y="124" width="295" height="246" rx="12" fill="#064e3b" fillOpacity="0.35" stroke="#10b981" strokeWidth="2" strokeDasharray="6 4" />
      <text x="412" y="153" textAnchor="middle" fill="#6ee7b7" fontSize="15" fontWeight="bold">
        대 운 동 장 (천체관측존 ★)
      </text>
      
      {/* 대운동장 세부 관측 장비들 */}
      <rect x="278" y="168" width="269" height="188" rx="8" fill="#064e3b" fillOpacity="0.65" stroke="#34d399" strokeWidth="1" />
      <text x="412" y="198" textAnchor="middle" fill="#d1fae5" fontSize="11" fontWeight="bold">
        • [프로그램 2] SeeStar 스마트 망원경 관측
      </text>
      <text x="412" y="228" textAnchor="middle" fill="#d1fae5" fontSize="11" fontWeight="bold">
        • [프로그램 3] 안시 망원경 달 관측
      </text>
      <text x="412" y="258" textAnchor="middle" fill="#d1fae5" fontSize="11" fontWeight="bold">
        • [프로그램 4] 아스카, 빅센 망원경 성운·성단 관측
      </text>
      <text x="412" y="294" textAnchor="middle" fill="#a7f3d0" fontSize="10">
        (천체망원경 야외 관측 부스 집중 배치)
      </text>
      <text x="412" y="318" textAnchor="middle" fill="#6ee7b7" fontSize="9.5">
        가을·겨울철 딥스카이 성운·성단 및 달·행성 실시간 관측
      </text>

      {/* North indicator */}
      <g transform="translate(560, 30)">
        <circle cx="0" cy="0" r="13" fill="#1e293b" stroke="#d4af37" strokeWidth="1" />
        <path d="M 0 -8 L 3.5 5 L 0 2.5 L -3.5 5 Z" fill="#d4af37" />
        <text x="0" y="16" textAnchor="middle" fill="#d4af37" fontSize="7.5" fontWeight="bold">
          N
        </text>
      </g>
    </svg>
  );
}
