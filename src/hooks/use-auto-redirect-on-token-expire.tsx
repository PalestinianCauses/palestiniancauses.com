"use client";

// REVIEWED - 03

import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

import { signOut } from "@/actions/auth";
import { getCookie } from "@/actions/cookies";
import { messages } from "@/lib/messages";

import { useUser } from "./use-user";

export const useAutoRedirectOnTokenExpire =
  function useAutoRedirectOnTokenExpire() {
    const router = useRouter();
    const { data: user, refetch } = useUser();

    useEffect(() => {
      if (!user) return;

      let ignore = false;

      const cb = async function cb() {
        const token = await getCookie("payload-token");

        if (!token || !token.value) return;

        const tokenDecoded = jwtDecode(token.value);

        if (!tokenDecoded.exp) return;

        const tokenExpirationTimeOut = tokenDecoded.exp * 1000 - Date.now();

        if (tokenExpirationTimeOut <= 0) {
          if (ignore) return;

          await signOut();
          refetch();
          router.refresh();
          toast.warning(messages.actions.auth.signOut.expired);

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
            refetch();
            router.refresh();
            toast.warning(messages.actions.auth.signOut.expired);
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
    }, [user, refetch, router]);
  };
