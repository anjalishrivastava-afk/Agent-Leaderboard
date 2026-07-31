import { Box, Icon, Typography } from '@exotel-npm-dev/signal-design-system';

const TEAMS = ['All Teams', 'Enterprise', 'SMB', 'APAC'];

interface DimensionRowProps {
  isEng: boolean;
  onChangeTab: (isEng: boolean) => void;
  countdown: string;
}

export function DimensionRow({ isEng, onChangeTab, countdown }: DimensionRowProps) {
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

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          px: 1.25,
          py: 0.6,
          borderRadius: 999,
          bgcolor: 'error.50',
          border: 1,
          borderColor: 'error.100',
        }}
      >
        <Box sx={{ width: 7, height: 7, borderRadius: '50%', bgcolor: 'error.main' }} />
        <Typography sx={{ fontSize: 12, fontWeight: 700, color: 'error.dark', fontVariantNumeric: 'tabular-nums' }}>
          Period ends in {countdown}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {TEAMS.map((t, i) => (
          <Typography key={t} variant="body2" sx={{ fontWeight: i === 0 ? 650 : 400, color: i === 0 ? 'text.primary' : 'text.secondary' }}>
            {t}
          </Typography>
        ))}
      </Box>
    </Box>
  );
}
