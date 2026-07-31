import { Avatar, Box, Icon, Typography, useTheme } from '@exotel-npm-dev/signal-design-system';
import type { AgentRow } from '../data';

const RANK_META = {
  1: { icon: 'crown' as const, ring: '#E1AD01', chipBg: 'linear-gradient(180deg, #FFF4CE 0%, #FFECAF 100%)', chipBorder: '#FBD15B', label: '1ST', labelColor: '#8A6A00', scoreColor: '#4B3400' },
  2: { icon: 'shield' as const, ring: '#D6D6D6', chipBg: 'linear-gradient(180deg, #F8F8F8 0%, #EDEDED 100%)', chipBorder: '#E4E4E4', label: '2ND', labelColor: '#616161', scoreColor: '#4D4D4C' },
  3: { icon: 'medal' as const, ring: '#EDB183', chipBg: 'linear-gradient(180deg, #FDEEE0 0%, #F6DCC2 100%)', chipBorder: '#EFCBA8', label: '3RD', labelColor: '#A85E1B', scoreColor: '#6B3A0A' },
};

function PodiumSlot({ row, place, gapToFirst }: { row: AgentRow; place: 1 | 2 | 3; gapToFirst?: string }) {
  const meta = RANK_META[place];
  const isChampion = place === 1;
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: isChampion ? 218 : 190,
        order: place === 2 ? 1 : place === 1 ? 2 : 3,
      }}
    >
      <Icon name={meta.icon} weight="fill" size={isChampion ? 32 : 24} color={meta.ring} style={{ marginBottom: 6 }} />
      <Box sx={{ position: 'relative', mb: 1.25 }}>
        <Avatar
          sx={{
            width: isChampion ? 78 : 58,
            height: isChampion ? 78 : 58,
            bgcolor: row.avatarBg,
            fontSize: isChampion ? 25 : 19,
            fontWeight: 700,
            border: '3px solid #fff',
            boxShadow: `0 0 0 4px ${meta.ring}`,
          }}
        >
          {row.initials}
        </Avatar>
        {isChampion && (
          <Box
            sx={{
              position: 'absolute',
              bottom: -6,
              left: '50%',
              transform: 'translateX(-50%)',
              bgcolor: meta.ring,
              color: '#fff',
              fontSize: 10,
              fontWeight: 800,
              letterSpacing: '.08em',
              px: 1.25,
              py: 0.4,
              borderRadius: 1,
              whiteSpace: 'nowrap',
            }}
          >
            CHAMPION
          </Box>
        )}
      </Box>
      <Typography sx={{ fontSize: isChampion ? 16.5 : 14.5, fontWeight: 700, mt: isChampion ? 0.5 : 0 }}>{row.name}</Typography>
      <Typography variant="caption" sx={{ color: isChampion ? '#4B3400' : 'text.secondary', fontWeight: isChampion ? 600 : 400, mb: 1.25 }}>
        {row.team}
        {isChampion && row.streak ? ` · 🔥 ${row.streak} streak` : ''}
      </Typography>
      <Box
        sx={{
          width: '100%',
          height: isChampion ? 152 : place === 2 ? 104 : 82,
          borderRadius: isChampion ? '8px 14px 0 0' : '8px 8px 0 0',
          background: meta.chipBg,
          border: `1px solid ${meta.chipBorder}`,
          borderBottom: 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 0.4,
        }}
      >
        <Typography sx={{ fontSize: isChampion ? 13 : 12, fontWeight: 800, letterSpacing: '.1em', color: meta.labelColor }}>{meta.label}</Typography>
        <Typography sx={{ fontSize: isChampion ? 40 : place === 2 ? 26 : 24, fontWeight: 800, color: meta.scoreColor, fontVariantNumeric: 'tabular-nums', lineHeight: 1 }}>
          {row.score}
        </Typography>
        {isChampion && (
          <Typography variant="caption" sx={{ color: '#8A6A00', fontWeight: 600 }}>
            {row.delta} this period
          </Typography>
        )}
        {place === 2 && gapToFirst && (
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            {gapToFirst} to 1st
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export function Podium({ rows }: { rows: AgentRow[] }) {
  const theme = useTheme();
  const [p1, p2, p3] = rows;
  const gap = (parseFloat(p1.score) - parseFloat(p2.score)).toFixed(1);

  return (
    <Box
      sx={{
        position: 'relative',
        py: 4,
        px: 3,
        background: `radial-gradient(120% 90% at 50% -10%, ${theme.palette.warning.light ?? '#FFFAEB'}55 0%, transparent 62%)`,
        overflow: 'hidden',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 2.25 }}>
        <PodiumSlot row={p2} place={2} gapToFirst={`−${gap}`} />
        <PodiumSlot row={p1} place={1} />
        <PodiumSlot row={p3} place={3} />
      </Box>
    </Box>
  );
}
