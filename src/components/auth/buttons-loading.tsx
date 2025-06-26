// REVIEWED

import { Skeleton } from "../ui/skeleton";

export const AuthenticationButtonsLoading =
  function AuthenticationButtonsLoading() {
    return (
      <ul className="flex flex-row items-center justify-center gap-2.5">
        <li>
          <Skeleton className="h-10 w-24" />
        </li>
        <li>
          <Skeleton className="h-10 w-24" />
        </li>
      </ul>
    );
  };
