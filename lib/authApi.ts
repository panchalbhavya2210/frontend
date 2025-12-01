import api from "./api";

export const loginUser = async (data: Object) => {
  const res = await api.post("/api/auth/login", data);
  return res.data;
};

export const getProfile = async () => {
  const res = await api.get("/api/auth/me");
  return res.data;
};

export const logoutUser = async () => {
  const res = await api.post("/auth/logout");
  return res.data;
};

export const registerUser = async (data: Object) => {
  const res = await api.post("/api/auth/register", data);
  return res.data;
};
