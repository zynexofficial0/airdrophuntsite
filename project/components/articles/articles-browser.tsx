'use client';

import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import type { Article } from '@/types';
import { ArticleCard } from '@/components/articles/article-card';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export function ArticlesBrowser({
  articles,
  categories,
}: {
  articles: Article[];
  categories: string[];
}) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState<'latest' | 'featured'>('latest');
  const [visible, setVisible] = useState(9);

  const filtered = useMemo(() => {
    let result = articles.filter((a) => {
      const matchesQuery =
        !query ||
        a.article_title.toLowerCase().includes(query.toLowerCase()) ||
        a.excerpt.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category === 'all' || a.category === category;
      return matchesQuery && matchesCategory;
    });
    if (sort === 'featured') {
      result = [...result].sort((a, b) => Number(b.featured) - Number(a.featured));
    }
    return result;
  }, [articles, query, category, sort]);

  return (
    <div>
      <div className="glass rounded-xl p-4 mb-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles..."
            className="pl-10 bg-secondary border-border"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-muted-foreground mr-1">Category:</span>
          <button
            onClick={() => setCategory('all')}
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
              onClick={() => setCategory(c)}
              className={cn(
                'px-3 py-1 rounded-full text-xs font-medium transition-colors border',
                category === c ? 'gradient-green text-black border-transparent' : 'glass text-muted-foreground border-border hover:text-foreground'
              )}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground mr-1">Sort:</span>
          {(['latest', 'featured'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setSort(s)}
              className={cn(
                'px-3 py-1 rounded-full text-xs font-medium capitalize transition-colors border',
                sort === s ? 'gradient-green text-black border-transparent' : 'glass text-muted-foreground border-border hover:text-foreground'
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4 text-sm text-muted-foreground">
        Showing {filtered.length} article{filtered.length !== 1 ? 's' : ''}
      </div>

      {filtered.length === 0 ? (
        <div className="glass rounded-xl p-12 text-center">
          <p className="text-muted-foreground">No articles match your search.</p>
        </div>
      ) : (
        <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.slice(0, visible).map((a) => (
              <ArticleCard key={a.id} article={a} featured={a.featured} />
            ))}
          </div>
          {visible < filtered.length && (
            <div className="text-center mt-8">
              <button
                onClick={() => setVisible((v) => v + 6)}
                className="px-6 py-2.5 rounded-lg text-sm font-medium border border-primary/40 text-primary hover:bg-primary/10 transition-colors"
              >
                Load More
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
