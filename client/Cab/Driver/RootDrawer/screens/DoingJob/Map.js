import React from "react";
import { TouchableOpacity, View } from "react-native";
import tw from "twrnc";
import { Icon } from "react-native-elements/dist/icons/Icon";
import Map from "../../../components/RideandMap/Map";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
const GOOGLE_MAPS_APIKEY = "AIzaSyCfacCZ8-nf1bwKN96-6u0KUCFre34dm9A";
import {
  setDestination,
  setOrigin,
  selectDestination,
  selectOrigin,
} from "../../../slices/navSlice";

const MapScreen = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
console.log(origin, destination)
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("JobonScreen", { jobId: '', rego: '' });
        }}
        style={[
          tw`bg-gray-100 absolute top-46 left-2 z-50 p-3 rounded-full shadow-lg`,
        ]}
      >
        <Icon name="arrow-left" />
      </TouchableOpacity>

      <View style={tw`h-full`}>
        <GooglePlacesAutocomplete
          placeholder={origin.description}
          styles={
            {
              container: {
                flex: 0,
              },
              textInput: {
                marginTop: Platform.OS === 'ios' ? 20 : 10,
                padding: 10,
                color: '#05375a',
              },
            }
          }
          fetchDetails={true}
          enablePoweredByContainer={false}
          returnKeyType={"search"}
          minLength={2}
          onPress={(data, details = null) => {
            dispatch(
              setOrigin({
                location: details.geometry.location,
                description: data.description,
              })
            );
          }}
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: "en",
          }}
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={400}
        />
        <GooglePlacesAutocomplete
          placeholder={destination.description}
          styles={{
            container: {
              flex: 0,
            },
            textInput: {
              marginTop: Platform.OS === 'ios' ? 20 : 10,
              padding: 10,
              color: '#05375a',
            },
          }}
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
          }}
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: "en",
          }}
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={400}
        />
        <Map />
      </View>
    </View>
  );
};
export default MapScreen;