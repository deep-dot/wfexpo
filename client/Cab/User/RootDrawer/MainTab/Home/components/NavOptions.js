import React from "react";
import { Icon } from "react-native-elements";
import tw from "twrnc";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectOrigin, setDestination } from "../../../../slices/navSlice";

const data = [
  {
    id: "123",
    title: "Get a ride",
    image: "https://i.ibb.co/YDYMKny/uberxl.png",
    screen: "Map",
  },
  // {
  //   id: "456",
  //   title: "Order food",
  //   image: "https://links.papareact.com/28w",
  //   screen: "HomeDrawer", // Change in future...
  // },
];

const NavOptions = (props) => {
  const navigation = useNavigation();
  const origin = useSelector(selectOrigin);
  const dispatch = useDispatch();
  //const currentLocation = useSelector(selectCurrentLocation);
  //console.log('Nav options origin==', props.uri);

  return (
    <FlatList
      data={data}
      horizontal
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(item.screen, {uri: props.uri});
            dispatch(setDestination(null))
          }}
          style={tw`p-5 items-center`}
          disabled={!origin}
        >
          <View style={tw`${!origin && "opacity-20"} flex-row justify-between`}>
            <View style={styles.categoryIcon}>
              <Image
                style={[{ width: 50, height: 50 }, tw`bg-gray-200`]}
                source={{ uri: props.uri }}
              ></Image>
            </View>
            <Text style={tw`m-6 mb-4 ml-2 text-lg text-white font-semibold`}>{item.title}</Text>
            <Icon
              style={tw`p-2 bg-black rounded-full w-10 mt-4`}
              name="arrowright"
              color="#ffffff"
              type="antdesign"
            />

          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default NavOptions;

const styles = StyleSheet.create({
  categoryIcon: {
    borderWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: 70,
    height: 70,
    backgroundColor: '#fdeae7' /* '#FF6347' */,
    borderRadius: 50,
  },
})

