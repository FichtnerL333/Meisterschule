const VERSION = "v20261125-151926";
const DATEIEN = ["./", "index.html", "manifest.webmanifest", "icon-192.png", "icon-512.png", "icon-180.png", "seiten/arbeitsrecht.html", "seiten/baustoffkunde-abfrage.html", "seiten/baustoffkunde-lernkarten.html", "seiten/baustoffkunde-quiz.html", "seiten/bgb-abfrage.html", "seiten/buchungssaetze-steuer.html", "seiten/buchungssaetze.html", "seiten/physik.html", "seiten/pug-lernkarten.html", "seiten/pug-schulaufgabe.html", "seiten/treppe-abfrage.html", "seiten/treppe-lernblatt.html", "seiten/treppe-quiz.html"];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(DATEIEN)));
  self.skipWaiting();
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k)))));
  self.clients.claim();
});
// Erst im Internet nach der neuesten Fassung schauen, ohne Netz die gespeicherte nehmen.
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    fetch(e.request).then(r => {
      const kopie = r.clone();
      caches.open(VERSION).then(c => c.put(e.request, kopie));
      return r;
    }).catch(() => caches.match(e.request, {ignoreSearch: true}))
  );
});
