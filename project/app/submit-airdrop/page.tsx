import type { Metadata } from 'next';
import { SubmitAirdropForm } from '@/components/forms/submit-airdrop-form';

export const metadata: Metadata = {
  title: 'Submit Airdrop — Airdrop Hunt',
  description: 'Submit a new crypto airdrop opportunity to the Airdrop Hunt community.',
};

export default function SubmitAirdropPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-10 max-w-2xl mx-auto">
        <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-3">
          Submit an <span className="gradient-green-text">Airdrop</span>
        </h1>
        <p className="text-muted-foreground">
          List a new airdrop opportunity for the community. Add project details, logo, and participation steps. Your submission will be reviewed before going live.
        </p>
      </div>
      <SubmitAirdropForm />
    </div>
  );
}
