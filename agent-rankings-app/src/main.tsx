import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ExotelThemeProvider } from '@exotel-npm-dev/signal-design-system'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ExotelThemeProvider defaultMode="light">
      <App />
    </ExotelThemeProvider>
  </StrictMode>,
)
