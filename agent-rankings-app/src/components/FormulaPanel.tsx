import { Fragment } from 'react';
import { Box, Typography } from '@exotel-npm-dev/signal-design-system';
import { FORMULA } from '../dashboardMeta';

export function FormulaPanel({ isEng }: { isEng: boolean }) {
  const meta = FORMULA[isEng ? 'engagement' : 'quality'];
  return (
    <Box sx={{ px: 3, py: 2, bgcolor: 'background.default', borderBottom: 1, borderColor: 'divider' }}>
      <Typography variant="body2" sx={{ fontWeight: 700, mb: 1 }}>
        {meta.title}
      </Typography>
      <Box
        component="code"
        sx={{
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
          fontSize: 12.5,
          bgcolor: 'background.paper',
          border: 1,
          borderColor: 'divider',
          borderRadius: 2,
          px: 1.5,
          py: 1.25,
          display: 'inline-block',
        }}
      >
        {meta.expr}
      </Box>
      <Box sx={{ display: 'grid', gridTemplateColumns: '150px 70px 1fr', gap: '6px 14px', mt: 1.75, maxWidth: 780 }}>
        <Typography variant="overline" sx={{ color: 'text.secondary', fontWeight: 700 }}>
          Dimension
        </Typography>
        <Typography variant="overline" sx={{ color: 'text.secondary', fontWeight: 700 }}>
          Weight
        </Typography>
        <Typography variant="overline" sx={{ color: 'text.secondary', fontWeight: 700 }}>
          Definition
        </Typography>
        {meta.rows.map((r) => (
          <Fragment key={r.dim}>
            <Typography variant="body2" sx={{ fontWeight: 650 }}>
              {r.dim}
            </Typography>
            <Typography variant="body2" sx={{ fontVariantNumeric: 'tabular-nums' }}>
              {r.weight}
            </Typography>
            <Typography variant="body2">{r.def}</Typography>
          </Fragment>
        ))}
      </Box>
    </Box>
  );
}
