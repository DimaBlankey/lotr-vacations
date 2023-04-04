import axios from "axios";
import appConfig from "../Utils/AppConfig";
import VacationModel from "../Models/VacationModel";
import FollowersModel from "../Models/FollowersModel";

class DataService {
  public async getAllVacations(): Promise<VacationModel[]> {
    const response = await axios.get<VacationModel[]>(appConfig.vacationsUrl);
    const categories = response.data;
    return categories;
  }

  public async addVacation(vacation: VacationModel): Promise<void> {
    await axios.post<VacationModel>(appConfig.vacationsUrl, vacation);
  }

  public async deleteVacation(vacationId: number): Promise<void> {
    await axios.delete(appConfig.vacationsUrl + vacationId);
  }

  public async updateVacation(vacation: VacationModel): Promise<void> {
    const response = await axios.put<VacationModel>(
      appConfig.vacationsUrl + vacation.vacationId,
      vacation
    );
    const updatedVacation = response.data;
  }

  public async addFollowVacation(followers: FollowersModel): Promise<void> {
    await axios.post<FollowersModel>(appConfig.followersUrl, followers);
  }

  public async deleteFollower(vacationId: number): Promise<void> {
    await axios.delete(appConfig.followersUrl + vacationId);
  }
}

const dataService = new DataService();

export default dataService;
