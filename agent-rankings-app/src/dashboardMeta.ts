export type Period = 'weekly' | 'monthly' | 'custom';
export type Role = 'agent' | 'supervisor' | 'admin';

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

export function thresholdNote(isEng: boolean, excludedCount: number): string {
  const gate = isEng ? '120 session minutes' : '30 evaluated interactions';
  if (excludedCount === 0) return `All agents meet the minimum threshold (< ${gate} this period)`;
  const agents = excludedCount === 1 ? 'agent' : 'agents';
  return `${excludedCount} ${agents} below the minimum threshold (< ${gate} this period) — not ranked`;
}

export const SUMMARY_CARD_DESCRIPTIONS = {
  agentsRanked: 'Agents meeting the activity threshold',
  avgComposite: 'Mean composite score across ranked agents',
  avgQuality: 'Mean QP score across evaluated interactions',
  activeStreaks: 'Agents with a 2+ day active streak',
};

export function formatCountdownShort(totalSeconds: number): string {
  const s = Math.max(0, totalSeconds);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  return `${h}h ${m}m`;
}

export const INITIAL_COUNTDOWN_SECONDS = 11 * 3600 + 58 * 60;
