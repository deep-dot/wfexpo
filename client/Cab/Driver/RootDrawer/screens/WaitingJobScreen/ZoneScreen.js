import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import tw from "twrnc";
import { useTheme } from 'react-native-paper';
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import {
    selectCabs
} from "../../../slices/navSlice";
const ZoneArea = [
    {
        suburb: 'Belmont',
        cars: []
    },
    {
        suburb: 'Geelong',
        cars: []
    },
    {
        suburb: 'Fyansford',
        cars: []
    },
    {
        suburb: 'Lara',
        cars: []
    },
    {
        suburb: 'Newtown',
        cars: []
    },
    {
        suburb: 'East Geelong',
        cars: []
    },
    {
        suburb: 'Drysdale',
        cars: []
    },
    {
        suburb: 'Herne Hill',
        cars: []
    },
    {
        suburb: 'Hamlyn Heights',
        cars: []
    },
    {
        suburb: 'San Francisco',
        cars: []
    },
]

const ZoneScreen = () => {
    const { colors } = useTheme();
    const navigation = useNavigation();
    const [carsinarea, setCarsinarea] = useState([]);
    const cabs = useSelector(selectCabs);
    const [carPosition, setcarPosition] = useState('');
    //console.log('cars in zone screen screen==',cabs.length);

    useEffect(() => {
        ZoneArea.map(area => {
            area.cars = [];
            cabs && cabs.map(cab => {
                if (area.suburb === cab.description.city) {
                    area.cars.push(cab);
                }
            });
        });
        setCarsinarea(ZoneArea);
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            {carsinarea.map((car, index) => {
                if (car.cars.length > 0) {
                    return (
                        <View key={index}>
                            <TouchableOpacity
                                style={tw`bg-opacity-600`}
                                onPress={() => { navigation.navigate('ZoneStatusScreen', { title: car.suburb }) }}
                            >
                                <View style={[styles.action, tw`flex-row justify-between`]}>
                                    <Text style={[styles.textInput, { color: colors.text, },]}>
                                        {car.suburb}   </Text>
                                    <Text style={[styles.textInput, { color: colors.text, },]}>
                                        {car.cars.length}   {">"} </Text>
                                </View>
                            </TouchableOpacity >
                        </View>
                    );
                }
            })}
        </SafeAreaView>
    )
}

export default ZoneScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 0,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5,
    },
    textInput: {
        marginTop: Platform.OS === 'ios' ? 20 : 10,
        paddingLeft: 10,
        color: '#05375a',
    },
});