import { NavLink } from "react-router-dom";
import "./Menu.css";

function Menu(): JSX.Element {
    return (
        <div className="Menu">
			<NavLink to="/home">Home</NavLink>
            <span> | </span>
			<NavLink to="/vacations">Vacations</NavLink>
            <span> | </span>
			<NavLink to="/add-vacations">Add Vacations</NavLink>
            <span> | </span>
			<NavLink to="/reports">Reports</NavLink>
           
        </div>
    );
}

export default Menu;
