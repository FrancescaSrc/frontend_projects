#### Project: My Reads, a book tracking App
 
This is my first React project, for the React Developer Nanodegree. I have created a web application that allows to select and categorize books as read, currently reading or want to read.

#### Home page for desktop and mobile 
![image1](./images/restaurantApp_home.png "Project home")
![image2](./images/restaurantApp_mobile3.png "Project home for mobile")    

The project includes these features:
- Responsive: the site css, html and images are optimized for all media and show different images with a different size.
- Offline first: the site uses a service worker with a local DB + cache to store all images, js and html file to make it more efficient and available also offline.
- When offline, the sites stores the added data locally and synchonize them with the DB as soon as it is online.

## More project screenshots
#### Detail page 
![image4](./images/restaurantApp_detail.png "Detail page of a restaurant") ![image1](./images/restaurantApp_mobile2.png "Detail page of for mobile")
#### Offline first: cached, service worker and IndexedDB
![image5](./images/restaurantApp_offlineFirst.png "Detail of service worker and Offline first")
- The site performance is very good
![image5](./images/performance.PNG "Performance audits in Google Dev tools")

### Installing
Clone or download the repository and save it in folder mws-restaurant-stage-3.
Start up a webserver to serve up the site files on your local computer. Python has some simple tools to do this, and you don't even need to know Python. For most people, it's already installed on your computer. In a terminal, check the version of Python you have: python -V. If you have Python 2.x, spin up the server with python -m SimpleHTTPServer 8080 (or some other port, if port 8080 is already in use.) For Python 3.x, you can use python3 -m http.server 8000. If you don't have Python installed, navigate to Python's website to download and install the software. You can use any other Web Server such as Tomcat. For Tomcat: copy the project folder under the tomcat\webapps\ folder

With your server running, start Chrome webbrowser and visit the site: http://localhost:8080/mws-restaurant-stage-3/

Run the local Development Server, see instrunction below.


# Local Development API Server
## Usage
#### Get Restaurants
```
curl "http://localhost:1337/restaurants"
```
#### Get Restaurants by id
````
curl "http://localhost:1337/restaurants/{3}"
````

## Architecture
Local server
- Node.js
- Sails.js


## Getting Started

### Development local API Server
_Location of server = /server_
Server depends on [node.js LTS Version: v6.11.2 ](https://nodejs.org/en/download/), [npm](https://www.npmjs.com/get-npm), and [sails.js](http://sailsjs.com/)
Please make sure you have these installed before proceeding forward.

Great, you are ready to proceed forward; awesome!

Let's start with running commands in your terminal, known as command line interface (CLI)

###### Install project dependancies
```Install project dependancies
# npm i
```
###### Install Sails.js globally
```Install sails global
# npm i sails -g
```
###### Start the server
```Start server
# node server
```
### You should now have access to your API server environment
debug: Environment : development
debug: Port        : 1337
To check if it is working go to: http://localhost:1337/restaurants/
you should see a list of restaurants.
- 'http://localhost:1337/reviews/?restaurant_id=<restaurant_id>' for a single restaurant with a specific id
- 'http://localhost:1337/reviews/ 'for a list of reviews
- 'http://localhost:1337/restaurants/<restaurant_id>/?is_favorite=false' to check the option favorite is on or off



