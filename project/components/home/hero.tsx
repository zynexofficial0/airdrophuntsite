'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, FileText, Rocket, Search, Users, Sparkles, Gift, BookOpen, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Hero({ stats }: { stats: { airdrops: number; articles: number; active: number } }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute top-1/4 -left-20 w-72 h-72 rounded-full bg-emerald-500/20 blur-[100px] animate-float-slow" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-emerald-600/15 blur-[120px] animate-float" />

      <div className="container mx-auto px-4 py-20 md:py-28 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-medium text-primary mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              Community-Powered Web3 Discovery
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-6">
              Airdrop Hunt —{' '}
              <span className="gradient-green-text">Discover the Best Crypto Airdrops</span>, Guides, and Web3 Opportunities
            </h1>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8 max-w-xl">
              Track promising airdrops, read expert crypto guides, and submit your own articles or airdrop opportunities on Airdrop Hunt — a premium community-powered Web3 discovery platform.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild className="gradient-green text-black font-semibold border-0 glow-green-sm hover:opacity-90">
                <Link href="/airdrops">Explore Airdrops <ArrowRight className="w-4 h-4" /></Link>
              </Button>
              <Button asChild variant="outline" className="border-primary/40 text-primary hover:bg-primary/10">
                <Link href="/articles">Read Articles</Link>
              </Button>
              <Button asChild variant="ghost" className="text-foreground hover:bg-secondary">
                <Link href="/submit-airdrop"><Rocket className="w-4 h-4" /> Submit Airdrop</Link>
              </Button>
              <Button asChild variant="ghost" className="text-foreground hover:bg-secondary">
                <Link href="/submit-article"><FileText className="w-4 h-4" /> Submit Article</Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block h-[420px] perspective"
          >
            <Hero3DVisual />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16"
        >
          {[
            { label: 'Airdrops Tracked', value: stats.airdrops, icon: Gift },
            { label: 'Articles Published', value: stats.articles, icon: BookOpen },
            { label: 'Active Opportunities', value: stats.active, icon: Rocket },
            { label: 'Community Submissions', value: stats.airdrops + stats.articles, icon: Users },
          ].map((stat) => (
            <div key={stat.label} className="glass rounded-xl p-5 text-center">
              <stat.icon className="w-5 h-5 text-primary mx-auto mb-2" />
              <div className="text-2xl md:text-3xl font-bold gradient-green-text">{stat.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Hero3DVisual() {
  return (
    <div className="relative w-full h-full preserve-3d">
      {/* Central glowing orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full gradient-green blur-2xl opacity-40 animate-pulse-glow" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full gradient-green glow-green flex items-center justify-center">
        <Rocket className="w-14 h-14 text-black" />
      </div>

      {/* Floating cubes */}
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-8 left-8 w-20 h-20 rounded-2xl glass-strong border-primary/40 glow-green-sm flex items-center justify-center"
      >
        <Gift className="w-9 h-9 text-primary" />
      </motion.div>

      <motion.div
        animate={{ y: [0, 25, 0], rotate: [0, -8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute top-12 right-4 w-24 h-24 rounded-2xl glass-strong border-primary/30 flex items-center justify-center"
      >
        <BookOpen className="w-10 h-10 text-primary" />
      </motion.div>

      <motion.div
        animate={{ y: [0, -18, 0], x: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="absolute bottom-8 left-12 w-20 h-20 rounded-2xl glass-strong border-primary/40 glow-green-sm flex items-center justify-center"
      >
        <Search className="w-9 h-9 text-primary" />
      </motion.div>

      <motion.div
        animate={{ y: [0, 20, 0], rotate: [0, 12, 0] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        className="absolute bottom-12 right-10 w-20 h-20 rounded-2xl glass-strong border-primary/30 flex items-center justify-center"
      >
        <ShieldCheck className="w-9 h-9 text-primary" />
      </motion.div>

      {/* Orbiting ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full border border-primary/20 animate-spin-slow" />
    </div>
  );
}
