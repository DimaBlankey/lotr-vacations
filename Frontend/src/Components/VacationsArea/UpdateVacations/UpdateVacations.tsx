import { useNavigate, useParams } from "react-router-dom";
import "./UpdateVacations.css";
import { Controller, useForm } from "react-hook-form";
import VacationModel from "../../../Models/VacationModel";
import { useEffect, useState } from "react";
import { data } from "jquery";
import dataService from "../../../Services/DataService";
import notifyService from "../../../Services/NotifyService";
import {
  Button,
  FormControl,
  TextField,
  Typography,
  FormHelperText,
  Box,
  FormLabel,
  Input,
  Grid,
  InputBase,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import dayjs from "dayjs";


function UpdateVacations(): JSX.Element {
  const params = useParams();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<VacationModel>();

  const navigate = useNavigate();
  const startDateValue = watch("startDate");

  const [vacation, setVacation] = useState<VacationModel>();

  useEffect(() => {
    const vacationId = +params.vacationId;
    dataService
      .getOneVacation(vacationId)
      .then((responseVacation) => {
        setValue("vacationId", responseVacation.vacationId);
        setValue("destination", responseVacation.destination);
        setValue("description", responseVacation.description);
        // setValue("startDate", responseVacation.startDate);
        // setValue("endDate", responseVacation.endDate);
        const date = new Date();
        const year = date.getUTCFullYear();
        const month = date.getUTCMonth() + 1;
        const day = date.getUTCDate();
        const formattedDate = `${year}-${month
          .toString()
          .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
        console.log(responseVacation.startDate);
        // setValue("startDate", formattedDate);
        setValue("price", responseVacation.price);
        // setValue("image", responseVacation.image);
        // console.log(responseVacation.image)
        // console.log(responseVacation.imageUrl)
        setValue("imageUrl", responseVacation.imageUrl);
        setVacation(responseVacation);
      })
      .catch((err) => notifyService.error(err));
  }, []);

  async function send(vacation: VacationModel) {
    try {
      vacation.image = (vacation.image as unknown as FileList)[0];
      await dataService.updateVacation(vacation);
      notifyService.success("Vacation has been updated");
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

  function navigateBack(){
    navigate("/vacations");
  }

  return (
    <div className="UpdateVacations">
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
            maxWidth: "450px",
            mt: 2,

            borderColor: "gray.200",
            borderRadius: "30px",
            p: 4,
          }}
        >
          <Typography variant="h5">Update Vacation</Typography>
          <form onSubmit={handleSubmit(send)}>
            <FormControl>
              <input type="hidden" {...register("vacationId")} />
              <Box mt={2} mb={2}>
                <FormLabel>Destination</FormLabel>
                <TextField
                  fullWidth
                  autoFocus
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
                  fullWidth
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
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Box mt={2} mb={2}>
                    <FormLabel>Start Date</FormLabel>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <Controller
                        name="startDate"
                        control={control}
                        defaultValue={null}
                        rules={{
                          required: true,
                        }}
                        render={({ field }) => (
                          <DatePicker
                            value={field.value}
                            onChange={(newValue) => field.onChange(newValue)}
                          />
                        )}
                      />
                    </LocalizationProvider>
                    {errors.startDate &&
                      errors.startDate.type === "required" && (
                        <FormHelperText sx={{ fontSize: 12 }} error>
                          Start date is required
                        </FormHelperText>
                      )}
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box mt={2} mb={2}>
                    <FormLabel>End Date</FormLabel>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <Controller
                        name="endDate"
                        control={control}
                        defaultValue={null}
                        rules={{
                          required: true,
                          validate: (value) =>
                            !dayjs(value).isBefore(dayjs(startDateValue)) ||
                            "End date must be after start date",
                        }}
                        render={({ field }) => (
                          <DatePicker
                            value={field.value}
                            onChange={(newValue) => field.onChange(newValue)}
                          />
                        )}
                      />
                    </LocalizationProvider>
                    {errors.endDate && errors.endDate.type === "required" && (
                      <FormHelperText sx={{ fontSize: 12 }} error>
                        Start date is required
                      </FormHelperText>
                    )}
                       {errors.endDate && errors.endDate.type === "validate" && (
                      <FormHelperText sx={{ fontSize: 12 }} error>
                        {errors.endDate.message}
                      </FormHelperText>
                    )}
                  </Box>
                </Grid>
              </Grid>

              <Box mt={2} mb={2}>
                <FormLabel>Price</FormLabel>
                <TextField
                  fullWidth
                  placeholder="$"
                  type="text"
                  variant="outlined"
                  className="form-inputs"
                  {...register("price", {
                    required: true,
                    pattern: /^[0-9]+([.][0-9]+)?$/,
                    min: 0,
                    max: 10000,
                  })}
                />
                {errors.price && errors.price.type === "required" && (
                  <FormHelperText sx={{ fontSize: 12 }} error>
                    Price is required
                  </FormHelperText>
                )}
                {errors.price && errors.price.type === "pattern" && (
                  <FormHelperText sx={{ fontSize: 12 }} error>
                    Please enter a valid number
                  </FormHelperText>
                )}

                {errors.price && errors.price.type === "min" && (
                  <FormHelperText sx={{ fontSize: 12 }} error>
                    Price must be a positive number
                  </FormHelperText>
                )}
                {errors.price && errors.price.type === "max" && (
                  <FormHelperText sx={{ fontSize: 12 }} error>
                    Price must be up to 10,000
                  </FormHelperText>
                )}
              </Box>
              <Box mt={2} mb={2}>
                <FormLabel>
                  {" "}
                  <CloudUploadIcon /> Upload Image
                </FormLabel>
                <input
                  type="file"
                  accept="image/*"
                  {...register("image")}
                  onChange={handleImageUpload}
                />

                {image ? (
                  <Box
                    mt={2}
                    mb={2}
                    maxWidth="90%"
                    maxHeight="300px"
                    overflow="hidden"
                  >
                    <img
                      src={URL.createObjectURL(image)}
                      alt="uploaded-image"
                      style={{ maxWidth: "90%", maxHeight: "90%" }}
                    />
                  </Box>
                ) : (
                  <Box
                    mt={2}
                    mb={2}
                    maxWidth="90%"
                    maxHeight="300px"
                    overflow="hidden"
                  >
                    <img
                      src={vacation?.imageUrl}
                      alt="default-image"
                      style={{ maxWidth: "90%", maxHeight: "90%" }}
                    />
                  </Box>
                )}
              </Box>
              <Button
                variant="contained"
                type="submit"
                color="primary"
                sx={{ mt: 3, mb: 2 }}
              >
                Update Vacation
              </Button>
              <Button variant="contained" type="reset" color="inherit" onClick={navigateBack}>
                Cancel
              </Button>
            </FormControl>
          </form>
        </Box>
      </Box>
    </div>
  );
}

export default UpdateVacations;
