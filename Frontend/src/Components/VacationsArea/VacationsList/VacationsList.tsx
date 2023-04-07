import { useEffect, useState } from "react";
import "./VacationsList.css";
import VacationModel from "../../../Models/VacationModel";
import dataService from "../../../Services/DataService";
import notifyService from "../../../Services/NotifyService";
import VacationCard from "../VacationCard/VacationCard";
import { vacationsStore } from "../../../Redux/VacationsState";

function VacationsList(): JSX.Element {
  const [vacations, setVacations] = useState<VacationModel[]>([]);

  useEffect(() => {
    dataService.getAllVacations().catch((err) => notifyService.error(err));

    const unsubscribe = vacationsStore.subscribe(() => {
      const vacations = vacationsStore.getState().vacations;
      setVacations(vacations);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="VacationsList">
      {vacations.map((v) => (
        <div key={v.vacationId} className="vacation-card">
          <VacationCard vacation={v} />
        </div>
      ))}
    </div>
  );
}

export default VacationsList;
