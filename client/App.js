
import React, {useMemo} from 'react';
import { Alert } from 'react-native';
import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme
} from 'react-native-paper';
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme
} from '@react-navigation/native';
import { _retrieveData, _storeData, _removeData, _clearData } from './Cab/components/_Asyncstorage';
import {
  CLEAR_ERRORS,
} from "./Cab/Driver/constants/driverConstants";
import { AuthContext } from './Cab/components/context';
import { logout } from "./Cab/Driver/actions/driverAction";
import { logoutUser } from "./Cab/User/actions/userAction";
import { setAdmin } from './Cab/Admin/slices/navSlice';


import { useDispatch } from "react-redux";
import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from './Cab/SplashScreen';
import SelectScreen from './Cab/SelectScreen';
import { RootStackScreen as AdminRootStack } from './Cab/Admin/RootStack/RootStackScreen';
import { RootStackScreen as UserRootStack } from './Cab/User/RootStack/RootStackScreen';
import { RootStackScreen as DriverRootStack } from './Cab/Driver/RootStack/RootStackScreen';
import axios from 'axios';

const RootStack = createStackNavigator();
const App = () => {
  // const [rootReducerCombined, initialStateCombined] = combineReducers({
  //   driverReducer: [driverReducer, state = { driver: {}, Token: null }],
  //   profileReducer: [profileReducer, state = {}],
  // });
  // const [loginState, dispatch] = React.useReducer(rootReducerCombined, initialStateCombined);

  const dispatch = useDispatch();
  const [isDarkTheme, setIsDarkTheme] = React.useState(true);
  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#ffffff',
      text: '#333333'
    }
  }
  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#333333',
      text: '#ffffff'
    }
  }
  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  const authContext = useMemo(() => ({
    signinAdmin: (formBody) => {
      try {
        axios.post(
          // `http://192.168.43.36:4000/appAuth/registerUser`,
          `http://192.168.43.36:4000/Admin/signin`,
          formBody
        ).then((res) => {
          console.log('res in app screen===',res.status)
          if (res.status === 200) {
            dispatch(setAdmin(res.data.admin));
          } else {
            Alert.alert(res.msg)
            // setErrortext(res.msg);
          }
        }).catch((e) => { console.log(e) });
      } catch (e) { console.log(e.message) }
    },

    logout: async () => {
      try {
        Alert.alert(
          "Do you want to log out !",
          "",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            {
              text: "OK", onPress: async () => {
                dispatch(logout());
              }
            }
          ]
        );
      } catch (error) {
        console.log(error.message);
      }
    },

    logoutUser: async () => {
      try {
        Alert.alert(
          "Do you want to log out !",
          "",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            {
              text: "OK", onPress: async () => {
                dispatch(logoutUser());
              }
            }
          ]
        );
      } catch (error) {
        console.log(error.message);
      }
    },

    logoutAdmin: async () => {
      try {
        Alert.alert(
          "Do you want to log out !",
          "",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            {
              text: "OK", onPress: async () => {
                dispatch(setAdmin(null));                
              }
            }
          ]
        );
      } catch (error) {
        console.log(error.message);
      }
    },

    toggleTheme: () => {
      setIsDarkTheme(isDarkTheme => !isDarkTheme);
    },
    clearErrors: () => {
      dispatch({ type: CLEAR_ERRORS });
    }
  }), []);

  return (
    // <View><Text>hhhhhi</Text></View>
    <AuthContext.Provider value={{
      ...authContext,
    }}>
      <PaperProvider theme={theme}>
        <NavigationContainer theme={theme}>
          <RootStack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <RootStack.Screen name="SplashScreen" component={SplashScreen} />
            <RootStack.Screen name="SelectScreen" component={SelectScreen} />

            <RootStack.Screen name="AdminRootStack" component={AdminRootStack} />
            <RootStack.Screen name="UserRootStack" component={UserRootStack} />
            <RootStack.Screen name="DriverRootStack" component={DriverRootStack} />

          </RootStack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </AuthContext.Provider>
  );
}

export default App;

