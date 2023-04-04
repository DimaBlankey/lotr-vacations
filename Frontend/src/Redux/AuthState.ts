import jwtDecode from "jwt-decode";
import UserModel from "../Models/UserModel";
import { createStore } from "redux";

export class AuthState {
  public token: string = null;
  public user: UserModel = null;
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
      break;
    case AuthActionType.Logout:
      newState.token = null;
      newState.user = null;
      break;
  }

  return newState;
}

export const authStore = createStore(authReducer);
