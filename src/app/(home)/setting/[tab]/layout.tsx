'use client';

import { useSettingTabFeatureFlags } from '@/features/setting/hooks/useSettingTabFeatureFlags';
import { notFound } from 'next/navigation';
import { use, useEffect } from 'react';

interface TabLayoutProps {
  children: React.ReactNode;
  params: Promise<{ tab: string }>;
}

export default function TabLayout({ children, params }: TabLayoutProps) {
  const unwrappedParams = use(params);
  const { checkTabAccess } = useSettingTabFeatureFlags();

  useEffect(() => {
    try {
      checkTabAccess(unwrappedParams.tab);
    } catch {
      notFound();
    }
  }, [unwrappedParams.tab, checkTabAccess]);

  return <>{children}</>;
}
