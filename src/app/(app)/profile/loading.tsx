// REVIEWED

import { Loading } from "@/components/globals/loading";
import { Button } from "@/components/ui/button";

export default function ProfileLoading() {
  return (
    <div className="flex flex-col items-center justify-center gap-5 py-10">
      <Loading className="max-h-[auto] min-h-[auto]" />
      <Button variant="ghost" disabled asChild>
        <p>Retrieving your profile information. Please wait a moment.</p>
      </Button>
    </div>
  );
}
