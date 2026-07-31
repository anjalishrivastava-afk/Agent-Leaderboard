import { Box, Icon, Typography, useTheme } from '@exotel-npm-dev/signal-design-system';

const TEAMS = ['All', 'Enterprise', 'SMB', 'APAC'];

interface DimensionRowProps {
  isEng: boolean;
  onChangeTab: (isEng: boolean) => void;
  countdown: string;
  team: string;
  onTeamChange: (team: string) => void;
}

export function DimensionRow({ isEng, onChangeTab, countdown, team, onTeamChange }: DimensionRowProps) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTop: 1,
        borderBottom: 1,
        borderColor: 'divider',
        px: 3,
      }}
    >
      <Box sx={{ display: 'flex' }}>
        <Box
          onClick={() => onChangeTab(true)}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            px: 1.75,
            py: 1.6,
            fontSize: 13.5,
            cursor: 'pointer',
            fontWeight: isEng ? 700 : 500,
            color: isEng ? 'primary.dark' : 'text.secondary',
            boxShadow: isEng ? (t) => `inset 0 -2px 0 ${t.palette.primary.main}` : 'none',
          }}
        >
          <Icon name="lightning" size="xs" weight="fill" />
          Engagement
        </Box>
        <Box
          onClick={() => onChangeTab(false)}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            px: 1.75,
            py: 1.6,
            fontSize: 13.5,
            cursor: 'pointer',
            fontWeight: !isEng ? 700 : 500,
            color: !isEng ? 'primary.dark' : 'text.secondary',
            boxShadow: !isEng ? (t) => `inset 0 -2px 0 ${t.palette.primary.main}` : 'none',
          }}
        >
          <Icon name="star" size="xs" />
          Quality Score
        </Box>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
        <Icon name="clock" size="xs" color={theme.palette.error.main} />
        <Typography variant="body2" sx={{ color: 'error.main', fontVariantNumeric: 'tabular-nums' }}>
          Resets in {countdown}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Icon name="users" size="xs" color={theme.palette.text.secondary} />
        {TEAMS.map((t) => (
          <Box
            key={t}
            onClick={() => onTeamChange(t)}
            sx={{
              fontSize: 13.5,
              fontWeight: team === t ? 650 : 400,
              cursor: 'pointer',
              px: team === t ? 1.5 : 0,
              py: team === t ? 0.5 : 0,
              borderRadius: 999,
              bgcolor: team === t ? 'primary.100' : 'transparent',
              color: team === t ? 'primary.dark' : 'text.secondary',
            }}
          >
            {t}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
