	let restaurant;
	var map;


	/*	* Initialize Google map, called from HTML.*/

	window.initMap = () => {
		fetchRestaurantFromURL((restaurant) => {
			if (!restaurant) { // Got an error!
				console.error("error: restaurant not found");
				} else {
				self.map = new google.maps.Map(document.getElementById('map'), {
					zoom: 16,
					center: restaurant.latlng,
					scrollwheel: false
				});
				fillBreadcrumb();
				DBHelper.mapMarkerForRestaurant(self.restaurant, self.map);
			}
		});
	}

	/**
		* Get current restaurant from page URL.
	*/
			fetchRestaurantFromURL = (callback) => {
				
				if (self.restaurant) { // restaurant already fetched!
					callback(null, self.restaurant)
					return;
				}
				const id = getParameterByName('id');
				if (!id) { // no id found in URL
					error = 'No restaurant id in URL'
					callback(error, null);
					} else {
					//	console.log('id is '+ id);

					DBHelper.fetchRestaurantById(id, (restaurant) => {
									self.restaurant = restaurant;
									if (!restaurant) {
										console.error("error: restaurant not found");
										return;
									}
						fillRestaurantHTML();
						callback(restaurant);
			   
			   });
						
					

		// 	});

		 }
	}

	/**
		* Create restaurant HTML and add it to the webpage
	*/
	fillRestaurantHTML = (restaurant = self.restaurant) => {
		
		const name = document.getElementById('restaurant-name');
		name.setAttribute('tabindex', '0');
		name.setAttribute('aria-label', 'Restaurant:'+ restaurant.name);
		name.innerHTML = restaurant.name;
		
		const image = document.getElementById('restaurant-img');
		image.alt = 'restaurant '+restaurant.name;
		image.className = 'restaurant-img';
		image.sizes="(max-width: 501px) 350px, 100vw, (min-width: 501px), 550px, 100vw, (min-width:700px) 550px, 100vw";
		
		image.srcset +='./images/'+restaurant.id+'-medium.webp 350w, ./images/'+restaurant.id+'-medium.jpg 350w,';
		image.srcset +='./images/'+restaurant.id+'-large.webp 550w, ./images/'+restaurant.id+'-large.jpg 550w,';
		image.srcset +=' ./images/'+restaurant.id+'-large.webp 550w, ./images/'+restaurant.id+'-large.jpg 550w,';
		image.srcset +='./images/'+restaurant.id+'-large7.webp 700w, ./images/'+restaurant.id+'-large7.jpg 700w,';
	 	image.srcset +='./images/'+restaurant.id+'-large_x2.webp 800w, ./images/'+restaurant.id+'-large_x2.jpg 800w'; 
		image.src = DBHelper.imageUrlForRestaurant(restaurant);
		
	/*
		image.setAttribute('class', 'lazy');
		console.log(image);
	image.setAttribute('data-srcset','./images/'+restaurant.id+'-medium.webp 350w, ./images/'+restaurant.id+'-medium.jpg 350w, ');
	var attributeImageRest= image.getAttribute('data-srcset');
	attributeImageRest +='./images/'+restaurant.id+'-large.webp 550w, ./images/'+restaurant.id+'-large.jpg 550w,';
	attributeImageRest +='./images/'+restaurant.id+'-large7.webp 700w, ./images/'+restaurant.id+'-large7.jpg 700w,';
	attributeImageRest +='./images/'+restaurant.id+'-large_x2.webp 800w, ./images/'+restaurant.id+'-large_x2.jpg 800w';
	image.setAttribute('data-src', DBHelper.imageUrlForRestaurant(restaurant));
		*/
		
		const address = document.getElementById('restaurant-address');
		address.setAttribute('tabindex', '0');
		address.setAttribute('aria-label', 'Address:'+ restaurant.address);
		address.innerHTML = restaurant.address;
		
		const cuisine = document.getElementById('restaurant-cuisine');
		cuisine.setAttribute('tabindex', '0');
		cuisine.setAttribute('aria-label', 'Cuisine type:'+restaurant.cuisine_type);
		const title = document.createElement('h3'); 
		cuisine.innerHTML = restaurant.cuisine_type;
		
		// fill operating hours
		if (restaurant.operating_hours) {
			fillRestaurantHoursHTML();
		}
		//crate form
		createFormReviewHTML(restaurant);
		

		// fill reviews
		
		fetchReviewsByID(restaurant.id);
	}

	/*fetchAllReviews= () =>{
		fetch(`http://localhost:1337/reviews/`)
	     .then(response => response.json())
	     .then(response => {console.log("response fetchAllReviews: ", response);
	     	return DBHelper.createStoreReviews(response);
	     })
	     .then(response => fillReviewsHTML(response))
	     .catch(err=> console.log(err));
	      
	 }*/


	fetchReviewsByID= (id) =>{

		//fetch first from IDB
		if('indexedDB' in window){
		 DBHelper.openDB().then(function(db){
	    console.log('reviews fetched from indexDB ', db);
	    var tx= db.transaction('reviews');
	    var restStore= tx.objectStore('reviews');
	    return restStore.getAll();

	  }).then(reviews =>{return reviews.filter(r => r.restaurant_id == id)})
		.then(response => fillReviewsHTML(response))
		.catch(err=> console.log(err));
	 } else {
		fetch(`http://localhost:1337/reviews/?restaurant_id=${id}`)
      	.then(response => response.json())
		.then(response => fillReviewsHTML(response))
		.catch(err=> console.log(err));
	}
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
			var myLazyLoad = new LazyLoad();
		}
	}

	/**
		* Create all reviews HTML and add them to the webpage.
	*/
	fillReviewsHTML = (reviews) => {
		console.log(self.restaurant);
		
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

	    if(review.updatedAt){
		 
		var currentDt= new Date(review.updatedAt);
		} else{
			var currentDt= new Date();
		}
		var mm = currentDt.getMonth() + 1;
	    var dd = currentDt.getDate();
	    var yyyy = currentDt.getFullYear();
	    var datef = mm + '/' + dd + '/' + yyyy;
	    date.innerHTML=datef;
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


	createFormReviewHTML = (restaurant)=>{
		//console.log(restaurant);
		const formcontainer = document.getElementById('review-form');
		
		const form = document.createElement('form');
		/*form.setAttribute('action', 'http://localhost:1337/reviews');
		form.setAttribute('method', 'post');*/

		const restaurantID = document.createElement('input');
		restaurantID.type="hidden";
		restaurantID.name="restaurant_id"
		restaurantID.value=restaurant.id;
		form.appendChild(restaurantID);
		//console.log(restaurantID);
		

		const namelabel = document.createElement('label');
		namelabel.innerHTML="Your name:";
		form.appendChild(namelabel);
		const name = document.createElement('input');
		name.type="text";
		name.name="name";
		form.appendChild(name);
		

		const ratinglabel = document.createElement('label');
		ratinglabel.innerHTML="Your rating:";
		form.appendChild(ratinglabel);
		const rating = document.createElement('div');
		rating.className="rating";
		for(var i=0; i<=5; i++){
		const inputlabel = document.createElement('label');
		const input = document.createElement('input');
		
		input.type="radio";
		input.name="rating";
		input.value= i;
		input.setAttribute('aria-label', "number of stars ");
		const span = document.createElement('span');
		span.innerHTML="&#10032;";
		if(i==0){
			input.className="hide";
			input.setAttribute('checked', true);
		}
		input.appendChild(span);
		inputlabel.appendChild(input);
		rating.appendChild(input);	
		}
		form.appendChild(rating);

		const commentlabel = document.createElement('label');
		commentlabel.innerHTML="Your review:";
		form.appendChild(commentlabel);
		const comment = document.createElement('textarea');
		comment.name="comments";
		form.appendChild(comment);
		

		const button = document.createElement('button');
		button.type="submit";
		button.innerHTML="submit";
		form.appendChild(button);

		formcontainer.appendChild(form);
		

	}

	/*This code is adapted from copyrighted source of: https://code.lengstorf.com/get-form-values-as-json*/
/*
	const form = document.querySelector('#review-form').addEventListener('submit', function(e){
		  e.preventDefault();
		  console.log(e)
		*/



	

	/**
	 * This code is copyrighto of: https://code.lengstorf.com/get-form-values-as-json/
	 A handler function to prevent default submission and run our custom script.
	 * @param  {Event} event  the submit event triggered by the user
	 * @return {void}
	 */
	handleFormSubmit = event => {
			  
	  const data = formToJSON(event.target.elements);
	  
	  // Demo only: print the form data onscreen as a formatted JSON object.
	 // const dataContainer = document.getElementsByClassName('reviews-container');
	  
	  // Use `JSON.stringify()` to make the output valid, human-readable JSON.
	  const dataContainer = document.getElementsByClassName('results__display')[0];
	  
	  // Use `JSON.stringify()` to make the output valid, human-readable JSON.
	  const reviewJSON = JSON.stringify(data, null, "  ");
	 const revContainer = document.getElementById('reviews-list');
	 let newReview=createReviewHTML(data);
	 revContainer.append(newReview);
	 //dataContainer.textContent= reviewJSON;
	 
	  // ...send data as request ...
	sendDataToIDB(data);
	emptyForm(event.target.elements);

	};

	/**
	 * This code is copyrighto of: https://code.lengstorf.com/get-form-values-as-json/ 
	 * Retrieves input data from a form and returns it as a JSON object.
	 * @param  {HTMLFormControlsCollection} elements  the form elements
	 * @return {Object}                               form data as an object literal
	 */
	const formToJSON = elements => [].reduce.call(elements, (data, element) => {
	 if (isValidElement(element) && isValidValue(element)) {
    data[element.name] = element.value;
  } 
	 // console.log("test", data);
	  return data;
	}, {});


/**
 * This code is copyright of: https://code.lengstorf.com/get-form-values-as-json/ 
 * Checks that an element has a non-empty `name` and `value` property.
 * @param  {Element} element  the element to check
 * @return {Bool}             true if the element is an input, false if not
 */
const isValidElement = element => {
  return element.name && element.value;
};

/**
 * This code is copyright of: https://code.lengstorf.com/get-form-values-as-json/ 
 * Checks if an element’s value can be saved (e.g. not an unselected checkbox).
 * @param  {Element} element  the element to check
 * @return {Boolean}          true if the value should be added, false if not
 */
const isValidValue = element => {
//	console.log(element.checked);
  return (!['checkbox', 'radio'].includes(element.type) || element.checked);
};

/**
 * Create a review-item with the JASON-data of the form 
 * Checks if an element’s value can be saved (e.g. not an unselected checkbox).
 * @param  {Element} element  the element to check
 * @return {Boolean}          true if the value should be added, false if not
 */

	sendDataToIDB = (data) =>{
		console.log(data);
	    if('indexedDB' in window){
	    	//save to a temporary store
	    	addToStore('reviewsAdded', data)
	    .then(console.log("review added to IDB"))
	    .then(addToStore('reviews', data))           
	    .catch(error => console.error('Error', error));
	}else{
		synchronizeDB(data);
	}  
}

addToStore= (store, data)=>{
	return DBHelper.openDB().then(function(db) {
	        if (!db) { return;}
	              DBHelper.openDB(store);
	              var tx= db.transaction(store, 'readwrite');
	              var restStore= tx.objectStore(store);
	              restStore.put(data);              
	             // return tx.complete;
	              })
}


emptyForm = (elements)=>{
//var form = document.querySelector('#review-form');

elements.name.value="";
elements.rating.value="0";
elements.comments.value="";
}


	fetchAddedReviews=()=> {
		
		/**
	   * Fetch all new reviews.
	   */
	     DBHelper.openDB().then(function(db){
	   // console.log('fetch all added reviews from indexDB ', db);
	   
	      var tx= db.transaction('reviewsAdded');
	    var restStore= tx.objectStore('reviewsAdded');
	    return restStore.getAll();
	    }).then(function(reviews) {console.log("rev:"+ reviews);});
	}





	synchronizeDB = (item) =>{
	var url = "http://localhost:1337/reviews/";
	fetch(url,
	{
	    headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json'
	    },
	    method: "POST",
	    body: JSON.stringify(item)
	})
	.addReviewsToIDB()
	.catch(function(error){ console.log(error);})

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

if ('serviceWorker' in navigator) {
	window.addEventListener('load', function() {
		navigator.serviceWorker.register('sw.js')
		.then(function(registration) {
			// Registration was successful
			console.log('ServiceWorker registration successful with scope: ', registration.scope);
			if('sync' in registration){
					
				var form = document.querySelector('#review-form');
			  	form.addEventListener('submit', function(event) {
			    event.preventDefault();
			    
			    handleFormSubmit(event);
			    	   
			    //console.log("syc is on");
			    //console.log("this is the registration"+ registration);
			    return registration.sync.register(event);
				});
				
			  }
			  		 
			 
			})
	
		.catch(function(err) {
			// registration failed :(
			console.log('ServiceWorker failed: ', err);
		});
	});
}
