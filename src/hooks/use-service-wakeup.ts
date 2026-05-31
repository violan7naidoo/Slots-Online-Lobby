'use client';

import { useEffect } from 'react';

// Silently wake all backend services when the lobby loads.
// No UI feedback here — the per-game loading modal handles that.
async function fireWakeup(url: string): Promise<void> {
  try {
    await fetch(`${url}/health`, { mode: 'no-cors', cache: 'no-store' });
  } catch { /* ignore */ }
}

export function useServiceWakeup(): void {
  useEffect(() => {
    const rgsUrl  = process.env.NEXT_PUBLIC_RGS_URL;
    const apiUrl  = process.env.NEXT_PUBLIC_API_URL;
    const rngUrl  = process.env.NEXT_PUBLIC_RNG_URL;
    const tpUrl   = process.env.NEXT_PUBLIC_TP_API_URL;

    if (!rgsUrl || rgsUrl.includes('localhost')) return;

    [rgsUrl, apiUrl, rngUrl, tpUrl]
      .filter((u): u is string => Boolean(u))
      .forEach(url => fireWakeup(url));
  }, []);
}
