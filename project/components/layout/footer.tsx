import Link from 'next/link';
import { Rocket, Twitter, Send, Github, Mail } from 'lucide-react';

const footerLinks = {
  Explore: [
    { href: '/airdrops', label: 'All Airdrops' },
    { href: '/articles', label: 'All Articles' },
    { href: '/', label: 'Featured' },
  ],
  Submit: [
    { href: '/submit-article', label: 'Submit Article' },
    { href: '/submit-airdrop', label: 'Submit Airdrop' },
  ],
  Company: [
    { href: '/', label: 'About' },
    { href: '/', label: 'Contact' },
    { href: '/', label: 'Privacy' },
  ],
};

export function Footer() {
  return (
    <footer className="relative mt-20 border-t border-border/60 glass-strong">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="gradient-green w-9 h-9 rounded-lg flex items-center justify-center">
                <Rocket className="w-5 h-5 text-black" />
              </div>
              <span className="font-display font-bold text-lg">
                Airdrop<span className="gradient-green-text">Hunt</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              The premium community-powered Web3 discovery platform. Track airdrops, read guides, and submit your own opportunities.
            </p>
            <div className="flex items-center gap-3 mt-4">
              {[Twitter, Send, Github, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg glass flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-sm mb-3 text-foreground">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-border/40 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Airdrop Hunt. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Not financial advice. Always do your own research.
          </p>
        </div>
      </div>
    </footer>
  );
}
