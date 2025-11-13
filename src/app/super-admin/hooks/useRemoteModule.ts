"use client"

import { useEffect, useState } from 'react';
import type { RemoteModule } from '../types/super-admin';

export function useRemoteModule(moduleKey: string) {
  const [remote, setRemote] = useState<RemoteModule | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled = false;
    setLoading(true);
    setError(null);

    import(`../remotes/${moduleKey}/mount`)
      .then((mod) => {
        if (isCancelled) return;
        // Support both default and named export
        const resolved: RemoteModule = (mod.default as RemoteModule) ?? (mod as RemoteModule);
        setRemote(resolved);
      })
      .catch((e) => {
        if (isCancelled) return;
        setError(e?.message ?? 'Failed to load remote module');
      })
      .finally(() => {
        if (isCancelled) return;
        setLoading(false);
      });

    return () => {
      isCancelled = true;
    };
  }, [moduleKey]);

  return { remote, loading, error };
}


