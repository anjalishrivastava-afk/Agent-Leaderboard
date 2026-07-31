export type RawRow = [
  name: string,
  initials: string,
  team: string,
  avatarBg: string,
  score: string,
  delta: string,
  deltaColor: string,
  streak: string,
  badge: string,
  badgeBg: string,
  badgeFg: string,
  t: string,
  d: string,
  f: string,
  tVal: string,
  dVal: string,
  fVal: string,
];

// r[11..13] (legacy hand-authored T/D/F percentages) are no longer read —
// percentiles are computed live from r[14..16] (raw hours/days/focus-ratio).
// r[4] is the raw baseline value: composite (engagement) is computed from
// T/D/F percentiles, not read from here; avg QP (quality) IS read from here
// directly, since quality ranks agents by their raw average QP score.
export const ENG: RawRow[] = [
  ['Priya Sharma', 'PS', 'Enterprise', '#069954', '95.1', '↑ 3 rank', '#069351', '12d', 'TOP 10%', '#FFF4CE', '#4B3400', '92%', '88%', '76%', '41h', '26d', '0.86'],
  ['Aisha Okonkwo', 'AO', 'Enterprise', '#2163F1', '90.7', '—', '#9E9E9E', '8d', 'FOCUS CHAMP', '#E3EDFD', '#1C4BB8', '84%', '80%', '72%', '37h', '24d', '0.91'],
  ['Marcus Webb', 'MW', 'SMB', '#EF6C00', '76.4', '↑ 1 rank', '#069351', '5d', '', '', '', '70%', '66%', '58%', '31h', '21d', '0.74'],
  ['Sophie Müller', 'SM', 'APAC', '#9E9E9E', '65.9', '↓ 2 rank', '#B81914', '', '', '', '', '62%', '58%', '52%', '27h', '18d', '0.66'],
  ['Daniel Reyes', 'DR', 'SMB', '#161B30', '56.6', '↑ 2 rank', '#069351', '3d', 'MOST IMPROVED', '#D8DDF3', '#243375', '54%', '50%', '44%', '23h', '16d', '0.58'],
  ['Irina Volkov', 'IV', 'APAC', '#6476CE', '43.3', '↑ 1 rank', '#069351', '4d', 'COMEBACK KID', '#FBE7F1', '#A01050', '42%', '38%', '34%', '18h', '13d', '0.47'],
  ['Kwame Asante', 'KA', 'Enterprise', '#9E9E9E', '34.1', '↓ 1 rank', '#B81914', '', '', '', '', '34%', '30%', '26%', '14h', '11d', '0.39'],
  ['Tomás Herrera', 'TH', 'SMB', '#9E9E9E', '26.9', '—', '#9E9E9E', '2d', '', '', '', '26%', '24%', '20%', '11h', '9d', '0.31'],
  ['Fatima Al-Rashid', 'FA', 'Enterprise', '#9E9E9E', '11.0', '↓ 3 rank', '#B81914', '', '', '', '', '12%', '10%', '9%', '5h', '4d', '0.18'],
  ['Lena Bergström', 'LB', 'APAC', '#9E9E9E', '0.0', '↓ 1 rank', '#B81914', '', '', '', '', '2%', '2%', '2%', '1h', '1d', '0.05'],
];

