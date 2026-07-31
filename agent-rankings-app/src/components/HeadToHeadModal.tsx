import {
  Avatar,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Icon,
  IconButton,
  LinearProgress,
  Typography,
} from '@exotel-npm-dev/signal-design-system';
import type { AgentRow } from '../data';

interface CompareRowProps {
  label: string;
  youPct: string;
  otherPct: string;
  color: string;
  lightColor: string;
}

function CompareRow({ label, youPct, otherPct, color, lightColor }: CompareRowProps) {
  const youVal = parseFloat(youPct) || 0;
  const otherVal = parseFloat(otherPct) || 0;
  return (
    <Box sx={{ mb: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="body2" sx={{ fontWeight: 650, color }}>
          {youPct} pct
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {label}
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 650, color }}>
          {otherPct} pct
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', gap: 0.5, mt: 0.5 }}>
        <Box sx={{ flex: 1 }}>
          <LinearProgress
            variant="determinate"
            value={youVal}
            sx={{
              height: 8,
              borderRadius: 4,
              bgcolor: 'action.hover',
              '& .MuiLinearProgress-bar': { bgcolor: color, borderRadius: 4 },
            }}
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <LinearProgress
            variant="determinate"
            value={otherVal}
            sx={{
              height: 8,
              borderRadius: 4,
              bgcolor: 'action.hover',
              '& .MuiLinearProgress-bar': { bgcolor: lightColor, borderRadius: 4 },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}

interface HeadToHeadModalProps {
  open: boolean;
  onClose: () => void;
  you: AgentRow;
  other: AgentRow;
}

export function HeadToHeadModal({ open, onClose, you, other }: HeadToHeadModalProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        Head-to-Head
        <IconButton size="small" onClick={onClose}>
          <Icon name="x" size="xs" />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', mb: 3 }}>
          <Box sx={{ textAlign: 'center' }}>
            <Avatar sx={{ bgcolor: you.avatarBg, width: 48, height: 48, fontSize: 16, fontWeight: 700, mx: 'auto', mb: 0.75 }}>
              {you.initials}
            </Avatar>
            <Typography variant="body2" sx={{ fontWeight: 650 }}>
              You
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Avatar sx={{ bgcolor: other.avatarBg, width: 48, height: 48, fontSize: 16, fontWeight: 700, mx: 'auto', mb: 0.75 }}>
              {other.initials}
            </Avatar>
            <Typography variant="body2" sx={{ fontWeight: 650 }}>
              {other.name.split(' ')[0]}
            </Typography>
          </Box>
        </Box>

        <CompareRow label="Time Spent" youPct={you.t} otherPct={other.t} color="text.primary" lightColor="grey.300" />
        <CompareRow label="Days Active" youPct={you.d} otherPct={other.d} color="success.main" lightColor="success.light" />
        <CompareRow label="Focus Ratio" youPct={you.f} otherPct={other.f} color="warning.dark" lightColor="warning.light" />
      </DialogContent>
    </Dialog>
  );
}
