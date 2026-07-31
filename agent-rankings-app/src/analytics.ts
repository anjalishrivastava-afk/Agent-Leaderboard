/**
 * Lightweight stand-in for the Amplitude SDK. Fires structured events with
 * the same shape a real `amplitude.track(name, properties)` call would use,
 * so call-sites don't change when this is swapped for the real SDK — only
 * this function's body does.
 */
export function trackEvent(name: string, properties: Record<string, unknown> = {}): void {
  // eslint-disable-next-line no-console
  console.info(`[analytics] ${name}`, { ...properties, timestamp: new Date().toISOString() });
}
