export interface Game {
  id: number;
  name: string;
  gameId: string | null;
  frontendUrl: string | null;
  thumbnail: string;
  description: string;
  enabled: boolean;
}

/**
 * Navigate to a game by opening it in a new window/tab
 */
export function launchGame(game: Game): void {
  if (!game.enabled || !game.frontendUrl) {
    console.warn(`Game "${game.name}" is not available`);
    return;
  }

  // Open game in new window/tab
  const gameUrl = game.gameId 
    ? `${game.frontendUrl}?gameId=${game.gameId}`
    : game.frontendUrl;
  
  window.open(gameUrl, '_blank', 'noopener,noreferrer');
}

/**
 * Navigate to a game in the same window
 */
export function navigateToGame(game: Game): void {
  if (!game.enabled || !game.frontendUrl) {
    console.warn(`Game "${game.name}" is not available`);
    return;
  }

  const gameUrl = game.gameId 
    ? `${game.frontendUrl}?gameId=${game.gameId}`
    : game.frontendUrl;
  
  window.location.href = gameUrl;
}

