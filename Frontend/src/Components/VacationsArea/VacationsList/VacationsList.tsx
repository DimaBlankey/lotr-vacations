import { useEffect, useState } from "react";
import "./VacationsList.css";
import VacationModel from "../../../Models/VacationModel";
import dataService from "../../../Services/DataService";
import notifyService from "../../../Services/NotifyService";
import VacationCard from "../VacationCard/VacationCard";
import { vacationsStore } from "../../../Redux/VacationsState";
import { NavLink, Route, useNavigate } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import Home from "../../HomeArea/Home/Home";
import Login from "../../AuthArea/Login/Login";
import { Router } from "react-router-dom";
import { Navigate } from "react-router-dom";
import {
  Box,
  Checkbox,
  Fab,
  FormControlLabel,
  FormGroup,
  Pagination,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import BarChartIcon from "@mui/icons-material/BarChart";

function VacationsList(): JSX.Element {
  const [vacations, setVacations] = useState<VacationModel[]>([]);
  const [user, setUser] = useState<UserModel>();
  const role = authStore.getState().user?.role;

  const navigate = useNavigate();

  useEffect(() => {
    setUser(authStore.getState().user);
    console.log();
    const unsubscribe = authStore.subscribe(() => {
      setUser(authStore.getState().user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    dataService
      .getAllVacations()
      .then((responseVacations) => {
        setVacations(responseVacations);
        setTotalPages(Math.ceil(responseVacations.length / PAGE_SIZE));
      })

      .catch((err) => notifyService.error(err));

    const unsubscribe = vacationsStore.subscribe(() => {
      const vacations = vacationsStore.getState().vacations;
      setVacations(vacations);
    });
    return () => unsubscribe();
  }, []);

  function handelClickAddIcon() {
    navigate("/add-vacations");
  }

  function handelClickReports() {
    navigate("/reports");
  }

  //=================== Pagination =====================
  const PAGE_SIZE = 9;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    pageNumber: number
  ) => {
    setCurrentPage(pageNumber);
  };

  const getPageVacations = () => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    return vacations.slice(startIndex, endIndex);
  };

  //=================== Filters =====================

  return (
    <div className="VacationsList">
      <h1>Vacations</h1>
      {role == "admin" && (
        <Box sx={{ "& > :not(style)": { m: 1 } }}>
          <Fab color="primary" aria-label="add" onClick={handelClickAddIcon}>
            <AddIcon />
          </Fab>
          <Fab color="primary" aria-label="add" onClick={handelClickReports}>
            <BarChartIcon />
          </Fab>
        </Box>
      )}
      <Box>
        <FormControlLabel
          control={<Checkbox />}
          label="My Followed Vacations"
        />
        <FormControlLabel control={<Checkbox />} label="Future Vacations" />
        <FormControlLabel control={<Checkbox />} label="Active Vacations Now" />
      </Box>
      <div className="VacationsList-cards">
        {getPageVacations().map((v) => (
          <div key={v.vacationId} className="vacation-card">
            <VacationCard vacation={v} />
          </div>
        ))}
      </div>
      <div className="pagination">
        {totalPages > 1 && (
          <div className="pagination">
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              variant="outlined"
              color="primary"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default VacationsList;
