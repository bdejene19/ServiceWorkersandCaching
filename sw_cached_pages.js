/** We will also be looking at the cache storage tab in devtools 
  * When something is cached => gets placed in cached storage which can be accessed when there is no connection ( what native apps do alot => to simulate offline)
 */

 /** We will cache all of our pages => will need assts and HTML pages
  * 
  * There are 2 way to do it => cache individuals html pages, then how to cache entire response (e.g. entire website or page);
 */

 // first way to cache: => create your cachevariable 
 // often called v1 because you may have different versions of cache files
 const cacheName = 'v1';


 // now create our cache assests => an array of all our pages
 // this first method is okay since we dont have many pages => however if you have lots of pages, method 2 is much better
const cacheAssets = [
    'index.html',
    'about.html',
    '/js/main.js'
]





// call install event for service worker
// to do that, we need to attach an event to the actual worker => can be done with 'self' and passing an install event
self.addEventListener('install', (e) => {
    console.log('Service Worker: Installed');


    // install event is where we handle the caching of assets
    // want to call waitUntil => waits for our promise to complete until getting rid of service worker
    e.waitUntil(
        // call caches api
        // we are just opening the files that are in our array
        caches.open(cacheName)
        .then(cache => {
            console.log('Service Worker: is Caching files')
            // to cache => we take our cache object and can call add all
            cache.addAll(cacheAssets);
        })
        // since it is offline, no point waiting
        .then(() => self.skipWaiting())
        // go to cache storage in application tab in dev tools => it shows us our cache which is now available for offline viewing (has not been set up yet)
        // this will be done in our fetch event

    );
});

// NOTE: service worker gets installed before being registered in your application
// this is proven in your dev tools if you go to console, go to settings and preserve log




// Call to Activate Event => done by calling self and adding an 'activate' event listener
self.addEventListener('activate', e => {
    console.log('Service Worker: Actvivate');

    // activate is where we clean up our caches => if you changed the name of your cache variable to v2, would then have 2 caches (v1 and v2)
    // therefore, this is where we remove any unwanted caches
    e.waitUntil(
        // will loop through our caches => has a condition that checks if the current cache is not the most recent cache, we delete it
        // NOTE: 'caches' object is just our caches in our cache storage from application tab in devtools
        caches.keys().then(cacheNames => {
            // making a promise here => but since cacheNames is an array, we want promise to apply to all of them
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

// NOTE: remember where we do our activation installation and registeration.
/** register worker => in the file we want to use our service worker
 * install and activate worker in our actual SW file 
 * however, in our app things happen in a their own order => service worker gets installed and activated, and the registered
 */



 // after cleaning up your caches through your activation even of the service worker
 // now want to Call Fetch Event => when request is made, this should fire off
 // fetch event allows use to manipulate inbetween the request and the response
self.addEventListener('fetch', e => {
    
    // first want to check if live site is available, if not then send our cached file
    e.respondWith(
        // what we want to fetch is our initial request through our event parameter
        // since fetch is a promise => this is going to fail without internet connection and will fall into our catch statement
       
        fetch(e.request).catch(() => caches.match(e.request)) // this line is doing a fetch that will fail without internet, but will still send our event (e) request
        // if request page not reached, it will show the request page either way
    )
})


// if you have lots of different pages => individual caching each one is not efficient
// therefore, you can cache your whole app => this takes place in the fetch even

// Method 2:
self.addEventListener()

