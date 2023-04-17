import axios from "axios";
import { AuthActionType, authStore } from "../Redux/AuthState";

class InterceptorService {
  public create(): void {
    this.setupRequestInterceptor();
    this.setupResponseInterceptor();
  }

  private setupRequestInterceptor(): void {
    axios.interceptors.request.use((requestObject) => {
      if (authStore.getState().token) {
        requestObject.headers.authorization =
          "Bearer " + authStore.getState().token;
      }
      return requestObject;
    });
  }

  private setupResponseInterceptor(): void {
    axios.interceptors.response.use(
      (response) => {
        // If the response is successful, return it
        return response;
      },
      (error) => {
        // If the response status is 401 (Unauthorized), log out the user
        if (error.response && error.response.status === 498) {
          this.logoutUser();
        }
        // Continue the error handling process by passing the error along
        return Promise.reject(error);
      }
    );
  }

  private logoutUser(): void {
    authStore.dispatch({ type: AuthActionType.Logout });
  }
}

const interceptorService = new InterceptorService();

export default interceptorService;

// import axios, { AxiosHeaders } from "axios";
// import { authStore } from "../Redux/AuthState";

// class InterceptorService {
//   public create(): void {
//     axios.interceptors.request.use((requestObject) => {
//       if (authStore.getState().token) {
//         requestObject.headers = new axios.AxiosHeaders({
//           authorization: "Bearer " + authStore.getState().token,
//         });
//       }
//       return requestObject;
//     });
//   }
// }

// const interceptorService = new InterceptorService();

// export default interceptorService;
