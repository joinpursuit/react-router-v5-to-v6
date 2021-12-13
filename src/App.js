// DEPENDENCIES
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// PAGES
import FourOFour from "./Pages/FourOFour";
import Welcome from "./Pages/Welcome";
import Index from "./Pages/Index";
import New from "./Pages/New";
import Show from "./Pages/Show";

// COMPONENTS
import Header from "./Components/Header";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <main>
          <Switch>
            <Route exact path="/">
              <Redirect to="/welcome" />
            </Route>
            <Route path="/welcome">
              <Welcome />
            </Route>
            <Route exact path="/plants">
              <Index />
            </Route>
            <Route path="/plants/new">
              <New />
            </Route>
            <Route exact path="/plants/:id">
              <Show />
            </Route>
            <Route path="*">
              <FourOFour />
            </Route>
          </Switch>
        </main>
      </Router>
    </div>
  );
}

export default App;
