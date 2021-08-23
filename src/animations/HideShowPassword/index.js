import LottieView from 'lottie-react-native';
import React,{useRef,useEffect} from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;

const HideShowPassword = (props) => {
  const animation = useRef(null);
  useEffect(() => {
    if (!props.showPassword) {
      console.log("1");
      animation.current.play(30, 72);
    } else {
      console.log("2");
      animation.current.play(0, 30);
    }
  }, [props.showPassword]);
  return (
    <View style={styles.container}>
      <LottieView ref={animation} source={require('./hiding.json')} autoPlay loop={false} />
    </View>
  )
}

export default HideShowPassword
const styles = StyleSheet.create({
  container: {
    width: widthScreen/5,
    height: widthScreen/5,
  },
});
