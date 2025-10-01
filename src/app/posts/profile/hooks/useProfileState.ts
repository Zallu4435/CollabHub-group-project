"use client";

import { useEffect, useMemo, useState } from 'react';
import { profileSeed, type ProfileSeedPayload } from "../_data/profileSeed";

const STORAGE_KEY = 'profile_state_v1';

export function useProfileState(): ProfileSeedPayload {
  const [state, setState] = useState<ProfileSeedPayload>(profileSeed);

  useEffect(() => {
    const saved = typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_KEY) : null;
    if (saved) {
      try { setState(JSON.parse(saved)); } catch { setState(profileSeed); }
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  return useMemo(() => state, [state]);
}


