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

export interface AgentRow {
  rank: number;
  name: string;
  initials: string;
  team: string;
  avatarBg: string;
  score: string;
  delta: string;
  deltaColor: string;
  streak: string | false;
  streakDays: number;
  badge: string | false;
  badgeColor: BadgeColor;
  isYou: boolean;
  isTarget: boolean;
  targetGapPts: string;
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
}

export function buildRows(isEng: boolean, chaseMode = true): AgentRow[] {
  const src = isEng ? ENG : QUAL;
  const youIdx = src.findIndex((r) => r[0] === 'Daniel Reyes');
  return src.map((r, i) => {
    const rank = i + 1;
    const isYou = i === youIdx;
    const isTarget = chaseMode && i === youIdx - 1;
    const gap = isTarget ? (parseFloat(src[i][4]) - parseFloat(src[youIdx][4])).toFixed(1) : '';
    const streakDays = parseInt(r[7] || '0', 10);
    const fPct = isEng ? parseFloat(r[13]) : 0;
    return {
      rank,
      name: r[0],
      initials: r[1],
      team: r[2],
      avatarBg: r[3],
      score: r[4],
      delta: r[5],
      deltaColor: r[6],
      streak: r[7] || false,
      streakDays,
      badge: r[8] || false,
      badgeColor: badgeColorFor(r[8]),
      isYou,
      isTarget,
      targetGapPts: gap ? `${gap} PTS` : '',
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
    };
  });
}
