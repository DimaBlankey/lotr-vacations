import VacationModel from "../../../Models/VacationModel";
import "./VacationCard.css";
import * as React from "react";
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { NavLink } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import UserModel from "../../../Models/UserModel";
import dataService from "../../../Services/DataService";
import FollowersModel from "../../../Models/FollowersModel";
import { authStore } from "../../../Redux/AuthState";

interface VacationCardProps {
  vacation: VacationModel;
}

function VacationCard(props: VacationCardProps): JSX.Element {
  const [user, setUser] = useState<UserModel>();
  useEffect(() => {
    setUser(authStore.getState().user);
    const unsubscribe = authStore.subscribe(() => {
      setUser(authStore.getState().user);
    });
    return () => unsubscribe();
  }, []);

  function handleFollow() {
    if (props.vacation.isFollowing === 0) {
      const follower = new FollowersModel();
      follower.userId = user.userId;
      follower.vacationId = +props.vacation.vacationId;
      dataService.addFollowVacation(follower);
    } else {
      const vacationId = +props.vacation.vacationId;
      dataService.deleteFollower(vacationId);
    }
  }

  function formatDate(date: string): string {
    const dateObj = new Date(date);
    const options: Intl.DateTimeFormatOptions = {
      month: "long",
      day: "numeric",
      year: "numeric",
    };
    return dateObj.toLocaleDateString("en-US", options);
  }

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <div className="VacationCard">
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          action={
            <>
              <IconButton aria-label="settings" onClick={handleClick}>
                <MoreVertIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem
                  component={NavLink}
                  to={`/update/${props.vacation.vacationId}`}
                  onClick={handleClose}
                >
                  Update
                </MenuItem>
                <MenuItem
                  component={NavLink}
                  to={`/delete/${props.vacation.vacationId}`}
                  onClick={handleClose}
                >
                  Delete
                </MenuItem>
              </Menu>
            </>
          }
          title={props.vacation.destination}
          subheader={
            formatDate(props.vacation.startDate) +
            " - " +
            formatDate(props.vacation.endDate)
          }
        />
        <CardMedia
          component="img"
          height="194"
          image={props.vacation.imageUrl}
        />
        <CardContent
          sx={{ maxHeight: 100, overflow: "auto" }}
          className="scrollbar"
        >
          <Typography variant="body2" color="text.secondary">
            {props.vacation.description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing sx={{ position: "relative" }}>
          <IconButton aria-label="add to follow" onClick={handleFollow}>
            {props.vacation.isFollowing === 1 ? (
              <FavoriteIcon style={{ color: "red" }} />
            ) : (
              <FavoriteIcon />
            )}
            <Typography variant="body2" color="text.secondary">
              {props.vacation.followersCount}
            </Typography>
          </IconButton>
          <Typography
            variant="body2"
            color="text.primary"
            sx={{ position: "absolute", bottom: 15, right: 10 }}
          >
            ${props.vacation.price}
          </Typography>
        </CardActions>
      </Card>
    </div>
  );
}

export default VacationCard;
