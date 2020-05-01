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

											console.error("error: restaurant not found, fetching from server");
											return DBHelper.fetchRestaurantsFromServer(callback);
											
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
			//create favorite button
			const favorite = document.createElement('span');
			favorite.innerHTML='&#9825;'
			favorite.setAttribute('class', 'favorite_icon');
			favorite.setAttribute('class', "is"+restaurant.is_favorite);

			//this part is adapted from the solution proposed in tutorial online

			favorite.onclick= function(){	
				const setNewStatus=!restaurant.is_favorite;	
				DBHelper.setStatusFav(restaurant.id, setNewStatus);
				restaurant.is_favorite=setNewStatus;
				setFavIcon(favorite, setNewStatus, restaurant);

			}
			setFavIcon(favorite, restaurant.is_favorite, restaurant);
			name.innerHTML = restaurant.name;
			name.append(favorite);
			
			
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

	/*
	*Sets the favorite icon on or off and add correct styles to it
	*Adapted from the solutions proposed in the tutorial online by Lorenzo
	*/
	setFavIcon= (favorite, status, restaurant)=>{
		
		if(!status){

			favorite.innerHTML='&#9825;';
			favorite.setAttribute('title', 'mark as favorite');
			favorite.setAttribute('aria-label', 'mark '+restaurant.name+ ' as favourite');
			favorite.setAttribute('class', 'isfalse');

		}else{

			favorite.innerHTML='&#9829;'
			favorite.setAttribute('class', 'istrue');
			favorite.setAttribute('title', 'remove from your favorites');
			favorite.setAttribute('aria-label', 'remove '+restaurant.name+ ' as favourite');
		}
	}




	fetchReviewsByID= (id) =>{
		
if('indexedDB' in window){
	DBHelper.openDB().then(function(db){
  //  console.log('restaurant fetched from indexDB ', db);
   
      var tx= db.transaction('reviews', 'readonly');
    var restStore= tx.objectStore('reviews');
    return restStore.getAll();
})
.then(reviews=>{
	
	var selectedRev =reviews.filter(r => parseInt(r.restaurant_id) == id);
//	console.log(selectedRev);
	return selectedRev;}
).then(
reviews=>{
if(reviews.length===0){
	 	fetch(`http://localhost:1337/reviews/?restaurant_id=${id}`)
    .then(response => response.json())
    .then(response => {
    	var reviews=response;
    	reviews.map(review=>{addLocalToStore('reviews', review)});
    	return reviews;
       })
    .then(fillReviewsHTML(reviews))
	 	.catch(err=> console.log(err));
		  }else{
		  	fillReviewsHTML(reviews);
		  }
		}).catch(err=> console.log(err));
		  	
		} else {
			 DBHelper.fetchReviewsFromServerByID(id)
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
			//console.log(self.restaurant);
			
			const container = document.getElementById('reviews-container');
			/*const title = document.createElement('h3');
			title.innerHTML = 'Reviews';
			container.appendChild(title);*/
			
			if (!reviews || reviews.length===0) {
				const noReviews = document.createElement('p');
				noReviews.innerHTML = 'Please add your review!';
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
			
			const formcontainer = document.getElementById('review-form');
			/*const error = document.createElement('span');
			error.innerHTML="Please check out your form";
			error.className="error";*/


			const form = document.createElement('form');
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
			name.setAttribute('required', true);
			//namelabel.appendChild(error);
			form.appendChild(name);
			

			const ratinglabel = document.createElement('label');
			ratinglabel.innerHTML="Your rating:";
			ratinglabel.setAttribute('tabindex', '0');
			form.appendChild(ratinglabel);
			const rating = document.createElement('div');
			rating.setAttribute('aria-label', "set your rating");
			rating.id="rating";
			for(var i=0; i<=5; i++){
			const valueLable=document.createElement('label');
			valueLable.innerHTML=i;
			const input = document.createElement('input');
			input.className="rating";
			input.type="radio";
			input.name="rating";
			input.value= i;
			input.id="value"+i;
			input.setAttribute('tabindex', '-1');
			input.setAttribute('aria-checked', 'false');
			input.setAttribute('aria-label', "number of stars is "+i);
			valueLable.setAttribute('for', input.id);
			/*const span = document.createElement('span');
			span.innerHTML="&#10032;";*/
			if(i===0){
				input.className="hide";
				valueLable.className="hide";		
				input.setAttribute('tabindex', '-1');

			}
			if(i===1){
				input.setAttribute('tabindex', '0');	
				input.setAttribute('checked', true);
				input.setAttribute('aria-checked', 'true');

			}

			input.setAttribute('required', true);
			rating.appendChild(valueLable);
			rating.appendChild(input);
			
			}
			form.appendChild(rating);

			const commentlabel = document.createElement('label');
			commentlabel.innerHTML="Your review:";
			form.appendChild(commentlabel);
			const comment = document.createElement('textarea');
			comment.name="comments";
			comment.setAttribute('required', true);
			form.appendChild(comment);
			

			const button = document.createElement('button');
			button.type="submit";
			button.innerHTML="submit";
			
			form.appendChild(button);
			form.onsubmit= function(){addReview()};

			formcontainer.appendChild(form);
			

		}

addReview = ()=>{
		event.preventDefault();
		    
		handleFormSubmit(event);
	/*let restaurantID=parseInt(document.getElementsByName('restaurant_id')[0].value);
	let name=document.getElementsByName('name')[0].value;
	let rating;
	let ratingElements=document.getElementsByName('rating');
	let comments=document.getElementsByName('comments')[0].value;
	for(var i=0; i=<ratingElements.length; i++){
		return rating=ratingElements[i].checked;
	}
*/

}

		

		/**
		 * This code adapted from the copyrighted code of: https://code.lengstorf.com/get-form-values-as-json/
		 A handler function to prevent default submission and run our custom script.
		 * @param  {Event} event  the submit event triggered by the user
		 * @return {void}
		 */
handleFormSubmit = event => {		  
		 const data = formToJSON(event.target.elements);
		  
		 const reviewFormatted={
		 	"restaurant_id": parseInt(data["restaurant_id"]),
		 	"name":data["name"],
		 	"rating":parseInt(data["rating"]),
		 	"comments":data["comments"],
		 	"createdAt": new Date()

		 }


		 const revContainer = document.getElementById('reviews-list');
		 let newReview=createReviewHTML(reviewFormatted);
		 
		 revContainer.append(newReview);		 
		  // ...send data as request ...
		if(navigator.onLine){
			
			addtoDBandCache(reviewFormatted);

		}else{
			saveDataToLocalDB(reviewFormatted);
		}

		
		emptyForm(event.target.elements);

		};

		/**
		 * This code adapted from the copyrighted code of: https://code.lengstorf.com/get-form-values-as-json/ 
		 * Retrieves input data from a form and returns it as a JSON object.
		 * @param  {HTMLFormControlsCollection} elements  the form elements
		 * @return {Object}                               form data as an object literal
		 */
		const formToJSON = elements => [].reduce.call(elements, (data, element) => {
	
		var err = document.getElementsByClassName('error');
	  	err.innerHTML="";
	  	
		 if (isValidElement(element) && isValidValue(element)) {
	    data[element.name] = escapeRegExp(element.value);}
	  
	  if(element.value===""|| element.value ===0){
	  //	console.log("this is empty" + element);
	  	err.innerHTML="Please correct your input, empty fields, <, %, symbols and are not allowed";
	  	}

	 

	   
		//console.log("test", data);
		  return data;
		}, {});

/*Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
Escaping user input that is to be treated as a literal string within 
a regular expression—that would otherwise be mistaken for a special character*/

		function escapeRegExp(string) {

  return string.replace(/[.*+^$<>{}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}


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
		
	  return (!['checkbox', 'radio'].includes(element.type) || element.checked && element.checked !=0);
	};


saveDataToLocalDB = (data) =>{
			//console.log(data);
			if('indexedDB' in window){
		    	//save to a temporary store
		    addLocalToStore('reviewsAdded', data)
		    .then(addLocalToStore('reviews', data))
		    .then(console.log("review added to IDB"))            
		    .catch(error => console.error('Error', error));
		    window.addEventListener('online', (event)=>{
		    	console.log('Browser back online');
		    	
		    })
	
		}
	}
	

/*
*General help function to add to a store
*/

	addLocalToStore= (store, data)=>{
		return DBHelper.openDB().then(function(db) {
		        if (!db) { return;}
		              DBHelper.openDB(store);
		              var tx= db.transaction(store, 'readwrite');
		              var restStore= tx.objectStore(store);
		              restStore.put(data);              
		             // return tx.complete;
		              })
	}
/*
*Empty the form to add a review
*/

	emptyForm = (elements)=>{
	var form = document.querySelector('#review-form');

	elements.name.value="";
	elements.rating.value="1";
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





	addtoDBandCache = (item) =>{

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
		.then(addLocalToStore('reviews', item))
		.catch(function(error){console.log(error);})
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
				  	window.addEventListener('online', function(event) {
				    return registration.sync.register(event);
					});

				  }
					

				  
				}).catch(function(err) {
				// registration failed :(
				console.log('ServiceWorker failed: ', err);
			});
		
	});

}


