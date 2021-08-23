import React from 'react'
import { View, Text,SafeAreaView,StyleSheet,Dimensions,Image } from 'react-native'
import globalStyle from '../../theme/globalStyle'
import HeaderScreen from '../HeaderScreen'
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import { sales1, sales2, sales3 } from '../../assets';
const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;
const AboutMeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.styleContainer}>
      <HeaderScreen title="About Me" back cart={false} />
      <Image source={sales2} style={{width: widthScreen - 20,left:-15, borderRadius: 15}} />
      <Text style={globalStyle.h2}>Welcome to my Shoes Shop</Text>
      <Text style={[globalStyle.h3,{marginVertical:20}]}>Contact</Text>
      <Text style={globalStyle.textBig}>Phone : 0377711455</Text>
      <Text style={globalStyle.textBig}>Email : hungdomanh95@gmail.com</Text>
      <Text style={globalStyle.textBig}>Address : 1646A Võ Văn Kiệt, P16, Q8, TP HCM </Text>

      <MapView
        style={{height: heightScreen/4, width: widthScreen - 20,left:-15,marginTop:30, borderRadius:15}}
        // provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 10.771663,
          longitude: 106.669631,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <Marker
          coordinate={{latitude: 10.729350, longitude: 106.624872}}
        />
      </MapView>

    </View>
    </SafeAreaView>
  )
}
export default AboutMeScreen
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
    paddingBottom: 50,
    justifyContent: "space-between",
    // paddingTop:50,
  },
});
