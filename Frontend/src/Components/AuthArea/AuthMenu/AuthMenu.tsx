import { useEffect, useState } from "react";
import "./AuthMenu.css";
import UserModel from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import { NavLink, useNavigate } from "react-router-dom";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";

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
  }

  return (
    <div className="AuthMenu">
      {!user && (
        <div>
          <span>Hello Guest | </span>
          <NavLink to="/login">Login</NavLink>
          <span> | </span>
          <NavLink to="/sign-up">Sign up</NavLink>
        </div>
      )}
      {user && (
        <div>
          <span>
            Hello {user.firstName} {user.lastName} |{" "}
          </span>
          <NavLink to="/home" onClick={logout}>Logout</NavLink>
        </div>
      )}
    </div>
  );
}

export default AuthMenu;
