'use client';

import { useState, useEffect } from 'react';

export type WakeupStatus = 'idle' | 'waking' | 'ready' | 'timeout';

async function pingHealth(url: string, signal: AbortSignal): Promise<boolean> {
  try {
    const res = await fetch(`${url}/health`, { signal, cache: 'no-store' });
    return res.ok;
  } catch {
    return false;
  }
}

export function useServiceWakeup() {
  const [status, setStatus] = useState<WakeupStatus>('idle');

  useEffect(() => {
    const rgsUrl = process.env.NEXT_PUBLIC_RGS_URL;
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    // Skip wakeup in local dev
    if (!rgsUrl || rgsUrl.includes('localhost')) {
      setStatus('ready');
      return;
    }

    setStatus('waking');

    const controller = new AbortController();

    const urls = [rgsUrl, apiUrl].filter((u): u is string => Boolean(u));

    Promise.all(urls.map(url => pingHealth(url, controller.signal))).then(results => {
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
