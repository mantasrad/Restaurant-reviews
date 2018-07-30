self.addEventListener('install', function(e) {

    e.waitUntil(
        caches.open('restaurant').then(function(cache) {
            return cache.addAll([
                '/'
            ]);
        })
    );

});

self.addEventListener('fetch', function(e) {
    e.respondWith(
        caches.match(e.request).then(function(response) {
            if (response !== undefined) {
                return response;
            } else {
                return fetch(e.request).then(function(response) {
                    let responseClone = response.clone();

                    caches.open('v1').then(function(cache) {
                        cache.put(e.request, responseClone);
                    });
                    return response;
                });
            }
        })
    );
});
