import React from 'react'
import {useSelector} from "react-redux"
import { View, Dimensions, StyleSheet, TouchableOpacity, Image, Text, TextInput} from 'react-native'
import {iconCartColor, iconBack, iconSearch} from '../../assets'
import globalStyle from '../../theme/globalStyle';
import { useNavigation } from '@react-navigation/native';

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;

const HeaderScreen = (props) => {

  const navigation = useNavigation()
  const {productInCart} = useSelector(state=>state.shoesReducer)
  const handledBack = () => {
    navigation.goBack('')
  }

  return (
    <View style={[globalStyle.styleRow,styles.header]}>
      {props.search ?
        <View style={styles.containerInput}>
          <Image source={iconSearch} style={styles.iconSearch} />
          <TextInput
            style={styles.inputSearch}
            placeholder={"What are you looking for?"}
          />
        </View>
        :
        <>
          {props.back ?
            <TouchableOpacity onPress={handledBack} >
                <Image source={iconBack} style={styles.iconDetail}  />
            </TouchableOpacity>
            :
            <View style={styles.iconCart}  />
          }
        </>
      }

      {props.title && <Text style={globalStyle.h3}>{props.title}</Text>}

      {props.cart ?
        <TouchableOpacity onPress={() => navigation.navigate('CartScreen')}>
          {productInCart && productInCart.length > 0 &&
            <View style={styles.lengthCart} >
              <Text style={{color:"white", fontSize:10}}>{productInCart.length}</Text>
            </View>
          }
          <Image source={iconCartColor} style={styles.iconDetail}  />
        </TouchableOpacity>
        :
        <View style={styles.iconCart}  />
      }

    </View>
  )
}

export default HeaderScreen
const styles = StyleSheet.create({
  header:{
    height:heightScreen/15,
    justifyContent:"space-between",
    marginBottom:15,
  },
  iconDetail:{
    width:25,
    height:25,
  },
  containerInput:{
    backgroundColor: "#F4F4F4",
    borderRadius: 10,
    flexDirection:"row",
    alignItems:"center",
    paddingVertical:12,
    paddingLeft:10,
    width:widthScreen - 100
  },
  iconSearch:{
    width:15,
    height:15,
    marginRight:10
  },
  iconCart:{
    width:25,
    height:25,
  },
  lengthCart:{
    width:15,
    height:15,
    backgroundColor:'red',
    borderRadius:100,
    justifyContent:'center',
    alignItems:"center",
    position:'absolute',
    top:-3,
    right:-7,
    zIndex:2
  }
});
