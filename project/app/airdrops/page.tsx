import type { Metadata } from 'next';
import { getLatestAirdrops } from '@/lib/queries';
import { AirdropsBrowser } from '@/components/airdrops/airdrops-browser';

export const metadata: Metadata = {
  title: 'Airdrops — Airdrop Hunt',
  description: 'Browse all listed crypto airdrops. Filter by status, chain, and category.',
};

export const revalidate = 60;

export default async function AirdropsPage() {
  const airdrops = await getLatestAirdrops(50);
  const chains = Array.from(new Set(airdrops.map((a) => a.chain)));
  const categories = Array.from(new Set(airdrops.map((a) => a.category)));

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-2">
          Explore <span className="gradient-green-text">Airdrops</span>
        </h1>
        <p className="text-muted-foreground">
          Browse {airdrops.length} airdrop opportunities across chains. Filter by status, category, or chain.
        </p>
      </div>
      <AirdropsBrowser airdrops={airdrops} chains={chains} categories={categories} />
    </div>
  );
}
