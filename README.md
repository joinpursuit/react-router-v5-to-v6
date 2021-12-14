# Updating from React Router Version 5 to Version 6

## How to Install a Specific Version of an NPM Library

**Install a specific version:**

- V5: `npm install react-router-dom@5`

- V6: `npm install react-router-dom@6`

- Latest version: `npm install react-router-dome@latest` (danger, sometimes this will bring in experimental/possibly buggy versions)

[React Router Documentation for Upgrading](https://reactrouter.com/docs/en/v6/upgrading/v5)

[Summary Video in More Depth](https://www.youtube.com/watch?v=zEQiNFAwDGo)

## Try it yourself

You can fork and clone this repository and try to update this app on your own. Just reading the changes below is not enough to fully understand the changes and how to code them or update the code that is no longer working.

On the main branch (on your fork/clone):

- run `npm install react-router-dom@6`,
- `npm start`
- Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
- Immediately, the page will not load due to an error
- Fix each error by using the React Router documentation or check the summaries below in order to implement the necessary updates to get the app working again.
- Be sure to click on each link/each page to find all the needed updates.

**Note:** There is a branch called `v6` where you can see the final conversion.

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
</Routes>
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
<Routes>
  <Route exact path="/" element={<Home />} />
  <Route path="/plants" element={<Index />}/>
</Routes>
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
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/plants" element={<Index />}/>
</Routes>
```

If you need a route to act as a catchall (behavior when you did not use `exact` prop in V5), you can do so by adding `*`

```js
<Switch>
  <Route path="/" element={<Home />} />
  <Route path="/plants/*" element={<Index />} />
</Switch>
```

### Navigation After Event: History => useNavigate

If you want to load a different page after an event (like a form submission), you would have used `useHistory`, now there is a new function called `useNavigate`, which is similar, but works a little differently.

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

There is also an updated way to do redirects. There is a new component called `Navigate` that should be used, rather than `Redirect`

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

Now, you must wrap all nested routes `Route` elements with `Routes`, even if there is only one route.

Now react-router routes are relative when they are nested.

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
  <Link to={`/plants/${id}/more-details/`}>
    See more details about this plant
  </Link>
  <Routes>
    <Route path="more-details" element={<p>This plant is very cool</p>} />
  </Routes>
</div>
```

It is important to update the route to have a `*` at the end to inform react router that there are more routes nested inside:

**App.js**

```js
<Route path="/plants/:id/*" element={<Show />}></Route>
```

### Nested Route Alternative

You can move the nested route to `App.js`. This allows all your routes to be in `App.js`, rather than having to hunt for them throughout your application. This is an organization/style preference.

**App.js**

```js
<Route path="/welcome/" element={<Welcome />}>
  <Route path="more-details" element={<p>You are now logged in</p>} />
</Route>
```

You must inform the component _where_ this component should be added. To do so you add an `Outlet` component from React Router. Then you can place `Outlet` wherever you need to. Here it is below the link but it could be above the link, or elsewhere on the page.

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

**Note:** There is no code in this app to demonstrate this.

### Link/NavLink

```js
// Old
<NavLink activeClassName={classes.active} />
// New
<NavLink className={(navData)=>navData.isActive ? classes.active : ''} />
```
