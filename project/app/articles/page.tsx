import type { Metadata } from 'next';
import { getLatestArticles } from '@/lib/queries';
import { ArticlesBrowser } from '@/components/articles/articles-browser';

export const metadata: Metadata = {
  title: 'Articles — Airdrop Hunt',
  description: 'Browse crypto guides, analysis, and airdrop news articles.',
};

export const revalidate = 60;

export default async function ArticlesPage() {
  const articles = await getLatestArticles(50);
  const categories = Array.from(new Set(articles.map((a) => a.category)));

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-2">
          Latest <span className="gradient-green-text">Articles</span>
        </h1>
        <p className="text-muted-foreground">
          Crypto guides, analysis, and airdrop news from the community.
        </p>
      </div>
      <ArticlesBrowser articles={articles} categories={categories} />
    </div>
  );
}
