import VacationModel from "../../../Models/VacationModel";
import "./VacationCard.css";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface VacationCardProps {
    vacation: VacationModel;
}

function VacationCard(props:VacationCardProps): JSX.Element {

    function formatDate(startDate: string): string {
        const dateObj = new Date(startDate);
        const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', year: 'numeric' };
        return dateObj.toLocaleDateString('en-US', options);
      }

    return (
        <div className="VacationCard">		
            <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title= {props.vacation.destination}
        subheader={formatDate(props.vacation.startDate) + formatDate(props.vacation.endDate) + props.vacation.price }
      />
      <CardMedia
        component="img"
        height="194"
        image={props.vacation.imageUrl}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
        {props.vacation.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
      </CardActions>
     
    </Card>
        </div>
    );
}

export default VacationCard;
