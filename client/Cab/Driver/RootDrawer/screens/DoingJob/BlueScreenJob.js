import React, { useEffect, useState, useRef } from "react";
import {
    View,
    Text,
    Dimensions,
    Button,
    Animated,
    Easing,
} from "react-native";
import tw from "twrnc";
import {
    setdispatchedjobdetail,
} from "../../../slices/navSlice";
import axios from 'axios';
const screen = Dimensions.get('window');
import { Audio } from 'expo-av';
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
const URL = 'http://192.168.43.36:4000';

export default function BlueScreenJob(props) {

    //let opacity = new Animated.Value(0)[1];
    const opacity = useRef(new Animated.Value(0)).current;
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { driver } = useSelector((state) => state.driver);
    const [sound, setSound] = useState();
    const [show, setShow]= useState(false);

    async function playSound() {
        console.log('Loading Sound');
        const { sound } = await Audio.Sound.createAsync(require('../../../assets/JobAlert.m4a')
        );
        setSound(sound);
        await sound.playAsync();
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 5000,
            useNativeDriver: true,
        }).start();
        console.log('Playing Sound', sound);
    }

    useEffect(() => {
        console.log('Playing Effect');
        try {
            Animated.timing(opacity, {
                toValue: 1,
                duration: 100,
                // easing: Easing.linear,
                useNativeDriver: true
            }).start();
        } catch (e) {
            console.log("e====", e.message);
        }
        // playSound();
        return sound
            ? () => {
                console.log('Unloading Sound');
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);

    const fadeoutview = async () => {
        console.log('Fading out');
        props.callback(show);
        try {
            Animated.timing(opacity, {
                toValue: 0,
                duration: 100,
                // easing: Easing.linear,
                useNativeDriver: true
            }).start();
        } catch (e) {
            console.log("e====", e.message);
        }
    }

    // if (hide) {
    return (
        <Animated.View
            style={{
                height: screen.height,
                width: screen.width,
                opacity: opacity,
                backgroundColor: 'blue'
            }}
        >
            <View>
                <View style={tw`justify-center items-center`}>
                    <Text style={tw`text-white text-4xl top-40`}>{props.label}</Text>
                    <Text style={tw`text-white text-2xl top-40`}>{props.jobdetail.pickupaddress.description.substr(0, 14)} {props.jobdetail.vt}</Text>
                    <Button title="Play Sound" onPress={playSound} />
                </View>
                <View style={tw`flex-row justify-around`}>
                    <View style={{
                        width: screen.width / 3, top: screen.height - 250,
                        backgroundColor: 'green', borderRadius: 50
                    }}>
                        <Button onPress={async () => {
                            console.log('pressed in blue screen====')
                            // setHide(false);
                            fadeoutview();
                            dispatch(setdispatchedjobdetail(props.jobdetail))
                            let jobstatus = 'Recieved',
                                time = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true }),
                                rego = driver.cab.rego;
                            let jobrecievedby = {
                                rego,
                                time,
                                driverId: driver.driver.driverid
                            }
                            await axios.put(`http://192.168.43.36:4000/Job/jobStatus?id=${props.jobdetail._id}`,
                                { jobstatus, jobrecievedby, rego }
                            )
                            navigation.navigate('JobonScreen', { jobId: props.jobdetail._id, rego: driver.cab.rego });
                        }
                        }
                            title='Accept'
                            color={Platform.OS === 'ios' ? 'wheat' : 'green'}
                        />
                    </View>

                    <View style={{
                        width: screen.width / 3, top: screen.height - 250,
                        backgroundColor: 'tomato', borderRadius: 50
                    }}>
                        <Button onPress={async () => {
                            fadeoutview();
                            navigation.navigate('Home', {});
                            let jobstatus = 'Declined';
                            let time = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });
                            let rego = driver.cab.rego;
                            let jobdeclinedby = {
                                rego: driver.cab.rego,
                                time: time,
                                driverId: driver.driver.driverid
                            }
                            try {
                                await axios.put(`${URL}/Job/jobStatus?id=${props.jobdetail._id}`,
                                    { jobstatus, jobdeclinedby, rego }
                                )
                            } catch (err) { console.log(err) }                            
                        }}
                            title='Decline'
                            color={Platform.OS === 'ios' ? 'wheat' : 'tomato'}
                        />
                    </View>
                </View>
            </View>
        </Animated.View>
    )
    //  }
}

