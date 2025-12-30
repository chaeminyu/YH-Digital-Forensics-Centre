'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export function useVisitTracker() {
  const pathname = usePathname();
  const lastTrackedPath = useRef<string>('');
  
  useEffect(() => {
    // Don't track admin pages
    if (pathname.startsWith('/admin')) return;
    
    // Don't track same path twice in a row
    if (pathname === lastTrackedPath.current) return;
    
    lastTrackedPath.current = pathname;
    
    // Fire and forget - don't await
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/track`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ page_path: pathname })
    }).catch(() => {
      // Silently fail - don't impact user experience
    });
  }, [pathname]);
}