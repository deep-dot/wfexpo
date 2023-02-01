import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  SafeAreaView,
  Text,
  Alert,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Button,
  Platform,
  LogBox,
  Linking
} from "react-native";
LogBox.ignoreLogs([
  'Non-serializable',
  'SerializableStateInvariantMiddleware',
  'ImmutableStateInvariantMiddleware',
]);
import tw from "twrnc";
import {
  setDestination,
  setOrigin,
  setCabs,
} from "../../slices/navSlice";
import { useSelector, useDispatch } from "react-redux";
import { useTheme } from 'react-native-paper';
//import { Icon } from "react-native-elements/dist/icons/Icon";
import { useNavigation } from "@react-navigation/native";
//const GOOGLE_MAPS_APIKEY = "AIzaSyCfacCZ8-nf1bwKN96-6u0KUCFre34dm9A";
const screen = Dimensions.get('window');
import Blink from '../../components/Blink';
import BlueScreenJob from "./DoingJob/BlueScreenJob";
import { _retrieveData, _storeData, _removeData, _clearData } from '../../../components/_Asyncstorage';
import { postCabLocation } from '../../actions/cabAction';
import axios from "axios";
import Constants from 'expo-constants';
import * as SMS from 'expo-sms';
const url = Constants.expoConfig.extra.env;

const HomeScreen = () => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { driver } = useSelector((state) => state.driver);
  const [carsinarea, setCarsinArea] = useState([]);
  const {  currentLocation, isLoading } = useSelector((state) => state.cab);
  const [ isSmsAvailable, setIsSmsAvailable] = useState(false);

  const [state, setState] = useState({
    jobmsg: false,
    jobdetail: {},
    topCar: null,
  });

  useEffect(() => {
    const smsAvailbale = (async() => {
      let isAvailable = await SMS.isAvailableAsync();
      setIsSmsAvailable(isAvailable);
    });    
    smsAvailbale();
  },[]);

  const sendSms = async() => {
    if(isSmsAvailable){
    const { result } = await SMS.sendSMSAsync(
      ['+61452627846'],
      'Hi friends!'
    );
    console.log('sms rsult in home screen==',result);
    } else {
      alert("SMS is not available")
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(postCabLocation(driver.cab.rego));
    }, 1000 * 8);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    getallcabs();
  }, [currentLocation]);

  const getallcabs = useCallback(async () => {
    try {
      const response = await axios.get(url + '/Cab/getAllCabs');
      if (response.data.success) {
        let cars = [], cabs = response.data.cabs  
        dispatch(setCabs(cabs));      
        cars = cabs.filter(car => car.description.city === currentLocation.description.city);
        console.log('cabs===', cars.length, currentLocation.description.city,);
        if (cars?.length > 1) {
          cars.sort(function (x, y) {
            let time1 = new Date(x.description.date);
            let time2 = new Date(y.description.date);
            return time1.getTime() < time2.getTime() ? -1 : time1.getTime() > time2.getTime() ? 1 : 0;
          });
          setCarsinArea(cars);
          Bluescreenjob(cars[0]);
          // setState({
          //   ...state,
          //   topCar: cars[0]
          // });
        } else {
          Bluescreenjob(cars[0]);
          setCarsinArea(cars);
        }                
      }
    } catch (e) {
      console.log(' getallcabs error====', e.message);
    }
  }, [currentLocation]);

  const Bluescreenjob = useCallback(async (topCar) => {     
    try {     
      const response = await axios.get( url + `/Job/getjobsneedtobedone`);
      if(response.data.status === 'ok'){
        let jobs = response.data.jobs;
       // console.log('Bluescreenjob', jobs.length);
      let jobsneedtobedone = jobs.filter(job => {
        let a = job.pickupaddress.description.length,
           b = currentLocation.description.city.length,
          diff = a - b;
        console.log('home screen jobs', diff, a, b);
        return a === (b + diff)
      });
      console.log('currenttime=',  jobsneedtobedone.length);
      if (topCar.rego === driver.cab.rego ) {
        // jobDispatched(jobsneedtobedone[0]);            
        setState({
          ...state,
          jobdetail: jobsneedtobedone[0],
          jobmsg: true,
        });        
      }
    }    
    } catch (e) {
       console.log('Bluescreenjob error====', e.message);
    }
  }, [currentLocation]);

  const callback = (data) => {
    //console.log('callback in home screen==', data);
    setState({ 
      ...state,
      jobmsg: data
    });
  }

 // console.log('Location.city, carsinarea.length in home screen==', state.jobmsg, driver.cab.rego);

  return (
    <SafeAreaView style={styles.container}>
      {
         state.jobmsg ?
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <BlueScreenJob 
            label="Goldcare job" 
            jobdetail={state.jobdetail} 
            callback = {callback}
            />
          </View>
          :
          isLoading ?
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator size="large" color="#00ff00" />
            </View>
            :
            <View style={tw`pt-10`}>
              {carsinarea.map((car, index) => {
               // console.log('render ', driver.cab.rego, carsinarea.length);
               // if (car.rego === driver.cab.rego) {
                  return (
                    <View key={index}>
                      <TouchableOpacity
                        style={tw`bg-opacity-600`}
                        onPress={() => { navigation.navigate('AreaStatusScreen', { title: currentLocation.description.city }) }}
                      >
                        <View style={[styles.action, tw`flex-row justify-between`]}>
                          <Text style={[styles.textInput, { color: colors.text, },]}>
                            {currentLocation.description.city}</Text>
                          <Text style={[styles.textInput, { color: colors.text, },]}>
                            {index + 1} of {carsinarea.length}  {'>'}</Text>
                        </View>
                      </TouchableOpacity>

                      <View style={{ marginTop: Platform.OS === 'ios' ? screen.height / 2.8 : screen.height / 2.3 }}>
                        {
                          car?.availability === 'Avail' ?
                            <View style={tw`flex-row`}>
                              <View style={{ width: screen.width / 2, backgroundColor: 'green' }}>
                                <Button
                                  onPress={() => { }}
                                  title='Avail'
                                  color={Platform.OS === 'ios' ? 'wheat' : 'green'}
                                />
                              </View>
                              <View style={{ width: screen.width / 2, backgroundColor: '#444444' }}>
                                <Blink duration={1000}>
                                  <Button
                                    // style={{backgroundColor: '#444444' }}
                                    onPress={() => { navigation.navigate("CoverScreen", { title: '' }); }}
                                    title='Cover'
                                    color={Platform.OS === 'ios' ? 'wheat' : ''}
                                  />
                                </Blink>
                              </View>
                            </View>
                            :
                            <View style={tw`flex-row`}>
                              <View style={{ width: screen.width / 2, backgroundColor: 'red' }}>
                                <Button
                                  onPress={() => { }}
                                  title='Penalty'
                                  color={Platform.OS === 'ios' ? 'wheat' : 'red'}
                                />
                              </View>
                              <View style={{ width: screen.width / 2, backgroundColor: '#444444' }}>
                                <Button onPress={() => { }}
                                  title='Cover'
                                  color={Platform.OS === 'ios' ? 'wheat' : '#444444'}
                                />
                              </View>
                            </View>
                        }
                      </View>
                    </View>
                  );
              //  }
              })}



              <View style={tw`flex-row mt-5`}>
                <View style={{ width: screen.width / 2, backgroundColor: '#444444' }}>
                  <Button onPress={() => { 
                    sendSms();                    
                    //navigation.navigate("CoverScreen", { title: '' }); 
                  }}
                    title='Base'
                    color={Platform.OS === 'ios' ? 'wheat' : '#444444'}
                  />
                </View>
                <View style={{ width: screen.width / 2, backgroundColor: '#555555' }}>
                  <Button onPress={() => {
                    navigation.navigate("ZoneScreen", { title: 'Zones' });
                  }}
                    title='Zone'
                    color={Platform.OS === 'ios' ? 'wheat' : '#555555'}
                  />
                </View>
              </View>

              <View style={tw`flex-row mt-5`}>
                <View style={{ width: screen.width, backgroundColor: '#555555' }}>
                  <Button onPress={async () => {
                    dispatch(
                      setOrigin({
                        location: {
                          lat: currentLocation.location.latitude,
                          lng: currentLocation.location.longitude
                        },
                        description: currentLocation.description.streetnumber + ' ' + currentLocation.description.street + ' ' + currentLocation.description.city + ' ' + currentLocation.description.postalcode,
                      }),
                      setDestination({
                        location: {
                          lat: currentLocation.location.latitude,
                          lng: currentLocation.location.longitude
                        },
                        description: currentLocation.description.streetnumber + ' ' + currentLocation.description.street + ' ' + currentLocation.description.city + ' ' + currentLocation.description.postalcode,
                      })
                    );
                    navigation.navigate("MapScreen");
                  }}
                    title='Map'
                    color={Platform.OS === 'ios' ? 'wheat' : '#555555'}
                  />
                </View>
              </View>
            </View>
      }
    </SafeAreaView >
  );
};

