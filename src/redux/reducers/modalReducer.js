import { typeAction } from '../actions/actionTypes';
const initialState = {
  statusModal:false,
  dataModal:{}
};
export default (state = initialState, action) => {
  switch (action.type) {
    case typeAction.SET_MODAL:
      console.log('SET_MODAL: ', action);
      return {
        ...state,
        statusModal:action.payload.status || false,
        dataModal:action.payload.data
      };

    default:
      return state;
  }
};
