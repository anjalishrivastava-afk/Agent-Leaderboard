import { useMemo, useState } from 'react';
import { Box, Typography, useTheme } from '@exotel-npm-dev/signal-design-system';

const WEEKS = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8'];
const VB_W = 1000;
const VB_H = 220;
const PAD_Y = 14;

interface Point {
  x: number;
  y: number;
}

function buildPoints(history: number[], min: number, max: number): Point[] {
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

  const min = Math.min(...history);
  const max = Math.max(...history);
  const mid = (min + max) / 2;
  const pts = useMemo(() => buildPoints(history, min, max), [history, min, max]);
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

  const yTicks = [max, mid, min];
  const yTickPositions = [PAD_Y, VB_H / 2, VB_H - PAD_Y];

  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        border: 1,
        borderColor: 'divider',
        borderRadius: 2,
        p: 1.5,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="caption" sx={{ color: 'text.secondary', letterSpacing: '.06em', fontWeight: 600, textTransform: 'uppercase', fontSize: 10.5 }}>
          Score history · 8 weeks
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          Latest: <Box component="strong" sx={{ color: 'primary.main' }}>{latestScore}</Box>{' '}
          <Box component="span" sx={{ color: deltaColor, fontWeight: 650 }}>
            {deltaLabel}
          </Box>
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: 0.75, mt: 1 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: 130, py: `${PAD_Y}px`, flex: '0 0 auto' }}>
          {yTicks.map((t, i) => (
            <Typography key={i} variant="caption" sx={{ color: 'text.secondary', lineHeight: 1, fontSize: 10.5 }}>
              {Math.round(t)}
            </Typography>
          ))}
        </Box>

        <Box onMouseMove={onMove} onMouseLeave={() => setHoverIdx(null)} sx={{ position: 'relative', flex: 1, height: 130, cursor: 'crosshair' }}>
          <svg viewBox={`0 0 ${VB_W} ${VB_H}`} style={{ width: '100%', height: '100%', display: 'block', overflow: 'visible' }} preserveAspectRatio="none">
            {yTickPositions.map((y, i) => (
              <line key={i} x1={0} x2={VB_W} y1={y} y2={y} stroke={theme.palette.divider} strokeWidth={1} strokeDasharray="4,4" />
            ))}
            <path d={areaPath} fill={theme.palette.primary.main} opacity={0.12} stroke="none" />
            <polyline points={linePoints} fill="none" stroke={theme.palette.primary.main} strokeWidth={2.5} />
            {pts.slice(0, -1).map((p, idx) => (
              <circle key={idx} cx={p.x} cy={p.y} r={4} fill={theme.palette.primary.main} opacity={hoverIdx === idx ? 0 : 0.7} />
            ))}
            <circle cx={last.x} cy={last.y} r={5} fill={theme.palette.primary.main} stroke={theme.palette.background.paper} strokeWidth={2} />
            {hover && (
              <>
                <line x1={hover.x} x2={hover.x} y1={0} y2={VB_H} stroke={theme.palette.text.disabled} strokeWidth={1.2} strokeDasharray="3,3" />
                <circle cx={hover.x} cy={hover.y} r={6} fill={theme.palette.text.primary} stroke={theme.palette.background.paper} strokeWidth={2} />
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
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.75, pl: 3.5 }}>
        {WEEKS.map((w) => (
          <Typography key={w} variant="caption" sx={{ color: 'text.secondary', fontSize: 10.5 }}>
            {w}
          </Typography>
        ))}
      </Box>
      <Typography variant="caption" sx={{ display: 'block', textAlign: 'right', color: 'text.disabled', mt: 0.25, fontSize: 10 }}>
        Each bar = 1 calendar week
      </Typography>
    </Box>
  );
}
