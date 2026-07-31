import { useEffect, useMemo, useState } from 'react';
import { Box, Card, CardContent, Typography } from '@exotel-npm-dev/signal-design-system';
import { DEFAULT_THRESHOLDS, deltaMagnitude, filterBySearch, mostImprovedIn, rankAgents, type ThresholdConfig } from './data';
import { RankingsTable } from './components/RankingsTable';
import { Header } from './components/Header';
import { DimensionRow } from './components/DimensionRow';
import { Podium } from './components/Podium';
import { MostImprovedCard } from './components/MostImprovedCard';
import { YourRankCard } from './components/YourRankCard';
import { InsightRow, LegendRow } from './components/InsightRow';
import { FormulaPanel } from './components/FormulaPanel';
import { trackEvent } from './analytics';
import { INITIAL_COUNTDOWN_SECONDS, SUMMARY_CARD_DESCRIPTIONS, formatCountdownShort, thresholdNote, type Period, type Role } from './dashboardMeta';

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

function average(values: number[]): number {
  if (!values.length) return 0;
  return values.reduce((a, b) => a + b, 0) / values.length;
}

export default function App() {
  const [isEng, setIsEng] = useState(true);
  const [role, setRole] = useState<Role>('agent');
  const [period, setPeriod] = useState<Period>('monthly');
  const [team, setTeam] = useState('All');
  const [search, setSearch] = useState('');
  const [thresholds, setThresholds] = useState<ThresholdConfig>(DEFAULT_THRESHOLDS);
  const [showFormula, setShowFormula] = useState(false);
  const [secs, setSecs] = useState(INITIAL_COUNTDOWN_SECONDS);

  useEffect(() => {
    const id = setInterval(() => setSecs((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    trackEvent('Leaderboard Viewed', { type: isEng ? 'engagement' : 'quality', role, period, team });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEng, role, period, team]);

  const engResult = useMemo(() => rankAgents(true, { period, team, thresholds }), [period, team, thresholds]);
  const qualResult = useMemo(() => rankAgents(false, { period, team, thresholds }), [period, team, thresholds]);
  const active = isEng ? engResult : qualResult;

  const you = active.rows.find((r) => r.isYou);
  const mostImproved = mostImprovedIn(active.rows);
  const searchedRows = useMemo(() => filterBySearch(active.rows, search), [active.rows, search]);

  const avgComposite = average(engResult.rows.map((r) => r.scoreValue)).toFixed(1);
  const avgQuality = average(qualResult.rows.map((r) => r.scoreValue)).toFixed(1);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 4, px: { xs: 2, md: 4 } }}>
      <Box sx={{ maxWidth: 1280, mx: 'auto' }}>
        <Card variant="outlined">
          <CardContent sx={{ p: 3 }}>
            <Header
              period={period}
              onPeriodChange={(p) => {
                setPeriod(p);
                trackEvent('Leaderboard Period Changed', { period: p });
              }}
              role={role}
              onRoleChange={(r) => {
                setRole(r);
                trackEvent('Leaderboard Role Switched', { role: r });
              }}
              search={search}
              onSearchChange={setSearch}
              thresholds={thresholds}
              onThresholdsChange={(t) => {
                setThresholds(t);
                trackEvent('Leaderboard Thresholds Changed', { ...t });
              }}
            />

            <Box sx={{ display: 'flex', gap: 1.5, mb: 2.5 }}>
              <SummaryCard
                label="Agents Ranked"
                description={SUMMARY_CARD_DESCRIPTIONS.agentsRanked}
                value={String(active.rows.length)}
                hint={`${active.excludedCount} below threshold`}
              />
              <SummaryCard
                label="Avg Composite"
                description={SUMMARY_CARD_DESCRIPTIONS.avgComposite}
                value={avgComposite}
                hint="engagement"
              />
              <SummaryCard
                label="Avg QP Score"
                description={SUMMARY_CARD_DESCRIPTIONS.avgQuality}
                value={avgQuality}
                hint="quality"
              />
              <SummaryCard
                label="Active Streaks"
                description={SUMMARY_CARD_DESCRIPTIONS.activeStreaks}
                value={String(active.rows.filter((r) => r.showStreakBadge).length)}
                hint="agents on a streak"
                highlight
              />
            </Box>
          </CardContent>

          <DimensionRow
            isEng={isEng}
            onChangeTab={(next) => {
              setIsEng(next);
              trackEvent('Leaderboard Tab Changed', { type: next ? 'engagement' : 'quality' });
            }}
            countdown={formatCountdownShort(secs)}
            team={team}
            onTeamChange={(t) => {
              setTeam(t);
              trackEvent('Leaderboard Team Filtered', { team: t });
            }}
          />

          {active.rows.length >= 3 && <Podium rows={active.rows} isEng={isEng} />}

          <Box sx={{ px: 3, pb: 2, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {mostImproved && <MostImprovedCard agent={mostImproved} rankDelta={deltaMagnitude(mostImproved)} />}
            {you && <YourRankCard you={you} total={active.rows.length} period={period} />}
          </Box>

          <InsightRow
            mostImproved={mostImproved ? `${mostImproved.name} climbed +${deltaMagnitude(mostImproved)} ranks` : 'No rank movement this period'}
            showFormula={showFormula}
            onToggleFormula={() => setShowFormula((s) => !s)}
          />
          {showFormula && <FormulaPanel isEng={isEng} />}

          <Box sx={{ px: 3, pt: 2, pb: 3 }}>
            <RankingsTable rows={searchedRows} isEng={isEng} you={you} />
          </Box>

          <LegendRow thresholdNote={thresholdNote(isEng, active.excludedCount)} />
        </Card>
      </Box>
    </Box>
  );
}
