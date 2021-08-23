import { combineReducers } from 'redux';
import loadingReducer from './loadingReducer';
import loginReducer from './loginReducer';
import modalReducer from './modalReducer';
import shoesReducer from './shoesReducer';
const rootReducer = combineReducers({
  loginReducer,modalReducer,loadingReducer,shoesReducer
});

export default rootReducer;
