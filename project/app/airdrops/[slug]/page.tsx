import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Globe, Twitter, Send, MessageCircle, Gift, Calendar, User, ListChecks, AlertTriangle } from 'lucide-react';
import { getAirdropBySlug, getRelatedAirdrops } from '@/lib/queries';
import { StatusBadge } from '@/components/shared/status-badge';
import { AirdropCard } from '@/components/airdrops/airdrop-card';
import { Button } from '@/components/ui/button';

export const revalidate = 60;

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const airdrop = await getAirdropBySlug(params.slug);
  if (!airdrop) return { title: 'Airdrop Not Found' };
  return {
    title: `${airdrop.project_name} Airdrop — Airdrop Hunt`,
    description: airdrop.short_description,
    openGraph: { title: airdrop.project_name, description: airdrop.short_description, images: [airdrop.logo_url] },
  };
}

export default async function AirdropDetailPage({ params }: { params: { slug: string } }) {
  const airdrop = await getAirdropBySlug(params.slug);
  if (!airdrop) notFound();

  const related = await getRelatedAirdrops(airdrop.category, airdrop.id, 3);

  const socials = [
    { url: airdrop.website_url, icon: Globe, label: 'Website' },
    { url: airdrop.twitter_url, icon: Twitter, label: 'Twitter' },
    { url: airdrop.telegram_url, icon: Send, label: 'Telegram' },
    { url: airdrop.discord_url, icon: MessageCircle, label: 'Discord' },
  ].filter((s) => s.url);

  return (
    <div className="container mx-auto px-4 py-12">
      <Link href="/airdrops" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Airdrops
      </Link>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Header */}
          <div className="glass-strong rounded-2xl p-6 md:p-8">
            <div className="flex flex-col sm:flex-row items-start gap-5">
              <div className="relative w-24 h-24 rounded-2xl overflow-hidden border border-border/60 shrink-0 bg-secondary">
                <Image src={airdrop.logo_url} alt={airdrop.project_name} fill sizes="96px" className="object-cover" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <h1 className="font-display text-2xl md:text-3xl font-bold">{airdrop.project_name}</h1>
                  <StatusBadge status={airdrop.status} />
                  {airdrop.featured && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold gradient-green text-black">FEATURED</span>
                  )}
                </div>
                <p className="text-muted-foreground mb-4">{airdrop.short_description}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-secondary text-muted-foreground border border-border/40">{airdrop.category}</span>
                  <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-secondary text-muted-foreground border border-border/40">{airdrop.chain}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Full description */}
          <div className="glass rounded-2xl p-6 md:p-8">
            <h2 className="font-display text-xl font-bold mb-4">About this Airdrop</h2>
            <div className="prose-content text-muted-foreground leading-relaxed whitespace-pre-line">
              {airdrop.full_description}
            </div>
          </div>

          {/* Participation steps */}
          <div className="glass rounded-2xl p-6 md:p-8">
            <h2 className="font-display text-xl font-bold mb-4 flex items-center gap-2">
              <ListChecks className="w-5 h-5 text-primary" /> Participation Steps
            </h2>
            <div className="whitespace-pre-line text-muted-foreground leading-relaxed">
              {airdrop.participation_steps}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="glass rounded-2xl p-6 border-amber-500/20">
            <div className="flex gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-amber-400 mb-1">Disclaimer</h3>
                <p className="text-sm text-muted-foreground">
                  This airdrop information is community-submitted and not financial advice. Always verify through official channels and do your own research before participating. Never share your seed phrase or private keys.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="glass-strong rounded-2xl p-6 sticky top-20">
            <h3 className="font-semibold mb-4">Airdrop Details</h3>
            <dl className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground flex items-center gap-1.5"><Gift className="w-4 h-4" /> Reward</dt>
                <dd className="font-medium text-right">{airdrop.reward_info}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground flex items-center gap-1.5"><Calendar className="w-4 h-4" /> Start</dt>
                <dd className="font-medium">{airdrop.start_date || 'TBD'}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground flex items-center gap-1.5"><Calendar className="w-4 h-4" /> End</dt>
                <dd className="font-medium">{airdrop.end_date || 'TBD'}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground flex items-center gap-1.5"><User className="w-4 h-4" /> Submitter</dt>
                <dd className="font-medium">{airdrop.submitter_name}</dd>
              </div>
            </dl>

            {socials.length > 0 && (
              <div className="mt-6 pt-6 border-t border-border/40">
                <h4 className="text-sm font-semibold mb-3">Official Links</h4>
                <div className="flex flex-wrap gap-2">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.url as string}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-lg glass flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
                      title={s.label}
                    >
                      <s.icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {airdrop.website_url && (
              <Button asChild className="w-full mt-6 gradient-green text-black font-semibold border-0 glow-green-sm">
                <a href={airdrop.website_url} target="_blank" rel="noopener noreferrer">
                  <Globe className="w-4 h-4" /> Visit Project
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="font-display text-2xl font-bold mb-6">Related Airdrops</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {related.map((a) => (
              <AirdropCard key={a.id} airdrop={a} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
