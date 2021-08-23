import LottieView from 'lottie-react-native';
import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;
const Loading = (props) => {
  console.log('props: ', props);
  return (
    <View style={props.small ? styles.containerSmall :styles.container}>
      <LottieView source={require('./loading.json')} autoPlay loop />
    </View>
  );
};

export default Loading;
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255,255,255,0.5)',
    width: widthScreen,
    height: heightScreen,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 999,
  },
  containerSmall:{
    width: widthScreen,
    height:  widthScreen,
    position: 'absolute',
    // top: heightScreen/3
    bottom:-80,
    left: 0,
    zIndex: 999,
    // backgroundColor:"red"
  }
});
