import axios from 'axios';
export const getProfileService = token =>{
  return axios({
    url: 'http://svcy3.myclass.vn/api/Users/getProfile',
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}
export const getProductService = () =>{
  return axios({
    url: 'http://svcy3.myclass.vn/api/Product',
    method: 'GET',
  });
}

export const getProductFavoriteService = (token) =>{
  return axios({
    url: 'http://svcy3.myclass.vn/api/Users/getproductfavorite',
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

export const setLikeProductService = (productId,token) =>{
  return axios({
    url: `http://svcy3.myclass.vn/api/Users/like?productId=${productId}`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}
export const setUnLikeProductService = (productId,token) =>{
  console.log('productId: ', productId);
  return axios({
    url: `http://svcy3.myclass.vn/api/Users/unlike?productId=${productId}`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}
export const updateUserService = (data) =>{
  console.log('data: ', data);
  return axios({
    url: `http://svcy3.myclass.vn/api/Users/updateProfile`,
    method: 'POST',
    data:data.inforUpdate,
    headers: {
      Authorization: `Bearer ${data.token}`
    }
  });
}
export const getProductByIdService = (id) =>{
  return axios({
    url: `http://svcy3.myclass.vn/api/Product/getbyid?id=${id}`,
    method: 'GET',
  });
}

export const orderService = (data) =>{
  console.log('data: ', data);
  return axios({
    url: `http://svcy3.myclass.vn/api/Users/order`,
    method: 'POST',
    data
  });
}

export const deleteOrderService = (data) =>{
  console.log('deleteOrderService: ', data);
  return axios({
    url: `http://svcy3.myclass.vn/api/Users/deleteOrder`,
    method: 'POST',
    data:{orderId:data.id},
    headers: {
      Authorization: `Bearer ${data.token}`
    }
  });
}
