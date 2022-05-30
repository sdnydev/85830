import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from './dtos/user.dto';

export class AuthenticationState {
  user!: User | null;
}

const initialState: AuthenticationState = {
  user: null,
};

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    logout: state => {
      // This is handled in the root reducer
    },
  },
});

const { actions, reducer } = authenticationSlice;

export const { setUser, logout } = actions;
export default reducer;
