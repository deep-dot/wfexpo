
import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import tw from "twrnc";
//import { Icon } from "react-native-elements/dist/icons/Icon";
import { LinearGradient } from 'expo-linear-gradient';
import {
  selectDestination,
  setLoading,
  setOrigin,
  selectLoading,
  selectOrigin,
} from "../../../slices/navSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';
import { useTheme } from 'react-native-paper';

const JobDispatchScreen = ({route}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const { user } = useSelector((state) => state.user);
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  //const currentLocation = useSelector(selectCurrentLocation);
  const loading = useSelector(selectLoading);
  // console.log('jobdispatchscreen====', origin, destination, loading, user._id);

  const [accounttype, setaccounttype] = useState('');
  const [accountname, setaccountname] = useState(user.username);
  const [name, setname] = useState(user.username);
  const [bookingtime, setbookingtime] = useState('');
  const [vt, setvt] = useState('');
  const [phone, setphone] = useState('');
  const [info, setinfo] = useState('');

  const Dispatchjobdetail = async () => {
    try{
    let jobdetail = {
      callerid: user._id,
      accountname,
      accounttype,
      name,
      bookingtime,
      pickupaddress: origin,
      dropoffaddress: destination,
      vt,
      info,
      jobstatus: 'New Order',
    };
    console.log('Dispatch screen==', jobdetail)

    if(!jobdetail.accounttype || !jobdetail.bookingtime || !jobdetail.vt || !jobdetail.info) {
      Alert.alert('All fields required');
      return ;
    }
    let formBody = [];
    for (let key in jobdetail) {
      let encodedKey = encodeURIComponent(key);
      let encodedValue = encodeURIComponent(jobdetail[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');
    //await axios.post(`https://apponpress.herokuapp.com/appAuth/jobdetail`,
    await axios.post(`http://192.168.43.36:4000/User/jobCreate`,
      jobdetail
    ).then((response) => {
      if (response.data.status === 'ok') {
        Alert.alert('Job created successfully');
        navigation.navigate("Home")
        dispatch(setOrigin(null));
      }
    }).catch((err) => { console.log(err) });
  } catch (err) {console.log(err.message)}
  }

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (

    <SafeAreaView style={tw`h-full p-5`}>
      <KeyboardAvoidingView
        enabled
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView>
          <View style={tw` flex-row justify-between`}>
            <Text style={[styles.textInput, { color: colors.text, },]}>Pickup address</Text>
            <TextInput
              style={[styles.action, { color: colors.text, },]}
              value={origin?.description}
            />
          </View>
          <View style={tw` flex-row justify-between`}>
            <Text style={[styles.textInput, { color: colors.text, },]}>Dropoff address</Text>
            <TextInput
              style={[styles.action, { color: colors.text, },]}
              value={destination?.description}
            />
          </View>
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
            // onChangeText={(text) => setaccountname(text)}
            />
          </View>
          <View style={[tw` flex-row justify-between`]}>
            <Text style={[styles.textInput, { color: colors.text, },]}>Pickup-Time:</Text>
            <TextInput
              style={[styles.action, { color: colors.text, },]}
              value={bookingtime}
              onChangeText={(text) => setbookingtime(text)}
            />
          </View>
          <View style={[tw` flex-row justify-between`]}>
            <Text style={[styles.textInput, { color: colors.text, },]}>Name:</Text>
            <TextInput
              style={[styles.action, { color: colors.text, },]}
              value={name}
            // onChangeText={(text) => setname(text)}              
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
     
      <View style={styles.button}>
        <TouchableOpacity
          style={styles.signIn}
          onPress={() => {
            //onPress={Dispatchjobdetail}
            Dispatchjobdetail();            
          }}
        >
          <LinearGradient
            colors={['#FFA07A', '#FF6347']}
            style={styles.signIn}
          >
            <Text style={[styles.textSign, {
              color: '#fff'
            }]}>Save</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Map',{uri: route.params.uri})}
          style={[styles.signIn, {
            borderColor: '#FF6347',
            borderWidth: 1,
            marginTop: 15
          }]}
        >
          <Text style={[styles.textSign, {
            color: '#FF6347'
          }]}>Back</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default JobDispatchScreen;
const styles = StyleSheet.create({

  container: {
    flex: 1,
    // backgroundColor: '#FF6347'
  },
  
  action: {
    flexDirection: 'row',
    marginTop: 25,
    marginRight: 10,
    width: '60%',
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
  },
  textInput: {
    marginTop: Platform.OS === 'ios' ? 30 : 20,
    paddingLeft: 10,
    paddingRight: 20,
    color: '#05375a',
  },
  button: {
    alignItems: 'center',
    marginTop: 50
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold'
  },
});
