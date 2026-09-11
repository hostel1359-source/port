import type { Metadata } from 'next';
import { Space_Grotesk, JetBrains_Mono, Gloria_Hallelujah, Caveat } from 'next/font/google';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

const gloriaHallelujah = Gloria_Hallelujah({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-gloria',
  display: 'swap',
});

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-caveat',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Manvesh — Developer Portfolio',
  description:
    'Passionate developer building AI systems, blockchain tools, and high-performance applications. Explore the void station.',
  keywords: [
    'developer',
    'portfolio',
    'Manvesh',
    'mnvvshu',
    'full-stack',
    'AI',
    'blockchain',
    'TypeScript',
    'Python',
  ],
  authors: [{ name: 'Manvesh', url: 'https://github.com/mnvvshu' }],
  openGraph: {
    title: 'Manvesh — Developer Portfolio',
    description:
      'Passionate developer building AI systems, blockchain tools, and high-performance applications.',
    url: 'https://manvesh.dev',
    siteName: 'Manvesh Portfolio',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Manvesh — Developer Portfolio',
    description:
      'Passionate developer building AI systems, blockchain tools, and high-performance applications.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${gloriaHallelujah.variable} ${caveat.variable}`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="theme-color" content="#f5f0eb" />
      </head>
      <body className="bg-paper text-ink font-display antialiased">
        {children}
      </body>
    </html>
  );
}
