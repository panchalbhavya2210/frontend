import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  forgotPassword,
  getProfile,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  verifyUserAPI,
} from "@/lib/authApi";
import {
  LoginResponse,
  User,
  ProfileResponse,
  RegisterResponse,
  ForgotResponse,
  ResetResponse,
} from "@/app/types/auth";
import { RegisterSchemaType } from "@/lib/validators/schema";
import { string } from "zod";

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

export const loginThunk = createAsyncThunk<
  User,
  { email: string; password: string },
  { rejectValue: string }
>("auth/login", async (form, thunkAPI) => {
  try {
    const res: LoginResponse = await loginUser(form);
    return res.user;
  } catch (err: any) {
    const backendMessage = err?.response?.data?.message || "Login failed";
    return thunkAPI.rejectWithValue(backendMessage);
  }
});

export const loadProfileThunk = createAsyncThunk<User, void>(
  "auth/me",
  async (_, thunkAPI) => {
    try {
      const res: ProfileResponse = await getProfile();
      return res.user;
    } catch (err: any) {
      const backendMessage =
        err?.response?.data?.message || "Loading Profile Failed";
      return thunkAPI.rejectWithValue(backendMessage);
    }
  }
);

export const registerUserThunk = createAsyncThunk<
  User,
  FormData,
  { rejectValue: string }
>("auth/register", async (form, thunkAPI) => {
  try {
    const res: RegisterResponse = await registerUser(form);
    return res.user;
  } catch (err: any) {
    const backendMessage =
      err?.response?.data?.message || "Loading Profile Failed";
    return thunkAPI.rejectWithValue(backendMessage);
  }
});

export const forgotPasswordThunk = createAsyncThunk<
  { email: string },
  { rejectValue: string }
>("auth/forgot-password", async (form, thunkAPI) => {
  try {
    const res: ForgotResponse = await forgotPassword(form);
    return res;
  } catch (error: any) {
    const backendMessage =
      error?.response?.data?.message || "Forgot password failed";
    return thunkAPI.rejectWithValue(backendMessage);
  }
});

export const resetPasswordThunk = createAsyncThunk<
  ResetResponse,
  { token: string; password: string },
  { rejectValue: string }
>("auth/reset-password", async (form, thunkAPI) => {
  try {
    const { token, password } = form;
    const res: ResetResponse = await resetPassword({ token, password });
    return res;
  } catch (error: any) {
    const backendMessage =
      error?.response?.data?.message || "Forgot password failed";
    return thunkAPI.rejectWithValue(backendMessage);
  }
});

export const logoutThunk = createAsyncThunk<
  boolean,
  void,
  { rejectValue: string }
>("auth/logout", async (_, thunkAPI) => {
  try {
    await logoutUser();
    return true;
  } catch (err: any) {
    const backendMessage = err?.response?.data?.message || "Logout failed";
    return thunkAPI.rejectWithValue(backendMessage);
  }
});

export const verifyUserThunk = createAsyncThunk<
  { token: string },
  { token: string },
  { rejectValue: string }
>("auth/verify-registration", async (form, thunkAPI) => {
  const { token } = form;
  try {
    const res = await verifyUserAPI({ token });
    return res;
  } catch (error: any) {
    const backendMessage =
      error?.response?.data?.message || "Verification failed";
    return thunkAPI.rejectWithValue(backendMessage);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload ?? "Login failed";
      })

      //   Load User Cases
      .addCase(loadProfileThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadProfileThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loadProfileThunk.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = "Profile Details Fetch Failure";
      })

      // Register User Cases
      .addCase(registerUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = "Profile Details Fetch Failure";
      })

      // Register Forgot Password
      .addCase(forgotPasswordThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPasswordThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(forgotPasswordThunk.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = "Profile Details Fetch Failure";
      })

      // Register Forgot Password
      .addCase(resetPasswordThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPasswordThunk.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(resetPasswordThunk.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = "Profile Details Fetch Failure";
      })

      .addCase(logoutThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.loading = false;
        state.user = null; // clear user
      })
      .addCase(logoutThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Logout failed";
      })

      .addCase(verifyUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyUserThunk.fulfilled, (state) => {
        state.loading = false;
        state.user = null; // clear user
      })
      .addCase(verifyUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Logout failed";
      });
  },
});

export const {} = authSlice.actions;
export default authSlice.reducer;
