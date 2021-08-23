import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Dimensions,SafeAreaView,StyleSheet,TouchableOpacity,View,Text,Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import { Button } from '../../components';
import {getProfile, logout} from '../../redux/actions/shoesActions';
import globalStyle from '../../theme/globalStyle';
import {getAccessToken,removeAccessToken} from '../../utils/storage';
import { iconAccount,iconBack,iconCartColor,iconInfor, iconMale,iconFeMale } from '../../assets';
import { useNavigation } from '@react-navigation/native';
const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;

const arrUserScreen = [
  {
    id:1,
    name:"Order History",
    image:iconCartColor,
    navigate:"OrderHistoryScreen"
  },
  {
    id:2,
    name:"Information",
    image:iconAccount,
    navigate:"InforUserScreen"
  },
  {
    id:3,
    name:"About me",
    image:iconInfor,
    navigate:"AboutMeScreen"
  },
]


const UserScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation()

  const {userProfile} = useSelector(state => state.shoesReducer);
  console.log('userProfile: ', userProfile);

  useEffect(async () => {
    const accessTokenStorage = await getAccessToken();
    if (accessTokenStorage) {
      dispatch(getProfile(accessTokenStorage));
    }
  }, []);

  const handleLogout = async () => {
    console.log('handleLogout: ');
    await removeAccessToken(null);
    dispatch(logout());
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.styleContainer}>
        <View  style={styles.styleAvatar}>
          <Image
            source={{uri: userProfile.content.avatar}}
            style={{width:120,height:120, borderRadius:100}}
          />
        </View>
        <View style={[globalStyle.styleRow]} >
          <Text style={[globalStyle.h2,{marginTop:20, textTransform:"uppercase", marginRight:10}]}>{userProfile.content.name}</Text>
          <Image source={!userProfile.content.gender ? iconMale : iconFeMale} style={styles.iconDetail} />
        </View>
        <View style={{width:widthScreen-50,marginTop:20}}>
          {arrUserScreen.map((item,index)=>{
            return (
              <TouchableOpacity onPress={()=>navigation.navigate(item.navigate)} key={index} style={[globalStyle.styleRow,{marginVertical:30}]} >
                <Image source={item.image} style={styles.iconDetail} />
                <Text style={[globalStyle.h3,{marginLeft:20}]} >{item.name}</Text>
                <Image source={iconBack} style={[styles.iconDetail,{marginLeft:"auto",transform:[ {rotate:"-180deg"}] }]} />
              </TouchableOpacity>
            )
          })}
        </View>


        <Button onPress={handleLogout} colorText="#ff4757" color='rgba(255, 71, 87,0.35)' style={styles.styleLogout}>
          Logout
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default UserScreen;
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
    paddingTop:50,
    alignItems:"center",
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
  iconDetail:{
    width: 20,
    height: 20,
  }
});
