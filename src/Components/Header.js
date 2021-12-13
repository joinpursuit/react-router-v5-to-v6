import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <nav>
        <NavLink to="/">Welcome</NavLink>
        <h1>
          <NavLink to="/plants">Plants</NavLink>
        </h1>

        <NavLink to="/plants/new">New Plant</NavLink>
      </nav>
    </header>
  );
}
