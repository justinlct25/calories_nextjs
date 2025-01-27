"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface LoadingProps {
  hasText?: boolean;
  hasHeight?: boolean;
  justifyCenter?: boolean;
  absolute?: boolean;
}

const Loading = React.forwardRef<HTMLInputElement, LoadingProps>(
  ({ hasText = true, hasHeight = true, justifyCenter = true, absolute = false }, ref) => {
    return (
      <div className={cn('w-full h-full flex flex-col items-center justify-center', hasHeight && 'my-40', absolute && 'absolute inset-0')}>
        {hasText && <h3 className={cn('py-6 text-center font-bold')}>Loading</h3>}
        <div className={cn('flex items-center', justifyCenter && 'justify-center')}>
          <div className='loader'></div>
        </div>
      </div>
    );
  }
);
Loading.displayName = "Loading";

export { Loading };
