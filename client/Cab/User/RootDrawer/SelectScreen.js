import React from "react";
import { Icon } from "react-native-elements";
import tw from "twrnc";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
//import { AuthContext } from '../../components/context';

const data = [
  {
    id: "123",
    title: "Admin",
    // image: '../../assets/banners/food-banner5.jpg',
    screen: "JobDispatchScreen",
  },
  {
    id: "456",
    title: "User",
    // image: "https://i.ibb.co/Xx4G91m/uberblack.png",    
    screen: "HomeDrawer", // Change in future...
  },
  {
    id: "678",
    title: "Driver",
    // image: " ",    
    screen: "RideandMapScreen", // Change in future...
  },
];

const SelectScreen = () => {
  const navigation = useNavigation();
  //const { user } = React.useContext(AuthContext);
  const user = { role: "User" };
  console.log("currentlocation select screen",user.role);

  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View style={tw`p-1 mt-25`}>
        <FlatList
          data={data}
          horizontal
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (

            (user.role == 'Admin') ?
              <TouchableOpacity
                onPress={() => navigation.navigate(item.screen)}
                style={tw`p-1 pl-3 pb-4 pt-1 bg-gray-200 m-2 w-40`}
                disabled={item.title != 'Admin'}
              >
                <View key={item.id} style={tw`${(item.title != 'Admin') && "opacity-20"}`}>
                  <Image
                    style={{ width: 130, height: 130, resizeMode: "contain" }}
                    // source= {require('../../assets/banners/food-banner1.jpg')}
                    source={{ uri: (user.image) }}
                  />
                  <Text style={tw`mt-2 text-lg font-semibold`}>{item.title}</Text>
                  <Icon
                    style={tw`p-2 bg-black rounded-full w-10 mt-4`}
                    name="arrowright"
                    color="white"
                    type="antdesign"
                  />
                </View>
              </TouchableOpacity>

              : (user.role == 'User') ?
                <TouchableOpacity
                  onPress={() => navigation.navigate(item.screen)}
                  style={tw`p-1 pl-3 pb-4 pt-1 bg-gray-200 m-2 w-40`}
                  disabled={item.title != 'User'}
                >
                  <View key={item.id} style={tw`${(item.title != 'User') && "opacity-20"}`}>
                    <Image
                      style={{ width: 130, height: 130, resizeMode: "contain" }}
                       source= {require('../../assets/banners/food-banner1.jpg')}
                      //source={{ uri: (user.image) }}
                    />
                    <Text style={tw`mt-2 text-lg font-semibold`}>{item.title}</Text>
                    <Icon
                      style={tw`p-2 bg-black rounded-full w-10 mt-4`}
                      name="arrowright"
                      color="white"
                      type="antdesign"
                    />
                  </View>
                </TouchableOpacity>
                : (user.role == 'Driver') ?
                  <TouchableOpacity
                    onPress={() => navigation.navigate(item.screen)}
                    style={tw`p-1 pl-3 pb-4 pt-1 bg-gray-200 m-2 w-40`}
                    disabled={item.title != 'Driver'}
                  >
                    <View key={item.id} style={tw`${(item.title != 'Driver') && "opacity-20"}`}>
                      <Image
                        style={{ width: 130, height: 130, resizeMode: "contain" }}
                        // source= {require('../../assets/banners/food-banner1.jpg')}
                        source={{ uri: (user.image) }}
                      />
                      <Text style={tw`mt-2 text-lg font-semibold`}>{item.title}</Text>
                      <Icon
                        style={tw`p-2 bg-black rounded-full w-10 mt-4`}
                        name="arrowright"
                        color="white"
                        type="antdesign"
                      />
                    </View>
                  </TouchableOpacity>
                  : null
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default SelectScreen;

