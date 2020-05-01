/**
   * Fetch all restaurants.
   */
   function fetchRestaurants() {
   	fetch('http://localhost:1337/restaurants')
   	.then(response => response.json())
   	.then(fillRestaurants);}

   	function fillRestaurants(restaurants){
   		let htmlContent='';





   		htmlContent= '<ul id="restaurants-list">' + restaurants.map(restaurant=> 
   			`<li class="restaurant-listing">
   			<h3>${restaurant.name}</h3>
   			<img class="restaurant-img" alt="restaurant ${restaurant.name}" src="./img/${restaurant.id}.jpg">
   			<p tabindex="0" aria-label="neighborhood:${restaurant.neighborhood}" class="neighborhood">${restaurant.neighborhood}</p>
   			<p class="address" aria-label="${restaurant.address}" tabindex="0">
   			${restaurant.address}</p><a role="button" aria-label=
   			"View details on ${restaurant.name}" 
   			href="./restaurant.html?id=${restaurant.id}">View details</a>

   			</li>`
   			).join('')+'</ul>';


   	};


   	

   /**
   * Fetch all neighborhoods with proper error handling.
   */
   function fetchNeighborhoods(restaurants) {
    // Fetch all restaurants
    // Get all neighborhoods from all restaurants
    const neighborhoods = restaurants.map((v, i) => restaurants[i].neighborhood);
        // Remove duplicates from neighborhoods
        const uniqueNeighborhoods = neighborhoods.filter((v, i) => neighborhoods.indexOf(v) == i)
        fillNeighborhoodsHTML(uniqueNeighborhoods);
    }
 /**
   * Fetch restaurants by a cuisine type with proper error handling.
   */
   function fetchCuisines(restaurants) {
   	debugger;
   	const cusines = restaurants.map((v, i) => restaurants[i].cusines);

   	fillCusinesHTML(cusines);
   }

/**
* Set neighborhoods HTML.
*/
fillNeighborhoodsHTML = (neighborhoods = self.neighborhoods) => {
	
	const select = document.getElementById('neighborhoods-select');
	
	neighborhoods.forEach(neighborhood => {
		const option = document.createElement('option');
		option.setAttribute('tabindex', 0);
		option.setAttribute('aria-label', neighborhood);
		option.innerHTML = neighborhood;
		option.value = neighborhood;
		select.append(option);
	});
}

fillCusinesHTML = (cusines = self.cusines) => {
	
	const select = document.getElementById('cusines-select');
	
	cusines.forEach(cusine => {
		const option = document.createElement('option');
		option.setAttribute('tabindex', 0);
		option.setAttribute('aria-label', cusine);
		option.innerHTML = cusine;
		option.value = cusine;
		select.append(option);
	});
}









/**
	* Initialize Google map, called from HTML.
	*/
	window.initMap = () => {
		let loc = {
			lat: 40.722216,
			lng: -73.987501
		};
		self.map = new google.maps.Map(document.getElementById('map'), {
			zoom: 12,
			center: loc,
			scrollwheel: false
		});
	//updateRestaurants();
}

/**
	* Update page and map for current restaurants.
	*/
	updateRestaurants = () => {

		const cSelect = document.getElementById('cuisines-select');
		const nSelect = document.getElementById('neighborhoods-select');

		const cIndex = cSelect.selectedIndex;
		const nIndex = nSelect.selectedIndex;

		const cuisine = cSelect[cIndex].value;
		const neighborhood = nSelect[nIndex].value;
		fetchRestaurants();

	// if (cuisine != 'all') { // filter by cuisine
 //          results = results.filter(r => r.cuisine_type == cuisine);
 //        }
 //        if (neighborhood != 'all') { // filter by neighborhood
 //          results = results.filter(r => r.neighborhood == neighborhood);
 //        }
	// } else{
 //  		fetchRestaurants();
	// }


	
}