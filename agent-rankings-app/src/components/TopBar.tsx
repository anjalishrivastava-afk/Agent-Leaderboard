import { Box, Chip, Typography } from '@exotel-npm-dev/signal-design-system';
import type { Role } from '../dashboardMeta';

const ROLES: { value: Role; label: string }[] = [
  { value: 'agent', label: 'Agent' },
  { value: 'supervisor', label: 'Supervisor' },
  { value: 'admin', label: 'Admin' },
];

interface TopBarProps {
  seasonLabel: string;
  role: Role;
  onRoleChange: (role: Role) => void;
}

export function TopBar({ seasonLabel, role, onRoleChange }: TopBarProps) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Agent Rankings
          </Typography>
          <Chip
            size="small"
            variant="tonal"
            color="warning"
            label={`${seasonLabel} · LIVE`}
            sx={{ fontWeight: 700, fontSize: 11, letterSpacing: '.04em' }}
          />
        </Box>
        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.25 }}>
          How you stack up across engagement and quality metrics
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          Viewing as
        </Typography>
        <Box sx={{ display: 'flex', border: 1, borderColor: 'divider', borderRadius: 2, overflow: 'hidden' }}>
          {ROLES.map((r) => (
            <Box
              key={r.value}
              onClick={() => onRoleChange(r.value)}
              sx={{
                px: 1.5,
                py: 0.75,
                fontSize: 12,
                fontWeight: 600,
                cursor: 'pointer',
                bgcolor: role === r.value ? 'primary.100' : 'transparent',
                color: role === r.value ? 'primary.dark' : 'text.secondary',
                borderLeft: r.value !== 'agent' ? 1 : 0,
                borderColor: 'divider',
              }}
            >
              {r.label}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
