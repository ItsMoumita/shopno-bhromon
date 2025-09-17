import axios from "axios";
import { useMemo } from "react";
import useAuth from "./useAuth";

const useAxiosSecure = () => {
  const { user } = useAuth();

  const instance = useMemo(() => {
    // If user or user.accessToken is not available, return a basic axios instance
    if (!user || !user.accessToken) {
      return axios.create({
        baseURL: "https://localhost:5000",
      });
    }
    // If user and accessToken exist, return axios instance with Authorization header
    return axios.create({
      baseURL: "https://localhost:5000",
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
  }, [user]);

  return instance;
};

export default useAxiosSecure;