import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// CORS configuration to allow requests from GitHub Pages and external origins
// Mounted before body parsers so OPTIONS preflights return immediately
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else {
    res.setHeader('Access-Control-Allow-Origin', '*');
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept');
  res.setHeader('Access-Control-Max-Age', '86400');
  res.setHeader('Vary', 'Origin');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }
  next();
});

// Explicit wildcard OPTIONS handler
app.options('*', (_req, res) => {
  res.status(204).end();
});

// Body parser
app.use(express.json());

// Simple in-memory rate limiter (per IP) to prevent brute force lookups
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 20;

function rateLimiter(req: Request, res: Response, next: () => void) {
  const ip = req.ip || req.socket.remoteAddress || 'unknown';
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return next();
  }

  if (entry.count >= MAX_REQUESTS_PER_WINDOW) {
    return res.status(429).json({
      status: 'error',
      message: '조회 요청이 너무 많습니다. 1분 후 다시 시도해 주세요.',
    });
  }

  entry.count += 1;
  next();
}

/**
 * Clean up old rate limit entries periodically
 */
setInterval(() => {
  const now = Date.now();
  for (const [key, val] of rateLimitMap.entries()) {
    if (now > val.resetTime) {
      rateLimitMap.delete(key);
    }
  }
}, 60 * 1000);

/**
 * Virtual Mock Allocations for Development & Testing
 * (Simulating rows 4~33 of Google Sheet '선발자 프로그램 배정시트', H column and C, D, E columns)
 */
interface TeamAllocation {
  last4: string;
  slot1: string;
  slot2: string;
  slot3: string;
}

const MOCK_ALLOCATIONS: TeamAllocation[] = [
  // 1. Test case: Leading zero '0037' (Single match)
  {
    last4: '0037',
    slot1: '프로그램 1: Celestron 천체 관측 (태양계 행성)',
    slot2: '프로그램 2: SeeStar(망원경) 운용방법 및 관측',
    slot3: '프로그램 5: 천체 투영실 체험',
  },
  // 2. Test case: Standard single match '1234'
  {
    last4: '1234',
    slot1: '프로그램 3: 안시 망원경 조작법 학습 및 달 관측',
    slot2: '프로그램 4: 아스카, 빅센 망원경을 이용한 천체 관측 (성운·성단)',
    slot3: '프로그램 1: Celestron 천체 관측 (태양계 행성)',
  },
  // 3. Test case: Standard single match '7788'
  {
    last4: '7788',
    slot1: '프로그램 5: 천체 투영실 체험',
    slot2: '프로그램 1: Celestron 천체 관측 (태양계 행성)',
    slot3: '프로그램 2: SeeStar(망원경) 운용방법 및 관측',
  },
  // 4. Test case: Duplicate match '5678' (Two different teams registered with same last 4 digits)
  {
    last4: '5678',
    slot1: '프로그램 1: Celestron 천체 관측 (태양계 행성)',
    slot2: '프로그램 3: 안시 망원경 조작법 학습 및 달 관측',
    slot3: '프로그램 5: 천체 투영실 체험',
  },
  {
    last4: '5678',
    slot1: '프로그램 2: SeeStar(망원경) 운용방법 및 관측',
    slot2: '프로그램 4: 아스카, 빅센 망원경을 이용한 천체 관측 (성운·성단)',
    slot3: '프로그램 1: Celestron 천체 관측 (태양계 행성)',
  },
  // Additional mock teams representing the 30 teams (rows 4~33)
  {
    last4: '2049',
    slot1: '프로그램 4: 아스카, 빅센 망원경을 이용한 천체 관측 (성운·성단)',
    slot2: '프로그램 5: 천체 투영실 체험',
    slot3: '프로그램 3: 안시 망원경 조작법 학습 및 달 관측',
  },
  {
    last4: '3141',
    slot1: '프로그램 2: SeeStar(망원경) 운용방법 및 관측',
    slot2: '프로그램 1: Celestron 천체 관측 (태양계 행성)',
    slot3: '프로그램 4: 아스카, 빅센 망원경을 이용한 천체 관측 (성운·성단)',
  },
];

const DEFAULT_GOOGLE_SHEET_CSV_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vS-Ve9IZzHLKqfhPEkB-S3cJgVQkmmFqOAXqxVF9UnwQezvsLpECKDfRo9CON-5qdC_PPCbIbdVUZXh/pub?gid=1072044315&single=true&output=csv';

let sheetCache: { data: TeamAllocation[]; timestamp: number } | null = null;
const CACHE_TTL_MS = 30 * 1000; // 30 seconds cache

function parseCsvLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

/**
 * Fetch and parse rows 4~33 from Google Sheets '선발자 프로그램 배정시트'
 */
