# **Last Minute Eats Client**

Website Link: [https://last-minute-eats.now.sh](https://last-minute-eats.now.sh)

## Image
![Screenshot1](/src/images/lastminuteeats.png)
![Screenshot2](/src/images/lastminuteeats2.png)

## Core Features
This serves the client side of the Last Minute Eats app.
The pages this app provides include
* Landing Page - Landing page for Last Minute Eats app
* ViewAllRecipes - A list of all the recipes
* SignUp - Sign up page for new users
* MakeRecipe - for making a new recipe
* Edit Recipe - for editting an existing recipe
* Delete Recipe - for deleting a recipe
* ViewRecipe - Show the details of an individual recipe

**This is a project created with React. It uses Font Awesome for logos and stars, and vanilla CSS for styling and animation**

**Server Link: [https://last-minute-eats-server.herokuapp.com/api](https://last-minute-eats-server.herokuapp.com/api)**

## Running the App locally
Running the App locally requires ones to clone [https://last-minute-eats-server.herokuapp.com/api](https://last-minute-eats-server.herokuapp.com/api). Once both client and server are cloned, do the following.
1. In "myusedcarsalesman-client", change the API_ENDPOINT in config.js to localhost:8000/api or any other ports that may be used (If you are usig port 8000, just uncomment line 3, and comment out line 2).
2. Configure the CORS setting in "last-minute-eats-server" to allow the localhost to send requests. This can be done simply adding app.use(cors()) in App.js file or chaging the value of CLIENT_ORIGIN in config.js  
3. Run both client and server with "npm start". "npm run dev" can also be used in "last-minute-eats-server"