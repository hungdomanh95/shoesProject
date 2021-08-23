import React, { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';

const Fade = ({children,...props}) => {
  const animated = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(animated, {
      toValue: 1,
      duration: props.duration || 350,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start();
  }, []);
  return (
    <Animated.View style={{opacity: animated}}>
      {children}
    </Animated.View>
  );
};

export default Fade;
