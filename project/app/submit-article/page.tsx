import type { Metadata } from 'next';
import { SubmitArticleForm } from '@/components/forms/submit-article-form';

export const metadata: Metadata = {
  title: 'Submit Article — Airdrop Hunt',
  description: 'Submit your crypto article, guide, or analysis to the Airdrop Hunt community.',
};

export default function SubmitArticlePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-10 max-w-2xl mx-auto">
        <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-3">
          Submit an <span className="gradient-green-text">Article</span>
        </h1>
        <p className="text-muted-foreground">
          Share your crypto knowledge with the community. Write guides, analysis, or news. Your submission will be reviewed before publishing.
        </p>
      </div>
      <SubmitArticleForm />
    </div>
  );
}