async function fetchFromGoogleSheet(targetLast4: string): Promise<TeamAllocation[] | null> {
  const sheetUrl = process.env.GOOGLE_SHEET_CSV_URL || DEFAULT_GOOGLE_SHEET_CSV_URL;
  if (!sheetUrl) {
    return null;
  }

  try {
    const now = Date.now();
    let teams: TeamAllocation[];

    if (sheetCache && now - sheetCache.timestamp < CACHE_TTL_MS) {
      teams = sheetCache.data;
    } else {
      const res = await fetch(sheetUrl, { redirect: 'follow' });
      if (!res.ok) {
        throw new Error(`Failed to fetch Google Sheet: ${res.statusText}`);
      }
      const csvText = await res.text();
      const lines = csvText.split(/\r?\n/);

      // Rows 4~33 corresponds to 0-indexed index 3 through 32
      teams = [];
      const maxRow = Math.min(lines.length, 33);

      for (let r = 3; r < maxRow; r++) {
        const line = lines[r];
        if (!line || !line.trim()) continue;
        const cols = parseCsvLine(line).map((c) => c.replace(/^["']|["']$/g, ''));

        // Col H is index 7 (휴대폰 번호 뒤 4자리)
        // Col C is index 2 (1타임)
        // Col D is index 3 (2타임)
        // Col E is index 4 (3타임)
        const rowLast4 = cols[7]?.replace(/[^0-9]/g, '').padStart(4, '0').slice(-4);
        if (rowLast4 && rowLast4.length === 4) {
          teams.push({
            last4: rowLast4,
            slot1: cols[2] || '',
            slot2: cols[3] || '',
            slot3: cols[4] || '',
          });
        }
      }

      sheetCache = { data: teams, timestamp: now };
    }

    return teams.filter((t) => t.last4 === targetLast4);
  } catch (err) {
    console.error('Error fetching from Google Sheet:', err);
    return null;
  }
}

/**
 * POST /api/lookup
 * Expects JSON: { last4: string }
 *
 * Requirements:
 * - Must validate 4 digits strictly (/^\d{4}$/)
 * - Do NOT log the last 4 digits to console or URLs
 * - Single match: returns status 'matched', slot1, slot2, slot3, and openChatUrl
 * - Duplicate match: returns status 'duplicate', message
 * - No match: returns status 'not_found', message
 * - Error: returns status 'error', message
 */
app.post('/api/lookup', rateLimiter, async (req: Request, res: Response) => {
  try {
    const { last4 } = req.body;

    // Validate 4 digits strictly
    if (typeof last4 !== 'string' || !/^\d{4}$/.test(last4)) {
      return res.status(400).json({
        status: 'error',
        message: '휴대폰 번호 뒤 4자리(숫자 4자)를 올바르게 입력해 주세요.',
      });
    }

    // Test case simulation: '0000' triggers a simulated server error for client error handling test
    if (last4 === '0000') {
      return res.status(500).json({
        status: 'error',
        message: '잠시 후 다시 시도해 주세요.',
      });
    }

    // Try live Google Sheet if configured, otherwise use mock dataset
    let matchedTeams: TeamAllocation[] | null = await fetchFromGoogleSheet(last4);

    if (matchedTeams === null) {
      // Use virtual mock dataset
      matchedTeams = MOCK_ALLOCATIONS.filter((t) => t.last4 === last4);
    }

    // Check matches
    if (matchedTeams.length === 0) {
      return res.json({
        status: 'not_found',
        message: '2026 계림 청람시민천문캠프에 관심을 가져주시고 신청해 주셔서 진심으로 감사합니다. 한정된 인원으로 운영되는 행사인 만큼, 아쉽게도 이번 캠프 참가자로 선정되지 않으셨습니다. 기대하며 신청해 주신 만큼 아쉬움이 크실 텐데, 이번에 함께하지 못하게 되어 저희도 아쉽습니다. 보내주신 관심에 다시 한번 감사드리며, 다음 행사에서 뵐 수 있기를 바랍니다.',
      });
    }

    if (matchedTeams.length > 1) {
      return res.json({
        status: 'duplicate',
        message: '같은 번호로 등록된 팀이 있습니다. 행사 담당자에게 문의해 주세요.',
      });
    }

    // Exactly one matching team!
    const singleMatch = matchedTeams[0];
    const openChatUrl = process.env.OPEN_CHAT_URL || 'https://open.kakao.com/o/gXRuqlWi';

    return res.json({
      status: 'matched',
      assignments: {
        slot1: singleMatch.slot1,
        slot2: singleMatch.slot2,
        slot3: singleMatch.slot3,
      },
      openChatUrl: openChatUrl.trim() ? openChatUrl.trim() : null,
    });
  } catch (error) {
    console.error('Lookup internal error occurred');
    return res.status(500).json({
      status: 'error',
      message: '잠시 후 다시 시도해 주세요.',
    });
  }
});

/**
 * Health check endpoint
 */
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    environment: process.env.NODE_ENV || 'development',
    openChatConfigured: Boolean(process.env.OPEN_CHAT_URL || 'https://open.kakao.com/o/gXRuqlWi'),
  });
});

/**
 * Mount Vite middlewares in development or serve static assets in production
 */
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

startServer();
