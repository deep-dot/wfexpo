import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, LogBox } from 'react-native';
LogBox.ignoreLogs([
    'Non-serializable',
    'SerializableStateInvariantMiddleware',
    'ImmutableStateInvariantMiddleware',
]);
import tw from "twrnc";
import { useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';
import axios from "axios";
import Constants from 'expo-constants';
import { selectCabs } from '../../../slices/navSlice';
const url = Constants.expoConfig.extra.env;

function AreaStatusScreen(props) {
    const { colors } = useTheme();
    const [carsinarea, setCarsinarea] = useState([]);
    const cabs = useSelector(selectCabs);
    // const { cabs } = useSelector(state => state.cabs);

    useEffect(() => {
        const fetchCabs = (async () => {
            try{
            let cars = cabs.filter((car) => car.description.city === props.route.params.title);
            console.log('cabs in area status screen===', cars.length,);
            if (cars.length > 1) {
                cars.sort(function (x, y) {
                    let time1 = new Date(x.description.date);
                    let time2 = new Date(y.description.date);
                    return time1.getTime() < time2.getTime() ? -1 : time1.getTime() > time2.getTime() ? 1 : 0;
                });
                setCarsinarea(cars);
            } else {
                setCarsinarea(cars);
            }
        } catch (err) {
            console.log(err.message);
        }
        });
        fetchCabs();
    }, [cabs])
    //console.log('carsinarea in areastatus screen==', cabs[0].description.city);
    return (
        <SafeAreaView style={styles.container}>
            <View style={tw`mt-10`}>
                <TouchableOpacity>
                    <View style={[styles.action, tw`flex-row justify-between`]}>
                        <Text style={[styles.textInput, { color: colors.text, },]}>VEH</Text>
                        <Text style={[styles.textInput, { color: colors.text, },]}>POS</Text>
                        <Text style={[styles.textInput, { color: colors.text, },]}>STATUS</Text>
                        <Text style={[styles.textInput, { color: colors.text, },]}>VT </Text>
                    </View>
                    {carsinarea && carsinarea.map((car, index) => {
                        return (
                            <View key={index} style={[styles.action, tw`flex-row justify-between`]}>
                                <Text style={[styles.textInput, { color: colors.text, },]}>{car.rego}</Text>
                                <Text style={[styles.textInput, { color: colors.text, },]}>{index + 1} </Text>
                                <Text style={[styles.textInput, { color: colors.text, },]}>{car.status} </Text>
                                <Text style={[styles.textInput, { color: colors.text, },]}>{car.type}</Text>
                            </View>
                        );
                    })}
                </TouchableOpacity >
            </View>
        </SafeAreaView >
    )
}

export default AreaStatusScreen

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
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        paddingRight: 10,
        color: '#05375a',
    },
});