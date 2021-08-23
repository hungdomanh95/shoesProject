import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeScreen, FavoriteScreen,CartScreen, UserScreen} from '../screens';
import Tabbar from '../screens/Tabbar/Tabbar';

const Tab = createBottomTabNavigator();

const RootTab = (props) => {

  return (
    <Tab.Navigator  tabBar={props => <Tabbar {...props}  />} initialRouteName="HomeScreen" >
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen name="FavoriteScreen" component={FavoriteScreen} />
      <Tab.Screen name="UserScreen" component={UserScreen} />
    </Tab.Navigator>
  );
};
export default RootTab;
