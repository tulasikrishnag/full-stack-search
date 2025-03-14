# Accommodation Search

## Technical Coding Test

This project has a simple setup with an api, hooked up to MongoDB and a frontend piece initiated with [vite](https://vitejs.dev/).

## Install and run

From the project root:

```
npm install
```

### Run

Once install has finished, you can use the following to run both the API and UI:

```
npm run start
```

### API

To run the API separately, navigate to the `./packages/api` folder

```
$ cd packages/api
```

And run the `api` server with

```
$ npm run dev
```

The API should start at http://localhost:3001

### Client

To run the `client` server separately, navigate to the `./packages/client` folder

```
$ cd ./packages/client
```

And run the `client` with

```
$ npm run start
```

The UI should start at http://localhost:3000

### Database connection & environment variables

By default, the code is set up to start and seed a MongoDB in-memory server, which should be sufficient for the test. The database URL will be logged on startup, and the seed data can be found at ./packages/api/db/seeds.

If this setup does not work for you or if you prefer to use your own MongoDB server, you can create a .env file. In the ./packages/api folder, create a .env file (or rename the existing .env.sample) and fill in the environment variables.

## Task at hand

When the project is up and running, you should see a search-bar on the screen. This one is currently hooked up to the `/hotels` endpoint.
When you type in a partial string that is part of the name of the hotel, it should appear on the screen.
Ie. type in `resort` and you should see some Hotels where the word `resort` is present.

You will also see 2 headings called **"Countries"** and **"Cities"**.

The assignment is to build a performant way to search for Hotels, Cities or Countries.
Partial searches will be fine. Hotels will need to filterable by location as well.
Ie. The search `uni` should render

- Hotels that are located in the United States, United Kingdom or have the word `uni` in the hotel name.
- Countries that have `uni` in their name Ie. United States, United Kingdom
- No Cities as there is no match

Clicking the close button within the search field should clear out the field and results.

When clicking on one of the `Hotels`, `Cities` or `Countries` links, the application should redirect to the relevant page and render the selected `Hotel`, `City` or `Country` as a heading.

### Limitations

Given the time constraints, we do not expect a fully production-ready solution. We're primarily interested in the approach and the overall quality of the solution. 
Feel free to modify the current codebase as needed, including adding or removing dependencies. 
For larger or more time-intensive changes, you're welcome to outline your ideas in the write-up section below and discuss them further during the call.

<img src="./assets/search-example.png" width="400px" />

### Write-up

- The changes are implemented according to the above requirement. I have added the code comments on the improvements for production ready. 

Below are the changes incorporated into the existing code base.

Front-end:
- Created individual child components to render on navigation.
- Keep App.tsx to handle the routing and moved the search logic and rendering the result into a separate component
- Added debounce to search onchange to avoid calling api on each key stroke.
- Added shared Redirect component to navigate to hotel,city or country.

Back-end:
 - Updated index.ts to handle closing db connection and stop mongodb server when it is development when process is terminated
 - Moved the db connection as singleton pattern using connection pool mechanism to avoid multiple connections. 
 - Created controller, routes, services for making code more modular and follows single responsibilty.
 - Created a middleware to sanitize the query param.
 - Create a local cache to store and fetch data
 - Added unit tests to cover the code. 

Observations/Improvements:

Front-end:
- Add better errror handling at front-end and display Techincal Error component in case of failures.
- Memoize the data at front-end to avoid calling back-end. However, it is strongly depended on how frequent the data changes.
- Good to show no data found when the given search didn't return any data.
- Navigate to hotel,city,country I have avoided the passing the name in the path. It is not a good practice if the name is longer. In general, it is good to pass the id. But city and country comes from the hotel object. Either use the hotelId in the path however,it depends on the further enhancements to the navigation.
- The search string is not restrict to fixed length. In future, if the data grows drastically we can extend the ui to implement windowing techique which improves the app performance.

Back-end:
- Use stable cache providers like Redis and determine the cache busting strategy depends on how frequent the data changes.
- Improve error handling and logging.
- Extend mongodb query to include skip and limit for better performance if the data grows largely depends on the business need.
- Add authentication to validate the request. 



_When all the behaviour is implemented, feel free to add some observations or conclusions you like to share in the section_

### Database structure

#### Hotels Collection

```json
[
  {
    "chain_name": "Samed Resorts Group",
    "hotel_name": "Sai Kaew Beach Resort",
    "addressline1": "8/1 Moo 4 Tumbon Phe Muang",
    "addressline2": "",
    "zipcode": "21160",
    "city": "Koh Samet",
    "state": "Rayong",
    "country": "Thailand",
    "countryisocode": "TH",
    "star_rating": 4
  },
  {
    /* ... */
  }
]
```

#### Cities Collection

```json
[
  { "name": "Auckland" },
  {
    /* ... */
  }
]
```

#### Countries Collection

```json
[
  {
    "country": "Belgium",
    "countryisocode": "BE"
  },
  {
    /* ... */
  }
]
```
