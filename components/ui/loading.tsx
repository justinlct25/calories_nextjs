"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const Loading = React.forwardRef<HTMLInputElement>(
  ({}) => {
    return (
      <div className={cn('w-full my-40 flex-col items-center justify-center')}>
        <h3 className={cn('py-6 text-center font-bold')}>Loading</h3>
        <div className='flex items-center justify-center'>
            <div className='loader'></div>
        </div>
      </div>
    );
  }
);
Loading.displayName = "Loading";

export { Loading };
