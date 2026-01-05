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
            Violan Naidoo Demo Games
          </h1>
          <p className="text-xl text-muted-foreground mb-6 max-w-3xl mx-auto">
            Full-Stack Gaming Platform Showcase
          </p>
          
          {/* Technical Overview */}
          <div className="max-w-4xl mx-auto mt-8 p-6 bg-card/50 border border-border rounded-lg backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-foreground mb-4">Architecture & Technology Stack</h2>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Backend Architecture</h3>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  <li>• <strong className="text-foreground">Microservices:</strong> RGS, Backend API, RNG Service</li>
                  <li>• <strong className="text-foreground">C# / .NET 8.0:</strong> ASP.NET Core Minimal APIs</li>
                  <li>• <strong className="text-foreground">RESTful APIs:</strong> Stateless, scalable endpoints</li>
                  <li>• <strong className="text-foreground">WebSockets / SignalR:</strong> Real-time communication</li>
                  <li>• <strong className="text-foreground">SQLite / SQL Server:</strong> Data persistence</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Frontend & Infrastructure</h3>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  <li>• <strong className="text-foreground">Next.js 15:</strong> React Server Components</li>
                  <li>• <strong className="text-foreground">TypeScript:</strong> Type-safe development</li>
                  <li>• <strong className="text-foreground">Docker:</strong> Containerized deployments</li>
                  <li>• <strong className="text-foreground">Railway.app:</strong> Backend hosting</li>
                  <li>• <strong className="text-foreground">Vercel:</strong> Frontend hosting & CDN</li>
                </ul>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground leading-relaxed">
                This platform demonstrates enterprise-grade gaming system architecture with separation of concerns, 
                dedicated RNG (Random Number Generator) service for compliance, and scalable microservices design. 
                Each game frontend communicates with the RGS (Remote Gaming Server), which orchestrates game logic 
                through the Backend API and ensures fair play via the dedicated RNG service. Built with production-ready 
                practices including environment-based configuration, CORS management, and comprehensive error handling.
              </p>
            </div>
          </div>
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

