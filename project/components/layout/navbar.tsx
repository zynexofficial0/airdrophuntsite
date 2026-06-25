'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, Rocket, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/airdrops', label: 'Airdrops' },
  { href: '/articles', label: 'Articles' },
  { href: '/submit-article', label: 'Submit Article' },
  { href: '/submit-airdrop', label: 'Submit Airdrop' },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="glass-strong border-b border-border/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <div className="absolute inset-0 gradient-green rounded-lg blur-md opacity-60 group-hover:opacity-100 transition-opacity" />
              <div className="relative gradient-green w-9 h-9 rounded-lg flex items-center justify-center">
                <Rocket className="w-5 h-5 text-black" />
              </div>
            </div>
            <span className="font-display font-bold text-lg tracking-tight">
              Airdrop<span className="gradient-green-text">Hunt</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-3 py-2 rounded-md text-sm font-medium transition-colors relative',
                  isActive(link.href)
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 gradient-green rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <Button
              asChild
              className="gradient-green text-black font-semibold hover:opacity-90 border-0 glow-green-sm"
            >
              <Link href="/submit-airdrop">
                Join Community <ChevronRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden glass-strong border-b border-border/60">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  'px-3 py-2.5 rounded-md text-sm font-medium transition-colors',
                  isActive(link.href)
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                )}
              >
                {link.label}
              </Link>
            ))}
            <Button
              asChild
              className="mt-2 gradient-green text-black font-semibold border-0"
            >
              <Link href="/submit-airdrop" onClick={() => setOpen(false)}>
                Join Community
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
