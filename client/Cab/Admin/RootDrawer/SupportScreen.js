
import React, { useEffect, useRef, useState } from "react";
import {
  Keyboard, StyleSheet,
  View, TouchableOpacity, PermissionsAndroid,
  Image, Dimensions, Platform, Text, Alert,
} from "react-native";
import MapView, { Marker, AnimatedRegion } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import {
  selectDestination,
  selectOrigin,
  setTravelTimeInformation,
} from "../../slices/navSlice";
import tw from "twrnc";
// import imagePath from "../../constants/imagePath";
GOOGLE_MAPS_APIKEY = "AIzaSyCfacCZ8-nf1bwKN96-6u0KUCFre34dm9A";
import * as Location from 'expo-location';
import { Icon } from "react-native-elements/dist/icons/Icon";

const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const Map = () => {
  const mapRef = useRef(null);
  const markerRef = useRef();
  const navigation = useNavigation();
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const dispatch = useDispatch();
  // console.log('current in map screen',origin);
 
  useEffect(() => {
    if (!origin || !destination) return;
    // Zoom & fit to markers
    mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
    });
  }, [origin, destination]);

  useEffect(() => {
    const getTravelTime = async () => {
     if (!origin || origin==null || !destination) return;
      fetch(
        `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin.description}&destinations=${destination.description}&key=${GOOGLE_MAPS_APIKEY}`
      )
        .then((res) => res.json())
        .then((data) => {
          dispatch(setTravelTimeInformation(data.rows[0].elements[0]));
        });
    };

    getTravelTime();
  }, [origin, destination, GOOGLE_MAPS_APIKEY]);

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
          onPress={() => navigation.navigate("BookmarkScreen")}
          style={[
            tw`bg-gray-100 absolute top-16 left-8 z-50 p-3 rounded-full shadow-lg`,
          ]}
        >
          <Icon name="menu" />
        </TouchableOpacity>
      <MapView
        onPress={Keyboard.dismiss}
        onPanDrag={Keyboard.dismiss}
        initialRegion={{
          latitude: origin.location.lat,
          longitude: origin.location.lng,        
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
        ref={mapRef}
        style={tw`flex-1`}
        // mapType ='satellite'
        mapType="mutedStandard"
      >        
        {origin && destination && (
          <MapViewDirections           
            origin={origin.description}
            destination={destination.description}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={3}
            strokeColor="black"
          />
        )}
        
        {origin?.location && (
          <Marker
            coordinate={{
              latitude: origin.location.lat,
              longitude: origin.location.lng,            
            }}
            title="Origin"
             description={origin.description}           
            identifier="origin"
          >
            <Image style={{width:30, height:30}} source={{uri: 'https://i.ibb.co/Xx4G91m/uberblack.png'}}></Image>
          </Marker>
        )}
        {destination?.location && (
          <Marker
            coordinate={{
              latitude: destination.location.lat,
              longitude: destination.location.lng,
            }}
            title="Destination"
            description={destination.description}
            identifier="destination"
          />
        )}
      </MapView>
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({});


