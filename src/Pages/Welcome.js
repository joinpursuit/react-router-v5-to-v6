import { Link, Route } from "react-router-dom";

function Home() {
  return (
    <>
      <h2>Welcome</h2>
      <h3>To React Router Demo App!</h3>
      <Link to={`/welcome/login`}>Log In</Link>
      <Route path="/welcome/login">
        <p>You are now logged in</p>
      </Route>
    </>
  );
}

export default Home;
