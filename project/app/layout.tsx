import './globals.css';
import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-display' });

export const metadata: Metadata = {
  title: 'Airdrop Hunt — Discover the Best Crypto Airdrops, Guides, and Web3 Opportunities',
  description:
    'Track promising airdrops, read expert crypto guides, and submit your own articles or airdrop opportunities on Airdrop Hunt — a premium community-powered Web3 discovery platform.',
  openGraph: {
    title: 'Airdrop Hunt',
    description: 'Discover the Best Crypto Airdrops, Guides, and Web3 Opportunities',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: 'hsl(150 25% 6%)',
              border: '1px solid hsl(150 25% 20%)',
              color: 'hsl(150 20% 96%)',
            },
          }}
        />
      </body>
    </html>
  );
}
