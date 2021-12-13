import { Link, Route, useParams } from "react-router-dom";

function Show() {
  const { id } = useParams();
  return (
    <div>
      <h2>Show Page</h2>
      <h3>This plant needs medium light and infrequent watering.</h3>
      <Link to={`/plants/more-details`}>See more details about this plant</Link>
      <Route path={`/plants/more-details`}>
        <p>This plant is very cool</p>
      </Route>
    </div>
  );
}

export default Show;
