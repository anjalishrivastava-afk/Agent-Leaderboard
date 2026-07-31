import { Box, Chip, Icon, Typography } from '@exotel-npm-dev/signal-design-system';
import type { AgentRow } from '../data';
import { ScoreHistoryChart } from './ScoreHistoryChart';

interface StatTileProps {
  value: string;
  label: string;
  pctile: string;
  color: string;
}

function StatTile({ value, label, pctile, color }: StatTileProps) {
  return (
    <Box sx={{ bgcolor: 'background.paper', border: 1, borderColor: 'divider', borderRadius: 2, px: 2, py: 1.5, flex: 1 }}>
      <Typography sx={{ fontSize: 20, fontWeight: 700, color, fontVariantNumeric: 'tabular-nums' }}>{value}</Typography>
      <Typography variant="body2" sx={{ mt: 0.25 }}>
        {label}
      </Typography>
      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
        {pctile} pct
      </Typography>
    </Box>
  );
}

export function AgentDetailPanel({ row }: { row: AgentRow }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      <Box sx={{ display: 'flex', gap: 1.5 }}>
        <StatTile value={row.f} label="Focus Ratio" pctile={row.fPctile} color="warning.dark" />
        <StatTile value={row.tVal} label="Time Spent" pctile={row.t} color="text.primary" />
        <StatTile value={row.dVal} label="Days Active" pctile={row.d} color="success.main" />
      </Box>

      <ScoreHistoryChart history={row.history} latestScore={row.history[row.history.length - 1].toFixed(1)} />
    </Box>
  );
}

export function AgentDetailFooter({ row }: { row: AgentRow }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 1.5 }}>
      <Chip
        variant="outlined"
        color="primary"
        clickable
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
        icon={<Icon name="chart-bar" size="xs" weight="bold" />}
        label="Compare with me"
        sx={{ fontWeight: 650 }}
      />
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
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
    </Box>
  );
}
