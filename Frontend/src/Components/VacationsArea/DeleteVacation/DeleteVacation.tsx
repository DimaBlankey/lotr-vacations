import { Button, Modal } from "@mui/material";
import "./DeleteVacation.css";
import dataService from "../../../Services/DataService";
import notifyService from "../../../Services/NotifyService";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";


function DeleteVacation(): JSX.Element {

  const navigate = useNavigate();

      async function deleteMe() {
    try {
        // const ok = window.confirm("Are you sure?");
        // if(!ok) return;
        // await dataService.deleteVacation(vacationId);
        notifyService.success("Vacations has been deleted");
        navigate("/vacations");
    }
    catch(err: any) {
        notifyService.error(err);
    }
}

    const [open, setOpen] = useState(false);
 const handleOpenModal = () => setOpen(true);
const handleCloseModal = () => setOpen(false);
const handleDelete = () => {
  deleteMe();
//   handleClose();
};



    return (
        <div className="DeleteVacation">
			<div>
            <Modal open={open} onClose={handleCloseModal}>
        <div>
          <p>Are you sure you want to delete this vacation?</p>
          <Button variant="contained" color="error" onClick={handleDelete}>
            OK
          </Button>
          <Button variant="contained" onClick={handleCloseModal}>
            Cancel
          </Button>
        </div>
      </Modal>
            </div>
        </div>
    );
}

export default DeleteVacation;
