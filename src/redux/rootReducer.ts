import { combineReducers } from 'redux';
import loginReducer from './slice/loginSlice';
import usersReducer from './slice/usersSlice';

const rootReducer = combineReducers({
  login: loginReducer,
  users: usersReducer,
});

export default rootReducer;
