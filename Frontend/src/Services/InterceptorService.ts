import axios from "axios";
import { authStore } from "../Redux/AuthState";

class InterceptorService {
  public create(): void {
    axios.interceptors.request.use((requestObject) => {
      if (authStore.getState().token) {
        requestObject.headers = {
          authorization: "Bearer " + authStore.getState().token,
        };
      }

      return requestObject;
    });
  }
}

const interceptorService = new InterceptorService();

export default interceptorService;
