import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { Fragment } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Loading from '../animations/Loading';
import { Modal } from '../components';
import { getProfile, setLogin } from '../redux/actions/shoesActions';
import { CartScreen, DetailScreen, HomeScreen, LoginScreen, SignupScreen, StartScreen } from '../screens';
import AboutMeScreen from '../screens/AboutMeScreen';
import InforUserScreen from '../screens/InforUserScreen';
import ItemInCategories from '../screens/ItemInCategories';
import OrderHistoryScreen from '../screens/OrderHistoryScreen';
import { getAccessToken } from '../utils/storage';
import RootTab from './rootTab';
const Stack = createStackNavigator();

const RootNavigation = () => {

  const dispatch = useDispatch()
  const [moveScreen, setMoveScreen] = useState(false)

  const {isLogin} = useSelector(state=>state.loginReducer)
  const {statusLoading} = useSelector(state=>state.loadingReducer)
  const {accessToken} = useSelector(state=>state.loginReducer)
  const {userProfile} = useSelector(state=>state.shoesReducer)
  console.log('userProfile: ', userProfile);

  useEffect( async () => {
    const accessTokenStorage = await getAccessToken();
    if(accessTokenStorage){
      dispatch(getProfile(accessTokenStorage));
    }
  }, [accessToken])

  useEffect(() => {
    if(userProfile){
      if(userProfile.status === 200){
        console.log("aaa");
        dispatch(setLogin(true))
      }else{
        console.log("=======");
        dispatch(setLogin(false))
      }
    }
    setTimeout(() => {
      setMoveScreen(true)
    }, 1300);
  }, [userProfile])

  const screenOptions = {
    headerShown: false,
  };
  return (
    <>
    {statusLoading && <Loading />}
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptions}>
        {!moveScreen ?
          <Stack.Screen name="StartScreen" component={StartScreen} />
          :
          <Fragment>
            {isLogin ?
              <>
                <Stack.Screen name="RootTab" component={RootTab} />
                <Stack.Screen name="DetailScreen" component={DetailScreen} />
                <Stack.Screen name="CartScreen" component={CartScreen} />
                <Stack.Screen name="OrderHistoryScreen" component={OrderHistoryScreen} />
                <Stack.Screen name="InforUserScreen" component={InforUserScreen} />
                <Stack.Screen name="AboutMeScreen" component={AboutMeScreen} />
                <Stack.Screen name="ItemInCategories" component={ItemInCategories} />
              </>
             :
               <>
                 <Stack.Screen name="LoginScreen" component={LoginScreen} />
                 <Stack.Screen name="SignupScreen" component={SignupScreen} />
               </>
           }
          </Fragment>
        }

      </Stack.Navigator>
    </NavigationContainer>
    </>
  );
};

export default RootNavigation;
