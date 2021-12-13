# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Changes

Install npm install react-router-dom@5

npm install react-router-dom@6

nom install react-router-dome@latest

[React Router Documentation for Upgrading](https://reactrouter.com/docs/en/v6/upgrading/v5)

[Summary Video in More Depth](https://www.youtube.com/watch?v=zEQiNFAwDGo)

## Switch to Routes

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

## No more Nested Elements For Top Level Components

Use element prop instead

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

## No more Exact Prop

There is now a better algorithm for loading the correct routes

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

## Navigation After Event: History => useNavigate

## Link/NavLink

```js
// Old
<NavLink activeClassName={classes.active} />
// New
<NavLink className={(navData)=>navData.isActive ? classes.active : ''} />
```

## Redirects

```js
// Old
<Route exact path="/">
  <Redirect to="/welcome" />
</Route>

// New
<Route path="/" element={Navigate replace to="/welcome"} />

```

## Nested Routes

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

## Nested Route Alternative

Move the nested route to App.js

**App.js**

```js
<Route path="/welcome/" element={<Welcome />}>
  <Route path="more-details" element={<p>You are now logged in</p>} />
</Route>
```

**Show.js**

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
