import React, {useState} from 'react'
import { View, Text, Button,TextInput,StyleSheet } from 'react-native'
import { useNavigation } from "@react-navigation/native";
  import tw from "twrnc";
  import { useSelector } from "react-redux";
  import { useTheme } from 'react-native-paper';
  import axios from 'axios';

export default function FareScreen({route}) {
    const { colors } = useTheme();
    const navigation = useNavigation();
    const { driver } = useSelector((state) => state.driver);    
    const [fare, setfare] = useState('');
    const [people, setpeople] = useState('');    
    const URL = 'http://192.168.43.36:4000';
   // console.log(' fare screen jobId====',route.params.jobId);

    const submitToJobdetail = async() => {  
        let jobstatus = "Done";
        let time = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });              
        let rego = driver.cab.rego;
        let jobdoneby = {
          rego,
          time,
          driverId : driver.driver.driverid
       } 
        await axios.put(`${URL}/Job/jobStatus?id=${route.params.jobId}`,
            {fare,people,jobdoneby,time, jobstatus, rego}
        ).then((response) =>{
            //dispatch(blueScreenJob())
        })
    }
    return (
        <View style={{paddingTop: 100, backgroundColor: '#444444' }}>
             <View style={[tw` flex-row justify-between`]}>
            <Text style={[styles.textInput, { color: colors.text, },]}>Fare:</Text>
            <TextInput
              style={[styles.textInput, { color: colors.text, },]}
              value={fare}
              onChangeText={(text) => setfare(text)}
            />
          </View>
          <View style={[tw` flex-row justify-between`]}>
            <Text style={[styles.textInput, { color: colors.text, },]}>PPl:</Text>
            <TextInput
              style={[styles.textInput, { color: colors.text, },]}
              value={people}
              onChangeText={(text) => setpeople(text)}
            />
          </View>
            <Button onPress={() => {                
                navigation.navigate('Home');
                submitToJobdetail();
            }}
                title='Submit' color='wheat' />
        </View>
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