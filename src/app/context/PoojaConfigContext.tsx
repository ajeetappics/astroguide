'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { fetchPoojaToggle } from '@/services/appConfig/appConfigService';

interface PoojaConfigContextType {
  isPoojaEnabled: boolean;
  isLoading: boolean;
}

const PoojaConfigContext = createContext<PoojaConfigContextType>({
  isPoojaEnabled: true,
  isLoading: false,
});

export function PoojaConfigProvider({
  children,
  initialEnabled = true,
}: {
  children: ReactNode;
  initialEnabled?: boolean;
}) {
  const [isPoojaEnabled, setIsPoojaEnabled] = useState<boolean>(initialEnabled);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    const checkToggle = async () => {
      try {
        const enabled = await fetchPoojaToggle();
        if (isMounted) {
          setIsPoojaEnabled(enabled);
        }
      } catch (err) {
        console.error('Error fetching pooja toggle status in context:', err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    checkToggle();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <PoojaConfigContext.Provider value={{ isPoojaEnabled, isLoading }}>
      {children}
    </PoojaConfigContext.Provider>
  );
}

export function usePoojaConfig() {
  const context = useContext(PoojaConfigContext);
  if (!context) {
    return { isPoojaEnabled: true, isLoading: false };
  }
  return context;
}
