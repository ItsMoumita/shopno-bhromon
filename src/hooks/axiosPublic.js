
import axios from "axios";

const useAxiosPublic = () => {
  const instance = axios.create({
    baseURL: "http://localhost:5173",
  });

  return instance;
};

export default useAxiosPublic;