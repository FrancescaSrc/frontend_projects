
var staticCacheName = 'restview-1';
var contentImgsCache = 'restview-imgs';
var allCaches = [
	staticCacheName,
	contentImgsCache
];

self.addEventListener('install', function(event) {
	event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
		return cache.addAll([
			
			'./',
			'./index.html',
			'./restaurant.html',
			'./css/styles.css',
			'./css/responsive_min500.css',
			'./css/responsive_desktop.css',
			'./js/dbhelper.js',
			'./js/main.js',
			'./js/restaurant_info.js',
			'./js/idb.js',
			'./js/lazyload.js',
			'https://fonts.gstatic.com/s/roboto/v15/2UX7WLTfW3W8TclTUvlFyQ.woff',
			'https://fonts.gstatic.com/s/roboto/v15/d-6IYplOFocCacKzxwXSOD8E0i7KZn-EPnyo3HZu7kw.woff'
			
			
		]);
	}
    ).catch(function(err){
		console.log('error with caching');
	})
	);
});






self.addEventListener('activate', function(event) {
	event.waitUntil(
    caches.keys().then(function(cacheNames) {
		return Promise.all(
        cacheNames.filter(function(cacheName) {
			return cacheName.startsWith('restview-') &&
			!allCaches.includes(cacheName);
			}).map(function(cacheName) {
			return caches.delete(cacheName);
		})
		);
	})
	);
});

self.addEventListener('fetch', function(event) {
	var requestUrl = new URL(event.request.url);
	
    if (requestUrl.origin === location.origin) {
        
		if (requestUrl.pathname.startsWith('/mws-restaurant-stage-3/images/')) {
			event.respondWith(servePhoto(event.request));
			return;
		}
		if (requestUrl.pathname.startsWith('/mws-restaurant-stage-3/img/')) {
			event.respondWith(servePhoto(event.request));
			return;
		}
		}	
	
	event.respondWith(
    caches.match(requestUrl.pathname).then(function(response) {
		return response || fetch(event.request);
	}).catch(err => console.log("Fetch error", err))
	); 
	
	
	
});


function servePhoto(request) {
	var storageUrl = request.url.replace(/-\w+.(jpg|webp)$/, '');
	
	//search for image in cache and return it
	return caches.open(contentImgsCache).then(function(cache) {
		return cache.match(storageUrl).then(function(response) {
			if (response) return response;
			
			return fetch(request).then(function(networkResponse) {
			cache.put(storageUrl, networkResponse.clone());
			return networkResponse;
			});
			});
	});
}





self.addEventListener('sync', function(event){
	
	console.log(event);
	event.waitUntil(syncReviews())
});
		

function syncReviews(){
 if (typeof idb === "undefined" || typeof DBHelper === "undefined") {
              self.importScripts('js/dbhelper.js', 'js/idb.js');
          }
const dbPromise = idb.open('Restaurants-reviews', 1, function(upgradeDb) {
  upgradeDb.transaction.objectStore('reviewsAdded');
});

	return dbPromise.then(function(db){
	var tx= db.transaction('reviewsAdded', 'readonly');
    restStore= tx.objectStore('reviewsAdded');
    return restStore.getAll();
	})
	.then(function(reviews){
		console.log(reviews);
		reviews.map((review)=>{
			var url = "http://localhost:1337/reviews/";
				fetch(url,
				{
				    headers: {
				      'Accept': 'application/json',
				      'Content-Type': 'application/json'
				    },
				    method: "POST",
				    body: JSON.stringify(review)
				})
				.then(response=>{
					if(response.status===201){
					return dbPromise.then(db => {
      				const tx = db.transaction('reviewsAdded', 'readwrite');
      				tx.objectStore('reviewsAdded').delete(review.id);
      				console.log("review deleted from store");
      				return tx.complete;
					
				})
				}
			
		}).then(DBHelper.fetchAllReviews());

	});
})

}	