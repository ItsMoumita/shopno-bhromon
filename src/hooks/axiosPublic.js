
import axios from "axios";

const useAxiosPublic = () => {
  const instance = axios.create({
    baseURL: "https://travel-server-liard-ten.vercel.app",
  });

  return instance;
};

export default useAxiosPublic;