import React from 'react';
import { View } from 'react-native-animatable';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from './Home/HomeScreen';
import CardListScreen from './Home/CardListScreen';
import CardItemDetails from './Home/CardItemDetails';
import JobDispatchScreen from './Home/JobDispatchScreen';
import JobdetailScreen from './Home/JobdetailScreen';

import BookingsScreen from './Bookings/BookingsScreen';

import ProfileScreen from './Profile/ProfileScreen';
import EditProfileScreen from './Profile/EditProfileScreen';

import ExploreScreen from './Home/ExploreScreen';
import MapScreen from './Home/MapScreen';
import RideScreen from './Home/RideScreen';

//import JobdetailScreen from './Home/JobdetailScreen';

import { useTheme } from 'react-native-paper';
//import { AuthContext } from '../../components/context';
import { _retrieveData } from '../../../components/_Asyncstorage';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

const HomeStack = createStackNavigator();
const BookingsStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => (
  <Tab.Navigator initialRouteName="Home" activeColor="#fff">
    <Tab.Screen
      name="Home"
      component={HomeComponent}
      options={{
        tabBarLabel: 'Home ',
        tabBarColor: '#FF6347',
        tabBarIcon: ({ color }) => (
          <Icon name="ios-home" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Bookings"
      color="#000000"
      component={BookingsComponent}
      options={{
        tabBarLabel: 'Past Bookings',
        tabBarColor: '#1f65ff',
        tabBarIcon: ({ color }) => (
          <Icon name="ios-notifications" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileComponent}
      options={{
        tabBarLabel: 'Profile',
        tabBarColor: '#694fad',
        tabBarIcon: ({ color }) => (
          <Icon name="ios-person" color={color} size={26} />
        ),
      }}
    />
  </Tab.Navigator>
);
export default MainTabScreen;

const HomeComponent = ({ navigation }) => {
  const { colors } = useTheme();
  //const { user } = React.useContext(AuthContext);
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
          //headerShown: false,
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
        name="Ride"
        component={RideScreen}
        options={({ route }) => ({
          headerShown: false,
          uri: route.params.uri
        })}
      />
      <HomeStack.Screen
        name="Map"
        component={MapScreen}
        options={() => ({
          headerShown: false,
        })}
      />
      <HomeStack.Screen
        name="JobDispatchScreen"
        component={JobDispatchScreen}
        options={() => ({
          headerShown: false,
        })}
      />
      {/* <HomeStack.Screen
        name="CardListScreen"
        component={CardListScreen}
        options={({ route }) => ({
          title: route.params.title,
          headerBackTitleVisible: false
        })}
      /> */}
      {/* <HomeStack.Screen
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
      /> */}
      <HomeStack.Screen
        name="JobdetailScreen"
        component={JobdetailScreen}
        setOptions={({ route }) => ({
          title: route.params.title,
          // headerBackTitleVisible: false
          // headerShown: false,
        })}
      />
    </HomeStack.Navigator>
  );
};

const BookingsComponent = ({ navigation }) => {
  const { colors } = useTheme();
  return (
    <BookingsStack.Navigator
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
      <BookingsStack.Screen
        name="Bookings"
        component={BookingsScreen}
        options={{
          // headerShown: false,
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
        }}
      />
    </BookingsStack.Navigator>
  )
}

const ProfileComponent = ({ navigation }) => {
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
          // headerRight: () => (
          //   <View style={{ marginRight: 10 }}>
          //     <Icon.Button
          //       name="cog-sharp"
          //       size={25}
          //       backgroundColor={colors.background}
          //       color={colors.text}
          //       onPress={() => navigation.navigate('EditProfile')}
          //     />
          //   </View>
          // ),
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
