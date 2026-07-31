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

const UP_RATIOS = [0.6, 0.67, 0.73, 0.79, 0.85, 0.9, 0.95, 1.0];
const DOWN_RATIOS = [1.28, 1.22, 1.16, 1.11, 1.07, 1.04, 1.02, 1.0];
const FLAT_RATIOS = [0.94, 0.97, 1.01, 0.98, 1.03, 0.99, 1.02, 1.0];

export function historyFor(score: string, deltaColor: string): number[] {
  const s = parseFloat(score) || 0;
  const ratios = deltaColor === '#069351' ? UP_RATIOS : deltaColor === '#B81914' ? DOWN_RATIOS : FLAT_RATIOS;
  return ratios.map((r) => Math.max(0, +(s * r).toFixed(1)));
}

/**
 * Tenant-configurable minimum-activity gates. An agent below the gate for the
 * active leaderboard is flagged via `meetsThreshold: false` rather than being
 * silently dropped by the data layer — callers decide how to surface that.
 */
export interface ThresholdConfig {
  engagementMinSessionMinutes: number;
  qualityMinEvaluatedInteractions: number;
}

export const DEFAULT_THRESHOLDS: ThresholdConfig = {
  engagementMinSessionMinutes: 120,
  qualityMinEvaluatedInteractions: 30,
};

/** Rank-delta direction vs. the previous period snapshot, derived once so UI doesn't re-parse the arrow glyph. */
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

/**
 * An agent's leaderboard data, independent of sort order or the viewer.
 * `rank`, `isYou`, `isTarget` etc. are derived per-view by `sortAgents` /
 * `buildRows`, not stored here — the same Agent is ranked differently on
 * each tab and after every sort/filter.
 */
export interface Agent {
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
}

export function buildAgents(isEng: boolean, thresholds: ThresholdConfig = DEFAULT_THRESHOLDS): Agent[] {
  const src = isEng ? ENG : QUAL;
  return src.map((r) => {
    const streakDays = parseInt(r[7] || '0', 10);
    const fPct = isEng ? parseFloat(r[13]) : 0;
    const sessionMinutes = isEng ? parseHoursToMinutes(r[14]) : 0;
    const evaluatedInteractions = isEng ? 0 : parseInt(r[16] || '0', 10);
    const meetsThreshold = isEng
      ? sessionMinutes >= thresholds.engagementMinSessionMinutes
      : evaluatedInteractions >= thresholds.qualityMinEvaluatedInteractions;

    return {
      name: r[0],
      initials: r[1],
      team: r[2],
      avatarBg: r[3],
      score: r[4],
      scoreValue: parseFloat(r[4]) || 0,
      delta: r[5],
      deltaColor: r[6],
      deltaDirection: deltaDirectionFor(r[6]),
      streak: r[7] || false,
      streakDays,
      badge: r[8] || false,
      badgeColor: badgeColorFor(r[8]),
      t: isEng ? r[11] : '0%',
      d: isEng ? r[12] : '0%',
      f: isEng ? r[13] : '0%',
      fPctile: fPct ? `${Math.min(99, Math.round(fPct * 1.08))}%` : r[13] || '',
      tVal: isEng ? r[14] : '',
      dVal: isEng ? r[15] : '',
      fVal: isEng ? r[16] : '',
      interactions: isEng ? '' : r[16],
      history: historyFor(r[4], r[6]),
      showStreakBadge: streakDays >= 10,
      sessionMinutes,
      evaluatedInteractions,
      meetsThreshold,
    };
  });
}

export type SortKey = 'score' | 'name' | 't' | 'd' | 'f' | 'interactions';
export type SortDirection = 'asc' | 'desc';

function sortValueFor(agent: Agent, key: SortKey): number | string {
  switch (key) {
    case 'score':
      return agent.scoreValue;
    case 'name':
      return agent.name.toLowerCase();
    case 't':
      return agent.sessionMinutes;
    case 'd':
      return parseFloat(agent.dVal) || 0;
    case 'f':
      return parseFloat(agent.fVal) || 0;
    case 'interactions':
      return agent.evaluatedInteractions;
    default:
      return agent.scoreValue;
  }
}

/**
 * Sorts by `key`/`direction` with a fully deterministic tie-break (name, then
 * original list position) so equal-value rows never flicker between renders,
 * then assigns `rank` as the agent's 1..N position in *this* sorted view.
 * Below-threshold agents are not excluded here (see DEFAULT_THRESHOLDS doc) —
 * they sort in normally and carry `meetsThreshold: false` for the caller to
 * grey out, footnote, or filter as the UI section requires.
 */
export interface RankedAgent extends Agent {
  rank: number;
}

export function sortAgents(agents: Agent[], key: SortKey, direction: SortDirection): RankedAgent[] {
  const withIndex = agents.map((agent, originalIndex) => ({ agent, originalIndex }));
  const dir = direction === 'asc' ? 1 : -1;

  withIndex.sort((a, b) => {
    const av = sortValueFor(a.agent, key);
    const bv = sortValueFor(b.agent, key);
    if (av !== bv) return av < bv ? -dir : dir;
    const nameCmp = a.agent.name.localeCompare(b.agent.name);
    if (nameCmp !== 0) return nameCmp;
    return a.originalIndex - b.originalIndex;
  });

  return withIndex.map(({ agent }, i) => ({ ...agent, rank: i + 1 }));
}

export function filterBySearch(agents: Agent[], query: string): Agent[] {
  const q = query.trim().toLowerCase();
  if (!q) return agents;
  return agents.filter((a) => a.name.toLowerCase().includes(q) || a.team.toLowerCase().includes(q));
}

/**
 * @deprecated compatibility shim over buildAgents/sortAgents for components
 * not yet migrated to the sort-driven model. Preserves the exact shape/order
 * the old fixed-array-order data layer produced (score desc, "you" fixed to
 * Daniel Reyes) so existing UI keeps working unchanged during the migration.
 */
export interface AgentRow extends RankedAgent {
  isYou: boolean;
  isTarget: boolean;
  targetGapPts: string;
}

export function buildRows(isEng: boolean, chaseMode = true): AgentRow[] {
  const ranked = sortAgents(buildAgents(isEng), 'score', 'desc');
  const youIdx = ranked.findIndex((r) => r.name === 'Daniel Reyes');
  return ranked.map((r, i) => {
    const isYou = i === youIdx;
    const isTarget = chaseMode && i === youIdx - 1;
    const gap = isTarget ? (ranked[i].scoreValue - ranked[youIdx].scoreValue).toFixed(1) : '';
    return {
      ...r,
      isYou,
      isTarget,
      targetGapPts: gap ? `${gap} PTS` : '',
    };
  });
}
