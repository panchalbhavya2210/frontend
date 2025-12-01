// import { create } from "zustand";
// import { loginUser, logoutUser, getProfile } from "@/lib/authApi";

// export const useAuthStore = create((set) => ({
//   user: null,

//   login: async (form: Object) => {
//     const res = await loginUser(form);
//     set({ user: res.user });
//   },
//   loadUser: async () => {
//     try {
//       const res = await getProfile();
//       set({ user: res.user });
//     } catch {
//       set({ user: null });
//     }
//   },
//   logout: async () => {
//     await logoutUser();
//     set({ user: null });
//   },
// }));
