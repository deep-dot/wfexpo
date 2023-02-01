import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import tw from "twrnc";
import { useTheme } from 'react-native-paper';
import { useSelector } from "react-redux";
import {
    selectCabs
} from "../../../slices/navSlice";

function ZoneStatusScreen({ route }) {
    const [carsinarea, setCarsinarea] = useState([]);
    const { colors } = useTheme();
    const cabs = useSelector(selectCabs);
    // console.log('Zone status screen cars in zone', cabs.length);

    useEffect(() => {
        let cars = [];
        cabs && cabs.map(cab => {
            if (route.params.title === cab.description.city) {
                cars.push(cab);
            }
        });
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
    }, []);
    return (
        <SafeAreaView style={styles.container}>
            <View style={tw`mt-10`}>
                <View style={[styles.action, tw`flex-row justify-between`]}>
                    <Text style={[styles.textInput, { color: colors.text, },]}>VEH</Text>
                    <Text style={[styles.textInput, { color: colors.text, },]}>POS</Text>
                    <Text style={[styles.textInput, { color: colors.text, },]}>STATUS</Text>
                    <Text style={[styles.textInput, { color: colors.text, },]}>VT </Text>
                </View>
                {carsinarea && carsinarea.map((vehicle, index) => {
                    return (
                        <View key={index} style={[styles.action, tw`flex-row justify-between`]}>
                            <Text style={[styles.textInput, { color: colors.text, },]}>{vehicle.rego}</Text>
                            <Text style={[styles.textInput, { color: colors.text, },]}>{index + 1} </Text>
                            <Text style={[styles.textInput, { color: colors.text, },]}> {vehicle.status}</Text>
                            <Text style={[styles.textInput, { color: colors.text, },]}>{vehicle.type}</Text>
                        </View>
                    );
                })}
            </View>
        </SafeAreaView >
    );
}

export default ZoneStatusScreen

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