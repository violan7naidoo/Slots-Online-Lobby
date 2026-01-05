# Game on Studios - Lobby

A modular game lobby system that serves as the entry point for all slot games. The lobby displays available games and allows players to launch games in new windows.

## Features

- **Modular Configuration**: Games are configured via JSON file - no code changes needed
- **Responsive Design**: Works on desktop and mobile devices
- **Game Management**: Easy to add, remove, or disable games
- **Modern UI**: Beautiful card-based layout with hover effects

## Port Configuration

- **Lobby**: Port 3000 (default Next.js)
- **FrontEnd (Game 1 - Frosty Fortunes)**: Port 3001
- **FrontEnd5x3 (Game 2 - Example 5x3)**: Port 3002

## Getting Started

### Install Dependencies

```bash
cd Lobby
npm install
```

### Run Development Server

```bash
npm run dev
```

The lobby will be available at `http://localhost:3000`

## Adding a New Game

To add a new game to the lobby:

1. Open `public/config/games.json`
2. Add a new game object to the `games` array:

```json
{
  "id": 6,
  "name": "Your Game Name",
  "gameId": "YourGameId",
  "frontendUrl": "http://localhost:3003",
  "thumbnail": "/images/games/your-game.jpg",
  "description": "Your game description",
  "enabled": true
}
```

3. Add a thumbnail image to `public/images/games/your-game.jpg`
4. Configure your game frontend to run on the specified port
5. Restart the lobby

## Game Configuration Structure

Each game in `games.json` has the following properties:

- **id**: Unique identifier (number)
- **name**: Display name of the game
- **gameId**: Backend game identifier (must match backend config)
- **frontendUrl**: URL where the game frontend is running
- **thumbnail**: Path to thumbnail image (relative to public folder)
- **description**: Short description shown on the game card
- **enabled**: Whether the game is available (false shows "Coming Soon")

## Disabling a Game

Set `"enabled": false` in the game configuration. The game will show a "Coming Soon" overlay.

## Project Structure

```
Lobby/
├── public/
│   ├── config/
│   │   └── games.json          # Game configuration
│   └── images/
│       └── games/               # Game thumbnails
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Main lobby page
│   │   └── globals.css         # Global styles
│   ├── components/
│   │   └── lobby/
│   │       ├── game-card.tsx   # Individual game card
│   │       └── game-grid.tsx   # Grid of game cards
│   ├── hooks/
│   │   └── use-games.tsx       # Hook to load games config
│   └── lib/
│       ├── game-navigation.ts  # Game launch logic
│       └── utils.ts            # Utility functions
└── package.json
```

## Running All Services

To run the complete system:

1. **Backend API Service**: `cd BackEnd/SnowKingdomBackendAPI/SnowKingdomBackendAPI.ApiService && dotnet run`
2. **RGS Service**: `cd BackEnd/SnowKingdomBackendAPI/SnowKingdomBackendAPI.RGS && dotnet run`
3. **Game 1 (Frosty Fortunes)**: `cd FrontEnd && npm run dev`
4. **Game 2 (Example 5x3)**: `cd FrontEnd5x3 && npm run dev`
5. **Lobby**: `cd Lobby && npm run dev`

## Notes

- Games open in new browser tabs/windows when clicked
- The lobby remains accessible in the original tab
- Game URLs can include query parameters (e.g., `?gameId=Example5x3`)
- Thumbnail images should be optimized for web (recommended: 800x450px)

