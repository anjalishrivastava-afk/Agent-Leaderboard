import { Box, Chip, Icon, Typography, useTheme } from '@exotel-npm-dev/signal-design-system';
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
    <Box
      sx={{
        bgcolor: 'background.paper',
        border: 1,
        borderColor: 'divider',
        borderRadius: 2,
        px: 2,
        py: 1.75,
        transition: 'border-color .15s',
        '&:hover': { borderColor: color },
      }}
    >
      <Typography sx={{ fontSize: 22, fontWeight: 700, color, fontVariantNumeric: 'tabular-nums' }}>{value}</Typography>
      <Typography variant="body2" sx={{ mt: 0.5 }}>
        {label}
      </Typography>
      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
        {pctile} pctile
      </Typography>
    </Box>
  );
}

export function AgentDetailPanel({ row }: { row: AgentRow }) {
  const theme = useTheme();
  return (
    <Box sx={{ display: 'flex', alignItems: 'stretch', gap: 1.75 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, width: 220, flex: '0 0 220px' }}>
        <StatTile value={row.tVal} label="Time Spent" pctile={row.t} color={theme.palette.primary.main} />
        <StatTile value={row.dVal} label="Days Active" pctile={row.d} color={theme.palette.success.main} />
        <StatTile value={row.f} label="Focus Ratio" pctile={row.fPctile} color={theme.palette.warning.dark ?? theme.palette.warning.main} />
      </Box>

      <ScoreHistoryChart history={row.history} latestScore={row.history[row.history.length - 1].toFixed(1)} />
    </Box>
  );
}

export function AgentDetailFooter({ row }: { row: AgentRow }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
      <Chip
        variant="tonal"
        color="primary"
        clickable
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
        icon={<Icon name="arrows-left-right" size="xs" weight="bold" />}
        label="Compare with me"
        sx={{ fontWeight: 650 }}
      />
      {row.showStreakBadge && (
        <Chip
          variant="tonal"
          color="warning"
          size="small"
          icon={<Icon name="fire" size="xs" weight="fill" />}
          label="Streak leader"
          sx={{ fontWeight: 700 }}
        />
      )}
    </Box>
  );
}
