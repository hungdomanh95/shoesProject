import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View,TouchableWithoutFeedback,Keyboard } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { Fade, Slide } from '../../animations';
import { iconError, iconSuccess, modal } from "../../assets";
import { Button, Input } from '../../components';
import { setLoading } from '../../redux/actions/loadingAction';
import { setModal } from '../../redux/actions/modalAction';
import { signup } from '../../redux/actions/shoesActions';
import globalStyle from '../../theme/globalStyle';
import { listSignUp } from '../../utils/listItem';
import { signInSchema } from '../../utils/yup';

const widthScreen = Dimensions.get("window").width
const heightScreen = Dimensions.get("window").height

const SignupScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [modal, setModal] = useState(false)

  const {stateSignUp}  = useSelector(state => state.loginReducer)

  const moveLogin = () =>{
    navigation.goBack("")
    setModal(false)
  }
  const handleSubmitFormik = values => {
    dispatch(signup(values))
    dispatch(setLoading(true))
  };
  const closeModal = () => {
    dispatch(setLoading(false))
    setModal(false)
  }
  const moveTopLogin = () =>{
    navigation.goBack("")
    setModal(false)
  }
  useEffect(() => {
    if(stateSignUp){
      dispatch(setLoading(false))
      setModal(true)
    }
  }, [stateSignUp])

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

      <View style={styles.container}>
        <Slide direction="vertical" duration={700} from={-30}>
          <Text style={styles.h2}>Welcome</Text>
        </Slide>
        <Fade duration={3000}>
          <Text style={styles.h3}>Sign in to continue!</Text>
        </Fade>
        <Formik
            validationSchema={signInSchema}
            initialValues={{email: '', password: ''}}
            onSubmit={handleSubmitFormik}>
            {({values, handleSubmit, handleChange, errors}) => (
              <>
                {listSignUp.map((item,index)=>{
                  return(
                    <Slide key={index} duration={item.duration} from={item.from}>
                      <Input
                        value={values[`${item.name.toLowerCase()}`]}
                        placeholder={item.placeholder}
                        onChangeText={handleChange(`${item.name.toLowerCase()}`)}
                        secureTextEntry={item.name === "Password" && true}
                        style={{marginTop:16}}
                      >
                          {item.name}
                      </Input>
                      {errors[`${item.name.toLowerCase()}`] && (
                      <Text style={styles.errorText}>{errors[`${item.name.toLowerCase()}`]}</Text>
                      )}
                    </Slide>
                  )
                })}
                <Button onPress={handleSubmit} style={{marginTop:30}} color={globalStyle.mainColor.color} colorText="white">
                  Sign up
                </Button>
              </>
            )}
          </Formik>
        <Text style={styles.textAccount}>
        Already have an account?
          <TouchableOpacity onPress={moveLogin} >
            <Text style={styles.textBig}>Log in</Text>
          </TouchableOpacity>
        </Text>

        { modal &&  stateSignUp &&
          <View style={styles.containerModal}>
            <View style={styles.modal} >
              {stateSignUp.type === "SUCCESS" ?
                <Image source={iconSuccess} />
                :
                <Image source={iconError} />
              }
              <Text style={[globalStyle.h3,styles.textModal]}>{stateSignUp.data.message}</Text>
              <View style={styles.actionModal} >
                {stateSignUp.type === "ERROR" ?
                  <Button onPress={closeModal} colorText={"white"} color={globalStyle.mainColor.color} >Try Again</Button>
                  :
                  <Button onPress={moveTopLogin} colorText={"white"} color={globalStyle.mainColor.color} >Login</Button>
                }
              </View>
            </View>
          </View>
        }
      </View>

    </TouchableWithoutFeedback>
  )
}

export default SignupScreen
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
    ...globalStyle.secondaryColor,
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

