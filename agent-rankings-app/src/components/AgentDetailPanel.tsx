import { useState } from 'react';
import { Box, Chip, Icon, Typography } from '@exotel-npm-dev/signal-design-system';
import type { AgentRow } from '../data';
import { HeadToHeadModal } from './HeadToHeadModal';
import { ScoreHistoryChart } from './ScoreHistoryChart';

interface StatTileProps {
  value: string;
  label: string;
  pctile: string;
  color: string;
}

function StatTile({ value, label, pctile, color }: StatTileProps) {
  return (
    <Box sx={{ bgcolor: 'background.paper', border: 1, borderColor: 'divider', borderRadius: 1.5, px: 1.5, py: 1, flex: 1 }}>
      <Typography sx={{ fontSize: 16, fontWeight: 700, color, fontVariantNumeric: 'tabular-nums', lineHeight: 1.2 }}>{value}</Typography>
      <Typography variant="caption" sx={{ display: 'block', mt: 0.1 }}>
        {label}
      </Typography>
      <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: 10.5 }}>
        {pctile} pct
      </Typography>
    </Box>
  );
}

export function AgentDetailPanel({ row }: { row: AgentRow }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <StatTile value={row.f} label="Focus Ratio" pctile={row.fPctile} color="warning.dark" />
        <StatTile value={row.tVal} label="Time Spent" pctile={row.t} color="text.primary" />
        <StatTile value={row.dVal} label="Days Active" pctile={row.d} color="success.main" />
      </Box>

      <ScoreHistoryChart history={row.history} latestScore={row.history[row.history.length - 1].toFixed(1)} />
    </Box>
  );
}

export function AgentDetailFooter({ row, you }: { row: AgentRow; you: AgentRow }) {
  const [compareOpen, setCompareOpen] = useState(false);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 1 }}>
      <Chip
        variant="outlined"
        color="primary"
        size="small"
        clickable
        onClick={(e: React.MouseEvent) => {
          e.stopPropagation();
          setCompareOpen(true);
        }}
        icon={<Icon name="chart-bar" size="xs" weight="bold" />}
        label="Compare with me"
        sx={{ fontWeight: 650 }}
      />
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
        {row.badge && (
          <Chip variant="tonal" color={row.badgeColor} size="small" label={`🏆 ${row.badge}`} sx={{ fontWeight: 700 }} />
        )}
        {row.showStreakBadge && (
          <Chip
            size="small"
            label="🔥 Streak King"
            sx={{
              background: 'linear-gradient(90deg, #EF6C00 0%, #B81914 100%)',
              color: '#fff',
              fontWeight: 700,
            }}
          />
        )}
      </Box>

      <HeadToHeadModal open={compareOpen} onClose={() => setCompareOpen(false)} you={you} other={row} />
    </Box>
  );
}
