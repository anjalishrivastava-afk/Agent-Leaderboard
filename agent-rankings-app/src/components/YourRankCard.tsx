import { Box, Icon, LinearProgress, Typography, useTheme } from '@exotel-npm-dev/signal-design-system';
import type { AgentRow } from '../data';
import { periodPhrase, type Period } from '../dashboardMeta';

interface YourRankCardProps {
  you: AgentRow;
  total: number;
  period: Period;
}

export function YourRankCard({ you, total, period }: YourRankCardProps) {
  const theme = useTheme();
  const topPercent = Math.max(1, Math.ceil((you.rank / total) * 100));
  const barPct = Math.round(((total - you.rank + 1) / total) * 100);

  return (
    <Box sx={{ border: 1, borderColor: 'primary.100', bgcolor: 'primary.50', borderRadius: 2, px: 2, py: 1.5 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            bgcolor: 'primary.100',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Icon name="star" size="sm" weight="fill" color={theme.palette.primary.main} />
        </Box>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography sx={{ fontWeight: 700 }}>Your rank {periodPhrase(period)}</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            You are in the top {topPercent}% of your team · Score: <Box component="strong" sx={{ color: 'text.primary' }}>{you.score}</Box>
          </Typography>
        </Box>
        <Box sx={{ textAlign: 'right', flexShrink: 0 }}>
          <Typography sx={{ fontSize: 26, fontWeight: 700, lineHeight: 1 }}>#{you.rank}</Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            of {total}
          </Typography>
        </Box>
      </Box>
      <LinearProgress
        variant="determinate"
        value={barPct}
        sx={{
          height: 8,
          borderRadius: 999,
          mt: 1.5,
          bgcolor: 'primary.100',
          '& .MuiLinearProgress-bar': { borderRadius: 999, background: 'linear-gradient(90deg, #394FB6 0%, #6476CE 100%)' },
        }}
      />
    </Box>
  );
}
