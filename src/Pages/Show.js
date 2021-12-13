import { Link, Route, Routes, useParams } from "react-router-dom";

function Show() {
  const { id } = useParams();
  return (
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
  );
}

export default Show;
