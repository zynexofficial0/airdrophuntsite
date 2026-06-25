import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-24 text-center">
      <div className="w-20 h-20 rounded-2xl gradient-green flex items-center justify-center mx-auto mb-6 glow-green">
        <Compass className="w-10 h-10 text-black" />
      </div>
      <h1 className="font-display text-4xl font-bold mb-3">Page Not Found</h1>
      <p className="text-muted-foreground mb-8 max-w-md mx-auto">
        The page you are looking for does not exist or has been moved.
      </p>
      <Button asChild className="gradient-green text-black font-semibold border-0 glow-green-sm">
        <Link href="/">Back to Home</Link>
      </Button>
    </div>
  );
}
