// REVIEWED

import { Loader2 } from "lucide-react";

export const Loading = function Loading() {
  return (
    <div className="h-full max-h-screen min-h-[40rem] w-full">
      <div className="flex h-full w-full items-center justify-center">
        <Loader2 className="h-7 w-7 animate-spin text-secondary" />
      </div>
    </div>
  );
};
