import { NavLink } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import "./Menu.css";

function Menu(): JSX.Element {
  return (
    <div className="Menu">
      <NavLink to="/home">
        <HomeIcon />
      </NavLink>
      <NavLink to="/home" className={"HomeLink"}>
        Home
      </NavLink>
      <span> | </span>
      <NavLink to="/vacations">Vacations</NavLink>
    </div>
  );
}

export default Menu;
