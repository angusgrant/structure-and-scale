// Core assets
let coreAssets = [
	'style.css',
	'index.js',
	'treasure.js',
	'dice.js'
];

let htmlAssets = [
    'offline.html'
]

// On install, activate immediately
self.addEventListener('install', function (event) {

	// Activate immediately
	self.skipWaiting();

	// Cache core assets
	event.waitUntil(caches.open('app').then(function (cache) {
		for (let asset of coreAssets) {
			cache.add(new Request(asset));
		}
		return cache;
	}));

    // Cache offline asset as HTML
	event.waitUntil(caches.open('html').then(function (cache) {
		for (let asset of htmlAssets) {
			cache.add(new Request(asset));
		}
		return cache;
	}));

});

// Listen for request events
self.addEventListener('fetch', function (event) {

	// Get the request
	let request = event.request;

	// Bug fix
	// https://stackoverflow.com/a/49719964
	if (event.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin') return;

	// HTML files
	// Network-first
	if (request.headers.get('Accept').includes('text/html')) {
		event.respondWith(
			fetch(request).then(function (response) {
                //create a copy of the response and save it to the cache
                let copy = response.clone();
                event.waitUntil(caches.open('html').then(function (cache)  {
                    return cache.put(request, copy);
                }));

				return response;

			}).catch(function (error) {
				return caches.match(request).then(function (response) {
					return response || caches.match('offline.html');
				});
			})
		);
		return;
	}

// CSS & JavaScript & Images
	// Offline-first
	if (request.headers.get('Accept').includes('text/css') || request.headers.get('Accept').includes('text/javascript') || request.headers.get('Accept').includes('image')) {
		event.respondWith(
			caches.match(request).then(function (response) {
                console.log(response);
				return response || fetch(request).then(function (response) {

					// If the request is for an image, save a copy of it in cache
					if (request.headers.get('Accept').includes('image')) {
						let copy = response.clone();
						event.waitUntil(caches.open('img').then(function (cache) {
							return cache.put(request, copy);
						}));
					}

					// Return the response
					return response;

				}).catch(function (error) {
                    return response || caches.match('offline.html');
                });
			})
		);
	}

});