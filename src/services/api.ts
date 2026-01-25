import axios from "axios";

export const api = axios.create({
  baseURL: "https://folly-backend-2.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export const createPix = async (payload: any) => {
  const response = await api.post("/api/pix/create", payload);
  return response.data;
};