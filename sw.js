// Minimal service worker — required by Android Chrome to treat this as a real installable app.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', () => self.clients.claim());
self.addEventListener('fetch', () => {});
