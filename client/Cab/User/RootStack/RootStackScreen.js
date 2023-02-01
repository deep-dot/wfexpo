
import React from 'react';
//import { Text, View } from 'react-native';
import { createStackNavigator} from '@react-navigation/stack';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';
import { useSelector } from 'react-redux';
import RootDrawerScreen from '../RootDrawer/RootDrawerScreen';


const RootStack = createStackNavigator();

export const RootStackScreen = () => {  
  const { user } = useSelector((state) => state.user);
   //console.log('rootstack screen user===', user);

  return (
    (user === null) ?
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <RootStack.Screen name="SignInScreen" component={SignInScreen} />
      <RootStack.Screen name="SignUpScreen" component={SignUpScreen} />
    </RootStack.Navigator>
    : 
    <RootDrawerScreen /> 
    
  )
}
//export default RootStackScreen;