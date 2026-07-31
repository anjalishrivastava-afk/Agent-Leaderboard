import { Box, MenuItem, Select, Typography, type SelectChangeEvent } from '@exotel-npm-dev/signal-design-system';
import type { Period, Role } from '../dashboardMeta';

const PERIOD_OPTIONS: { value: Period; label: string }[] = [
  { value: 'weekly', label: '7 days' },
  { value: 'monthly', label: '30 days' },
  { value: 'custom', label: 'Custom' },
];

const ROLE_OPTIONS: { value: Role; label: string }[] = [
  { value: 'agent', label: 'Agent' },
  { value: 'supervisor', label: 'Supervisor' },
  { value: 'admin', label: 'Admin' },
];

interface HeaderProps {
  period: Period;
  onPeriodChange: (period: Period) => void;
  role: Role;
  onRoleChange: (role: Role) => void;
}

export function Header({ period, onPeriodChange, role, onRoleChange }: HeaderProps) {
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

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          {ROLE_OPTIONS.map((opt) => (
            <Box
              key={opt.value}
              onClick={() => onRoleChange(opt.value)}
              sx={{
                fontSize: 13.5,
                fontWeight: 650,
                cursor: 'pointer',
                px: role === opt.value ? 1.5 : 0,
                py: role === opt.value ? 0.5 : 0,
                borderRadius: 999,
                bgcolor: role === opt.value ? 'primary.100' : 'transparent',
                color: role === opt.value ? 'primary.dark' : 'text.secondary',
              }}
            >
              {opt.label}
            </Box>
          ))}
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
    </Box>
  );
}
