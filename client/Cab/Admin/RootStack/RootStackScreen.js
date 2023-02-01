
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';
import { selectAdmin, selectLoading } from '../slices/navSlice';
import { useSelector, useDispatch } from 'react-redux';
import RootDrawerScreen from '../RootDrawer/RootDrawerScreen';

const RootStack = createStackNavigator();

export const RootStackScreen = () => {
  const loading = useSelector(selectLoading);
  const admin = useSelector(selectAdmin);
  console.log('admin in rootstack screen', loading, admin)

  return (
    admin ?
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