import React from 'react'
import {
    View,
    TextInput,
    StyleSheet,
    ScrollView,
    LogBox
  } from "react-native";
  import { useTheme } from 'react-native-paper';
  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);

function JobdetailScreen(props) {
    const { colors } = useTheme();  
    //console.log(props.route.params.data)
    const job = props.route.params.data.item.jobdetail;
   // console.log(job)
  return (
    <View style={styles.container}>
    <ScrollView>
        <View style={styles.action}>
          <TextInput
            placeholder="Job#"
            placeholderTextColor="#666666"
            autoCorrect={false}
            value={'Job number:     '+ job._id}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}            
          />
          {/* {user.firstName}</TextInput> */}
        </View>
        <View style={styles.action}>
          <TextInput
            placeholder="Account name"
            placeholderTextColor="#666666"
            autoCorrect={false}
            value={'Account name:          '+job.accountname}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}            
          />
          {/* {user.firstName}</TextInput> */}
        </View>
        <View style={styles.action}>
          {/* <FontAwesome name="user-o" color={colors.text} size={20} /> */}
          <TextInput
            placeholder="Pick up time"
            placeholderTextColor="#666666"
            autoCorrect={false}
            value={'Pickup time:          '+job.pickuptime}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}            
          />
          {/* {user.lastName}</TextInput> */}
        </View>
        <View style={styles.action}>
          {/* <FontAwesome name="user-o" color={colors.text} size={20} /> */}
          <TextInput
            placeholder="Pick up address"
            placeholderTextColor="#666666"
            autoCorrect={false}
            value={'Pickup address:     '+job.pickupaddress.description}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}            
          />
          {/* {user.lastName}</TextInput> */}
        </View>
        <View style={styles.action}>         
          <TextInput
            placeholder="Drop off time"
            placeholderTextColor="#666666"
            keyboardType="number-pad"
            autoCorrect={false}
            value={'Dropoff time:          '+job.dropofftime}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}            
          />
          {/* {user.userPhone}</TextInput> */}
        </View>
        <View style={styles.action}>         
          <TextInput
            placeholder="Drop off address"
            placeholderTextColor="#666666"
            keyboardType="number-pad"
            autoCorrect={false}
            value={'Dropoff address:     '+job.dropoffaddress.description}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}            
          />
          {/* {user.userPhone}</TextInput> */}
        </View>
        <View style={styles.action}>         
          <TextInput
            placeholder="Fare"
            placeholderTextColor="#666666"
            keyboardType="number-pad"
            autoCorrect={false}
            value={'Fare:     $ '+ job.fare}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}            
          />
          {/* {user.userPhone}</TextInput> */}
        </View>
        <View style={styles.action}>          
          <TextInput
            placeholder="VT"
            placeholderTextColor="#666666"
            keyboardType="email-address"
            autoCorrect={false}
            value={'Vehicle type:          '+job.vt}
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
          {/* <FontAwesome name="globe" color={colors.text} size={20} /> */}
          <TextInput
            placeholder="Country"
            placeholderTextColor="#666666"
            autoCorrect={false}
            //value={country}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}            
          />
          {/* {user.userCountry}</TextInput> */}
        </View>
        <View style={styles.action}>
          {/* <Icon name="map-marker-outline" color={colors.text} size={20} /> */}
          <TextInput
            placeholder="City"
            placeholderTextColor="#666666"
            autoCorrect={false}
           // value={city}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}            
          />
          {/* {user.userCity}</TextInput> */}
        </View>      
    </ScrollView>
  </View>
  )
}

export default JobdetailScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    action: {
      flexDirection: 'row',
      marginTop: 10,
      marginBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#f2f2f2',
      paddingBottom: 5,
    },
    textInput: {
      flex: 1,
      marginTop: Platform.OS === 'ios' ? 0 : -12,
      paddingLeft: 10,
      color: '#05375a',
    },
  });