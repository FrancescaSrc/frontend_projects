let restaurant;
var map;
debugger;

var url_string = window.location.href
var url = new URL(url_string);
var id = url.searchParams.get("id");
console.log(id);
/**
	* Initialize Google map, called from HTML.
*/
window.initMap = () => {
	
  fetch(`http://localhost:1337/restaurants/${id}`)
	   	.then(response => response.json())
	   	.then(fillRestaurantHTML);
	
			self.map = new google.maps.Map(document.getElementById('map'), {
				zoom: 16,
				center: restaurant.latlng,
				scrollwheel: false
			});
			//fillBreadcrumb();
			mapMarkerForRestaurant(self.restaurant, self.map);
		}
	




/**
	* Get current restaurant from page URL.
*/
fetchRestaurantFromURL = (callback) => {
	if (self.restaurant) { // restaurant already fetched!
		callback(null, self.restaurant)
		return;
	}

	
	   	
	}


/**
	* Create restaurant HTML and add it to the webpage
*/
fillRestaurantHTML = (restaurant = self.restaurant) => {
	 
	cuisine.innerHTML = restaurant.cuisine_type;


	   		let htmlContent='';

	   		htmlContent= `<h2 id="restaurant-name" tabindex="0" aria-label="Restaurant:${restaurant.name}">${restaurant.name}</h2>
	   		<img id="restaurant-img" alt="restaurant ${restaurant.name}" class="restaurant-img" 
	   		sizes="(max-width: 501px) 350px, 100vw, (min-width: 501px), 550px, 100vw, (min-width:700px) 550px, 100vw" 
	   		srcset="./images/${restaurant.id}-medium.webp 350w, ./images/${restaurant.id}-medium.jpg 350w,./images/${restaurant.id}-large.webp 550w, 
	   		./images/${restaurant.id}-large.jpg 550w, ./images/${restaurant.id}-large.webp 550w, ./images/${restaurant.id}-large.jpg 550w,./images/${restaurant.id}-large7.webp 700w, ./images/${restaurant.id}-large7.jpg 700w,./images/${restaurant.id}-large_x2.webp 800w, ./images/${restaurant.id}-large_x2.jpg 800w" src="./img/${restaurant.id}.jpg">
	   		<p id="restaurant-cuisine" tabindex="0" aria-label="Cuisine type:${restaurant.cuisine_type}">Asian</p>
	   		<p id="restaurant-address" tabindex="0" aria-label="Address:${restaurant.address}</p>`
			

		responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
	
	// fill operating hours
	if (restaurant.operating_hours) {
		fillRestaurantHoursHTML();
	}
	// fill reviews
	fillReviewsHTML();
}

/**
	* Create restaurant operating hours HTML table and add it to the webpage.
*/
fillRestaurantHoursHTML = (operatingHours = self.restaurant.operating_hours) => {
	const hours = document.getElementById('restaurant-hours');
	for (let key in operatingHours) {
		const row = document.createElement('tr');
		
		const day = document.createElement('td');
		
		day.setAttribute('aria-label', 'On:'+key);
		day.setAttribute('tabindex', '0');
		day.innerHTML = key;
		row.appendChild(day);
		
		const time = document.createElement('td');
		
		time.setAttribute('aria-label', 'open from:'+operatingHours[key]);
		time.setAttribute('tabindex', '0');
		time.innerHTML = operatingHours[key];
		
		row.appendChild(time);
		
		hours.appendChild(row);
	}
}

/**
	* Create all reviews HTML and add them to the webpage.
*/
fillReviewsHTML = (reviews = self.restaurant.reviews) => {
	const container = document.getElementById('reviews-container');
	const title = document.createElement('h3');
	title.innerHTML = 'Reviews';
	container.appendChild(title);
	
	if (!reviews) {
		const noReviews = document.createElement('p');
		noReviews.innerHTML = 'No reviews yet!';
		container.appendChild(noReviews);
		return;
	}
	const ul = document.getElementById('reviews-list');
	reviews.forEach(review => {
		
		ul.appendChild(createReviewHTML(review));
	});
	container.appendChild(ul);
}

/**
	* Create review HTML and add it to the webpage.
*/
createReviewHTML = (review) => {
	const li = document.createElement('li');
	li.className='restaurant-ratings';
	li.tabindex= 0;
	const name = document.createElement('p');
	name.className='name';
	name.innerHTML = review.name;
	name.setAttribute('tabindex', '0');
	li.appendChild(name);
	
	const date = document.createElement('p');
	date.className='date';
    date.setAttribute('tabindex', '0');
	date.innerHTML = review.date;
	li.appendChild(date);
	
	const rating = document.createElement('p');
	rating.className='rating';
	rating.setAttribute('tabindex', '0');
	rating.innerHTML = `Rating: ${review.rating}`;
	li.appendChild(rating);
	
	const comments = document.createElement('p');
	comments.className='comments';
	comments.setAttribute('tabindex', '0');
	comments.innerHTML = review.comments;
	li.appendChild(comments);
	
	return li;
}

/**
	* Add restaurant name to the breadcrumb navigation menu
*/
fillBreadcrumb = (restaurant=self.restaurant) => {
	const breadcrumb = document.getElementById('breadcrumb');
	const li = document.createElement('li');
	li.tabindex=0;
	li.innerHTML = restaurant.name;
	breadcrumb.appendChild(li);
}

/**
	* Get a parameter by name from page URL.
*/
getParameterByName = (name, url) => {
	if (!url)
    url = window.location.href;
	name = name.replace(/[\[\]]/g, '\\$&');
	const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`),
    results = regex.exec(url);
	if (!results)
    return null;
	if (!results[2])
    return '';
	return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

// if ('serviceWorker' in navigator) {
// 	window.addEventListener('load', function() {
// 		navigator.serviceWorker.register('sw.js').then(function(registration) {
// 			// Registration was successful
// 			console.log('ServiceWorker registration successful with scope: ', registration.scope);
// 			}, function(err) {
// 			// registration failed :(
// 			console.log('ServiceWorker registration failed: ', err);
// 		});
// 	});
//}