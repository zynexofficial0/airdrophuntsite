import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Gift, Calendar } from 'lucide-react';
import type { Airdrop } from '@/types';
import { TiltCard } from '@/components/shared/tilt-card';
import { StatusBadge } from '@/components/shared/status-badge';
import { cn } from '@/lib/utils';

export function AirdropCard({ airdrop, featured = false }: { airdrop: Airdrop; featured?: boolean }) {
  return (
    <TiltCard
      glow={featured}
      className={cn('group h-full flex flex-col', featured && 'border-primary/40')}
    >
      {featured && (
        <div className="absolute top-3 right-3 z-10">
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold gradient-green text-black">
            FEATURED
          </span>
        </div>
      )}
      <div className="p-5 flex flex-col h-full">
        <div className="flex items-start gap-3 mb-4">
          <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-border/60 shrink-0 bg-secondary">
            <Image
              src={airdrop.logo_url}
              alt={airdrop.project_name}
              fill
              sizes="56px"
              className="object-cover"
            />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
              {airdrop.project_name}
            </h3>
            <div className="flex flex-wrap gap-1.5 mt-1.5">
              <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-secondary text-muted-foreground border border-border/40">
                {airdrop.category}
              </span>
              <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-secondary text-muted-foreground border border-border/40">
                {airdrop.chain}
              </span>
            </div>
          </div>
          <StatusBadge status={airdrop.status} />
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
          {airdrop.short_description}
        </p>

        <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
          <span className="flex items-center gap-1.5">
            <Gift className="w-3.5 h-3.5 text-primary" />
            {airdrop.reward_info}
          </span>
        </div>

        <Link
          href={`/airdrops/${airdrop.slug}`}
          className="inline-flex items-center justify-center gap-1.5 w-full px-4 py-2.5 rounded-lg text-sm font-medium border border-border/60 text-foreground hover:border-primary/50 hover:text-primary transition-colors"
        >
          View Airdrop <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </TiltCard>
  );
}
