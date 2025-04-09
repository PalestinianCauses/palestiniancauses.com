// REVIEWED - 01

import { Loader2 } from "lucide-react";

export const Loading = function Loading() {
  return (
    <div className="flex h-full max-h-screen min-h-[40rem] w-full items-center justify-center">
      <Loader2 className="h-10 w-10 animate-spin stroke-1 text-primary" />
    </div>
  );
};
