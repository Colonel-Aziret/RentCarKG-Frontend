import api from "../axios";

export const getCars = async () => {
  const response = await api.get("/cars");
  return response.data;
};
