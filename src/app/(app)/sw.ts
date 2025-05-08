// REVIEWED

/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */

import { defaultCache } from "@serwist/next/worker";
import { Serwist, type PrecacheEntry, type SerwistGlobalConfig } from "serwist";

declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;

const serwist = new Serwist({
  clientsClaim: true,
  navigationPreload: true,
  skipWaiting: true,
  precacheEntries: self.__SW_MANIFEST,
  runtimeCaching: defaultCache,
});

self.addEventListener("push", (event) => {
  if (!event.data) return;

  const data = event.data.json();

  const options = {
    icon: data.icon || "/icon-01.png",
    badge: data.badge || "/icon-01.png",
    body: data.body,
    vibrate: [100, 50, 100],
    data: {
      primaryKey: "2",
      dateOfArrival: Date.now(),
      url: data.url,
    },
  };

  event.waitUntil(self.registration.showNotification(data.title, options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  if (event.notification.data.url)
    event.waitUntil(self.clients.openWindow(event.notification.data.url));
});

serwist.addEventListeners();
