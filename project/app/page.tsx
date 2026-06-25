import Link from 'next/link';
import { ArrowRight, FileText, Rocket, Gift, BookOpen, Users, ShieldCheck, Search, Send, Sparkles } from 'lucide-react';
import { Hero } from '@/components/home/hero';
import { AirdropCard } from '@/components/airdrops/airdrop-card';
import { ArticleCard } from '@/components/articles/article-card';
import { Button } from '@/components/ui/button';
import {
  getFeaturedAirdrops,
  getFeaturedArticles,
  getStats,
} from '@/lib/queries';

export const revalidate = 60;

export default async function Home() {
  const [stats, featuredAirdrops, featuredArticles] = await Promise.all([
    getStats(),
    getFeaturedAirdrops(4),
    getFeaturedArticles(3),
  ]);

  return (
    <>
      <Hero stats={stats} />

      {/* Featured Airdrops */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-primary mb-2">
              <Gift className="w-4 h-4" /> FEATURED AIRDROPS
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
              Top Airdrop Opportunities
            </h2>
          </div>
          <Button asChild variant="ghost" className="text-primary hover:bg-primary/10 hidden sm:flex">
            <Link href="/airdrops">View All <ArrowRight className="w-4 h-4" /></Link>
          </Button>
        </div>
        {featuredAirdrops.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredAirdrops.map((a) => (
              <AirdropCard key={a.id} airdrop={a} featured />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No featured airdrops yet.</p>
        )}
      </section>

      {/* Latest Articles */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-primary mb-2">
              <BookOpen className="w-4 h-4" /> LATEST ARTICLES
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
              Crypto Guides & News
            </h2>
          </div>
          <Button asChild variant="ghost" className="text-primary hover:bg-primary/10 hidden sm:flex">
            <Link href="/articles">View All <ArrowRight className="w-4 h-4" /></Link>
          </Button>
        </div>
        {featuredArticles.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredArticles.map((a) => (
              <ArticleCard key={a.id} article={a} featured />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No articles yet.</p>
        )}
      </section>

      {/* Why Use Airdrop Hunt */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-primary mb-2">
            <Sparkles className="w-4 h-4" /> WHY AIRDROP HUNT
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
            Your Gateway to Web3 Opportunities
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { icon: Search, title: 'Discover New Airdrops', desc: 'Browse curated airdrop campaigns across chains with detailed participation guides.' },
            { icon: BookOpen, title: 'Read Crypto Guides', desc: 'Expert articles and analysis to help you navigate the Web3 landscape confidently.' },
            { icon: Users, title: 'Community Submissions', desc: 'Anyone can submit airdrops and articles. Community-powered, always fresh.' },
            { icon: ShieldCheck, title: 'Trusted Web3 Discovery', desc: 'Verified listings with clear status tracking and transparent reward info.' },
          ].map((f) => (
            <div key={f.title} className="glass rounded-xl p-6 hover:border-primary/40 transition-colors group">
              <div className="w-12 h-12 rounded-xl gradient-green flex items-center justify-center mb-4 group-hover:glow-green-sm transition-shadow">
                <f.icon className="w-6 h-6 text-black" />
              </div>
              <h3 className="font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Submit CTA */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-6">
          <SubmitCTACard
            icon={FileText}
            title="Submit an Article"
            desc="Share your crypto knowledge with the community. Write guides, analysis, or news."
            href="/submit-article"
            cta="Submit Article"
          />
          <SubmitCTACard
            icon={Rocket}
            title="Submit an Airdrop"
            desc="List a new airdrop opportunity. Add project details, logo, and participation steps."
            href="/submit-airdrop"
            cta="Submit Airdrop"
          />
        </div>
      </section>

      {/* Top Projects / Ecosystem Logos */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight mb-2">
            Tracking Top Ecosystems
          </h2>
          <p className="text-sm text-muted-foreground">Airdrops across the biggest networks in crypto</p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
          {['Ethereum', 'Solana', 'Arbitrum', 'Optimism', 'Polygon', 'Avalanche', 'Base', 'BNB Chain'].map((name) => (
            <div
              key={name}
              className="glass rounded-xl px-6 py-4 text-center hover:border-primary/40 transition-colors"
            >
              <span className="font-display font-semibold text-muted-foreground hover:text-primary transition-colors">
                {name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="container mx-auto px-4 py-16">
        <div className="relative glass-strong rounded-2xl p-8 md:p-12 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-emerald-500/20 blur-[80px]" />
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-2">
                Never Miss an Airdrop
              </h2>
              <p className="text-muted-foreground max-w-md">
                Join the Airdrop Hunt community and stay ahead of the latest Web3 opportunities.
              </p>
            </div>
            <div className="flex w-full md:w-auto gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 md:w-64 px-4 py-2.5 rounded-lg bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
              />
              <Button className="gradient-green text-black font-semibold border-0 glow-green-sm shrink-0">
                <Send className="w-4 h-4" /> Join
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function SubmitCTACard({
  icon: Icon,
  title,
  desc,
  href,
  cta,
}: {
  icon: typeof FileText;
  title: string;
  desc: string;
  href: string;
  cta: string;
}) {
  return (
    <Link
      href={href}
      className="group relative glass rounded-2xl p-8 hover:border-primary/40 transition-colors overflow-hidden"
    >
      <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-emerald-500/10 blur-[60px] group-hover:bg-emerald-500/20 transition-colors" />
      <div className="relative">
        <div className="w-14 h-14 rounded-xl gradient-green flex items-center justify-center mb-5 group-hover:glow-green-sm transition-shadow">
          <Icon className="w-7 h-7 text-black" />
        </div>
        <h3 className="font-display text-xl font-bold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-5">{desc}</p>
        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2.5 transition-all">
          {cta} <ArrowRight className="w-4 h-4" />
        </span>
      </div>
    </Link>
  );
}

