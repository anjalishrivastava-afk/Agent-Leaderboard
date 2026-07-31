import { Avatar, Box, Icon, Typography, useTheme } from '@exotel-npm-dev/signal-design-system';
import type { AgentRow } from '../data';

interface MostImprovedCardProps {
  agent: AgentRow;
  rankDelta: number;
}

export function MostImprovedCard({ agent, rankDelta }: MostImprovedCardProps) {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        bgcolor: 'secondary.50',
        border: 1,
        borderColor: 'secondary.100',
        borderRadius: 2,
        px: 2,
        py: 1.5,
      }}
    >
      <Box
        sx={{
          width: 36,
          height: 36,
          borderRadius: '50%',
          bgcolor: 'secondary.100',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <Icon name="sparkle" size="sm" weight="fill" color={theme.palette.secondary.main} />
      </Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography variant="overline" sx={{ color: 'secondary.dark', fontWeight: 700, letterSpacing: '.06em' }}>
          Most improved this period
        </Typography>
        <Typography sx={{ fontWeight: 700 }}>{agent.name}</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          +{rankDelta} rank position{rankDelta === 1 ? '' : 's'} vs last period
        </Typography>
      </Box>
      <Avatar sx={{ bgcolor: agent.avatarBg, width: 34, height: 34, fontSize: 12.5, fontWeight: 700 }}>{agent.initials}</Avatar>
    </Box>
  );
}
