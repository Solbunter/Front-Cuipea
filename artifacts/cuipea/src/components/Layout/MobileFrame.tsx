import React, { ReactNode } from 'react';

export function MobileFrame({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-[#F4F4F4] flex items-center justify-center sm:py-8">
      <div className="w-full h-[100dvh] sm:h-[800px] sm:max-w-[430px] sm:rounded-[32px] sm:shadow-2xl bg-white overflow-hidden relative flex flex-col">
        {children}
      </div>
    </div>
  );
}
