import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "@/composables/useAuth";
import { Config } from "@/config";
import { Notify } from "quasar";

export function makeClient(config: AxiosRequestConfig = {}): AxiosInstance {
  const clientConfig: AxiosRequestConfig = {
    ...{
      baseURL: Config.env("VITE_API_SERVER") as string,
      headers: {
        "Content-Type": "application/json",
      },
      validateStatus: /* istanbul ignore next */ (): boolean => true
    },
    ...config
  };

  const apiClient = axios.create(clientConfig);

  apiClient.interceptors.request.use(config => {
    const { user } = useAuth();

    if (user.value) {
      // TODO: update this logic after we have real auth
      config.headers["x-mcap-scopes-role"] = user.value.role.join(",");
      config.headers["x-mcap-scopes-underwriterid"] = user.value.id;
      config.headers["x-mcap-scopes-authority"] = Config.userAuthorityLevel;
    }

    config.headers["x-mcap-request-id"] = uuidv4();
    config.headers["x-mcap-correlation-id"] = uuidv4();

    return config;
  });

  apiClient.interceptors.response.use(
    response => {
      const { status, config } = response;

      if (status >= 400) {
        Notify.create({
          type: "negative",
          message: config.timeoutErrorMessage ?? "Network Error"
        });

        throw new Error("apiClient error");
      }

      return response;
    },
    () => {
      Notify.create({
        type: "negative",
        message: config.timeoutErrorMessage ?? "Network Error"
      });

      throw new Error("apiClient error");
    }
  );

  return apiClient;
}

export const apiClient = makeClient();
