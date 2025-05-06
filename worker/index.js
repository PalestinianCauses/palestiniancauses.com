// REVIEWED

/* eslint-disable consistent-return */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */

// This file is imported and executed by The Auto-Generated `sw.js` from `next-pwa`.
// It should contain Service Worker event listeners like `push` and `notificationclick`.

console.log("[CUSTOM SERVICE WORKER LOGIC LOADED]");

// Push Notifications.
// Fired when a push message is received from The Push Service.
// This happens in background, even if app is closed.

self.addEventListener("push", (event) => {
  console.log("[Service Worker] Push Received.");

  // Parse payload from push event.
  // It is a best practice to send data payloads from your back-end.
  const data = event.data
    ? event.data.json()
    : {
        title: "New Update",
        body: "Check PalestinianCauses for new updates.",
      };

  const title = data.title || "PalestinianCauses update";
  const options = {
    body: data.body || "Tap to see PalestinianCauses latest updates.",
    icon: data.icon || "/favicon.ico", // Icon displayed in notification itself.
    badge: data.badge || undefined, // Smaller icon for notification list/status bar.
    image: data.image || undefined, // Image displayed within notification.
    data: data.data || { url: "/" }, // Custom data attached to notification (e.g. a URL to open).
    actions: data.actions || [], // Action buttons within  notification.
    // tag: data.tag || undefined, // Optional: Group notifications.
  };

  // `event.waitUntil()` keeps service worker alive until promise resolves.
  // This is essential for displaying notification.
  event.waitUntil(self.registration.showNotification(title, options));
});

// Notification Click Event Listener.
// Fired when a user clicks on a notification displayed by this service worker.
self.addEventListener("notificationclick", (event) => {
  console.log("[Service Worker] Notification Click Received.");

  // Close notification that was clicked.
  event.notification.close();

  // Get URL or data associated with notification.
  const dataClick = event.notification.data;
  const URLToOpen = dataClick.url || "/";

  // Handle different actions if you have action buttons.

  event.waitUntil(
    // Check if any client (browser window/tab) is already open.
    clients.matchAll({ type: "window" }).then((windowClients) => {
      const matchingClient =
        windowClients.find(
          (client) =>
            // Check if client is at target URL and is focused.
            // Or if it's most recently focused window.
            client.url === URLToOpen && "focus" in client && client.focused,
        ) ||
        windowClients.find((client) => "focus" in client && client.focused); // Fall-back to any focused window.

      if (matchingClient) {
        // When a matching or focused window is found, navigate it to URL and focus it.
        console.log(
          "[Service Worker] Focusing existing window and navigating to:",
          URLToOpen,
        );

        return matchingClient
          .navigate(URLToOpen)
          .then((client) => client?.focus());
      }

      if (clients.openWindow) {
        // When no window is found or focused, open a new one.
        console.log(
          "[Service Worker] No existing window, opening new one to:",
          URLToOpen,
        );

        return clients.openWindow(URLToOpen);
      }

      // Fall-back if `openWindow` is not supported (rare in modern browsers).`
      console.error("[Service Worker] Can not open new window.");
    }),
  );
});
