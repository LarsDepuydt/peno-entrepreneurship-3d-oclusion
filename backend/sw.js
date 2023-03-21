const CACHE_NAME = 'public-cache';
// Maybe use WORKBOX generateSW for a later build: https://developer.chrome.com/docs/workbox/the-ways-of-workbox/

// Use the install event to pre-cache all initial resources.
self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    cache.addAll([ // List of urls to cache
     // '/VR/',
     // '/client/',
      //'/waiting/'
    ]);
  })());
});

self.addEventListener('activate', (event) => { // Clean up old caches
  const cacheAllowlist = ['public-cache']; // list of caches allowed

  event.waitUntil(
    caches.keys().then((keyList) =>
      Promise.all(
        keyList.map((key) => {
          if (!cacheAllowlist.includes(key)) {
            return caches.delete(key);
          }
        })
      )
    )
  );
});


// If we want to put the resource in the cache if it's not there yet, see https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers

const putInCache = async (request, response) => {
  const cache = await caches.open(CACHE_NAME);
  await cache.put(request, response);
};

const cacheFirst = async (request) => {
  const responseFromCache = await caches.match(request);
  if (responseFromCache) {
    return responseFromCache;
  }

  try {
    const responseFromNetwork = await fetch(request);
    putInCache(request, responseFromNetwork.clone()); // Need to clone because gets consumed
    return responseFromNetwork;
  }
  catch (error) {
    return new Response("Network error happened", {
      status: 408,
      headers: { "Content-Type": "text/plain" },
    });
  }
};

self.addEventListener("fetch", (event) => {
  if (event.request.method == "GET"){
    // Only if want it to be stored in cache, so not the redirect fetch etc.
    if (!event.request.headers.has('cache-control') || event.request.headers.get('cache-control') !== 'no-store') {
      event.respondWith(cacheFirst(event.request));
    }
  }
});
