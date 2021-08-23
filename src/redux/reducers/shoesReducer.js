const initialState = {
  productInCart:[]
};
import { typeAction } from '../actions/actionTypes';
import {listProductAddMore} from '../../utils/listItem'
export default (state = initialState, action) => {
  switch (action.type) {

    case typeAction.GET_PROFILE:
      return {
        ...state,
        userProfile: action.payload.content,
      };
    case typeAction.SET_LIKE:
      return {
        ...state,
        apiSetLike:action.payload
      };
    case typeAction.ORDER:
      console.log('ORDER: ', action.payload);
      return {
        ...state,
        apiOder:action.payload
      };
    case typeAction.DELETE_ORDER:
      console.log('DELETE_ORDER: ', action.payload);
      return {
        ...state,
        apiDeleteOrder:action.payload
        // apiOder:action.payload
      };
    case typeAction.DELETE_ALL_CART:
      console.log('deleteAllCart: ');
      const { apiOder, ...stateWidthoutApiOder } = state;
      return {
        ...stateWidthoutApiOder,
        productInCart:[],
      };
    case typeAction.GET_PRODUCT_ID:
      return {
        ...state,
        productById:action.payload.content
      };

    case typeAction.SET_UNLIKE:
      return {
        ...state,
        apiSetLike:action.payload
      };
    case typeAction.UPDATE_USER:
      console.log('UPDATE_USER: ', action.payload);
      return {
        ...state,
        apiUpdateUser:action.payload
        // apiSetLike:action.payload
      };
    case typeAction.DELETE_ITEM_CART:
      console.log('DELETE_ITEM_CART: ',typeof action.payload,action.payload);
      let arrDelete = state.productInCart.filter(item=>item.id !== action.payload.id)
      console.log('arrDelete: ', arrDelete);
      return {
        ...state,
        productInCart:arrDelete
      };
    case typeAction.DECREASE:
      let arrProductInCartDecrease
      if(state.productInCart.length > 0){
        state.productInCart.find(item=>{
          if(item.id === action.payload.id){
            item.quantityCart-=1
           return  item
          }
        })
        arrProductInCartDecrease = [...state.productInCart]
      }
      return {
        ...state,
        productInCart:arrProductInCartDecrease
      };
    case typeAction.INCREASE:
      let arrProductInCartIncrease
      if(state.productInCart.length > 0){
         state.productInCart.find(item=>{
          if(item.id === action.payload.id){
            item.quantityCart+=1
            return  item
          }
        })
        arrProductInCartIncrease = [...state.productInCart]
      }
      return {
        ...state,
        productInCart:arrProductInCartIncrease
      };
    case typeAction.ADD_CART:
      let arrProductInCart
      if(state.productInCart.length === 0){
        arrProductInCart = [...state.productInCart, action.payload]
      }else{
        const findItem =  state.productInCart.find(item=>{
          if(item.id === action.payload.id){
            item.quantityCart+=1
           return  item
          }
        })
        if(findItem){
          arrProductInCart = [...state.productInCart]
        }else{
          arrProductInCart = [...state.productInCart,action.payload]
        }
      }
      return {
        ...state,
        productInCart:arrProductInCart
      };
    case typeAction.GET_PRODUCT:
      const listProduct = action.allProduct.map(itemProduct=>{
        let mapFavorite = action.productFavorite.find(itemFavarite=>{
          return itemFavarite.id === itemProduct.id
        })
          if(mapFavorite) return {...itemProduct, favorite:true,sourceImg:false}
          else return {...itemProduct, favorite:false,sourceImg:false}
      })
      return {
        ...state,
        allProduct: [...listProductAddMore,...listProduct.slice(0,16)]
      };
      case typeAction.REMOVE_STATE:
        const { productById, apiUpdateUser,apiDeleteOrder, ...stateWidthout } = state;
        return {
          ...stateWidthout,
        };

    default:
      return state;
  }
};
