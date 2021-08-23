import { setAccessToken } from '../../utils/storage';
import { getProfileService,getProductService,setLikeProductService,getProductFavoriteService ,setUnLikeProductService, getProductByIdService,orderService,updateUserService,deleteOrderService} from '../apis/shoesApi';
import { userLogin, userSignUp } from '../apis/userLoginApi';
import { typeAction } from './actionTypes';

export const login = data => {
  return dispatch => {
    userLogin(data)
    .then(res => {
      setAccessToken(res.data.content.accessToken)
      return dispatch({
          type: typeAction.LOGIN,
          payload: res.data,
        });
    })
    .catch((err) => {
      return dispatch({
        type: typeAction.ERROR_LOGIN,
        payload: err.response.data,
      });
    });
  }
};
export const signup = data => {
  return dispatch => {
    userSignUp(data)
      .then(res => {
        return dispatch({
          type: typeAction.SIGNUP,
          payload: res.data
        });
      })
      .catch((err) => {
        return dispatch({
          type: typeAction.ERROR_SIGNUP,
          payload: err.response.data,
        });
      });
  };
};
export const setLogin = data => {
  return {
    type: typeAction.IS_LOGIN,
    payload: data,
  };
}
export const getProfile = data => {
  return dispatch => {
    getProfileService(data)
      .then(res => {
        return dispatch({
          type: typeAction.GET_PROFILE,
          payload: res.data,
          payload: {content:{status: res.data.statusCode,content:res.data.content}}
        });
      })
      .catch((err) => {
        console.log('err: getProfile', err.response);
        return dispatch({
          type: typeAction.GET_PROFILE,
          payload: {content:{status: err.response.status,content:err.response.data }}
        });
      });
  };
};
export const getProduct = data => {
  return dispatch => {
    getProductService(data)
      .then(resProduct => {
        getProductFavoriteService(data)
        .then(resFavorite => {
          return dispatch({
            type: typeAction.GET_PRODUCT,
            allProduct: resProduct.data.content,
            productFavorite:resFavorite.data.content.productsFavorite
          });
        })
        .catch((err) => {
          console.log('err:getProductFavorite ', err);
        });
        // return dispatch({
        //   type: typeAction.GET_PRODUCT,
        //   payload: res.data,
        // });
      })
      .catch((err) => {
        alert(err.message)
        console.log('err:getProduct ', err);
      });

  };
};
export const setLikeProduct = data => {
  return dispatch => {
    setLikeProductService(data.id, data.token)
      .then(res => {
        return dispatch({
          type: typeAction.SET_LIKE,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log('err: setLikeProduct', err.response);
      });
  };
};
export const setUnLikeProduct = data => {
  return dispatch => {
    setUnLikeProductService(data.id, data.token)
      .then(res => {
        return dispatch({
          type: typeAction.SET_UNLIKE,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log('err: setUnLikeProduct', err.response);
      });
  };
};

export const getProductById = data => {
  return dispatch => {
    getProductByIdService(data)
      .then(res => {
        return dispatch({
          type: typeAction.GET_PRODUCT_ID,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log('err: getProductById', err.response);
      });
  };
};
export const order = data => {
  return dispatch => {
    orderService(data)
      .then(res => {
        return dispatch({
          type: typeAction.ORDER,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log('err: order', err.response);
      });
  };
};
export const deleteOrder = data => {
  return dispatch => {
    deleteOrderService(data)
      .then(res => {
        return dispatch({
          type: typeAction.DELETE_ORDER,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log('err: order', err.response);
        return dispatch({
          type: typeAction.DELETE_ORDER,
          payload: err.response.data,
        });
      });
  };
};
export const updateUser = data => {
  return dispatch => {
    updateUserService(data)
      .then(res => {
        return dispatch({
          type: typeAction.UPDATE_USER,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log('err: UPDATE_USER', err.response);
      });
  };
};
export const removeState = () => {
  return{
    type:typeAction.REMOVE_STATE
  }
}

export const addProductToCart = data => {
  return{
    type:typeAction.ADD_CART,
    payload:data
  }
}
export const increaseProductInCart = data => {
  return{
    type:typeAction.INCREASE,
    payload:data
  }
}
export const decreaseProductInCart = data => {
  return{
    type:typeAction.DECREASE,
    payload:data
  }
}
export const deleteProductInCart = data => {
  return{
    type:typeAction.DELETE_ITEM_CART,
    payload:data
  }
}
export const deleteAllCart = () => {
  console.log('deleteAllCart: ==========',);
  return{
    type:typeAction.DELETE_ALL_CART,
  }
}
export const logout = () => {
  return{
    type:typeAction.LOGOUT,
  }
}
