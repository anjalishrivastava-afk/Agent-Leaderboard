import { Avatar, Box, Chip, Icon, LinearProgress, Typography, useTheme } from '@exotel-npm-dev/signal-design-system';
import type { AgentRow } from '../data';
import { DIMENSION_LABEL, periodPhrase, type Period } from '../dashboardMeta';
import { ScoreHistoryChart } from './ScoreHistoryChart';

interface MetricTileProps {
  icon: 'clock' | 'calendar-blank' | 'target';
  label: string;
  weight: string;
  value: string;
  pctile: string;
}

function MetricTile({ icon, label, weight, value, pctile }: MetricTileProps) {
  const pct = Math.max(0, Math.min(100, parseFloat(pctile) || 0));
  return (
    <Box sx={{ bgcolor: 'action.hover', borderRadius: 2, px: 2, py: 1.75, flex: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
          <Icon name={icon} size="xs" />
          <Typography variant="body2">{label}</Typography>
        </Box>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          weight {weight}
        </Typography>
      </Box>
      <Typography sx={{ fontSize: 26, fontWeight: 700, mt: 0.75, fontVariantNumeric: 'tabular-nums' }}>{value}</Typography>
      <LinearProgress
        variant="determinate"
        value={pct}
        sx={{ height: 6, borderRadius: 3, mt: 1, bgcolor: 'divider', '& .MuiLinearProgress-bar': { bgcolor: 'primary.main', borderRadius: 3 } }}
      />
      <Typography variant="caption" sx={{ color: 'text.secondary', mt: 0.75, display: 'block' }}>
        {ordinal(pct)} percentile
      </Typography>
    </Box>
  );
}

function ordinal(n: number): string {
  const r = Math.round(n);
  const mod100 = r % 100;
  if (mod100 >= 11 && mod100 <= 13) return `${r}th`;
  switch (r % 10) {
    case 1:
      return `${r}st`;
    case 2:
      return `${r}nd`;
    case 3:
      return `${r}rd`;
    default:
      return `${r}th`;
  }
}

interface AgentDetailPanelProps {
  row: AgentRow;
  isEng: boolean;
  period: Period;
  totalRanked: number;
  target?: AgentRow;
}

export function AgentDetailPanel({ row, isEng, period, totalRanked, target }: AgentDetailPanelProps) {
  const theme = useTheme();
  const latest = row.history[row.history.length - 1];
  const deltaPts = +(latest - row.history[0]).toFixed(1);
  const deltaPositive = deltaPts >= 0;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {DIMENSION_LABEL[isEng ? 'engagement' : 'quality']} · {periodPhrase(period)}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mt: 0.5 }}>
            <Typography sx={{ fontSize: 44, fontWeight: 700, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{row.score}</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.4 }}>
              <Icon
                name={deltaPositive ? 'arrow-up-right' : 'arrow-down-right'}
                size="xs"
                weight="bold"
                color={deltaPositive ? theme.palette.success.main : theme.palette.error.main}
              />
              <Typography sx={{ fontWeight: 650, color: deltaPositive ? 'success.main' : 'error.main' }}>
                {Math.abs(deltaPts).toFixed(1)} pts
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ textAlign: 'center' }}>
            <Chip
              label={
                <Box sx={{ textAlign: 'center', py: 0.25 }}>
                  <Typography variant="caption" sx={{ display: 'block', fontWeight: 700, letterSpacing: '.06em' }}>
                    RANK
                  </Typography>
                  <Typography sx={{ fontSize: 20, fontWeight: 700, lineHeight: 1.2 }}>#{row.rank}</Typography>
                </Box>
              }
              color="primary"
              variant="tonal"
              sx={{ height: 'auto', borderRadius: 2, px: 1.5, py: 1, '& .MuiChip-label': { px: 0 } }}
            />
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="caption" sx={{ color: 'text.secondary', letterSpacing: '.06em' }}>
              OF
            </Typography>
            <Typography sx={{ fontSize: 20, fontWeight: 700, lineHeight: 1.2 }}>{totalRanked}</Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', gap: 1.5 }}>
        {isEng ? (
          <>
            <MetricTile icon="clock" label="Time spent" weight="0.30" value={row.tVal} pctile={row.t} />
            <MetricTile icon="calendar-blank" label="Days active" weight="0.25" value={row.dVal} pctile={row.d} />
            <MetricTile icon="target" label="Focus ratio" weight="0.45" value={row.f} pctile={row.fPctile} />
          </>
        ) : (
          <MetricTile icon="target" label="Evaluated interactions" weight="1.00" value={row.interactions} pctile={row.score} />
        )}
      </Box>

      <ScoreHistoryChart history={row.history} latestScore={row.score} />

      {target && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            bgcolor: 'primary.50',
            borderRadius: 2,
            px: 2,
            py: 1.5,
          }}
        >
          <Avatar sx={{ bgcolor: target.avatarBg, width: 36, height: 36, fontSize: 13, fontWeight: 700 }}>{target.initials}</Avatar>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography sx={{ fontWeight: 650 }}>
              {target.name} <Box component="span" sx={{ color: 'text.secondary', fontWeight: 400 }}>· rank #{target.rank}, one ahead</Box>
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.25 }}>
              <Icon name="flag" size="xs" weight="fill" color={theme.palette.primary.main} />
              <Typography variant="body2" sx={{ color: 'primary.dark' }}>
                {(target.scoreValue - row.scoreValue).toFixed(1)} pts ahead — close the gap {periodPhrase(period)}
              </Typography>
            </Box>
          </Box>
          <Typography sx={{ fontSize: 22, fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{target.score}</Typography>
        </Box>
      )}
    </Box>
  );
}
