import React from "react";
import {
  View,
  SafeAreaView,
  //Dimensions,
  ActivityIndicator,
  StyleSheet,
  Platform,
  TouchableOpacity
} from "react-native";
import tw from "twrnc";
//import NavFavourites from "../../../components/RideandMap/NavFavourites";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Icon } from "react-native-elements/dist/icons/Icon";
import {
  selectLoading,
  setDestination,
  setOrigin,
} from "../../../slices/navSlice";
import { useSelector, useDispatch } from "react-redux";
import NavOptions from "./components/NavOptions";
import ExploreScreen from './ExploreScreen';
GOOGLE_MAPS_APIKEY = "AIzaSyCfacCZ8-nf1bwKN96-6u0KUCFre34dm9A";
import { useNavigation } from "@react-navigation/native";

const RideScreen = ({route}) => {
 // const { colors } = useTheme();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const loading = useSelector(selectLoading);

  //console.log(route.params.uri);
  const disable = () => {
  }
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={tw`p-5 h-1/3`}>
        {/* <Image
            style={{ width: 100, height: 100, resizeMode: "contain" }}
            source={{ uri: "https://links.papareact.com/gzs" }}
          /> */}
        
          <GooglePlacesAutocomplete
            placeholder="Your location"
            styles={{
              container: {
                flex: 0,
              },
              textInput: {
                fontSize: 18,
              },
            }}
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
              dispatch(setDestination(null));
            }}
            query={{
              key: GOOGLE_MAPS_APIKEY,
              language: "en",
            }}
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={400}
          />
        
        <NavOptions uri = {route.params.uri}/>             
      </View>
      
      <View style={tw`h-2/3 `}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Home");
        }}
        style={[
          tw`bg-gray-100 absolute top-5 left-2 z-50 p-3 rounded-full shadow-sm`,
        ]}
      >
        <Icon name="arrow-left" />
      </TouchableOpacity>
            <ExploreScreen />
      </View>

    </SafeAreaView >
  );
};

export default RideScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  action: {
    flexDirection: 'row',
    marginTop: 0,
    marginBottom: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  textInput: {
    marginTop: Platform.OS === 'ios' ? 20 : 10,
    paddingLeft: 10,
    paddingRight: 10,
    color: '#05375a',
  },
});
