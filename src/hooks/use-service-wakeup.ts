'use client';

import { useState, useEffect } from 'react';

export type WakeupStatus = 'idle' | 'waking' | 'ready' | 'timeout';

// Ping a service that has CORS enabled — reads the response to confirm it's healthy
async function pingHealth(url: string, signal: AbortSignal): Promise<boolean> {
  try {
    const res = await fetch(`${url}/health`, { signal, cache: 'no-store' });
    return res.ok;
  } catch {
    return false;
  }
}

// Wake a service that has no browser CORS (server-side only) — fires the request but ignores the response
async function fireWakeup(url: string): Promise<void> {
  try {
    await fetch(`${url}/health`, { mode: 'no-cors', cache: 'no-store' });
  } catch {
    // Ignore — the request was still sent, which wakes the service
  }
}

export function useServiceWakeup() {
  const [status, setStatus] = useState<WakeupStatus>('idle');

  useEffect(() => {
    const rgsUrl = process.env.NEXT_PUBLIC_RGS_URL;
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const rngUrl = process.env.NEXT_PUBLIC_RNG_URL;

    // Skip wakeup in local dev
    if (!rgsUrl || rgsUrl.includes('localhost')) {
      setStatus('ready');
      return;
    }

    setStatus('waking');

    const controller = new AbortController();

    // Fire RNG wakeup immediately (no-cors — no response needed, just wakes it)
    if (rngUrl) fireWakeup(rngUrl);

    // Ping RGS and API with CORS — wait for both to confirm healthy
    const readableUrls = [rgsUrl, apiUrl].filter((u): u is string => Boolean(u));

    Promise.all(readableUrls.map(url => pingHealth(url, controller.signal))).then(results => {
      if (!controller.signal.aborted) {
        setStatus(results.every(Boolean) ? 'ready' : 'timeout');
      }
    });

    // Give up after 90 seconds
    const timer = setTimeout(() => {
      controller.abort();
      setStatus('timeout');
    }, 90_000);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, []);

  return { status, isWaking: status === 'waking' };
}
