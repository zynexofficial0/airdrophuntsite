import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, User, Calendar } from 'lucide-react';
import type { Article } from '@/types';
import { TiltCard } from '@/components/shared/tilt-card';
import { cn } from '@/lib/utils';

export function ArticleCard({ article, featured = false }: { article: Article; featured?: boolean }) {
  return (
    <TiltCard
      glow={featured}
      className={cn('group h-full flex flex-col', featured && 'border-primary/40')}
    >
      <Link href={`/articles/${article.slug}`} className="block">
        <div className="relative w-full aspect-[16/9] overflow-hidden rounded-t-xl bg-secondary">
          <Image
            src={article.article_logo_url}
            alt={article.article_title}
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          <span className="absolute top-3 left-3 px-2 py-0.5 rounded-md text-[10px] font-semibold glass text-primary border-primary/30">
            {article.category}
          </span>
        </div>
      </Link>
      <div className="p-5 flex flex-col flex-1">
        <Link href={`/articles/${article.slug}`}>
          <h3 className="font-semibold text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors mb-2">
            {article.article_title}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
          {article.excerpt}
        </p>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <User className="w-3.5 h-3.5" />
            {article.author}
          </span>
          <Link
            href={`/articles/${article.slug}`}
            className="inline-flex items-center gap-1 text-primary font-medium hover:gap-1.5 transition-all"
          >
            Read More <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </TiltCard>
  );
}