export const QUAL: RawRow[] = [
  ['Aisha Okonkwo', 'AO', 'Enterprise', '#2163F1', '94.2', '↑ 1 rank', '#069351', '8d', 'QUALITY LEADER', '#E3EDFD', '#1C4BB8', '', '', '', '', '', '128'] as unknown as RawRow,
  ['Priya Sharma', 'PS', 'Enterprise', '#069954', '92.8', '↓ 1 rank', '#B81914', '12d', 'TOP 10%', '#FFF4CE', '#4B3400', '', '', '', '', '', '141'] as unknown as RawRow,
  ['Tomás Herrera', 'TH', 'SMB', '#EF6C00', '89.6', '↑ 2 rank', '#069351', '2d', 'CONSISTENT', '#E8F7F0', '#069351', '', '', '', '', '', '96'] as unknown as RawRow,
  ['Daniel Reyes', 'DR', 'SMB', '#161B30', '87.1', '↑ 1 rank', '#069351', '3d', '', '', '', '', '', '', '', '', '84'] as unknown as RawRow,
  ['Sophie Müller', 'SM', 'APAC', '#9E9E9E', '86.4', '↓ 2 rank', '#B81914', '', '', '', '', '', '', '', '', '', '112'] as unknown as RawRow,
  ['Kwame Asante', 'KA', 'Enterprise', '#9E9E9E', '83.9', '—', '#9E9E9E', '', '', '', '', '', '', '', '', '', '74'] as unknown as RawRow,
  ['Irina Volkov', 'IV', 'APAC', '#6476CE', '81.2', '↑ 1 rank', '#069351', '4d', 'COMEBACK KID', '#FBE7F1', '#A01050', '', '', '', '', '', '68'] as unknown as RawRow,
  ['Marcus Webb', 'MW', 'SMB', '#9E9E9E', '78.5', '↓ 3 rank', '#B81914', '5d', '', '', '', '', '', '', '', '', '91'] as unknown as RawRow,
  ['Fatima Al-Rashid', 'FA', 'Enterprise', '#9E9E9E', '74.6', '↓ 1 rank', '#B81914', '', '', '', '', '', '', '', '', '', '52'] as unknown as RawRow,
  ['Lena Bergström', 'LB', 'APAC', '#9E9E9E', '71.3', '↑ 2 rank', '#069351', '', '', '', '', '', '', '', '', '', '46'] as unknown as RawRow,
];

export type BadgeColor = 'primary' | 'secondary' | 'success' | 'warning' | 'info';

const BADGE_COLORS: Record<string, BadgeColor> = {
  'TOP 10%': 'warning',
  'FOCUS CHAMP': 'info',
  'MOST IMPROVED': 'primary',
  'COMEBACK KID': 'secondary',
  'QUALITY LEADER': 'info',
  CONSISTENT: 'success',
};

function badgeColorFor(badge: string): BadgeColor {
  return BADGE_COLORS[badge] ?? 'primary';
}

// Each agent's existing trend classification (rising/falling/flat, already
// authored per-agent via deltaColor) doubles as the source of period
// variation: weekly/custom pull a different week's ratio from the SAME
// 8-week trend shape used for the score-history chart, so switching period
// genuinely reorders agents (risers shrink less than fallers, etc.) instead
// of uniformly rescaling everyone (which would leave percentiles/ranks
// untouched).
const UP_RATIOS = [0.6, 0.67, 0.73, 0.79, 0.85, 0.9, 0.95, 1.0];
const DOWN_RATIOS = [1.28, 1.22, 1.16, 1.11, 1.07, 1.04, 1.02, 1.0];
const FLAT_RATIOS = [0.94, 0.97, 1.01, 0.98, 1.03, 0.99, 1.02, 1.0];

function trendRatios(deltaColor: string): number[] {
  if (deltaColor === '#069351') return UP_RATIOS;
  if (deltaColor === '#B81914') return DOWN_RATIOS;
  return FLAT_RATIOS;
}

export function historyFor(latestScore: number, deltaColor: string): number[] {
  const ratios = trendRatios(deltaColor);
  const scaleToLatest = latestScore / (ratios[ratios.length - 1] || 1);
  return ratios.map((r) => Math.max(0, +(r * scaleToLatest).toFixed(1)));
}

export type Period = 'weekly' | 'monthly' | 'custom';

// monthly = index 7 = 1.0 for every trend shape (identity scale, the
// baseline fixture values); weekly/custom pull an earlier point on the same
// per-agent trend curve.
const PERIOD_RATIO_INDEX: Record<Period, number> = { monthly: 7, weekly: 3, custom: 1 };

function periodScale(deltaColor: string, period: Period): number {
  return trendRatios(deltaColor)[PERIOD_RATIO_INDEX[period]];
}

