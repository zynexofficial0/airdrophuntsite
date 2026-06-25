'use client';

import { Twitter, Send, Link2, Check } from 'lucide-react';
import { useState } from 'react';

export function ArticleShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    if (typeof window === 'undefined') return;
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`;

  return (
    <div className="flex items-center gap-2">
      <a
        href={tweetUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-9 h-9 rounded-lg glass flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
        title="Share on Twitter"
      >
        <Twitter className="w-4 h-4" />
      </a>
      <a
        href={`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-9 h-9 rounded-lg glass flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
        title="Share on Telegram"
      >
        <Send className="w-4 h-4" />
      </a>
      <button
        onClick={copyLink}
        className="w-9 h-9 rounded-lg glass flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
        title="Copy link"
      >
        {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Link2 className="w-4 h-4" />}
      </button>
    </div>
  );
}
