import { useMemo, useState } from 'react';
import { Box, Typography, useTheme } from '@exotel-npm-dev/signal-design-system';

const WEEKS = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8'];
const VB_W = 1000;
const VB_H = 90;
const PAD_Y = 10;

interface Point {
  x: number;
  y: number;
}

function buildPoints(history: number[]): Point[] {
  const min = Math.min(...history);
  const max = Math.max(...history);
  const span = max - min || 1;
  return history.map((v, i) => ({
    x: +((i * (VB_W / (history.length - 1))).toFixed(1)),
    y: +((VB_H - PAD_Y - ((v - min) / span) * (VB_H - PAD_Y * 2)).toFixed(1)),
  }));
}

interface ScoreHistoryChartProps {
  history: number[];
  latestScore: string;
}

export function ScoreHistoryChart({ history, latestScore }: ScoreHistoryChartProps) {
  const theme = useTheme();
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  const pts = useMemo(() => buildPoints(history), [history]);
  const linePoints = pts.map((p) => `${p.x},${p.y}`).join(' ');
  const areaPath = `M${pts.map((p) => `${p.x},${p.y}`).join(' L')} L${VB_W},${VB_H} L0,${VB_H} Z`;
  const last = pts[pts.length - 1];

  const deltaPts = +(history[history.length - 1] - history[0]).toFixed(1);
  const deltaColor = deltaPts > 0 ? theme.palette.success.main : deltaPts < 0 ? theme.palette.error.main : theme.palette.text.secondary;
  const deltaLabel = `${deltaPts >= 0 ? '+' : ''}${deltaPts.toFixed(1)} pts`;

  const hover = hoverIdx != null ? pts[hoverIdx] : null;

  const onMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const idx = Math.round(relX * (history.length - 1));
    setHoverIdx((prev) => (prev === idx ? prev : idx));
  };

  return (
    <Box
      sx={{
        flex: 1,
        minWidth: 0,
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.paper',
        border: 1,
        borderColor: 'divider',
        borderRadius: 2,
        p: 2.25,
        transition: 'box-shadow .15s',
        '&:hover': { boxShadow: 2 },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flex: '0 0 auto' }}>
        <Typography variant="overline" sx={{ color: 'text.secondary', letterSpacing: '.07em', fontWeight: 700 }}>
          Score History · 8 Weeks
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Latest:{' '}
          <Box component="strong" sx={{ color: 'primary.main' }}>
            {latestScore}
          </Box>{' '}
          <Box component="span" sx={{ color: deltaColor, fontWeight: 650 }}>
            {deltaLabel}
          </Box>
        </Typography>
      </Box>

      <Box
        onMouseMove={onMove}
        onMouseLeave={() => setHoverIdx(null)}
        sx={{ position: 'relative', flex: '1 1 auto', minHeight: 130, mt: 1.5, cursor: 'crosshair' }}
      >
        <svg viewBox={`0 0 ${VB_W} ${VB_H}`} style={{ width: '100%', height: '100%', display: 'block', overflow: 'visible' }} preserveAspectRatio="none">
          <path d={areaPath} fill={theme.palette.primary.light ?? '#ECEEF9'} opacity={0.35} stroke="none" />
          <polyline points={linePoints} fill="none" stroke={theme.palette.primary.main} strokeWidth={2.5} />
          {pts.slice(0, -1).map((p, idx) => (
            <circle key={idx} cx={p.x} cy={p.y} r={3} fill={theme.palette.primary.main} opacity={hoverIdx === idx ? 0 : 0.35} />
          ))}
          <circle cx={last.x} cy={last.y} r={4.5} fill={theme.palette.primary.main} stroke={theme.palette.background.paper} strokeWidth={2} />
          {hover && (
            <>
              <line x1={hover.x} x2={hover.x} y1={0} y2={VB_H} stroke={theme.palette.text.disabled} strokeWidth={1.2} strokeDasharray="3,3" />
              <circle cx={hover.x} cy={hover.y} r={5.5} fill={theme.palette.text.primary} stroke={theme.palette.background.paper} strokeWidth={2} />
            </>
          )}
        </svg>

        {hover && hoverIdx != null && (
          <Box
            sx={{
              position: 'absolute',
              pointerEvents: 'none',
              left: `${(hover.x / VB_W) * 100}%`,
              top: `${(hover.y / VB_H) * 100}%`,
              transform: 'translate(-50%, -128%)',
              bgcolor: 'background.paper',
              border: 1,
              borderColor: 'divider',
              borderRadius: 2,
              px: 1.5,
              py: 1,
              boxShadow: 4,
              whiteSpace: 'nowrap',
              zIndex: 3,
            }}
          >
            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 700, display: 'block' }}>
              {WEEKS[hoverIdx]}
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 700, color: 'text.primary' }}>
              {history[hoverIdx].toFixed(1)} <Box component="span" sx={{ fontSize: 11, fontWeight: 600, color: 'text.secondary' }}>pts</Box>
            </Typography>
          </Box>
        )}
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.75, flex: '0 0 auto' }}>
        {WEEKS.map((w) => (
          <Typography key={w} variant="caption" sx={{ color: 'text.secondary' }}>
            {w}
          </Typography>
        ))}
      </Box>
    </Box>
  );
}
