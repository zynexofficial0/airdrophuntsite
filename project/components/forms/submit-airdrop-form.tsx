'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Loader2, Rocket, CheckCircle2 } from 'lucide-react';
import { getBrowserSupabase } from '@/lib/supabase/client';
import { slugify, ensureUniqueSlug } from '@/lib/utils/slug';
import { ImageUpload } from '@/components/forms/image-upload';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

const schema = z.object({
  project_name: z.string().min(2, 'Project name is required'),
  short_description: z.string().min(10, 'Short description must be at least 10 characters'),
  full_description: z.string().min(30, 'Full description must be at least 30 characters'),
  participation_steps: z.string().min(10, 'Participation steps are required'),
  category: z.string().min(1, 'Please select a category'),
  chain: z.string().min(1, 'Please select a chain'),
  reward_info: z.string().min(2, 'Reward info is required'),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  website_url: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  twitter_url: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  telegram_url: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  discord_url: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  submitter_name: z.string().min(2, 'Submitter name is required'),
});

type FormData = z.infer<typeof schema>;

const categories = ['DeFi', 'NFT', 'Layer 1', 'Layer 2', 'Gaming', 'DAO'];
const chains = ['Ethereum', 'Solana', 'Arbitrum', 'Optimism', 'Polygon', 'Avalanche', 'Base', 'BNB Chain', 'Bitcoin', 'Cosmos'];

