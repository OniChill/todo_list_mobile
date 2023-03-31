import { TodoInterface } from "./todo";
export interface UserInterface {
    name: string;
    todos?: TodoInterface[];
  }