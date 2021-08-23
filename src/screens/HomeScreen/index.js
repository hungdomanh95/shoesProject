import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,Image,
  Text,TextInput,FlatList, ScrollView
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getProduct,setLikeProduct,setUnLikeProduct} from '../../redux/actions/shoesActions';
import {getAccessToken} from '../../utils/storage';
import {iconCartColor, iconSearch,iconHeart,iconHeartActive} from '../../assets'
import { listSales,listCategories } from '../../utils/listItem';
import globalStyle from '../../theme/globalStyle';
import { useNavigation } from '@react-navigation/native';
import HeaderScreen from '../HeaderScreen';
import Loading from '../../animations/Loading';
const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;

const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation()

  const [token, setToken] = useState(undefined)
  const {allProduct} = useSelector(state=>state.shoesReducer)
  const {apiSetLike} = useSelector(state=>state.shoesReducer)

  useEffect( async () => {
    const accessTokenStorage = await getAccessToken();
    if(accessTokenStorage){
      console.log('accessTokenStorage: ', accessTokenStorage);
      setToken(accessTokenStorage)
      dispatch(getProduct(accessTokenStorage))
    }
  }, [])
  useEffect(()=>{
    if(apiSetLike && apiSetLike.statusCode === 200 && token){
      dispatch(getProduct(token))
    }
  },[apiSetLike])

  const like = (id) =>{
    console.log("=========================like");
    if(token){
      dispatch(setLikeProduct({id,token}))
    }
  }
  const unLike = (id) =>{
    console.log("=========================Unlike--------------");
    if(token){
      dispatch(setUnLikeProduct({id,token}))
    }
  }

  const _renderItem = ({item}) => {
    return <Image source={item.image} style={styles.carouselItem} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <ScrollView> */}
        <View style={styles.container}>
          <HeaderScreen search cart />

          <View style={styles.carouselGame}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal
              data={listSales}
              keyExtractor={(_, index) => index.toString()}
              renderItem={_renderItem}
              ItemSeparatorComponent={() => (
                <View style={styles.itemSeparatorComponent} />
              )}
              snapToInterval={370}
              decelerationRate="fast"
            />
          </View>

          <View style={[globalStyle.styleRow,{justifyContent:"space-between"}]} >
            {listCategories.map((item,index)=>{
              return (
                <TouchableOpacity  onPress={() => navigation.navigate('ItemInCategories',{item:item})} style={styles.itemCategory} key={index}>
                  <Image source={item.icon} style={styles.iconCategory} />
                  <Text style={globalStyle.textSmall} >{item.name}</Text>
                </TouchableOpacity>
              )
            })}
          </View>
          <Text style={[globalStyle.textBig,styles.titelSelected]} >Selected for you</Text>

          <ScrollView>
            <View style={styles.containerItem} >
              {allProduct ? allProduct.map((item,index)=>{
                return(
                  <View key={index} style={styles.itemProduct} >
                    <TouchableOpacity style={styles.backgroundImage}
                      onPress={() => navigation.navigate('DetailScreen',{id:item.id})}
                    >
                      {listCategories.map((itemCategory,index)=>{
                        return(
                          JSON.parse(item.categories)[0].id === itemCategory.name.toUpperCase() &&
                          <Image source={itemCategory.icon} style={styles.iconItem} key={index} />
                        )
                      })}
                       <Image source={item.sourceImg ? item.image : {uri:item.image} } resizeMode='contain' style={styles.imgProduct} />
                    </TouchableOpacity>
                    <View style={[globalStyle.styleRow,{justifyContent:"space-between", marginTop:10}]}>
                      <Text style={[globalStyle.textMedium,globalStyle.mainColor,globalStyle.fontW600]}>
                        $ {item.price}
                      </Text>
                      <TouchableOpacity onPress={()=>item.favorite ? unLike(item.id) : like(item.id)} >
                        <Image source={item.favorite ? iconHeartActive : iconHeart} style={styles.iconHeart} />
                      </TouchableOpacity>
                    </View>
                    <Text style={[globalStyle.textMedium,globalStyle.fontW600]}>{item.name}</Text>
                  </View>
                )
              })
              :
              <Loading/>
            }
            </View>
          </ScrollView>


        </View>
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingHorizontal:25,
    backgroundColor:"white",
    paddingBottom:10
    // justifyContent:'center'
  },
  iconCart:{
    width:25,
    height:25,
    marginLeft:25,
  },
  inputSearch:{
    ...globalStyle.textBig
  },
  carouselGame: {
    marginVertical:15,
    flexDirection:"row",
    justifyContent:"center",
  },
  carouselItem: {
    width: widthScreen-50,
    borderRadius:15
  },
  itemSeparatorComponent: {
    width: 30,
  },
  iconCategory:{
    width:60,
    height:60,
    marginBottom:10
  },
  itemCategory:{
    alignItems:"center"
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
    width:(widthScreen-50)/2 - 25/2,
    height:145,
    marginVertical:10
  },
  iconItem:{
    width:40,
    height:40,
    top:5, left:5,
    position:"absolute",
    opacity:0.4,
    zIndex:999
  },
  iconHeart:{width:25,height:25},
  titelSelected:{fontWeight:"bold", marginTop:15, marginBottom:22},
  containerItem:{flexDirection:"row", flexWrap:"wrap", justifyContent:"space-between"}
});
