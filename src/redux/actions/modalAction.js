import { typeAction } from './actionTypes';

export const setModal = data => {
  return {
    type: typeAction.SET_MODAL,
    payload: data,
  };
}

