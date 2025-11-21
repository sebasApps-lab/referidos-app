// public/service-worker.js

// Nombre del caché
const CACHE_NAME = "referidos-cache-v1";

// Archivos mínimos para que funcione offline
const URLS_TO_CACHE = [
  "/", 
  "/index.html",
  "/manifest.json"
];

// Instalar service worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(URLS_TO_CACHE);
    })
  );
});

// Interceptar solicitudes
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Si está en caché → devolver
      if (response) return response;

      // Si no → pedir a la red
      return fetch(event.request);
    })
  );
});

// Limpiar cachés viejos
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(
        names.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
});
