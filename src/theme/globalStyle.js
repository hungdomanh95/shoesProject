// eslint-disable-next-line prettier/prettier
import { Dimensions, StyleSheet } from 'react-native';
const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;
const globalStyle = StyleSheet.create({
  widthScreen,
  heightScreen,
  mainColor: {
    color: '#2B2F52',
  },
  primaryColor: {
    color: '#BDBDBD',
  },
  secondaryColor: {
    color: '#828282',
  },
  h2: {
    fontSize: 24,
    fontFamily: 'EuclidCircularB-Medium',
    lineHeight: 32,
    letterSpacing: -0.2,
  },
  h3: {
    fontSize: 18,
    fontFamily: 'EuclidCircularB-Medium',
    lineHeight: 24,
    letterSpacing: -0.2,
  },
  font:{ fontFamily: 'EuclidCircularB-Medium'},
  textBig: {
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: -0.2,
  },
  textMedium: {
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: -0.2,
  },
  textSmall: {
    fontSize: 12,
    lineHeight:16
  },
  fontW500: {
    fontWeight: '500',
  },
  fontW600: {
    fontWeight: '600',
  },
  fontBold:{
    fontWeight:"bold"
  },
  styleRow:{
    flexDirection:"row",
    alignItems:"center",
  },
});

export default globalStyle;
