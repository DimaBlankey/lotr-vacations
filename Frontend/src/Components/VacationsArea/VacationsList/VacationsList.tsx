import { useEffect, useState } from "react";
import "./VacationsList.css";
import VacationModel from "../../../Models/VacationModel";
import dataService from "../../../Services/DataService";
import notifyService from "../../../Services/NotifyService";
import VacationCard from "../VacationCard/VacationCard";
import { vacationsStore } from "../../../Redux/VacationsState";
import { useNavigate } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import {
  Alert,
  Box,
  Checkbox,
  CircularProgress,
  Fab,
  FormControlLabel,
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

  //=================== Pagination and Filters =====================
  const PAGE_SIZE = 9;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    pageNumber: number
  ) => {
    setCurrentPage(pageNumber);
  };

  const [filters, setFilters] = useState({
    followed: false,
    future: false,
    active: false,
  });

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [event.target.name]: event.target.checked });
  };

  const getFilteredVacations = () => {
    return vacations
      .filter((v) => !filters.followed || v.isFollowing === 1)
      .filter((v) => !filters.future || new Date(v.startDate) > new Date())
      .filter((v) => {
        if (!filters.active) return true;
        const now = new Date();
        const startDate = new Date(v.startDate);
        const endDate = new Date(v.endDate);
        return startDate <= now && endDate > now;
      });
  };

  useEffect(() => {
    const filteredVacations = getFilteredVacations();
    setTotalPages(Math.ceil(filteredVacations.length / PAGE_SIZE));
  }, [vacations, filters]);

  const getPageVacations = () => {
    const filteredVacations = getFilteredVacations();
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    return filteredVacations.slice(startIndex, endIndex);
  };

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
          control={
            <Checkbox
              name="followed"
              checked={filters.followed}
              onChange={handleFilterChange}
            />
          }
          label="My Followed Vacations"
        />
        <FormControlLabel
          control={
            <Checkbox
              name="future"
              checked={filters.future}
              onChange={handleFilterChange}
            />
          }
          label="Future Vacations"
        />
        <FormControlLabel
          control={
            <Checkbox
              name="active"
              checked={filters.active}
              onChange={handleFilterChange}
            />
          }
          label="Active Vacations Now"
        />
      </Box>
      {vacations.length === 0 && <CircularProgress />}
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
      {vacations.length > 0 && (
        <Alert
          className="alert"
          severity="info"
          hidden={getFilteredVacations().length !== 0}
        >
          No vacations found... please reset your filters.
        </Alert>
      )}
    </div>
  );
}

export default VacationsList;
