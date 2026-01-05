'use client';

import { useGames } from '@/hooks/use-games';
import { GameGrid } from '@/components/lobby/game-grid';

export default function LobbyPage() {
  const { games, loading, error } = useGames();

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-headline font-bold text-foreground mb-4">
            Game on Studios
          </h1>
          <p className="text-xl text-muted-foreground">
            Choose your game and start playing
          </p>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-destructive/10 border border-destructive text-destructive px-4 py-3 rounded-lg mb-6">
            <p>Error loading games: {error}</p>
          </div>
        )}

        {/* Games Grid */}
        <GameGrid games={games} loading={loading} />
      </div>
    </main>
  );
}

