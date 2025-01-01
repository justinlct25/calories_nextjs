"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface LoadingProps {
  hasText?: boolean;
  hasHeight?: boolean;
}

const Loading = React.forwardRef<HTMLInputElement, LoadingProps>(
  ({ hasText = true, hasHeight = true}, ref) => {
    return (
      <div className={cn('w-full flex-col items-center justify-center', hasHeight && 'my-40')}>
        { hasText && <h3 className={cn('py-6 text-center font-bold')}>Loading</h3> }
        <div className='flex items-center justify-center'>
            <div className='loader'></div>
        </div>
      </div>
    );
  }
);
Loading.displayName = "Loading";

export { Loading };
