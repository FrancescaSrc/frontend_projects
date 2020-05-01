(function() {
    const form = document.querySelector('.filter-options');
    let searchedRestaurant;
    const responseContainer = document.querySelector('#filter-results');
  
document.addEventListener('DOMContentLoaded', (event) => {
    event.preventDefault();
  responseContainer.innerHTML = '';


fetch('http://localhost:1337/restaurants')
    .then(response => response.json())
    .then(fetchRestaurants);

    

  fetch(`http://localhost:1337/restaurants/${searchedRestaurant}`)
    .then(response => response.json())
    .then(test);

    function test(images){
   debugger;
    }

  //fetchCuisines();

  /**
   * Fetch all restaurants.
   */
   function fetchRestaurants(restaurants) {
let htmlContent='';
let restaurantUrl='';
    
      if(restaurants[0]){
      console.log(restaurants);
      
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
        
        // restaurants.map(function(restaurant){ 
        //htmlContent='<ul>'+
        //  `<li class="restaurant-listing">
        //  <h3><a href="${restaurant.url}">${restaurant.name}</a></h3>
        //  <img class="restaurant-img" alt="restaurant ${restaurant.name}" 
        //  src="./img/${restaurant.id}.jpg">
        //  <p tabindex="0" aria-label="neighborhood:${restaurant.neighborhood}" 
        //  class="neighborhood">${restaurant.neighborhood}</p>
        //  <p class="address" aria-label="${restaurant.address}" tabindex="0">
        //  ${restaurant.address}</p><a role="button" aria-label=
        //  "View details on ${restaurant.name}" 
        //  href="./restaurant.html?id=${restaurant.id}">View details</a>
        //  </li>
        //  <p></p></li>`}).join('');
        
        };

      
      responseContainer.insertAdjacentHTML('afterbegin', htmlContent);

   }

   function addImage(images){
      debugger;
       let htmlContent='';
      if(images.results){
      
        const firstImage= images.results[0];
        htmlContent=`<figure>
        <img src=${firstImage.urls.small} alt=${searchedForText}>
        <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
        </figure>`;
      }else{
        htmlContent='<div class="error-no-articles">No images available</div>';
      }
      
      responseContainer.insertAdjacentHTML('afterbegin', htmlContent); 
    }

   

   /**
  * Create restaurant HTML.
*/

  function createRestaurantHTML(restaurant) {
  
  const li = document.createElement('li');
  li.className='restaurant-listing';
  
  const name = document.createElement('h3');
  name.setAttribute('tabindex', '0');
  name.innerHTML = restaurant.name;
  li.append(name);
  
  const picture = document.createElement('picture');
  
  const source = document.createElement('source');
  source.media='(max-width: 501px), (min-width: 502px), (min-width:700px), (min-width: 950px)';
  source.sizes='(max-width: 501px) 200px, 100vw, (min-width: 502px) 550px, 100vw, (min-width:700px) 350px, 550px, 100vw, (min-width: 950px) 350px, 550px, 100vw' ;
  source.srcset='./images/'+restaurant.id+'-small.webp 200w, ./images/'+restaurant.id+'-medium.webp 350w, ';
  source.srcset +='./images/'+restaurant.id+'-large.webp 550w, ./images/'+restaurant.id+'-large7.webp 700w, ';
  source.srcset +='./images/'+restaurant.id+'-medium.webp 350w, ./images/'+restaurant.id+'-large.webp 550w, ./images/'+restaurant.id+'-large7.webp 700w ';
  picture.append(source); 
  const sourceL = document.createElement('source');
  sourceL.media='(max-width: 501px), (min-width: 502px), (min-width:700px), (min-width: 950px)';
  sourceL.sizes='(max-width: 501px) 200px, 100vw, (min-width: 502px) 550px, 100vw, (min-width: 700px) 350px, 550px, 100vw, (min-width: 950px) 350px, 550px, 100vw';
  sourceL.srcset='./images/'+restaurant.id+'-medium.jpg 200w, ./images/'+restaurant.id+'-large.jpg 350w, ';
  sourceL.srcset +='./images/'+restaurant.id+'-large.jpg 550w, ./images/'+restaurant.id+'-large7.jpg 700w, ';
  sourceL.srcset +='./images/'+restaurant.id+'-medium.webp 350w, ./images/'+restaurant.id+'-large.jpg 550w, ./images/'+restaurant.id+'-large7.jpg 700w ';
  picture.append(sourceL);
  const image = document.createElement('img');
  image.className = 'restaurant-img';
  image.alt = 'restaurant '+restaurant.name;
  image.src = './images/'+restaurant.id+'jpg';
  picture.append(image);
  li.append(picture);
  
  const neighborhood = document.createElement('p');
    neighborhood.setAttribute('tabindex', '0');
  neighborhood.setAttribute('aria-label', 'neighborhood:'+restaurant.neighborhood);
  neighborhood.className='neighborhood';
  neighborhood.innerHTML = restaurant.neighborhood;
  li.append(neighborhood);
  
  const address = document.createElement('p');
  address.className='address';
  address.setAttribute('aria-label', 'Address:'+restaurant.address);
  address.setAttribute('tabindex', '0');
  address.innerHTML = restaurant.address;
  li.append(address);
  
  const more = document.createElement('a');
  more.setAttribute('role', 'button')
  more.setAttribute('aria-label', 'View details on '+restaurant.name);
  more.innerHTML = "View details";
  more.href = restaurant.url;
  li.append(more);
  
  return li
}

 });   
})();


 
 


