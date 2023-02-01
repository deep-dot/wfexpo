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
  ScrollView
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from '@react-navigation/native';

const data = [
  {
    id: "123",
    title: "Admin",
    image: './assets/banners/food-banner1.jpg',
    screen: "AdminRootStack",
  },
  {
    id: "456",
    title: "User",
    image: "./assets/images/Profile.png",
    screen: "UserRootStack",
  },
  {
    id: "678",
    title: "Driver",
    image: " ",    
    screen: "DriverRootStack",
  },
];

const SelectScreen = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  return (
    <SafeAreaView style={[tw`h-full flex items-center justify-center`,{backgroundColor:'#FF6347'}]}>
      <ScrollView>
      {data.map((item, index) => {
        return (
          <View key={index} style={[tw`p-1 pl-3 pb-4 pt-1 bg-gray-200 m-2 w-40 rounded-2xl`, {backgroundColor: colors.background}]}>
            <Image
              style={{ width: 140, height: 80, resizeMode: "contain" }}
              source={require('./assets/logo.png')}
              //source={{ uri: (item.image) }}
            />
            <Text style={tw`text-white mt-2 text-lg font-semibold`}>{item.title}</Text>
            <TouchableOpacity              
              onPress={() => navigation.navigate(item.screen)}
            >
              <Icon
                style={tw`p-2 bg-orange-500 rounded-full w-10 mt-4`}
                name="arrowright"
                color="black"
                type="antdesign"
              />
            </TouchableOpacity>
          </View>
        )
      })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SelectScreen;



