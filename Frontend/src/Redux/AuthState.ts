import jwtDecode from "jwt-decode";
import UserModel from "../Models/UserModel";
import { createStore } from "redux";

export class AuthState {
  public token: string = null;
  public user: UserModel = null;
  public role: UserModel = null;

  public constructor() {
    this.token = localStorage.getItem("token");
    if (this.token) {
      this.user = jwtDecode<{ user: UserModel }>(this.token).user;
    }
  }
}

export enum AuthActionType {
  Signup,
  Login,
  Logout,
}

export interface AuthAction {
  type: AuthActionType;
  payload?: string;
}

export function authReducer(
  currentState = new AuthState(),
  action: AuthAction
): AuthState {
  const newState = { ...currentState };

  switch (action.type) {
    case AuthActionType.Signup:
    case AuthActionType.Login:
      newState.token = action.payload;
      newState.user = jwtDecode<{ user: UserModel }>(action.payload).user;
      localStorage.setItem("token", newState.token);
      break;
    case AuthActionType.Logout:
      newState.token = null;
      newState.user = null;
      localStorage.removeItem("token");
      break;
  }

  return newState;
}

export const authStore = createStore(authReducer);
