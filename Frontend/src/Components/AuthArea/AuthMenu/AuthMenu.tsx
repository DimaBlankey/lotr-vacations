import { useEffect, useState } from "react";
import "./AuthMenu.css";
import UserModel from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import { NavLink, useNavigate } from "react-router-dom";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import { VacationsActionType, vacationsStore } from "../../../Redux/VacationsState";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';

function AuthMenu(): JSX.Element {
  const [user, setUser] = useState<UserModel>();
  useEffect(() => {
    setUser(authStore.getState().user);
    const unsubscribe = authStore.subscribe(() => {
      setUser(authStore.getState().user);
    });
    return () => unsubscribe();
  }, []);

  const navigate = useNavigate();

   function logout(){
      authService.logout();
      notifyService.success("Goodby!");
      navigate("/home");
      vacationsStore.dispatch({
        type: VacationsActionType.ClearState,
        payload: undefined
      });
  }

  return (
    <div className="AuthMenu">
      {!user && (
        <div>
          <span><AccountCircleIcon className="AccountCircleIcon"/> </span>
          <NavLink to="/login">Login</NavLink>
          <span> | </span>
          <NavLink to="/sign-up">Sign up</NavLink>
        </div>
      )}
      {user && (
        <div>
          <span><AccountCircleIcon className="AccountCircleIcon"/>
            Hello, {user.firstName} {user.lastName} {" "}
          </span>
          <NavLink to="/home" onClick={logout}className="LogoutLink">| Logout</NavLink>
          <NavLink to="/home" onClick={logout}><LogoutIcon /></NavLink>
        </div>
      )}
    </div>
  );
}

export default AuthMenu;
