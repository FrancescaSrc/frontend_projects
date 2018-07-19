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
	
	fetchReviews(restaurant.id);
}

fetchReviews= (id) =>{
	fetch(`http://localhost:1337/reviews/?restaurant_id=${id}`)
      .then(response => response.json())
     .then(response => DBHelper.createStoreReviews(response))
      .then(reviews =>{
      	var res;
          res= reviews.filter(r => r.restaurant_id == id)
          console.log(res);
          return res;
      })
      .then(response => fillReviewsHTML(response))
     
      .catch(err=> console.log(err));
      
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
	console.log(restaurantID);
	

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
	const input = document.createElement('input');
	input.type="radio";
	input.name="rating";
	input.value= i;
	const span = document.createElement('span');
	span.innerHTML="&#10032;";
	if(i==0){
		span.className="hide";
	}
	input.appendChild(span);

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

/*This code is adapted from: https://code.lengstorf.com/get-form-values-as-json*/

const form = document.querySelector('#review-form').addEventListener('submit', function(e){
	  event.preventDefault();
		handleFormSubmit(e);
}); 

/**
 * This code is adapted from: https://code.lengstorf.com/get-form-values-as-json
 A handler function to prevent default submission and run our custom script.
 * @param  {Event} event  the submit event triggered by the user
 * @return {void}
 */
handleFormSubmit = event => {
  debugger;
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
 dataContainer.textContent= reviewJSON;
  
  // ...this is where we’d actually do something with the form data...
  send(data);
};

/**
 * This code is adapted from: https://code.lengstorf.com/get-form-values-as-json/ 
 Retrieves input data from a form and returns it as a JSON object.
 * @param  {HTMLFormControlsCollection} elements  the form elements
 * @return {Object}                               form data as an object literal
 */
const formToJSON = elements => [].reduce.call(elements, (data, element) => {
  
  data[element.name] = element.value;
  console.log("test", data);
  return data;

}, {});

send = (data) =>{
	
	idb.open('ReviewsDB', 1, function(upgradeDb) {

    var restStore = upgradeDb.createObjectStore('reviewsAdded', {keyPath: 'id', autoIncrement:true});
    
    
    }).then(function(db) {
    // or the very first load, there's no point fetching
    // posts from IDB
        if (!db) { return;}
              DBHelper.openReviewsDB('reviewsAdded');
             
              var tx= db.transaction('reviewsAdded', 'readwrite');
              var restStore= tx.objectStore('reviewsAdded');
              var item = {
              	restaurant_id: parseInt(data.restaurant_id),
              	name: data.name,
              	rating: parseInt(data.rating),
              	comments: data.comments
              };
              restStore.put(item);
              console.log("review added:" + item);
              synchronizeDB(item);
              return tx.complete;
              });
          

    
};

updateDB= ()=> {
	/**
   * Fetch all new revies.
   */
 
     DBHelper.openReviewsDB().then(function(db){
    console.log('fetched from indexDB ', db);
   
      var tx= db.transaction('reviewsAdded');
    var restStore= tx.objectStore('reviewsAdded');
    return restStore.getAll();

  }).then(function(reviews) {console.log("rev:"+ reviews);}
  /*function(reviews) {

  	reviews.forEach(review)=>{
   	var response=synchronizeDB(review);
   	
   	restStore.delete(review);
   }
  
}*/);
}





synchronizeDB = (item) =>{
	var request = new XMLHttpRequest();
var url = "http://localhost:1337/reviews/";
request.open("POST", url, true);
request.setRequestHeader("Content-Type", "application/json");
request.onreadystatechange = function () {
    if (request.readyState === 4 && request.status === 200) {
        var json = JSON.parse(request.responseText);
        console.log(json);
    }
};
var data = JSON.stringify(item);
console.log("data", item);
request.send(data);
console.log("data sent");

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
// }