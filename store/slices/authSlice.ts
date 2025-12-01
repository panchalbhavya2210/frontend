import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProfile, loginUser, logoutUser, registerUser } from "@/lib/authApi";
import {
  LoginResponse,
  User,
  ProfileResponse,
  RegisterResponse,
} from "@/app/types/auth";
import { RegisterSchemaType } from "@/lib/validators/schema";

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
  { email: string; password: string; name: string; profileImage: string },
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
      });
  },
});

export const {} = authSlice.actions;
export default authSlice.reducer;
