import { Avatar, Box, Icon, Typography, useTheme } from '@exotel-npm-dev/signal-design-system';
import type { AgentRow } from '../data';

const RANK_META = {
  1: { icon: 'crown' as const, ring: '#E1AD01', chipBg: 'linear-gradient(180deg, #FFF4CE 0%, #FFECAF 100%)', chipBorder: '#FBD15B', label: '1ST', labelColor: '#8A6A00', scoreColor: '#4B3400' },
  2: { icon: 'shield' as const, ring: '#B7BDC6', chipBg: 'linear-gradient(180deg, #F2F4F8 0%, #E7EAF1 100%)', chipBorder: '#DCE0E8', label: '2ND', labelColor: '#5A6270', scoreColor: '#3D434D' },
  3: { icon: 'seal-check' as const, ring: '#D98A4A', chipBg: 'linear-gradient(180deg, #FDEEE0 0%, #F6DCC2 100%)', chipBorder: '#EFCBA8', label: '3RD', labelColor: '#A85E1B', scoreColor: '#6B3A0A' },
};

const REDUCED_MOTION = '@media (prefers-reduced-motion: no-preference)';

function StreakFlame({ delay }: { delay: number }) {
  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: -2,
        right: -2,
        width: 22,
        height: 22,
        borderRadius: '50%',
        bgcolor: 'background.paper',
        border: '2px solid',
        borderColor: 'background.paper',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: 1,
        '@keyframes flameFlick': {
          '0%, 100%': { transform: 'scale(1) rotate(-3deg)' },
          '50%': { transform: 'scale(1.12) rotate(3deg)' },
        },
        [REDUCED_MOTION]: {
          animation: `flameFlick 1.4s ease-in-out ${delay}s infinite`,
        },
      }}
    >
      <Icon name="fire" size="xs" weight="fill" color="#EF6C00" />
    </Box>
  );
}

function PodiumSlot({ row, place, gapToFirst, delay }: { row: AgentRow; place: 1 | 2 | 3; gapToFirst?: string; delay: number }) {
  const meta = RANK_META[place];
  const isChampion = place === 1;
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: isChampion ? 220 : 180,
        order: place === 2 ? 1 : place === 1 ? 2 : 3,
        opacity: 1,
        '@keyframes riseIn': {
          from: { opacity: 0, transform: 'translateY(16px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        [REDUCED_MOTION]: {
          opacity: 0,
          animation: `riseIn .5s ${delay}s ease-out forwards`,
        },
      }}
    >
      {!isChampion && <Icon name={meta.icon} weight="fill" size={22} color={meta.ring} style={{ marginBottom: 8 }} />}
      {isChampion && <Box sx={{ height: 30 }} />}

      <Box sx={{ position: 'relative', mb: 1.5 }}>
        <Avatar
          sx={{
            width: isChampion ? 88 : 64,
            height: isChampion ? 88 : 64,
            bgcolor: row.avatarBg,
            fontSize: isChampion ? 27 : 20,
            fontWeight: 700,
          }}
        >
          {row.initials}
        </Avatar>
        {row.streak && <StreakFlame delay={place * 0.2} />}
      </Box>

      <Typography sx={{ fontSize: isChampion ? 18 : 15, fontWeight: 700 }}>{row.name}</Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1.5 }}>
        {row.team}
        {isChampion && row.streak ? ` · 🔥 ${row.streak} streak` : ''}
      </Typography>

      {isChampion && (
        <Box
          sx={{
            mb: 1.5,
            px: 2,
            py: 0.6,
            borderRadius: 999,
            background: 'linear-gradient(90deg, #E5A000 0%, #B9791A 100%)',
            color: '#fff',
            fontSize: 11.5,
            fontWeight: 800,
            letterSpacing: '.1em',
          }}
        >
          CHAMPION
        </Box>
      )}

      <Box
        sx={{
          width: '100%',
          borderRadius: 3,
          background: meta.chipBg,
          border: `1px solid ${meta.chipBorder}`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 0.5,
          py: isChampion ? 2.5 : 2,
        }}
      >
        <Typography sx={{ fontSize: isChampion ? 13 : 12, fontWeight: 800, letterSpacing: '.1em', color: meta.labelColor }}>{meta.label}</Typography>
        <Typography sx={{ fontSize: isChampion ? 42 : 28, fontWeight: 800, color: meta.scoreColor, fontVariantNumeric: 'tabular-nums', lineHeight: 1 }}>
          {row.score}
        </Typography>
        {isChampion ? (
          <Typography variant="body2" sx={{ color: 'success.main', fontWeight: 650 }}>
            {row.delta} this period
          </Typography>
        ) : (
          gapToFirst && (
            <Typography variant="body2" sx={{ color: meta.labelColor, fontWeight: 600 }}>
              {gapToFirst} to 1st
            </Typography>
          )
        )}
      </Box>
    </Box>
  );
}

interface PodiumProps {
  rows: AgentRow[];
  isEng: boolean;
}

export function Podium({ rows, isEng }: PodiumProps) {
  const theme = useTheme();
  const [p1, p2, p3] = rows;
  const gap2 = (parseFloat(p1.score) - parseFloat(p2.score)).toFixed(1);
  const gap3 = (parseFloat(p1.score) - parseFloat(p3.score)).toFixed(1);

  return (
    <Box
      sx={{
        position: 'relative',
        py: 4,
        px: 3,
        textAlign: 'center',
        backgroundImage: `radial-gradient(120% 90% at 50% -10%, ${theme.palette.warning.light ?? '#FFFAEB'}55 0%, transparent 62%),
          radial-gradient(${theme.palette.divider} 1px, transparent 1px)`,
        backgroundSize: 'auto, 16px 16px',
        overflow: 'hidden',
      }}
    >
      <Typography variant="overline" sx={{ color: 'text.secondary', letterSpacing: '.18em', fontWeight: 700 }}>
        {isEng ? 'Engagement' : 'Quality'} Champions · This Period
      </Typography>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mb: 1,
          '@keyframes crownFloat': {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-5px)' },
          },
          [REDUCED_MOTION]: {
            animation: 'crownFloat 2.8s ease-in-out infinite',
          },
        }}
      >
        <Icon
          name="crown"
          weight="fill"
          size={36}
          color={RANK_META[1].ring}
          style={{ filter: 'drop-shadow(0 2px 3px rgba(225,173,1,.35))' }}
        />
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 2.5, position: 'relative', zIndex: 1 }}>
        <PodiumSlot row={p2} place={2} gapToFirst={`−${gap2}`} delay={0.1} />
        <PodiumSlot row={p1} place={1} delay={0} />
        <PodiumSlot row={p3} place={3} gapToFirst={`−${gap3}`} delay={0.2} />
      </Box>
    </Box>
  );
}
