import axios from 'axios';
import React, {useEffect, useState,Fragment,useRef} from 'react';
import { Dimensions, SafeAreaView,StyleSheet,View,Text,TouchableOpacity,Image,FlatList, Animated, ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {iconCartColor,iconCart, iconBack,iconHeart} from '../../assets'
import {getProductById,removeState,addProductToCart} from '../../redux/actions/shoesActions';
import globalStyle from '../../theme/globalStyle';
import {listProductAddMore} from '../../utils/listItem'
import Button from '../../components/ButtonComponent';
import HeaderScreen from '../HeaderScreen';
import Loading from '../../animations/Loading';

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;

const DetailScreen = (props) => {

  const dispatch = useDispatch();
  const navigation = useNavigation()
  const scrollX = useRef(new Animated.Value(0)).current;

  const {productById} = useSelector(state=>state.shoesReducer)

  const [productId, setProductId] = useState(undefined)
  const [indexShoes, setIndexShoes] = useState(0)
  const [sizeShoes, setSizeShoes] = useState(null)
  const [showDes, setShowDes] = useState(false)

  useEffect(() => {
    setProductId(undefined)
    if(props.route.params.id >= 100){
      dispatch(removeState())
      setProductId(listProductAddMore[props.route.params.id - 100])
    }else{
      dispatch(getProductById(props.route.params.id))
    }
  }, [])

  const handledBack = () => {
    navigation.goBack('')
  }
  const handledShowDes = () => {
    setShowDes(!showDes)
  }
  const changeShoes = (index) => {
    setIndexShoes(index)
  }
  const chooseSize = (size) => {
    setSizeShoes(size)
  }
  const addCart = (itemAddCart) => {
    dispatch(addProductToCart(itemAddCart))
  }

  const Indicator = ({item}) => {
    return (
      <View style={{flexDirection:"row",marginVertical:20,}}>
      {item.imgByColor[indexShoes].listImgProductByColor.map((item,index)=>{
        const inputRange = [
          (index-1)*widthScreen,
          index * widthScreen ,
          (index+1)*widthScreen
        ]
        const scale = scrollX.interpolate({
          inputRange,
          outputRange:[0.8, 1.4,0.8],
          extrapolate:"clamp"
        })
        const color = scrollX.interpolate({
          inputRange,
          outputRange:["#BDBDBD",`${globalStyle.mainColor.color}`,"#BDBDBD"],
          extrapolate:"clamp"
        })
        const widthDot = scrollX.interpolate({
          inputRange,
          outputRange:[7, 20, 7],
          extrapolate:"clamp"
        })
        return(
          <Animated.View
          key={index}
          style={{
            width:widthDot,
            height:7,
            backgroundColor:color,
            marginHorizontal:10,
            borderRadius:5,
            transform:[{scale}]
          }}
        />
        )
      })}
    </View>

    )
  }

  const renderDetail = (item) => {
    if(item){
      return(
        <Fragment>

          <ScrollView style={styles.containerDetail} showsVerticalScrollIndicator={false}>
            {item.id >= 100 ?
              <View style={styles.carouselGame}>
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  horizontal
                  data={item.imgByColor[indexShoes].listImgProductByColor}
                  keyExtractor={(_, index) => index.toString()}
                  renderItem={_renderItem}
                  ItemSeparatorComponent={() => (
                    <View style={styles.itemSeparatorComponent} />
                  )}
                  snapToInterval={370}
                  decelerationRate="fast"
                  onScroll={ Animated.event(
                    [{nativeEvent:{contentOffset:{x:scrollX}}}],
                    {useNativeDriver:false}
                  )}
                  pagingEnabled
                  scrollEventThrottle={32}
                />
                <Indicator item={item} />
              </View>
              :
              <Image source={{uri:item.image}} resizeMode='contain' style={styles.imgProduct} />
            }
            <View style={styles.priceItem} >
              <View>
                <Text style={globalStyle.h3}>{item.name}</Text>
                <Text style={[globalStyle.textSmall,{color:"#BDBDBD",marginTop:8}]}>
                  {item.alias}
                </Text>
              </View>
              <View style={{alignItems:"flex-end"}}>
                <Text style={[globalStyle.h2,globalStyle.mainColor]}>
                  $ {item.price}
                </Text>
                <TouchableOpacity>
                  <Image source={iconHeart} style={styles.iconHeart} />
                </TouchableOpacity>
              </View>
            </View>

            {item.id >= 100 &&
                <Fragment>
                  <Text style={[globalStyle.textBig,globalStyle.font]}>Color</Text>
                  <View style={styles.containerColor} >
                    {item.imgByColor.map((item,index)=>{
                      return(
                        <View key={index} style={[styles.colorActive, {borderColor:index === indexShoes ? `${item.color}`: "#F6F6F6"}]} >
                          <TouchableOpacity onPress={()=>changeShoes(index)} key={index} style={[styles.itemColor,{backgroundColor:`${item.color}`}]} />
                        </View>
                      )
                    })}
                  </View>
                </Fragment>
            }

            <Text style={[globalStyle.textBig,globalStyle.font,{marginVertical:10}]}>
              Select Size
            </Text>
            <ScrollView  horizontal showsHorizontalScrollIndicator={false} >
                {item.size.map((item,index)=>{
                  return(
                    <TouchableOpacity key={index}
                      style={[
                        styles.containerSize,
                        sizeShoes === item && {
                          backgroundColor:globalStyle.mainColor.color,
                          borderColor:globalStyle.mainColor.color
                        }]
                      }
                      onPress={()=>chooseSize(item)} >
                      <Text style={[globalStyle.textBig,globalStyle.font,sizeShoes === item &&{color:"white"}]}>{item}</Text>
                    </TouchableOpacity>
                  )
                })}
            </ScrollView>
              <View style={[globalStyle.styleRow,{justifyContent:"space-between"}]}>
                <Text style={[globalStyle.textBig,globalStyle.font,{marginVertical:10}]}>
                  Description
                </Text>
                {item.id >= 100 &&
                  <TouchableOpacity onPress={handledShowDes}>
                    <Image source={iconBack}
                      style={[styles.iconDetail,{transform:[ {rotate:showDes ? "90deg" : "-90deg"}]}]}
                    />
                  </TouchableOpacity>
                }
              </View>
              {(showDes || item.id < 100) &&
                <Text style={[globalStyle.textMedium]}>
                  {item.description}
                </Text>
              }
          </ScrollView>

          <Button onPress={ ()=>{item.id < 100 && sizeShoes && addCart({...item, sizeChoose:sizeShoes,quantityCart:1})}} icon colorText={"white"} color={globalStyle.mainColor.color}  >
            <Image source={iconCart} style={styles.iconDetail} />
            <Text style={[globalStyle.textBig,globalStyle.fontW500,{color:"white", marginLeft:5}]} >
              Add to cart
            </Text>
          </Button>
        </Fragment>
      )
    }else{
      return <Loading/>
    }
  }
  const _renderItem = ({item}) => {
    return (
        <Image resizeMode="center" source={item} style={styles.carouselItem} />
    )
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <HeaderScreen back cart />



        {productId && renderDetail(productId)}
        {productById && renderDetail(productById)}
      </View>
    </SafeAreaView>
  );
};

export default DetailScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    paddingBottom: 10,
    backgroundColor:"#F6F6F6",
// backgroundColor:"blue"
  },
  header:{
    height:heightScreen/15,
    justifyContent:"space-between",
    marginBottom:15,
  },
  iconDetail:{
    width:25,
    height:25,
  },
  containerDetail:{
    // flex:1,
    // justifyContent:"space-between",
    // backgroundColor:"green"
  },
  imgProduct:{
    width:widthScreen - 50,
    height:heightScreen/3,
  },
  carouselGame: {
    // flexDirection:"row",
    justifyContent:"center",
    alignItems:"center"
  },
  itemSeparatorComponent: {
    width: 30,
  },
  carouselItem: {
    width: widthScreen-50,
    height:heightScreen/3.5,
    borderRadius:15,
  },
  priceItem:{
    flexDirection:"row",
    justifyContent:"space-between",
    // marginBottom:0
  },
  containerColor:{
    flexDirection:"row",
    marginTop:10
  },
  itemColor:{
    width:40,
    height:40,
    borderRadius:100,
  },
  iconHeart:{width:30,height:30},
  colorActive:{
    borderWidth:1,
    borderRadius:100,
    padding:5,
    marginRight:15
  },
  containerSize:{width:50, height:50, borderColor:"#BDBDBD", borderWidth:1, justifyContent:"center",alignItems:"center", marginRight:15, marginBottom:15, borderRadius:7}
});
