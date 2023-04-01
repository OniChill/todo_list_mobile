import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface loginInterface {
  username: string;
}

const initialState: loginInterface = {
    username: "",
};

export const loginSlice = createSlice({
    name: 'username',
    initialState,
    reducers: {
        setUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload
          },
        },
      });
      
export const { setUsername} = loginSlice.actions;
      
export const getUsername = (state: {login: {username: string}}) => state.login.username;

export default loginSlice.reducer;