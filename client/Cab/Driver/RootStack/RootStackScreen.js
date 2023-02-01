
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
// import SplashScreen from './SplashScreen';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';
import { useSelector } from 'react-redux';
import RootDrawerScreen from '../RootDrawer/RootDrawerScreen';

const RootStack = createStackNavigator();
export const RootStackScreen = () => {
  const { driver, Token } = useSelector((state) => state.driver);
  // if (driver) {
  //   console.log('token in Root STAck screen==', driver.driver.firstname, Token);
  // }
  return (
    driver ?
      <RootDrawerScreen />
      :
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* <RootStack.Screen name="SplashScreen" component={SplashScreen} /> */}
        <RootStack.Screen name="SignInScreen" component={SignInScreen} />
        <RootStack.Screen name="SignUpScreen" component={SignUpScreen} />
      </RootStack.Navigator>
  );
}
//export default RootStackScreen;