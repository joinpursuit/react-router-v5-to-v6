# Updating from React Router Version 5 to Version 6



## How to Install a Specific Version of an NPM Libarary

Install

- v5:  `npm install react-router-dom@5`

- v6: `npm install react-router-dom@6`

- latest version: `npm install react-router-dome@latest` (danger, sometimes this will bring in experimental/possibly buggy versions)

[React Router Documentation for Upgrading](https://reactrouter.com/docs/en/v6/upgrading/v5)

[Summary Video in More Depth](https://www.youtube.com/watch?v=zEQiNFAwDGo)

## Try it yourself!

You can fork and clone this repository and try to update this app on your own. Just reading the changes is not enough to fully understand the changes and how to code them.


On the `main` branch (on your fork/clone), 
- run `npm install react-router-dom@6`, 
- then `npm start`
- Immediately, the page will not load due to an error
- Either use the React Router documenation or check the summaries below in order to implement the necessary updates to get the app working again
- Be sure to click on each link/each page to find all the needed updates


There is a branch called `v6` where you can see the final conversion.

## Changes

### Switch to Routes

**App.js**

```js
// Old
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// New
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
```

```js
// Old
<Switch>
  <Route exact path="/">
    <Home />
  </Route>
</Switch>
// New
<Routes>
  <Route exact path="/">
    <Home />
  </Route>
</routes>
```

### No more Nested Elements For Top Level Components

Use element prop instead

**App.js**

```js
// Old
<Switch>
  <Route exact path="/">
    <Home />
  </Route>
  <Route path="/plants">
    <Index />
  </Route>
</Switch>

// New
<Switch>
  <Route exact path="/" element={<Home />} />
  <Route path="/plants" element={<Index />}/>
</Switch>
```

### No more Exact Prop

There is now a better algorithm for loading the correct routes

**App.js**

```js
// Old
<Switch>
  <Route exact path="/" element={<Home />} />
  <Route path="/plants" element={<Index />}/>
</Switch>

// New
<Switch>
  <Route path="/" element={<Home />} />
  <Route path="/plants" element={<Index />}/>
</Switch>
```

If you need a route to act as a catchall (behavior when you did not use `exact` prop in V5), you can do so by adding `*`

```js
<Switch>
  <Route path="/" element={<Home />} />
  <Route path="/plants/*" element={<Index />} />
</Switch>
```

### Navigation After Event: History => useNavigate

**Pages/New.js**

```js
// Old

const history = useHistory();
const mockSubmit = (e) => {
  e.preventDefault();
  history.push("/plants");
};

// New
const navigate = useNavigate();
const mockSubmit = (e) => {
  e.preventDefault();
  navigate("/plants");
};
```

Note, the default behavior is to push onto the navigation stack, if you want to replace, you can pass a second argument to navigate

```js
navigate("/plants", { replace: true });
```

### Redirects

**App.js**

```js
// Old
<Route exact path="/">
  <Redirect to="/welcome" />
</Route>

// New
<Route path="/" element={Navigate replace to="/welcome"} />

```

### Nested Routes

Must wrap all nested routes `Route` elements with `Routes`.

Now routes are relative

- `/plants/more-details`
- `/more-details`

**Pages/Show.js**

```js
// Old
<div>
  <h2>Show Page</h2>
  <h3>This plant needs medium light and infrequent watering.</h3>
  <Link to={`/plants/more-details`}>See more details about this plant</Link>
  <Route path="/plants/more-details">
    <p>This plant is very cool</p>
  </Route>
</div>

// New
<div>
  <h2>Show Page</h2>
  <h3>This plant needs medium light and infrequent watering.</h3>
  <Link to={`/more-details`}>See more details about this plant</Link>
  <Routes>
    <Route path="/more-details" element={<p>This plant is very cool</p>} />
  </Routes>
</div>
```

**App.js**

```js
<Route path="/plants/:id/*" element={<Show />}></Route>
```

### Nested Route Alternative

Move the nested route to App.js

**App.js**

```js
<Route path="/welcome/" element={<Welcome />}>
  <Route path="more-details" element={<p>You are now logged in</p>} />
</Route>
```

You must inform the component _where_ this component should be added

**Show.js**

<Outlet />

```js
<div>
  <h2>Show Page</h2>
  <h3>This plant needs medium light and infrequent watering.</h3>
  <Link to={`/plants/more-details`}>See more details about this plant</Link>
  <Outlet />
</div>
```

### Bonus

If you used the psuedoclass for active links in navigation this is what it would convert to.

There is no code in this app to demonstrate this.

### Link/NavLink

```js
// Old
<NavLink activeClassName={classes.active} />
// New
<NavLink className={(navData)=>navData.isActive ? classes.active : ''} />
```
