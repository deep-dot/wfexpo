import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Icon } from "react-native-elements";
import tw from "twrnc";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import NavFavourites from "./NavFavourites";
import { setDestination, selectDestination } from "../../../../slices/navSlice";
// import { GOOGLE_MAPS_APIKEY } from "@env";
const GOOGLE_MAPS_APIKEY = "AIzaSyCfacCZ8-nf1bwKN96-6u0KUCFre34dm9A";

const NavigateCard = ({route}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  //const destination = useSelector(selectDestination);
  const [selected, setSelected] = useState(true);
  //console.log('select destination in navigate card===', destination)

   console.log('in navigate card===',route.params.uri);
  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <View style={tw`border-t border-gray-200 flex-shrink`}>
        <GooglePlacesAutocomplete
          placeholder="Where to?"
          styles={toInputBoxStyles}
          fetchDetails={true}
          enablePoweredByContainer={false}
          returnKeyType={"search"}
          minLength={2}
          onPress={(data, details = null) => {
            dispatch(
              setDestination({
                location: details.geometry.location,
                description: data.description,
              })
            );
            setSelected(!selected);
            // navigation.navigate("RideOptionsCard");
          }}
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: "en",
          }}
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={400}
        />
        <NavFavourites selected={() => setSelected(!selected)} />
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("RideOptionsCard", { uri: route.params.uri })}
        style={tw`self-center`}
        disabled={selected}
      >
        <Icon style={tw`p-2 m-2 bg-black ${selected && 'bg-gray-200'} rounded-full w-10 `}
          name="car" type="font-awesome" color="white" size={16} />
        <Text style={tw`self-center ${selected && 'text-gray-200'}`} >Ride</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default NavigateCard;

const toInputBoxStyles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingTop: 5,
    flex: 0,
  },
  textInput: {
    backgroundColor: "#DDDDDF",
    borderRadius: 0,
    fontSize: 18,
  },
  textInputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
});
