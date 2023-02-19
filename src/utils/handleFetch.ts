import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { NavigateFunction } from "react-router-dom";
import { api } from "../services/api";

export function handleFetch(
  id: string,
  navigate: NavigateFunction,
  endpoint: string,
  redirectPath: string
) {
  return useQuery(
    endpoint,
    async () => {
      try {
        const { data } = await api.get(`/${endpoint}/${id}`);
        return data[endpoint];
      } catch (err) {
        const { response } = err as AxiosError;

        if (response?.status === 404) {
          navigate(`/${redirectPath}`);
        }
      }
    },
    { cacheTime: 0 }
  );
}
