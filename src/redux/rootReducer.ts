import { combineReducers } from 'redux';
import loginReducer from './slice/loginSlice';
import usersReducer from './slice/usersTodoListSlice';

const rootReducer = combineReducers({
  login: loginReducer,
  usersTodoList: usersReducer,
});

export default rootReducer;
