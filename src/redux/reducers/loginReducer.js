const initialState = {

};
import { typeAction } from '../actions/actionTypes';
export default (state = initialState, action) => {
  switch (action.type) {
    case typeAction.SIGNUP:
      console.log('SIGNUP: ', action);
      return {
        ...state,
        stateSignUp:{data:action.payload, type:"SUCCESS"}
      };
    case typeAction.ERROR_SIGNUP:
      console.log('ERROR_SIGNUP: ', action);
      return {
        ...state,
        stateSignUp:{data:action.payload, type:"ERROR"}
      };
    case typeAction.LOGIN:
      console.log('LOGIN: ', action);
      return {
        ...state,
        stateLogin:{data:action.payload, type:"SUCCESS"},
        accessToken:action.payload.content.accessToken
      };
    case typeAction.LOGOUT:
      console.log('LOGOUT-------: ', state);

      return {
        state:{},
      };
    case typeAction.IS_LOGIN:
      console.log('IS_LOGIN: ', action.payload);
      return {
        ...state,
        isLogin:action.payload
      };
    case typeAction.ERROR_LOGIN:
      console.log('ERROR_LOGIN: ', action);
      return {
        ...state,
        stateLogin:{data:action.payload, type:"ERROR"},

      };
    default:
      return state;
  }
};
