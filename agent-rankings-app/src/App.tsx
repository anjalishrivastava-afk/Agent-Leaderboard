import { useEffect, useMemo, useState } from 'react';
import { Box, Card, CardContent, Typography } from '@exotel-npm-dev/signal-design-system';
import { buildRows } from './data';
import { RankingsTable } from './components/RankingsTable';
import { TopBar } from './components/TopBar';
import { PeriodRow } from './components/PeriodRow';
import { DimensionRow } from './components/DimensionRow';
import { Podium } from './components/Podium';
import { RankGapBanner } from './components/RankGapBanner';
import { InsightRow, LegendRow } from './components/InsightRow';
import { FormulaPanel } from './components/FormulaPanel';
import {
  EXCLUDED_COUNT,
  INITIAL_COUNTDOWN_SECONDS,
  MOST_IMPROVED,
  THRESHOLD_NOTE,
  formatCountdown,
  seasonLabel,
  type Period,
  type Role,
} from './dashboardMeta';

function SummaryCard({ label, value, hint, hintColor, highlight }: { label: string; value: string; hint: string; hintColor?: string; highlight?: boolean }) {
  return (
    <Card
      variant="outlined"
      sx={{ flex: 1, ...(highlight && { bgcolor: 'warning.50', borderColor: 'warning.100' }) }}
    >
      <CardContent sx={{ py: 1.75, px: 2 }}>
        <Typography variant="body2" sx={{ fontWeight: 600, color: highlight ? 'warning.dark' : 'text.primary' }}>
          {highlight ? '🔥 ' : ''}
          {label}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', mt: 1.25 }}>
          <Typography sx={{ fontSize: 26, fontWeight: 700, color: highlight ? 'warning.dark' : 'text.primary' }}>{value}</Typography>
          <Typography variant="caption" sx={{ color: hintColor ?? (highlight ? 'warning.dark' : 'text.secondary'), fontWeight: hintColor ? 600 : 400 }}>
            {hint}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default function App() {
  const [isEng, setIsEng] = useState(true);
  const [role, setRole] = useState<Role>('agent');
  const [period, setPeriod] = useState<Period>('monthly');
  const [showFormula, setShowFormula] = useState(false);
  const [secs, setSecs] = useState(INITIAL_COUNTDOWN_SECONDS);

  useEffect(() => {
    const id = setInterval(() => setSecs((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, []);

  const rows = useMemo(() => buildRows(isEng), [isEng]);
  const you = rows.find((r) => r.isYou)!;
  const target = rows[you.rank - 2] ?? rows[0];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 4, px: { xs: 2, md: 4 } }}>
      <Box sx={{ maxWidth: 1280, mx: 'auto' }}>
        <Card variant="outlined">
          <CardContent sx={{ p: 3 }}>
            <TopBar seasonLabel={seasonLabel(period)} role={role} onRoleChange={setRole} />
            <PeriodRow period={period} onPeriodChange={setPeriod} role={role} eventLabel={`CQA C3 - Leaderboard Viewed · ${isEng ? 'engagement' : 'quality'}`} />

            <Box sx={{ display: 'flex', gap: 1.5, mb: 2.5 }}>
              <SummaryCard label="Agents Ranked" value="10" hint={`${EXCLUDED_COUNT[isEng ? 'engagement' : 'quality']} below threshold`} />
              <SummaryCard label="Avg Composite" value="52.4" hint="↑ 1.2 vs last" hintColor="success.main" />
              <SummaryCard label="Avg QP Score" value="83.7" hint="↑ 2.1% vs last" hintColor="success.main" />
              <SummaryCard label="Active Streaks" value="6" hint="agents on a streak" highlight />
            </Box>
          </CardContent>

          <DimensionRow isEng={isEng} onChangeTab={setIsEng} countdown={formatCountdown(secs)} />

          <Podium rows={rows} />

          <Box sx={{ px: 3, pb: 2 }}>
            <RankGapBanner you={you} target={target} total={rows.length} isEng={isEng} onReplay={() => {}} />
          </Box>

          <InsightRow
            mostImproved={MOST_IMPROVED[isEng ? 'engagement' : 'quality']}
            showFormula={showFormula}
            onToggleFormula={() => setShowFormula((s) => !s)}
          />
          {showFormula && <FormulaPanel isEng={isEng} />}

          <Box sx={{ px: 3, pt: 2, pb: 3 }}>
            <RankingsTable rows={rows} isEng={isEng} />
          </Box>

          <LegendRow thresholdNote={THRESHOLD_NOTE[isEng ? 'engagement' : 'quality']} />
        </Card>
      </Box>
    </Box>
  );
}
