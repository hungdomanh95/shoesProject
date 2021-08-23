import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Image,
  ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {iconCartColor, iconBack, iconDelete,iconError, iconSuccess, modal } from '../../assets'
import globalStyle from '../../theme/globalStyle';
import HeaderScreen from '../HeaderScreen';
import { decreaseProductInCart,increaseProductInCart,deleteProductInCart, order, deleteAllCart } from '../../redux/actions/shoesActions';
import {setModal} from '../../redux/actions/modalAction'
import Button from '../../components/ButtonComponent';
const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;
const CartScreen = () => {

  const dispatch = useDispatch();
  const navigation = useNavigation()

  const [totalValue, setTotalValue] = useState(0)
  const [modal, setModal] = useState({status:false, type:"",data:undefined})
  console.log('modal: ', modal);

  const {productInCart} = useSelector(state=>state.shoesReducer)
  const {userProfile} = useSelector(state=>state.shoesReducer)
  const {apiOder} = useSelector(state=>state.shoesReducer)
  console.log('apiOder: ', apiOder);

  const handleBackHome = () => {
    setModal({status:false, type:"",data:undefined})
    dispatch(deleteAllCart())
    navigation.navigate("HomeScreen")
  }
  const closeModal = () => {
    setModal({status:false, type:"",data:undefined})
  }


  useEffect(() => {
    if(apiOder ){
      if( apiOder.statusCode === 200){
        setModal({status:true, type:"SUCCESS",data:undefined})
      }else{
        setModal({status:true, type:"ERROR",data:undefined})
      }
    }
  }, [apiOder])

  useEffect(async()=>{
    if(productInCart && productInCart.length > 0 ){
      let totalPrice = await productInCart.map(item=>{
        return item.price*item.quantityCart
      })
      setTotalValue(totalPrice.reduce((a, b) => a + b))
    }else if(productInCart.length === 0){
      setTotalValue(0)
    }
  },[productInCart])

  const decrease = (item) => {
    if(item.quantityCart > 1){
      dispatch(decreaseProductInCart(item))
    }
  }
  const increase = (item) => {
    if(item.quantityCart < item.quantity){
      dispatch(increaseProductInCart(item))
    }
  }
  const deleteItemInProduct = (item) =>{
    setModal({status:true, type:"DELETE", data:item})
    // dispatch(deleteProductInCart(item))
  }
  const handleDeleteItem = () => {
    console.log('modal.data.id: ', modal.data.id);
    dispatch(deleteProductInCart(modal.data))
    setModal({status:false, type:"",data:undefined})
  }
  const orderItem = () => {
    if(productInCart && productInCart.length > 0){
      const dataItem = productInCart.map(item=>{
        return {
          productId: item.id,
          quantity: item.quantityCart
        }
      })
      const data = {
        orderDetail:dataItem,
        email:userProfile.content.email
      }
      dispatch(order(data))
    }else{
      alert("Please add more shoes to order")
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <HeaderScreen back title="Cart" cart={false} />
        <ScrollView>
          {productInCart.map((item,index)=>{
            return(
              <View key={index} style={[globalStyle.styleRow,{marginBottom:27, justifyContent:"space-between"}]} >
                <Image source={{uri:item.image}} resizeMode='contain' style={styles.imageCart} />
                <View style={{width:widthScreen - 50 - 130}} >
                  <View style={[globalStyle.styleRow,{justifyContent:"space-between"}]}>
                    <Text style={globalStyle.textBig, globalStyle.fontW500}>
                      {item.name}
                    </Text>
                    <TouchableOpacity onPress={()=>deleteItemInProduct(item)}>
                      <Image source={iconDelete} style={styles.iconDelete} />
                    </TouchableOpacity>

                  </View>
                  <Text style={[globalStyle.textMedium,globalStyle.primaryColor,{marginVertical:10}]} >
                    Size {item.sizeChoose}
                  </Text>
                  <View style={[globalStyle.styleRow,{justifyContent:"space-between"}]} >

                    <Text style={[globalStyle.h3,globalStyle.mainColor]} >
                      ${item.price}
                    </Text>
                    <View style={globalStyle.styleRow} >
                      <TouchableOpacity onPress={()=>decrease(item)} style={styles.btnQuantity}>
                        <Text>-</Text>
                      </TouchableOpacity>
                      <Text style={[globalStyle.textBig]} >{item.quantityCart}</Text>
                      <TouchableOpacity onPress={()=>increase(item)} style={styles.btnQuantity}>
                        <Text>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                </View>
              </View>
            )
          })}
        </ScrollView>
          <View style={[globalStyle.styleRow,{justifyContent:"space-between", marginBottom:25}]}>
            <Text style={globalStyle.textBig, globalStyle.fontW500}>
              Total price
            </Text>
            <Text style={[globalStyle.h3,globalStyle.mainColor]} >
              $ {totalValue}
            </Text>


          </View>
          <Button onPress={orderItem} colorText={"white"} color={globalStyle.mainColor.color}  >
            <Text style={[globalStyle.textBig,globalStyle.fontW500,{color:"white"}]} >
              Order
            </Text>
          </Button>
      </View>
      { modal.status &&
        <View style={styles.containerModal}>
          {apiOder &&
            <View style={styles.modal} >
              <Image source={modal.type === "SUCCESS" ? iconSuccess : iconError} />
              <Text style={[globalStyle.h3,styles.textModal]}>{apiOder.message}</Text>
              <View style={styles.actionModal} >
              <Button onPress={handleBackHome} colorText={"white"} color={globalStyle.mainColor.color}>
                Back To Home
              </Button>

              </View>
            </View>
          }
          {modal.data && modal.type === "DELETE" &&
            <View style={styles.modalDelete} >
              <Text style={[globalStyle.h3,styles.textModal]}>
                Do you want remove this item from the cart ?
              </Text>
             <View style={styles.actionModal} >
             <Button onPress={handleDeleteItem} small colorText={"white"} color={globalStyle.mainColor.color}>
               Yes
             </Button>
             <Button small onPress={closeModal} colorText={"white"} color={globalStyle.mainColor.color}>
               No
             </Button>
             </View>
            </View>
          }
        </View>
      }
    </SafeAreaView>
  );
};

export default CartScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    paddingBottom: 10,
    backgroundColor:"white",
  },
  header:{
    height:heightScreen/15,
    justifyContent:"space-between",
    marginBottom:15
  },
  iconCart:{
    width:25,
    height:25,
  },
  iconDelete:{
    width:15,
    height:15,
  },
  imageCart:{
    width:120,
    height:120,
    backgroundColor:"#F6F6F6",
    borderRadius:14
  },
  btnQuantity:{
    width:40,
    height:40,
    justifyContent:'center',
    alignItems:'center',
    borderWidth:1,
    borderColor:globalStyle.primaryColor.color,
    borderRadius:5,
    marginHorizontal:10
  },
  containerModal:{
    width:widthScreen,
    height:heightScreen,
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:"rgba(0,0,0,0.5)",
    position:"absolute",
    top:0,
    left:0,
    zIndex:998
  },
  modal:{
    width:widthScreen*0.9,
    height:heightScreen*0.5,
    backgroundColor:"white",
    alignItems:"center",
    justifyContent:"space-evenly",
    borderRadius:30,
  },
  modalDelete:{
    width:widthScreen*0.9,
    height:heightScreen*0.3,
    backgroundColor:"white",
    alignItems:"center",
    justifyContent:"space-evenly",
    borderRadius:30,
  },
  textModal:{
    marginTop:15,
    marginBottom:30,
    textAlign:"center"
  },
  actionModal:{
    flexDirection: 'row',
    justifyContent:"space-evenly",
    width:"100%"
  }
});
