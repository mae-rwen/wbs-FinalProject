import { NavLink } from "react-router-dom";
export default function Footer() {
  return (
    <div className="d-flex flex-column bg-light footer">
      <div className=" p-2 d-flex gap-3 justify-content-center ">
        <NavLink to="/aboutus" className="text-decoration-none text-dark">
          About us
        </NavLink>
        <NavLink to="/instructions" className="text-decoration-none text-dark">
          How does it work
        </NavLink>
        <NavLink to="/categories" className="text-decoration-none text-dark">
          Explore
        </NavLink>
        <NavLink to="/tc" className="text-decoration-none text-dark">
          Terms&Conditions
        </NavLink>
      </div>
      <div className="text-center">&copy; 2023 Vibely</div>
    </div>
  );
}