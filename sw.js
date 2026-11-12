// Mon coin calme : fonctionne hors connexion. Changer VERSION à chaque mise à jour.
const VERSION = "coin-calme-v3";
const FILES = ["./", "index.html", "voix.mp3", "voix.json", "son-pluie.mp3", "son-vagues.mp3", "son-oiseaux.mp3", "son-feu.mp3", "manifest.json", "apple-touch-icon.png", "icon-192.png", "icon-512.png", "icon-maskable-512.png",
  "baloo-2-latin-400-normal.woff2", "baloo-2-latin-500-normal.woff2", "baloo-2-latin-600-normal.woff2", "baloo-2-latin-700-normal.woff2", "baloo-2-latin-800-normal.woff2"];
self.addEventListener("install", e => { e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES))); self.skipWaiting(); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k))))); self.clients.claim(); });
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  // Réseau d'abord (pour recevoir les mises à jour), cache si hors connexion
  e.respondWith(fetch(e.request).then(r => { const copy = r.clone(); caches.open(VERSION).then(c => c.put(e.request, copy)); return r; })
    .catch(() => caches.match(e.request).then(r => r || caches.match("index.html"))));
});
