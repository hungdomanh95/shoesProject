import { typeAction } from './actionTypes';

export const setLoading = data => {
  return {
    type: typeAction.SET_LOADING,
    payload: data,
  };
}

