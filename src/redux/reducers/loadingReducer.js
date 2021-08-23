import { typeAction } from '../actions/actionTypes';
const initialState = {
 statusLoading:false
};
export default (state = initialState, action) => {
  switch (action.type) {
    case typeAction.SET_LOADING:
      return {
        ...state,
        statusLoading:action.payload,
      };

    default:
      return state;
  }
};
