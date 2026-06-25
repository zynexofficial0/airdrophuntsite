import { cn } from '@/lib/utils';
import type { AirdropStatus, ArticleStatus } from '@/types';

const airdropStyles: Record<AirdropStatus, string> = {
  live: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  upcoming: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  ended: 'bg-zinc-500/15 text-zinc-400 border-zinc-500/30',
  pending: 'bg-sky-500/15 text-sky-400 border-sky-500/30',
};

const articleStyles: Record<ArticleStatus, string> = {
  approved: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  pending: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  rejected: 'bg-red-500/15 text-red-400 border-red-500/30',
};

export function StatusBadge({
  status,
  type = 'airdrop',
  className,
}: {
  status: AirdropStatus | ArticleStatus;
  type?: 'airdrop' | 'article';
  className?: string;
}) {
  const styles = type === 'airdrop' ? airdropStyles : articleStyles;
  const key = status as string;
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border capitalize',
        (styles as Record<string, string>)[key],
        className
      )}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse-glow" />
      {status}
    </span>
  );
}
