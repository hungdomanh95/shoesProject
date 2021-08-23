import React from 'react'
import { Dimensions, Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { iconError, iconSuccess, modal } from "../../assets"
import { setModal } from '../../redux/actions/modalAction'
import globalStyle from '../../theme/globalStyle'
import Button from '../ButtonComponent'
const widthScreen = Dimensions.get("window").width
const heightScreen = Dimensions.get("window").height
const Modal = () => {
  const dispatch = useDispatch()

  const {dataModal} = useSelector(state=>state.modalReducer)
  console.log('dataModal:======== ', dataModal);

  const closeModal = () => {
    dispatch(setModal({status:false}))
  }

  return (
    <View style={styles.container}>
      <View style={styles.modal} >
        {dataModal.type === "SUCCESS" ?
          <Image source={iconSuccess} />
          :
          <Image source={iconError} />
        }
        <Text style={[globalStyle.h3,styles.textModal]}>{dataModal.message}</Text>
        <View style={styles.actionModal} >
          {dataModal.type === "ERROR" &&
            <Button onPress={closeModal} colorText={"white"} color={globalStyle.mainColor.color} >Try Again</Button>
          }

        </View>
      </View>
    </View>
  )
}

export default Modal
const styles = StyleSheet.create({
  container:{
    width:widthScreen,
    height:heightScreen,
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:"rgba(0,0,0,0.5)",
    position:"absolute",
    top:0,
    left:0,
    zIndex:999
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
