import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View,Keyboard,TouchableWithoutFeedback } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { Fade, Slide } from "../../animations";
import { iconError, iconSuccess, modal } from "../../assets";
import { Button, Input } from '../../components';
import { setLoading } from '../../redux/actions/loadingAction';
import { login, setLogin } from '../../redux/actions/shoesActions';
import globalStyle from '../../theme/globalStyle';
import { listSignIn } from '../../utils/listItem';
import { loginSchema } from '../../utils/yup';
const widthScreen = Dimensions.get("window").width
const heightScreen = Dimensions.get("window").height

const LoginScreen = () => {

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [modal, setModal] = useState(false)

  const {stateLogin} = useSelector(state=>state.loginReducer)

  const moveSignUp = () =>{
    navigation.navigate("SignupScreen")
  }

  const handleSubmitFormik = values => {
    dispatch(login(values))
    dispatch(setLoading(true))
  };

  const closeModal = () => {
    setModal(false)
  }

  useEffect(() => {
    if(stateLogin){
      dispatch(setLoading(false))
      if(stateLogin.type === "ERROR"){
        setModal(true)
      }else{
        dispatch(setLogin(true))
      }
    }

  }, [stateLogin])

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Slide direction="vertical" duration={700} from={-30}>
          <Text style={styles.h2}>Create Account</Text>
        </Slide>
        <Fade duration={3000}>
          <Text style={styles.h3}>Sign up to get started!</Text>
        </Fade>
        <Formik
            validationSchema={loginSchema}
            initialValues={{email: '', password: ''}}
            onSubmit={handleSubmitFormik}>
            {({values, handleSubmit, handleChange, errors}) => (
              <>
                {listSignIn.map((item,index)=>{
                  return(
                    <Slide key={index} duration={item.duration} from={item.from}>
                      <Input
                        value={values[`${item.name.toLowerCase()}`]}
                        placeholder={item.placeholder}
                        onChangeText={handleChange(`${item.name.toLowerCase()}`)}
                        secureTextEntry={item.name === "Password" && true}
                      >
                          {item.name}
                      </Input>
                      {errors[`${item.name.toLowerCase()}`] && (
                      <Text style={styles.errorText}>{errors[`${item.name.toLowerCase()}`]}</Text>
                      )}
                    </Slide>
                  )
                })}
                <Text style={styles.textForgot}>Forgot Password</Text>
                <Button color={globalStyle.mainColor.color} colorText="white" onPress={handleSubmit}>
                  Log in
                </Button>
              </>
            )}
          </Formik>
        <Text style={styles.textAccount}>
          I don't have an account?
          <TouchableOpacity onPress={moveSignUp} >
            <Text style={styles.textBig}>Sign up</Text>
          </TouchableOpacity>
        </Text>

        { modal &&  stateLogin &&
          <View style={styles.containerModal}>
            <View style={styles.modal} >
              <Image source={iconError} />
              <Text style={[globalStyle.h3,styles.textModal]}>{stateLogin.data.message}</Text>
              <View style={styles.actionModal} >
              <Button onPress={closeModal} colorText={"white"} color={globalStyle.mainColor.color} >Try Again</Button>

              </View>
            </View>
          </View>
        }
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: globalStyle.widthScreen * (26 / 375),
    paddingTop: globalStyle.heightScreen * (142 / 812),
    backgroundColor: 'white',
  },
  h2: {...globalStyle.h2},
  h3: {
    ...globalStyle.h3,
    color: globalStyle.secondaryColor,
    marginTop: 3,
    marginBottom: 30,
  },
  textForgot: {
    ...globalStyle.mainColor,
    ...globalStyle.textMedium,
    alignSelf: 'flex-end',
    marginTop: 7.74,
    marginBottom:32
  },
  textAccount:{
    ...globalStyle.textMedium,
    ...globalStyle.primaryColor,
    alignSelf:'center',
    marginTop:24,
    flexDirection:"row",
  },
  textBig:{
    ...globalStyle.mainColor,
    ...globalStyle.textBig,
    marginLeft:6.5,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginTop:10
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
    borderRadius:30
  },
  textModal:{
    marginTop:15,
    marginBottom:30
  },
  actionModal:{

  }
});