export default HomeScreen;

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


//nearby places algo

// import React, { useState, useEffect } from 'react';
// import { View, Text, ActivityIndicator } from 'react-native';
// import * as Location from 'expo-location';
// const GOOGLE_MAPS_APIKEY = "AIzaSyCfacCZ8-nf1bwKN96-6u0KUCFre34dm9A";

// const HomeScreen = () => {
//   const [places, setPlaces] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     // Get the current location
//     const fetchLocation = (async () => {
//       let position = await Location.getCurrentPositionAsync({});
//       // Use the location to search for nearby places
//       const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${position.coords.latitude},${position.coords.longitude}&radius=5000&key=${GOOGLE_MAPS_APIKEY}`;
//       setIsLoading(true);
//       fetch(url)
//         .then((response) => response.json())
//         .then((data) => {
//           setPlaces(data.results);
//           setIsLoading(false);
//         })
//         .catch((error) => {
//           console.log(error);
//           setIsLoading(false);
//         });
//     }
//     //   (error) => console.log(error),
//     //     { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
//      )
//      fetchLocation();
//   }, []);

// if (isLoading) {
//   return <ActivityIndicator size="large" />;
// }

// return (
//   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//     {places.map((place, index) => (
//       <Text style={{color: 'white'}} key={index}>{place.name}</Text>
//     ))}
//   </View>
// );
// };

// export default HomeScreen;
