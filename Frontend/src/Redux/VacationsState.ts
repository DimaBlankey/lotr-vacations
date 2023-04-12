import { createStore } from "redux";
import VacationModel from "../Models/VacationModel";

export class VacationsState {
  public vacations: VacationModel[] = [];
}

export enum VacationsActionType {
  FetchVacations,
  AddVacation,
  UpdateVacation,
  DeleteVacation,
  AddFollower,
  DeleteFollower,
  ClearState
}

export interface VacationsAction {
  type: VacationsActionType;
  payload: any;
}

export function vacationsReducer(
  currentState = new VacationsState(),
  action: VacationsAction
): VacationsState {
  const newState = { ...currentState };
  newState.vacations = [ ...currentState.vacations ]
  switch (action.type) {
    case VacationsActionType.FetchVacations:
      newState.vacations = action.payload;
      break;
    case VacationsActionType.AddVacation:
      // newState.vacations.push(action.payload);
      return new VacationsState();
      break;
    case VacationsActionType.UpdateVacation:
      // const indexToUpdate = newState.vacations.findIndex(
      //   (v) => v.vacationId === action.payload.vacationId
      // );
      // if (indexToUpdate >= 0) {
      //   newState.vacations[indexToUpdate] = action.payload;
      // }
      return new VacationsState();
      break;
       case VacationsActionType.AddFollower:
        const followedVacation = newState.vacations.find(x => x.vacationId == action.payload.vacationId)
        if (followedVacation)
         followedVacation.isFollowing = 1
         followedVacation.followersCount += 1
        break;
        case VacationsActionType.DeleteFollower:
          const unFollowedVacation = newState.vacations.find(x => x.vacationId == action.payload.vacationId)
          if (unFollowedVacation)
           unFollowedVacation.isFollowing = 0
           unFollowedVacation.followersCount -= 1
          break;
    case VacationsActionType.DeleteVacation:
      const indexToDelete = newState.vacations.findIndex(
        (v) => v.vacationId === action.payload
      );
      if (indexToDelete >= 0) {
        newState.vacations.splice(indexToDelete, 1);
      }
      break;
      case VacationsActionType.ClearState: 
      return new VacationsState();
  }
  return newState;
}

export const vacationsStore = createStore(vacationsReducer);
