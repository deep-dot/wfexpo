import React from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Icon } from "react-native-elements";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { selectTravelTimeInformation } from "../../../../slices/navSlice";
import { useSelector } from "react-redux";
import 'intl';
import 'intl/locale-data/jsonp/en';

const RideOptionsCard = ({route}) => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);
  const travelTimeInformation = useSelector(selectTravelTimeInformation);
 // console.log(travelTimeInformation); route
  // If we have SURGE pricing, this goes up
  const SURGE_CHARGE_RATE = 1.5;

  //console.log('in rideoptioncard card===', route.params.uri);
  const data = [
    {
      id: "Uber-X-123",
      title: "Hiace Commuter",
      multiplier: 1,
      image: route.params.uri,
    },
  ];
  console.log('in rideoptioncard card===',route.params.uri);
  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate("NavigateCard")}
          style={[tw`absolute top-3 left-5 z-50 p-3 rounded-full`]}
        >
          <Icon name="chevron-left" type="fontawesome" />
        </TouchableOpacity>
        <Text style={tw`text-center py-5 text-xl`}>
          Select a ride - {travelTimeInformation?.distance.text}
        </Text>
      </View>

      <FlatList
        data={data}
        renderItem={({ item: { id, title, multiplier, image }, item }) => (
          <TouchableOpacity
            onPress={() => setSelected(item)}
            style={tw`flex-row justify-between items-center px-0 ${
              id === selected?.id && "bg-gray-200"
            }`}
          >
            <Image
              style={{
                width: 90,
                height: 90,
                resizeMode: "contain",
              }}
              source={{ uri: image }}
            />
            <View style={tw`-ml-0`}>
              <Text style={tw`text-sm font-semibold`}>{title}</Text>
              <Text>{travelTimeInformation?.duration.text} Travel Time</Text>
            </View>
            <Text style={tw`text-sm mr-5`}>
              {new Intl.NumberFormat("en-AU", {              
                style: "currency",
                currency: "AUD",
              }).format(
                (travelTimeInformation?.duration.value *
                  SURGE_CHARGE_RATE *
                  multiplier) /
                  100
              )}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />

      <View style={tw`mt-auto border-t border-gray-200`}>
        <TouchableOpacity
          disabled={!selected}
          style={tw`bg-black py-3 m-3 ${!selected && "bg-gray-300"}`}
          onPress = { () => navigation.navigate('JobDispatchScreen', {uri: route.params.uri})}
        >
          <Text style={tw`text-center text-white text-xl`}>
            Choose {selected?.title}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RideOptionsCard;
