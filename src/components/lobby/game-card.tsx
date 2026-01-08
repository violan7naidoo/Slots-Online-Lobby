'use client';

import Image from 'next/image';
import { Game, launchGame } from '@/lib/game-navigation';
import { cn } from '@/lib/utils';
import { Play } from 'lucide-react';

interface GameCardProps {
  game: Game;
}

export function GameCard({ game }: GameCardProps) {
  const isEnabled = game.enabled && game.frontendUrl;

  const handleClick = () => {
    if (isEnabled) {
      launchGame(game);
    }
  };

  return (
    <div
      className={cn(
        'relative group cursor-pointer rounded-lg overflow-hidden',
        'bg-card border border-border shadow-lg',
        'transition-all duration-300',
        isEnabled
          ? 'hover:scale-105 hover:shadow-2xl'
          : 'cursor-not-allowed'
      )}
      onClick={handleClick}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 overflow-hidden">
        {game.thumbnail && game.thumbnail !== '/images/games/coming-soon.jpg' ? (
          <Image
            src={game.thumbnail}
            alt={game.name}
            fill
            className="object-cover"
            unoptimized
            onError={(e) => {
              // Fallback to gradient if image fails to load
              e.currentTarget.style.display = 'none';
            }}
          />
        ) : null}
        {/* Gradient background (shown when no image or image fails) */}
        <div className={`absolute inset-0 bg-gradient-to-br from-primary/40 via-secondary/30 to-accent/20 flex items-center justify-center ${!isEnabled ? 'bg-black/30' : ''}`}>
          {isEnabled ? (
            <div className="text-center">
              <Play className="w-16 h-16 text-primary-foreground/80 mx-auto mb-2" />
              <p className="text-sm font-semibold text-foreground">{game.name}</p>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-2xl font-bold text-white/90 mb-2">Coming Soon</p>
              <p className="text-sm text-white/70">Stay tuned!</p>
            </div>
          )}
        </div>

        {/* Play button overlay for enabled games */}
        {isEnabled && (
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-primary text-primary-foreground rounded-full p-4">
                <Play className="w-8 h-8 fill-current" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Game Info */}
      <div className="p-4">
        <h3 className="text-xl font-bold text-foreground mb-1">{game.name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {game.description}
        </p>
      </div>
    </div>
  );
}

