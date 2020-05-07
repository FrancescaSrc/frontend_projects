

## The project: Would you rather...? React-Redux WebApp
This is the second project in the Udacity React Nanodegree. The starter code is bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

### Scope of learning: apply Redux principles in a WebApp
The project consisted in developing an interactive webapp where user can add and respond to questions and see results. In this webapp I have made greate usage of Redux State with Actions and Reducers, React Components, Routing and state mangament.

Functionalities have been developed in reusable components (see src/components) and I have integrated Bootstrap for React for managing the layout with some customized use of colors.

## Project screenshots
#### Login page 
![image1](/assets/login.png "Login page") 
![image2](./assets/login2.png "Login page") 
![image3](./assets/home.png  "Home page answered polls")
![image9](./assets/home2.png  "Home page unanswered polls")
![image4](./assets/create_poll.png  "Create New poll")
![image10](./assets/answer_poll.png  "Answer poll")
![image5](./assets/new_poll.png  "Create New added")
![image6](./assets/pollresults.png  "Results page")
![image7](./assets/leaderboard.png  "Leader Board")
![image8](./assets/error.png  "Error page")

## Getting started

To create run this project, please install all the required software (see below) then type:

* `npm create-react-app` to create your onw app OR
* `npm install` to install all the dependencies included in this repo

To start the project:
* `npm start`  


## Folder Structure

After creation, your project should look like this:

```
my-app/
  README.md
  node_modules/
  package.json
  public/
    index.html
    favicon.ico
    images/
  src/
    actions/
      authedUser.js
      questions.js
      shared.js
      users.js
    components/
      App.js
      Home.js
      Leaderboard.js
      Login.js
      Menu.js
      NewPoll.js
      Poll.js
      PollViw.js
      Results.js
      Users.js
      UserCard.js
    reducers/
      authedUser.js
      questions.js
      index.js
      users.js
    middleware/
      index.js
      logger.js
    utils/
      _DATA.js
      api.js  
    App.css
    App.js
    App.test.js
    index.css
    index.js
    logo.svg
```

For the project to build, **these files must exist with exact filenames**:

* `public/index.html` is the page template;
* `src/index.js` is the JavaScript entry point.


### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!


You can find the most recent version of this guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).
