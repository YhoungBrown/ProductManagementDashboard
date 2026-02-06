import { fetchUser } from "@/services/api";
import { User } from "@/types/user";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface ProfileState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  user: null,
  loading: false,
  error: null,
};

export const loadUser = createAsyncThunk<User>(
  "profile/loadUser",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchUser();
    } catch (err) {
      return rejectWithValue("Failed to load user");
    }
  },
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    clearProfile(state) {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
