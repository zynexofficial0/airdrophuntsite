'use client';

import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import type { Airdrop } from '@/types';
import { AirdropCard } from '@/components/airdrops/airdrop-card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const statusFilters = ['all', 'live', 'upcoming', 'ended', 'pending'] as const;

export function AirdropsBrowser({
  airdrops,
  chains,
  categories,
}: {
  airdrops: Airdrop[];
  chains: string[];
  categories: string[];
}) {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<string>('all');
  const [chain, setChain] = useState<string>('all');
  const [category, setCategory] = useState<string>('all');
  const [visible, setVisible] = useState(9);

  const filtered = useMemo(() => {
    return airdrops.filter((a) => {
      const matchesQuery =
        !query ||
        a.project_name.toLowerCase().includes(query.toLowerCase()) ||
        a.short_description.toLowerCase().includes(query.toLowerCase());
      const matchesStatus = status === 'all' || a.status === status;
      const matchesChain = chain === 'all' || a.chain === chain;
      const matchesCategory = category === 'all' || a.category === category;
      return matchesQuery && matchesStatus && matchesChain && matchesCategory;
    });
  }, [airdrops, query, status, chain, category]);

  const resetFilters = () => {
    setQuery('');
    setStatus('all');
    setChain('all');
    setCategory('all');
    setVisible(9);
  };

  return (
    <div>
      {/* Search + filters */}
      <div className="glass rounded-xl p-4 mb-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search airdrops..."
            className="pl-10 bg-secondary border-border"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mr-1">
            <SlidersHorizontal className="w-3.5 h-3.5" /> Status:
          </div>
          {statusFilters.map((s) => (
            <button
              key={s}
              onClick={() => { setStatus(s); setVisible(9); }}
              className={cn(
                'px-3 py-1 rounded-full text-xs font-medium capitalize transition-colors border',
                status === s
                  ? 'gradient-green text-black border-transparent'
                  : 'glass text-muted-foreground border-border hover:text-foreground'
              )}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-muted-foreground mr-1">Chain:</span>
          <button
            onClick={() => { setChain('all'); setVisible(9); }}
            className={cn(
              'px-3 py-1 rounded-full text-xs font-medium transition-colors border',
              chain === 'all' ? 'gradient-green text-black border-transparent' : 'glass text-muted-foreground border-border hover:text-foreground'
            )}
          >
            All
          </button>
          {chains.map((c) => (
            <button
              key={c}
              onClick={() => { setChain(c); setVisible(9); }}
              className={cn(
                'px-3 py-1 rounded-full text-xs font-medium transition-colors border',
                chain === c ? 'gradient-green text-black border-transparent' : 'glass text-muted-foreground border-border hover:text-foreground'
              )}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-muted-foreground mr-1">Category:</span>
          <button
            onClick={() => { setCategory('all'); setVisible(9); }}
            className={cn(
              'px-3 py-1 rounded-full text-xs font-medium transition-colors border',
              category === 'all' ? 'gradient-green text-black border-transparent' : 'glass text-muted-foreground border-border hover:text-foreground'
            )}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => { setCategory(c); setVisible(9); }}
              className={cn(
                'px-3 py-1 rounded-full text-xs font-medium transition-colors border',
                category === c ? 'gradient-green text-black border-transparent' : 'glass text-muted-foreground border-border hover:text-foreground'
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4 text-sm text-muted-foreground">
        Showing {filtered.length} airdrop{filtered.length !== 1 ? 's' : ''}
        {(query || status !== 'all' || chain !== 'all' || category !== 'all') && (
          <button onClick={resetFilters} className="ml-2 text-primary hover:underline">
            Clear filters
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="glass rounded-xl p-12 text-center">
          <p className="text-muted-foreground mb-2">No airdrops match your filters.</p>
          <Button variant="outline" onClick={resetFilters} className="border-primary/40 text-primary">
            Reset Filters
          </Button>
        </div>
      ) : (
        <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.slice(0, visible).map((a) => (
              <AirdropCard key={a.id} airdrop={a} featured={a.featured} />
            ))}
          </div>
          {visible < filtered.length && (
            <div className="text-center mt-8">
              <Button
                onClick={() => setVisible((v) => v + 6)}
                variant="outline"
                className="border-primary/40 text-primary hover:bg-primary/10"
              >
                Load More
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
