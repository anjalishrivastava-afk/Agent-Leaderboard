import { useState } from 'react';
import {
  Box,
  Icon,
  IconButton,
  MenuItem,
  Popover,
  Select,
  TextField,
  Typography,
  type SelectChangeEvent,
} from '@exotel-npm-dev/signal-design-system';
import type { Period, Role } from '../dashboardMeta';
import type { ThresholdConfig } from '../data';

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

function ThresholdConfigButton({
  thresholds,
  onThresholdsChange,
}: {
  thresholds: ThresholdConfig;
  onThresholdsChange: (t: ThresholdConfig) => void;
}) {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  return (
    <>
      <IconButton size="small" onClick={(e: React.MouseEvent<HTMLButtonElement>) => setAnchor(e.currentTarget)} title="Configure ranking thresholds">
        <Icon name="gear-six" size="xs" />
      </IconButton>
      <Popover
        open={Boolean(anchor)}
        anchorEl={anchor}
        onClose={() => setAnchor(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Box sx={{ p: 2, width: 260, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <Typography variant="body2" sx={{ fontWeight: 700 }}>
            Ranking thresholds (tenant)
          </Typography>
          <TextField
            label="Min session minutes"
            type="number"
            size="small"
            value={thresholds.engagementMinSessionMinutes}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onThresholdsChange({ ...thresholds, engagementMinSessionMinutes: Math.max(0, Number(e.target.value) || 0) })
            }
          />
          <TextField
            label="Min evaluated interactions"
            type="number"
            size="small"
            value={thresholds.qualityMinEvaluatedInteractions}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onThresholdsChange({ ...thresholds, qualityMinEvaluatedInteractions: Math.max(0, Number(e.target.value) || 0) })
            }
          />
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Agents below either gate are excluded from their leaderboard.
          </Typography>
        </Box>
      </Popover>
    </>
  );
}

interface HeaderProps {
  period: Period;
  onPeriodChange: (period: Period) => void;
  role: Role;
  onRoleChange: (role: Role) => void;
  search: string;
  onSearchChange: (search: string) => void;
  thresholds: ThresholdConfig;
  onThresholdsChange: (t: ThresholdConfig) => void;
}

export function Header({ period, onPeriodChange, role, onRoleChange, search, onSearchChange, thresholds, onThresholdsChange }: HeaderProps) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2, flexWrap: 'wrap', gap: 1.5 }}>
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Agent Rankings
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.25 }}>
          How you stack up across engagement and quality metrics
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <TextField
          size="small"
          placeholder="Search agent or team"
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSearchChange(e.target.value)}
          InputProps={{ startAdornment: <Icon name="magnifying-glass" size="xs" style={{ marginRight: 6 }} /> }}
          sx={{ width: 190 }}
        />

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

        {role === 'admin' && <ThresholdConfigButton thresholds={thresholds} onThresholdsChange={onThresholdsChange} />}
      </Box>
    </Box>
  );
}
