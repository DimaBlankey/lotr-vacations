import { useNavigate, useParams } from "react-router-dom";
import "./UpdateVacations.css";
import { useForm } from "react-hook-form";
import VacationModel from "../../../Models/VacationModel";
import { useEffect, useState } from "react";
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
  Grid,
  OutlinedInput,
} from "@mui/material";
import dayjs from "dayjs";

function UpdateVacations(): JSX.Element {
  const params = useParams();

  const {
    register,
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
        setValue(
          "startDate",
          dayjs(responseVacation.startDate).format("YYYY-MM-DD")
        );
        setValue(
          "endDate",
          dayjs(responseVacation.endDate).format("YYYY-MM-DD")
        );

        setValue("price", responseVacation.price);

        setValue("imageUrl", responseVacation.imageUrl);
        setVacation(responseVacation);
      })
      .catch((err) => notifyService.error(err));
  }, []);

  async function send(vacation: VacationModel) {
    try {
      vacation.image = (vacation.image as unknown as FileList)[0];

      vacation.startDate = dayjs(vacation.startDate).format("YYYY-MM-DD");
      vacation.endDate = dayjs(vacation.endDate).format("YYYY-MM-DD");

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

  function navigateBack() {
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
                    <div className="custom-mui-input">
                      <input
                        type="date"
                        {...register("startDate", { required: true })}
                      />
                      {errors.startDate &&
                        errors.startDate.type === "required" && (
                          <FormHelperText sx={{ fontSize: 12 }} error>
                            Date is required
                          </FormHelperText>
                        )}
                    </div>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box mt={2} mb={2}>
                    <FormLabel>End Date</FormLabel>
                    <div className="custom-mui-input">
                      <input
                        type="date"
                        {...register("endDate", {
                          required: true,
                          validate: (value) =>
                            !startDateValue ||
                            new Date(value) >= new Date(startDateValue),
                        })}
                      />
                      {errors.endDate && errors.endDate.type === "required" && (
                        <FormHelperText sx={{ fontSize: 12 }} error>
                          Date is required
                        </FormHelperText>
                      )}
                      {errors.endDate && errors.endDate.type === "validate" && (
                        <FormHelperText sx={{ fontSize: 12 }} error>
                          End Date cannot be before Start Date
                        </FormHelperText>
                      )}
                    </div>
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
                <FormControl fullWidth variant="outlined" sx={{ mt: 2, mb: 2 }}>
                  <FormLabel>Upload Image</FormLabel>

                  <OutlinedInput
                    id="image-file"
                    type="file"
                    inputProps={{ accept: "image/*" }}
                    {...register("image")}
                    onChange={handleImageUpload}
                  />
                  {errors.image && errors.image.type === "required" && (
                    <FormHelperText sx={{ fontSize: 12 }} error>
                      Image is required
                    </FormHelperText>
                  )}
                </FormControl>

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
                      alt="uploaded"
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
                      alt="default"
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
              <Button
                variant="contained"
                type="reset"
                color="inherit"
                onClick={navigateBack}
              >
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
