import { Box, Chip, Typography } from '@exotel-npm-dev/signal-design-system';
import type { Period, Role } from '../dashboardMeta';
import { PERIOD_RANGE } from '../dashboardMeta';

const PERIODS: { value: Period; label: string }[] = [
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'custom', label: 'Custom' },
];

interface PeriodRowProps {
  period: Period;
  onPeriodChange: (period: Period) => void;
  role: Role;
  eventLabel: string;
}

export function PeriodRow({ period, onPeriodChange, role, eventLabel }: PeriodRowProps) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, mb: 1.5 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography variant="overline" sx={{ color: 'text.secondary', fontWeight: 700 }}>
          Period
        </Typography>
        <Box sx={{ display: 'flex', border: 1, borderColor: 'divider', borderRadius: 2, overflow: 'hidden' }}>
          {PERIODS.map((p) => (
            <Box
              key={p.value}
              onClick={() => onPeriodChange(p.value)}
              sx={{
                px: 1.6,
                py: 0.85,
                fontSize: 12.5,
                fontWeight: 600,
                cursor: 'pointer',
                bgcolor: period === p.value ? 'primary.100' : 'transparent',
                color: period === p.value ? 'primary.dark' : 'text.secondary',
                borderLeft: p.value !== 'weekly' ? 1 : 0,
                borderColor: 'divider',
              }}
            >
              {p.label}
            </Box>
          ))}
        </Box>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {PERIOD_RANGE[period]}
        </Typography>
        {role === 'admin' && (
          <Chip
            size="small"
            variant="outlined"
            color="primary"
            label="Tenant default · editable in Settings"
            sx={{ fontSize: 11, fontWeight: 600, borderStyle: 'dashed' }}
          />
        )}
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
        <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: 'success.main' }} />
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          {eventLabel}
        </Typography>
      </Box>
    </Box>
  );
}
