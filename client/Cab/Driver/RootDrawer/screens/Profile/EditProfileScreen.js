import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import * as ImagePicker from 'expo-image-picker';
import { AuthContext } from '../../../../components/context';
//import { useAlert } from "react-alert";
import { useSelector } from 'react-redux';

const EditProfileScreen = ({ navigation }) => {

  const { driver } = useSelector((state) => state.driver);
  const { clearErrors, error, updateImage, isUpdated, updateProfile,
    getUserAfterUpdate } = React.useContext(AuthContext);
  console.log('editprofile=====', driver.driver.image);
  // const alert = useAlert();
  const { colors } = useTheme();
  const [email, setEmail] = useState('');
  const [image, setImage] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');

  const takePhotoFromCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }
    const imageSelected = await ImagePicker.launchCameraAsync({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7
    });
    console.log("imageSelected in editprofilescreen===", imageSelected);
    if (!imageSelected.cancelled) {
      setImage(imageSelected);
      bs.current.snapTo(1);
    }
  }

  const choosePhotoFromLibrary = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your photos!");
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log("imageSelected in editprofilescreen===", result);
    if (!result.canceled) {
      let uri = result.uri //.replace('file://', '');
      const type = result.type;
      const name = new Date().toISOString();
      const source = {
        uri,
        type,
        name,
      }
      // if(!source){
      //   setImage(user.image)
      // } else {
      // setImage(source.uri)
      // }

      const data = new FormData()
      data.append('file', source.uri);
      data.append('upload_preset', 'lzjlnpox');
      data.append("cloud_name", "dedqid79f");
      data.append('email', driver.driver.email);
      let formBody = [];
      for (let key in data) {
        let encodedKey = encodeURIComponent(key);
        let encodedValue = encodeURIComponent(data[key]);
        formBody.push(encodedKey + '=' + encodedValue);
      }
      formBody = formBody.join('&');
     // updateImage(formBody);
      // fetch('http://192.168.43.36:4000/appAuth/profileImage', {
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //   },
      //   method: "post",
      //   body: data,
      // }).then(res => res.json()).
      //   then(res => {
      //     if (res.status === ok) {
      //       setImage(res.image);
      //     }
      //   }).catch(err => {
      //     Alert.alert("An Error Occured While Uploading")
      //   })
      bs.current.snapTo(1);
    }
  };

  const SubmitProfile = () => {
    let dataToSend = { email: email, firstName: firstName, lastName: lastName, phone: phone, country: country, city: city };
    let formBody = [];
    for (let key in dataToSend) {
      let encodedKey = encodeURIComponent(key);
      let encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');
    // dispatch(updateProfile(formBody));
    updateProfile(formBody);
  }

  useEffect(() => {
    // console.log('isupdated', isUpdated);
    if (driver) {
      setEmail(driver.driver.driverid);
      setImage(driver.driver.image);
      setFirstName(driver.driver.firstname);
      setLastName(driver.driver.lastname);
      setPhone(driver.driver.phone);
      setCity(driver.driver.address.city);
      setCountry(driver.driver.address.country);
    }
    if (error) {
      //alert.error(error);
      Alert.alert(error);
      clearErrors();
    }
    if (isUpdated) {
      Alert.alert("Profile Updated Successfully",
        "",
        [
          {
            text: "OK", onPress: () => { navigation.navigate("ProfileScreen"); }
          }
        ]);
      let id = user._id;
      getUserAfterUpdate(id);
    }
  }, [alert, isUpdated]);

  renderInner = () => (
    <View style={styles.panel}>
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.panelTitle}>Upload Photo</Text>
        <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
      </View>
      <TouchableOpacity style={styles.panelButton} onPress={takePhotoFromCamera}>
        <Text style={styles.panelButtonTitle}>Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.panelButton} onPress={choosePhotoFromLibrary}>
        <Text style={styles.panelButtonTitle}>Choose From Library</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => bs.current.snapTo(1)}>
        <Text style={styles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );

  renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );

  bs = React.createRef();
  fall = new Animated.Value(1);

  return (
    <View style={styles.container}>

      <BottomSheet
        ref={bs}
        snapPoints={[330, 0]}
        renderContent={renderInner}
        renderHeader={renderHeader}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
       // enabledContentGestureInteraction={false}
      />

      <View style={{ alignItems: 'center' }}>
        <TouchableOpacity onPress={() => bs.current.snapTo(0)}>
          <View
            style={{
              height: 100,
              width: 100,
              borderRadius: 15,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ImageBackground
              source={{
                uri: driver.driver.image,
              }}
              style={{ height: 100, width: 100 }}
              imageStyle={{ borderRadius: 15 }}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon
                  name="camera"
                  size={35}
                  color="#fff"
                  style={{
                    opacity: 0.7,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 1,
                    borderColor: '#fff',
                    borderRadius: 10,
                  }}
                />
              </View>
            </ImageBackground>
          </View>
        </TouchableOpacity>
        <Text style={{ marginTop: 0, fontSize: 18, fontWeight: 'bold', color: '#fff', }}>
          {driver.driver.firstname} {driver.driver.lastname}
        </Text>
      </View>

      <Animated.View style={{
        margin: 20,
        opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
      }}>
        <ScrollView>
          <View style={styles.action}>
            <FontAwesome name="user-o" color={colors.text} size={20} />
            <TextInput
              placeholder="First Name"
              placeholderTextColor="#666666"
              autoCorrect={false}
              value={firstName}
              style={[
                styles.textInput,
                {
                  color: colors.text,
                },
              ]}
              onChangeText={(name) => setFirstName(name)}
            />
            {/* {user.firstName}</TextInput> */}
          </View>
          <View style={styles.action}>
            <FontAwesome name="user-o" color={colors.text} size={20} />
            <TextInput
              placeholder="Last Name"
              placeholderTextColor="#666666"
              autoCorrect={false}
              value={lastName}
              style={[
                styles.textInput,
                {
                  color: colors.text,
                },
              ]}
              onChangeText={(name) => setLastName(name)}
            />
            {/* {user.lastName}</TextInput> */}
          </View>
          <View style={styles.action}>
            <Feather name="phone" color={colors.text} size={20} />
            <TextInput
              placeholder="Phone"
              placeholderTextColor="#666666"
              keyboardType="number-pad"
              autoCorrect={false}
              value={phone}
              style={[
                styles.textInput,
                {
                  color: colors.text,
                },
              ]}
              onChangeText={(phone) => setPhone(phone)}
            />
            {/* {user.userPhone}</TextInput> */}
          </View>
          <View style={styles.action}>
            <FontAwesome name="envelope-o" color={colors.text} size={20} />
            <TextInput
              placeholder="Email"
              placeholderTextColor="#666666"
              keyboardType="email-address"
              autoCorrect={false}
              value={email}
              style={[
                styles.textInput,
                {
                  color: colors.text,
                },
              ]}
            />
            {/* {email}</TextInput> */}
          </View>
          <View style={styles.action}>
            <FontAwesome name="globe" color={colors.text} size={20} />
            <TextInput
              placeholder="Country"
              placeholderTextColor="#666666"
              autoCorrect={false}
              value={country}
              style={[
                styles.textInput,
                {
                  color: colors.text,
                },
              ]}
              onChangeText={(country) => setCountry(country)}
            />
            {/* {user.userCountry}</TextInput> */}
          </View>
          <View style={styles.action}>
            <Icon name="map-marker-outline" color={colors.text} size={20} />
            <TextInput
              placeholder="City"
              placeholderTextColor="#666666"
              autoCorrect={false}
              value={city}
              style={[
                styles.textInput,
                {
                  color: colors.text,
                },
              ]}
              onChangeText={(city) => setCity(city)}
            />
            {/* {user.userCity}</TextInput> */}
          </View>
          <TouchableOpacity style={styles.commandButton} onPress={SubmitProfile}>
            <Text style={styles.panelButtonTitle}>Submit</Text>
          </TouchableOpacity>
        </ScrollView>
      </Animated.View>
    </View>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginTop: 10
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
});




