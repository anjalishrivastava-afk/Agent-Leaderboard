export type Period = 'weekly' | 'monthly' | 'custom';
export type Role = 'agent' | 'supervisor' | 'admin';

export const PERIOD_RANGE: Record<Period, string> = {
  weekly: '28 Jul – 3 Aug',
  monthly: '1 – 31 Jul',
  custom: '12 Jun – 31 Jul',
};

export function seasonLabel(period: Period): string {
  if (period === 'weekly') return 'WEEK 31';
  if (period === 'custom') return 'CUSTOM RANGE';
  return 'SEASON 4';
}

export function periodPhrase(period: Period): string {
  if (period === 'weekly') return 'this week';
  if (period === 'custom') return 'this period';
  return 'this month';
}

export const DIMENSION_LABEL: Record<'engagement' | 'quality', string> = {
  engagement: 'Engagement composite',
  quality: 'Quality score',
};

export interface FormulaRow {
  dim: string;
  weight: string;
  def: string;
}

export const FORMULA: Record<'engagement' | 'quality', { title: string; expr: string; rows: FormulaRow[] }> = {
  engagement: {
    title: 'Engagement composite — weighted percentiles',
    expr: 'Composite = (0.30 × T_percentile) + (0.25 × D_percentile) + (0.45 × F_percentile)',
    rows: [
      { dim: 'T · Time Spent', weight: '0.30', def: 'Total session hours (sessions chart, seconds ÷ 3600)' },
      { dim: 'D · Days Active', weight: '0.25', def: 'Unique days with session time > 0' },
      { dim: 'F · Focus Ratio', weight: '0.45', def: 'Time on Analysis List / detail pages ÷ total time (capped at 1.0)' },
    ],
  },
  quality: {
    title: 'Quality score — average QP across evaluated interactions',
    expr: 'Quality = Σ(QP score of evaluated interactions) ÷ count(evaluated interactions)',
    rows: [
      { dim: 'QP score', weight: '1.00', def: 'Average quality profile score across CQA-evaluated interactions in the period' },
      { dim: 'Volume gate', weight: '—', def: 'Agents below the evaluated-interaction threshold are excluded, not penalised' },
    ],
  },
};

export const THRESHOLD_NOTE: Record<'engagement' | 'quality', string> = {
  engagement: '1 agent below the minimum threshold (< 120 session minutes this period) — not ranked',
  quality: '2 agents below the minimum threshold (< 30 evaluated interactions this period) — not ranked',
};

export const EXCLUDED_COUNT: Record<'engagement' | 'quality', string> = {
  engagement: '1 agent',
  quality: '2 agents',
};

export const MOST_IMPROVED: Record<'engagement' | 'quality', string> = {
  engagement: 'Priya Sharma climbed +3 ranks',
  quality: 'Tomás Herrera climbed +2 ranks',
};

export const COMPOSITE_LINE: Record<'engagement' | 'quality', string> = {
  engagement: 'Composite = 0.30×T + 0.25×D + 0.45×F — lift your focus ratio and you clear the gap before reset.',
  quality: 'Average QP score across evaluated interactions this period — a few strong evaluations closes it.',
};

export function formatCountdown(totalSeconds: number): string {
  const s = Math.max(0, totalSeconds);
  const h = Math.floor(s / 3600);
  const m = String(Math.floor((s % 3600) / 60)).padStart(2, '0');
  const sec = String(Math.floor(s % 60)).padStart(2, '0');
  return `${h}h ${m}m ${sec}s`;
}

export const INITIAL_COUNTDOWN_SECONDS = 11 * 3600 + 58 * 60;
