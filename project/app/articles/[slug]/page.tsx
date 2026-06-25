import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, User, Calendar, Twitter, Send, Link2, Share2 } from 'lucide-react';
import { getArticleBySlug, getRelatedArticles } from '@/lib/queries';
import { ArticleCard } from '@/components/articles/article-card';
import { ArticleShareButtons } from '@/components/articles/article-share-buttons';

export const revalidate = 60;

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug);
  if (!article) return { title: 'Article Not Found' };
  return {
    title: `${article.article_title} — Airdrop Hunt`,
    description: article.excerpt,
    openGraph: { title: article.article_title, description: article.excerpt, images: [article.article_logo_url] },
  };
}

export default async function ArticleDetailPage({ params }: { params: { slug: string } }) {
  const article = await getArticleBySlug(params.slug);
  if (!article) notFound();

  const related = await getRelatedArticles(article.category, article.id, 3);
  const dateStr = new Date(article.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Link href="/articles" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Articles
      </Link>

      <article>
        {/* Header */}
        <div className="mb-8">
          <span className="inline-block px-3 py-1 rounded-md text-xs font-semibold glass text-primary border-primary/30 mb-4">
            {article.category}
          </span>
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.15] tracking-tight mb-4">
            {article.article_title}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">{article.excerpt}</p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-primary" /> {article.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-primary" /> {dateStr}
            </span>
          </div>
        </div>

        {/* Featured image */}
        <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-border/60 mb-8 bg-secondary">
          <Image
            src={article.article_logo_url}
            alt={article.article_title}
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-cover"
            priority
          />
        </div>

        {/* Content */}
        <div className="article-content">
          <ArticleContent content={article.article_content} />
        </div>

        {/* Tags */}
        {article.tags && (
          <div className="mt-8 flex flex-wrap gap-2">
            {article.tags.split(',').map((tag) => (
              <span key={tag} className="px-2.5 py-1 rounded-md text-xs font-medium bg-secondary text-muted-foreground border border-border/40">
                #{tag.trim()}
              </span>
            ))}
          </div>
        )}

        {/* Share */}
        <div className="mt-8 pt-6 border-t border-border/40 flex items-center gap-3">
          <span className="text-sm text-muted-foreground flex items-center gap-1.5">
            <Share2 className="w-4 h-4" /> Share:
          </span>
          <ArticleShareButtons title={article.article_title} />
        </div>
      </article>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="font-display text-2xl font-bold mb-6">Related Articles</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {related.map((a) => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function ArticleContent({ content }: { content: string }) {
  const blocks = content.split('\n');
  return (
    <div className="prose prose-invert max-w-none">
      {blocks.map((block, i) => {
        const trimmed = block.trim();
        if (!trimmed) return <div key={i} className="h-4" />;
        if (trimmed.startsWith('## ')) {
          return <h2 key={i} className="font-display text-xl md:text-2xl font-bold mt-8 mb-3 text-foreground">{trimmed.slice(3)}</h2>;
        }
        if (trimmed.startsWith('# ')) {
          return <h1 key={i} className="font-display text-2xl md:text-3xl font-bold mt-8 mb-3 text-foreground">{trimmed.slice(2)}</h1>;
        }
        if (/^\d+\.\s/.test(trimmed)) {
          return <li key={i} className="text-muted-foreground leading-relaxed ml-6 list-decimal mb-2">{trimmed.replace(/^\d+\.\s/, '')}</li>;
        }
        if (trimmed.startsWith('- ')) {
          return <li key={i} className="text-muted-foreground leading-relaxed ml-6 list-disc mb-2">{trimmed.slice(2)}</li>;
        }
        if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
          return <p key={i} className="font-semibold text-foreground mt-4 mb-2">{trimmed.slice(2, -2)}</p>;
        }
        return <p key={i} className="text-muted-foreground leading-relaxed mb-4">{trimmed}</p>;
      })}
    </div>
  );
}
