import * as shape from 'd3-shape';
import React, {Component,useRef} from 'react';
import {
  Animated,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  View,Text
} from 'react-native';
import Svg, {
  Circle,
  ClipPath,
  Defs,
  Ellipse,
  G,
  Image,
  Line,
  LinearGradient,
  Mask,
  Path,
  Pattern,
  Polygon,
  Polyline,
  RadialGradient,
  Rect,
  Stop,
  Symbol,
  TextPath,
  TSpan,
  Use,
} from 'react-native-svg';
import {iconCart, iconFavorite, iconHome, iconNoti, iconUser} from '../../assets';
import StaticTabbar from './StaticTabbar';
const AnimatedSvg = Animated.createAnimatedComponent(Svg);
const {width} = Dimensions.get('window');
const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;
const height = 85;
const tabs = [
  {
    name: 'HomeScreen',
    image: iconHome,
  },
  {
    name: 'FavoriteScreen',
    image: iconFavorite,
  },
  {
    name: 'UserScreen',
    image: iconUser,
  },
];
const tabWidth = width / tabs.length;
const backgroundColor = '#4E55AF';

const getPath = () => {
  const left = shape
    .line()
    .x(d => d.x)
    .y(d => d.y)([
    {x: 0, y: 0},
    {x: width, y: 0},
  ]);
  const tab = shape
    .line()
    .x(d => d.x)
    .y(d => d.y)
    .curve(shape.curveBasis)([
    {x: width, y: 0},
    {x: width - 10, y: 0},
    {x: width + 15, y: 0},
    {x: width + 5, y: height - 20},
    {x: width + tabWidth - 5, y: height - 20},
    {x: width + tabWidth - 15, y: 0},
    {x: width + tabWidth + 10, y: 0},
    {x: width + tabWidth, y: 0},
  ]);
  const right = shape
    .line()
    .x(d => d.x)
    .y(d => d.y)([
    {x: width + tabWidth, y: 0},
    {x: width * 2, y: 0},
    {x: width * 2, y: height},
    {x: 0, y: height},
    {x: 0, y: 0},
  ]);
  return `${left} ${tab} ${right}`;
};
// const getPath = () => {
//   const left = shape
//     .line()
//     .x(d => d.x)
//     .y(d => d.y)([
//     {x: 0, y: 0},
//     {x: width, y: 0},
//   ]);
//   const tab = shape
//     .line()
//     .x(d => d.x)
//     .y(d => d.y)
//     .curve(shape.curveBasis)([
//     {x: width, y: 0},
//     {x: width + 5, y: 0},
//     {x: width + 10, y: 10},
//     {x: width + 15, y: height - 20},
//     {x: width + tabWidth - 15, y: height - 20},
//     {x: width + tabWidth - 10, y: 10},
//     {x: width + tabWidth - 5, y: 0},
//     {x: width + tabWidth, y: 0},
//   ]);
//   const right = shape
//     .line()
//     .x(d => d.x)
//     .y(d => d.y)([
//     {x: width + tabWidth, y: 0},
//     {x: width * 2, y: 0},
//     {x: width * 2, y: height},
//     {x: 0, y: height},
//     {x: 0, y: 0},
//   ]);
//   return `${left} ${tab} ${right}`;
// };
const d = getPath();

const Tabbar = (props) => {
  // const value = new Animated.Value(0);
  const value = useRef(new Animated.Value(0)).current;
  const translateX = value.interpolate({
    inputRange: [0, width],
    outputRange: [-width, 0],
  });
  return (
    <SafeAreaView style={{height: height, width: widthScreen, backgroundColor:"white"}}>
      <View {...{height, width, position: 'absolute', bottom: 0}}>
        <AnimatedSvg
          width={width * 2}
          {...{height}}
          style={{transform: [{translateX}]}}
        >
          <Path fill={backgroundColor} {...{d}} />
        </AnimatedSvg>
        <View style={StyleSheet.absoluteFill}>
          <StaticTabbar navigation={props.navigation} {...{tabs, value}} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Tabbar;
const styles = StyleSheet.create({
  container: {
    backgroundColor,
  },
});
