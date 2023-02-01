import React, { useEffect, useState } from "react";
import {
  Alert,
  View,
  ScrollView,
  Text,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  StyleSheet,
  Button,
  Platform,
  Linking
} from "react-native";
import tw from "twrnc";
import {
  selectLoading,
  setDestination,
  setOrigin,
  selectdispatchedjobdetail,
  //selectCurrentLocation,
} from "../../../slices/navSlice";
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";
import { useTheme } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
//const GOOGLE_MAPS_APIKEY = "AIzaSyCfacCZ8-nf1bwKN96-6u0KUCFre34dm9A";
const screen = Dimensions.get('window');

export default function JobonScreen({ route }) {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { driver } = useSelector((state) => state.driver);
  const dispatchedjobdetail = useSelector(selectdispatchedjobdetail);
  // const loading = useSelector(selectLoading);
  const { currentLocation } = useSelector((state) => state.cab);
  const [meter, setmeter] = useState('Meter');
  const [arrive, setarrive] = useState('Arrive');
  // const [stc, setstc] = useState('STC');
  // const [caravail, setcaravail] = useState([]);
  const URL = 'http://192.168.43.36:4000';
  console.log('dispatched job detail', dispatchedjobdetail);

  return (
    <View>
      {currentLocation ?
        <View style={tw`p-0`}>
          <ScrollView style={tw`h-1/2 pl-2 pr-2`}>
            <View style={[styles.action, tw` flex-row justify-between`]}>
              <Text style={[styles.textInput, { color: colors.text, },]}>A/C Type:</Text>
              <TextInput
                style={[styles.textInput, { color: colors.text, },]}
                value={dispatchedjobdetail.accounttype}
              />
            </View>
            <View style={[styles.action, tw` flex-row justify-between`]}>
              <Text style={[styles.textInput, { color: colors.text, },]}>A/C Name:</Text>
              <TextInput
                style={[styles.textInput, { color: colors.text, },]}
                value={dispatchedjobdetail.accountname}
              />
            </View>
            {arrive === 'Arrive' && (
              <View style={[tw` flex-row justify-between`]}>
                <View style={{ width: screen.width, backgroundColor: '#444444' }}>
                  <Button onPress={() => {
                    dispatch(
                      setOrigin({
                        location: {
                          lat: currentLocation.location.latitude,
                          lng: currentLocation.location.longitude
                        },
                        description: currentLocation.description.streetnumber + ' ' + currentLocation.description.street + ' ' + currentLocation.description.city + ' ' + currentLocation.description.postalcode,
                      })
                    );
                    dispatch(
                      setDestination({
                        location: dispatchedjobdetail.pickupaddress.location,
                        description: dispatchedjobdetail.pickupaddress.description,
                      })
                    );
                    navigation.navigate("Map", { arrival: arrive });
                  }}
                    title='Navigation' color='wheat' />
                </View>
              </View>
            )}
            {arrive === 'Arrived' && (
              <View style={[tw` flex-row justify-between`]}>
                <View style={{ width: screen.width, backgroundColor: '#444444' }}>
                  <Button onPress={() => {
                    dispatch(
                      setOrigin({
                        location: {
                          lat: currentLocation.location.latitude,
                          lng: currentLocation.location.longitude
                        },
                        description: currentLocation.description.streetnumber + ' ' + currentLocation.description.street + ' ' + currentLocation.description.city + ' ' + currentLocation.description.postalcode,
                      })
                    );
                    dispatch(
                      setDestination({
                        location: {
                          lat: currentLocation.location.latitude,
                          lng: currentLocation.location.longitude
                        },
                        description: currentLocation.description.streetnumber + ' ' + currentLocation.description.street + ' ' + currentLocation.description.city + ' ' + currentLocation.description.postalcode,
                      })
                    );
                    navigation.navigate("Map", { arrival: arrive });
                  }}
                    title='Navigation' color='wheat' />
                </View>
              </View>
            )}
            {arrive === '' && (
              <View style={[tw` flex-row justify-between`]}>
                <View style={{ width: screen.width, backgroundColor: '#444444' }}>
                  <Button onPress={() => {
                    dispatch(
                      setOrigin({
                        location: {
                          lat: currentLocation.location.latitude,
                          lng: currentLocation.location.longitude
                        },
                        description: currentLocation.description.streetnumber + ' ' + currentLocation.description.street + ' ' + currentLocation.description.city + ' ' + currentLocation.description.postalcode,
                      })
                    );
                    dispatch(
                      setDestination({
                        location: dispatchedjobdetail.dropoffaddress.location,
                        description: dispatchedjobdetail.dropoffaddress.description,
                      })
                    );
                    navigation.navigate("Map", { arrival: arrive });
                  }}
                    title='Navigation' color='wheat' />
                </View>
              </View>
            )}
            <View style={[tw` flex-row justify-between`]}>
              <Text style={[styles.textInput, { color: colors.text, },]}>Name:</Text>
              <TextInput
                style={[styles.textInput, { color: colors.text, },]}
                value={dispatchedjobdetail.name}
                disabled={true}
              />
            </View>
            {arrive === 'Arrive' && (
              <View>
                <View style={[tw` flex-row justify-between`]}>
                  <Text style={[styles.textInput, { color: colors.text, },]}>Booking-Time:</Text>
                  <TextInput
                    style={[styles.textInput, { color: colors.text, },]}
                    value={dispatchedjobdetail.bookingtime}
                  />
                </View>
                <View style={[tw` flex-row justify-between`]}>
                  <Text style={[styles.textInput, { color: colors.text, },]}>From:</Text>
                  <TextInput
                    style={[styles.textInput, { color: colors.text, },]}
                    value={dispatchedjobdetail.pickupaddress.description}
                  />
                </View>
                <View style={[tw` flex-row justify-between`]}>
                  <Text style={[styles.textInput, { color: colors.text, },]}>To:</Text>
                  <TextInput
                    style={[styles.textInput, { color: colors.text, },]}
                    value={dispatchedjobdetail.dropoffaddress.description}
                  />
                </View>
              </View>
            )}
            {arrive === 'Arrived' && (
              <View style={[tw` flex-row justify-between`]}>
                <Text style={[styles.textInput, { color: colors.text, },]}>From:</Text>
                <TextInput
                  style={[styles.textInput, { color: colors.text, },]}
                  value={dispatchedjobdetail.pickupaddress.description}
                />
              </View>
            )}
            {arrive === '' && (
              <View style={[tw` flex-row justify-between`]}>
                <Text style={[styles.textInput, { color: colors.text, },]}>To:</Text>
                <TextInput
                  style={[styles.textInput, { color: colors.text, },]}
                  value={dispatchedjobdetail.dropoffaddress.description}
                />
              </View>
            )}
            <View style={[styles.action, tw` flex-row justify-between`]}>
              <Text style={[styles.textInput, { color: colors.text, },]}>V-Type:</Text>
              <TextInput
                style={[styles.textInput, { color: colors.text, },]}
                value={dispatchedjobdetail.vt}
              />
            </View>
          </ScrollView>


          <View style={tw`flex-row`}>
            <View style={{ width: screen.width / 3, backgroundColor: '#555555' }}>
              <Button onPress={() => {
                Alert.alert(
                  "Info",
                  `${dispatchedjobdetail.info}`,
                  [
                    {
                      text: "OK",
                      onPress: () => { }
                    }
                  ]
                )
              }} title='Info' color='wheat' />
            </View>
            <View style={{ width: screen.width / 3, backgroundColor: '#444444' }}>
              <Button
                onPress={() => { navigation.navigate("ZoneScreen", { title: 'Zones' }); }}
                title='Zones'
                color='wheat'
              />
            </View>
            <View style={{ width: screen.width / 3, backgroundColor: '#555555' }}>
              {meter != "Hired" && meter != "Paused" && arrive != "Arrived" ?
                <Button onPress={async () => {
                  Alert.alert(
                    "Your passenger has been informed that you are here.",
                    "",
                    [
                      {
                        text: "OK", onPress: () => {
                          // console.log("OK Pressed");
                          setarrive('Arrived');
                          setmeter('Vacant')
                        }
                      }
                    ]
                  );
                  let jobstatus = "Arrived";
                  let time = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });
                  let rego = driver.cab.rego;
                  // let jobId = route.params.jobId;        
                  // dispatch(jobstatus(jobstatus, time, jobId))        
                  await axios.put(`${URL}/Job/jobStatus?id=${route.params.jobId}`,
                    { jobstatus, time, rego }
                  )
                }} title={arrive} color='wheat' />
                :
                <Button onPress={async () => { }} title={arrive} color='wheat' />
              }
            </View>
          </View>
          {arrive != "Arrived" ?
            <View style={{ width: screen.width / 3, backgroundColor: '#555555', alignSelf: "center" }}>
              <Button onPress={async () => {
                let jobstatus = 'Recalled';
                let time = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });
                let rego = driver.cab.rego;
                let jobrecalledby = {
                  rego: driver.cab.rego,
                  time: time,
                  driverId: driver.driver.driverid
                }
                await axios.put(`${URL}/Job/jobStatus?id=${route.params.jobId}`,
                  { jobstatus, jobrecalledby, rego }
                )
                navigation.navigate("Home", { title: '' });
              }}
                title='Recall' color='wheat' />
            </View>
            : null}


          {arrive === 'Arrived' && meter != "Hired" && meter != "Paused" ?
            <View style={tw`flex-row`}>
              <View style={{ width: screen.width / 2, backgroundColor: '#444444' }}>
                <Button
                  onPress={() => { }}
                  title='No show'
                  color='wheat'>
                </Button>
              </View>
              <View style={{ width: screen.width / 2, backgroundColor: '#555555' }}>
                <Button onPress={async () => {
                  setmeter('Hired');
                  let jobstatus = "Picked-Up"
                  let time = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });
                  let rego = driver.cab.rego;
                  // let jobId = route.params.jobId;        
                  // dispatch(jobstatus(jobstatus, time, jobId))        
                  await axios.put(`${URL}/Job/jobStatus?id=${route.params.jobId}`,
                    { jobstatus, time, rego }
                  )
                }}
                  title='Meter On' color='wheat' />
              </View>
            </View>
            : null
          }


          <View style={tw`flex-row`}>
            {meter === "Hired" || meter === "Paused" ?
              <View style={{ width: screen.width / 3, backgroundColor: '#444444' }}>
                <Button onPress={async () => {
                  let jobstatus = "Dropped-Off";
                  navigation.navigate('FareScreen', { jobId: route.params.jobId });
                  let time = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });
                  let rego = driver.cab.rego;
                  // let jobId = route.params.jobId;        
                  // dispatch(jobstatus(jobstatus, time, jobId))        
                  await axios.put(`${URL}/Job/jobStatus?id=${route.params.jobId}`,
                    { jobstatus, time, rego }
                  )
                }}
                  title='Meter Off' color='wheat' />
              </View>
              : null
            }
            {meter === "Hired" ?
              <View style={{ width: screen.width / 3, backgroundColor: '#555555' }}>
                <Button onPress={() => {
                  setmeter('Paused');
                }}
                  title='Meter Pause' color='wheat' />
              </View>
              : null}
            {meter === "Paused" ?
              <View style={{ width: screen.width / 3, backgroundColor: '#555555' }}>
                <Button onPress={() => {
                  setmeter('Hired');
                }}
                  title='Meter Start' color='wheat' />
              </View>
              : null}
          </View>

          <View style={tw`h-1/2 bg-black items-center`}>
            <Text style={[styles.textInput, { color: colors.text, fontSize: 65 }]}>{meter}</Text>
          </View>
        </View>
        :
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      }
    </View >
  )
}
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