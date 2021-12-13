// DEPENDENCIES
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
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
          <Routes>
            <Route
              exact
              path="/"
              element={<Navigate replace to="/welcome" />}
            />
            <Route path="/welcome/" element={<Welcome />}>
              <Route path="login" element={<p>You are now logged in</p>} />
            </Route>
            <Route exact path="/plants" element={<Index />} />
            <Route path="/plants/new" element={<New />} />
            <Route exact path="/plants/:id/*" element={<Show />} />
            <Route path="*" element={<FourOFour />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
