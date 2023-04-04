import "./Login.css";
import {
  Button,
  FormControl,
  TextField,
  Typography,
  FormHelperText,
  Box,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { FiEye, FiEyeOff } from "react-icons/fi";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { useForm } from "react-hook-form";
import { useState } from "react";
import authService from "../../../Services/AuthService";
import { NavLink, useNavigate } from "react-router-dom";
import notifyService from "../../../Services/NotifyService";
import CredentialsModel from "../../../Models/CredentialsModel";

function Login(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CredentialsModel>();
  const navigate = useNavigate();

  async function send(credentials: CredentialsModel) {
    try {
      await authService.login(credentials);
      notifyService.success("Welcome!");
      navigate("/vacations");
    } catch (err: any) {
      notifyService.error(err);
    }
  }
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="Login">
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
          <Typography variant="h5">Login</Typography>
          <form onSubmit={handleSubmit(send)}>
            <FormControl>
              <Box mt={2} mb={2}>
                <TextField
                  label="Email"
                  placeholder="Email..."
                  variant="outlined"
                  className="form-inputs"
                  type="email"
                  {...register("email", { required: true })}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />
                {errors.email && (
                  <FormHelperText sx={{ fontSize: 12 }} error>
                    {errors.email.type === "required" && "Email is required"}
                  </FormHelperText>
                )}
              </Box>

              <Box mt={2} mb={2}>
                <TextField
                  label="Password"
                  placeholder="Password..."
                  variant="outlined"
                  className="form-inputs"
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: true,
                  })}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon fontSize="small" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <IconButton onClick={togglePasswordVisibility}>
                        {showPassword ? (
                          <FiEye fontSize="small" />
                        ) : (
                          <FiEyeOff fontSize="small" />
                        )}
                      </IconButton>
                    ),
                  }}
                />
                {errors.password && (
                  <FormHelperText sx={{ fontSize: 12 }} error>
                    {errors.password.type === "required" &&
                      "Password is required"}
                  </FormHelperText>
                )}
              </Box>

              <Button variant="contained" type="submit" color="primary">
                Login
              </Button>
            </FormControl>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2">
                You don't have an account?{" "}
                <NavLink
                  to="/sign-up"
                  style={{ fontWeight: "bold", color: "primary.main" }}
                >
                  Sign up
                </NavLink>
              </Typography>
            </Box>
          </form>
        </Box>
      </Box>
    </div>
  );
}

export default Login;
