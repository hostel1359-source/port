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
  metadataBase: new URL('https://www.manvesh.space'),
  title: 'Manvesh \u2014 Developer Portfolio',
  description:
    'Step into Manvesh\u2019s pencil-drawn portfolio. Explore a moving 3D world of AI systems, blockchain tools, projects, and curious experiments.',
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/icon.svg',
  },
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
    title: 'Manvesh \u2014 Developer Portfolio',
    description:
      'Step inside a pencil-drawn world and explore Manvesh\u2019s projects, tools, and story.',
    url: 'https://www.manvesh.space/',
    siteName: 'Manvesh Portfolio',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary',
    title: 'Manvesh \u2014 Developer Portfolio',
    description:
      'Step inside a pencil-drawn world and explore Manvesh\u2019s projects, tools, and story.',
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
        <meta name="theme-color" content="#f5f0eb" />
      </head>
      <body className="bg-paper text-ink font-display antialiased">
        {children}
      </body>
    </html>
  );
}
