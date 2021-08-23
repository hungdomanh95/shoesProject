import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import globalStyle from '../../theme/globalStyle';
const widthScreen = Dimensions.get("window").width;
const heightScreen = Dimensions.get("window").height;

const Button = ({children,...props}) => {
  const styles = styleWithProps(props)
  return (
    <TouchableOpacity style={[styles.btnAction,props.style]} onPress={props.onPress}>
      {props.icon ?
      <View style={{flexDirection: 'row',justifyContent:'center',alignItems:"center"}}>
        {children}
      </View>
      :
      <Text style={[styles.itemsText,props.styleText]} >
        {children}
      </Text>
      }

    </TouchableOpacity>
  )
}
const styleWithProps = (props) =>(
  StyleSheet.create({
    btnAction:{
      // height:"100%",
      paddingVertical:17,
      paddingHorizontal:42,
      backgroundColor:props.color || "white",
      // width:props.width || widthScreen*0.3,
      justifyContent:"center",
      alignItems:"center",
      borderRadius:props.radius || 52,
      top:props.top || null,
  },
  itemsText: {
    fontSize: props.size || 16,
    color: props.colorText || globalStyle.mainColor,
    ...globalStyle.fontW500
  },
  }))
export default Button

