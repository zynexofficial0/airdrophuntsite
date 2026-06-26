'use client';

import { useEffect } from 'react';
import { client } from '@/lib/appwrite';

export function AppwritePing() {
  useEffect(() => {
    client.ping().catch((error) => {
      console.error('Appwrite ping failed:', error);
    });
  }, []);

  return null;
}
