import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserInterface } from '../../Interface/user';

interface Users {
  usersTodoList: UserInterface[];
}

const initialState: Users = {
  usersTodoList: [],
};

export const usersTodoListSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUserTodo: (state, action: PayloadAction<UserInterface>) => {
      const { name, todoList } = action.payload;
      // Check if the user already exists
      const getUser = state.usersTodoList.find(
        (user: { name: string }) => user.name === name
      );
      if (getUser && todoList) {
        getUser.todoList?.push(...todoList);
      }
    },
    addUser: (state, action: PayloadAction<string>) => {
      const name = action.payload;
      // Check if the user already exists
      const getUser = state.usersTodoList.find(
        (user: { name: string }) => user.name === name
      );
      if (!getUser) {
        // Add the new user
        state.usersTodoList.push({ name, todoList: [] });
      }
    },
    deleteUserTodo: (
      state,
      action: PayloadAction<{ name: string; todoId: any }>
    ) => {
      const { name, todoId } = action.payload;

      const getUser = state.usersTodoList.find(
        (user: { name: string }) => user.name === name
      );

      if (getUser) {
        // Filter out the todo with the given ID
        getUser.todoList = getUser.todoList?.filter(
          (todo: { id: any }) => todo.id !== todoId
        );
      }
    },
    markTodoAsDone: (
      state,
      action: PayloadAction<{ name: string; todoId: any }>
    ) => {
      const { name, todoId } = action.payload;
      const getUser = state.usersTodoList.find(
        (user: { name: string }) => user.name === name
      );
      if (getUser) {
        const todo = getUser.todoList?.find(
          (todo: { id: any }) => todo.id === todoId
        );
        if (todo) {
          todo.isDone = true;
        }
      }
    },
  },
});

export const selectUserByUsername = (state: any, username: string) =>
  state.usersTodoList.usersTodoList.find((user: { name: string }) => user.name === username);

export const {
  addUserTodo,
  addUser,
  deleteUserTodo,
  markTodoAsDone,
} = usersTodoListSlice.actions;

export default usersTodoListSlice.reducer;
