'use client';

import { useEffect, useState } from 'react';
import { Game, launchGame } from '@/lib/game-navigation';

interface GameLoadingModalProps {
  game: Game;
  onClose: () => void;
}

type Status = 'connecting' | 'ready' | 'timeout';

const THUNDER_PHARAOH_ID = 8;
const TP_WARMUP_MS = 35_000;
const GLOBAL_TIMEOUT_MS = 60_000;

export function GameLoadingModal({ game, onClose }: GameLoadingModalProps) {
  const [status, setStatus] = useState<Status>('connecting');

  useEffect(() => {
    const isTP = game.id === THUNDER_PHARAOH_ID;
    const serviceUrl = isTP
      ? process.env.NEXT_PUBLIC_TP_API_URL
      : process.env.NEXT_PUBLIC_RGS_URL;

    // Local dev — ready immediately
    if (!serviceUrl || serviceUrl.includes('localhost')) {
      setStatus('ready');
      return;
    }

    const controller = new AbortController();

    if (isTP) {
      // TP API has no lobby CORS — fire no-cors wakeup and use a timer
      fetch(`${serviceUrl}/health`, { mode: 'no-cors', cache: 'no-store' }).catch(() => {});
      const timer = setTimeout(() => setStatus('ready'), TP_WARMUP_MS);
      return () => clearTimeout(timer);
    }

    // RGS-backed games — proper health check with CORS
    fetch(`${serviceUrl}/health`, { signal: controller.signal, cache: 'no-store' })
      .then(res => { if (!controller.signal.aborted) setStatus(res.ok ? 'ready' : 'timeout'); })
      .catch(() => { if (!controller.signal.aborted) setStatus('timeout'); });

    const fallback = setTimeout(() => {
      controller.abort();
      setStatus('ready'); // Optimistically let the user try after 60s
    }, GLOBAL_TIMEOUT_MS);

    return () => {
      clearTimeout(fallback);
      controller.abort();
    };
  }, [game.id]);

  const handleStart = () => {
    launchGame(game);
    onClose();
  };

  const isTP = game.id === THUNDER_PHARAOH_ID;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative text-center px-8 py-12 max-w-lg w-full">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors text-sm tracking-widest"
        >
          ✕ CANCEL
        </button>

        {/* Game name */}
        <h2 className="text-5xl font-headline font-bold text-foreground mb-2 tracking-wider">
          {game.name.toUpperCase()}
        </h2>

        {/* Divider */}
        <div className="w-48 h-px bg-primary/40 mx-auto mb-8" />

        {status === 'connecting' && (
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-3 text-muted-foreground">
              <div className="w-4 h-4 rounded-full border-2 border-primary border-t-transparent animate-spin flex-shrink-0" />
              <span className="text-sm tracking-widest uppercase">
                {isTP ? 'Entering the tomb...' : 'Connecting to server...'}
              </span>
            </div>
            <p className="text-xs text-muted-foreground/50 tracking-wide">
              Game services are warming up — this takes ~30 seconds on first visit
            </p>
          </div>
        )}

        {status === 'timeout' && (
          <div className="space-y-6">
            <p className="text-sm text-amber-400 tracking-wide">
              Taking longer than expected — you can still try entering
            </p>
            <button
              onClick={handleStart}
              className="px-12 py-4 bg-primary text-primary-foreground rounded font-bold text-lg tracking-widest uppercase hover:bg-primary/90 transition-all hover:scale-105 shadow-lg shadow-primary/20"
            >
              ▶ &nbsp;START
            </button>
          </div>
        )}

        {status === 'ready' && (
          <div className="space-y-6">
            <p className="text-sm text-muted-foreground tracking-widest uppercase">
              Ready to play
            </p>
            <button
              onClick={handleStart}
              className="px-12 py-4 bg-primary text-primary-foreground rounded font-bold text-lg tracking-widest uppercase hover:bg-primary/90 transition-all hover:scale-105 shadow-lg shadow-primary/20"
            >
              ▶ &nbsp;START
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
