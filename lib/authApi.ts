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
  const res = await api.post("/api/auth/logout");
  return res.data;
};

export const registerUser = async (data: FormData) => {
  const res = await api.post("/api/auth/register", data);
  return res.data;
};

export const verifyUserAPI = async ({ token }: { token: string }) => {
  const res = await api.post(`api/auth/verify-registration/${token}`);
  return res.data;
};

export const loginUserWithGoogle = () => {
  window.location.href = `${process.env.BACKEND_URL}/api/auth/google`;
};

export const loginUserWithX = () => {
  window.location.href = `${process.env.BACKEND_URL}/api/auth/x`;
};

export const forgotPassword = async (data: Object) => {
  const res = await api.post("/api/auth/forgot-password", data);
  return res.data;
};

export const resetPassword = async ({
  token,
  password,
}: {
  token: string;
  password: string;
}) => {
  const res = await api.post(`/api/auth/reset-password/${token}`, {
    password,
  });

  return res.data;
};
