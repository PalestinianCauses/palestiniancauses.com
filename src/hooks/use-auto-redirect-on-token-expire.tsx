"use client";

// REVIEWED

import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

import { getUserCookies, signOut } from "@/actions/auth";
import { queryClient } from "@/app/(app)/providers";
import { messages } from "@/lib/errors";

import { useUser } from "./use-user";

export const useAutoRedirectOnTokenExpire =
  function useAutoRedirectOnTokenExpire() {
    const router = useRouter();
    const { user } = useUser();

    useEffect(() => {
      if (!user) return;

      let ignore = false;

      const cb = async function cb() {
        const token = await getUserCookies("payload-token");

        if (!token || !token.value) return;

        const tokenDecoded = jwtDecode(token.value);

        if (!tokenDecoded.exp) return;

        const tokenExpirationTimeOut = tokenDecoded.exp * 1000 - Date.now();

        if (tokenExpirationTimeOut <= 0) {
          if (ignore) return;

          await signOut();

          toast.warning(messages.actions.auth.signOut.expired);
          queryClient.setQueryData(["user"], null);
          router.refresh();

          return;
        }

        if (tokenExpirationTimeOut > 0) {
          if (ignore) return;

          const tokenExpirationTime = new Date(tokenDecoded.exp * 1000)
            .toLocaleTimeString()
            .split(":");

          toast.info(
            messages.actions.auth.signOut.timer(
              [tokenExpirationTime[0], "h", tokenExpirationTime[1]].join(""),
            ),
          );

          const timer = setTimeout(async () => {
            await signOut();

            toast.warning(messages.actions.auth.signOut.expired);
            queryClient.setQueryData(["user"], null);
            router.refresh();
          }, tokenExpirationTimeOut);

          /* eslint-disable-next-line consistent-return */
          return timer;
        }
      };

      /* eslint-disable-next-line no-undef */
      let timerCleanUp: NodeJS.Timeout | undefined;

      cb().then((timer) => {
        timerCleanUp = timer;
      });

      /* eslint-disable-next-line consistent-return */
      return () => {
        ignore = true;

        if (timerCleanUp) clearTimeout(timerCleanUp);
      };
    }, [user, router]);
  };
