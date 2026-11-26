const VERSION = "v20261126-143417";
const DATEIEN = ["./", "index.html", "manifest.webmanifest", "icon-192.png", "icon-512.png", "icon-180.png", "seiten/arbeitsrecht.html", "seiten/baustoffkunde-abfrage.html", "seiten/baustoffkunde-lernkarten.html", "seiten/baustoffkunde-quiz.html", "seiten/bgb-abfrage.html", "seiten/bgb-lernblatt.html", "seiten/buchungssaetze-steuer.html", "seiten/buchungssaetze.html", "seiten/physik.html", "seiten/pug-lernkarten.html", "seiten/pug-schulaufgabe.html", "seiten/treppe-abfrage.html", "seiten/treppe-lernblatt.html", "seiten/treppe-quiz.html", "seiten/baustoffkunde-lernzettel.html", "seiten/physik-lernzettel.html", "seiten/bgb-lernzettel.html", "seiten/rechnungswesen-lernzettel.html", "seiten/kontenplan-skr03.html", "seiten/pug-lernzettel.html", "seiten/arbeitsrecht-lernzettel.html", "seiten/treppe-verziehen.html", "seiten/treppe-messen.html", "seiten/treppe-begriffe.html", "seiten/bstk-metalle.html", "seiten/bstk-glas.html", "seiten/bstk-abdichtung.html", "seiten/bstk-kunststoffe.html", "seiten/bstk-daemmstoffe.html", "seiten/bstk-kennwerte.html", "seiten/physik-waermeschutz.html", "seiten/physik-arbeit.html", "seiten/physik-dichte.html", "seiten/physik-kraft.html", "seiten/bgb-verbraucherbauvertrag.html", "seiten/bgb-bauvertrag.html", "seiten/bgb-werkvertrag.html", "seiten/pug-organisationen.html", "seiten/pug-gruendung.html", "seiten/pug-datenschutz.html", "seiten/pug-wettbewerb.html", "seiten/pug-handelsrecht.html", "seiten/pug-handwerksrecht.html", "seiten/rw-abschluss.html", "seiten/rw-privat.html", "seiten/rw-umsatzsteuer.html", "seiten/rw-erfolg.html", "seiten/rw-buchungssatz.html", "seiten/rw-grundlagen.html", "seiten/deutsch-lernzettel.html", "seiten/deutsch-quiz.html", "seiten/baurecht-uebung.html", "seiten/deutsch-schreiben.html"];
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
