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
import {getProfile} from '../../redux/actions/shoesActions';
import {getAccessToken} from '../../utils/storage';
import {iconCartColor, iconBack} from '../../assets'
import { listSales,listCategories } from '../../utils/listItem';
import globalStyle from '../../theme/globalStyle';
import HeaderScreen from '../HeaderScreen';
const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;
const ItemInCategories = (props) => {

  const navigation = useNavigation()

  console.log('props: ', props.route.params.item.name);
  const {allProduct} = useSelector(state=>state.shoesReducer)
  const [productCategories, setProductCategories] = useState(undefined)
  console.log('productCategories: ', productCategories);

  useEffect(() => {
    if(allProduct){
      setProductCategories(allProduct.filter(item=>JSON.parse(item.categories)[0].id === props.route.params.item.name.toUpperCase()))
    }

  }, [allProduct])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <HeaderScreen back title={props.route.params.item.name} cart />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.containerItem} >
            {productCategories && productCategories.length > 0 ? productCategories.map((item,index)=>{
                return(
                  <Fragment key={index}>
                        <View  style={styles.itemProduct} >
                        <TouchableOpacity style={styles.backgroundImage} onPress={() => navigation.navigate('DetailScreen',{id:item.id})} >
                          {listCategories.map((itemCategory,index)=>{
                            return(
                              JSON.parse(item.categories)[0].id === itemCategory.name.toUpperCase() &&
                              <Image source={itemCategory.icon} style={styles.iconItem} key={index} />
                            )
                          })}
                          {item.id >= 100 ?
                            <Image source={item.image} resizeMode='contain' style={styles.imgProduct} />
                          :
                            <Image source={{uri:item.image}} resizeMode='contain' style={styles.imgProduct} />
                          }
                        </TouchableOpacity>
                        <View style={[globalStyle.styleRow,{justifyContent:"space-between", marginTop:10}]}>
                          <Text style={[globalStyle.textMedium,globalStyle.mainColor,globalStyle.fontW600]}>
                            $ {item.price}
                          </Text>

                        </View>
                        <Text style={[globalStyle.textMedium,globalStyle.fontW600]}>{item.name}</Text>
                      </View>

                  </Fragment>
                )
            })
          :
            <Text  style={[globalStyle.textBig]}>
              No item in Categories
            </Text>
          }
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ItemInCategories;
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
    width:(widthScreen-50)/2 - 25/2,
    height:145,
    marginVertical:10,
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
