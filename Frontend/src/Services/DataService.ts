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
      vacationsStore.dispatch({
        type: VacationsActionType.FetchVacations,
        payload: vacations,
      });
    }
    return vacations;
  }

  public async getOneVacation(vacationId: number): Promise<VacationModel> {
    
    let vacations = vacationsStore.getState().vacations;
    let vacation = vacations.find(v => v.vacationId === vacationId) 

    if(!vacation){
    const response = await axios.get<VacationModel>(
      appConfig.vacationsUrl + vacationId
    );
     vacation = response.data;
    }
    return vacation;
  }

  public async addVacation(vacation: VacationModel): Promise<void> {
    var bodyFormData = new FormData();
    Object.entries(vacation).forEach(([key, value]: [string, any]) => {
      if (value?.$d) {
        value = value.$d.toJSON();
      }
      bodyFormData.append(key, value);
    });

    const response = await axios({
      method: "post",
      url: appConfig.vacationsUrl,
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    });
    const addedVacation = response.data;
    vacationsStore.dispatch({
      type: VacationsActionType.AddVacation,
      payload: addedVacation,
    });
  }

  public async updateVacation(vacation: VacationModel): Promise<void> {
    var bodyFormData = new FormData();
    Object.entries(vacation).forEach(([key, value]: [string, any]) => {
      if (value?.$d) {
        value = value.$d.toJSON();
      }
      bodyFormData.append(key, value);
    });

    const response = await axios({
      method: "put",
      url: appConfig.vacationsUrl + vacation.vacationId,
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    });

    const updatedVacation = response.data;
    vacationsStore.dispatch({
      type: VacationsActionType.UpdateVacation,
      payload: updatedVacation,
    });

    // const response = await axios.put<VacationModel>(
    //   appConfig.vacationsUrl + vacation.vacationId,
    //   vacation
    // );
    // const updatedVacation = response.data;
    // vacationsStore.dispatch({
    //   type: VacationsActionType.UpdateVacation,
    //   payload: updatedVacation,
    // });
  }

  public async deleteVacation(vacationId: number): Promise<void> {
    await axios.delete(appConfig.vacationsUrl + vacationId);
    vacationsStore.dispatch({
      type: VacationsActionType.DeleteVacation,
      payload: vacationId,
    });
  }

  public async addFollowVacation(followers: FollowersModel): Promise<void> {
    await axios.post<FollowersModel>(
      appConfig.followersUrl + followers.vacationId
    );
    vacationsStore.dispatch({
      type: VacationsActionType.AddFollower,
      payload: followers,
    });
  }

  public async deleteFollower(followers: FollowersModel): Promise<void> {
    await axios.delete(appConfig.followersUrl + followers.vacationId);
    vacationsStore.dispatch({
      type: VacationsActionType.DeleteFollower,
      payload: followers,
    });
  }
}

const dataService = new DataService();

export default dataService;
