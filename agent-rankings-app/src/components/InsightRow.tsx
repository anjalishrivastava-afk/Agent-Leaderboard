import { Box, Icon, Typography, useTheme } from '@exotel-npm-dev/signal-design-system';

interface InsightRowProps {
  mostImproved: string;
  showFormula: boolean;
  onToggleFormula: () => void;
}

export function InsightRow({ mostImproved, showFormula, onToggleFormula }: InsightRowProps) {
  const theme = useTheme();
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 3, py: 1.25, bgcolor: 'background.default', borderBottom: 1, borderColor: 'divider' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Box sx={{ width: 22, height: 22, borderRadius: '50%', bgcolor: 'primary.100', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="sparkle" size="xs" weight="fill" color={theme.palette.primary.main} />
        </Box>
        <Typography variant="body2">
          <Box component="strong" sx={{ color: 'primary.dark', letterSpacing: '.05em', fontSize: 11 }}>
            MOST IMPROVED
          </Box>{' '}
          · {mostImproved}
        </Typography>
      </Box>
      <Typography variant="body2" onClick={onToggleFormula} sx={{ color: 'primary.main', fontWeight: 600, cursor: 'pointer' }}>
        {showFormula ? 'Hide' : 'Show'} scoring formula
      </Typography>
    </Box>
  );
}

const LEGEND = [
  { icon: 'crown' as const, label: 'Crown · 1st' },
  { icon: 'shield' as const, label: 'Shield · 2nd' },
  { icon: 'medal' as const, label: 'Ribbon · 3rd' },
];

export function LegendRow({ thresholdNote }: { thresholdNote: string }) {
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, px: 3, py: 1.5, bgcolor: 'background.default', borderBottom: 1, borderColor: 'divider' }}>
        <Icon name="warning" size="xs" />
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {thresholdNote}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5, px: 3, py: 1.75, flexWrap: 'wrap' }}>
        {LEGEND.map((l) => (
          <Box key={l.label} sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
            <Icon name={l.icon} size="xs" weight="fill" />
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {l.label}
            </Typography>
          </Box>
        ))}
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          🔥 ≥2 day streak
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          🎯 Your next target
        </Typography>
      </Box>
    </>
  );
}
