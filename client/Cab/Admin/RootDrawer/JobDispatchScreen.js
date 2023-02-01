
import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import tw from "twrnc";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import {
  setdispatchedjobdetail,
  setCurrentLocation,
  setDestination,
  setOrigin,
  setLoading,
  selectdispatchedjobdetail,
  selectLoading,
  selectOrigin,
  selectDestination,
  selectCurrentLocation
} from "../../slices/navSlice";
import { useSelector, useDispatch } from "react-redux";
import MapView, { Marker, AnimatedRegion } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import NavOptions from "../../components/RideandMap/NavOptions";
import { AuthContext } from '../../components/context';
import MapScreen from '../RideandMap/screens/MapScreen'
GOOGLE_MAPS_APIKEY = "AIzaSyCfacCZ8-nf1bwKN96-6u0KUCFre34dm9A";
import * as Location from 'expo-location';
import axios from 'axios';
import { useTheme } from 'react-native-paper';
const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const JobDispatchScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { colors } = useTheme();
  const { user } = React.useContext(AuthContext);
  const dispatchedjobdetail = useSelector(selectdispatchedjobdetail);
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const currentLocation = useSelector(selectCurrentLocation);
  const loading = useSelector(selectLoading);
  console.log('====....', user._id);

  const [accounttype, setaccounttype] = useState('');
  const [accountname, setaccountname] = useState('');
  const [name, setname] = useState('');
  const [pickuptime, setpickuptime] = useState('');
  const [dropofftime, setdropofftime] = useState('');
  const [pickupaddress, setpickupaddress] = useState({});
  const [dropoffaddress, setdropoffaddress] = useState({});
  const [vt, setvt] = useState('');
  const [phone, setphone] = useState('');
  const [info, setinfo] = useState('');
  const [neworder, setneworder] = useState('New order');

  const Dispatchjobdetail = async () => {
   // console.log('====....', pickupaddress);
    let jobdetail = {
      cabid: user._id,
      accountname: accountname,
      accounttype: accounttype,
      name: name,
      pickuptime: pickuptime,
      dropofftime: dropofftime,
      pickupaddress: pickupaddress,
      dropoffaddress: dropoffaddress,
      vt: vt,
      phone: phone,
      info: info,
      jobstatus: 'New order',
    };
    let formBody = [];
    for (let key in jobdetail) {
      let encodedKey = encodeURIComponent(key);
      let encodedValue = encodeURIComponent(jobdetail[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');
    //await axios.post(`https://apponpress.herokuapp.com/appAuth/jobdetail`,
    await axios.post(`http://192.168.43.36:4000/appAuth/jobdetail`,
      { jobdetail }
    ).then((response) => {
      console.log(response.data, 'response of post user jobdetail in jobdispatch screen');
    }).catch((err) => { console.log(err) })
  }

  useEffect(() => {
    dispatch(setLoading(true));
    if (currentLocation != null && origin == null) {
      dispatch(
        setOrigin({
          location: currentLocation.location,
          description: currentLocation.description,
        })
      );
      dispatch(setLoading(false));
    } else {
      dispatch(setLoading(false));
    }
  }, [currentLocation, origin]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (

    <SafeAreaView style={tw`h-full`}>
      <KeyboardAvoidingView
        enabled
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
         <GooglePlacesAutocomplete
          placeholder="Pick up address"
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
          // textInputProps={{
          //   onChangeText: (text) => setoriginText(text)
          // }}
          onPress={(data, details = null) => {
            dispatch(
              setOrigin({
                location: details.geometry.location,
                description: data.description,
              })
            );
            setpickupaddress({
              location: details.geometry.location,
              description: data.description,
            });
          }}
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: "en",
          }}
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={400}
        />
        <GooglePlacesAutocomplete
          placeholder="Drop off address"
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
            setdropoffaddress({
              location: details.geometry.location,
              description: data.description,
            })
          }}
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: "en",
          }}
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={400}
        />
        <ScrollView>
          <View style={tw` flex-row justify-between`}>
            <Text style={[styles.textInput, { color: colors.text, },]}>A/c Type:</Text>
            <TextInput
              style={[styles.action, { color: colors.text, },]}
              value={accounttype}
              onChangeText={(text) => setaccounttype(text)}
            />
          </View>
          <View style={tw` flex-row justify-between`}>
            <Text style={[styles.textInput, { color: colors.text, },]}>A/C Name:</Text>
            <TextInput
              style={[styles.action, { color: colors.text, },]}
              value={accountname}
              onChangeText={(text) => setaccountname(text)}
            />
          </View>
          <View style={[tw` flex-row justify-between`]}>
            <Text style={[styles.textInput, { color: colors.text, },]}>Pickup-Time:</Text>
            <TextInput
              style={[styles.action, { color: colors.text, },]}
              value={pickuptime}
              onChangeText={(text) => setpickuptime(text)}
            />
          </View>
          <View style={[tw` flex-row justify-between`]}>
            <Text style={[styles.textInput, { color: colors.text, },]}>Name:</Text>
            <TextInput
              style={[styles.action, { color: colors.text, },]}
              value={name}
              onChangeText={(text) => setname(text)}
            />
          </View>
        {/* </ScrollView> */}
       
        {/* <ScrollView> */}
          <View style={[tw` flex-row justify-between`]}>
            <Text style={[styles.textInput, { color: colors.text, },]}>V-Type:</Text>
            <TextInput
              style={[styles.action, { color: colors.text, },]}
              value={vt}
              onChangeText={(text) => setvt(text)}
            />
          </View>
          <View style={[tw` flex-row justify-between`]}>
            <Text style={[styles.textInput, { color: colors.text, },]}>info:</Text>
            <TextInput
              style={[styles.action, { color: colors.text, },]}
              value={info}
              onChangeText={(text) => setinfo(text)}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <TouchableOpacity
        onPress={() => {
          //onPress={Dispatchjobdetail}
          Dispatchjobdetail();
          navigation.navigate("Home")
        }}
        style={[
          tw`bg-gray-100 absolute top-115 right-30 z-50 p-3 rounded-full shadow-lg`,
        ]}
      >
        <Text>Disptach</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default JobDispatchScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  action: {
    flexDirection: 'row',
    marginTop: 25,
    marginBottom: -10,
    width: '50%',
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
  },
  textInput: {
    marginTop: Platform.OS === 'ios' ? 30 : 20,
    paddingLeft: 10,
    paddingRight: 20,
    color: '#05375a',
  },
});
