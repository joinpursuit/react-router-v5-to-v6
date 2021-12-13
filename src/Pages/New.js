import { useNavigate } from "react-router-dom";
function New() {
  const navigate = useNavigate();
  const mockSubmit = (e) => {
    e.preventDefault();
    navigate("/plants");
  };
  return (
    <div>
      <h2>New</h2>
      <form onSubmit={mockSubmit}>
        <fieldset>
          <legend>Mock form</legend>
          <input type="text" />
          <input type="submit" />
        </fieldset>
      </form>
    </div>
  );
}

export default New;
