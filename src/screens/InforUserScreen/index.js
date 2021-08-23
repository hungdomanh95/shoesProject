import React,{useState,useEffect} from 'react';
import {View, Text,SafeAreaView,StyleSheet,Image, TouchableOpacity,Dimensions, ScrollView,TouchableWithoutFeedback, Keyboard,KeyboardAvoidingView,Platform} from 'react-native';
import HeaderScreen from '../HeaderScreen';
import axios from 'axios';
import ImagePicker from 'react-native-image-crop-picker';
import {useDispatch, useSelector} from 'react-redux';
import globalStyle from '../../theme/globalStyle';
import { Button, Input } from '../../components';
import { updateUser,removeState,getProfile } from '../../redux/actions/shoesActions';
import {getAccessToken} from '../../utils/storage';
import {iconError, iconFeMale, iconMale, iconSuccess } from '../../assets'
import HideShowPassword from '../../animations/HideShowPassword';
const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;
const InforUserScreen = () => {
  const dispatch = useDispatch()

  const {userProfile} = useSelector(state => state.shoesReducer);
  const {apiUpdateUser} = useSelector(state => state.shoesReducer);

  const [changeName,setChangeName] = useState(userProfile.content.name);
  const [changeEmail,setChangeEmail] = useState(userProfile.content.email);
  const [changePhone,setChangePhone] = useState(userProfile.content.phone);
  const [changePassword,setChangePassword] = useState(userProfile.content.password);
  const [changeGender, setChangeGender] = useState(userProfile.content.gender)
  const [token, setToken] = useState(null)
  const [modal, setModal] = useState({status:false, type:""})
  const [showPassword, setShowPassword] = useState(true)

  useEffect( async () => {
    const accessTokenStorage = await getAccessToken();
    if(accessTokenStorage){
      console.log('accessTokenStorage: ', accessTokenStorage);
      setToken(accessTokenStorage)
    }
  }, [])

  useEffect(()=>{
    if(apiUpdateUser){
      if(apiUpdateUser.statusCode === 200){
        setModal({status:true, type:"SUCCESS"})
        dispatch(getProfile(token));
      }else{
        setModal({status:true, type:"ERROR"})
      }
    }
  },[apiUpdateUser])
  const handleChangeGender = () => {
    setChangeGender(!changeGender)
  }
  const handleShowPassword = () =>{
    setShowPassword(!showPassword)
  }
  const closeModal = () => {
    dispatch(removeState())
    setModal({status:false, type:"",data:undefined})
  }
  const updateInfor = () => {
    if(token){
      dispatch(updateUser({
        inforUpdate:{
          name:changeName,
          email:changeEmail,
          phone:changePhone,
          password:changePassword,
          gender:changeGender
        },
        token:token
      }))
    }else{
      alert("Update Error")
    }
  }
  const chooseImage =  () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      console.log(image);
      let formData = new FormData();
      formData.append('avatar', {
        name: image.filename,
        type: image.image,
        uri:
          Platform.OS === 'android' ? image.sourceURL : image.sourceURL.replace('file://', ''),
      });

      const headers = {
        headers : {
          'Content-Type':'application/x-www-form-urlencoded',
          Authorization: `Bearer ${token}`
        }
      };
      const uploadAvatar =  axios.post(`http://svcy3.myclass.vn/api/Users/uploadavatar`, formData, headers);
      console.log('uploadAvatar: ', uploadAvatar);
    });
  }

  return (
    <SafeAreaView style={styles.container}>

       <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView   behavior={Platform.OS === "ios" ? "padding" : "height"}
         style={styles.styleContainer}>
          <HeaderScreen title="Update Information" back cart={false} />
          <View style={{width:"100%",alignItems:"center",paddingTop:0}} >
            <TouchableOpacity onPress={chooseImage} style={styles.styleAvatar}>
              <Image
                source={{uri: userProfile.content.avatar}}
                style={{width:120,height:120, borderRadius:100}}
              />
            </TouchableOpacity>
          </View>

            <View style={styles.containerGender}>
              <TouchableOpacity onPress={handleChangeGender} style={[styles.bthGender,{borderTopLeftRadius:100,borderBottomLeftRadius:100},!changeGender && {backgroundColor:globalStyle.mainColor.color}]} >
                <Image source={iconMale} style={[styles.iconGender,changeGender && {opacity:0.3}]} />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleChangeGender} style={[styles.bthGender,{borderTopRightRadius:100,borderBottomRightRadius:100},changeGender && {backgroundColor:globalStyle.mainColor.color}]} >
                <Image source={iconFeMale} style={[styles.iconGender,!changeGender && {opacity:0.3}]} />
              </TouchableOpacity>
            </View>

        <ScrollView>
            <Input value={changeName} onChangeText={setChangeName} >
              Name
            </Input>
            <Input value={changeEmail} onChangeText={setChangeEmail}>
              Email
            </Input>
            <View >
                <Input secureTextEntry={showPassword} value={changePassword} onChangeText={setChangePassword} >
                  Password
                </Input>
              <TouchableOpacity
                style={styles.btnPassword}
                onPress={handleShowPassword}
              >
                <HideShowPassword showPassword={showPassword}/>
              </TouchableOpacity>
            </View>

            <Input value={changePhone} onChangeText={setChangePhone} >
              Phone
            </Input>
          </ScrollView>





            <Button onPress={updateInfor} colorText="white" color={globalStyle.mainColor.color} style={styles.styleLogout}>
              Update
            </Button>
        </KeyboardAvoidingView>

      </TouchableWithoutFeedback>

      { modal.status &&
        <View style={styles.containerModal}>
          {apiUpdateUser &&
            <View style={styles.modal} >
              <Image source={modal.type === "SUCCESS" ? iconSuccess : iconError} />
              <Text style={[globalStyle.h3,styles.textModal]}>{apiUpdateUser.content}</Text>
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
  );
};

export default InforUserScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    paddingBottom: 10,
    backgroundColor:"white",
  },
  styleContainer:{
    flex: 1,
    marginHorizontal: 25,
    paddingBottom: 10,
    // paddingTop:50,
  },
  styleAvatar: {
    width: 150,
    height: 150,
    borderRadius:100,
    backgroundColor:globalStyle.mainColor.color,
    justifyContent:'center',
    alignItems:'center',

  },
  styleLogout:{
    width: "100%",
    position:"absolute",
    bottom:30,
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
  btnPassword:{
    height:"100%",
    position:"absolute",
    right:10,
    bottom:0,
    justifyContent:"center",
    paddingTop: 32,
  },
  iconGender:{
    width:widthScreen/10,
    height:widthScreen/10,
    // backgroundColor:"white",
    borderRadius:100
  },
  bthGender:{
    // backgroundColor:"rgba(43, 47, 82,1)",
    width:widthScreen/8,
    height:widthScreen/8,
    // borderRadius:100,
    justifyContent:"center",
    alignItems:"center",
    width:"50%"
  },
  containerGender:{
    flexDirection:"row",
    width:"100%",
    justifyContent:"center",
    marginTop:32,
    borderRadius:50,
    borderColor:"rgba(43, 47, 82,1)",
    borderWidth:1
  }
});
