import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef } from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Fade } from '../../animations';
import Loading from '../../animations/Loading';
import { bgStart } from '../../assets';
import { Button } from '../../components';

const StartScreen = () => {

  const navigation = useNavigation();

  const startApp = () => {
    navigation.navigate("LoginScreen")
  };
  return (
    <ImageBackground style={styles.container} source={bgStart}>
      <View style={styles.overlay}>
        <Loading small/>
        {/* <Fade>
          <Button top={686} onPress={startApp}>Get Started</Button>
        </Fade> */}
         {/* <Loading/> */}
       </View>
     </ImageBackground>
  );
};

export default StartScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    alignItems: 'center',
  },
});
