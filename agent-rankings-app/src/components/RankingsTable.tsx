import { useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Chip,
  Icon,
  Typography,
  LinearProgress,
  useTheme,
} from '@exotel-npm-dev/signal-design-system';
import type { AgentRow } from '../data';
import { AgentDetailFooter, AgentDetailPanel } from './AgentDetailPanel';

const RANK_ICON: Record<number, { name: 'crown' | 'shield' | 'medal'; color: string }> = {
  1: { name: 'crown', color: '#E1AD01' },
  2: { name: 'shield', color: '#9E9E9E' },
  3: { name: 'medal', color: '#C77B3D' },
};

function RankBadge({ rank }: { rank: number }) {
  const meta = RANK_ICON[rank];
  if (!meta) {
    return (
      <Typography sx={{ fontSize: 13, color: 'text.secondary', fontWeight: 600, fontVariantNumeric: 'tabular-nums', pl: 0.5 }}>
        {String(rank).padStart(2, '0')}
      </Typography>
    );
  }
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 26, height: 26 }}>
      <Icon name={meta.name} size="sm" weight="fill" color={meta.color} />
    </Box>
  );
}

function MetricBar({ label, value, pct, color }: { label: string; value: string; pct: string; color: string }) {
  return (
    <Box sx={{ width: 78 }}>
      <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 700, display: 'block', mb: 0.4 }}>
        {label} · {value}
      </Typography>
      <LinearProgress
        variant="determinate"
        value={parseFloat(pct)}
        sx={{
          height: 5,
          borderRadius: 3,
          bgcolor: 'action.hover',
          '& .MuiLinearProgress-bar': { bgcolor: color, borderRadius: 3 },
        }}
      />
    </Box>
  );
}

interface RankingsTableProps {
  rows: AgentRow[];
  isEng: boolean;
}

export function RankingsTable({ rows, isEng }: RankingsTableProps) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const theme = useTheme();

  return (
    <Box sx={{ border: 1, borderColor: 'divider', borderRadius: 2, overflow: 'hidden' }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '54px 1fr 300px 130px',
          px: 3,
          py: 1.25,
          fontSize: 11,
          letterSpacing: '.07em',
          fontWeight: 700,
          color: 'text.secondary',
          borderBottom: 1,
          borderColor: 'divider',
          bgcolor: 'background.default',
        }}
      >
        <div>RANK</div>
        <div>AGENT</div>
        <div style={{ textAlign: 'right' }}>{isEng ? 'TIME · DAYS · FOCUS' : 'INTERACTIONS EVALUATED'}</div>
        <div style={{ textAlign: 'right' }}>{isEng ? 'COMPOSITE' : 'AVG QP'}</div>
      </Box>

      {rows.map((row) => {
        const key = `${row.name}::${isEng ? 'eng' : 'qual'}`;
        const isOpen = expanded === key;
        return (
          <Accordion
            key={key}
            expanded={isOpen}
            onChange={() => setExpanded((prev) => (prev === key ? null : key))}
            disableGutters
            square
            elevation={0}
            sx={{
              '&:before': { display: 'none' },
              borderBottom: 1,
              borderColor: 'divider',
              bgcolor: row.isYou ? 'primary.50' : row.isTarget ? 'error.50' : 'background.paper',
              boxShadow: row.isYou
                ? `inset 4px 0 0 ${theme.palette.primary.main}`
                : row.isTarget
                  ? `inset 4px 0 0 ${theme.palette.error.light}`
                  : 'none',
              '&:last-of-type': { borderBottom: 0 },
            }}
          >
            <AccordionSummary
              sx={{
                px: 3,
                py: 0.5,
                '& .MuiAccordionSummary-content': {
                  display: 'grid',
                  gridTemplateColumns: '54px 1fr 300px 130px',
                  alignItems: 'center',
                  m: 0,
                  width: '100%',
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <RankBadge rank={row.rank} />
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.4, minWidth: 0 }}>
                <Avatar sx={{ bgcolor: row.avatarBg, width: 34, height: 34, fontSize: 12.5, fontWeight: 700 }}>{row.initials}</Avatar>
                <Box sx={{ minWidth: 0 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, flexWrap: 'wrap' }}>
                    <Typography sx={{ fontSize: 14, fontWeight: 650 }}>{row.name}</Typography>
                    {row.isYou && (
                      <Chip label="You" size="small" sx={{ height: 18, fontSize: 10, fontWeight: 800, bgcolor: 'text.primary', color: 'background.paper' }} />
                    )}
                    {row.badge && (
                      <Chip
                        variant="tonal"
                        color={row.badgeColor}
                        size="small"
                        label={row.badge}
                        sx={{ height: 20, fontSize: 10.5, fontWeight: 700 }}
                      />
                    )}
                    {row.isTarget && (
                      <Chip
                        variant="tonal"
                        color="error"
                        size="small"
                        icon={<Icon name="target" size="xs" weight="bold" />}
                        label={`${row.targetGapPts} ahead`}
                        sx={{ height: 20, fontSize: 10, fontWeight: 700 }}
                      />
                    )}
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.25 }}>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      {row.team}
                    </Typography>
                    {row.streak && (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3 }}>
                        <Icon name="fire" size="xs" weight="fill" color={theme.palette.warning.main} />
                        <Typography variant="caption" sx={{ color: 'warning.dark', fontWeight: 600 }}>
                          {row.streak} streak
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {isEng ? (
                  <Box sx={{ display: 'flex', gap: 1.25 }}>
                    <MetricBar label="T" value={row.tVal} pct={row.t} color="grey.500" />
                    <MetricBar label="D" value={row.dVal} pct={row.d} color="success.main" />
                    <MetricBar label="F" value={row.fVal} pct={row.f} color="warning.main" />
                  </Box>
                ) : (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {row.interactions} evaluated
                    </Typography>
                    <Box sx={{ width: 150 }}>
                      <LinearProgress
                        variant="determinate"
                        value={parseFloat(row.score)}
                        sx={{ height: 6, borderRadius: 3, bgcolor: 'action.hover', '& .MuiLinearProgress-bar': { bgcolor: 'primary.main', borderRadius: 3 } }}
                      />
                    </Box>
                  </Box>
                )}
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'flex-end' }}>
                <Box sx={{ textAlign: 'right' }}>
                  <Typography sx={{ fontSize: 17, fontWeight: 750, fontVariantNumeric: 'tabular-nums' }}>{row.score}</Typography>
                  <Typography sx={{ fontSize: 11.5, fontWeight: 650, color: row.deltaColor, fontVariantNumeric: 'tabular-nums' }}>{row.delta}</Typography>
                </Box>
                <Icon
                  name="caret-down"
                  size="xs"
                  color={theme.palette.text.secondary}
                  style={{ transition: 'transform .28s cubic-bezier(.4,0,.2,1)', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                />
              </Box>
            </AccordionSummary>

            <AccordionDetails sx={{ px: 3, pb: 2, pt: 0.5, bgcolor: 'background.default' }}>
              <Box sx={{ pl: '78px' }}>
                <AgentDetailPanel row={row} />
                <AgentDetailFooter row={row} />
              </Box>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Box>
  );
}
