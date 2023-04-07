import "./AddVacations.css";
import {
  Button,
  FormControl,
  TextField,
  Typography,
  FormHelperText,
  Box,
  FormLabel,
  Input,
} from "@mui/material";
import UserModel from "../../../Models/UserModel";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import authService from "../../../Services/AuthService";
import { NavLink, useNavigate } from "react-router-dom";
import notifyService from "../../../Services/NotifyService";
import VacationModel from "../../../Models/VacationModel";
import dataService from "../../../Services/DataService";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function AddVacations(): JSX.Element {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<VacationModel>();
  const navigate = useNavigate();

  async function send(vacation: VacationModel) {
    try {
      vacation.image = (vacation.image as unknown as FileList)[0];
      await dataService.addVacation(vacation);
      notifyService.success("Vacation has been added!");
      navigate("/vacations");
    } catch (err: any) {
      notifyService.error(err);
    }
  }

  const [image, setImage] = useState<File | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

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
                <FormLabel>Destination</FormLabel>
                <TextField
                  placeholder="Destination..."
                  variant="outlined"
                  className="form-inputs"
                  {...register("destination", {
                    required: true,
                    minLength: 3,
                    maxLength: 100,
                  })}
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
                <FormLabel>Description</FormLabel>
                <TextField
                  placeholder="Description..."
                  variant="outlined"
                  multiline
                  rows={4}
                  className="form-inputs"
                  {...register("description", {
                    required: true,
                    minLength: 10,
                    maxLength: 1000,
                  })}
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
                <FormLabel>Start Date</FormLabel>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Controller
                    name="startDate"
                    control={control}
                    defaultValue={null}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <DatePicker
                        value={field.value}
                        onChange={(newValue) => field.onChange(newValue)}
                        // renderInput={(params : any) => <TextField {...params} />}
                      />
                    )}
                  />
                </LocalizationProvider>
                {errors.startDate && errors.startDate.type === "required" && (
                  <FormHelperText sx={{ fontSize: 12 }} error>
                    Start date is required
                  </FormHelperText>
                )}
              </Box>

              <Box mt={2} mb={2}>
                <FormLabel>End Date</FormLabel>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Controller
                    name="endDate"
                    control={control}
                    defaultValue={null}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <DatePicker
                        value={field.value}
                        onChange={(newValue) => field.onChange(newValue)}
                        // renderInput={(params : any) => <TextField {...params} />}
                      />
                    )}
                  />
                </LocalizationProvider>
                {errors.startDate && errors.startDate.type === "required" && (
                  <FormHelperText sx={{ fontSize: 12 }} error>
                    Start date is required
                  </FormHelperText>
                )}
              </Box>

              <Box mt={2} mb={2}>
                <FormLabel>Vacation Price</FormLabel>
                <TextField
                  placeholder="..."
                  type="number"
                  variant="outlined"
                  className="form-inputs"
                  {...register("price", {
                    required: true,
                    min: 0,
                  })}
                />
                {errors.price && errors.price.type === "required" && (
                  <FormHelperText sx={{ fontSize: 12 }} error>
                    Price is required
                  </FormHelperText>
                )}
                {errors.price && errors.price.type === "min" && (
                  <FormHelperText sx={{ fontSize: 12 }} error>
                    Price must be a positive number
                  </FormHelperText>
                )}
              </Box>

              <input
                type="file"
                accept="image/*"
                {...register("image")}
                required
              />

              {/* <Box mt={2} mb={2}>
                <FormLabel>Upload Image</FormLabel>
                <Input
                  type="file"
                  onChange={handleImageUpload}
                
                  required
                />
                {errors.image && (
                  <FormHelperText sx={{ fontSize: 12 }} error>
                    {errors.image.type === "required" && "Image is required"}
                  </FormHelperText>
                )}
                {image && (
                  <Box
                    mt={2}
                    mb={2}
                    maxWidth="100%"
                    maxHeight="300px"
                    overflow="hidden"
                  >
                    <img
                      src={URL.createObjectURL(image)}
                      alt="uploaded-image"
                      style={{ maxWidth: "100%", maxHeight: "100%" }}
                    />
                  </Box>
                )}
              </Box> */}

              <Button variant="contained" type="submit" color="primary">
                Add Vacation
              </Button>
            </FormControl>
          </form>
        </Box>
      </Box>
    </div>
  );
}

export default AddVacations;
