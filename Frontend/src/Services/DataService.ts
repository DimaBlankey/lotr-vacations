import axios from "axios";
import appConfig from "../Utils/AppConfig";
import VacationModel from "../Models/VacationModel";
import FollowersModel from "../Models/FollowersModel";
import { VacationsActionType, vacationsStore } from "../Redux/VacationsState";

class DataService {
  public async getAllVacations(): Promise<VacationModel[]> {
    let vacations = vacationsStore.getState().vacations;
    if (vacations.length === 0) {
      const response = await axios.get<VacationModel[]>(appConfig.vacationsUrl);
      vacations = response.data;
      vacationsStore.dispatch({type: VacationsActionType.FetchVacations, payload: vacations})
    }
    return vacations;
  }

  public async addVacation(vacation: VacationModel): Promise<void> {
    var bodyFormData = new FormData();
    Object.entries(vacation).forEach(([key, value]: [string, any]) => {
      if (value?.$d) {
        value = value.$d.toJSON();
      }
      bodyFormData.append(key, value);
    })

    const response = await axios({
      method: "post",
      url: appConfig.vacationsUrl,
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    })

    //const response =   await axios.post<VacationModel>(appConfig.vacationsUrl, vacation);
    const addedVacation = response.data;
    vacationsStore.dispatch({type: VacationsActionType.AddVacation, payload: addedVacation})
  }

  public async deleteVacation(vacationId: number): Promise<void> {
    await axios.delete(appConfig.vacationsUrl + vacationId);
    vacationsStore.dispatch({type: VacationsActionType.DeleteVacation, payload:vacationId})
  }

  public async updateVacation(vacation: VacationModel): Promise<void> {
    const response = await axios.put<VacationModel>(appConfig.vacationsUrl + vacation.vacationId, vacation);
    const updatedVacation = response.data;
    vacationsStore.dispatch({type: VacationsActionType.UpdateVacation, payload:updatedVacation})
  }

  public async addFollowVacation(followers: FollowersModel): Promise<void> {
    const response = await axios.post<FollowersModel>(appConfig.followersUrl+ followers.vacationId);
    // const updatedVacation =  followers
    //  console.log(followers)
    vacationsStore.dispatch({type: VacationsActionType.AddFollower, payload:followers})
  }

  public async deleteFollower(vacationId: number): Promise<void> {
    await axios.delete(appConfig.followersUrl + vacationId);
    // vacationsStore.dispatch({type: VacationsActionType.UpdateVacation, payload:vacationId})
  }
}

const dataService = new DataService();

export default dataService;
