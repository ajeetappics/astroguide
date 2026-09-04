// src/store/slices/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AuthenticatedUser } from "@/types/user"; // Assuming types are in @/types/


export interface AuthState {
  isAuthenticated: boolean;
  user: AuthenticatedUser | null;
  token: string | null; // To easily identify user type
  loading: boolean;
  error: string | null;
  id: string;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
  loading: false,
  error: null,
  id: '',
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Example: Action to handle login attempt
    loginRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    // Example: Action to handle successful login
    loginSuccess: (
      state,
      action: PayloadAction<{ user: AuthenticatedUser; id: string; token: string }>
    ) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.id = action.payload.id;
      state.loading = false;
      state.error = null;
    },
    // Example: Action to handle login failure
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = action.payload;
    },
    // Action to handle logout
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = null;
      // Note: redux-persist might need specific handling for clearing persisted state
      // or you might handle token removal from localStorage explicitly in an async thunk.
    },
    // Action to clear any auth errors
    clearAuthError: (state) => {
      state.error = null;
    },
    // Potentially an action to update user profile info if managed within auth slice
    // updateUserProfile: (state, action: PayloadAction<Partial<AuthenticatedUser>>) => {
    //   if (state.user) {
    //     state.user = { ...state.user, ...action.payload };
    //   }
    // }
  },
  // You can add extraReducers for handling async thunks if you create them
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(someAsyncThunk.pending, (state) => {
  //       state.loading = true;
  //     })
  //     .addCase(someAsyncThunk.fulfilled, (state, action) => {
  //       // ... update state based on thunk result
  //       state.loading = false;
  //     })
  //     .addCase(someAsyncThunk.rejected, (state, action) => {
  //       state.error = action.error.message || 'Failed to process request';
  //       state.loading = false;
  //     });
  // },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  logout,
  clearAuthError,
} = authSlice.actions;

export default authSlice.reducer;
