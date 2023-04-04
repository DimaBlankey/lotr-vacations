import axios from "axios";
import UserModel from "../Models/UserModel";
import appConfig from "../Utils/AppConfig";
import { AuthActionType, authStore } from "../Redux/AuthState";
import CredentialsModel from "../Models/CredentialsModel";

class AuthService {
  public async signUp(user: UserModel): Promise<void> {
    const response = await axios.post<string>(appConfig.signupUrl, user);
    const token = response.data;
    authStore.dispatch({ type: AuthActionType.Signup, payload: token });
  }

  public async login(credentials: CredentialsModel): Promise<void> {
    const response = await axios.post<string>(appConfig.loginUrl, credentials);
    const token = response.data;
    authStore.dispatch({ type: AuthActionType.Login, payload: token });
  }

  public logout(): void {
    authStore.dispatch({ type: AuthActionType.Logout });
  }
}

const authService = new AuthService();

export default authService;
