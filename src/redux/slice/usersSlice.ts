import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserInterface } from "../../Interface/user";


interface Users {
  users: UserInterface[];
}

const initialState: Users = {
    users: [],
};

export const usersSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<UserInterface>) => {
            const { name, todos } = action.payload;
            // Check if the user already exists
            const existingUser = state.users.find((user) => user.name === name);
            if (existingUser && existingUser.todos && todos) {
              // Merge the new todos with existing todos for the user
              existingUser.todos = [...existingUser.todos, ...todos];
            } else {
              // Add the new user
              state.users.push({ name, todos });
            }
          },
          updateUser: (state, action: PayloadAction<UserInterface>) => {
            const { name, todos } = action.payload;
            const userToUpdate = state.users.find((user) => user.name === name);
            if (userToUpdate) {
              userToUpdate.todos = todos;
            }
          },
          removeUser: (state, action: PayloadAction<string>) => {
            const name = action.payload;
            state.users = state.users.filter((user) => user.name !== name);
          }, markTodoAsDone: (state, action: PayloadAction<{ userName: string, todoId: number }>) => {
            const { userName, todoId } = action.payload;
            const userToUpdate = state.users.find((user) => user.name === userName);
            if (userToUpdate && userToUpdate.todos) {
              const todoToUpdate = userToUpdate.todos.find((todo) => todo.id === todoId);
              if (todoToUpdate) {
                todoToUpdate.status = true;
              }
            }
          },
        },
      });
      
      export const { addUser, updateUser, removeUser, markTodoAsDone } = usersSlice.actions;
      

export default usersSlice.reducer;