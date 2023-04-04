import VacationModel from "../../../Models/VacationModel";
import "./VacationCard.css";


interface VacationCardProps {
    vacation: VacationModel;
}

function VacationCard(props:VacationCardProps): JSX.Element {
    return (
        <div className="VacationCard">
			<div>
             <img src={props.vacation.imageUrl}/> 
              {props.vacation.destination}
              {props.vacation.description}
              {props.vacation.startDate}
              {props.vacation.endDate}
              {props.vacation.price}
            </div>
        </div>
    );
}

export default VacationCard;
