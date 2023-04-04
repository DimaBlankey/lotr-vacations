import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../../HomeArea/Home/Home";
import PageNotFound from "../PageNotFound/PageNotFound";
import AddVacations from "../../VacationsArea/AddVacations/AddVacations";
import UpdateVacations from "../../VacationsArea/UpdateVacations/UpdateVacations";
import VacationsList from "../../VacationsArea/VacationsList/VacationsList";
import SignUp from "../../AuthArea/SignUp/SignUp";

function Routing(): JSX.Element {
    return (
        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/vacations" element={<VacationsList />} />
            <Route path="/add-vacations" element={<AddVacations/>} />
            <Route path="/update-vacation/:itemId" element={<UpdateVacations/>} />
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
}

export default Routing;
