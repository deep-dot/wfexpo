
import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
//import { Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import FareScreen from './screens/DoingJob/FareScreen';
import JobonScreen from './screens/DoingJob/JobonScreen';
import MapScreen from './screens/MapScreen';
import Map from './screens/DoingJob/Map';
import HomeScreen from './screens/HomeScreen';
import CompletedJobsScreen from './screens/CompletedJobs/CompletedJobsScreen';
import BookingScreen from './screens/BookingScreen';
import ProfileScreen from './screens/Profile/ProfileScreen';
import EditProfileScreen from './screens/Profile/EditProfileScreen';
import { useTheme, Avatar } from 'react-native-paper';
//import { AuthContext } from '../components/context';
import { View } from 'react-native-animatable';
import { _retrieveData } from '../../components/_Asyncstorage';

import AreaStatusScreen from './screens/WaitingJobScreen/AreaStatusScreen';
import ZoneStatusScreen from './screens/WaitingJobScreen/ZoneStatusScreen';
import ZoneScreen from './screens/WaitingJobScreen/ZoneScreen';
import CoverScreen from './screens/WaitingJobScreen/CoverScreen';
import JobdetailScreen from './screens/CompletedJobs/JobdetailScreen';

const HomeStack = createStackNavigator();
const BookingStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = (props) => (
  <Tab.Navigator initialRouteName="Home" activeColor="#fff">
    <Tab.Screen
      name="HomeScreen"
      component={HomeStackScreen}
      options={{
        tabBarLabel: 'HOME',
        tabBarColor: '#FF6347',
        // tabBarIcon: ({ color }) => (
        //   <Icon name="ios-home" color={color} size={26} />
        // ),
      }}
    />
    <Tab.Screen
      name="BookingScreen"
      component={BookingStackScreen}
      options={{
        tabBarLabel: 'BOOKINGS',
        tabBarColor: '#1f65ff',
        // tabBarIcon: ({ color }) => (
        //   <Icon name="ios-notifications" color={color} size={26} />
        // ),
      }}
    />
    <Tab.Screen
      name="ProfileScreen"
      component={ProfileStackScreen}
      options={{
        tabBarLabel: 'PROFILE',
        tabBarColor: '#694fad',
        // tabBarIcon: ({ color }) => (
        //   <Icon name="ios-person" color={color} size={26} />
        // ),
      }}
    />
  </Tab.Navigator>
);
export default MainTabScreen;

const HomeStackScreen = ({ navigation }) => {
  const { colors } = useTheme();
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
          shadowColor: colors.background, // iOS
          elevation: 0, // Android
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={ ({ route }) => ({
          //headerShown: false,
          title: '',
          // isFareSubmited: route.params.isFareSubmited,
          headerLeft: () => (
            <View style={{ marginLeft: 10 }}>
              <Icon.Button
                name="ios-menu"
                size={25}
                color={colors.text}
                backgroundColor={colors.background}
                onPress={() => navigation.openDrawer()}
              />
            </View>
          ),
        })}
      />
      <HomeStack.Screen
        name="AreaStatusScreen"
        component={AreaStatusScreen}
        options={({ route }) => ({
          title: route.params.title,
          // headerBackTitleVisible: false
          // headerShown: false,
        })}
      />
      <HomeStack.Screen
        name="ZoneScreen"
        component={ZoneScreen}
        options={({ route }) => ({
          title: route.params.title,
          // headerBackTitleVisible: false
          // headerShown: false,
        })}
      />
      <HomeStack.Screen
        name="ZoneStatusScreen"
        component={ZoneStatusScreen}
        options={({ route }) => ({
          title: route.params.title,
          // headerBackTitleVisible: false
          // headerShown: false,
        })}
      />
      <HomeStack.Screen
        name="CompletedJobsScreen"
        component={CompletedJobsScreen}
        options={({ route }) => ({
          title: route.params.title,
          // headerBackTitleVisible: false
          // headerShown: false,
        })}
      />
      <HomeStack.Screen
        name="JobdetailScreen"
        component={JobdetailScreen}
        setOptions={({ route }) => ({
          title: route.params.title,
          // headerBackTitleVisible: false
          // headerShown: false,
        })}
      />
      <HomeStack.Screen
        name="CoverScreen"
        component={CoverScreen}
        options={({ route }) => ({
          title: route.params.title,
          headerShown: false,
          //headerBackTitleVisible: false
        })}
      />
       <HomeStack.Screen
        name="MapScreen"
        component={MapScreen}
        options={({ route }) => ({
          headerShown: false,
          //title: route.params.title,
          //headerBackTitleVisible: false
        })}
      />
       <HomeStack.Screen
        name="JobonScreen"
        component={JobonScreen}
        options={({ route }) => ({
          headerShown: false,
          jobId: route.params.jobId,
          rego: route.params.rego,
          //title: route.params.title,
          //headerBackTitleVisible: false
        })}
      />
       <HomeStack.Screen
        name="Map"
        component={Map}
        options={({ route }) => ({
          headerShown: false,
          arrival: route.params.arrival,
          //headerBackTitleVisible: false
        })}
      />
       <HomeStack.Screen
        name="FareScreen"
        component={FareScreen}
        options={({ route }) => ({
          headerShown: false,          
          jobId: route.params.jobId,
          //title: route.params.title,
          //headerBackTitleVisible: false
        })}
      />
    </HomeStack.Navigator>
  );
};

const BookingStackScreen = ({ navigation }) => (
  <BookingStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#1f65ff',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <BookingStack.Screen
      name="Bookings"
      component={BookingScreen}
      options={{
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="#1f65ff"
            onPress={() => navigation.openDrawer()}
          />
        ),
      }}
    />
  </BookingStack.Navigator>
);

const ProfileStackScreen = ({ navigation }) => {
  const { colors } = useTheme();
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
          shadowColor: colors.background, // iOS
          elevation: 0, // Android
        },
        headerTintColor: colors.text,
      }}>
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          headerLeft: () => (
            <View style={{ marginLeft: 10 }}>
              <Icon.Button
                name="ios-menu"
                size={25}
                backgroundColor={colors.background}
                color={colors.text}
                onPress={() => navigation.openDrawer()}
              />
            </View>
          ),
          headerRight: () => (
            <View style={{ marginRight: 10 }}>
              <Icon.Button
                name="cog-sharp"
                size={25}
                backgroundColor={colors.background}
                color={colors.text}
                onPress={() => navigation.navigate('EditProfile')}
              />
            </View>
          ),
        }}
      />
      <ProfileStack.Screen
        name="EditProfile"
        options={{
          title: 'Edit Profile',
        }}
        component={EditProfileScreen}
      />
    </ProfileStack.Navigator>
  );
};
