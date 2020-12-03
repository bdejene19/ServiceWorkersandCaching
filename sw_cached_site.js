
const cacheName = 'v2';
 
self.addEventListener('install', (e) => {
    console.log('Service Worker: Installed');
    // where site caching will occur
});




// Call Activate Element
self.addEventListener('activate', e => {
   console.log('Service Worker: Actvivate');

   
   e.waitUntil(
       caches.keys().then(cacheNames => {
           return Promise.all(
               cacheNames.map(cache => {
                   if (cache !== cacheName) {
                       console.log('Service Worker: Clearing Old Cache');
                       return caches.delete(cache);  
                   }
               })
           )
       })
   )
});

self.addEventListener('fetch', e => {
    console.log('Service Worker: Fetching');
    e.respondWith(
        fetch(e.request) 
        .then( res => {
            // make a copy/clone of response
            const resClone = res.clone();
            // open your cache (just like in our install)
            caches.open(cacheName)
            // promise returns a cache object like before
            .then(cache => {
                // but here we also add a response to the cache (an update, therefore put request)
                cache.put(e.request, resClone) // this takes inital request our response clone => then we want to return original response

            });
            return res;
        }) // without internet connection => catch statement should run
        .catch(err => caches.match(e.request)).then(res => res));
    )
})