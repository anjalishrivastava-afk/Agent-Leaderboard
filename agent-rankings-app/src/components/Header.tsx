import { Box, MenuItem, Select, Typography, type SelectChangeEvent } from '@exotel-npm-dev/signal-design-system';
import type { Period } from '../dashboardMeta';

const PERIOD_OPTIONS: { value: Period; label: string }[] = [
  { value: 'weekly', label: '7 days' },
  { value: 'monthly', label: '30 days' },
  { value: 'custom', label: 'Custom' },
];

interface HeaderProps {
  period: Period;
  onPeriodChange: (period: Period) => void;
}

export function Header({ period, onPeriodChange }: HeaderProps) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Agent Rankings
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.25 }}>
          How you stack up across engagement and quality metrics
        </Typography>
      </Box>

      <Select
        value={period}
        onChange={(e: SelectChangeEvent) => onPeriodChange(e.target.value as Period)}
        size="small"
        sx={{ minWidth: 120 }}
      >
        {PERIOD_OPTIONS.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}
