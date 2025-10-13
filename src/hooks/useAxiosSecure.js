import axios from "axios";
import { useEffect } from "react";
import { getAuth } from "firebase/auth";

const axiosSecure = axios.create({
  baseURL: "https://shopno-bhromon-server.vercel.app", 
});

const useAxiosSecure = () => {
  useEffect(() => {
    const reqInterceptor = axiosSecure.interceptors.request.use(async (config) => {
      const auth = getAuth();
      const currentUser = auth.currentUser;
      if (currentUser) {
        const token = await currentUser.getIdToken( true);
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor);
    };
  }, []);

  return axiosSecure;
};

export default useAxiosSecure;