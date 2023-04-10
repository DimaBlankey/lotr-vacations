import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../../HomeArea/Home/Home";
import PageNotFound from "../PageNotFound/PageNotFound";
import AddVacations from "../../VacationsArea/AddVacations/AddVacations";
import UpdateVacations from "../../VacationsArea/UpdateVacations/UpdateVacations";
import VacationsList from "../../VacationsArea/VacationsList/VacationsList";
import SignUp from "../../AuthArea/SignUp/SignUp";
import Login from "../../AuthArea/Login/Login";
import { authStore } from "../../../Redux/AuthState";
import { useEffect, useState } from "react";
import UserModel from "../../../Models/UserModel";

function Routing(): JSX.Element {
  const [user, setUser] = useState<UserModel>();
  const role = authStore.getState().user?.role;

  useEffect(() => {
    setUser(authStore.getState().user);
    const unsubscribe = authStore.subscribe(() => {
      setUser(authStore.getState().user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      {role == "admin" && (
        <>
          <Route path="/vacations" element={<VacationsList />} />
          <Route path="/add-vacations" element={<AddVacations />} />
          <Route
            path="/vacation/update/:vacationId"
            element={<UpdateVacations />}
          />
        </>
      )}
      {role == "user" && (
        <>
          <Route path="/vacations" element={<VacationsList />} />
        </>
      )}

      {
        <>
          <Route path="/vacations" element={<Navigate to="/login" />} />
          <Route path="/add-vacations" element={<Navigate to="/login" />} />
          <Route
            path="/vacation/update/:vacationId"
            element={<Navigate to="/login" />}
          />
        </>
      }
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default Routing;

