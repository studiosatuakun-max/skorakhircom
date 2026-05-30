// Basic service worker to enable PWA install prompt
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Empty fetch handler is required by Chrome to trigger the "Add to Homescreen" prompt
  // In a real offline app, this would cache and serve files.
});
