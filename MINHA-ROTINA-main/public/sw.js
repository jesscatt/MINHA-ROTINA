const CACHE_NAME = "minha-rotina-shell-v1";
self.addEventListener("install", event => { event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(["/", "/manifest.webmanifest"]))); self.skipWaiting(); });
self.addEventListener("activate", event => { event.waitUntil(self.clients.claim()); });
self.addEventListener("fetch", event => { if (event.request.method !== "GET") return; event.respondWith(fetch(event.request).then(response => { const copy=response.clone(); caches.open(CACHE_NAME).then(cache=>cache.put(event.request,copy)); return response; }).catch(()=>caches.match(event.request))); });
self.addEventListener("push", event => { let data={title:"Minha Rotina",body:"Você tem uma atividade programada.",url:"/"}; try { data={...data,...event.data.json()}; } catch {} event.waitUntil(self.registration.showNotification(data.title,{body:data.body,data:{url:data.url}})); });
self.addEventListener("notificationclick", event => { event.notification.close(); event.waitUntil(clients.openWindow(event.notification.data?.url || "/")); });
