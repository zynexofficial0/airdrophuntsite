'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Loader2, FileText, CheckCircle2 } from 'lucide-react';
import { getBrowserSupabase } from '@/lib/supabase/client';
import { slugify, ensureUniqueSlug } from '@/lib/utils/slug';
import { ImageUpload } from '@/components/forms/image-upload';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

const schema = z.object({
  article_title: z.string().min(5, 'Title must be at least 5 characters'),
  excerpt: z.string().min(10, 'Excerpt must be at least 10 characters'),
  author: z.string().min(2, 'Author name is required'),
  category: z.string().min(1, 'Please select a category'),
  article_content: z.string().min(50, 'Content must be at least 50 characters'),
  tags: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const categories = ['Guides', 'News', 'Analysis', 'Airdrops', 'DeFi', 'NFT', 'Gaming'];

export function SubmitArticleForm() {
  const [logoUrl, setLogoUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    if (!logoUrl) {
      toast.error('Please upload an article logo / thumbnail image.');
      return;
    }
    setSubmitting(true);
    try {
      const supabase = getBrowserSupabase();
      const baseSlug = slugify(data.article_title);
      const slug = ensureUniqueSlug(baseSlug);

      const { error } = await supabase.from('submitted_articles').insert({
        article_title: data.article_title,
        excerpt: data.excerpt,
        author: data.author,
        category: data.category,
        article_content: data.article_content,
        article_logo_url: logoUrl,
        tags: data.tags || null,
        status: 'pending',
        featured: false,
        slug,
      } as never);

      if (error) throw error;

      toast.success('Your article has been submitted successfully.');
      setSuccess(true);
      reset();
      setLogoUrl('');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Submission failed';
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="glass-strong rounded-2xl p-8 md:p-12 text-center max-w-xl mx-auto">
        <div className="w-16 h-16 rounded-full gradient-green flex items-center justify-center mx-auto mb-5 glow-green">
          <CheckCircle2 className="w-8 h-8 text-black" />
        </div>
        <h2 className="font-display text-2xl font-bold mb-2">Article Submitted!</h2>
        <p className="text-muted-foreground mb-6">
          Your article has been submitted successfully. It will be reviewed by our team before going live.
        </p>
        <div className="flex gap-3 justify-center">
          <Button
            onClick={() => setSuccess(false)}
            variant="outline"
            className="border-primary/40 text-primary"
          >
            Submit Another
          </Button>
          <Button asChild className="gradient-green text-black font-semibold border-0">
            <a href="/articles">Browse Articles</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl mx-auto">
      <div className="glass-strong rounded-2xl p-6 md:p-8 space-y-5">
        <div className="flex items-center gap-2 mb-2">
          <FileText className="w-5 h-5 text-primary" />
          <h2 className="font-display text-xl font-bold">Article Details</h2>
        </div>

        <div>
          <Label htmlFor="article_title">Article Title <span className="text-primary">*</span></Label>
          <Input id="article_title" {...register('article_title')} placeholder="The Ultimate Guide to..." className="mt-1.5 bg-secondary border-border" />
          {errors.article_title && <p className="text-xs text-red-400 mt-1">{errors.article_title.message}</p>}
        </div>

        <div>
          <Label htmlFor="excerpt">Excerpt <span className="text-primary">*</span></Label>
          <Textarea id="excerpt" {...register('excerpt')} placeholder="A short summary of your article..." className="mt-1.5 bg-secondary border-border min-h-[80px]" />
          {errors.excerpt && <p className="text-xs text-red-400 mt-1">{errors.excerpt.message}</p>}
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="author">Author <span className="text-primary">*</span></Label>
            <Input id="author" {...register('author')} placeholder="Your name" className="mt-1.5 bg-secondary border-border" />
            {errors.author && <p className="text-xs text-red-400 mt-1">{errors.author.message}</p>}
          </div>
          <div>
            <Label htmlFor="category">Category <span className="text-primary">*</span></Label>
            <select
              id="category"
              {...register('category')}
              className="mt-1.5 w-full h-10 rounded-md bg-secondary border border-border px-3 text-sm text-foreground focus:outline-none focus:border-primary/50"
            >
              <option value="">Select category</option>
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            {errors.category && <p className="text-xs text-red-400 mt-1">{errors.category.message}</p>}
          </div>
        </div>

        <div>
          <Label htmlFor="article_content">Article Content <span className="text-primary">*</span></Label>
          <Textarea id="article_content" {...register('article_content')} placeholder="Write your article here. Use ## for headings and - for bullet points." className="mt-1.5 bg-secondary border-border min-h-[240px] font-mono text-sm" />
          {errors.article_content && <p className="text-xs text-red-400 mt-1">{errors.article_content.message}</p>}
          <p className="text-xs text-muted-foreground mt-1">Tip: Use ## for headings, - for bullet points, 1. for numbered lists.</p>
        </div>

        <div>
          <Label htmlFor="tags">Tags (optional)</Label>
          <Input id="tags" {...register('tags')} placeholder="airdrops, defi, ethereum" className="mt-1.5 bg-secondary border-border" />
          <p className="text-xs text-muted-foreground mt-1">Comma-separated tags</p>
        </div>
      </div>

      <div className="glass-strong rounded-2xl p-6 md:p-8">
        <ImageUpload bucket="article-logos" onUploaded={setLogoUrl} label="Article Logo / Thumbnail" />
      </div>

      <Button
        type="submit"
        disabled={submitting}
        className="w-full gradient-green text-black font-semibold border-0 glow-green-sm hover:opacity-90 h-12"
      >
        {submitting ? (
          <><Loader2 className="w-5 h-5 animate-spin" /> Submitting...</>
        ) : (
          <>Submit Article</>
        )}
      </Button>
    </form>
  );
}
