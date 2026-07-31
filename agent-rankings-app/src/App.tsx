import { useMemo, useState } from 'react';
import { Box, Card, CardContent, Tab, Tabs, Typography } from '@exotel-npm-dev/signal-design-system';
import { buildRows } from './data';
import { RankingsTable } from './components/RankingsTable';

function SummaryCard({ label, value, hint, hintColor }: { label: string; value: string; hint: string; hintColor?: string }) {
  return (
    <Card variant="outlined" sx={{ flex: 1 }}>
      <CardContent sx={{ py: 1.75, px: 2 }}>
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          {label}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', mt: 1.25 }}>
          <Typography sx={{ fontSize: 26, fontWeight: 700 }}>{value}</Typography>
          <Typography variant="caption" sx={{ color: hintColor ?? 'text.secondary', fontWeight: hintColor ? 600 : 400 }}>
            {hint}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default function App() {
  const [tab, setTab] = useState<'engagement' | 'quality'>('engagement');
  const isEng = tab === 'engagement';
  const rows = useMemo(() => buildRows(isEng), [isEng]);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 4, px: { xs: 2, md: 4 } }}>
      <Box sx={{ maxWidth: 1280, mx: 'auto' }}>
        <Card variant="outlined">
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Agent Rankings
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.25 }}>
                  How you stack up across engagement and quality metrics
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 1.5, mb: 2.5 }}>
              <SummaryCard label="Agents Ranked" value="10" hint="1 below threshold" />
              <SummaryCard label="Avg Composite" value="52.4" hint="↑ 1.2 vs last" hintColor="success.main" />
              <SummaryCard label="Avg QP Score" value="83.7" hint="↑ 2.1% vs last" hintColor="success.main" />
              <SummaryCard label="Active Streaks" value="6" hint="agents on a streak" />
            </Box>

            <Tabs
              value={tab}
              onChange={(_: React.SyntheticEvent, v: 'engagement' | 'quality') => setTab(v)}
              sx={{ mb: 2, minHeight: 40 }}
            >
              <Tab value="engagement" label="Engagement" sx={{ minHeight: 40 }} />
              <Tab value="quality" label="Quality Score" sx={{ minHeight: 40 }} />
            </Tabs>

            <RankingsTable rows={rows} isEng={isEng} />
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
