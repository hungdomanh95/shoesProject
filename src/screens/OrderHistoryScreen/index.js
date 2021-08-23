import React,{Fragment, useEffect,useState} from 'react'
import { View, Text, SafeAreaView,StyleSheet,ScrollView,Dimensions,Image,TouchableOpacity } from 'react-native'
import {useDispatch, useSelector} from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { iconDelete } from '../../assets';
import globalStyle from '../../theme/globalStyle';
import HeaderScreen from '../HeaderScreen';
import { deleteOrder, getProfile, removeState } from '../../redux/actions/shoesActions';
import { getAccessToken } from '../../utils/storage';
import {iconError, iconSuccess } from '../../assets'
import { Button } from '../../components';
const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;
const OrderHistoryScreen = () => {

  const dispatch = useDispatch();
  const navigation = useNavigation()

  const [token,setToken] = useState(null)
  const [modal, setModal] = useState({status:false, type:"",data:undefined})

  const {userProfile} = useSelector(state => state.shoesReducer);
  const {apiDeleteOrder} = useSelector(state => state.shoesReducer);
  console.log('apiDeleteOrder: ', apiDeleteOrder);

  useEffect(async () => {
    const accessTokenStorage = await getAccessToken();
    if (accessTokenStorage) {
      setToken(accessTokenStorage)
    }
  }, []);

  const openModal = (id) =>{
    console.log('id: ', id);
    setModal({status:true, type:"QUESTION",data:id})
  }
  const handleDeleteIdOrder = () => {
    if(token){
      dispatch(deleteOrder({id:modal.data, token:token}))
    }
    setModal({status:false, type:"",data:undefined})
  }

  const closeModal = () => {
    setModal({status:false, type:"",data:undefined})
    dispatch(removeState())
  }
  useEffect(() => {
    if(apiDeleteOrder){
      if(apiDeleteOrder.statusCode === 200){
        setModal({status:true, type:"SUCCESS",data:undefined})
        dispatch(getProfile(token));
      }else{
        setModal({status:true, type:"ERROR",data:undefined})
      }
    }
  }, [apiDeleteOrder])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <HeaderScreen title="Order History" back cart={false} />
        <ScrollView>
            {userProfile && userProfile.content.ordersHistory.map((item,index)=>{
              return(
                <View key={index} style={[globalStyle.styleRow,{marginBottom:27, justifyContent:"space-between"}]} >
                  <Image source={{uri:item.orderDetail[0].image}} resizeMode='contain' style={styles.imageCart} />
                  <View style={{width:widthScreen - 50 - 130}} >
                      <View style={[globalStyle.styleRow,{justifyContent:'space-between',marginBottom:10, flexWrap: 'wrap',}]}>
                        <Text style={[globalStyle.textBig, globalStyle.fontW500,{width:widthScreen - 50 - 130 -20}]}>
                          {item.orderDetail[0].name}
                        </Text>
                        <TouchableOpacity onPress={()=>openModal(item.id)}>
                          <Image source={iconDelete} style={styles.iconDelete} />
                        </TouchableOpacity>
                      </View>
                      <Text style={globalStyle.textSmall,globalStyle.primaryColor}>
                        {item.orderDetail[0].shortDescription}
                      </Text>
                  </View>
                </View>
              )
            })}
        </ScrollView>
      </View>

      { modal.status &&
        <View style={styles.containerModal}>
          {modal.type === "QUESTION" ?
            <View style={styles.modalDelete}>
              <Text style={[globalStyle.h3,styles.textModal]}>
                Do you want delete this order ?
              </Text>
              <View style={styles.actionModal} >
                <Button onPress={handleDeleteIdOrder} colorText={"white"} color={globalStyle.mainColor.color}>
                  Yes
                </Button>
                <Button onPress={closeModal}  colorText={"white"} color={globalStyle.mainColor.color}>
                  No
                </Button>
              </View>
            </View>
            :
            <View style={styles.modal}>
              <Image source={modal.type === "SUCCESS" ? iconSuccess : iconError} />
              <Text style={[globalStyle.h3,styles.textModal]}>
                {apiDeleteOrder.content}
              </Text>
              <View style={styles.actionModal} >
              <Button onPress={closeModal} colorText={"white"} color={globalStyle.mainColor.color}>
                Close
              </Button>
            </View>
            </View>
          }

        </View>
       }
    </SafeAreaView>
  )
}

export default OrderHistoryScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    paddingBottom: 10,
    backgroundColor:"white",
  },
  imageCart:{
    width:120,
    height:120,
    backgroundColor:"#F6F6F6",
    borderRadius:14
  },
  iconDelete:{
    width:15,
    height:15,
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
  textModal:{
    marginTop:15,
    marginBottom:30,
    textAlign:"center"
  },
  actionModal:{
    flexDirection: 'row',
    justifyContent:"space-evenly",
    width:"100%"
  },
  modalDelete:{
    width:widthScreen*0.9,
    height:heightScreen*0.3,
    backgroundColor:"white",
    alignItems:"center",
    justifyContent:"space-evenly",
    borderRadius:30,
  },
});

