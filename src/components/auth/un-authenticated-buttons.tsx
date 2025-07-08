// REVIEWED - 01

"use client";

import Link from "next/link";

import { Button } from "../ui/button";

export const UnAuthenticatedButtons = function UnAuthenticatedButtons() {
  return (
    <ul className="flex flex-row items-center justify-center gap-2.5">
      <li>
        <Button variant="outline" asChild>
          <Link href="/signup">Sign up</Link>
        </Button>
      </li>
      <li>
        <Button asChild>
          <Link href="/signin">Sign in</Link>
        </Button>
      </li>
    </ul>
  );
};
