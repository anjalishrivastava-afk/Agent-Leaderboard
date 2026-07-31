import { useEffect, useMemo, useState } from 'react';
import { Box, Card, CardContent, Typography } from '@exotel-npm-dev/signal-design-system';
import { buildRows } from './data';
import { RankingsTable } from './components/RankingsTable';
import { Header } from './components/Header';
import { DimensionRow } from './components/DimensionRow';
import { Podium } from './components/Podium';
import { MostImprovedCard } from './components/MostImprovedCard';
import { YourRankCard } from './components/YourRankCard';
import { InsightRow, LegendRow } from './components/InsightRow';
import { FormulaPanel } from './components/FormulaPanel';
import {
  EXCLUDED_COUNT,
  INITIAL_COUNTDOWN_SECONDS,
  MOST_IMPROVED,
  MOST_IMPROVED_INFO,
  SUMMARY_CARD_DESCRIPTIONS,
  THRESHOLD_NOTE,
  formatCountdownShort,
  type Period,
  type Role,
} from './dashboardMeta';

function SummaryCard({
  label,
  description,
  value,
  hint,
  hintColor,
  highlight,
}: {
  label: string;
  description: string;
  value: string;
  hint: string;
  hintColor?: string;
  highlight?: boolean;
}) {
  return (
    <Card variant="outlined" sx={{ flex: 1, ...(highlight && { bgcolor: 'warning.50', borderColor: 'warning.100' }) }}>
      <CardContent sx={{ py: 1.75, px: 2 }}>
        <Typography variant="body2" sx={{ fontWeight: 600, color: highlight ? 'warning.dark' : 'text.primary' }}>
          {highlight ? '🔥 ' : ''}
          {label}
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
          {description}
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
  const dimensionKey = isEng ? 'engagement' : 'quality';
  const mostImprovedInfo = MOST_IMPROVED_INFO[dimensionKey];
  const mostImprovedAgent = rows.find((r) => r.name === mostImprovedInfo.name) ?? rows[0];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 4, px: { xs: 2, md: 4 } }}>
      <Box sx={{ maxWidth: 1280, mx: 'auto' }}>
        <Card variant="outlined">
          <CardContent sx={{ p: 3 }}>
            <Header period={period} onPeriodChange={setPeriod} role={role} onRoleChange={setRole} />

            <Box sx={{ display: 'flex', gap: 1.5, mb: 2.5 }}>
              <SummaryCard
                label="Agents Ranked"
                description={SUMMARY_CARD_DESCRIPTIONS.agentsRanked}
                value="10"
                hint={`${EXCLUDED_COUNT[dimensionKey]} below threshold`}
              />
              <SummaryCard
                label="Avg Composite"
                description={SUMMARY_CARD_DESCRIPTIONS.avgComposite}
                value="52.4"
                hint="↑ 1.2 vs last period"
                hintColor="success.main"
              />
              <SummaryCard
                label="Avg QP Score"
                description={SUMMARY_CARD_DESCRIPTIONS.avgQuality}
                value="83.7"
                hint="↑ 2.1% vs last period"
                hintColor="success.main"
              />
              <SummaryCard
                label="Active Streaks"
                description={SUMMARY_CARD_DESCRIPTIONS.activeStreaks}
                value="6"
                hint="agents on a streak"
                highlight
              />
            </Box>
          </CardContent>

          <DimensionRow isEng={isEng} onChangeTab={setIsEng} countdown={formatCountdownShort(secs)} />

          <Podium rows={rows} isEng={isEng} />

          <Box sx={{ px: 3, pb: 2, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            <MostImprovedCard agent={mostImprovedAgent} rankDelta={mostImprovedInfo.rankDelta} />
            <YourRankCard you={you} total={rows.length} period={period} />
          </Box>

          <InsightRow
            mostImproved={MOST_IMPROVED[dimensionKey]}
            showFormula={showFormula}
            onToggleFormula={() => setShowFormula((s) => !s)}
          />
          {showFormula && <FormulaPanel isEng={isEng} />}

          <Box sx={{ px: 3, pt: 2, pb: 3 }}>
            <RankingsTable rows={rows} isEng={isEng} />
          </Box>

          <LegendRow thresholdNote={THRESHOLD_NOTE[dimensionKey]} />
        </Card>
      </Box>
    </Box>
  );
}
