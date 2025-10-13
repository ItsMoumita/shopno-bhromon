
import axios from "axios";

const useAxiosPublic = () => {
  const instance = axios.create({
    baseURL: "https://shopno-bhromon-server.vercel.app",
  });

  return instance;
};

export default useAxiosPublic;