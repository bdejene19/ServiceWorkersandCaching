// first make sure sw are supported
// navigator is the browser object => could also do navigator.serviceWorker since service worker is a part of the object
if ('serviceWorker' in navigator) {
    //chrome found service worker => therefore supported!
    //console.log('serviceWorker supported');

    // now want to register the serviceWorker when the windo loads
    window.addEventListener('load', () => {
        // here we call our serviceWorker from navigator then register => we register it serviceWorker file
        navigator.serviceWorker
        .register('../sw_cached_pages.js') // NOTE: register is a promise
        .then(reg => console.log('Service Worker: registered!'))
        .catch(err => console.log('Service Worker Error: Error: ', err))

        // console went through, therefore, service worker registered
        // can also check by checking application tab in dev tools tab
        // make sure update on reload is checked 
        // now we can work on our actual service worker file (sw_cached_pages);
    })
}

