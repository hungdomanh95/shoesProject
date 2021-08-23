import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { Fragment } from 'react';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,Image,ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {getProfile, setLogin} from '../../redux/actions/shoesActions';
import {getAccessToken} from '../../utils/storage';
import {iconCartColor, iconBack} from '../../assets'
import { listSales,listCategories } from '../../utils/listItem';
import globalStyle from '../../theme/globalStyle';
import HeaderScreen from '../HeaderScreen';
const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;
const FavoriteScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation()
  const {allProduct} = useSelector(state=>state.shoesReducer)
  const {userProfile} = useSelector(state=>state.shoesReducer)
  useEffect(async () => {
    const accessTokenStorage = await getAccessToken();
    if (accessTokenStorage) {
      dispatch(getProfile(accessTokenStorage));
    }
  }, []);
  useEffect(() => {
    if(userProfile){
      if(userProfile.status === 200){
        dispatch(setLogin(true))
      }else{
        dispatch(setLogin(false))
      }
    }

  }, [userProfile])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <HeaderScreen title="Favorites" cart />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.containerItem} >
            {allProduct.map((item,index)=>{
            return(
              <Fragment key={index}>
                {item.favorite &&
                    <View  style={styles.itemProduct} >
                    <TouchableOpacity style={styles.backgroundImage} onPress={() => navigation.navigate('DetailScreen',{id:item.id})} >
                      {listCategories.map((itemCategory,index)=>{
                        return(
                          JSON.parse(item.categories)[0].id === itemCategory.name.toUpperCase() &&
                          <Image source={itemCategory.icon} style={styles.iconItem} key={index} />
                        )
                      })}
                      <Image source={{uri:item.image}} resizeMode='contain' style={styles.imgProduct} />
                    </TouchableOpacity>
                    <View style={[globalStyle.styleRow,{justifyContent:"space-between", marginTop:10}]}>
                      <Text style={[globalStyle.textMedium,globalStyle.mainColor,globalStyle.fontW600]}>
                        $ {item.price}
                      </Text>

                    </View>
                    <Text style={[globalStyle.textMedium,globalStyle.fontW600]}>{item.name}</Text>
                  </View>
                }
              </Fragment>
            )
            })}
          </View>
        </ScrollView>

      </View>
    </SafeAreaView>
  );
};

export default FavoriteScreen;
const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingHorizontal:25,
    backgroundColor:"white",
    paddingBottom:10,
    // justifyContent:'center'
  },
  containerItem:{
    flexDirection:"row",
    flexWrap:"wrap",
     justifyContent:"space-between"
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
  itemProduct:{
    width:(widthScreen-50)/2 - 25/2,
    // marginHorizontal:5,
    height:208,
    marginBottom:30,
  },
  backgroundImage:{
    backgroundColor:"#F5F5F5",
    height:158,
    borderRadius:15
  },
  imgProduct:{
    height:158,
    marginVertical:10
  },
  iconItem:{
    width:40,
    height:40,
    top:5, left:5,
    position:"absolute",
    opacity:0.4
  },
  iconHeart:{width:25,height:25},
});

