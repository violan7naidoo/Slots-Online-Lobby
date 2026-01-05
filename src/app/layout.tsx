import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Violan Naidoo Demo Games - Full-Stack Gaming Platform',
  description: 'Enterprise-grade gaming platform showcasing microservices architecture, C# .NET backend, Next.js frontend, and scalable system design',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=PT+Sans:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased" suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
}

