import "./AddVacations.css";
import {
  Button,
  FormControl,
  TextField,
  Typography,
  FormHelperText,
  Box,
  InputAdornment,
  IconButton,
  TextareaAutosize,
  TextFieldProps,
} from "@mui/material";
import { FiEye, FiEyeOff } from "react-icons/fi";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import UserModel from "../../../Models/UserModel";
import { useForm } from "react-hook-form";
import { useState } from "react";
import authService from "../../../Services/AuthService";
import { NavLink, useNavigate } from "react-router-dom";
import notifyService from "../../../Services/NotifyService";
import VacationModel from "../../../Models/VacationModel";
import dataService from "../../../Services/DataService";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";

function AddVacations(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VacationModel>();
  const navigate = useNavigate();

  async function send(vacation: VacationModel) {
    try {
      await dataService.addVacation(vacation);
      notifyService.success("Vacation has been added!");
      navigate("/vacations");
    } catch (err: any) {
      notifyService.error(err);
    }
  }

  function setStartDate(newValue: any) {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="AddVacations">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          className="slide-down"
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            backdropFilter: "blur(20px)",
            width: "100%",
            maxWidth: "360px",
            mt: 2,

            borderColor: "gray.200",
            borderRadius: "30px",
            p: 4,
          }}
        >
          <Typography variant="h5">Add Vacation</Typography>
          <form onSubmit={handleSubmit(send)}>
            <FormControl>
              <Box mt={2} mb={2}>
                <TextField
                  label="Destination"
                  placeholder="Destination..."
                  variant="outlined"
                  className="form-inputs"
                  {...register("destination", {
                    required: true,
                    minLength: 3,
                    maxLength: 100,
                  })}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircleIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />
                {errors.destination && (
                  <FormHelperText sx={{ fontSize: 12 }} error>
                    {errors.destination.type === "required" &&
                      "Destination is required"}
                    {errors.destination.type === "minLength" &&
                      "Destination must be at least 3 characters"}
                    {errors.destination.type === "maxLength" &&
                      "Destination must be at most 100 characters"}
                  </FormHelperText>
                )}
              </Box>

              <Box mt={2} mb={2}>
                <TextareaAutosize
                    aria-label="minimum height"
                    minRows={3}
                  placeholder="Description..."
                  //   variant="outlined"
                  className="form-inputs"
                  {...register("description", {
                    required: true,
                    minLength: 10,
                    maxLength: 1000,
                  })}
                  //   InputProps={{
                  //     startAdornment: (
                  //       <InputAdornment position="start">
                  //         <AccountCircleIcon fontSize="small" />
                  //       </InputAdornment>
                  //     ),
                  //   }}
                />
                {errors.description && (
                  <FormHelperText sx={{ fontSize: 12 }} error>
                    {errors.description.type === "required" &&
                      "Description is required"}
                    {errors.description.type === "minLength" &&
                      "Description must be at least 10 characters"}
                    {errors.description.type === "maxLength" &&
                      "Description must be at most 1000 characters"}
                  </FormHelperText>
                )}
              </Box>

              <Box mt={2} mb={2}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Start Date"
                    //   value={startDate}
                    onChange={(newValue: any) => {
                      setStartDate(newValue);
                    }}
                    renderInput={(
                      params: JSX.IntrinsicAttributes & TextFieldProps
                    ) => <TextField {...params} />}
                    {...register("startDate", { required: true })}
                  />
                </LocalizationProvider>
                {errors.startDate && (
                  <FormHelperText sx={{ fontSize: 12 }} error>
                    Start Date is required
                  </FormHelperText>
                )}
              </Box>

              <Button variant="contained" type="submit" color="primary">
                Sign Me Up!
              </Button>
            </FormControl>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2">
                You already have an account?{" "}
                <NavLink
                  to="/login"
                  style={{ fontWeight: "bold", color: "primary.main" }}
                >
                  Login
                </NavLink>
              </Typography>
            </Box>
          </form>
        </Box>
      </Box>
    </div>
  );
}

export default AddVacations;
