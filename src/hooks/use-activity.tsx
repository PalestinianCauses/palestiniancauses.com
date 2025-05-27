"use client";

// REVIEWED

import { jwtDecode, JwtPayload } from "jwt-decode";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

import { getCookie } from "@/actions/cookies";
import { messages } from "@/lib/messages";
import { httpSafeExecute } from "@/lib/network";
import { SafeExecuteConfig } from "@/lib/types";

import { useUser } from "./use-user";

const IN_ACTIVITY_TIME_OUT_MS = 15 * 60 * 1000; // 15 minutes for user's in-activity time out
const IN_ACTIVITY_WARNING_S = 1 * 60; // 1 minutes for user's in-activity warning count down
const TOKEN_REFRESH_LEAD_TIME_MS = 2 * 60 * 1000; // 2 minutes for token's refresh time before it expires
const HEART_BEAT_INTERVAL_MS = 10 * 60 * 1000; // 10 minutes for /heart-beat's request interval

export const useActivity = function useActivity() {
  // 1. user's hook data and functions
  const { isPending, data: user, tokenRefresh, signOut } = useUser();

  // 2. hook's state management
  const [isInActivityWarning, setIsInActivityWarning] = useState(false);
  const [isInActivityCountDown, setIsInActivityCountDown] = useState(
    IN_ACTIVITY_WARNING_S,
  );

  const hasSignedOutRef = useRef(false);

  // 3. refs for timers/intervals to ensure they can be cleared properly
  /* eslint-disable-next-line no-undef */
  const inActivityTimer = useRef<NodeJS.Timeout | null>(null);
  /* eslint-disable-next-line no-undef */
  const inActivityWarningInterval = useRef<NodeJS.Timeout | null>(null);
  /* eslint-disable-next-line no-undef */
  const tokenRefreshTimer = useRef<NodeJS.Timeout | null>(null);
  /* eslint-disable-next-line no-undef */
  const heartBeatInterval = useRef<NodeJS.Timeout | null>(null);

  // 4. sign out logic
  const doSignOut = useCallback(
    async ({ skip }: SafeExecuteConfig) => {
      if (isPending || !user) return;

      setIsInActivityWarning(false);

      // 4.1 clear every timer/interval
      if (inActivityTimer.current) {
        clearTimeout(inActivityTimer.current);
        inActivityTimer.current = null;
      }

      if (inActivityWarningInterval.current) {
        clearInterval(inActivityWarningInterval.current);
        inActivityWarningInterval.current = null;
      }

      if (tokenRefreshTimer.current) {
        clearTimeout(tokenRefreshTimer.current);
        tokenRefreshTimer.current = null;
      }

      if (heartBeatInterval.current) {
        clearInterval(heartBeatInterval.current);
        heartBeatInterval.current = null;
      }

      toast.loading(messages.actions.auth.signOut.pending, {
        id: "sign-out",
      });

      // 4.2 sign out
      signOut.mutate({ skip: { http: skip && skip.http, errors: [401] } });
    },
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
    [isPending, user, signOut.mutate],
  );

  // 5. initial safe-guard check for when user is not signed in
  useEffect(() => {
    if (!isPending || user) return;

    doSignOut({ skip: { errors: [401] } });
  }, [isPending, user, doSignOut]);

  // 6. heart-beat logic
  useEffect(() => {
    if (isPending || !user || isInActivityWarning) {
      if (heartBeatInterval.current) {
        clearInterval(heartBeatInterval.current);
        heartBeatInterval.current = null;
      }

      return;
    }

    // 6.1 heart-beat request function
    const doHeartBeat = async function doHeartBeat() {
      const response = await httpSafeExecute({
        http: fetch("/api/heart-beat", {
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }),
        errorDefault: messages.http.serverError,
        isData: (d): d is { message: string } => {
          const validate = z.object({ message: z.string() }).safeParse(d);

          if (!validate.success) return false;

          return true;
        },
        config: { skip: { errors: [401] } },
      });

      if (response.error) {
        if (!hasSignedOutRef.current) {
          hasSignedOutRef.current = true;
          doSignOut({ skip: { http: true } });
        }
      }
    };

    // 6.2 set an interval for heart-beat request
    heartBeatInterval.current = setInterval(
      doHeartBeat,
      HEART_BEAT_INTERVAL_MS,
    );

    /* eslint-disable-next-line consistent-return */
    return () => {
      if (heartBeatInterval.current) {
        clearInterval(heartBeatInterval.current);
        heartBeatInterval.current = null;
      }
    };
  }, [isPending, user, isInActivityWarning, doSignOut]);

  // 7. token refresh logic
  useEffect(() => {
    if (isPending || !user) {
      if (tokenRefreshTimer.current) {
        clearTimeout(tokenRefreshTimer.current);
        tokenRefreshTimer.current = null;
      }

      return;
    }

    const doTokenRefresh = async () => {
      let tokenDecoded: JwtPayload | null = null;

      try {
        // 7.1 try to decode token and if it fails, sign out
        const tokenCookie = await getCookie("payload-token");
        if (tokenCookie && tokenCookie.value)
          tokenDecoded = jwtDecode(tokenCookie.value);
      } catch {
        if (!hasSignedOutRef.current) {
          hasSignedOutRef.current = true;
          toast.error(messages.actions.auth.tokenRefresh.decodeError);
          doSignOut({ skip: { http: true } });
        }

        return;
      }

      // 7.2 check if token expiration time is valid and if not, sign out
      if (!tokenDecoded || typeof tokenDecoded.exp !== "number") {
        if (!hasSignedOutRef.current) {
          hasSignedOutRef.current = true;
          toast.error(messages.actions.auth.tokenRefresh.expirationTypeError);
          doSignOut({ skip: { http: true } });
        }

        return;
      }

      const currentTimeMS = Date.now();
      const tokenExpirationTimeMS = tokenDecoded.exp * 1000;
      const remainingTimeMS = tokenExpirationTimeMS - currentTimeMS;

      // 7.3 check if token remaining time is already expired and if so, sign out
      if (remainingTimeMS <= 0) {
        if (!hasSignedOutRef.current) {
          hasSignedOutRef.current = true;
          doSignOut({});
        }

        return;
      }

      const tokenRefreshingTimeMS =
        remainingTimeMS - TOKEN_REFRESH_LEAD_TIME_MS;

      // 7.4 check if token refreshing time is valid and if so, set a timer for token refreshing
      if (tokenRefreshingTimeMS > 0) {
        tokenRefreshTimer.current = setTimeout(() => {
          toast.loading(messages.actions.auth.tokenRefresh.pending, {
            id: "token-refresh",
          });

          tokenRefresh.mutate();
        }, tokenRefreshingTimeMS);
      }
    };

    doTokenRefresh();

    /* eslint-disable-next-line consistent-return */
    return () => {
      if (tokenRefreshTimer.current) {
        clearTimeout(tokenRefreshTimer.current);
        tokenRefreshTimer.current = null;
      }
    };
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [isPending, user, tokenRefresh.mutate, doSignOut]);

  // 8. in-activity warning logic
  const doResetInActivityTimer = useCallback(() => {
    if (isPending || !user || isInActivityWarning) return;

    if (inActivityTimer.current) {
      clearTimeout(inActivityTimer.current);
      inActivityTimer.current = null;
    }

    inActivityTimer.current = setTimeout(() => {
      setIsInActivityWarning(true);
      setIsInActivityCountDown(IN_ACTIVITY_WARNING_S);
      hasSignedOutRef.current = false;
    }, IN_ACTIVITY_TIME_OUT_MS);
  }, [isPending, user, isInActivityWarning]);

  useEffect(() => {
    if (isPending || !user) return;

    /* eslint-disable-next-line no-undef */
    const activityEvents: (keyof WindowEventMap)[] = [
      "touchstart",
      "mousemove",
      "mousedown",
      "keydown",
      "scroll",
    ];

    activityEvents.forEach((event) =>
      window.addEventListener(event, doResetInActivityTimer, { passive: true }),
    );

    doResetInActivityTimer();

    /* eslint-disable-next-line consistent-return */
    return () => {
      activityEvents.forEach((event) =>
        window.removeEventListener(event, doResetInActivityTimer),
      );

      if (inActivityTimer.current) {
        clearTimeout(inActivityTimer.current);
        inActivityTimer.current = null;
      }
    };
  }, [isPending, user, doResetInActivityTimer]);

  // 9. in-activity count down logic
  useEffect(() => {
    if (!isInActivityWarning) return;

    if (inActivityWarningInterval.current) {
      clearInterval(inActivityWarningInterval.current);
      inActivityWarningInterval.current = null;
    }

    hasSignedOutRef.current = false;

    inActivityWarningInterval.current = setInterval(() => {
      setIsInActivityCountDown((previousCountDown) => {
        if (previousCountDown <= 1) {
          if (inActivityWarningInterval.current) {
            clearInterval(inActivityWarningInterval.current);
            inActivityWarningInterval.current = null;
          }

          if (!hasSignedOutRef.current) {
            hasSignedOutRef.current = true;
            setIsInActivityWarning(false);
            doSignOut({});
          }

          return 0;
        }

        return previousCountDown - 1;
      });
    }, 1000);

    /* eslint-disable-next-line consistent-return */
    return () => {
      if (inActivityWarningInterval.current) {
        clearInterval(inActivityWarningInterval.current);
        inActivityWarningInterval.current = null;
      }
    };
  }, [isInActivityWarning, doSignOut]);

  // 10. Public API Logic
  const staySignedIn = useCallback(async () => {
    setIsInActivityWarning(false);
    setIsInActivityCountDown(IN_ACTIVITY_WARNING_S);
    doResetInActivityTimer();
  }, [doResetInActivityTimer]);

  const signOutDueToInActivity = useCallback(() => {
    doSignOut({});
  }, [doSignOut]);

  return {
    isInActivityWarning,
    isInActivityCountDown,
    staySignedIn,
    signOutDueToInActivity,
  };
};
