import { Avatar, Box, Button, Chip, LinearProgress, Typography } from '@exotel-npm-dev/signal-design-system';
import type { AgentRow } from '../data';
import { COMPOSITE_LINE } from '../dashboardMeta';

interface RankGapBannerProps {
  you: AgentRow;
  target: AgentRow;
  total: number;
  isEng: boolean;
  onReplay: () => void;
}

export function RankGapBanner({ you, target, total, isEng, onReplay }: RankGapBannerProps) {
  const youScore = parseFloat(you.score);
  const targetScore = parseFloat(target.score);
  const gapPts = (targetScore - youScore).toFixed(1);
  const barPct = Math.min(100, Math.round((youScore / targetScore) * 100));

  return (
    <Box sx={{ border: 1, borderColor: 'primary.100', bgcolor: 'primary.50', borderRadius: 2, p: 2.25, display: 'flex', alignItems: 'center', gap: 2.25 }}>
      <Avatar sx={{ width: 52, height: 52, bgcolor: 'text.primary', fontWeight: 700, borderRadius: 2 }} variant="rounded">
        {you.initials}
      </Avatar>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography sx={{ fontSize: 15, fontWeight: 750 }}>
            You're <Box component="span" sx={{ color: 'error.main' }}>{gapPts} points</Box> behind {target.name}
          </Typography>
          <Chip label={`OVERTAKE #${target.rank}`} size="small" color="error" variant="tonal" sx={{ height: 20, fontSize: 10, fontWeight: 800 }} />
        </Box>
        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.4 }}>
          {COMPOSITE_LINE[isEng ? 'engagement' : 'quality']}
        </Typography>
        <LinearProgress
          variant="determinate"
          value={barPct}
          sx={{ height: 12, borderRadius: 999, mt: 1.5, bgcolor: 'primary.100', '& .MuiLinearProgress-bar': { borderRadius: 999, background: 'linear-gradient(90deg, #394FB6 0%, #6476CE 100%)' } }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.75 }}>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            You · {you.score}
          </Typography>
          <Typography variant="caption" sx={{ color: 'error.main', fontWeight: 650 }}>
            {target.name.split(' ')[0]} · {target.score}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ textAlign: 'right', flexShrink: 0 }}>
        <Typography variant="overline" sx={{ color: 'text.secondary', fontWeight: 700 }}>
          Your Rank
        </Typography>
        <Typography sx={{ fontSize: 40, fontWeight: 800, lineHeight: 1.05 }}>
          #{you.rank}
          <Typography component="span" sx={{ fontSize: 15, color: 'text.secondary', fontWeight: 600 }}> / {total}</Typography>
        </Typography>
        <Button
          variant="contained"
          size="small"
          onClick={onReplay}
          startIcon={<span>⚡</span>}
          sx={{ mt: 1, fontWeight: 650, borderRadius: 2 }}
        >
          Make my move
        </Button>
      </Box>
    </Box>
  );
}