export function SubmitAirdropForm() {
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
      toast.error('Please upload a project logo.');
      return;
    }
    setSubmitting(true);
    try {
      const supabase = getBrowserSupabase();
      const baseSlug = slugify(data.project_name);
      const slug = ensureUniqueSlug(`${baseSlug}-airdrop`);

      const { error } = await supabase.from('submitted_airdrops').insert({
        project_name: data.project_name,
        short_description: data.short_description,
        full_description: data.full_description,
        participation_steps: data.participation_steps,
        category: data.category,
        chain: data.chain,
        reward_info: data.reward_info,
        start_date: data.start_date || null,
        end_date: data.end_date || null,
        website_url: data.website_url || null,
        twitter_url: data.twitter_url || null,
        telegram_url: data.telegram_url || null,
        discord_url: data.discord_url || null,
        logo_url: logoUrl,
        submitter_name: data.submitter_name,
        status: 'pending',
        featured: false,
        slug,
      } as never);

      if (error) throw error;

      toast.success('Your airdrop has been submitted successfully.');
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
        <h2 className="font-display text-2xl font-bold mb-2">Airdrop Submitted!</h2>
        <p className="text-muted-foreground mb-6">
          Your airdrop has been submitted successfully. It will be reviewed by our team before going live.
        </p>
        <div className="flex gap-3 justify-center">
          <Button onClick={() => setSuccess(false)} variant="outline" className="border-primary/40 text-primary">
            Submit Another
          </Button>
          <Button asChild className="gradient-green text-black font-semibold border-0">
            <a href="/airdrops">Browse Airdrops</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl mx-auto">
      <div className="glass-strong rounded-2xl p-6 md:p-8 space-y-5">
        <div className="flex items-center gap-2 mb-2">
          <Rocket className="w-5 h-5 text-primary" />
          <h2 className="font-display text-xl font-bold">Project Details</h2>
        </div>

        <div>
          <Label htmlFor="project_name">Project Name <span className="text-primary">*</span></Label>
          <Input id="project_name" {...register('project_name')} placeholder="e.g. ZkSync Era" className="mt-1.5 bg-secondary border-border" />
          {errors.project_name && <p className="text-xs text-red-400 mt-1">{errors.project_name.message}</p>}
        </div>

        <div>
          <Label htmlFor="short_description">Short Description <span className="text-primary">*</span></Label>
          <Input id="short_description" {...register('short_description')} placeholder="One-line summary of the airdrop" className="mt-1.5 bg-secondary border-border" />
          {errors.short_description && <p className="text-xs text-red-400 mt-1">{errors.short_description.message}</p>}
        </div>

        <div>
          <Label htmlFor="full_description">Full Airdrop Description <span className="text-primary">*</span></Label>
          <Textarea id="full_description" {...register('full_description')} placeholder="Detailed description of the project and airdrop..." className="mt-1.5 bg-secondary border-border min-h-[120px]" />
          {errors.full_description && <p className="text-xs text-red-400 mt-1">{errors.full_description.message}</p>}
        </div>

        <div>
          <Label htmlFor="participation_steps">Participation Steps <span className="text-primary">*</span></Label>
          <Textarea id="participation_steps" {...register('participation_steps')} placeholder={"1. Bridge to network\n2. Make transactions\n3. Interact with dApps"} className="mt-1.5 bg-secondary border-border min-h-[120px]" />
          {errors.participation_steps && <p className="text-xs text-red-400 mt-1">{errors.participation_steps.message}</p>}
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="category">Category <span className="text-primary">*</span></Label>
            <select id="category" {...register('category')} className="mt-1.5 w-full h-10 rounded-md bg-secondary border border-border px-3 text-sm text-foreground focus:outline-none focus:border-primary/50">
              <option value="">Select category</option>
              {categories.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            {errors.category && <p className="text-xs text-red-400 mt-1">{errors.category.message}</p>}
          </div>
          <div>
            <Label htmlFor="chain">Chain <span className="text-primary">*</span></Label>
            <select id="chain" {...register('chain')} className="mt-1.5 w-full h-10 rounded-md bg-secondary border border-border px-3 text-sm text-foreground focus:outline-none focus:border-primary/50">
              <option value="">Select chain</option>
              {chains.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            {errors.chain && <p className="text-xs text-red-400 mt-1">{errors.chain.message}</p>}
          </div>
        </div>

        <div>
          <Label htmlFor="reward_info">Reward Info <span className="text-primary">*</span></Label>
          <Input id="reward_info" {...register('reward_info')} placeholder="e.g. Estimated 500-2000 tokens" className="mt-1.5 bg-secondary border-border" />
          {errors.reward_info && <p className="text-xs text-red-400 mt-1">{errors.reward_info.message}</p>}
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="start_date">Start Date</Label>
            <Input id="start_date" type="date" {...register('start_date')} className="mt-1.5 bg-secondary border-border" />
          </div>
          <div>
            <Label htmlFor="end_date">End Date</Label>
            <Input id="end_date" type="date" {...register('end_date')} className="mt-1.5 bg-secondary border-border" />
          </div>
        </div>
      </div>

      <div className="glass-strong rounded-2xl p-6 md:p-8 space-y-5">
        <h3 className="font-display text-lg font-bold">Links & Socials</h3>

        <div>
          <Label htmlFor="website_url">Official Website URL</Label>
          <Input id="website_url" {...register('website_url')} placeholder="https://project.com" className="mt-1.5 bg-secondary border-border" />
          {errors.website_url && <p className="text-xs text-red-400 mt-1">{errors.website_url.message}</p>}
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="twitter_url">Twitter/X URL</Label>
            <Input id="twitter_url" {...register('twitter_url')} placeholder="https://twitter.com/..." className="mt-1.5 bg-secondary border-border" />
            {errors.twitter_url && <p className="text-xs text-red-400 mt-1">{errors.twitter_url.message}</p>}
          </div>
          <div>
            <Label htmlFor="telegram_url">Telegram URL</Label>
            <Input id="telegram_url" {...register('telegram_url')} placeholder="https://t.me/..." className="mt-1.5 bg-secondary border-border" />
            {errors.telegram_url && <p className="text-xs text-red-400 mt-1">{errors.telegram_url.message}</p>}
          </div>
          <div>
            <Label htmlFor="discord_url">Discord URL</Label>
            <Input id="discord_url" {...register('discord_url')} placeholder="https://discord.gg/..." className="mt-1.5 bg-secondary border-border" />
            {errors.discord_url && <p className="text-xs text-red-400 mt-1">{errors.discord_url.message}</p>}
          </div>
        </div>

        <div>
          <Label htmlFor="submitter_name">Submitter Name <span className="text-primary">*</span></Label>
          <Input id="submitter_name" {...register('submitter_name')} placeholder="Your name or handle" className="mt-1.5 bg-secondary border-border" />
          {errors.submitter_name && <p className="text-xs text-red-400 mt-1">{errors.submitter_name.message}</p>}
        </div>
      </div>

      <div className="glass-strong rounded-2xl p-6 md:p-8">
        <ImageUpload bucket="airdrop-logos" onUploaded={setLogoUrl} label="Project Logo" />
      </div>

      <Button
        type="submit"
        disabled={submitting}
        className="w-full gradient-green text-black font-semibold border-0 glow-green-sm hover:opacity-90 h-12"
      >
        {submitting ? (
          <><Loader2 className="w-5 h-5 animate-spin" /> Submitting...</>
        ) : (
          <>Submit Airdrop</>
        )}
      </Button>
    </form>
  );
}