/**
 * Tenant-configurable minimum-activity gates. Agents below the gate are
 * excluded from the ranked list entirely (see rankAgents) — not just
 * flagged — per "avoid misleading positions" in the requirements.
 */
export interface ThresholdConfig {
  engagementMinSessionMinutes: number;
  qualityMinEvaluatedInteractions: number;
}

export const DEFAULT_THRESHOLDS: ThresholdConfig = {
  engagementMinSessionMinutes: 120,
  qualityMinEvaluatedInteractions: 30,
};

/** Rank-delta direction vs. the previous period snapshot. */
export type DeltaDirection = 'up' | 'down' | 'flat';

function deltaDirectionFor(deltaColor: string): DeltaDirection {
  if (deltaColor === '#069351') return 'up';
  if (deltaColor === '#B81914') return 'down';
  return 'flat';
}

function parseHoursToMinutes(val: string): number {
  const hours = parseFloat(val);
  return Number.isFinite(hours) ? Math.round(hours * 60) : 0;
}

/** Ties-aware percentile of `value` within `pool` (0 = worst, 100 = best). */
function percentileOf(value: number, pool: number[]): number {
  if (pool.length <= 1) return 100;
  const below = pool.filter((v) => v < value).length;
  const equal = pool.filter((v) => v === value).length;
  return Math.round(((below + (equal - 1) / 2) / (pool.length - 1)) * 100);
}

export interface AgentRow {
  rank: number;
  name: string;
  initials: string;
  team: string;
  avatarBg: string;
  score: string;
  scoreValue: number;
  delta: string;
  deltaColor: string;
  deltaDirection: DeltaDirection;
  streak: string | false;
  streakDays: number;
  badge: string | false;
  badgeColor: BadgeColor;
  t: string;
  d: string;
  f: string;
  fPctile: string;
  tVal: string;
  dVal: string;
  fVal: string;
  interactions: string;
  history: number[];
  showStreakBadge: boolean;
  sessionMinutes: number;
  evaluatedInteractions: number;
  meetsThreshold: boolean;
  isYou: boolean;
  isTarget: boolean;
  targetGapPts: string;
}

export interface RankAgentsOptions {
  period: Period;
  team?: string;
  thresholds?: ThresholdConfig;
  viewerName?: string;
}

export interface RankAgentsResult {
  rows: AgentRow[];
  excludedCount: number;
  totalCount: number;
}

/**
 * The single source of ranked leaderboard data: applies period scaling,
 * computes engagement composite (0.30T+0.25D+0.45F percentiles) or quality
 * score (raw avg QP) live, excludes below-threshold agents from the ranked
 * list, then filters to `team` and assigns rank 1..N within that view.
 */
