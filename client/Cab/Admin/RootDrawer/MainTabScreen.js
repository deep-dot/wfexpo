import React, { useEffect } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from './HomeScreen';
import NotificationScreen from './NotificationScreen';
import ExploreScreen from './ExploreScreen';
import ProfileScreen from './ProfileScreen';
import EditProfileScreen from './EditProfileScreen';
import { useTheme, Avatar } from 'react-native-paper';
import { View } from 'react-native-animatable';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CardListScreen from './CardListScreen';
import CardItemDetails from './CardItemDetails';
import { _retrieveData } from '../../components/_Asyncstorage';
import { useSelector } from "react-redux";
import { selectAdmin } from '../slices/navSlice';

const HomeStack = createStackNavigator();
const NotificationStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = (props) => (
  <Tab.Navigator initialRouteName="Home" activeColor="#fff">
    <Tab.Screen
      name="HomeScreen"
      component={HomeStackScreen}
      options={{
        tabBarLabel: 'Home',
        tabBarColor: '#FF6347',
        tabBarIcon: ({ color }) => (
          <Icon name="ios-home" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Notification"
      color="#000000"
      component={NotificationStackScreen}
      options={{
        tabBarLabel: 'Updates',
        tabBarColor: '#1f65ff',
        tabBarIcon: ({ color }) => (
          <Icon name="ios-notifications" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="ProfileScreen"
      component={ProfileStackScreen}
      options={{
        tabBarLabel: 'Profile',
        tabBarColor: '#694fad',
        tabBarIcon: ({ color }) => (
          <Icon name="ios-person" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="explore"
      component={ExploreScreen}
      options={{
        tabBarLabel: 'Explore',
        tabBarColor: '#d02860',
        tabBarIcon: ({ color }) => (
          <Icon name="ios-aperture" color={color} size={26} />
        ),
      }}
    />
    {/* <Tab.Screen
      name="SelectScreen"
      component={SelectScreen}
      options={{
        tabBarLabel: 'Exit',
        tabBarColor: '#d02860',
        tabBarIcon: ({ color }) => (
          <Icon name="ios-exit" color={color} size={26} />
        ),
      }}
    /> */}
    {/* <Tab.Screen
      name="RMS"
      component={RideandMapScreen}
      options={{
        tabBarLabel: 'RMS',
        tabBarColor: '#d02860',
        tabBarIcon: ({ color }) => (
          <Icon name="ios-car" color={color} size={26} />
        ),
      }}
    /> */}
  </Tab.Navigator>
);
export default MainTabScreen;

const HomeStackScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const admin = useSelector(selectAdmin);
  // console.log('maintab=====',user);

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
      }}>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'CabFinder',
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
          headerRight: () => (
            <View style={{ flexDirection: 'row', marginRight: 10 }}>
              <Icon.Button
                name="ios-search"
                size={25}
                color={colors.text}
                backgroundColor={colors.background}
                onPress={() => { }}
              />
              <TouchableOpacity
                style={{ paddingHorizontal: 10, marginTop: 5 }}
                onPress={() => {
                  navigation.navigate('ProfileScreen');
                }}>
                {/* <Avatar.Image
                  source={{
                    uri: user.image,
                  }}
                  size={30}
                /> */}
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <HomeStack.Screen
        name="CardListScreen"
        component={CardListScreen}
        options={({ route }) => ({
          title: route.params.title,
          headerBackTitleVisible: false
        })}
      />
      <HomeStack.Screen
        name="CardItemDetails"
        component={CardItemDetails}
        options={({ route }) => ({
          title: route.params.title,
          headerBackTitleVisible: false,
         // headerTitle: false,
          headerTransparent: true,
          headerTintColor: '#fff',
          //headerShown: false
        })}
      />
    </HomeStack.Navigator>
  );
};

const NotificationStackScreen = ({ navigation }) => (
  <NotificationStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#1f65ff',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <NotificationStack.Screen
      name="Notifications"
      component={NotificationScreen}
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
  </NotificationStack.Navigator>
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
