'use client';

import { useState, useEffect } from 'react';
import { Game } from '@/lib/game-navigation';

interface GamesConfig {
  games: Game[];
}

export function useGames() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadGames() {
      try {
        setLoading(true);
        const response = await fetch('/config/games.json');
        if (!response.ok) {
          throw new Error('Failed to load games configuration');
        }
        const data: GamesConfig = await response.json();
        
        // Override frontend URLs with environment variables if available
        const gamesWithEnvUrls = data.games.map(game => {
          let frontendUrl = game.frontendUrl;
          
          // Override with environment variables based on game ID
          if (game.id === 1 && process.env.NEXT_PUBLIC_GAME_1_URL) {
            frontendUrl = process.env.NEXT_PUBLIC_GAME_1_URL;
          } else if (game.id === 2 && process.env.NEXT_PUBLIC_GAME_2_URL) {
            frontendUrl = process.env.NEXT_PUBLIC_GAME_2_URL;
          } else if (game.id === 3 && process.env.NEXT_PUBLIC_GAME_3_URL) {
            frontendUrl = process.env.NEXT_PUBLIC_GAME_3_URL;
          } else if (game.id === 4 && process.env.NEXT_PUBLIC_GAME_4_URL) {
            frontendUrl = process.env.NEXT_PUBLIC_GAME_4_URL;
          } else if (game.id === 8 && process.env.NEXT_PUBLIC_THUNDER_PHARAOH_URL) {
            frontendUrl = process.env.NEXT_PUBLIC_THUNDER_PHARAOH_URL;
          }
          
          return {
            ...game,
            frontendUrl
          };
        });
        
        setGames(gamesWithEnvUrls);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        console.error('Error loading games:', err);
      } finally {
        setLoading(false);
      }
    }

    loadGames();
  }, []);

  return { games, loading, error };
}