export function rankAgents(isEng: boolean, opts: RankAgentsOptions): RankAgentsResult {
  const { period, team = 'All', thresholds = DEFAULT_THRESHOLDS, viewerName = 'Daniel Reyes' } = opts;
  const src = isEng ? ENG : QUAL;

  const base = src.map((r) => {
    const deltaColor = r[6];
    const scale = periodScale(deltaColor, period);
    const streakDays = parseInt(r[7] || '0', 10);

    const sessionMinutes = isEng ? Math.round(parseHoursToMinutes(r[14]) * scale) : 0;
    const activeDays = isEng ? Math.round((parseInt(r[15], 10) || 0) * scale) : 0;
    const focusRatioRaw = isEng ? Math.min(1, (parseFloat(r[16]) || 0) * scale) : 0;
    const evaluatedInteractions = isEng ? 0 : Math.round((parseInt(r[16], 10) || 0) * scale);
    const avgQPRaw = isEng ? 0 : Math.min(100, (parseFloat(r[4]) || 0) * scale);

    const meetsThreshold = isEng
      ? sessionMinutes >= thresholds.engagementMinSessionMinutes
      : evaluatedInteractions >= thresholds.qualityMinEvaluatedInteractions;

    return {
      name: r[0],
      initials: r[1],
      team: r[2],
      avatarBg: r[3],
      delta: r[5],
      deltaColor,
      deltaDirection: deltaDirectionFor(deltaColor),
      streak: (r[7] || false) as string | false,
      streakDays,
      badge: (r[8] || false) as string | false,
      badgeColor: badgeColorFor(r[8]),
      sessionMinutes,
      activeDays,
      focusRatioRaw,
      evaluatedInteractions,
      avgQPRaw,
      meetsThreshold,
      showStreakBadge: streakDays >= 10,
    };
  });

  const eligible = base.filter((a) => a.meetsThreshold);
  const excludedCount = base.length - eligible.length;

  const tPool = eligible.map((a) => a.sessionMinutes);
  const dPool = eligible.map((a) => a.activeDays);
  const fPool = eligible.map((a) => a.focusRatioRaw);

  const scored = eligible.map((a) => {
    if (isEng) {
      const tPct = percentileOf(a.sessionMinutes, tPool);
      const dPct = percentileOf(a.activeDays, dPool);
      const fPct = percentileOf(a.focusRatioRaw, fPool);
      const composite = 0.3 * tPct + 0.25 * dPct + 0.45 * fPct;
      return {
        ...a,
        scoreValue: +composite.toFixed(1),
        score: composite.toFixed(1),
        t: `${tPct}%`,
        d: `${dPct}%`,
        f: `${fPct}%`,
        fPctile: `${Math.min(99, fPct)}%`,
        tVal: `${Math.round(a.sessionMinutes / 60)}h`,
        dVal: `${a.activeDays}d`,
        fVal: a.focusRatioRaw.toFixed(2),
        interactions: '',
      };
    }
    const qp = +a.avgQPRaw.toFixed(1);
    return {
      ...a,
      scoreValue: qp,
      score: qp.toFixed(1),
      t: '0%',
      d: '0%',
      f: '0%',
      fPctile: '0%',
      tVal: '',
      dVal: '',
      fVal: '',
      interactions: String(a.evaluatedInteractions),
    };
  });

  const filtered = team === 'All' ? scored : scored.filter((a) => a.team === team);

  const ranked = [...filtered].sort((a, b) => {
    if (b.scoreValue !== a.scoreValue) return b.scoreValue - a.scoreValue;
    return a.name.localeCompare(b.name);
  });

  const youIdx = ranked.findIndex((r) => r.name === viewerName);

  const rows: AgentRow[] = ranked.map((r, i) => {
    const isYou = i === youIdx;
    const isTarget = youIdx > 0 && i === youIdx - 1;
    const gap = isTarget ? (ranked[i].scoreValue - ranked[youIdx].scoreValue).toFixed(1) : '';
    return {
      ...r,
      rank: i + 1,
      history: historyFor(r.scoreValue, r.deltaColor),
      isYou,
      isTarget,
      targetGapPts: gap ? `${gap} PTS` : '',
    };
  });

  return { rows, excludedCount, totalCount: base.length };
}

export function filterBySearch(rows: AgentRow[], query: string): AgentRow[] {
  const q = query.trim().toLowerCase();
  if (!q) return rows;
  return rows.filter((r) => r.name.toLowerCase().includes(q) || r.team.toLowerCase().includes(q));
}

/** Numeric rank-position climb parsed from `delta` (e.g. "↑ 3 rank" -> 3), 0 if not rising. */
export function deltaMagnitude(row: AgentRow): number {
  if (row.deltaDirection !== 'up') return 0;
  const match = row.delta.match(/\d+/);
  return match ? parseInt(match[0], 10) : 0;
}

/** The biggest riser in `rows` (current view), or null if nobody rose. */
export function mostImprovedIn(rows: AgentRow[]): AgentRow | null {
  let best: AgentRow | null = null;
  let bestMag = 0;
  for (const row of rows) {
    const mag = deltaMagnitude(row);
    if (mag > bestMag) {
      best = row;
      bestMag = mag;
    }
  }
  return best;
}
